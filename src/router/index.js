import Vue from 'vue';
import VueRouter from 'vue-router';

const Home = () => import(/* webpackChunkName: "home" */ '../views/Home.vue');
const Map = () => import(/* webpackChunkName: "map" */ '../views/Map.vue');
const Personal = () => import(/* webpackChunkName: "user" */ '../views/Personal.vue');

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/map',
    name: 'Map',
    component: Map,
  },
  {
    path: '/personal',
    name: 'Personal',
    component: Personal,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
