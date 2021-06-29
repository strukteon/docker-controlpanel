import { createApp } from 'vue'
import App from './App.vue'
import {config} from "@/config";

const vueApp = createApp(App);
config(vueApp);
vueApp.mount('#app')
