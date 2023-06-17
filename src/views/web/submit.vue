<template>
    <div class="survey_web">
        <SURVEYHeader></SURVEYHeader>
        <div class="main">
            <a-result
                status="success"
                title="提交成功!"
                sub-title=""
            >
                <template #extra>
                    <a-button key="console" type="primary">
                        <a href="/index">
                            返回主页
                        </a>
                    </a-button>
                </template>
            </a-result>
        </div>
    </div>
</template>

<script setup>

import SURVEYHeader from "@/components/index/header.vue";

</script>

<style lang="scss">
.survey_web {
    width: 100%;
    background-color: #f0eeee;
    .main {
        height: 600px;
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>