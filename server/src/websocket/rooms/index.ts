import DockerEventsRoom from "./docker_events";
import { WebsocketRoomDerived} from "../websocket_room";
import {VolumeFileExplorerRoom} from "./volume_file_explorer";

export const rooms: WebsocketRoomDerived[] = [
    DockerEventsRoom,
    VolumeFileExplorerRoom
]
