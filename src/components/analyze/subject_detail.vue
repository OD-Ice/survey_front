<template>
    <div class="detail">
        <a-button
            class="detail_button"
            type="primary"
            @click="openModel(question)"
        >详情</a-button>
        <a-modal
            v-model:visible="visible"
            :title="question.question_text"
            @ok="handleOk"
            width="100%"
            wrap-class-name="full-modal"
            :footer="null"
        >
            <DetailTable :question="question"></DetailTable>
        </a-modal>
    </div>
</template>
<script setup>

import {Service} from "@/service/service";
import DetailTable from "@/components/analyze/detail_table.vue"
import {ref} from "vue";

const props = defineProps({
    question: Object,
})

const visible = ref(false)

function openModel() {
    visible.value = true;
}

// const getSubjectiveAnalyze = (question) => {
//     visible.value = true;
//     const getData = {id: question.id, page: page.value, results: results.value}
//     Service.get("/api/questionnaire/get_subjective_analyze", {params: getData})
// };
const handleOk = e => {
    console.log(e);
    visible.value = false;
};

</script>

<style lang="scss">
.full-modal {
    .ant-modal {
        max-width: 100%;
        top: 0;
        padding-bottom: 0;
        margin: 0;
    }
    .ant-modal-content {
        display: flex;
        flex-direction: column;
        height: calc(100vh);
    }
    .ant-modal-body {
        flex: 1;
    }
}

.detail {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
    .detail_button {
        width: 70%;
    }
}
</style>