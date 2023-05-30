import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/login",
            name: "login",
            component: () => import("../views/login.vue")
        },
        {
            path: "/index",
            name: "index",
            component: () => import("../views/web/index.vue"),
            children: []
        }
    ]
})

export default router
