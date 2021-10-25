import {getApiUrl} from "@/util/Tools";
import {Module, StoreOptions} from "vuex";
import dockerode from "dockerode";
import {DockerDataModule} from "@/store/docker_data_module";
import {WebsocketMessage} from 'models';

export const containers_module: DockerDataModule<any> = {
    namespaced: true,

    state: () => ({
        containers: { }
    }),
    getters: {
        containers(state) {
            return state.containers;
        },
        containersArray: (state) => (comparator: any) => {
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
            const containersObj: any = {};
            for (let con of containers)
                containersObj[con.Id] = con;
            commit('setContainers', { containers: containersObj });
        },
    },

    handleWebsocketMessage: function (store: any, data: WebsocketMessage) {
        // @ts-ignore
        if ((<object>data.data).data === "destroy") {
            // @ts-ignore
            store.commit("containers/removeContainer", {containerId: data.data.id});
        }
    }

}
