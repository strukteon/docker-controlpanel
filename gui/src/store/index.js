import { createStore } from 'vuex'
import { volumesModule } from "@/store/VolumesModule";
import ServerStatusMonitorPlugin from "@/store/ServerStatusMonitorPlugin";
import {imagesModule} from "@/store/ImagesModule";
import {networksModule} from "@/store/NetworksModule";
import {containersModule} from "@/store/ContainersModule";

export default createStore({
  modules: {
    volumes: volumesModule,
    images: imagesModule,
    networks: networksModule,
    containers: containersModule,
  },
  actions: {
    setup({ dispatch }, { axios }) {
      dispatch('volumes/loadVolumes', { axios });
      dispatch('images/loadImages', { axios });
      dispatch('networks/loadNetworks', { axios });
      dispatch('containers/loadContainers', { axios });
    }
  },
  plugins: [ServerStatusMonitorPlugin(new WebSocket('ws://localhost'))]
})
