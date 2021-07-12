import express from 'express';
import http from 'http';
import cors from 'cors';
import { load_endpoints } from "./endpoint_manager";
import Dockerode from "dockerode";

const docker = new Dockerode({protocol:'http', host: '127.0.0.1', port: 2375});

const app = express();
const server = http.createServer(app);

import events_websocket from "./events_websocket";
const wss = events_websocket(server, docker);

// set default config
process.env.PORT = process.env.PORT ?? "80";

app.use(express.json());
app.use(cors());

start();

async function start() {
    await load_endpoints(app, docker);

    console.log(`Starting server at: http://localhost:${process.env.PORT}`);
    server.listen(process.env.PORT, () => console.log('server started.'));
}
