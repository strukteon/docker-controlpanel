import Vue from 'vue'
import App from './App.vue'
import config from './config/config'
import axios from "axios";

Vue.config.productionTip = false

new Vue({
  ...config,
  render: h => h(App),
  beforeCreate() {
    this.$store.dispatch("setup", { axios })
  }
}).$mount('#app')
