<template>
    <aside>
        <a-button class="create_survey" type="primary" size="large" :loading="loading" @click="enterLoading"><b>创建问卷
            +</b></a-button>
        <a-modal
            title="创建问卷"
            v-model:visible="visible"
            :confirm-loading="confirmLoading"
            @ok="handleOk"
        >
            <a-input v-model:value="survey_name" :placeholder="modalText"/>
        </a-modal>
        <a-menu
            id="left_menu"
            style="width: 180px"
            v-model:selectedKeys="selectedKeys"
            mode="inline"
            @click="handleClick"
        >
            <a-menu-item key="1">
                全部问卷
            </a-menu-item>
            <a-menu-item key="2">
                星标问卷
            </a-menu-item>
            <a-menu-item key="3">
                回收站
            </a-menu-item>
        </a-menu>
    </aside>
</template>

<script setup>
import {ref} from "vue";

const loading = ref(false)
function enterLoading() {
    loading.value = true;
    visible.value = true;
    setTimeout(
        () => {
            loading.value = false
        },
        30 * 1000
    )
}

const selectedKeys = ref(['1']);
function handleClick({key}) {
    selectedKeys.value = [key]
}

// 弹窗
const modalText = ref('请输入问卷标题');
const visible = ref(false);
const confirmLoading = ref(false);
function handleOk(){
    modalText.value = '问卷创建中...';
    confirmLoading.value = true;
    setTimeout(() => {
        visible.value = false;
        confirmLoading.value = false;
        loading.value = false;
    }, 2000);
}

// 问卷标题
const survey_name = ref("");
</script>

<style lang="scss">
aside {
    border: 1px solid #f0eeee;
    width: 240px;
    height: calc(100vh - 60px);
    background-color: white;
    text-align: center;

    .create_survey {
        width: 180px;
        margin-top: 20px;
    }

    #left_menu {
        margin-left: 30px;
    }
}
</style>