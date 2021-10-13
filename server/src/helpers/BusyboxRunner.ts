import dockerode, {Container, ExecCreateOptions, MountConfig} from "dockerode";
import list_file_stats_command from "./list_file_stats_command";


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

export async function listBusyboxFiles(container: Container, folder: string): Promise<any> {
    const execOptions: ExecCreateOptions = {
        AttachStderr: true,
        AttachStdout: true,
        Cmd: [ "sh", "-c", list_file_stats_command(folder)],
    };
    await container.start();
    let exec = await container.exec(execOptions);
    let stream = (await exec.start({}));

    let str_out: string = "";
    let out: string[] = []
    const files = []
    stream.on("data", (data: any) => {
        let chu = data.toString();
        str_out += chu;
        if (str_out.indexOf("}") > -1) {
            // console.log(out.substring(0, out.indexOf("}") + 1));
            console.log(str_out.length, str_out)
        }
        out.push(chu)
    })
    stopBusyboxContainer(container)
    const raw_output = out.join("");
    const output = "[" +
        raw_output
            .replace(/\s*[\n\r]/g, "") // remove all line breaks
            .slice(0, -1) // remove trailing comma
        + "]";
    const output_json = JSON.parse(output);

}

export async function stopBusyboxContainer(container: Container): Promise<void> {
    await container.stop({ t: 0 });
}

export async function removeBusyboxContainer(container: Container): Promise<void> {
    await container.remove();
}
