<template>
    <a-modal
        title="创建问题"
        v-model:visible="visible"
        @ok="handleOk"
    >
        <a-input v-model:value="a" :placeholder="modalText" allow-clear/>
    </a-modal>
</template>

<script setup>

const a = "1"

</script>

<style lang="scss">

</style>