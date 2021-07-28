import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/styles/reset.css';
import '@/styles/border.css';
import fastClick from 'fastclick';
import '@/assets/iconfont.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VUEAmap from 'vue-amap';

Vue.config.productionTip = false;
fastClick.attach(document.body);
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');


Vue.use(VUEAMap)

// 初始化vue-amap
VUEAMap.initAMapApiLoader({
  // 高德key
  key: '876a67525aa9bd4ca0455bbff07e5859',
  // 插件集合 （插件按需引入）
  plugin: ['AMap.Geolocation', 'AMap.ElasticMarker']
})
