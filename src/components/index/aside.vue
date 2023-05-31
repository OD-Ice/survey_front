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
            <a-input v-model:value="data.title" :placeholder="modalText" allow-clear/>
            <br/>
            <br/>
            <a-textarea v-model:value="data.description" placeholder="问卷简介" allow-clear />
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
import {defineComponent, reactive, ref} from "vue";
import {message} from "ant-design-vue";
import {Service} from "@/service/service";

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
const modalText = ref('问卷标题');
const visible = ref(false);
const confirmLoading = ref(false);


// 创建问卷接口
const data = reactive({
    title: "",
    description: "",
})

async function handleOk(){
    if (data.title.trim() === "") {
        message.error("问卷标题不能为空！")
        return
    }
    confirmLoading.value = true;
    await Service.post("/api/questionnaire/create", data,
    ).then(res => {
        console.log(res)
    })
    visible.value = false;
    confirmLoading.value = false;
    loading.value = false;
    location.reload();
}

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