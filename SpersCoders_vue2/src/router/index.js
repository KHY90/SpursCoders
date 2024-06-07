import { createRouter, createWebHistory } from 'vue-router';
import AboutView from '../views/AboutView.vue';
import FoodView from '../views/FoodView.vue';
import BarView from '../views/BarView.vue';
import HospitalView from '../views/HospitalView.vue';
import PharmacyView from '../views/PharmacyView.vue';
import MallView from '../views/MallView.vue';
import BankView from '../views/BankView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'search',
      component: AboutView
    },
    {
      path: '/food',
      name: 'food',
      component: FoodView
    },
    {
      path: '/bar',
      name: 'bar',
      component: BarView
    },
    {
      path: '/hospital',
      name: 'hospital',
      component: HospitalView
    },
    {
      path: '/pharmacy',
      name: 'pharmacy',
      component: PharmacyView
    },
    {
      path: '/mall',
      name: 'mall',
      component: MallView
    },
    {
      path: '/bank',
      name: 'bank',
      component: BankView
    },
    {
      path: '/map/:code',
      name: 'map',
      component: BankView
    },
  ]
});

export default router;
