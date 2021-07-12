import { handleWebsocketMessage as volumesMessageHandler } from "@/store/VolumesModule";
import { handleWebsocketMessage as containersMessageHandler } from "./ContainersModule";

"./ContainersModule";

export default (webSocket) => (store) => {
    console.log(store)
    webSocket.addEventListener("message", ev => {
        const data = JSON.parse(ev.data);
        console.log(data.Type, data);

        switch (data.Type) {
            case "sa":
                volumesMessageHandler(data);
                break;
            case "container":
                containersMessageHandler(store, data);
        }
    })
}
