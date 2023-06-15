<template>
    <div class="survey_web">
        <SURVEYHeader></SURVEYHeader>
        <div class="main">
            <SURVEYMainEdit></SURVEYMainEdit>
        </div>
    </div>
</template>

<script setup>

import SURVEYHeader from "@/components/index/header.vue";
import SURVEYMainEdit from "@/components/edit/main_edit.vue"

</script>

<style lang="scss">
.survey_web {
    width: 100%;
    background-color: #f0eeee;
    .main {
        display: flex;
        justify-content: center;

    }
}
</style>