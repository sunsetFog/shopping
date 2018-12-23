<template>
    <div id="goodsinfo">
        <c-title :hide="false" text='收银台'></c-title>
        <div style="height: 40px;"></div>

        <!--商品订单-->
        <div class="goods-detail">
            <div class="detail_good">
                <!--	<h3><i class="fa fa-gift"></i>合利爱购</h3>-->
                <div class="goods">
                    <div class="img">
                        <img :src="store.thumb">
                    </div>

                    <div class="warp">
                        <div class="inner">
                            <div class="name">{{store.name}}</div>
                        </div>
                    </div>

                </div>
            </div>

            <div class="tbs coupon-list" style="padding:0">
                <div class="coupon list" @click="changePayStatus()">
                    <mt-field label="付款金额" placeholder="请输入金额" v-model="confirmPay" autofocus type="number">
                    </mt-field>
                </div>
            </div>

            <div class="tbs coupon-list" style="padding:0" v-if="store_set.is_write_information == 1">
                <div class="coupon list">
                    <mt-field label="联系人" v-model="form.realname" placeholder="请输入联系人" type="text" :attr="{ maxlength: 30 }"></mt-field>
                    <mt-field label="电话" v-model="form.mobile" placeholder="请输入电话" type="tel" :attr="{ maxlength: 11 }"></mt-field>
                </div>
            </div>

            <div class="tbs" v-if="loadDiscount && order_data[0].order.order_deductions">
                <div class=" score list">
                    <div style="width:100%;display:block;clear:both;" v-for="d in order_data[0].order.order_deductions">
                        <div class="left ">
                            可用{{d.coin}}{{d.name}}
                            <span>{{d.amount}}元</span>
                        </div>
                        <div class="right">
                            <!-- <mt-switch v-model="d.checked" @change="discountHandle(order_data[0],d)"></mt-switch> -->
                             <!-- <mt-switch v-model="d.checked" @change="discountHandle(order_data[0],d)"></mt-switch> -->
                            <!-- <input type="checkbox" v-model="d.checked" @change="discountHandle(order_data[0],d)"/> -->
                            <el-switch v-model="d.checked" width="73" on-text="使用" off-text="不使用" @change="discountHandle(order_data[0],d)"></el-switch>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--商品订单结束-->

        <div class="tbs coupon-list" @click="showCoupon">
            <div class="coupon list">
                <div class="left ">优惠券
                    <font>{{coupon_size}}张可用</font>
                </div>
                <div class="right">
                    <font color="#E84E40">
                        <span>{{(use_coupon_size==0) ? "未使用":"已使用"+use_coupon_size+"张"}}</span>
                    </font>
                </div>
            </div>
        </div>

        <div class="tbs">
            <!--<div class="price list">
                    <div class="left ">会员折扣</div>
                    <div class="right">
                        <div class="right">
                            <font color="#E84E40">￥{{goods_price}}</font>
                        </div>
                    </div>
                </div>-->
            <div class="price list">
                <div class="left ">总优惠</div>
                <div class="right">
                    <div class="right">
                        <font color="#E84E40">-￥{{discount_price}}</font>
                    </div>
                </div>
            </div>

            <div class="price list">
                <div class="left ">总抵扣</div>
                <div class="right">
                    <div class="right">
                        <font color="#E84E40">-￥{{deduction_price}}</font>
                    </div>
                </div>
            </div>
            <div class="price list">
                <div class="left ">实付金额</div>
                <div class="right">
                    <div class="right">
                        <font color="#E84E40">￥{{price}}</font>
                    </div>
                </div>
            </div>
        </div>

        <div class="">
            <div class="price list mod_btns" v-if="!confirmOrderStatus">
                <a class="mod_btn bg_wechat" @click="confirmOrder()">优惠买单</a>
            </div>
            <div class="price list mod_btns" v-for="btn in payType" v-if="confirmOrderStatus">
                <a class="mod_btn" @click="submit(btn)" :class="[btnclass(btn.value)]">{{btn.name}}</a>
                
                <div v-if="huanxun_form_quick == btn.value || huanxun_form_wx == btn.value">
					<form id="ipspaysubmit" method="post" :action="huanxun_form_action">
						<input type="hidden" :name="huanxun_input_name" v-model="huanxun_form_input">
					</form>
				</div>
            </div>
        </div>

        <mt-popup v-model="popupCouponSpecs" position="bottom" class="mint-popup-4" closeOnClickModal='true'>
            <div class="add-info">

                <!--<el-checkbox-group v-model="checkCouponList">-->

                <div class="coupon-list-info" v-for="coupon in coupons">

                    <div class="checkList">
                        <el-checkbox :label=coupon :checked=coupon.checked @change="selectCoupon" :disabled="!coupon.valid"> &nbsp </el-checkbox>
                    </div>
                    <div :class="{coupon_voucher_main :coupon.valid, coupon_voucher_gray :!coupon.valid}">
                        <div class="coupon_voucher_left">

                            <div v-if="coupon.belongs_to_coupon.coupon_method==1">
                                <p class="coupon_voucher_amount type_large">{{coupon.belongs_to_coupon.deduct}}</p>
                                <p class="coupon_voucher_limit">满{{coupon.belongs_to_coupon.enough}}立减</p>
                            </div>
                            <div v-else>
                                <p class="coupon_voucher_amount type_large">{{coupon.belongs_to_coupon.discount}}折</p>
                                <p class="coupon_voucher_limit">满{{coupon.belongs_to_coupon.enough}}立享</p>
                            </div>

                            <!--<p class="coupon_voucher_amount type_large">20</p>
                                                                                            <p class="coupon_voucher_limit">满{{coupon.enough}}元可用</p>-->

                        </div>
                        <div class="coupon_voucher_hr"></div>
                        <div class="coupon_voucher_right">
                            <p class="coupon_voucher_range">{{coupon.belongs_to_coupon.name}}</p>
                            <p class="coupon_voucher_period">{{coupon.time_start}}-{{coupon.time_end}}</p>

                        </div>

                    </div>
                </div>

                <!--</el-checkbox-group>-->

            </div>
            <button class=" sure" @click="popupCouponSpecs=fales">确认</button>
            <button class="close" @click="popupCouponSpecs=fales">取消</button>
        </mt-popup>





        <!--支付密码-->
        <mt-popup v-model="popupSpecs" position="bottom"  closeOnClickModal='true'>
            <div class="pay-psw-info">
                <div class="pay_content_title">
                    支付密码
                </div>
                <div class="pay_content">

                    <div class="pay_content_view">

                        <div class="ipt_pay">

                            <div class="ipt_pay_p">{{pw1|pwd_filter}}</div>
                            <!-- <input type="password" maxlength="1" disabled> -->

                        </div>
                        <div class="ipt_pay">
                            <div class="ipt_pay_p">{{pw2|pwd_filter}}</div>
                            <!-- <input type="password" maxlength="1" disabled> -->

                        </div>
                        <div class="ipt_pay">
                            <div class="ipt_pay_p">{{pw3|pwd_filter}}</div>
                            <!-- <input type="password" maxlength="1" disabled> -->

                        </div>
                        <div class="ipt_pay">
                            <div class="ipt_pay_p">{{pw4|pwd_filter}}</div>
                            <!-- <input type="password" maxlength="1" disabled> -->

                        </div>
                        <div class="ipt_pay">
                            <div class="ipt_pay_p">{{pw5|pwd_filter}}</div>
                            <!-- <input type="password" maxlength="1" disabled> -->

                        </div>
                        <div class="ipt_pay">
                            <div class="ipt_pay_p">{{pw6|pwd_filter}}</div>
                            <!-- <input type="password" maxlength="1" disabled> -->

                        </div>

                    </div>

                </div>
                <footer style="position:inherit;">
                    <ul class="pay_btn">
                        <li @click="onPassword('1')">1</li>
                        <li @click="onPassword('2')">2</li>
                        <li @click="onPassword('3')">3</li>
                        <li @click="onPassword('4')">4</li>
                        <li @click="onPassword('5')">5</li>
                        <li @click="onPassword('6')">6</li>
                        <li @click="onPassword('7')">7</li>
                        <li @click="onPassword('8')">8</li>
                        <li @click="onPassword('9')">9</li>
                        <li class="b9"></li>
                        <li @click="onPassword('0')">0</li>
                        <li class="b9" @click="pwdDelete">删除</li>
                    </ul>
                </footer>
            </div>

        </mt-popup>

    </div>
