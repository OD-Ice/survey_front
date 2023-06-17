<template>
    <div class="option">
        <div class="option_title">
            <div class="option_num">
                <h2>{{ props.question_num }}.</h2>
            </div>
            <div class="option_text">
                <h2>{{ props.question.question_text }}(单选)</h2>
            </div>
            <template v-if="props.edit === '1'">
                <a-button class="edit-button" type="primary" @click="editQuestion(route, props.question.id, props.question.question_type, props.question.question_text, props.question.option_list)">编辑</a-button>
            </template>
        </div>
        <a-radio-group v-model:value="value">
            <template v-for="option in props.question.option_list">
                <a-radio :style="radioStyle" :value="option.id">{{ option.option_text }}</a-radio>
            </template>
        </a-radio-group>

    </div>
    <SURVEYOption></SURVEYOption>
</template>

<script setup>
import {reactive, ref} from "vue";
import SURVEYOption from "@/components/question/base_option.vue"
import {editQuestion} from "@/components/edit/main_edit.js"
import {useRoute} from "vue-router";

const route = useRoute()

const value = ref(null);
const radioStyle = reactive({
    display: 'flex',
    height: '30px',
    lineHeight: '30px',
});

const props = defineProps({
    question: Object,
    question_num: String,
    edit: String,
    answer_list: Array
})

props.answer_list.push({
    question_id: props.question.id,
    option_id: value,
})

</script>

<style lang="scss">

</style>