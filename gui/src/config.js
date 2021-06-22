import router from "@/router";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import axios from 'axios'
import VueAxios from 'vue-axios'

export default function addOptions(vueApp) {


    vueApp
        .component("font-awesome-icon", FontAwesomeIcon)
        .use(VueAxios, axios)
        .use(router)
    ;

}
