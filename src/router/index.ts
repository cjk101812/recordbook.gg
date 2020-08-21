import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/signup',
    name: 'Sign Up',
    component: () => import(/* webpackChunkName: "about" */ '../views/Signup.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
  },
  {
    path: '/new-record',
    name: 'SubmitRecord',
    component: () => import(/* webpackChunkName: "about" */ '../views/SubmitRecord.vue'),
  },
  {
    path: '/record/:id',
    name: 'Record',
    component: () => import(/* webpackChunkName: "about" */ '../views/Record.vue'),
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import(/* webpackChunkName: "about" */ '../views/Search.vue'),
  },
  {
    path: '/validate',
    name: 'Validate',
    component: () => import(/* webpackChunkName: "about" */ '../views/Validate.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
