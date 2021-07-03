import router from './router'
import store from './store'
import VueCustomTooltip from '@adamdehaven/vue-custom-tooltip'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios';
import VueAxios from 'vue-axios';

import { library } from '@fortawesome/fontawesome-svg-core'
import fontawesome_icons from "@/fontawesome_icons";

export function config(vueApp) {

    library.add(fontawesome_icons);

    vueApp
        .use(router)
        .use(store)
        .use(VueCustomTooltip)
        .use(VueAxios, axios)

        .component('font-awesome-icon', FontAwesomeIcon)
}
