<template>
<div id="all">
    <c-title :hide="false" text='商家'></c-title>
    <div style="width:100%;height:40px;"></div>
    <div class="home-seller">
        <div class="home-seller-banner">
            <img :src="mainInfo.store_barnner_thumb?mainInfo.store_barnner_thumb:require('../../assets/images/loading.jpg')"> -->
            <!-- <img src="../../assets/images/shopping.png" alt=""> -->

        </div>
        
        <!-- <div class="home-seller-name pad">
           
                <span class="home-seller-name-title">门店名称</span> <input type="button" value="优惠买单" class="home-seller-name-btn">
            
        </div> -->
        
         <yd-cell-group>
            <div class="store-name">
                <span class="left">门店名称:{{mainInfo.store_name}}</span>
                <span class="right"><yd-button type="danger" @click.native=" goToCrash">优惠买单</yd-button></span>
                
            </div>
            <yd-cell-item arrow @click.native="goToDetail">
                <span slot="left">商家详情</span>
                <span slot="right"></span>
            </yd-cell-item>
        </yd-cell-group>

         <!-- <div class="line"></div> -->

        <!-- <div class="home-seller-detail pad">
           
                <span>商家详情</span> <i>></i>
            
        </div> -->

        <!-- <div class="line"></div> -->
        <div class="store-add">
            <yd-cell-group>
                <yd-cell-item arrow @click.native="goToAdress">
                    <yd-icon slot="icon" name="location" size="1.2rem" color="#ff9800"></yd-icon>
                    <!-- <span slot="left" style="width:80%;display:block;white-space:nowrap;overflow:hidden; text-overflow:ellipsis;">广东省-广州市-白云区-机场路1600号汇创意产业园C2栋201</span> -->
                    <p slot="left">{{mainInfo.store_address}}</p>
                </yd-cell-item>

                <yd-cell-item>
                    <yd-icon slot="icon" name="phone2" size="1.2rem" color="#e85151" arrow></yd-icon>
                    <!-- <p slot="left">{{mainInfo.store_mobile}}</p> -->
                    <a :href="telephone" slot="left">{{mainInfo.store_mobile}}</a>
                </yd-cell-item>
            </yd-cell-group>
        </div>
        <!-- <div class="home-seller-address pad border-bottom">
            <span><yd-icon name="location" size="1.2rem" color="#ff9800"></yd-icon></span><span class="address">广东省-广州市-白云区-机场路1600号汇创意产业园C2栋201</span>

            <i>></i>
        </div>

        <div class="home-seller-phone pad">
           <span class="icon"><yd-icon name="phone2" size="1.2rem" color="#e85151"></yd-icon><span style="float:right;" class="number">15216771448</span></span>
        </div>
        <div class="line"></div> -->

         <yd-cell-group>
            <yd-cell-item arrow @click.native="goToShop">
               <yd-icon slot="icon" name="home-outline" size="1.2rem"></yd-icon>
               <span slot="left">进店选购</span>
            </yd-cell-item>
        </yd-cell-group>

        <!-- <div class="home-seller-buy pad">
           <span class="icon"><yd-icon name="home-outline" size="1.2rem" color="#cccccc"></yd-icon></span ><span style="padding:3px;">进店选购</span><i class="buy">></i>
        </div> -->

        <!-- <div class="line"></div>
        <div class="home-seller-address pad border-bottom">
            <span>门店简介:</span><span>门店简介：我是门店介绍123456789</span>
        </div>
         <div class="home-seller-buy pad">
           <span>营业时间:</span ><span>营业时间9:00-晚20:00</span>
        </div>

         <div class="line"></div> -->
        
            <yd-cell-group>
                <div class="store-time">
                    <span class="left">门店简介:</span><span class="right">{{mainInfo.store_introduce}}</span></div>
                <yd-cell-item>
                    <span slot="left">营业时间:{{mainInfo.business_hours}}</span>
                </yd-cell-item>
            </yd-cell-group>
        
    </div>
	
</div>


</template>


