import express from 'express';
import http from 'http';
import cors from 'cors';
import Dockerode from "dockerode";
import pluginClasses from './src/plugins';
import asyncExitHook from 'async-exit-hook';

const docker = new Dockerode({protocol:'http', host: '127.0.0.1', port: 2375});

const app = express();
const server = http.createServer(app);

// set default config
process.env.PORT = process.env.PORT ?? "80";

app.use(express.json());
app.use(cors());

const plugins = pluginClasses.map(plugin => new plugin(app, server, docker));

(async () => {
    console.log(`Starting server at: http://localhost:${process.env.PORT}`);
    server.listen(process.env.PORT, () => console.log('server started.'));

    asyncExitHook(async (callback) => {

        await Promise.all(plugins.map(plugin => plugin.beforeExit()));
        callback();

    });

    plugins.forEach(plugin => plugin.afterStart());
})();
