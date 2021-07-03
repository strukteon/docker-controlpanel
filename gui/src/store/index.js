import { createStore } from 'vuex'
import { volumesModule } from "@/store/VolumesModule";
import ServerStatusMonitorPlugin from "@/store/ServerStatusMonitorPlugin";

export default createStore({
  modules: {
    volumes: volumesModule
  },
  actions: {
    setup({ dispatch }, { axios }) {
      dispatch('volumes/loadVolumes', { axios });
    }
  },
  plugins: [ServerStatusMonitorPlugin(new WebSocket('ws://localhost'))]
})