<script>
	import home from './home_seller_controller';
	export default home;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
	.home-seller{
        .store-name{
            height: 3.125rem;
            border-bottom:solid 0.0625rem #e2e2e2;
            margin-left:0.75rem;
            padding-right:0.75rem;
            display: flex;
            .left{
                font-size:15px;
                text-align: left;
                line-height: 3.125rem;
                flex:3;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }
            .right{
                text-align: right;
                line-height: 3.125rem;
                flex:1;
            }
            
        }
        .store-add p{
            white-space: pre-wrap;
            text-align: left;
            margin:0.5rem 0;
        }
        .store-time{
            text-align:left;
            font-size:15px;
            padding:0.875rem 0.75rem;
            border-bottom:solid 0.0625rem #e2e2e2;
            display: flex;
            .left{
                display:inline-block;
            }
            .right{
                flex:3;
                display: inline-block;
            }
        }
        .home-seller-banner{
            height: 9.375rem;
            background:#ccc;

            img{
                width:100%;
                height: 100%;
            }
        }

        .home-seller-name{
            line-height: 2.5rem;
            height: 2.5rem;
            .home-seller-name-title{
                width: 5rem;
                float: left;
                font-size: 14px;
                display:block;
                white-space:nowrap; 
                overflow:hidden; 
                text-overflow:ellipsis;
                text-align: left;
               
            }
            .home-seller-name-btn{
                float: right;
                height: 1.875rem;
                margin-top: 0.3125rem;
                border: 0.0625rem solid #ccc;
                outline: none;
                background:#e85151;
                color: #fff;
                border-radius:0.25rem;
                width:5rem;
                font-size: 14px;
                line-height: 1.875rem;
            }
        }

        .home-seller-detail{
            line-height: 2.5rem;
            height: 2.5rem;
            span{
                width: 5rem;
                float: left;
                font-size: 14px;
                text-align: left;
            }
            i{
                height: 2.5rem;
                font-size: 30px;
                color: #cccccc;
                float: right;
            }
        }

        .home-seller-address{
            line-height: 2.5rem;
            height: 2.5rem;
            font-size: 13px;
            span{
                height: 2.3125rem;
                float: left;
            }


            .address{
                padding:0rem 0.1875rem 0rem 0.1875rem;
                width:90%;
                display:block;
                white-space:nowrap;
                overflow:hidden; 
                text-overflow:ellipsis;
            }

            i{
                height: 2.5rem;
                font-size: 30px;
                color: #cccccc;
            }
        }

        .home-seller-phone{
            line-height: 2.5rem;
            height: 2.5rem;
            font-size: 13px;
            span{
                float: left;
                clear: both;
            }
            .icon{
                height: 2.3125rem;
            }
            .number{
                float: right;
                padding:0rem 0.1875rem 0rem 0.1875rem;
                display:block;
               
            }
        }

        .home-seller-buy{
            line-height: 2.5rem;
            height: 2.5rem;
            font-size: 13px;
            span{
                float: left;
                height: 2.3125rem;
            }

            i{
                float: right;
                height: 2.5rem;
                font-size: 30px;
                color: #cccccc;
            
            }
        }

        .line{
            height: 0.3125rem;
            background: #E5E5E5;
            clear: both;
        }

        .pad{
            padding-left: 3%;
            padding-right: 3%;
        }
        
    }

    .border-bottom{
        position: relative;
        border-top: none !important;
    }

    .border-bottom::after {
        content: " ";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 0.0625rem;
        background-color: #ccc;
        -webkit-transform-origin: left bottom;
        transform-origin: left bottom;
    }
    /* 2倍屏 */
    @media only screen and (-webkit-min-device-pixel-ratio: 2.0) {
        .border-bottom::after {
            -webkit-transform: scaleY(0.5);
            transform: scaleY(0.5);
        }
    }

    /* 3倍屏 */
    @media only screen and (-webkit-min-device-pixel-ratio: 3.0) {
        .border-bottom::after {
            -webkit-transform: scaleY(0.33);
            transform: scaleY(0.33);
        }
    }
</style>
