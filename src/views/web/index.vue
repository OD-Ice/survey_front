<template>
    <div class="survey_web">
        <header>
            <div class="left">
                <h2>问卷视界</h2>
            </div>
            <div class="right">
                <div class="icon_action">
                    <i class="iconfont iconzhuye"></i>
                </div>
                <SURVEYUserInfo></SURVEYUserInfo>
            </div>

        </header>
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
import SURVEYUserInfo from "../../components/user_info.vue"
import SURVEYSearch from "../../components/index/search.vue"
import SURVEYTables from "../../components/index/tables.vue"

</script>

<style lang="scss">
.survey_web {
    width: 100%;

    header {
        width: 100%;
        height: 60px;
        background-color: white;
        padding: 0 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .right {
            display: flex;
            align-items: center;
            .icon_action {
                margin-right: 20px;
                i {
                    margin-left: 10px;
                    cursor: pointer;
                    font-size: 25px;
                }
                i:hover{
                    color: var(--active)
                }
            }
        }
    }
;

    .main {
        display: flex;
        width: calc(100%);

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