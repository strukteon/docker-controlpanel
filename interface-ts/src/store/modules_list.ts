import {DockerDataModule} from "@/store/docker_data_module";
import {containers_module} from "@/store/containers_module";
import {images_module} from "@/store/images_module";
import {networks_module} from "@/store/networks_module";
import {volumes_module} from "@/store/volumes_module";

export default {

    containers: containers_module,
    images: images_module,
    networks: networks_module,
    volumes: volumes_module,

} as { [x: string]: DockerDataModule<any> }
