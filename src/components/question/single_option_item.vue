<template>
    <a-radio :style="radioStyle" :value="option.id">{{ option.option_text }}</a-radio>
</template>

<script setup>
import {reactive} from "vue";

const radioStyle = reactive({
    display: 'flex',
    height: '30px',
    lineHeight: '30px',
});

const props = defineProps({
    option: Object,
})
</script>

<style lang="scss">

</style>