import {getApiUrl} from "@/util/Tools";
import axios from "axios";

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
        },
        getContainer: state => ({ containerId }) => {
            return state.containers[containerId];
        }
    },
    mutations: {
        setContainers(state, { containers }) {
            state.containers = {
                ...containers
            };
        },
        addContainer(state, { containerId, containerData }) {
            state.containers = {
                ...state.containers,
                [containerId]: containerData
            }
        },
        removeContainer(state, { containerId }) {
            const containers = { ...state.containers };
            delete containers[containerId];
            state.containers = containers;
        },
        setContainer(state, { containerId, containerData }) {
            const containers = { ...state.containers };
            containers[containerId] = containerData;
            state.containers = containers;
        }
    },
    actions: {
        async loadContainers({ commit }, { axios }) {
            const res = await axios.get(`//${getApiUrl()}/containers/all`);
            const containers = res.data;
            const containersObj = {};
            for (let container of containers)
                containersObj[container.Id] = container;
            console.log(containersObj)
            commit('setContainers', { containers: containersObj });
        },
        async loadContainer({ commit }, { axios, containerId }) {
            const res = await axios.get(`//${getApiUrl()}/containers/${containerId}`);
            commit('setContainer', { containerId, containerData: res.data });
        },
    },

    handleWebsocketMessage(store, data) {
        const containerId = data.id;
        const container = store.getters["containers/getContainer"]({ containerId });


        switch (data.Action) {
            case "destroy":
                store.commit("containers/removeContainer", { containerId });
                break;

            case "stop":
            case "kill":
                container.Status = "exited";
                store.commit("containers/setContainer", {
                    containerId,
                    container
                });
                break;

            case "start":
                container.Status = "running";
                store.commit("containers/setContainer", {
                    containerId,
                    container
                });
                break;

            case "create":
            default:
                store.dispatch("containers/loadContainer", { containerId, axios })
                break;
        }
    }
}
