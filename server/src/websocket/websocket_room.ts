import dockerode from "dockerode";
import websocket from "ws";
import { WebsocketMessage, WebsocketMessageOptions } from "models";

export abstract class WebsocketRoom {
    docker: dockerode;
    clients: Set<websocket>;

    abstract roomKey: string;

    constructor(docker: dockerode) {
        this.docker = docker;
        this.clients = new Set();
    }

    async onSetupFinished(): Promise<void> { }
    async beforeExit(): Promise<void> { }

    async onConnectionOpened(ws: websocket, options: WebsocketMessageOptions): Promise<void> { }
    async onMessage(ws: websocket, msg: WebsocketMessage): Promise<void> { }
    async onConnectionClosed(ws: websocket): Promise<void> { }

    broadcastMessage(msg: WebsocketMessage): void {
        this.clients.forEach(ws => ws.send(JSON.stringify(msg)));
    }
}

export type WebsocketRoomDerived = { new (docker: dockerode): WebsocketRoom } & typeof WebsocketRoom;
