<template>
    <div class="option">
        <div class="option_title">
            <div class="option_num">
                <h2>3.</h2>
            </div>
            <div class="option_text">
                <h2>第三题</h2>
            </div>
        </div>
        <a-textarea
            v-model:value="value"
            placeholder="Autosize height based on content lines"
            auto-size
        />
    </div>
    <SURVEYOption></SURVEYOption>
</template>

<script setup>
import {ref} from "vue";
import SURVEYOption from "@/components/question/base_option.vue"

const value = ref('');

</script>

<style lang="scss">

</style>