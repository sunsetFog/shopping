<template>
    <div id="shareholderCenter">
        <c-title :hide="false" text='区域分红中心'></c-title>
    
        <div class="share_holder">
            <div class="header-box">
                <span>{{level_name}}</span>
                <span>分红比例:{{rate}}%</span>
            </div>
            <ul class="today_bonus">
                <li v-for="item in ratioDatas" :class="item.name">
                    <span>{{item.money}}</span>
                    <br>
                    <b>{{item.data}}</b>
                </li>
                <li class="line">
                    <div class="careat"></div>
                </li>
            </ul>
        </div>
        <div class="shareholder-order">
            <div id="tabs">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="全部" name="first">

                        <ul class='rationList'>

                            <li v-for="elem in first_content">
                                <div class="detail">
                                    <span class="month">{{elem.create_month}}</span>
                                    <div class="info" v-for="item in elem.has_many_dividend">
                                        <ul class="left">
                                            <li>订单号：{{item.order_sn}}</li>
                                            <li class="time">时间：{{item.created_at}}</li>

                                        </ul>
                                        <ul class="right">
                                            <li>分红+{{item.dividend_amount}}</li>
                                            <li class="state">{{item.status_name}}</li>
                                        </ul>
                                    </div>
    
                                </div>
    
                            </li>
                        </ul>
                    </el-tab-pane>
                    <el-tab-pane label="已结算" name="second">
                        <ul class='rationList'>
                            <li v-for="elem in second_content">
                                <div class="detail">
                                    <span class="month">{{elem.create_month}}</span>
                                    <div class="info" v-for="item in elem.has_many_dividend">
                                        <ul class="left">
                                            <li>订单号：{{item.order_sn}}</li>
                                            <li class="time">时间：{{item.created_at}}</li>

                                        </ul>
                                        <ul class="right">
                                            <li>分红+{{item.dividend_amount}}</li>
                                            <li class="state">{{item.status_name}}</li>
                                        </ul>
                                    </div>
    
                                </div>
    
                            </li>
                        </ul>
                    </el-tab-pane>
                    <el-tab-pane label="未结算" name="third">
                        <ul class='rationList'>
                            <li v-for="elem in third_content">
                                <div class="detail">
                                    <span class="month">{{elem.create_month}}</span>
                                    <div class="info" v-for="item in elem.has_many_dividend">
                                        <ul class="left">
                                            <li>订单号：{{item.order_sn}}</li>
                                            <li class="time">时间：{{item.created_at}}</li>

                                        </ul>
                                        <ul class="right">
                                          <!--  <img :src="item.img">--> <li>分红+{{item.dividend_amount}}</li>
                                            <li class="state">{{item.status_name}}</li>
                                        </ul>
                                    </div>
    
                                </div>
    
                            </li>
                        </ul>
                    </el-tab-pane>

                     <el-tab-pane label="已失效" name="fourth">
                        <ul class='rationList'>
                            <li v-for="elem in fourth_content">
                                <div class="detail">
                                    <span class="month">{{elem.create_month}}</span>
                                    <div class="info" v-for="item in elem.has_many_dividend">
                                        <ul class="left">
                                            <li>订单号：{{item.order_sn}}</li>
                                            <li class="time">时间：{{item.created_at}}</li>

                                        </ul>
                                        <ul class="right">
                                          <!--  <img :src="item.img">--> <li>分红+{{item.dividend_amount}}</li>
                                            <li class="state">{{item.status_name}}</li>
                                        </ul>
                                    </div>
    
                                </div>
    
                            </li>
                        </ul>
                    </el-tab-pane>
                </el-tabs>
            </div>
    
        </div>
    
    </div>
</template>

<script>
import regional_agency_center_controller from './regional_agency_center_controller';
export default regional_agency_center_controller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
p {
    margin: 0;
    padding: 0;
}

