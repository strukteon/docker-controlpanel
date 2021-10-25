import {ServerPlugin} from "../server_plugin";
import {EndpointManagerPlugin} from "./endpoint_manager_plugin";
import {Server} from "http";
import { Express } from 'express';
import Dockerode from 'dockerode';
import {WebsocketPlugin} from "./websocket_plugin";

type ServerPluginDerivative = {new (app: Express, server: Server, docker: Dockerode): ServerPlugin} & typeof ServerPlugin;

export default [

    EndpointManagerPlugin,
    WebsocketPlugin

] as ServerPluginDerivative[];
