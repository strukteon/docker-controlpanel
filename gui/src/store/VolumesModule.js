import {getApiUrl} from "@/util/Tools";

export const volumesModule = {
    namespaced: true,

    state: () => ({
        volumes: { }
    }),
    getters: {
        volumes(state) {
            return state.volumes;
        },
        volumesArray: (state) => (comparator) => {
            const volumes = Object.values(state.volumes);
            if (comparator) return volumes.sort(comparator);
            return volumes;
        }
    },
    mutations: {
        setVolumes(state, { volumes }) {
            state.volumes = {
                ...volumes
            };
        },
        removeVolume(state, { volumeId }) {
            delete state.volumes[volumeId];
        }
    },
    actions: {
        async loadVolumes({ commit }, { axios }) {
            const res = await axios.get(`//${getApiUrl()}/volumes/all`);
            const volumes = res.data.sort((o1, o2) => o1.Name.localeCompare(o2.Name));
            const volumesObj = {};
            for (let vol of volumes)
                volumesObj[vol.Name] = vol
            commit('setVolumes', { volumes: volumesObj });
        },

        async deleteVolume({ commit }, { axios, volumeId }) {
            const res = await axios.get(`//${getApiUrl()}/volumes/${volumeId}`);
            console.log(`delete volume ${volumeId}`, res);
            commit('removeVolume', { volumeId: volumeId });
        }
    }
}

export function handleWebsocketMessage(msg) {
    // console.log(msg)
    msg.toString();
}
