import { WebsocketRoom} from "../websocket_room";
import dockerode from "dockerode";
import {WebsocketRoomKeys} from "../../../../models/index";

export default class DockerEventsRoom extends WebsocketRoom {
    roomKey = WebsocketRoomKeys.DOCKER_EVENTS;

    async onSetupFinished() {
        this.docker.getEvents({}, (err, data) => {
            if(err){
                console.log(err.message);
            } else {
                data?.on('data', (chunk) => {
                    const parsed_data = JSON.parse(chunk.toString());
                    this.broadcastMessage({
                        type: "message",
                        data: parsed_data
                    })
                });
            }
        });
    }
}
