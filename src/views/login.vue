<template>
    <div class="login-page">
        <div class="login-container">
            <div class="login_main">
                <div class="login_head">
                    用户登录
                </div>
                <div class="login_form">
                    <div class="login_item">
                        <a-input v-model:value="data.user_name" placeholder="手机号/邮箱/用户名">
                            <template #prefix>
                                <i class="iconfont iconperson"></i>
                            </template>
                        </a-input>
                    </div>
                    <div class="login_item">
                        <a-input-password v-model:value="data.password" placeholder="密码">
                            <template #prefix>
                                <i class="iconfont iconmima"></i>
                            </template>
                        </a-input-password>
                    </div>
                    <div class="login_item">
                        <a-button type="primary" @click="login">
                            登录
                        </a-button>
                        <div class="register">
                            <a href="/register">立即注册</a>
                        </div>
                    </div>
                    <div class="login_third">
                        更多登录方式
                    </div>
                    <div class="login_third_icon">
                        <i class="iconfont iconweixin icon_item"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {reactive} from "vue";
import {Service} from "@/service/service";
import {ParseToken} from "@/utils/jwt";
import {userStore} from "@/stores/store"
import {message} from "ant-design-vue";
import {useRouter} from "vue-router";
const router = useRouter()

const data = reactive({
    user_name: "",
    password: "",
})

async function login() {
    await Service.post("/api/login", data,
    ).then(res => {
        console.log(res)
        if (res.code) {
            message.error(res.msg)
            return
        }
        let userInfo = ParseToken(res.data.token)
        userInfo.token = res.data.token
        const store = userStore()
        store.setUserInfo(userInfo)
        message.info("登录成功")
        // 页面跳转
        setTimeout(() => {
            router.push({name: "index"})
        })
    })
}



</script>

<style>
.login-page {
    background-image: url('src/assets/img/login_bg.jpg');
    background-size: cover;
    background-position: center;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-container {
    width: 400px;
    height: 600px;
    display: flex;
    background-color: rgba(0, 0, 0, 0.8);
    padding: 20px;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    .login_main {
        width: 80%;
        .login_head {
            font-size: 24px;
            font-weight: 600;
            color: white;
            text-align: center;
            margin-bottom: 20px;
        }
        .login_form {
            text-align: center;
            .login_item {
                margin-bottom: 20px;
            }
            .register {
                margin-top: 20px;
            }
            .ant-btn {
                width: 100%;
            }
        }
        .login_third {
            font-size: 14px;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            &::before {
                width: 30%;
                height: 1px;
                background-color: white;
                display: inline-block;
                content: "";
                margin-right: 10px;
            }
            &::after {
                width: 30%;
                height: 1px;
                background-color: white;
                display: inline-block;
                content: "";
                margin-left: 10px;
            }
        }
        .login_third_icon {
            margin-top: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            .icon_item {
                color: #f0eeee;
                font-size: 30px;
                cursor: pointer;
            }
        }
    }
}

h2 {
    color: white;
}

input {
    margin-bottom: 10px;
}

button {
    margin-top: 10px;
    background-color: #3090ff;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 5px;
    cursor: pointer;
}
</style>
