import modules_list from "@/store/modules_list";

export default () => (store) => {
    const webSocket = new WebSocket('ws://localhost');
    webSocket.addEventListener("open", () => {
        webSocket.send(JSON.stringify({
            type: "set_room",
            data: "docker_events"
        }));
    })

    webSocket.addEventListener("message", ev => {
        const data = JSON.parse(ev.data).data;
        console.log(data.Type, data, typeof store);

        for (let [key, val] of Object.entries(modules_list)) {
            if (key === data.Type + "s" && val.handleWebsocketMessage !== undefined)
                val.handleWebsocketMessage(store, data);
        }
    })
}
