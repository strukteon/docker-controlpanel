import { Router } from "express";
import Endpoint from "../Endpoint";
import dockerode from "dockerode";

const status: Endpoint = {
    path: "/containers",
    router: Router(),
}

status.router.get("/all", async (req, res) => {
    res.json(await status.docker?.listVolumes({all: true}));
})

export default status;
