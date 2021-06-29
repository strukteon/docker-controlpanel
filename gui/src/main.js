import { createApp } from 'vue'
import App from './App.vue'
import {config} from "@/config";

import '@/assets/global.css';
import '@/assets/fonts.css';

const vueApp = createApp(App);
config(vueApp);
vueApp.mount('#app')
