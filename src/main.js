import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import VueAMap from 'vue-amap';

import '@/utils/request'
import '@/styles/index.scss'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import config from './config'
Vue.use(ElementUI)
// Vue.use(VueAMap);
Vue.prototype.$config = config;
// VueAMap.initAMapApiLoader({
//   key: 'a012ecd6d23522bde888571c1a79740b',
//   plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
//   // 默认高德 sdk 版本为 1.4.4
//   v: '1.4.4'
// });


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