</template>


<script>
import pay_controller from './pay_controller';
export default pay_controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.mod_btns {
    margin: 0.625rem 0;
    height: 2.5rem;
    line-height: 2.5rem;
    font-size: 16px;
    .mod_btn {
        display: block;
        width: 96%;
        margin: 0.9375rem 2%;
        border-radius: 0.3125rem;
    }
    .mod_btn.bg_wechat {
        background: #26ce29;
        color: #fff;
    }
    .mod_btn.bg_alipay {
        background: #FF6100;
        color: #fff;
    }
    .mod_btn.bg_ali {
        background: #22aaed;
        color: #fff;
    }
}

#goodsinfo {
    .onclast {
        position: relative;
        top: -18.125rem;
    }
    .goods-shop {
        background: #fff;
        line-height: 1.875rem;
        border-bottom: #e8e8e8 solid 0.0625rem;
        margin-top: 0.625rem;
        p {
            text-align: left;
            margin: 0;
            padding: 0 0 0 0.625rem;
            font-size: 12px;
            color: #555;
        }
    }
    .add-info {
        overflow-y: scroll;
        width: 100%;
        background: #FFF;
        max-height: 50vh;
        padding-top: 0.625rem;
    }
    .mint-popup-4 {
        width: 100%;

        .sure {
            background: #f15353;
            height: 2.5rem;
            line-height: 2.5rem;
            color: #fff;
            width: 50%;
            border: 0;
            float: left;
        }
        .close {
            background: #eee;
            height: 2.5rem;
            line-height: 2.5rem;
            color: #333;
            width: 50%;
            border: 0;
            float: left;
        }
        .address-plus {
            background: #f15353;
            height: 2.5rem;
            line-height: 2.5rem;
            color: #fff;
            width: 100%;
            border: 0;
        }

        ul {
            overflow-y: scroll;
        }
        li {
            padding: 0.625rem 0;
            display: flex;
            position: relative;
            .liia {
                flex: 9;
                text-align: left;
                padding-left: 1.25rem;
                .name {
                    font-size: 18px;
                    color: #222;
                    line-height: 2rem;
                }
                .address {
                    font-size: 12px;
                    color: #666;
                    line-height: 2rem;
                }
            }
            i {
                flex: 1;
            }
        }
    }
    .addr {
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        background: #FFF;
        padding: 0.625rem 0;
        i {
            flex: 1;
            font-size: 20px;
            color: #888888
        }
        .el-icon-arrow-right {
            font-size: .9rem;
        }
        p {
            flex: 6;
            text-align: justify;
            font-weight: bold;
            line-height: 1.5rem;
            padding-right: 1rem;
            color: #333333;
            span {
                font-size: 14px;
                font-weight: normal;
                color: #666;
            }
        }
    }
    .detail_good {
        background: #FFF;
        overflow: hidden;
        .content {
            text-align: left;
            background: #efeded;
            padding: 0.625rem;
            color: #8C6700;
        }
        a {
            color: #000000;
        }
        h3 {
            text-align: left;
            margin: 0.5625rem 0;
            i {
                font-size: 20px;
                padding-right: 0.3125rem;
            }
        }
        .goods:after {
            content: "";
            display: block;
            clear: both;
        }
        .goods {
            /*display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-align: stretch;
                -ms-flex-align: stretch;
                align-items: stretch;
                -webkit-box-orient: horizontal;
                -webkit-box-direction: normal;
                -ms-flex-flow: row wrap;
                flex-flow: row wrap;
                */
            padding: 0.625rem;
            width: 100%;
            box-sizing: border-box;
            background: #fafafa;
            .img {
                /*flex: 1;*/
                width: 100%;
                float: left;
                display: block;
                /*background:blue;*/
                img {
                    width: 4.375rem;
                    border-radius: 0.3125rem;
                }
            }
            .warp {
                width: 100%;
                float: left;
                display: block;
                padding-top: 0.3125rem;
                .inner {
                    width: 100%;
                    float: left;
                    box-sizing: border-box;
                    padding: 0 0.3125rem;
                    text-align: center;
                    .name {
                        text-align: center;
                        color: #333333;
                        margin-bottom: 0.625rem;
                    }
                }

                .price {
                    width: 30%;
                    align-items: center;
                    text-align: right;
                    color: #333333;
                    box-sizing: border-box;
                    float: left;
                    padding-right: 0.25rem;
                    p {
                        margin-top: 0
                    }
                }
            }



            .option {
                color: #888;
                font-size: 12px;
                flex: 1;
            }
        }
    }

    .nums {
        background: #FFF;
        text-align: right;
        margin: 0;
        padding-right: 0.625rem;
        line-height: 2rem;
    }
    .tbs.coupon-list {
        margin-top: 0.625rem;
        margin-bottom: 0.625rem
    }
    .coupon.list {

        .left font {
            color: #fff;
            background: #f15353;
            font-size: 12px;
            height: 1.25rem;
            padding: 0 0.3125rem;
            border-radius: 0.1875rem;
            margin-left: 0.3125rem;
        }
        .right font span {
            font-size: 12px;
        }
        .right font i {
            font-size: .8rem;
            color: #999;
        }
    }
    .tbs {
        display: flex;
        flex-direction: column;
        align-items: center;
        background: #FFF;
        flex-flow: row wrap;
        padding: 0.625rem;
        line-height: 1.5rem;
        border-top: #e8e8e8 solid 0.0625rem;
        border-bottom: #e8e8e8 solid 0.0625rem;
        font-size: 12px;
        .list {
            width: 100%;
            padding-bottom: 0.625rem;
        }
        .list:nth-last-child(1) {
            padding-bottom: 0
        }
        .left {
            text-align: left;
            float: left;
            color: #858585;
            span {
                font-size: 14px;
            }
        }
        .right {
            text-align: right;
            float: right;
        }
        p {
            text-align: left;
            margin: 0;
            padding-right: 0.625rem;
            line-height: 2rem;
            width: 100%;
            span {
                color: #858585;
                font-size: 12px;
                float: right;
            }
        }
    }
    .detail_pay {
        text-align: left;
        height: 3rem;
        width: 100%;
        background: #fff;
        padding: 0 0 0 2%;
        margin-top: 1.875rem;
        border-top: 0.0625rem solid #eaeaea;
        position: fixed;
        bottom: 0rem;
        box-sizing: border-box;
        line-height: 3rem;
        .order_delete {
            height: 3rem;
            width: auto;
            background: #f15353;
            padding: 0 0.9375rem;
            color: #FFF;
            line-height: 3rem;
            float: right;
            border: 0.0625rem solid #f15353;
        }
    }
    span {
        color: #f15353;
        font-size: 18px;
    }
}

