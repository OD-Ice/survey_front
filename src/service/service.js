import axios from "axios";
import {userStore} from "@/stores/store";
import {message} from "ant-design-vue";
import router from "@/router";

export const Service = axios.create({
    timeout: 7000,
    baseURL: "",
    headers: {
        "Content-Type": "application/json"
    }
})

Service.interceptors.request.use(request => {
    const store = userStore()
    if (store.userInfo) {
        request.headers["token"] = store.userInfo.token
    }
    return request
})

Service.interceptors.response.use(response => {
        if (response.data.code !== 0) {
            message.error(response.data.msg)
        }
        return response.data
    },
    error => {
        // 请求出错，检查状态码
        if (error.response && error.response.status === 401) {
            // 跳转到登录页
            message.warn("当前登录已失效")
            setTimeout(() => {
                router.push({name: "login"})
            }, 1)
        } else {
            message.error(error.response.data.msg)
        }
        return Promise.reject(error)
    })