#shareholderCenter {
    .m_header {
        width: 100%;
        height: 2.8125rem;
        line-height: 2.8125rem;
        font-size: 15px;
        font-weight: bold;
        background: #fff;
        span {
            display: inline-block;
            width: 1rem;
            height: 1.5rem;
            float: left;
            margin-left: 0.625rem;
            font-size: 30px;
        }
    }
    .share_holder {
        margin-top: 2.5rem;
        .header-box {
            font-size:14px;
            padding: 1rem 0.75rem;
            background: #f15353;
            color: #fff;
            display: flex;
            justify-content: space-between;
            span{
                line-height: 1.5rem;
            }
        }
        .today_bonus {
            width: 100%;
            height: 5.125rem;
            margin-top: 0.625rem;
            background: #fff;
            padding: 1rem 0;
            box-sizing: border-box;
            position: relative;
            border-bottom: 0.0625rem solid #e2e2e2;
            li.line {
                position: absolute;
                width: 0.0625rem;
                height: 3.25rem;
                background: #e2e2e2;
                top: 1rem;
                right: 34%;
                .careat {
                    width: 0.375rem;
                    height:0.375rem;
                    border: 0.0625rem solid #ddd;
                    border-left: 0;
                    border-bottom: 0;
                    -webkit-transform: rotate(45deg);
                    -moz-transform: rotate(45deg);
                    -ms-transform: rotate(45deg);
                    -o-transform: rotate(45deg);
                    transform: rotate(45deg);
                    background: #fff;
                    position: absolute;
                    top: 1.4375rem;
                    right: -0.1875rem;
                }
            }
            li {
                text-align: center;
                float: left;
                span {

                    font-size: 17px;
                    line-height: 1.625rem;
                    display: inline-block;
                    margin-bottom:0.625rem;
                }
                b {
                    font-size: 11px;
                    color: 3333;
                }
            }
            li.data {
                width: 22%;
                span {
                    color: #ffa800;
                }
            }
            li:first-child,
            li:nth-child(2) {
                border-right: 0.0625rem solid #e2e2e2;
            }
            li.mounth {
                width: 34%;
                span {
                    color: #fc6a70;
                }
            }
        }
    }
    .shareholder-order {
        background: #fff;
        .input {
            input {
                margin: 0.625rem 5%;
                width: 80%;
                height: 1.875rem;
                border-radius: 0.375rem;
                border: 0;
                outline: 0;
                padding-left: 1.875rem;
                background: url(../../../../assets/images/search.png) no-repeat 0.625rem 0.5rem #f2f2f2;
            }
        }
        .ratioNav {
            padding: 0rem;
            margin: 0rem;
            height: 2.5rem;
            width: 100%;
            background: #fff;
            border-bottom: 0.0625rem solid #cdcdcd;
            border-top: 0.0625rem solid #cdcdcd;
            li {
                float: left;
                width: 33%;
                text-align: center;
                line-height: 2.5rem;
                font-size: 14px;
                color: #666;
                border-bottom: 0.125rem solid transparent;
            }
            .selected {
                color: #f15353 !important;
                border-bottom: 0.125rem solid #f15353;
            }
        }
        .rationList {
            padding: 0rem;
            margin: 0rem;
            li {

                span.month{display: block;
                    text-align: left;
                    line-height: 2.25rem;
                    padding:0 0.75rem;
                    font-size:16px;
                    background: #f0f0f0;}
                .info{
                    border-bottom: 0.0625rem solid #e2e2e2;  
                    overflow: hidden;
                    padding:0.625rem 0.75rem;    
                    line-height: 1.25rem;
                    font-size:14px;
                    li{
                        line-height: 1.5rem;
                    }
                    .time,.state{
                        color:#8c8c8c;
                        font-size:12px;
                    }
                    .left {
                        width: 70%;
                        float: left;
                        text-align: left;
                        box-sizing: border-box;
                        span {
                            font-size: 14px;
                            font-weight: 400;
                            color: #333;
                        }
                        p {
                            font-size: 12px;
                            color: #999;
                        }
                    }
                    .right {
                        float: left;
                        width: 30%;
                        color: #20b86a;
                        text-align:right;
                        p{    margin: 0;
                            padding: 0;
                            font-size: 12px;
                            color: #888;}
                    }
                }
            }
        }
    }
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: #f3f5f7;
        .input {
            display: flex;
            height: 2.8125rem;
            background: #fff;
            box-sizing: border-box;
            margin: 0 0.625rem;
            i {
                font-size: 16px;
                line-height: 2.8125rem;
                padding-left: 0.25rem;
            }
            input {
                margin: 0.625rem 5%;
                width: 80%;
                height: 1.875rem;
                background: #f2f2f2;
                border-radius: 0.375rem;
                border: 0;
                outline: 0;
                padding-left: 1.875rem;
            }
        }
        .modal-dialog {
            h1 {
                font-size: 16px;
                color: #666;
                line-height: 3.4375rem;
                font-weight: normal;
                text-align: left;
                padding-left: 1.5625rem;
            }
            .select-time {
                text-align: center;
                .block {
                    width: 36%;
                    display: inline-block;
                }
                .el-input {
                    width: 100%;
                }
                span {
                    font-size: 22px;
                    font-weight: 400;
                }
            }
            .submit {
                width: 20.3125rem;
                height: 2.5rem;
                border-radius: 0.375rem;
                background-color: #f15353;
                text-align: center;
                line-height: 2.5rem;
                color: #fff;
                border: 0;
                outline: 0;
                font-size: 14px;
                font-weight: bold;
                margin-top: 1.25rem;
            }
        }
    }
    .serchActive {
        display: none !important;
    }
}
</style>