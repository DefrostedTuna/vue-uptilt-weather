import Vue from 'vue'
import App from './App.vue'
import Skycons from 'vue-skycons'
import appConfig from './core/Config'
import './assets/css/base.scss'

if (process.env.VUE_APP_ENVIRONMENT == 'development') {
  window.appConfig = appConfig;
}

Vue.config.productionTip = false;
Vue.use(Skycons, { color: 'black'});

new Vue({
  render: h => h(App),
}).$mount('#app')
