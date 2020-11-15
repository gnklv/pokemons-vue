import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import Home from '@/views/Home.vue';
import History from '@/views/History.vue';

Vue.use(VueRouter);

export const routes: Array<RouteConfig & { title: string }> = [
  {
    path: '/',
    title: 'Home',
    component: Home,
  },
  {
    path: '/history',
    title: 'History',
    component: History,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
