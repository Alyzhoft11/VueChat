import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Login from '../views/Login.vue';
import SignUp from '../views/SignUp.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Login,
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
