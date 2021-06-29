import router from './router'
import store from './store'
import VueCustomTooltip from '@adamdehaven/vue-custom-tooltip'

export function config(vueApp) {
    vueApp
        .use(router)
        .use(store)
        .use(VueCustomTooltip)
}