.checkList {
    position: relative;
    top: 1.875rem;
    left: 0.1875rem;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
}

.el-checkbox {
    float: left;
    margin-left: 0.3125rem;
}

.coupon-list-info {
    width: 99.5vw;
}

.coupon_voucher_main {
    position: relative;
    padding-left: 6.375rem;
    height: 5rem;
    margin-left: 2.25rem;
    margin-right: 0.625rem;
    margin-bottom: 0.625rem;
    .coupon_voucher_left {
        position: absolute;
        top: 0;
        left: 0;
        width: 6.375rem;
        height: 100%;
        color: #fff;
        border-radius: 0.25rem 0 0 0.25rem;
        text-align: center;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: #47c1c4;
        .coupon_voucher_amount.type_large {
            margin: 0;
            font-size: 22px;
        }
        .coupon_voucher_amount {
            position: relative;
            font-family: helvet;
            font-size: 36px;
            line-height: 1;
        }
        .coupon_voucher_amount:before {
            content: "\00A5";
            font-size: 16px;
            display: inline-block;
            vertical-align: text-top;
            margin-right: 0.1875rem;
            line-height: 1;
        }
        .coupon_voucher_limit {
            font-size: 12px;
            line-height: 1;
            margin-top: 0.9375rem;
            margin-bottom: 0;
        }
    }



    .coupon_voucher_hr {
        position: absolute;
        top: 0;
        left: 6.0625rem;
        width: 0.375rem;
        overflow: hidden;
        height: 100%;
    }
    .coupon_voucher_hr:after {
        box-sizing: border-box;
        position: absolute;
        top: -0.1875rem;
        right: -0.1875rem;
        bottom: 0;
        content: "• • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • •";
        line-height: 0.625rem;
        width: 0.4375rem;
        color: #f8fbfb;
        font-size: 18px;
        overflow: hidden;
        z-index: 1;
    }
    .coupon_voucher_right {
        box-sizing: border-box;
        padding: 0.9375rem 0.9375rem 0.9375rem 0.625rem;
        height: 100%;
        border-radius: 0 0.25rem 0.25rem 0;
        background-color: #e5f3f3;
        color: #666;
        .coupon_voucher_range {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            font-size: 12px;
            text-align: left;
            margin: 0;
            padding: 0;
            vertical-align: baseline;
        }
        .coupon_voucher_period {
            color: #999;
            font-size: 12px;
            position: absolute;
            bottom: 0;
        }
    }
}

