import status from "./status";
import volumes from "./volumes";
import containers from "./containers";
import images from "./images";
import networks from "./networks";
import {EndpointOptions} from "../models/Endpoint";

const endpoints: EndpointOptions[] = [
    status,
    volumes,
    containers,
    images,
    networks
];

export default endpoints;
