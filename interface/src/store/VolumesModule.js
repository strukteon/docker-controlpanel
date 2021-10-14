import {getApiUrl} from "@/util/Tools";

export const volumesModule = {
    namespaced: true,

    state: () => ({
        volumes: { },
        curFolder: [ ],
        filesAreLoading: false,
    }),
    getters: {
        volumes: state => state.volumes,
        volumesArray: (state) => (comparator) => {
            const volumes = Object.values(state.volumes);
            if (comparator) return volumes.sort(comparator);
            return volumes;
        },
        curFolder: state => state.curFolder,
        curFolderArray: state => (comparator) => {
            const files = Object.values(state.curFolder);
            if (comparator) return files.sort(comparator);
            return files;
        },
        filesAreLoading: state => state.filesAreLoading,
    },
    mutations: {
        setVolumes(state, { volumes }) {
            state.volumes = {
                ...volumes
            };
        },
        removeVolume(state, { volumeId }) {
            delete state.volumes[volumeId];
        },
        setCurrentOpenFolder(state, { files }) {
            state.curFolder = files;
        },
        clearCurrentOpenFolder(state) {
            state.curFolder = [ ];
        },
        setFilesAreLoading(state, { filesAreLoading }) {
            state.filesAreLoading = filesAreLoading;
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
        },
        async loadFolder({ commit }, { axios, volumeId, path }) {
            commit("setFilesAreLoading", { filesAreLoading: true });
            const res = await axios.get(`//${getApiUrl()}/volumes/${volumeId}/files?path=${path}`);
            console.log("finished loading files", res)
            commit("setCurrentOpenFolder", { files: res.data });
            commit("setFilesAreLoading", { filesAreLoading: false });
        }
    }
}

export function handleWebsocketMessage(msg) {
    // console.log(msg)
    msg.toString();
}
