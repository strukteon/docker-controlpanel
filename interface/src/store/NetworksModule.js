import {getApiUrl} from "@/util/Tools";

export const networksModule = {
    namespaced: true,

    state: () => ({
        networks: { }
    }),
    getters: {
        networks(state) {
            return state.networks;
        },
        networksArray: (state) => (comparator) => {
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
            const networksObj = {};
            for (let img of networks)
                networksObj[img.Id] = img;
            commit('setNetworks', { networks: networksObj });
        },
    }
}

export function handleWebsocketMessage(msg) {
    // console.log(msg)
    msg.toString();
}
