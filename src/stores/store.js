import {defineStore} from 'pinia'
import {message} from "ant-design-vue";

export const userStore = defineStore('survey', {
    state: () => {
        return {
            userInfo: {
                token: "",
                avatar: "",
                exp: 1685842940,
                nick_name: "",
                phone: "",
                sex: 0,
                user_id: 0,
            }
        }
    },
    actions: {
        // 修改userInfo
        setUserInfo(userInfo) {
            this.$patch({
                userInfo: userInfo
            })
            // 持久化
            localStorage.setItem("userInfo", JSON.stringify(userInfo))
        },
        loadUserInfo() {
            let info = localStorage.getItem("userInfo")
            if (info === null) {
                return
            }
            // 先json解析
            let userInfo = JSON.parse(info)
            // 判断时间是否失效
            let exp = userInfo.exp
            let nowTime = new Date().getTime()
            if (((exp * 1000) - nowTime) < 0) {
                // 过期了
                message.warn("当前登录已失效")
                return
            }
            this.setUserInfo(userInfo)
        },
        removeUserInfo() {
            this.$patch({
                userInfo: null
            })
            localStorage.removeItem("userInfo")
        }
    }
})
