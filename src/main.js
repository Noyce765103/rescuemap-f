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
import VueAMap from 'vue-amap';
import './mocks';

Vue.config.productionTip = false;
fastClick.attach(document.body);
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

Vue.use(VueAMap);

// 初始化vue-amap
VueAMap.initAMapApiLoader({
  // 高德key
  key: '876a67525aa9bd4ca0455bbff07e5859',
  // 高德默认版本号
  v: '1.4.4',
  // 插件集合 （插件按需引入）
  plugin: [
    'AMap.Geolocation', // 地点定位组件
    'AMap.Geocoder',// 地址到坐标双向转换
  ],
  uiVersion: '1.1',
});
