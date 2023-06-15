<script setup>

import SURVEYUserInfo from "@/components/user_info.vue";
</script>

<template>
    <header>
        <div class="left">
            <h2>问卷视界</h2>
        </div>
        <div class="right">
            <div class="icon_action">
                <i class="iconfont iconzhuye"></i>
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