.coupon_voucher_gray {
    position: relative;
    padding-left: 6.375rem;
    height: 5rem;
    margin-left: 2.25rem;
    margin-right: 0.625rem;
    margin-bottom: 0.625rem;
    .coupon_voucher_left {
        position: absolute;
        top: 0;
        left: 0;
        width: 6.375rem;
        height: 100%;
        color: #fff;
        border-radius: 0.25rem 0 0 0.25rem;
        text-align: center;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: #ccc;
        .coupon_voucher_amount.type_large {
            margin: 0;
            font-size: 22px;
        }
        .coupon_voucher_amount {
            position: relative;
            font-family: helvet;
            font-size: 36px;
            line-height: 1;
        }
        .coupon_voucher_amount:before {
            content: "\00A5";
            font-size: 16px;
            display: inline-block;
            vertical-align: text-top;
            margin-right: 0.1875rem;
            line-height: 1;
        }
        .coupon_voucher_limit {
            font-size: 12px;
            line-height: 1;
            margin-top: 0.9375rem;
            margin-bottom: 0;
        }
    }

    .coupon_voucher_hr {
        position: absolute;
        top: 0;
        left: 6.0625rem;
        width: 0.375rem;
        overflow: hidden;
        height: 100%;
    }
    .coupon_voucher_hr:after {
        box-sizing: border-box;
        position: absolute;
        top: -0.1875rem;
        right: -0.1875rem;
        bottom: 0;
        content: "• • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • •";
        line-height: 0.625rem;
        width: 0.4375rem;
        color: #f8fbfb;
        font-size: 18px;
        overflow: hidden;
        z-index: 1;
    }
    .coupon_voucher_right {
        box-sizing: border-box;
        padding: 0.9375rem 0.9375rem 0.9375rem 0.625rem;
        height: 100%;
        border-radius: 0 0.25rem 0.25rem 0;
        background-color: #eee;
        color: #666;
        .coupon_voucher_range {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            font-size: 12px;
            text-align: left;
            margin: 0;
            padding: 0;
            vertical-align: baseline;
        }
        .coupon_voucher_period {
            color: #999;
            font-size: 12px;
            position: absolute;
            bottom: 0;
        }
    }
}

