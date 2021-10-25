import {WebsocketRoom} from "../websocket_room";
import {WebsocketMessage, WebsocketMessageOptions} from "models";
import websocket from "ws";
import {createBusyboxContainer, listBusyboxFiles, volumeExists} from "../../helpers/busyboxrunner/BusyboxRunner";
import { Container } from "dockerode";
import {WebsocketRoomKeys} from "../../../../models/index";

export class VolumeFileExplorerRoom extends WebsocketRoom {
    roomKey = WebsocketRoomKeys.VOLUME_FILE_EXPLORER;
    selectedVolumes = new Map<websocket, string>();
    openVolumes = new Map<string, Container>();

    async onConnectionOpened(ws: websocket, options: WebsocketMessageOptions) {
        const volumeName = options!.toString();
        if (!await volumeExists(this.docker, volumeName)) {
            ws.close(404);
            return;
        }

        this.selectedVolumes.set(ws, volumeName);
        if (!this.openVolumes.has(volumeName)) {
            // TODO avoid duplicate container creation
            console.log("creating container")
            let container = await createBusyboxContainer(this.docker, volumeName);
            this.openVolumes.set(volumeName, container);
            await container.start();
        }
    }

    async onMessage(ws: websocket, msg: WebsocketMessage): Promise<void> {
        let container = this.openVolumes.get(this.selectedVolumes.get(ws)!)!;
        let filesList = await listBusyboxFiles(container, msg.data!.toString());
        ws.send(JSON.stringify({
            type: "message",
            data: filesList
        }));
    }

    async onConnectionClosed(ws: websocket): Promise<void> {
        let volumeName = this.selectedVolumes.get(ws)!;
        console.log("conn closed", volumeName)
        this.selectedVolumes.delete(ws);
        let volumeUser = Array.from(this.selectedVolumes.values()).find(vn => vn === volumeName);
        console.log("remaining user: ", volumeUser)
        if (volumeUser === undefined) {
            console.log("removing container")
            let container = this.openVolumes.get(volumeName)!;
            this.openVolumes.delete(volumeName);
            await container.stop();
            await container.remove();
            console.log("container removed")
        }
    }
}
