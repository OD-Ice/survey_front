<template>
    <div class="register-page">
        <div class="register-container">
            <div class="register_main">
                <div class="register_head">
                    用户注册
                </div>
                <div class="register_form">
                    <div class="register_item">
                        <a-input v-model:value="data.user_name" placeholder="用户名">
                            <template #prefix>
                                <i class="iconfont iconperson"></i>
                            </template>
                        </a-input>
                    </div>
                    <div class="register_item">
                        <a-select
                            ref="select"
                            v-model:value="data.sex"
                            style="width: 100%"
                            @focus="focus"
                        >
                            <a-select-option value=0>性别未知</a-select-option>
                            <a-select-option value=1>男</a-select-option>
                            <a-select-option value=2>女</a-select-option>
                        </a-select>
                    </div>
                    <div class="register_item">
                        <a-input v-model:value="data.phone" placeholder="手机号">
                            <template #prefix>
                                <i class="iconfont iconperson"></i>
                            </template>
                        </a-input>
                    </div>
                    <div class="register_item">
                        <a-input v-model:value="data.email" placeholder="邮箱">
                            <template #prefix>
                                <i class="iconfont iconperson"></i>
                            </template>
                        </a-input>
                    </div>
                    <div class="register_item">
                        <a-input v-model:value="data.nick_name" placeholder="昵称">
                            <template #prefix>
                                <i class="iconfont iconperson"></i>
                            </template>
                        </a-input>
                    </div>
                    <div class="register_item">
                        <a-input-password v-model:value="data.password" placeholder="密码">
                            <template #prefix>
                                <i class="iconfont iconmima"></i>
                            </template>
                        </a-input-password>
                    </div>
                    <div class="register_item">
                        <a-input-password v-model:value="data.confirm_password" placeholder="确认密码">
                            <template #prefix>
                                <i class="iconfont iconmima"></i>
                            </template>
                        </a-input-password>
                    </div>
                    <div class="register_item">
                        <a-button type="primary" @click="Register">
                            注册
                        </a-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {reactive} from "vue";
import {message} from "ant-design-vue";
import {Service} from "@/service/service";
import {useRouter} from "vue-router";
const router = useRouter()

const data = reactive({
    user_name: "",
    phone: "",
    email: "",
    sex: "0",
    nick_name: "",
    password: "",
    confirm_password: "",
})

async function Register() {
    if (data.user_name.trim() === "") {
        message.error("用户名不能为空！")
    }
    if (data.password.trim() === "") {
        message.error("密码不能为空！")
    }
    if (data.confirm_password.trim() === "") {
        message.error("请再次输入密码！")
    }
    await Service.post("/api/register", data,
    ).then(res => {
        if (res.code) {
            message.error(res.msg)
            return
        }
        message.info("注册成功")
        router.push({name: "login"})
    })
}


</script>

<style>
.register-page {
    background-image: url('src/assets/img/login_bg.jpg');
    background-size: cover;
    background-position: center;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.register-container {
    width: 400px;
    height: 600px;
    display: flex;
    background-color: rgba(0, 0, 0, 0.8);
    padding: 20px;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    .register_main {
        width: 80%;
        .register_head {
            font-size: 24px;
            font-weight: 600;
            color: white;
            text-align: center;
            margin-bottom: 20px;
        }
        .register_form {
            text-align: center;
            .register_item {
                margin-bottom: 20px;
            }
            .ant-btn {
                width: 100%;
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
