<script setup>

import SURVEYUserInfo from "@/components/user_info.vue";
</script>

<template>
    <header>
        <div class="left">
            <h2>狗狗问卷</h2>
        </div>
        <div class="right">
            <div class="icon_action">
                <router-link to="/index">
                    <i class="iconfont iconzhuye"></i>
                </router-link>
            </div>
            <SURVEYUserInfo></SURVEYUserInfo>
        </div>
    </header>
</template>

<style lang="scss">
header {
    width: 100%;
    height: 60px;
    background-color: white;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .right {
        display: flex;
        align-items: center;
        .icon_action {
            margin-right: 20px;
            i {
                color: black;
                margin-left: 10px;
                cursor: pointer;
                font-size: 25px;
            }
            i:hover{
                color: var(--active)
            }
        }
    }
}
</style>