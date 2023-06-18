import {Service} from "@/service/service";

export async function getQuestionList(data, questionList) {
    await Service.get('/api/question/get_list', {params: data})
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
}