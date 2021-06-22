import status from "./status";
import Endpoint from "../Endpoint";
import volumes from "./volumes";
import containers from "./containers";

const endpoints: Endpoint[] = [
    status,
    volumes,
    containers
];

export default endpoints;
