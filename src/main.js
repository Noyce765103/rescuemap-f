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

Vue.config.productionTip = false;
fastClick.attach(document.body);
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
