// src/js/router.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Pages/LandingPage/LandingPage.vue';
import Shop from '../components/Pages/Boutique/BoutiquePage.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/boutique', component: Shop }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
