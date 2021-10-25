import { Request, Response } from "express";
import {EndpointOptions} from "../models/Endpoint";

export default {
    routerConfig: (router, docker) => {
        router.get("/all", async (req: Request, res: Response) => {
            res.json(await docker.listContainers({all: true}));
        })
    }

} as EndpointOptions
