<template>
    <div class="option">
        <div class="option_title">
            <div class="option_num">
                <h2>{{ props.question_num }}.</h2>
            </div>
            <div class="option_text">
                <h2>{{ props.question.question_text }}</h2>
            </div>
        </div>
        <a-radio-group v-model:value="value">
            <SURVEYSingleItem v-for="option in option_list" :option="option"></SURVEYSingleItem>
        </a-radio-group>
    </div>
    <SURVEYOption></SURVEYOption>
</template>

<script setup>
import {reactive, ref} from "vue";
import SURVEYOption from "@/components/question/base_option.vue"
import SURVEYSingleItem from "@/components/question/single_option_item.vue"

const value = ref("");
const radioStyle = reactive({
    display: 'flex',
    height: '30px',
    lineHeight: '30px',
});

const props = defineProps({
    question: Object,
    question_num: String,
    option_list: Array,
})
</script>

<style lang="scss">

</style>