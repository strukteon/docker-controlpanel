import { Request, Response } from "express";
import {EndpointOptions} from "../models/Endpoint";

export default {
    path: "/status",
    routerConfig: (router, docker) => {
        router.get("", ((req: Request, res: Response) => {
            res.json({
                status: "running"
            })
        }))
    }

} as EndpointOptions
