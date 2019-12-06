import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAMap from 'vue-amap';

import '@/utils/request'
import '@/styles/index.scss'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import config from './config'
Vue.use(ElementUI)
Vue.use(VueAMap);
Vue.prototype.$config = config;
VueAMap.initAMapApiLoader({
  key: 'a012ecd6d23522bde888571c1a79740b',
  plugin: ['AMap.Geocoder', 'AMap.Geolocation', 'AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4',
  uiVersion: '1.0.11' // 高德UI组件版本号
});


Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (store.state.token) { //如果有就直接到首页咯
    next();
  } else {
    if (to.path === '/login') { //如果是登录页面路径，就直接next()
      next();
    } else { //不然就跳转到登录；
      next('/login');
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')