import Vue from 'vue';
import VueRouter from 'vue-router';

const Home = () => import(/* webpackChunkName: "home" */ '../views/Home.vue');
const Map = () => import(/* webpackChunkName: "home" */ '../views/Map.vue');

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: Map,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
