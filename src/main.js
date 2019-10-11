import Vue from 'vue';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'normalize.css/normalize.css';
import './styles/index.scss';

import VueSocketIO from 'vue-socket.io'

import ECharts from 'vue-echarts'

import router from './router';
import App from './App.vue';

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: window.location.href
  })
)

Vue.component('v-chart', ECharts)

Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
