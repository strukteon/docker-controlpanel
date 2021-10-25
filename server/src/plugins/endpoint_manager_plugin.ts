import { Express, Router } from "express";
import endpoints from "../endpoints";
import Dockerode from "dockerode";
import {ServerPlugin} from "../server_plugin";
import { Server } from "http";

export class EndpointManagerPlugin extends ServerPlugin {

    constructor(app: Express, server: Server, docker: Dockerode) {
        super(app, server, docker);

        for (const ep of endpoints) {
            const router = Router();
            ep.routerConfig(router, docker);
            app.use(ep.path, router);
        }
    }

    async beforeExit() {
        for (const ep of endpoints) {
            if (ep.beforeDestroy)
                await ep.beforeDestroy(this.docker);
        }
    }

}
