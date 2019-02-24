<template>
    <section id="page">
        <c-title :hide="false" :text='dataObj.froze_name' tolink='LookDetailsCoin' totext='收入明细'></c-title>
        <section id="frozen-a">
            <yd-icon custom class="icon-member-frozen" color="#ffd147" size="5rem"></yd-icon>
            <ul class="info">
                <li>我的{{dataObj.froze_name}}</li>
                <li><span>￥</span>{{dataObj.thaw}}</li>
                <li>冻结{{dataObj.froze_name}}:<span>{{dataObj.froze}}</span>元</li>
            </ul>
            <div class="btn">
                <button type="button" @click="routeTake(1)">充值</button>
                <button type="button" @click="routeTake(3)">提现</button>
            </div>
            
        </section>
        <section id="frozen-b" v-if="!fun.isTextEmpty(dataObj.explain_content) && !fun.isTextEmpty(dataObj.explain_title)">
            <h1>{{dataObj.explain_title}}</h1>
            <p v-html="dataObj.explain_content"></p>
        </section>
        <!-- <el-button type="primary" plain @click="routeTake(1)">充值</el-button>
        <el-button type="success" plain @click="routeTake(2)">查看明细</el-button>
        <el-button type="info" plain @click="routeTake(3)">提现</el-button> -->
    </section>
</template>

<script>
 import frozen_coin_controller from './frozen_coin_controller.js';
 export default frozen_coin_controller;
</script>

<style lang="scss" rel="stylesheet/scss">
    #page{
        padding-top:40px;
        #frozen-a{
            padding-bottom:0.625rem;
            .info{
                text-align: center;
                li:first-child{
                    font-size:14px;
                }
                li:nth-child(2){
                    font-size:28px;
                    font-weight: bold;
                    span{
                        font-size:14px;
                    }
                }
                li:last-child{
                    line-height: 1.875rem;
                    font-size:14px;
                    color:#8c8c8c;
                    margin-top:0.625rem;
                }
            }
            .btn{
                margin-top:1.25rem;
                button{
                    width:90%;
                    height:2.875rem;
                    border-radius: 0.375rem;
                    margin-bottom:0.75rem;
                    font-size:16px;
                }
                button:first-child{
                    background-color: #15b315;
                    border:none;
                    color:#fff;
                }
                button:last-child{
                    background-color: #fff;
                    color:#333;
                    border:solid 0.0625rem #ccc;
                }
            }
        }
        #frozen-b{
            background-color: #fff;
            margin-top:0.625rem;
            h1{
                height:2.5rem;
                line-height: 2.5rem;
                padding:0 0.875rem;
                text-align: left;
                font-size:16px;
                border-bottom:solid 0.0625rem #ebebeb;
            }
            p{
                padding:0.625rem 0.875rem;
                line-height: 1.5rem;
                font-size:14px;
                text-align: left;
            }
        }
    }
</style>

