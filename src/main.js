import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'normalize.css/normalize.css';
import './styles/index.scss';
import axios from 'axios'
import Qs from 'qs'
import VueSocketIO from 'vue-socket.io'
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts-gl'
import router from './router';
import store from './store.js';
import util from './util.js'
import App from './App.vue';

Vue.use(new VueSocketIO({
  debug: true,
  connection: window.location.href
}))
Vue.use(ElementUI);
Vue.component('v-chart', ECharts)

Vue.config.productionTip = false;
Vue.prototype.axios = axios // 引入 axios，替代原生 http
Vue.prototype.Qs = Qs // 
Vue.prototype.util = util //自定义功能函数添加到 Vue 原型中

let vm = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
