import { Router } from "express";
import Dockerode from "dockerode";

export default interface Endpoint {
    readonly path: string,
    readonly router: Router,
    docker?: Dockerode,
    beforeDestroy?(): void
}

export type EndpointOptions = {
    path: string,
    routerConfig: (router: Router, docker: Dockerode) => void,
    beforeDestroy?: (docker: Dockerode) => Promise<void>
}
