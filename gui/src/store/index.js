import { createStore } from 'vuex'
import { volumesModule } from "@/store/VolumesModule";
import ServerStatusMonitorPlugin from "@/store/ServerStatusMonitorPlugin";
import {imagesModule} from "@/store/ImagesModule";
import {networksModule} from "@/store/NetworksModule";

export default createStore({
  modules: {
    volumes: volumesModule,
    images: imagesModule,
    networks: networksModule,
  },
  actions: {
    setup({ dispatch }, { axios }) {
      dispatch('volumes/loadVolumes', { axios });
      dispatch('images/loadImages', { axios });
      dispatch('networks/loadNetworks', { axios });
    }
  },
  plugins: [ServerStatusMonitorPlugin(new WebSocket('ws://localhost'))]
})
