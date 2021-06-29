import router from './router'
import store from './store'

export function config(vueApp) {
    vueApp
        .use(router)
        .use(store)
}
