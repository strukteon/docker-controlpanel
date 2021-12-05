import dockerode, {Container, ExecCreateOptions, MountConfig} from "dockerode";
import list_file_stats_command, {statsCommand} from "./list_file_stats_command";
import {FileStats} from "models";
import streams from "memory-streams";
import { Response, Request } from "express";
// @ts-ignore
import exitHook from "async-exit-hook";

const keys = {
    BUSYBOX_LABEL: "dockstation.busybox"
}

export function setupExitHook(docker: dockerode): void {
    exitHook(async (callback: () => void) => {
        console.log("removing old containers")
        let containers = await listBusyboxContainers(docker);
        console.log("listed all", containers)
        await Promise.all(containers.map(c => (async () => {
            try {
                await c.stop();
            } catch (e) { }
            await c.remove();
            console.log("removed " + c.id)
        })()));
        console.log("removed all")

        setTimeout(() => callback(), 1000)
    })
}


export async function busyboxIsInstalled(docker: dockerode): Promise<boolean> {
    try {
        await docker.getImage("busybox").inspect();
    } catch (e: any) {
        if (e.statusCode === 404)
            return false;
    }
    return true;
}

export async function listBusyboxContainers(docker: dockerode): Promise<Container[]> {
    const containers = await docker.listContainers({
        all: true,
        filters: {
            label: [keys.BUSYBOX_LABEL]
        }
    });

    return containers.map(c => docker.getContainer(c.Id));
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
            [keys.BUSYBOX_LABEL]: "true",
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

    let strOut: string = "";
    let out: string[] = []
    stream.on("data", (data: any) => {
        let chu = data.toString();
        strOut += chu;
        out.push(chu)
    })

    // wait for stream to end
    await new Promise<void>((resolve, reject) => {
        stream.on("end", () => {
            resolve();
        });
    });

    const rawOutput = out.join("");
    const output = "[" +
        rawOutput
            .replace(/(,?).+{/g, "$1 {") // remove weird characters inbetween objects
            .replace(/\s*[\n\r]/g, "") // remove all line breaks
            .slice(0, -1) // remove trailing comma
        + "]";
    const outputJson: FileStats[] = JSON.parse(output);
    for (let file of outputJson) {
        file.fileName = file.fileName.slice(2)
    }
    // TODO filtering
    return outputJson;
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
            let str = d.toString();
            let out = str.slice(str.indexOf("{"), str.lastIndexOf("}") + 1);
            resolve(JSON.parse(out));
        })
    })
    return fileStats;
}

export async function sendBusyboxArchiveOrFile(container: Container, res: Response, path: string): Promise<void> {
    const options = {
        path: "/tmp/volume" + path
    }
    const fileStats = await getBusyboxFileInfo(container, path);
    fileStats.fileName = fileStats.fileName.split("/").reverse()[0];
    const extractFile = fileStats.fileType.indexOf("directory") < 0;

    let archive = await container.getArchive(options);
    const writable = new streams.WritableStream();

    let processedFileLength = 0;

    if (extractFile)
        res.writeHead(200, {
            "Content-Disposition": "attachment;filename=" + fileStats.fileName,
            "Content-Length": fileStats.totalSize
        });
    else
        res.writeHead(200, {
            "Content-Disposition": "attachment;filename=" + fileStats.fileName + ".tar",
        });

    writable._write = (chunk: Buffer, encoding, next) => {
        if (extractFile) {
            if (processedFileLength === 0) {
                chunk = chunk.slice(512); // remove first 512 bytes (tar header)
            }

            if (processedFileLength + chunk.length < fileStats.totalSize) {
                processedFileLength += chunk.length
                res.write(chunk);
            } else if (processedFileLength < fileStats.totalSize) {
                let slicedChunk = chunk.slice(0, fileStats.totalSize - processedFileLength);
                processedFileLength = fileStats.totalSize
                res.write(slicedChunk)
            }
        } else
            res.write(chunk);
        next();
    }

    archive.pipe(writable)

    await new Promise<void>((resolve) => writable.on('finish', function() {
        console.log("Write is completed.");
        resolve();
    }))
}
export async function putBusyboxArchiveOrFile(container: Container, req: Request, path: string): Promise<void> {
    const options = {
        path: "/tmp/volume" + path
    }
    const file = req.file!;
    const stream = await container.putArchive(file.buffer, {});

}

export async function stopBusyboxContainer(container: Container): Promise<void> {
    await container.stop({ t: 0 });
}

export async function removeBusyboxContainer(container: Container): Promise<void> {
    await container.remove();
}

export async function volumeExists(docker: dockerode, volumeName: string): Promise<boolean> {
    try {
        await docker.getVolume(volumeName).inspect();
    } catch (e: any) {
        if (e.statusCode === 404) return false;
    }
    return true;
}
