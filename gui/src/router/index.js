import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/dashboard'
import Volumes from '../views/volumes/'
import AllVolumes from '../views/volumes/all-volumes'
import InspectVolume from '../views/volumes/inspect-volume'
import Images from '../views/images'
import Networks from '../views/networks'
import Containers from '../views/containers'

const routes = [
  {
    path: '/',
    alias: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/volumes',
    component: Volumes,
    children: [
      {
        path: ':volumeName/inspect',
        name: 'InspectVolume',
        component: InspectVolume
      },
      {
        path: '',
        name: 'Volumes',
        component: AllVolumes
      },
    ]
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
    path: '/containers',
    name: 'Containers',
    component: Containers
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
