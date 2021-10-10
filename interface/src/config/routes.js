export default [
    { name: 'Dashboard', path: '/dashboard', component: () => import('@/views/volumes/VolumesOverview') },
    { name: 'ContainersOverview', path: '/containers', component: () => import('@/views/volumes/VolumesOverview') },
    { name: 'VolumesOverview', path: '/volumes', component: () => import('@/views/volumes/VolumesOverview') },
    { name: 'VolumesOverview', path: '/volumes/:volume', component: () => import('@/views/volumes/VolumesOverview') },
    { name: 'NetworksOverview', path: '/networks', component: () => import('@/views/volumes/VolumesOverview') },
    { name: 'ImagesOverview', path: '/images', component: () => import('@/views/volumes/VolumesOverview') },
]