.mint-header {
    background: none;
    color: #666;
}

.is-fixed .mint-header-title {
    font-weight: bold;
}

.mint-header.is-fixed {
    border-bottom: 0.0625rem solid #e8e8e8;
    background: #FFF;
    z-index: 99;
}

.is-right a {
    font-size: 12px;
}



.address_addnav {
    width: 100%;
    padding: 0 3% 0 6%!important;
    position: fixed;
    bottom: 0;
    left: 0;
    background: #f15353 !important;
    color: #fff !important;
    text-align: center;
    height: 2.75rem !important;
    line-height: 2.75rem !important;
}

.popup-con {
    width: 100%;
}

#goodsinfo .animation {
    top: 0;
    header {
        display: flex;
    }
    .address_addnav {
        display: block;
    }
}

#AllGood {
    position: fixed;
    top: 200vh;
    height: 100vh;
    overflow: scroll;
    width: 100%;
    background: #FFF;
    z-index: 100;
    transition: .6s ease-out;
    display: block;
    #appendAddress .mint-field .mint-cell-title {
        text-align: left;
    }
    .address_addnav,
    header {
        display: none;
    }
    .address_addnav span {
        color: #FFF;
    }
    .address_addnav i {
        color: #fff;
        font-size: 22px;
        position: absolute;
        top: 50%;
        height: 1.125rem;
        line-height: 1.125rem;
        margin-left: -2.125rem;
        margin-top: -0.5625rem;
    }

    .maleall {
        background: #FFF;
        text-align: left;
    }
    #appendAddress {}

    #appendAddress .males {

        line-height: 3.125rem;
        display: flex;
        border-top: 0.0625rem solid #d9d9d9;
        margin-left: 0.625rem;
        padding-right: 0.625rem;
        position: relative;
        .address {
            display: inline-block;
            position: relative;
            width: 70%;
            float: right;
            box-sizing: border-box;
            padding-top: 0.5rem
        }
    }

    .maleall span {
        color: #333;
        font-size: 16px;
        vertical-align: middle;
        width: 6.5625rem;
        -webkit-box-flex: 0;
        -ms-flex: none;
        flex: none;
        display: inline-block;
        line-height: 3.125rem;
    }

    #appendAddress .maleall .males .address {
        position: absolute !important;
        right: 1.25rem !important;
        top: 0rem;
    }


    .maleall .el-select {
        width: 65%;
        float: right;
        position: relative;
    }


    #address {
        flex: 1;
        line-height: 3.125rem;
        .mint-button--default {
            line-height: 3.125rem;
            text-align: left;
            font-size: 16px;
        }
    }
}







