import { Express } from 'express';
import { Server } from "http";
import Dockerode from 'dockerode';

export abstract class ServerPlugin {

    app: Express;
    server: Server;
    docker: Dockerode;

    constructor(app: Express, server: Server, docker: Dockerode) {
        this.app = app;
        this.server = server;
        this.docker = docker;
    }

    afterStart(): void { }

    async beforeExit(): Promise<void> { }

}
