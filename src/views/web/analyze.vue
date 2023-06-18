<template>
    <div class="survey_web">
        <SURVEYHeader></SURVEYHeader>
        <div class="main">
            <SURVEYAnalyze></SURVEYAnalyze>
        </div>
    </div>
</template>

<script setup>

import SURVEYHeader from "@/components/index/header.vue";
import SURVEYAnalyze from "@/components/analyze/analyze.vue"

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