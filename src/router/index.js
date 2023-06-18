import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            redirect: "/index" // 添加重定向
        },
        {
            path: "/login",
            name: "login",
            component: () => import("../views/login.vue")
        },
        {
            path: "/register",
            name: "register",
            component: () => import("../views/register.vue")
        },
        {
            path: "/index",
            name: "index",
            component: () => import("../views/web/index.vue"),
            children: []
        },
        {
            path: "/edit/:id",
            name: "edit",
            component: () => import("../views/web/edit.vue"),
            children: []
        },
        {
            path: "/answer/:id",
            name: "answer",
            component: () => import("../views/web/answer.vue"),
            children: []
        },
        {
            path: "/submit_success",
            name: "submit_success",
            component: () => import("../views/web/submit.vue"),
            children: []
        },
        {
            path: "/analyze/:id",
            name: "analyze",
            component: () => import("../views/web/analyze.vue"),
            children: []
        }
    ]
})

export default router
