import { createRouter, createWebHistory } from 'vue-router'
import Menu from '@/views/menu.vue';
import Login from '@/components/home/Login.vue';




const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/menu',
    name: 'Menu',
    component: Menu
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router