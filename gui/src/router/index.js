import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/dashboard'
import Volumes from '../views/volumes'
import Images from '../views/images'
import Networks from '../views/networks'

const routes = [
  {
    path: '/',
    alias: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/volumes',
    name: 'Volumes',
    component: Volumes
  },
  {
    path: '/images',
    name: 'Images',
    component: Images
  },
  {
    path: '/networks',
    name: 'Networks',
    component: Networks
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
