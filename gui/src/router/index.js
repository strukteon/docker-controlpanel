import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/views/Home";
import Volumes from "@/views/volumes";

const routes = [
  {
    path: '/containers',
    name: 'Containers',
    component: Home
  },
  {
    path: '/images',
    name: 'Images',
    component: Home
  },
  {
    path: '/volumes',
    name: 'Volumes',
    component: Volumes
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
