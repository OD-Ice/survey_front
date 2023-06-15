<template>
    <div class="main_edit">
        <div class="survey_title">
            <h1><b>问卷标题</b></h1>
        </div>
        <div class="question_list">
            <template v-for="question in questionList" :key="question.id">
                <!-- 根据 question_type 插入不同的组件 -->
                <template v-if="question.question_type === 1">
                    <SURVEYSingle :question="question" :question_num="question.question_num"></SURVEYSingle>
                </template>
                <template v-else-if="question.question_type === 2">
                    <SURVEYMultiple :question="question" :question_num="question.question_num"></SURVEYMultiple>
                </template>
                <template v-else-if="question.question_type === 3">
                    <SURVEYText :question="question" :question_num="question.question_num"></SURVEYText>
                </template>
            </template>
        </div>
        <div class="add_question">
            <a-button type="primary" size="large" @click="addQuestion">
                添加问题
            </a-button>
            <a-modal
                title="创建问题"
                v-model:visible="visible"
                @ok="handleOk"
            >
                <a-input v-model:value="questionText" placeholder="问题描述" allow-clear/>
                <br/>
                <br/>
                <a-select
                    ref="select"
                    v-model:value="questionType"
                    style="width: 100%"
                    @focus="focus"
                >
                    <a-select-option value=1>单项选择</a-select-option>
                    <a-select-option value=2>多项选择</a-select-option>
                    <a-select-option value=3>简答题</a-select-option>
                </a-select>
            </a-modal>
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
const route = useRoute()

const questionText = ref("")
const questionType = ref("1")
const visible = ref(false);
const data = reactive({
    questionnaire_id: route.params.id
})
const questionList = reactive([]);

Service.get('/api/question/get_list', {params: data})
    .then(response => {
        const { code, data } = response;
        if (code === 0) {
            questionList.splice(0, questionList.length, ...data.question_list);
        } else {
            // 处理错误情况
        }
    })
    .catch(error => {
        // 处理异常情况
    });

function addQuestion() {
    console.log(visible)
    visible.value = true;
}

function handleOk() {

}

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
    .add_question {
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>