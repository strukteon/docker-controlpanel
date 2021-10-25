import multer from "multer";
import {buildErrorResponse} from "../helpers/response_builder";
import {
    createBusyboxContainer,
    listBusyboxFiles,
    putBusyboxArchiveOrFile,
    sendBusyboxArchiveOrFile
} from "../../src/helpers/busyboxrunner/BusyboxRunner";

import { Request, Response } from "express";
import {EndpointOptions} from "../models/Endpoint";

export default {
    path: "/volumes",
    routerConfig: (router, docker) => {
        const upload = multer({ dest: "../uploads" });

        router.get("/all", async (req: Request, res: Response) => {
            let [containers, disk_usage] = await Promise.all([
                docker.listContainers({all: true}),
                docker.df()
            ]);

            console.log(disk_usage)

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

        router.get("/:name/upload-file", upload.single("file"), async (req: Request, res: Response) => {
            const volume_name = req.params.name;
            const path = req.query.path?.toString() ?? "";

            try {
                await docker!.getVolume(volume_name).inspect();
                const container = await createBusyboxContainer(docker!, volume_name);
                await container.start();
                await putBusyboxArchiveOrFile(container, req, path);
                await container.stop();
                await container.remove();
            } catch (e) {
                console.log(e)
                // @ts-ignore
                if (e.statusCode === 404)
                    return res.json(buildErrorResponse("volume not found"))
                throw e;
            }
        });
        router.get("/:name/download-file", async (req: Request, res: Response) => {
            const volume_name = req.params.name;
            const path = req.query.path?.toString() ?? "";

            try {
                res.setHeader("Content-Type", "text/plain")
                await docker!.getVolume(volume_name).inspect();
                const container = await createBusyboxContainer(docker!, volume_name);
                await container.start();
                await sendBusyboxArchiveOrFile(container, res, path);
                await container.stop();
                await container.remove();
            } catch (e) {
                console.log(e)
                // @ts-ignore
                if (e.statusCode === 404)
                    return res.json(buildErrorResponse("volume not found"))
                throw e;
            }
        });

        router.delete("/:name", async (req: Request, res: Response) => {
            const volume_name = req.params.name;
            if (! docker) return;
            try {
                const del_response = await docker.getVolume(volume_name).remove();
                res.json({
                    message: "volume deleted",
                })
            } catch (e) {
                // @ts-ignore
                console.error('error happened', e, e.statusCode)
                // @ts-ignore
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

    }

} as EndpointOptions
