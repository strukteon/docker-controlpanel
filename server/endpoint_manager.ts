import { Express } from "express";
import endpoints from "./endpoints";
import Dockerode from "dockerode";

export function load_endpoints(app: Express, docker: Dockerode) {
    for (const ep of endpoints) {
        console.log(`Registering '${ep.path}'`)
        ep.docker = docker;
        app.use(ep.path, ep.router)
    }
}
