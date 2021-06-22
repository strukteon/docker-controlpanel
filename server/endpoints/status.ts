import { Router } from "express";
import Endpoint from "../Endpoint";

const status: Endpoint = {
    path: "/status",
    router: Router(),
}

status.router.get("", ((req, res) => {
    res.json({
        status: "running"
    })
}))

export default status;
