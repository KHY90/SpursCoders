import { createRouter, createWebHistory } from 'vue-router';
import Main from '../components/Main.vue';
import Login from '../components/Login.vue';
import FoodMap from '../components/FoodMap.vue';
import HospitalMap from '../components/HospitalMap.vue';
import AddToBookmarks from '../components/AddToBookmarks.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: Login
    },
    {
      path: "/main",
      name: "main",
      component: Main
    },
    {
      path: "/main/foodmap",
      name: "foodmap",
      component: FoodMap
    },
    {
      path: "/main/hospitalmap",
      name: "hospitalmap",
      component: HospitalMap
    },
    {
      path: "/addtobookmarks",
      name: "addtobookmarks",
      component: AddToBookmarks
    },
  ]
});

export default router;
