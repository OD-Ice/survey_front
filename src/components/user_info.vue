<template>
    <div class="avatar">
        <a-dropdown>
            <a class="ant-dropdown-link" @click.prevent>
                <div class="avatar_img">
                    <img :src="userInfo ? userInfo.avatar: ''" alt="">
                </div>
                <div class="user_name">{{ userInfo ? userInfo.nick_name : "" }}</div>
            </a>
            <template #overlay>
                <a-menu @click="onClick">
                    <a-menu-item key="1">个人中心</a-menu-item>
                    <a-menu-item key="2">问卷列表</a-menu-item>
                    <a-menu-item key="3">我的消息</a-menu-item>
                    <a-menu-item key="4" style="color: firebrick">注销退出</a-menu-item>
                </a-menu>
            </template>
        </a-dropdown>
    </div>
</template>

<script setup>
import {userStore} from "@/stores/store";
import router from '@/router'
import {Service} from "@/service/service";
import {message} from "ant-design-vue";

const store = userStore()

const userInfo = JSON.parse(localStorage.getItem("userInfo"))
// if (!userInfo) {
//     // 跳转到登录页面
//     message.warn("您已退出登录")
//     router.push({ name: "login" });
// }

function onClick({ key }) {
    if (key === '4') {
        logout()
    }
}

async function logout() {
    await Service.post("/api/auth/logout", {}).then(res => {
        console.log(res)
    })
    store.removeUserInfo()
    message.info("注销成功")
    setTimeout(() => {
        router.push({name: "login"})
    }, 1)
}

</script>

<style lang="scss">
.avatar {
    .ant-dropdown-link{
        display: flex;
        align-items: center;
        .avatar_img{
            img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
            }
        }
        .user_name{
            margin-left: 10px;
            color: var(--text);
        }
        .user_name:hover{
            color: var(--active);
        }
    }

}
</style>