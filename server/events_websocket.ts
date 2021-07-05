import WebSocket from 'ws';
import http from "http";
import Dockerode from "dockerode";

export default function (server: http.Server, docker: Dockerode) {
    const wss = new WebSocket.Server({ server });

    docker.getEvents({}, (err, data) => {
        docker.getEvents({}, function (err, data) {
            if(err){
                console.log(err.message);
            } else {
                data?.on('data', function (chunk) {
                    const parsed_data = JSON.parse(chunk.toString());
                    console.log(parsed_data)
                    broadcast(JSON.stringify(parsed_data));
                });
            }
        });
    })

    return wss;

    function broadcast(msg: Object | String | undefined) {
        wss.clients.forEach(c => c.send(msg));
    }
}
