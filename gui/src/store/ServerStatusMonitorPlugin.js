import { handleWebsocketMessage as volumesMessageHandler } from "@/store/VolumesModule";

export default (webSocket) => (store) => {
    console.log(store)
    webSocket.addEventListener("message", ev => {
        const data = JSON.parse(ev.data);
        console.log(data.Type, data);

        switch (data.Type) {
            case "sa":
                volumesMessageHandler(data);
        }
    })
}
