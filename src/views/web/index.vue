<template>
    <div class="survey_web">
        <SURVEYHeader></SURVEYHeader>
        <div class="main">
            <SURVEYAside></SURVEYAside>
            <div class="right-main">
                <div class="tabs">
                    <div class="tab_left">
                        <h2>问卷列表</h2>
                    </div>
                    <div class="tab_right">
                        <SURVEYSearch></SURVEYSearch>
                    </div>
                </div>
                <main>
                    <SURVEYTables></SURVEYTables>
                </main>
            </div>
        </div>
    </div>
</template>

<script setup>

import SURVEYAside from "../../components/index/aside.vue"
import SURVEYSearch from "../../components/index/search.vue"
import SURVEYTables from "../../components/index/tables.vue"
import SURVEYHeader from "../../components/index/header.vue"

</script>

<style lang="scss">
.survey_web {
    width: 100%;

    .main {
        display: flex;
        width: 100%;

        .right-main {
            width: calc(100% - 240px);

            .tabs {
                height: 60px;
                width: 100%;
                border: 1px solid #f0eeee;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .tab_left{
                    margin-left: 20px;
                }
                .tab_right{
                    margin-right: 20px;
                }
            }

            main {
                background-color: #f0eeee;
                width: 100%;
                height: calc(100vh - 90px);
            }
        }
    }
}

</style>