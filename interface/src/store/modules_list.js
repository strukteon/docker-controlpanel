import {containersModule} from "@/store/containers_module";
import {imagesModule} from "@/store/images_module";
import {networksModule} from "@/store/networks_module";
import {volumesModule} from "@/store/volumes_module";

export default {

    containers: containersModule,
    images: imagesModule,
    networks: networksModule,
    volumes: volumesModule,

}
