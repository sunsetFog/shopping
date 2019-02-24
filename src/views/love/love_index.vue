<template>
    <div id="love_index">

        <c-title :hide="false" :text='love_name'></c-title>
        <div style="height: 40px;margin-bottom:1.25rem;"></div>
        <center><i class="fa fa-heart"></i></center>
        <p class="my-banlance">
            <font>{{love_name}}</font>激活<br/>
            <span><b>{{usable}}</b></span>
            <br/>
        </p>
        <div id="djj">冻结{{love_name}}{{froze}}元</div>

          <div id="dyj" v-if="no_recharge>0">待用{{love_name}}{{no_recharge}}元</div>

        <p>
            <el-button type="success" @click="chargeHandel" v-if="transfer_status">转账</el-button>
            <br/>

            <router-link :to="fun.getUrl('love_trading_sell')">
                <el-button type="success" v-if="trading_status==1">
                    {{love_name}}出售
                </el-button>
            </router-link>
            <br/>

            <router-link :to="fun.getUrl('love_trading')">
                <el-button type="success" v-if="trading_status==1">
                    交易中心
                </el-button>
            </router-link>

             <router-link :to="fun.getUrl('loveWithdrawals')">
                <el-button type="success" v-if="withdraw_status">
                    提现
                </el-button>
            </router-link>
        </p>

        <div id="jh">
            <span id="jhst"><router-link :to="fun.getUrl('love_record')">激活记录</router-link></span>
            <span><router-link :to="fun.getUrl('love_list')">查看明细</router-link></span>
        </div>
        <div id="helps">
            <router-link :to="fun.getUrl('love_explain')"><p>?</p>{{love_name}}说明</router-link>
        </div>
    </div>
</template>
<script>
    import love_index_Controller from './love_index_Controller';
    export default love_index_Controller;

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    #love_index {
        button {
            height:2.875rem;
            width: 90%;
            margin: 0.3125rem 0.9375rem;
        }
        i {
            font-size: 4.375rem;
            color: #f15353;
        }
        .my-banlance {
            margin: 1.25rem 0;
            font-size: 14px;
            color: #333;
            line-height: 2rem;
        }
        .my-banlance span {
            font-size: 14px;
            color: #333;
            margin-top: 0.625rem;
        }
        .my-banlance span b {
            font-size: 28px;
        }
        #djj {
            margin: 0.9375rem 0;
            font-size: 18px;
        }
              #dyj {
            margin: 0.9375rem 0;
            font-size: 18px;
             color: #f15353;
        }
        #jh {
            margin-bottom:5rem;
            margin-top:0.3125rem;
            #jhst {
                border-right: 0.0625rem solid #8C8C8C;
                padding-right: 0.9375rem;
            }
            span {
                padding: 0 0.9375rem;
            }
        }
        #helps {
            position: fixed;
            bottom: 0.625rem;
            left: 0;
            right: 0;
            a {
                color: #607d8b;
                font-size: 12px;
            }
            p {
                background: #f15353;
                color: #FFF;
                border-radius: 50%;
                width: 1.25rem;
                height: 1.25rem;
                line-height: 1.25rem;
                margin: 0 auto;
                margin-bottom: 0.25rem;
            }

        }
    }
</style>