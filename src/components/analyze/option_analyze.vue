<template>
    <a-table class="table" :columns="columns" :data-source="analyzeData[question.id]" :pagination="false">
        <template #headerCell="{ column }">
        </template>
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'option_scale'">
                <a-progress
                    :stroke-color="{
                        '0%': '#108ee9',
                        '100%': '#87d068',
                      }"
                    status="active"
                    :percent="record.option_scale * 100"
                />
            </template>
            <template v-else-if="column.key === 'option_id'">
                {{ record.option_text }}
            </template>
        </template>
    </a-table>
</template>
<script setup>
import {reactive, toRaw, toRefs, watch} from "vue";

const columns = [{
        title: '选项',
        dataIndex: 'option_id',
        key: 'option_id',
    },
    {
        title: '选择小计',
        dataIndex: 'count',
        key: 'count',
    },
    {
        title: '选择比例',
        dataIndex: 'option_scale',
        key: 'option_scale',
    }
];


const props = defineProps({
    question: Object,
    analyzeData: Object,
})

</script>
<style lang="scss">
.table {
    margin: 0 50px 20px;
    border: 1px solid #f0eeee;
}
</style>