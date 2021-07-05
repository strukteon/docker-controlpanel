import { Router, Response } from "express";
import Endpoint from "../Endpoint";

const status: Endpoint = {
    path: "/networks",
    router: Router(),
}

status.router.get("/all", async (req, res: Response) => {
    let networks = await status.docker?.listNetworks();
    res.json(networks);
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