.pay-psw-info {
	overflow-y: scroll;
	width: 100vw;
	height: auto;
	background: #FFF;
	max-height: 80vh;
	padding-top: 0.625rem;
}

footer {
	position: absolute;
	bottom: 0;
	width: 100vw;
	font-weight: 600;
}

.pay_btn {
	border-top: 0.0625rem solid #ddd;
	width: 100vw;
	height: auto;
}


.pay_btn li {
	width: 33%;
	float: left;
	height: 3rem;
	line-height: 3rem;
	text-align: center;
	background: #fff;
	font-size: 14px;
	border-right: 0.0625rem solid #ddd;
	border-bottom: 0.0625rem solid #ddd;
}


.pay_btn li:active {
	background: #C2C2C2;
}

.b9:active {
	background: #fff !important;
}

.b9 {
	background: #C2C2C2 !important;
}

.pay_content {
	width: 100vw;
	height: 3.125rem;
	margin-bottom: 0.625rem;
}

.pay_content_title {
	width: 100vw;
	height: 1.875rem;
	line-height: 1.875rem;
	margin-bottom: 0.625rem;
	font-size: 18px;
}

.pay_content_view {
	width: 100vw;
	height: 3.125rem; // margin-left: 0.125rem;
	border-bottom: 0.0625rem solid #ddd;
	border-top: 0.0625rem solid #ddd;
	border-right: 0.0625rem solid #ddd;
}

.ipt_pay_p {
	line-height: 3.125rem;
	height: 3.125rem;
	font-size: 20px;
}

.ipt_pay {
	float: left;
	width: 16.27%;
	height: 3.125rem;
	text-align: center;
	border-left: 0.0625rem solid #ddd;
}
</style>