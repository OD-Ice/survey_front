<template>
    <div class="search">
        <a-select
            v-model:value="value"
            show-search
            placeholder="问卷搜索"
            style="width: 200px"
            :default-active-first-option="false"
            :show-arrow="false"
            :filter-option="false"
            :not-found-content="null"
            :options="data"
            @search="handleSearch"
            @change="handleChange"
        >
        </a-select>
    </div>
</template>

<script setup>
import jsonp from 'fetch-jsonp';
import qs from 'qs';
import {ref} from 'vue';

let timeout;
let currentValue = '';

function fetch(value, callback) {
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }
    currentValue = value;

    function fake() {
        const str = qs.stringify({
            code: 'utf-8',
            q: value,
        });
        jsonp(`https://suggest.taobao.com/sug?${str}`)
            .then(response => response.json())
            .then(d => {
                if (currentValue === value) {
                    const result = d.result;
                    const data = [];
                    result.forEach(r => {
                        data.push({
                            value: r[0],
                            label: r[0],
                        });
                    });
                    callback(data);
                }
            });
    }

    timeout = setTimeout(fake, 300);
}


const data = ref([]);
const value = ref();

function handleSearch(val) {
    fetch(val, d => (data.value = d));
}

function handleChange(val) {
    console.log(val);
    value.value = val;
    fetch(val, d => (data.value = d));
}


</script>

<style lang="scss">

</style>