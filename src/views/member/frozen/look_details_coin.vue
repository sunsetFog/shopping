<template>
    <section id="page">
        <c-title :hide="false" text="查看明细"></c-title>
        <el-tabs @tab-click="handleClick" v-model="active_tab">
            <el-tab-pane label="全部" name="all">
                <mt-loadmore v-if="all_goload" :top-method="all_loadTop" :bottom-method="all_loadBottom" :bottom-all-loaded="all_allLoaded" ref="all_loadmore" bottomPullText='' bottomDropText='下拉加载...' bottomLoadingText='' :autoFill='false'>
                    <ul class="list" v-for="item in all_con">
                        <li>
                            <span>{{item.source_name}}</span>
                            <span>{{item.change_value}}</span>
                        </li>
                        <li>
                            <span>{{item.created_at}}</span>
                            <span>{{item.value_type_name}}</span>
                        </li>
                    </ul>
                </mt-loadmore>
            </el-tab-pane >
            <el-tab-pane label="收入" name="income">
                <mt-loadmore v-if="income_goload" :top-method="income_loadTop" :bottom-method="income_loadBottom" :bottom-all-loaded="income_allLoaded" ref="income_loadmore" bottomPullText='' bottomDropText='下拉加载...' bottomLoadingText='' :autoFill='false'>
                     <ul class="list" v-for="item in income_con">
                        <li>
                            <span>{{item.source_name}}</span>
                            <span>{{item.change_value}}</span>
                        </li>
                        <li>
                            <span>{{item.created_at}}</span>
                            <span>{{item.value_type_name}}</span>
                        </li>
                    </ul>
                </mt-loadmore>
                 
            </el-tab-pane >
            <el-tab-pane label="支出" name="pay">
                <mt-loadmore v-if="pay_goload" :top-method="pay_loadTop" :bottom-method="pay_loadBottom" :bottom-all-loaded="pay_allLoaded" ref="pay_loadmore" bottomPullText='' bottomDropText='下拉加载...' bottomLoadingText='' :autoFill='false'>
                     <ul class="list" v-for="item in pay_con">
                        <li>
                            <span>{{item.source_name}}</span>
                            <span>{{item.change_value}}</span>
                        </li>
                        <li>
                            <span>{{item.created_at}}</span>
                            <span>{{item.value_type_name}}</span>
                        </li>
                    </ul>
                </mt-loadmore>
            </el-tab-pane >
        </el-tabs>
        
        <!-- <el-button type="success" plain @click="routeTake(1)">查看明细</el-button> -->
    </section>
</template>

<script>
 import look_details_coin_controller from './look_details_coin_controller.js';
 export default look_details_coin_controller;
</script>

<style lang="scss" rel="stylesheet/scss">
    #page{
        padding-top:40px;
        .list{
            border-bottom:solid 0.0625rem #ebebeb;
            background-color: #fff;
            padding:0.625rem 0.875rem;
            li{
                display: flex;
                justify-content: space-between;
                line-height: 1.5rem;
                font-size:14px;
            }
            li:first-child{
                span:last-child{
                    color:#f15353;
                }
            }
            li:last-child{
                color:#8c8c8c;
            }
        }
    }
</style>