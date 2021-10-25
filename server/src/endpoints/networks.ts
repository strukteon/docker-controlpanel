import { Request, Response } from "express";
import {EndpointOptions} from "../models/Endpoint";

export default {
    path: "/networks",
    routerConfig: (router, docker) => {
        router.get("/all", async (req: Request, res: Response) => {
            let networks = await docker?.listNetworks();
            res.json(networks);
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
    }

} as EndpointOptions
