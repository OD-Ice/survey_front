<template>
    <router-view/>
</template>

<script setup>
import {userStore} from "@/stores/store";

const store = userStore()
store.loadUserInfo()

</script>

<style lang="scss">
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
@import "../src/assets/css/iconfont.css";

:root{
    --active: #2184fc;
    --text: #555
}

</style>


