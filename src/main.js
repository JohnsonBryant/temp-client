import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'normalize.css/normalize.css';
import './styles/index.scss';
import axios from 'axios'
import Qs from 'qs'
import VueSocketIO from 'vue-socket.io'
import ECharts from 'vue-echarts'
import router from './router';
import util from './util.js'
import App from './App.vue';

Vue.use(new VueSocketIO({
  debug: true,
  connection: window.location.href
}))
Vue.use(ElementUI);
Vue.component('v-chart', ECharts)

Vue.config.productionTip = false;
Vue.prototype.axios = axios
Vue.prototype.Qs = Qs
Vue.prototype.util = util

let vm = new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
