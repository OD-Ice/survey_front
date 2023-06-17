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
            <template v-if="record.status !== '已删除'" class="publish">
                <a class="delete-button" href="#" @click="editStatus(record, -1)">删除</a>
            </template>
            <template v-if="record.status === '未发布'" class="publish">
                <a class="publish-button" href="#" @click="editStatus(record, 1)">发布</a>
            </template>
            <template v-else-if="record.status === '已发布'" class="publish">
                <a class="publish-button" href="#" @click="editStatus(record, 0)">下架</a>
            </template>
            <template v-else-if="record.status === '已删除'" class="publish">
                <a class="publish-button" href="#" @click="editStatus(record, 0)">恢复</a>
            </template>
            <template v-if="record.status === '已发布'" class="publish">
                <a class="publish-button" href="#" @click="copyText(record.id)">复制链接</a>
            </template>
        </template>
    </a-table>
</template>
<script>
import {usePagination} from 'vue-request';
import {computed, defineComponent, reactive} from 'vue';
import {userStore} from "@/stores/store";
import router from '@/router';
import {message} from "ant-design-vue";
import {Service} from "@/service/service";

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
                text: '未发布',
                value: 0,
            },
            {
                text: '已删除',
                value: -1,
            },
            {
                text: '已发布',
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
        width: 150,
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
                        item.status = "未发布";
                    } else if (item.status === -1) {
                        item.status = "已删除";
                    } else if (item.status === 1) {
                        item.status = "已发布";
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

        const editStatus = (record, statusNum) => {
            const data = reactive({
                "id": record.id,
                "status": statusNum
            })
            Service.post("/api/questionnaire/edit_status", data)
                .then(res => {
                    console.log(res.data)
                    if (res.code === 0) {
                        if (statusNum === -1) {
                            record.status = "已删除"
                        } else if (statusNum === 0) {
                            record.status = "未发布"
                        } else if (statusNum === 1) {
                            record.status = "已发布"
                        }
                        message.info("成功")
                    }
                })
        }
        const copyText = (questionnaireId) => {

            // 获取当前域名
            const currentDomain = window.location.origin;
            const textarea = `${currentDomain}/answer/${questionnaireId}`;

            // 复制文本
            navigator.clipboard.writeText(textarea)
                .then(() => {
                    message.info('文本已成功复制到剪贴板');
                })
                .catch((error) => {
                    message.error('复制文本到剪贴板时出错:', error);
                });
            // 在控制台打印复制的文本
            console.log('已复制文本:', textarea);
        }
        return {
            dataSource,
            pagination,
            loading,
            columns,
            editStatus,
            handleTableChange,
            copyText,
        };
    },
});
</script>
<style>
.delete-button{
    margin-left: 10px;
    color: red;
}
.publish-button {
    margin-left: 10px;
}
</style>