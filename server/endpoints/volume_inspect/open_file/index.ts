import dockerode from "dockerode";
import streams from "memory-streams";
import open_file_command from "./open_file_command";
import {Response} from "express";

import fs from "fs"
// import stats_template from "../list_files/stats_template";
import {
    busyboxIsInstalled,
    createBusyboxContainer, getBusyboxFileInfo,
    listBusyboxFiles,
    removeBusyboxContainer, sendBusyboxArchiveOrFile
} from "../../../src/helpers/BusyboxRunner";

export default async function open_file(docker: dockerode | undefined, res: Response, volumeName: string, path: string) {
    if (!docker) {
        throw new Error("dockerode object is undefined");
    }

    let container = await createBusyboxContainer(docker, volumeName);
    console.log("created container");
    await sendBusyboxArchiveOrFile(container, res, path)
    res.end();
    await container.stop();
    await container.remove();
    console.log("removed container")
}
