import express from 'express';
import fs from 'fs';
import cors from 'cors';

import { load_endpoints } from "./endpoint_manager";
import Dockerode from "dockerode";

const app = express();

// set default config
process.env.PORT = process.env.PORT ?? '80';

const docker = new Dockerode({protocol:'http', host: '127.0.0.1', port: 2375});

app.use(express.json());
app.use(cors())

start();

async function start() {
    await load_endpoints(app, docker);

    console.log(`Starting server at: http://localhost:${process.env.PORT}`);
    app.listen(process.env.PORT);
}
