export default () => (store: any) => {
    const webSocket = new WebSocket('ws://localhost');
    webSocket.addEventListener("open", () => {
        webSocket.send(JSON.stringify({
            type: "set_room",
            data: "docker_events"
        }));
    })

    webSocket.addEventListener("message", ev => {
        const data = JSON.parse(ev.data).data;
        console.log(data.Type, data);
    })
}
