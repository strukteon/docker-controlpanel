import {ServerPlugin} from "../server_plugin";
import {Server} from "http";
import Dockerode from 'dockerode';
import {Express} from 'express';
import {WebsocketRoom} from "../websocket/websocket_room";
import ws from "ws";
import {WebsocketMessage} from "models";
import { rooms } from "../websocket/rooms";

export class WebsocketPlugin extends ServerPlugin {

    clients = new Map<ws, WebsocketRoom | null>();
    roomInstances: WebsocketRoom[];

    constructor(app: Express, server: Server, docker: Dockerode) {
        super(app, server, docker);

        const wss = new ws.Server({ server });

        this.roomInstances = rooms.map(wsRoom => new wsRoom(docker));
        this.roomInstances.forEach(room => room.onSetupFinished());

        wss.on("connection", ws => {
            this.clients.set(ws, null);

            ws.on("message", async (msg) => {
                const msgString = msg.toString();
                const wsMessage: WebsocketMessage = JSON.parse(msgString);

                if (wsMessage.type === "set_room" && this.clients.get(ws) === null) {
                    const selectedRoom = this.roomInstances.find(room => room.roomKey === wsMessage.data);
                    if (selectedRoom === undefined) {
                        ws.close(404);
                        return;
                    }
                    this.clients.set(ws, selectedRoom);
                    selectedRoom.clients.add(ws);
                    await selectedRoom.onConnectionOpened(ws, wsMessage.options);
                    ws.send(JSON.stringify({
                        type: "info",
                        data: "setup_finished"
                    }))
                }
                else if (wsMessage.type === "message") {
                    if (this.clients.get(ws) === null) return;

                    await this.clients.get(ws)!.onMessage(ws, wsMessage);
                }
            });

            ws.on("close", async () => {
                let room = this.clients.get(ws);
                this.clients.delete(ws);
                if (room === null) return;
                await room!.onConnectionClosed(ws);
                await room!.clients.delete(ws);
            })
        });
    }

    async beforeExit(): Promise<void> {
        await Promise.all(this.roomInstances.map(ri => ri.beforeExit()));
    }
}
