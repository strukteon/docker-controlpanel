import status from "./status";
import Endpoint from "../Endpoint";
import volumes from "./volumes";
import containers from "./containers";
import images from "./images";
import networks from "./networks";

const endpoints: Endpoint[] = [
    status,
    volumes,
    containers,
    images,
    networks
];

export default endpoints;
