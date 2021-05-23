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
            path: 'category',
            name: 'Category',
            meta: { title: '分类' },
            component: () => import('@/views/category/index.vue')
        },{
            path: 'cart',
            name: 'Cart',
            meta: { title: '购物车' },
            component: () => import('@/views/cart/index.vue')
        },{
            path: 'my',
            name: 'My',
            meta: { title: '我的' },
            component: () => import('@/views/my/index.vue')
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
