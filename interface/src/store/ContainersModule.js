import {getApiUrl} from "@/util/Tools";

export const containersModule = {
    namespaced: true,

    state: () => ({
        containers: { }
    }),
    getters: {
        containers(state) {
            return state.containers;
        },
        containersArray: (state) => (comparator) => {
            const containers = Object.values(state.containers);
            if (comparator) return containers.sort(comparator);
            return containers;
        }
    },
    mutations: {
        setContainers(state, { containers }) {
            state.containers = {
                ...containers
            };
        },
        removeContainer(state, { containerId }) {
            delete state.containers[containerId];
        }
    },
    actions: {
        async loadContainers({ commit }, { axios }) {
            const res = await axios.get(`//${getApiUrl()}/containers/all`);
            const containers = res.data;
            const containersObj = {};
            for (let con of containers)
                containersObj[con.Id] = con;
            commit('setContainers', { containers: containersObj });
        },
    }
}

export function handleWebsocketMessage(store, data) {
    if (data.status === "destroy") {
        store.commit("containers/removeContainer", { containerId: data.id });
    }
}
