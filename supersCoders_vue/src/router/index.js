import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '../views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'search',
      // searchResult 컴포넌트가 정의되지 않아 주석 처리합니다.
      // component: searchResult
    },
    {
      path: '/food',
      name: 'food',
      component: AboutView
    },
    {
      path: '/bar',
      name: 'bar',
      component: AboutView
    },
    {
      path: '/hospital',
      name: 'hospital',
      component: AboutView
    },
    {
      path: '/pharmacy',
      name: 'pharmacy',
      component: AboutView
    },
    {
      path: '/mall',
      name: 'mall',
      component: AboutView
    },
    {
      path: '/bank',
      name: 'bank',
      component: AboutView
    },
  ]
})

export default router
