<template>
    <div>
        <div id="rush-buy" :style="'background:'+datas.params.bgcolor">
            <!-- 商品组标题 -->
            <h4 :style="'height:1.875rem;line-height:1.875rem;font-size:1rem;text-align:left;'+'background:'+datas.params.bgcolor+';'+'color:'+datas.params.titlecolor" v-if="datas.params.showtitle == 1?true:false">{{datas.params.title}}</h4>
            <!-- 单行 -->
            <div class="single-row" v-if="datas.params.style=='100%' && showTime(item.start_time)?true:false" v-for="item in datas.data" @click.stop.prevent="buy(item)">
                <div class="img">
                    <img :src="item.img?item.img:require('../assets/images/loading.jpg')">
                    <div class="sale-img" :class="datas.params.option"></div>
                    <div class="time-box" v-if="datas.params.countdown">
                        <yd-countdown :time="item.end_time"></yd-countdown>
                    </div>
                </div>
                <ul class="text">
                    <li class="title">
                        <h2 v-if="showTitle">{{item.name}}</h2>
                        <span v-if="datas.params.overage">仅剩<big>{{item.stock}}</big>件</span>
                    </li>
                    <li class="price">
                        <span class="left" v-if="datas.params.price != '0' && datas.params.price == 1?true:false">
                                            <font class="price-a" :style="'color:'+datas.params.titlecolor"><small>￥</small>{{item.pricenow}}</font>
                                            <font class="price-b" :style="'color:'+datas.params.titlecolor" v-if="!(item.pricenow ==  item.priceold)"><small>￥</small>{{item.priceold}}</font>
                                        </span>
                        <span class="left" v-if="datas.params.price != '0' && datas.params.price == 2?true:false">
                                            <font class="price-a" :style="'color:'+datas.params.titlecolor"><small>￥</small>{{item.pricenow}}</font>
                                            <!-- <font class="price-b"><small>￥</small>128.50</font> -->
                                        </span>
                        <button type="button" v-if="!(fun.isTextEmpty(datas.params.buysub))" :class="datas.params.buysub" @click="buy(item)">立即抢购</button>
                    </li>
                </ul>
            </div>
            <!-- 双行 -->
            <div class="double-row" v-if="datas.params.style=='49.5%'?true:false">
                <dl class="list-box" v-for="item in datas.data" v-if="showTime(item.start_time)" @click.stop.prevent="buy(item)">
                    <dt class="img">
                                        <img :src="item.img?item.img:require('../assets/images/loading.jpg')">
                                        <div class="sale-img" :class="datas.params.option"></div>
                                        <div class="time-box" v-if="datas.params.countdown"><yd-countdown :time="item.end_time"></yd-countdown></div>
                                    </dt>
                    <dt class="text">
                                        <h2 v-if="showTitle">{{item.name}}</h2>
                                        <dd class="price" v-if="datas.params.price != '0' && datas.params.price == 1?true:false">
                                            <span class="left" :style="'color:'+datas.params.titlecolor"><small>￥</small>{{item.pricenow}}</span>
                                            <span class="right" :style="'color:'+datas.params.titlecolor" v-if="!(item.pricenow ==  item.priceold)"><small>￥</small>{{item.priceold}}</span>
                                        </dd>
                                        <dd class="price" v-if="datas.params.price != '0' && datas.params.price == 2?true:false">
                                            <span class="left" :style="'color:'+datas.params.titlecolor"><small>￥</small>{{item.pricenow}}</span>
                                            <!-- <span class="right"><small>￥</small>228.50</span> -->
                                        </dd>
                                        <dd class="rob">
                                            <span class="left" v-if="datas.params.overage">仅剩<big>{{item.stock}}</big>件</span>
                                            <button type="button" v-if="!(fun.isTextEmpty(datas.params.buysub))" :class="datas.params.buysub" @click="buy(item)">立即抢购</button>
                                        </dd>
                                    </dt>
                </dl>
                <!-- <dl class="list-box">
                                    <dt class="img">
                                        <img src="">
                                        <div class="time-box"><yd-countdown time="2018/06/18 24:00:00"></yd-countdown></div>
                                    </dt>
                                    <dt class="text">
                                        <h2>宝得适安全座椅双面骑士辣椒红</h2>
                                        <dd class="price"><span class="left"><small>￥</small>128.50</span><span class="right"><small>￥</small>228.50</span></dd>
                                        <dd class="rob">
                                            <span class="left">仅剩<big>0</big>件</span>
                                            <button type="button">立即抢购</button>
                                        </dd>
                                    </dt>
                                </dl> -->
            </div>
            <!-- 三行 -->
            <div class="three-row" v-if="datas.params.style=='33.3%'?true:false">
                <dl class="list-box" v-for="item in datas.data" v-if="showTime(item.start_time)" @click.stop.prevent="buy(item)">
                    <dt class="img">
                                            <img :src="item.img?item.img:require('../assets/images/loading.jpg')">
                                            <div class="sale-img" :class="datas.params.option"></div>
                                            <div class="time-box" v-if="datas.params.countdown"><yd-countdown :time="item.end_time"></yd-countdown></div>
                                        </dt>
                    <dt class="text">
                                            <h2 v-if="showTitle">{{item.name}}</h2>
                                            <dd class="price" v-if="datas.params.price != '0' && datas.params.price == 1?true:false">
                                                <span class="price-a" :style="'color:'+datas.params.titlecolor"><small>￥</small>{{item.pricenow}}</span>
                                                <!-- <span class="price-b" :style="'color:'+datas.params.titlecolor" v-if="!(item.pricenow ==  item.priceold)"><small>￥</small>{{item.priceold}}</span> -->
                                            </dd>
                                            <dd class="price" v-if="datas.params.price != '0' && datas.params.price == 2?true:false">
                                                <span class="price-a" :style="'color:'+datas.params.titlecolor"><small>￥</small>{{item.pricenow}}</span>
                                            </dd>
                                            <dd class="rob">
                                                <span class="left" v-if="datas.params.overage">仅剩<big>{{item.stock}}</big>件</span>
                                            </dd>
                                            <dd class="button" v-if="!(fun.isTextEmpty(datas.params.buysub))"><button type="button" :class="datas.params.buysub" @click="buy(item)">立即抢购</button></dd>
                                    </dt>
                </dl>
                <!-- <dl class="list-box">
                                    <dt class="img">
                                            <img src="">
                                            <div class="time-box"><yd-countdown time="2018/06/18 24:00:00"></yd-countdown></div>
                                        </dt>
                                    <dt class="text">
                                            <h2>宝得适安全座椅双面骑士辣椒红</h2>
                                            <dd class="price"><span class="price-a"><small>￥</small>128.50</span><span class="price-b"><small>￥</small>228.50</span></dd>
                                            <dd class="rob">
                                                <span class="left">仅剩<big>0</big>件</span>
                                            </dd>
                                            <dd class="button"><button type="button">立即抢购</button></dd>
                                        </dt>
                                </dl>
                                <dl class="list-box">
                                    <dt class="img">
                                            <img src="">
                                            <div class="time-box"><yd-countdown time="2018/06/18 24:00:00"></yd-countdown></div>
                                        </dt>
                                    <dt class="text">
                                            <h2>宝得适安全座椅双面骑士辣椒红</h2>
                                            <dd class="price"><span class="price-a"><small>￥</small>128.50</span><span class="price-b"><small>￥</small>228.50</span></dd>
                                            <dd class="rob">
                                                <span class="left">仅剩<big>0</big>件</span>
                                            </dd>
                                            <dd class="button"><button type="button">立即抢购</button></dd>
                                        </dt>
                                </dl> -->
            </div>
            <!-- 横 -->
            <div class="across-row" v-if="datas.params.style=='hp'?true:false">
                <div class="list" v-for="item in datas.data" v-if="showTime(item.start_time)" @click.stop.prevent="buy(item)">
                    <div class="img">
                        <img :src="item.img?item.img:require('../assets/images/loading.jpg')">
                        <div class="sale-img" :class="datas.params.option"></div>
                        
                        <div class="time-box" v-if="datas.params.countdown">
                            <yd-countdown :time="item.end_time"></yd-countdown>
                        </div>
                    </div>
                    <ul class="text">
                        <h2 v-if="showTitle">{{item.name}}</h2>
                        <li class="price" v-if="datas.params.price != '0' && datas.params.price == 1?true:false">
                            <span class="price-a" :style="'color:'+datas.params.titlecolor"><small>￥</small>{{item.pricenow}}</span>
                            <span class="price-b" :style="'color:'+datas.params.titlecolor" v-if="!(item.pricenow ==  item.priceold)"><small>￥</small>{{item.priceold}}</span>
                        </li>
                        <li class="price" v-if="datas.params.price != '0' && datas.params.price == 2?true:false">
                            <span class="price-a" :style="'color:'+datas.params.titlecolor"><small>￥</small>{{item.pricenow}}</span>
                        </li>
                        <li class="rob">
                            <span class="left" v-if="datas.params.overage">仅剩<big>{{item.stock}}</big>件</span>
                        </li>
                        <li class="button" v-if="!(fun.isTextEmpty(datas.params.buysub))"><button type="button" :class="datas.params.buysub" @click="buy(item)">立即购买</button></li>
                    </ul>
                </div>
                <!-- <div class="list">
                                    <div class="img">
                                        <img src="">
                                        <div class="time-box">
                                            <yd-countdown time="2018/06/18 24:00:00"></yd-countdown>
                                        </div>
                                    </div>
                                    <ul class="text">
                                        <h2>宝得适安全座椅双面骑士辣椒红</h2>
                                        <li class="price">
                                            <span class="price-a"><small>￥</small>128.50</span>
                                            <span class="price-b"><small>￥</small>228.50</span>
                                        </li>
                                        <li class="rob">
                                            <span class="left">仅剩<big>0</big>件</span>
                                        </li>
                                        <li class="button"><button type="button">立即购买</button></li>
                                    </ul>
                                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
    import fun from '../fun/index'
    export default {
        props: {
            datas: {
                default: []
            }
        },
        data() {
            return {};
        },
        computed: {
            showTitle() {
                if (this.datas.params.showname == "0") {
                    return false
                } else if (this.datas.params.showname == "1") {
                    return true;
                } else {
                    return false;
                }
            },
        },
        methods: {
            buy(obj) {
                this.$router.push(this.fun.getUrl('goods', {
                    id: obj.goodid
                }));
            },
            showTime(time) {
                let nowTime = new Date().getSeconds;
                let beginTime = new Date(time).getSeconds;
                if (nowTime >= beginTime) {
                    return true
                } else {
                    return false
                }
            }
        },
        activated() {}
    };
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    #rush-buy {
        margin-top: 0.625rem;
        .buy-5 {
            border: solid #f15353 0.0625rem !important;
            color: #f15353 !important;
            border-radius: 0.625rem !important;
        }
        .buy-6 {
            border: solid #f15353 0.0625rem !important;
            color: #ffffff !important;
            border-radius: 0.625rem !important;
            background-color: red!important;
        }
        .buy-7 {
            border: solid #f15353 0.0625rem !important;
            color: #f15353 !important;
            border-radius: 0.3125rem !important;
        }
        .buy-8 {
            border: solid #f15353 0.0625rem !important;
            color: #ffffff !important;
            border-radius: 0.3125rem !important;
            background-color: red !important;
        }
        .sale-xp {
            background: url(../assets/images/sale-xp.png);
            background-size: 3.125rem;
            height: 3.125rem;
            width: 3.125rem;
            position: absolute;
            top: -0.1875rem;
            left: -0.1875rem;
        }
        .sale-rx {
            background: url(../assets/images/sale-rx.png);
            background-size: 3.125rem;
            height: 3.125rem;
            width: 3.125rem;
            position: absolute;
            top: -0.1875rem;
            left: -0.1875rem;
        }
        .sale-tj {
            background: url(../assets/images/sale-tj.png);
            background-size: 3.125rem;
            height: 3.125rem;
            width: 3.125rem;
            position: absolute;
            top: -0.1875rem;
            left: -0.1875rem;
        }
        .sale-xs {
            background: url(./temp/img/sale-xs.png);
            background-size: 3.125rem;
            height: 3.125rem;
            width: 3.125rem;
            position: absolute;
            top: -0.1875rem;
            left: -0.1875rem;
        }
        .sale-by {
            background: url(./temp/img/sale-by.png);
            background-size: 3.125rem;
            height: 3.125rem;
            width: 3.125rem;
            position: absolute;
            top: -0.1875rem;
            left: -0.1875rem;
        }
        .sale-cx {
            background: url(./temp/img/sale-cx.png);
            background-size: 3.125rem;
            height: 3.125rem;
            width: 3.125rem;
            position: absolute;
            top: -0.1875rem;
            left: -0.1875rem;
        }
        h2 {
            font-weight: normal;
        }
        .double-row {
            display: flex;
            flex-wrap: wrap;
            .list-box {
                margin-right: 1.2vw;
                margin-bottom: 1.2vw;
                background-color: #fff;
                width: 49.4vw;
                .img {
                    height: 49vw;
                    overflow: hidden;
                    background-color: #ccc;
                    position: relative;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                    .time-box {
                        width: 100%;
                        position: absolute;
                        height: 1.875rem;
                        background-color: #f15353;
                        bottom: 0rem;
                        text-align: left;
                        padding: 0 0.625rem;
                        span {
                            color: #fff;
                            line-height: 1.875rem;
                            font-size: 14px;
                            text-align: left;
                        }
                    }
                }
                .text {
                    padding: 0.375rem;
                    h2 {
                        line-height: 1.25rem;
                        height: 2.5rem;
                        font-size: 14px;
                        text-align: left;
                        overflow: hidden;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                    }
                    .price {
                        line-height: 1.5rem;
                        display: flex;
                        justify-content: space-between;
                        font-size: 16px;
                        .left {
                            color: #f15353;
                        }
                        .right {
                            font-size: 14px;
                            text-decoration: line-through;
                            color: #999;
                        }
                        small {
                            font-size: 12px;
                        }
                    }
                    .rob {
                        line-height: 1.5rem;
                        display: flex;
                        justify-content: space-between;
                        font-size: 14px;
                        .left {
                            big {
                                color: #f15353;
                                font-size: 16px;
                            }
                        }
                        button {
                            //background-color: #f15353;
                            //color: #fff;
                            font-size: 0.75rem; //border-radius: 0.1875rem;
                            height: 1.625rem;
                            padding: 0 0.375rem;
                            display: inline-block;
                            border: none;
                        }
                    }
                }
            }
            .list-box:last-child {
                margin-bottom: 0;
            }
            .list-box:nth-last-child(2) {
                margin-bottom: 0;
            }
            .list-box:nth-child(2n) {
                margin-right: 0;
            }
        }
        .single-row {
            background-color: #fff;
            //margin-top: 0.5rem;
            .img {
                position: relative;
                background-color: #ccc;
                width: 100vw;
                height: 100vw;
                overflow: hidden;
                img {
                    width: 100%;
                    height: 100%;
                }
                .time-box {
                    width: 100%;
                    position: absolute;
                    height: 2.5rem;
                    background-color: #f15353;
                    bottom: 0rem;
                    text-align: left;
                    padding: 0 0.625rem;
                    span {
                        color: #fff;
                        line-height: 2.5rem;
                        font-size: 1rem;
                        text-align: left;
                    }
                }
            }
            .text {
                padding: 0.375rem 0.625rem;
                .title {
                    display: flex;
                    justify-content: space-between;
                    font-size: 14px;
                    h2 {
                        flex: 3;
                        font-size: 16px;
                        line-height: 1.5rem;
                        height: 3rem;
                        overflow: hidden;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        text-align: left;
                    }
                    span {
                        text-align: right;
                        flex: 1;
                        font-size: 16px;
                        big {
                            font-size: 20px;
                            color: #f15353;
                        }
                    }
                }
                .price {
                    display: flex;
                    justify-content: space-between;
                    font-size: 14px;
                    margin-top: 0.625rem;
                    .left {
                        font-size: 18px;
                        color: #f15353;
                        line-height: 1.625rem;
                        small {
                            font-size: 12px;
                        }
                        .price-b {
                            margin-left: 0.625rem;
                            color: #999;
                            text-decoration: line-through;
                            font-size: 14px;
                        }
                    }
                    button {
                        border: none;
                        //background-color: #f15353;
                        color: #fff;
                        height: 1.875rem;
                        font-size: 14px;
                        border-radius: 0.1875rem;
                        padding: 0 0.625rem;
                    }
                }
            }
        }
        .three-row {
            margin-bottom: 0.625rem;
            //margin-top: 0.625rem;
            display: flex;
            flex-wrap: wrap;
            dl:nth-child(3n) {
                margin-right: 0;
            }
            dl {
                width: 32.6vw;
                background-color: #fff;
                margin-right: 1.1vw;
                .img {
                    position: relative;
                    height: 32.6vw;
                    background-color: #ccc;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                    .time-box {
                        width: 100%;
                        position: absolute;
                        height: 1.875rem;
                        background-color: #f15353;
                        bottom: 0rem;
                        text-align: left;
                        padding: 0 0.25rem;
                        span {
                            color: #fff;
                            line-height: 1.875rem;
                            font-size: 12px;
                            text-align: left;
                        }
                    }
                }
                .text {
                    padding: 0.375rem;
                    h2 {
                        text-align: left;
                        font-size: 12px;
                        line-height: 1.125rem;
                        height: 2.25rem;
                        overflow: hidden;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                    }
                    .price {
                        line-height: 1.5rem;
                        display: flex;
                        justify-content: space-between;
                        font-size: 14px;
                        .price-a {
                            color: #f15353;
                        }
                        .price-b {
                            color: #999;
                            text-decoration: line-through;
                        }
                        small {
                            font-size: 12px;
                        }
                    }
                    .rob {
                        text-align: left;
                        line-height: 1.5rem;
                        .left {
                            big {
                                color: #f15353;
                            }
                        }
                    }
                    .button {
                        button {
                            width: 100%;
                            height: 1.625rem;
                            border: none;
                            //background-color: #f15353;
                            color: #fff;
                            font-size: 12px;
                            border-radius: 0.1875rem;
                            padding: 0 0.25rem;
                        }
                    }
                }
            }
        }
        .across-row {
            //margin-top: 0.625rem;
            .list {
                background-color: #fff;
                display: flex;
                .img {
                    width: 38vw;
                    height: 38vw;
                    position: relative;
                    img {
                        width: 100%;
                        height: 100%;
                        padding: 0.375rem;
                    }
                    .time-box {
                        width: 92%;
                        position: absolute;
                        height: 1.875rem;
                        background-color: #f15353;
                        bottom: 0.375rem;
                        left: 0.375rem;
                        text-align: center;
                        span {
                            color: #fff;
                            line-height: 1.875rem;
                            font-size: 14px;
                            text-align: left;
                        }
                    }
                }
                .text {
                    width: 62vw;
                    position: relative;
                    padding: 0.625rem;
                    border-bottom: solid 0.0625rem #ebebeb;
                    h2 {
                        line-height: 1.5rem;
                        height: 3rem;
                        text-align: left;
                        font-size: 16px;
                        overflow: hidden;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                    }
                    .price {
                        line-height: 1.875rem;
                        display: flex;
                        justify-content: space-between;
                        font-size: 16px;
                        small {
                            font-size: 12px;
                        }
                        .price-a {
                            color: #f15353;
                        }
                        .price-b {
                            color: #999;
                            text-decoration: line-through;
                        }
                    }
                    .rob {
                        position: absolute;
                        bottom: 0.625rem;
                        font-size: 14px;
                        line-height: 1.5rem;
                        text-align: left;
                        big {
                            color: #f15353;
                        }
                    }
                    .button {
                        position: absolute;
                        bottom: 0.625rem;
                        right: 0.625rem;
                        text-align: left;
                        button {
                            border: none;
                            //background-color: #f15353;
                            color: #fff;
                            border-radius: 0.25rem;
                            padding: 0.375rem 0.75rem;
                        }
                    }
                }
            }
        }
    }
</style>