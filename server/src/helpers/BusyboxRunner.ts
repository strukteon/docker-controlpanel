import dockerode, {Container, ExecCreateOptions, MountConfig} from "dockerode";
import list_file_stats_command, {statsCommand} from "./list_file_stats_command";
import {FileStats} from "./stats_template";
import streams from "memory-streams";
import { Response } from "express";


export async function busyboxIsInstalled(docker: dockerode): Promise<boolean> {
    try {
        await docker.getImage("busybox").inspect();
    } catch (e) {
        if (e.statusCode === 404)
            return false;
    }
    return true;
}

export async function createBusyboxContainer(docker: dockerode, primaryVolume: string, additionalVolumes?: string[]): Promise<any> {
    if (! await busyboxIsInstalled(docker)) {
        await docker.pull("busybox", (err: any, stream: any) => {
            // stream.on("data", (data: any) => {
            //     console.log(data.toString())
            // });
        });
    }

    const mounts: MountConfig = [{
        Source: primaryVolume,
        Target: "/tmp/volume",
        Type: "volume",
    }];

    if (additionalVolumes) { // @ts-ignore
        for (const [index, volume] of additionalVolumes.entries()) {
            mounts.push({
                Source: volume,
                Target: `/tmp/volume${index}`,
                Type: "volume",
            });
        }
    }

    const createOptions: dockerode.ContainerCreateOptions = {
        Cmd: [ "sh", "-c", "while true; do sleep 1; done" ],
        HostConfig: {
            Mounts: mounts,
        },
        Image: "busybox",
        Labels: {
            "dockstation.busybox": "true",
        },
    };

    return await docker.createContainer(createOptions);
}

export async function listBusyboxFiles(container: Container, folder: string): Promise<FileStats[]> {
    const execOptions: ExecCreateOptions = {
        AttachStderr: true,
        AttachStdout: true,
        Cmd: [ "sh", "-c", list_file_stats_command(`/tmp/volume${folder}`)],
    };

    let exec = await container.exec(execOptions);
    let stream = (await exec.start({}));

    let str_out: string = "";
    let out: string[] = []
    stream.on("data", (data: any) => {
        let chu = data.toString();
        str_out += chu;
        out.push(chu)
    })

    // wait for stream to end
    await new Promise((resolve, reject) => {
        stream.on("end", () => {
            resolve();
        });
    });

    const raw_output = out.join("");
    const output = "[" +
        raw_output
            .replace(/(,?).+{/g, "$1 {") // remove weird characters inbetween objects
            .replace(/\s*[\n\r]/g, "") // remove all line breaks
            .slice(0, -1) // remove trailing comma
        + "]";
    const output_json: FileStats[] = JSON.parse(output);
    // TODO filtering
    return output_json;
}

export async function getBusyboxFileInfo(container: Container, path: string): Promise<FileStats> {
    const execOptions: ExecCreateOptions = {
        AttachStderr: true,
        AttachStdout: true,
        Cmd: [ "sh", "-c", statsCommand(`/tmp/volume${path}`).join(" ")],
    };

    let exec = await container.exec(execOptions);
    let stream = (await exec.start({}));
    let fileStats: FileStats = await new Promise((resolve: any) => {
        stream.on("data", (d:any) => {
            console.log(`"${d.toString().trim()}"`);
            let out = d.toString()
                .replace(/.+{/g, "{")
                .replace(/}.+/g, "}")
            resolve(JSON.parse(out))
        })
    })
    return fileStats;
}

export async function sendBusyboxArchiveOrFile(container: Container, res: Response, path: string): Promise<void> {
    const options = {
        path: "/tmp/volume" + path
    }
    const fileStats = await getBusyboxFileInfo(container, path);
    fileStats.file_name = fileStats.file_name.split("/").reverse()[0];
    const extractFile = fileStats.file_type.indexOf("directory") < 0;

    let archive = await container.getArchive(options);
    const writable = new streams.WritableStream();

    let processedFileLength = 0;

    if (extractFile)
        res.writeHead(200, {
            "Content-Disposition": "attachment;filename=" + fileStats.file_name,
            "Content-Length": fileStats.total_size
        });
    else
        res.writeHead(200, {
            "Content-Disposition": "attachment;filename=" + fileStats.file_name + ".tar",
        });

    writable._write = (chunk: Buffer, encoding, next) => {
        if (extractFile) {
            if (processedFileLength === 0) {
                chunk = chunk.slice(512); // remove first 512 bytes (tar header)
            }

            if (processedFileLength + chunk.length < fileStats.total_size) {
                processedFileLength += chunk.length
                res.write(chunk);
            } else if (processedFileLength < fileStats.total_size) {
                let slicedChunk = chunk.slice(0, fileStats.total_size - processedFileLength);
                processedFileLength = fileStats.total_size
                res.write(slicedChunk)
            }
        } else
            res.write(chunk);
        next();
    }

    archive.pipe(writable)

    await new Promise((resolve) => writable.on('finish', function() {
        console.log("Write is completed.");
        resolve();
    }))
}

export async function stopBusyboxContainer(container: Container): Promise<void> {
    await container.stop({ t: 0 });
}

export async function removeBusyboxContainer(container: Container): Promise<void> {
    await container.remove();
}
