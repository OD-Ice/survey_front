import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// 引入ant-design-vue组件
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import axios from "axios";


// 设置 Axios 拦截器
axios.interceptors.response.use(
    response => {
        // 请求成功，直接返回响应
        return response
    },
    error => {
        // 请求出错，检查状态码
        if (error.response && error.response.status === 401) {
            // 跳转到登录页
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Antd)

app.mount('#app')
