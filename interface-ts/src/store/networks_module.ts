import {getApiUrl} from "@/util/Tools";
import {DockerDataModule} from "@/store/docker_data_module";

export const networks_module: DockerDataModule<any> = {
    namespaced: true,

    state: () => ({
        networks: { }
    }),
    getters: {
        networks(state) {
            return state.networks;
        },
        networksArray: (state) => (comparator: any) => {
            const networks = Object.values(state.networks);
            if (comparator) return networks.sort(comparator);
            return networks;
        }
    },
    mutations: {
        setNetworks(state, { networks }) {
            state.networks = {
                ...networks
            };
        },
        removeNetwork(state, { networkId }) {
            delete state.networks[networkId];
        }
    },
    actions: {
        async loadNetworks({ commit }, { axios }) {
            const res = await axios.get(`//${getApiUrl()}/networks/all`);
            const networks = res.data;
            const networksObj: any = {};
            for (let img of networks)
                networksObj[img.Id] = img;
            commit('setNetworks', { networks: networksObj });
        },
    }
}
