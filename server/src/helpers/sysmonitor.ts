import {busyboxIsInstalled} from "./busyboxrunner/BusyboxRunner";
import exitHook from "async-exit-hook";
import dockerode, {Container, ExecCreateOptions, MountConfig, Network} from "dockerode";

const keys = {
    SYSMONITOR_LABEL: "dockstation.sysmonitor",
    NETWORK_LABEL: "dockstation.network",
}

export function setupExitHook(docker: dockerode): void {
    exitHook(async (callback: () => void) => {

        setTimeout(() => callback(), 1000)
    })
}

export async function sysmonitorIsInstalled(docker: dockerode): Promise<boolean> {
    try {
        await docker.getImage("dockstation/sysmonitor").inspect();
    } catch (e) {
        if (e.statusCode === 404)
            return false;
    }
    return true;
}

export async function dockstationNetworkExists(docker: dockerode): Promise<boolean> {
    try {
        await docker.getNetwork("dockstation").inspect();
    } catch (e) {
        if (e.statusCode === 404)
            return false;
    }
    return true;
}

export async function createDockstationNetwork(docker: dockerode): Promise<Network> {
    return await docker.createNetwork({
        Name: "dockstation",
        Driver: "bridge",
        Labels: {
            [keys.NETWORK_LABEL]: "true"
        }
    });
}

export async function createSysmonitorContainer(docker: dockerode): Promise<any> {
    if (! await sysmonitorIsInstalled(docker)) {
        await docker.pull("busybox", (err: any, stream: any) => {
            // stream.on("data", (data: any) => {
            //     console.log(data.toString())
            // });
        });
    }

    const createOptions: dockerode.ContainerCreateOptions = {
        Image: "dockstation/sysmonitor",
        Labels: {
            [keys.SYSMONITOR_LABEL]: "true",
        },
    };

    return await docker.createContainer(createOptions);
}
