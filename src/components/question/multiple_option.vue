<template>
    <div class="option">
        <div class="option_title">
            <div class="option_num">
                <h2>{{ props.question_num }}.</h2>
            </div>
            <div class="option_text">
                <h2>{{ props.question.question_text }}(多选)</h2>
            </div>
            <template v-if="props.edit === '1'">
                <a-button class="edit-button" type="primary" @click="editQuestion(route, props.question.id, props.question.question_type, props.question.question_text, props.question.option_list)">编辑</a-button>
            </template>
        </div>
        <a-checkbox-group v-model:value="value" style="width: 100%">
            <a-row>
                <template v-for="option in props.question.option_list" :key="option.id">
                    <a-col :span="8">
                        <a-checkbox :value="option.id">{{ option.option_number }}. {{ option.option_text }}</a-checkbox>
                    </a-col>
                </template>
            </a-row>
        </a-checkbox-group>
    </div>
    <SURVEYOption></SURVEYOption>
</template>

<script setup>
import {ref} from "vue";
import SURVEYOption from "@/components/question/base_option.vue"
import {editQuestion} from "@/components/edit/main_edit";
import {useRoute} from "vue-router";

const route = useRoute()
const value = ref([]);

const props = defineProps({
    question: Object,
    question_num: String,
    edit: String,
    answer_list: Array
})

props.answer_list.push({
    question_id: props.question.id,
    option_id_list: value,
})


</script>

<style lang="scss">

</style>