import Vue from 'vue';
import VueRouter from 'vue-router';
import EmptyLayout from '../views/EmptyLayout';

const Home = () => import(/* webpackChunkName: "home" */ '../views/Home.vue');
const Map = () => import(/* webpackChunkName: "map" */ '../views/Map.vue');
const User = () =>
  import(/* webpackChunkName: "user" */ '../views/UserCenter.vue');
const Form = () =>
  import(/* webpackChunkName: "form" */ '../views/Form/Form.vue');
const FormResult = () =>
  import(/* webpackChunkName: "form" */ '../views/Form/FormResult.vue');

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/form',
    name: 'Form',
    component: EmptyLayout,
    redirect: '/form/',
    children: [
      {
        path: '/',
        name: 'Form.Index',
        component: Form,
      },
      {
        path: 'result',
        name: 'Form.Result',
        component: FormResult,
      },
    ],
  },
  {
    path: '/map',
    name: 'Map',
    component: Map,
  },
  {
    path: '/user',
    name: 'User',
    component: User,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
