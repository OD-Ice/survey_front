<script setup>

</script>

<template>
    <div class="avatar">
        <a-dropdown>
            <a class="ant-dropdown-link" @click.prevent>
                <div class="avatar_img">
                    <img src="https://img1.baidu.com/it/u=1592760890,4076657703&fm=253&fmt=auto&app=138&f=JPEG" alt="">
                </div>
                <div class="user_name">OD.Ice</div>
            </a>
            <template #overlay>
                <a-menu @click="onClick">
                    <a-menu-item key="1">个人中心</a-menu-item>
                    <a-menu-item key="2">问卷列表</a-menu-item>
                    <a-menu-item key="3">我的消息</a-menu-item>
                    <a-menu-item key="3" style="color: firebrick">注销退出</a-menu-item>
                </a-menu>
            </template>
        </a-dropdown>
    </div>
</template>

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