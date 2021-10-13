import { Router, Response } from "express";
import Endpoint from "../Endpoint";
import dockerode from "dockerode";
import {buildErrorResponse} from "../response_builder";
import {createBusyboxContainer, listBusyboxFiles, sendBusyboxArchiveOrFile} from "../src/helpers/BusyboxRunner";

const status: Endpoint = {
    path: "/volumes",
    router: Router(),
}

status.router.get("/all", async (req, res: Response) => {
    let [containers, disk_usage] = await Promise.all([
        status.docker!.listContainers({all: true}),
        status.docker!.df()
    ]);

    let volume_obj: Object = disk_usage.Volumes.reduce((obj: Object, cur: any) => ({...obj, [cur.Name]: cur}), {});
    for (const volumeObjElement in volume_obj) {
        // @ts-ignore
        if (volume_obj[volumeObjElement])
        { // @ts-ignore
            volume_obj[volumeObjElement].Containers = [];
        }
    }

    for (let container of containers) {
        for (let mount of container.Mounts) {
            if (mount.Type !== "volume") continue;
                // @ts-ignore
            volume_obj[mount.Name].Containers.push({
                    Id: container.Id,
                    Names: container.Names,
                    State: container.State
                })
        }
    }

    res.json(Object.values(volume_obj));
});

status.router.get("/:name/files", async (req, res: Response) => {
    const volume_name = req.params.name;
    const path = req.query.path?.toString() ?? "";

    try {
        await status.docker!.getVolume(volume_name).inspect();
        const container = await createBusyboxContainer(status.docker!, volume_name);
        await container.start();
        const file_info = await listBusyboxFiles(container, path);
        res.json(file_info);
        await container.stop();
        await container.remove();
    } catch (e) {
        if (e.statusCode === 404)
            return res.json(buildErrorResponse("volume not found"))
        throw e;
    }
});
status.router.get("/:name/download-file", async (req, res: Response) => {
    const volume_name = req.params.name;
    const path = req.query.path?.toString() ?? "";

    try {
        await status.docker!.getVolume(volume_name).inspect();
        const container = await createBusyboxContainer(status.docker!, volume_name);
        await container.start();
        await sendBusyboxArchiveOrFile(container, res, path);
        await container.stop();
        await container.remove();
    } catch (e) {
        console.log(e)
        if (e.statusCode === 404)
            return res.json(buildErrorResponse("volume not found"))
        throw e;
    }
});

status.router.delete("/:name", async (req, res: Response) => {
    const volume_name = req.params.name;
    if (! status.docker) return;
    try {
        const del_response = await status.docker.getVolume(volume_name).remove();
        res.json({
            message: "volume deleted",
        })
    } catch (e) {
        console.error('error happened', e, e.statusCode)
        if (e.statusCode === 404)
            res.json({
                message: "volume does not exist",
            })
        else
            res.json({
                message: 'error',
                code: e.statusCode
            })
    }
});



export default status;
