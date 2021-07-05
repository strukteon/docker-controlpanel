import {getApiUrl} from "@/util/Tools";

export const imagesModule = {
    namespaced: true,

    state: () => ({
        images: { }
    }),
    getters: {
        images(state) {
            return state.images;
        },
        imagesArray: (state) => (comparator) => {
            const images = Object.values(state.images);
            if (comparator) return images.sort(comparator);
            return images;
        }
    },
    mutations: {
        setImages(state, { images }) {
            state.images = {
                ...images
            };
        },
        removeImage(state, { imageId }) {
            delete state.images[imageId];
        }
    },
    actions: {
        async loadImages({ commit }, { axios }) {
            const res = await axios.get(`//${getApiUrl()}/images/all`);
            const images = res.data;
            const imagesObj = {};
            for (let img of images)
                imagesObj[img.Id] = img;
            commit('setImages', { images: imagesObj });
        },
    }
}

export function handleWebsocketMessage(msg) {
    // console.log(msg)
    msg.toString();
}
