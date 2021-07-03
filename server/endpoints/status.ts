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
status.router.get("/monitor", ((req, res) => {
    status.docker?.getEvents({}, (err, data) => {

    })
}))

export default status;
