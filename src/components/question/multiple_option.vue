<template>
    <div class="option">
        <div class="option_title">
            <div class="option_num">
                <h2>2.</h2>
            </div>
            <div class="option_text">
                <h2>第二题</h2>
            </div>
        </div>
        <a-checkbox-group v-model:value="value" style="width: 100%">
            <a-row>
                <a-col :span="8">
                    <a-checkbox value="A">A</a-checkbox>
                </a-col>
                <a-col :span="8">
                    <a-checkbox value="B">B</a-checkbox>
                </a-col>
                <a-col :span="8">
                    <a-checkbox value="C">C</a-checkbox>
                </a-col>
                <a-col :span="8">
                    <a-checkbox value="D">D</a-checkbox>
                </a-col>
                <a-col :span="8">
                    <a-checkbox value="E">E</a-checkbox>
                </a-col>
            </a-row>
        </a-checkbox-group>
    </div>
    <SURVEYOption></SURVEYOption>
</template>

<script setup>
import {ref} from "vue";
import SURVEYOption from "@/components/question/base_option.vue"

const value = ref([]);
</script>

<style lang="scss">

</style>