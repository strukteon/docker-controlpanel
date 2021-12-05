import Vuex from "vuex";
import ServerStatusMonitorPlugin from "@/store/ServerStatusMonitorPlugin";
import Vue from "vue";
import modules_list from "./modules_list";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    ...modules_list
  },
  actions: {
    setup({ dispatch }, { axios }) {
      dispatch('volumes/loadVolumes', { axios });
      dispatch('images/loadImages', { axios });
      dispatch('networks/loadNetworks', { axios });
      dispatch('containers/loadContainers', { axios });
    }
  },
  plugins: [ServerStatusMonitorPlugin()]
})
