import {reactive, ref} from "vue";
import {stringify} from "qs";

export const editVisible = ref(false);
export const editQuestionData = reactive({
    "questionnaire_id": "",
    "question_text": "",
    "question_type": "1",
    "option_list": [],
    "id": "0",
})

export function editQuestion (route, question_id, question_type, question_text, option_list) {
    editVisible.value = true;
    editQuestionData.questionnaire_id = route.params.id
    editQuestionData.id = question_id;
    editQuestionData.question_type = question_type.toString();
    editQuestionData.question_text = question_text;
    editQuestionData.option_list = option_list;
}