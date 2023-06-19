<template>
    <a-table :dataSource="dataSource" :columns="columns" />
    <br>
    <a-pagination v-model:current="page" :total="1000" pageSize=50 @change="getSubjectiveAnalyze" how-less-items />
</template>

<script setup>
import {ref} from "vue";
import {Service} from "@/service/service";

const props = defineProps({
    question: Object
})

const page = ref(1)
const results = ref(50)

const dataSource = ref([])
const columns = [
    {
        title: '答案编号',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: '提交时间',
        dataIndex: 'create_at',
        key: 'create_at',
    },
    {
        title: '答案',
        dataIndex: 'text_answer',
        key: 'text_answer',
    },
]

function getSubjectiveAnalyze() {
    const getData = {id: props.question.id, page: page.value, results: results.value}
    Service.get("/api/questionnaire/get_subjective_analyze", {params: getData})
        .then(response => {
            const { code, data } = response;
            if (code === 0) {
                dataSource.value = data;
            } else {
                // 处理错误情况
            }
        })
}

getSubjectiveAnalyze()

</script>

<style lang="scss">

</style>