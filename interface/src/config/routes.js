import EmptyView from '@/views/EmptyView'

export default [
    { name: 'Dashboard', path: '/dashboard', component: () => import('@/views/volumes/VolumesOverview') },
    { name: 'ContainersOverview', path: '/containers', component: () => import('@/views/containers/ContainersOverview') },
    {
        path: '/volumes',
        component: EmptyView,
        children: [
            { name: 'VolumesOverview', path: '', component: () => import('@/views/volumes/VolumesOverview') },
            { name: 'VolumeInspect', path: ':volume', component: () => import('@/views/volumes/inspect/VolumeInspect'), props: true },
        ]
    },
    { name: 'NetworksOverview', path: '/networks', component: () => import('@/views/networks/NetworksOverview') },
    { name: 'ImagesOverview', path: '/images', component: () => import('@/views/images/ImagesOverview') },
]