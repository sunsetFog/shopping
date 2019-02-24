<template>
    <section id="page">
        <c-title :hide="false" text="提现"></c-title>
        <ul class="form">
            <li>
                <span>可提现：</span>
                <span>{{val}}&nbsp;<font>元</font></span>
            </li>
        </ul>
        <div class="btn">
            <button type="button" @click="submit">确认提现</button>
        </div>
        <!-- <el-button type="info" plain @click="routeTake(1)">提现</el-button> -->
    </section>
</template>

<script>
 import put_forward_coin_controller from './put_forward_coin_controller.js';
 export default put_forward_coin_controller;
</script>

<style lang="scss" rel="stylesheet/scss">
#page{
    padding-top:40px;
    .form{
        margin-top:0.625rem;
        background-color: #fff;
        padding-left: 0.875rem;
        li{
            padding-right:0.875rem;
            height:3.0625rem;
            line-height: 3.0625rem;
            font-size:16px;
            display: flex;
            span:first-child{
                width:30%;
                text-align: left;
            }
            span:last-child{
                color:#f15353;
            }
            font{
                color:#333;
            }
        }
    }
    .btn{
        margin-top:1.25rem;
        button{
            width:90%;
            height: 2.875rem;
            line-height: 2.875rem;
            border-radius: 0.375rem;
            font-size:16px;
            color:#fff;
            border:none;
            background-color: #15b315;
        }
    }
}
</style>