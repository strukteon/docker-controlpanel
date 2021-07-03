import { createApp } from 'vue'
import App from './App.vue'
import {config} from "@/config";
import axios from 'axios';

import '@/assets/global.css';
import '@/assets/fonts.css';

const vueApp = createApp({
    ...App,
    beforeCreate() {
        this.$store.dispatch("setup", { axios })
    }
});

config(vueApp);
vueApp.mount('#app')

console.log('env var', process.env.VUE_APP_TEST)
console.log('env var', process.env.VUE_APP_TEST_NOOOOO)
