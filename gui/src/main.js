import { createApp } from 'vue'
import App from './App.vue'
import addOptions from "@/config";

import "@/assets/fonts.css";
import "@/assets/global.css";

const app = createApp(App);
addOptions(app);
app.mount('#app');
