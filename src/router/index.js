import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/tasks.vue'
import {isLoggedIn} from '@/utils/util'
import AuthView from '../views/authPage.vue'

const routes = [
    {
        path: '/',
        name: 'Main',
        redirect: '/tasks'
    },
    {
        path: '/tasks',
        name: 'Tasks',
        component: HomeView,
        beforeEnter(to, from, next) {
            if (isLoggedIn()) {
                next()
            } else {
                next({name: "Authorization"});
            }
        }
    },
    {
        path: '/authorization',
        name: 'Authorization',
        component: AuthView
    },
    {
        path: "/:pathMatch(.*)*",
        name: "not-found",
        component: () => import("../views/notFound.vue"),
    },
    // {
    //     path: '/:pathMatch(.*)',
    //     redirect: '/login'
    // }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
