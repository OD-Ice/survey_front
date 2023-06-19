<template>
    <div class="main_edit">
        <div class="survey_title">
            <h1><b>{{ questionnaireData.title }}</b></h1>
        </div>
        <div class="question_list">
            <template v-for="question in questionList" :key="question.id">
                <div class="question_item">
                    <h3 class="question_text">{{ question.question_num }}. {{ question.question_text }}</h3>
                    <!-- 根据 question_type 插入不同的组件 -->
                    <template v-if="question.question_type === 1 || question.question_type === 2">
                        <SURVEYOption :analyzeData="analyzeData" :question="question"></SURVEYOption>
                    </template>
                    <template v-else>
                        <SURVEYSubject :question="question"></SURVEYSubject>
                    </template>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup>
import SURVEYOption from "@/components/analyze/option_analyze.vue";
import SURVEYSubject from "@/components/analyze/subject_detail.vue"
import {reactive, ref, toRefs} from "vue";
import {Service} from "@/service/service";
import {useRoute} from "vue-router";
import {getQuestionList} from "@/utils/get_data";
const route = useRoute()

const data = reactive({
    questionnaire_id: route.params.id
})
const questionList = reactive([]);

const analyzeData = ref({});
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

async function getAnalyzeData() {
    const getData = {id: route.params.id}
    await Service.get("/api/questionnaire/analyze", {params: getData})
        .then(response => {
            const { code, data } = response;
            if (code === 0) {
                analyzeData.value = data;
            } else {
                // 处理错误情况
            }
        })
}

async function fetchData() {
    await getQuestionList(data, questionList);
    await getAnalyzeData()
    await getQuestionnaire()
}
fetchData()


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

.question_item {
    border: 1px solid #f0eeee;
}
.question_text {
    margin: 20px 50px;
}
</style>