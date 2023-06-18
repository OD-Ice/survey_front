<template>
    <div class="main_edit">
        <div class="survey_title">
            <h1><b>问卷标题</b></h1>
        </div>
        <div class="question_list">
            <template v-for="question in questionList" :key="question.id">
                <div class="question_item">
                    <!-- 根据 question_type 插入不同的组件 -->
                    <template v-if="question.question_type === 1">
                        <SURVEYSingle :question="question" :question_num="question.question_num" edit="1" :answer_list="[]"></SURVEYSingle>
                    </template>
                    <template v-else-if="question.question_type === 2">
                        <SURVEYMultiple :question="question" :question_num="question.question_num" edit="1" :answer_list="[]"></SURVEYMultiple>
                    </template>
                    <template v-else-if="question.question_type === 3">
                        <SURVEYText :question="question" :question_num="question.question_num" edit="1" :answer_list="[]"></SURVEYText>
                    </template>
                </div>
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
                <a-input v-model:value="questionData.question_text" placeholder="问题描述" allow-clear/>
                <br/>
                <br/>
                <a-select
                    ref="select"
                    v-model:value="questionData.question_type"
                    style="width: 100%"
                    @focus="focus"
                >
                    <a-select-option value=1>单项选择</a-select-option>
                    <a-select-option value=2>多项选择</a-select-option>
                    <a-select-option value=3>简答题</a-select-option>
                </a-select>
                <br/>
                <br/>
                <div v-if="questionData.question_type === '1' || questionData.question_type === '2'">
                    <a-input-group v-for="(option, index) in questionData.option_list" :key="index" class="option-input-group">
                        <div class="option">
                            <p>选项{{ String.fromCharCode(97 + index) }}:</p>
                            <a-input
                                v-model:value="option.option_text"
                                :placeholder="`选项${String.fromCharCode(97 + index)}`"
                                allow-clear
                            />
                            <br/>
                            <br/>
                            <a-button type="dashed" @click="removeOption(index)">
                                删除
                            </a-button>
                            <br/>
                            <br/>
                        </div>
                    </a-input-group>
                    <a-button type="dashed" @click="addOption">
                        添加选项
                    </a-button>
                </div>
            </a-modal>
        </div>
        <div class="edit_question">
            <a-modal
                title="编辑问题"
                v-model:visible="editVisible"
                @ok="editHandleOk"
                @cancel="getQuestionList"
            >
                <a-input v-model:value="editQuestionData.question_text" placeholder="问题描述" allow-clear/>
                <br/>
                <br/>
                <a-select
                    ref="select"
                    v-model:value="editQuestionData.question_type"
                    style="width: 100%"
                    @focus="focus"
                >
                    <a-select-option value=1>单项选择</a-select-option>
                    <a-select-option value=2>多项选择</a-select-option>
                    <a-select-option value=3>简答题</a-select-option>
                </a-select>
                <br/>
                <br/>
                <div v-if="editQuestionData.question_type === '1' || editQuestionData.question_type === '2'">
                    <a-input-group v-for="(option, index) in editQuestionData.option_list" :key="index" class="option-input-group">
                        <div class="option">
                            <p>选项{{ String.fromCharCode(97 + index) }}:</p>
                            <a-input
                                v-model:value="option.option_text"
                                :placeholder="`选项${String.fromCharCode(97 + index)}`"
                                allow-clear
                            />
                            <br/>
                            <br/>
                            <a-button type="dashed" @click="editRemoveOption(index)">
                                删除
                            </a-button>
                            <br/>
                            <br/>
                        </div>
                    </a-input-group>
                    <a-button type="dashed" @click="editAddOption">
                        添加选项
                    </a-button>
                </div>
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
import {message} from "ant-design-vue";
import {editVisible, editQuestionData} from "@/components/edit/main_edit.js"
import {getQuestionList} from "@/utils/get_data";
const route = useRoute()

const visible = ref(false);
const data = reactive({
    questionnaire_id: route.params.id
})
const questionList = reactive([]);

getQuestionList(data, questionList)

function addQuestion() {
    visible.value = true;
}

const questionData = reactive({
    "questionnaire_id": route.params.id,
    "question_text": "",
    "question_type": "1",
    "option_list": [],
})

function handleOk() {
    Service.post('/api/question/create', questionData)
        .then(res => {
            console.log(res.data)
            if (res.code === 0) {
                message.info("创建成功")
                getQuestionList(data, questionList)
            }
            visible.value = false;
        }
    )
}

function editHandleOk() {
    Service.post('/api/question/edit', editQuestionData)
        .then(res => {
                console.log(res.data)
                if (res.code === 0) {
                    message.info("修改成功")
                    getQuestionList(data, questionList)
                }
                editVisible.value = false;
            }
        )
}

function addOption() {
    const optionNumber = String.fromCharCode(97 + questionData.option_list.length);
    questionData.option_list.push({
        option_number: optionNumber,
        option_text: "",
    })

}
function editAddOption() {
    const optionNumber = String.fromCharCode(97 + editQuestionData.option_list.length);
    editQuestionData.option_list.push({
        option_number: optionNumber,
        option_text: "",
    });
}
function removeOption(index) {
    questionData.option_list.splice(index, 1);
}
function editRemoveOption(index) {
    editQuestionData.option_list.splice(index, 1);
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
.option_title {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
}
</style>