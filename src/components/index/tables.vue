<template>
    <a-table
        :columns="columns"
        :data-source="dataSource"
        :pagination="pagination"
        :loading="loading"
        :scroll="{ x: 1000, y: 2000 }"
        @change="handleTableChange"
        bordered
    >
        <template #name="{ text }">{{ text.first }} {{ text.last }}</template>
        <template #action="{ record }">

              <a :href="`/edit/${record.id}`">编辑</a>

        </template>
    </a-table>
</template>
<script>
import {usePagination} from 'vue-request';
import {computed, defineComponent} from 'vue';
import {userStore} from "@/stores/store";
import router from '@/router';
import {message} from "ant-design-vue";

const store = userStore()

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        sorter: true,
        width: 100,
        fixed: "left",
    },
    {
        title: '标题',
        dataIndex: 'title',
        sorter: true,
        width: 100,
        fixed: "left",
    },
    {
        title: '描述',
        dataIndex: 'description',
    },
    {
        title: '状态',
        dataIndex: 'status',
        sorter: true,
        filters: [
            {
                text: '正常',
                value: 0,
            },
            {
                text: '已删除',
                value: 1,
            }
        ],
    },
    {
        title: '创建时间',
        dataIndex: 'create_at',
        sorter: true,
    },
    {
        title: '修改时间',
        dataIndex: 'update_at',
        sorter: true,
    },
    {
        title: '操作',
        dataIndex: 'action',
        width: 100,
        fixed: "right",
        slots: {
            customRender: 'action',
        },
    }
];
async function queryData(params) {
    const response = await fetch(`/api/questionnaire/get_list?${new URLSearchParams(params)}`, {
        headers: {"token": store.userInfo.token},
    });
    if (response.status === 401) {
        // 弹窗提示
        message.warn("您已退出登录");
        // 跳转到登录页面
        setTimeout(() => {
            router.push({name: "login"})
        }, 1)
        return
    }
    return response.json();
}

export default defineComponent({
    setup() {
        const {
            data: dataSource,
            run,
            loading,
            current,
            pageSize,
        } = usePagination(queryData, {
            headers: {
                'token': store.userInfo.token
            },
            formatResult: res => {
                return res.data.map(item => {
                    if (item.status === 0) {
                        item.status = "正常";
                    } else if (item.status === 1) {
                        item.status = "已删除";
                    } else {
                        item.status = "未知"
                    }
                    return item;
                });
            },
            pagination: {
                currentKey: 'page',
                pageSizeKey: 'results',
            },
        });
        const pagination = computed(() => ({
            total: 200,
            current: current.value,
            pageSize: pageSize.value,
        }));
        const handleTableChange = (pag, filters, sorter) => {
            run({
                results: pag.pageSize,
                page: pag?.current,
                sortField: sorter.field,
                sortOrder: sorter.order,
                ...filters,
            });
        };
        return {
            dataSource,
            pagination,
            loading,
            columns,
            handleTableChange,
        };
    },
});
</script>