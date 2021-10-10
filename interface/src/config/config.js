import Vue from "vue";
import Vuetify from 'vuetify/lib/framework'
import colors from "vuetify/lib/util/colors"
import VueRouter from 'vue-router'
import routes from "@/config/routes";
import Vuex from 'vuex'
import store from "@/store"
import axios from "axios";
import VueAxios from 'vue-axios';

Vue.use(Vuetify)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default {
    vuetify: new Vuetify({
        theme: {
            themes: {
                light: {
                    primary: colors.blue.lighten1,
                }
            }
        }
    }),
    router: new VueRouter({
        routes
    }),
    store
}