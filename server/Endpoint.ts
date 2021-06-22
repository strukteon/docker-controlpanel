import { Router } from "express";
import Dockerode from "dockerode";

export default interface Endpoint {
    readonly path: string,
    readonly router: Router,
    docker?: Dockerode,
    beforeDestroy?(): void
}
