// src/js/router.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Pages/LandingPage/LandingPage.vue';
import Shop from '../components/Pages/Boutique/BoutiquePage.vue';
import Dashboard from '@/components/Pages/Dashoard/Dashboard.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/boutique', component: Shop },
  { path: '/dashboard', component: Dashboard}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
