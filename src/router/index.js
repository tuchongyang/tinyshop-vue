import { createRouter, createWebHistory } from 'vue-router'


const routes = [
    {
        path: '',
        meta: { title: '首页' },
        component: () => import('@/components/Layout/index.vue'),
        children: [{
            path: '',
            name: 'Home',
            meta: { title: '首页' },
            component: () => import('@/views/home/index.vue')
        },{
            path: '/:catchAll(.*)',
            meta: { title: '404' },
            component: () => import('@/views/public/404.vue')
        }]

    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
