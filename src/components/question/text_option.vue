<template>
    <div class="option">
        <div class="option_title">
            <div class="option_num">
                <h2>{{ props.question_num }}.</h2>
            </div>
            <div class="option_text">
                <h2>{{ props.question.question_text }}(简答/填空)</h2>
            </div>
            <a-button class="edit-button" type="primary" @click="editQuestion(route, props.question.id, props.question.question_type, props.question.question_text, props.question.option_list)">编辑</a-button>
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
import {editQuestion} from "@/components/edit/main_edit";
import {useRoute} from "vue-router";

const route = useRoute()
const value = ref('');

const props = defineProps({
    question: Object,
    question_num: String,
    option_list: Array,
})

</script>

<style lang="scss">

</style>