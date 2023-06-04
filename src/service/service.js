import axios from "axios";
import {userStore} from "@/stores/store";

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
    return response.data
})