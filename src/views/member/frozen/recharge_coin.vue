<template>
    <section id="page">
        <c-title :hide="false" text="充值"></c-title>
        <!-- <el-button type="primary" plain @click="routeTake(1)">充值</el-button> -->
        <ul class="form">
            <li>
                <span>当前冻结值：</span>
                <span>{{val}}&nbsp;<font>元</font></span>
            </li>
            <li>
                <span>充值金额：</span>
                <input type="number" placeholder="请输入金额" v-model="recharge_val">
            </li>
        </ul>
        <div class="btn">
            <button type="button" @click="submitOrder('alipay')" v-if="alipay_show">支付宝充值</button>
            <button type="button" @click="submitOrder('wechatpay')" v-if="wechat_show">微信充值</button>
        </div>
    </section>
</template>

<script>
 import recharge_coin_controller from './recharge_coin_controller.js';
 export default recharge_coin_controller;
</script>

<style lang="scss" rel="stylesheet/scss">
    #page{
        padding-top:40px;
        .form{
            margin-top:0.625rem;
            background-color: #fff;
            padding-left:0.875rem;
            li{
                height:3.0625rem;
                line-height: 3.0625rem;
                display: flex;
                padding-right:0.875rem;
                border-bottom:solid 0.0625rem #ebebeb;
                font-size:16px;
                span{
                    width:30%;
                    text-align: left;
                }
                input{
                    border:none;
                }
                font{
                    color:#333;
                }
            }
            li:last-child{
                border:none;
            }
        }
        .btn{
            margin-top:1.25rem;
            button{
                height:2.875rem;
                line-height: 2.875rem;
                width:90%;
                border-radius: 0.375rem;
                border:none;
                font-size:16px;
                margin-bottom:0.75rem;
            }
            button:first-child{
                background-color: #3e89de;
                color:#fff;
            }
            button:last-child{
                background-color: #15b315;
                color:#fff;
            }
        }
    }
</style>