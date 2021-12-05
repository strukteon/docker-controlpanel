import { Request, Response } from "express";
import {EndpointOptions} from "../models/Endpoint";

export default {
    path: "/containers",
    routerConfig: (router, docker) => {
        router.get("/all", async (req: Request, res: Response) => {
            res.json(await docker.listContainers({all: true}));
        })

        router.get("/:containerid", async (req: Request, res: Response) => {
            const containers = await docker.listContainers({all: true});
            res.json(containers.find(c => c.Id === req.params.containerid));
        })
    }

} as EndpointOptions
