<template>
    <div class="main_edit">
        <div class="survey_title">
            <h1><b>{{ questionnaireData.title }}</b></h1>
        </div>
        <div class="question_list">
            <template v-for="question in questionList" :key="question.id">
                <div class="question_item">
                    <!-- 根据 question_type 插入不同的组件 -->
                    <template v-if="question.question_type === 1">
                        <SURVEYSingle :answer_list="answerList" :question="question" :question_num="question.question_num"></SURVEYSingle>
                    </template>
                    <template v-else-if="question.question_type === 2">
                        <SURVEYMultiple :answer_list="answerList" :question="question" :question_num="question.question_num"></SURVEYMultiple>
                    </template>
                    <template v-else-if="question.question_type === 3">
                        <SURVEYText :answer_list="answerList" :question="question" :question_num="question.question_num"></SURVEYText>
                    </template>
                </div>
            </template>
        </div>
        <div class="submit">
            <a-button class="submit_button" type="primary" size="large" @click="submitAnswer">提交答案</a-button>
        </div>
    </div>
</template>

<script setup>
import SURVEYSingle from "@/components/question/single_option.vue";
import SURVEYMultiple from "@/components/question/multiple_option.vue";
import SURVEYText from "@/components/question/text_option.vue";
import {reactive, ref} from "vue";
import {Service} from "@/service/service";
import {useRoute} from "vue-router";
import {message} from "ant-design-vue";
import router from "@/router";
import {getQuestionList} from "@/utils/get_data";
const route = useRoute()

const data = reactive({
    questionnaire_id: route.params.id
})
const questionList = reactive([]);

getQuestionList(data, questionList)

const answerList = []
let hasSubmit = false
function submitAnswer() {
    if (hasSubmit === true) {
        message.warn("请勿重复提交")
        return
    }

    const submitData = reactive({
        questionnaire_id: route.params.id,
        answer_list: answerList,
    })
    Service.post("/api/questionnaire/answer", submitData)
        .then(res => {
            if (res.code === 0) {
                router.push({name: "submit_success"})
            } else {
                message.error(res.msg)
            }
        })

    hasSubmit = true
}

const questionnaireData = ref({})

function getQuestionnaire() {
    const getData = {id: route.params.id}
    Service.get("/api/questionnaire/get", {params: getData})
        .then(response => {
            const { code, data } = response;
            if (code === 0) {
                questionnaireData.value = data;
            } else {
                // 处理错误情况
            }
        })
}

getQuestionnaire()

</script>

<style lang="scss">
.main_edit {
    width: calc(100% - 240px);
    height: auto;
    margin-top: 8px;
    margin-bottom: 50px;
    padding-bottom: 30px;
    background-color: white;
    box-shadow: 0 2px 5px 0 #d9d9d9;
    overflow: auto;
    .survey_title {
        padding: 0 50px;
        height: 100px;
        text-align: center;
        line-height: 100px;
    }
}
.option_title {
    margin-bottom: 10px;
    display: flex;
    justify-content: left;
}
.submit {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    .submit_button {
        width: 50%;
    }
}
</style>