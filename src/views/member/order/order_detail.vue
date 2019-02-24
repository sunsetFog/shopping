<template v-title="订单详情">
    
    <div id="goodsinfo">
    	<c-title :hide="false" text='订单详情'></c-title>
    	<div style="height: 40px;"></div>
		
    	<div class="addr" v-if="pay_type_id == '' && orderType == 'shop' && order_data.is_virtual == 0">
    		<i class="iconfont icon-dingwei"></i>
			<ul class="addr-info">
				<li style="margin-bottom:0.5rem;font-size:16px;">收件人：{{receiver}}&nbsp;&nbsp;&nbsp;（{{mobile}}）</li>
				<li style="color:#999">{{address}}</li>
			</ul>
			<div class="clearfix"></div>
    	</div>
		
    	<div>
            <div class="goods" v-for="good in order_data.has_many_order_goods" @click="toGoodsDetail(good, order_data.is_virtual,good.is_course)">
                <div class="img"><img  v-lazy="good.thumb"></div>

                <ul class="inner">
                    <li class="name">{{good.title}}</li>     
                    <li class="option" v-show="order_data.is_virtual == 0">规格:  {{good.goods_option_title}}</li>
					<li class="option" v-if="order_data.plugin_id == 40">押金:</li>
                </ul>
                <ul class="price">
                    <li class="money"><small>￥</small>{{good.price}}</li>   
					<li class="option">×{{good.total}}</li>
					<li class="option" v-if="order_data.plugin_id == 40">{{good.lease_toy_goods.deposit}}</li>
                </ul>
				<div style="clear:both;"></div>
            </div>
    	</div>
    	<div class="detail_good" v-if="0">
    		<h3><i class="fa fa-truck"></i>发货信息</h3>
    		<div class="content" >
    			1、激活码：553321  中国移动：135 911 234 56  链接：<a href="#">点攻击链接</a><br />
    			2、激活码：967454  中国移动：137 334 234 56  链接：<a href="#">点攻击链接</a><br />
    		</div>
    	</div>	
    	<div class="tbs">
			<div class="tbs-number-tra">
				<ul class="number">
					<li class="left">订单编号:</li>
					<li class="right">{{order_data.order_sn}}</li>
				</ul>
				<ul class="tra" v-if="order_data.plugin_id == 40">
					<li class="left">租期:</li>
					<li class="right">{{order_data.lease_toy.return_days}}天</li>
				</ul>
				<ul class="tra">
					<li class="left">交易状态:</li>
					<li class="right">{{order_data.status_name}}</li>
				</ul>
				<ul class="tra" v-if="order_data.plugin_id == 40">
					<li class="left">租金总金额:</li>
					<!-- <li class="right">￥{{order_data.goods_price*order_data.lease_toy.return_days}}</li> -->
					<li class="right">￥{{order_data.order_goods_price}}</li>
				</ul>
			</div>
			<template v-if="order_data.cashier_order">
				<div class="info">
					<ul class="time">
						<li class="left">下单时间:</li>
						<li class="right">{{order_data.cashier_order.created_at}}</li>
					</ul>
					<ul class="name">
						<li class="left">姓名:</li>
						<li class="right">{{order_data.cashier_order.realname}}</li>
					</ul>
					<ul class="member">
						<li class="left">电话:</li>
						<li class="right">{{order_data.cashier_order.mobile}}</li>
					</ul>
				</div>
			</template>
			
			<template v-if="order_data.has_one_pay_type">
				<ul class="Pay-method">
				<li class="left">支付方式:</li>
				<li class="right">{{order_data.has_one_pay_type.name}}</li>
				</ul>
			</template>
			<div id="discount">
				<template  v-for="info in order_data.order_discount">
						<ul class="Discount">
						<li class="left">{{info.name}}:</li>
						<li class="right">￥{{info.amount}}</li>
						</ul>
				</template>
			</div>
			
			<!--<div class="left">总抵扣:</div>
			<div class="right">￥{{order_data.deduction_price}}</div>
			<div class="left">总优惠:</div>
			<div class="right">￥{{order_data.discount_price}}</div>-->
			<template  v-if="pay_type_id == '' && orderType == 'shop'">
			<ul class="Fre">
			<li class="left">运费:</li>
			<li class="right">￥{{order_data.dispatch_price}}</li>
			</ul>
			</template>
			<ul class="Sub">
				<li class="left">商品小计:</li>
				<li class="right" v-if="!(order_data.plugin_id == 40)">￥{{order_data.order_goods_price}}</li>
				<li class="right" v-if="order_data.plugin_id == 40">￥{{order_data.order_goods_price}}</li>
			</ul>
			<ul class="Sub" v-if="order_data.plugin_id == 40">
				<li class="left">押金:</li>
				<li class="right">￥{{order_data.lease_toy.deposit_total}}</li>
			</ul>
			<ul class="Real-pay">
			<li class="left" v-if="!(order_data.plugin_id == 40)">实付费(含运费):</li>
			<li class="left" v-if="order_data.plugin_id == 40">合计:（押金￥{{order_data.lease_toy.deposit_total}}可退）:</li>
			<li class="right"><small>￥</small>{{order_data.price}}</li>	
			</ul>	
    	</div>
		<!-- <div style="height:59px"></div> -->
		<!-- 租赁详情 -->
		<!-- <div class="addr" v-if="pay_type_id == '' && orderType == 'shop' && order_data.is_virtual == 0">
    		<i class="fa fa-map-marker"></i>
			<ul class="addr-info">
				<li style="margin-bottom:8px;font-size:14px;">收件人：{{receiver}}&nbsp;&nbsp;&nbsp;（{{mobile}}）</li>
				<li style="color:#888">{{address}}</li>
			</ul>
			<div class="clearfix"></div>
    	</div>
		<div class="commodity">
			<div class="jpg"><img data-v-2c15d270="" src="http://release.yunzshop.com/attachment/images/2/2017/08/qwFK28UnUz8zYvzunjM3pUQpuTz8W2.jpg"></div>
			
			<ul>
				<li>
					<span class="left">芸众信息科技有限公司</span>
					<span class="red"><i class="iconfont icon-rent"></i>￥6.00</span>
				</li>
				<li>
					<span class="left">规格</span>
					<span>押金：￥300.00</span>
				</li>
				<li class="rent">
					<span class="red">租金：￥300.00<small>￥300.00/天</small></span>
				</li>
				
			</ul>
			
		</div>
		<div class="rent-info">
			<ul>
				<li>
					<span>订单编号</span>
					<span>SN201800219235847L7</span>
				</li>
				<li>
					<span>租期</span>
					<span>30天</span>
				</li>
				<li>
					<span>交易状态</span>
					<span>{{order_data.status_name}}</span>
				</li>
				<li>
					<span>租金总金额</span>
					<span>￥270.00</span>
				</li>
				<li>
					<span>会员折扣</span>
					<span>-￥30.00</span>
				</li>
				<li>
					<span>单品满额减</span>
					<span>-￥0.00</span>
				</li>
				<li>
					<span>优惠券总金额</span>
					<span>-￥0.00</span>
				</li>
				<li>
					<span>抵扣金额</span>
					<span>-￥0.00</span>
				</li>
				
			</ul>
			<div class="info">
				<span>运费</span>
				<span>￥6.00</span>
			</div>
			<div class="info">
				<span>押金</span>
				<span>￥600.00</span>
			</div>
			<div class="info">
				<span>合计：（押金￥600可退）</span>
				<span>￥846.00</span>
			</div>
			
		</div> -->
		<!--  -->
		<!-- <div style="height:59px"></div> -->
		<div class="detail_pay">
		    <div class="order_delete" v-for="(item,index) in order_data.button_models" @click="operation(item,order_data)" >{{item.name}}</div>
			<!-- setting sun -->
			<!-- <div class="order_delete" @click="shopRecord()">汇款记录</div> -->
			<!-- <input type="button" value="退还商品" @click="gotoRefund"> -->
		</div>
		<div class="qrcode">
		<mt-popup v-model="showQrcode" position="right" modal="true">
			<img :src="qrcode" style="width:100%">
			<div style="height: 1.875rem;">请核销员扫码</div>
		</mt-popup>
		</div>



<el-dialog title="确认发货" :visible.sync="dialogVisible">
	<section style="width: 100%;text-align: left;">
		<div style="width: 100%;height: 80px;" v-if="addresseeInfo">
			<div style="width: 28%;height: 30px;float: left;line-height: 30px;">收件人信息:</div>
			<div style="width: 70%;float: left;">
				<div style="width: 100%;height: 30px;line-height: 30px;overflow: visible;">
					<span>收件人:{{addresseeInfo.realname}}</span>
					<span>({{addresseeInfo.mobile}})</span>
				</div>
				<div style="width: 100%;overflow: visible;margin-bottom: 10px;">
					收货地址:{{addresseeInfo.address}}
				</div>
			</div>
		</div>
		<div style="width: 100%;height: 45px;line-height: 45px;">
			<div style="float: left;width: 28%;height: 45px;">快递公司:</div>
			<div style="float: left;height: 45px;width: 60%;">
				<!-- <el-input v-model="expressName" placeholder="请输入快递公司"></el-input> -->
				<el-select v-model="expressName" placeholder="请选择" @change="selectCompany">>
					<el-option
					v-for="item in options"
					:key="item.value"
					:label="item.name"
					:value="item.value">
					</el-option>
				</el-select>
			</div>
		</div>
		<div style="width: 100%;height: 45px;line-height: 45px;">
			<div style="float: left;width: 28%;height: 45px;">快递单号:</div>
			<div style="float: left;height: 45px;width: 60%;">
				<el-input v-model="numberName" placeholder="请输入快递单号"></el-input>
			</div>
		</div>

	</section>
  
  <div slot="footer" class="dialog-footer">
    <el-button @click="sendCancel">取 消</el-button>
    <el-button type="primary" @click="sendGoogs">确 定</el-button>
  </div>
</el-dialog>


    </div>

</template>
<script>
import order_detailcontroller from './order_detailcontroller';
export default order_detailcontroller;

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	.qrcode{
		width:100%;
		margin: 0 auto;
	}
#goodsinfo{
	.addr{text-align: left;padding:0 0.75rem;background: #FFF; border-bottom: #ebebeb 0.0625rem solid; margin-bottom: 0.625rem; padding-top: 0.75rem; padding-bottom: 0.75rem;
		i{font-size: 1rem;color:#333;float:left;margin-right: 0.625rem;margin-top: 0.0625rem;}
		p{text-align: left; span{color: #858585;font-size: 12px;}}
	.addr-info{
		float:left;
		font-size:14px;
	}
	.clearfix{clear:both;}
	}
	.goods{background-color:#fff;
			.img{padding:0.625rem 1rem;width:26vw;float: left; img{width: 100%;height:100%;display: inline-block;}}
			.inner{width:50%;float: left; padding:0.625rem 0 0 0;display: flex;flex-direction:column;align-items: flex-start;}
			.name{ text-align: left;margin-bottom:0.625rem;font-size:14px;}
			.money{margin-bottom:0.625rem;font-size:14px;}
			small{
				font-size:12px;
			}
			.price{width:20%;float: left; align-items:center;text-align: right;padding:0.625rem 0 0 0;}
			.option{color: #888;font-size: 12px;flex: 1;}
			}
	.detail_good{background: #FFF;
		.content{text-align: left;background: #efeded;padding: 0.625rem;color: #8C6700;}
		a{color: #000000;}
		h3{text-align: left;margin: 0.5625rem 0; i{font-size:1.25rem;padding-right: 0.3125rem;}}
		
		}
	.tbs{font-size:14px;
		 width:100%;
		 margin-bottom:3.75rem;
		.left{flex: 2;text-align: left;}
		.right{flex: 3;text-align: right;}
		.tbs-number-tra{
			background-color: #fff;
			width:100%;
			padding:0.625rem 0.875rem;
			margin-top:0.625rem;
			li{
				line-height: 1.875rem;
			}
		}
		.Sub{
			width:100%;
			display: flex;
			justify-content: space-between;
			line-height: 1.875rem;
			padding:0 0.875rem 0.625rem 0.875rem;
			background-color: #fff;
		}
	
		.Real-pay{
			background-color: #fff;
			display: flex;
			justify-content: flex-end;
			line-height: 2.25rem;
			padding:0 0.875rem;
			border-top:solid 0.0625rem #ebebeb;
			font-size:16px;
			.left{color:#333;text-align: right;}
			.right{color:#f15353;font-size: 18px;flex:0;}
			small{font-size:12px}
		}
		.Fre{
			display: flex;
			justify-content: space-between;
			background-color: #fff;
			padding:0 0.875rem;
			line-height: 1.875rem;
		}
		#discount{
			margin-top:0.625rem;
			padding-top:0.625rem;
			background-color: #fff;
		}
		.Discount{
			width:100%;
			line-height: 1.875rem;
			display: flex;
			justify-content: space-between;
			padding:0 0.875rem;
		}
		.number,.tra{
			line-height: 1.75rem;
			display: flex;
			justify-content: space-between;
		}
	   	.Pay-method{
			   background-color: #fff;
			   width:100%;
			display: flex;
			justify-content: space-between;
			line-height: 2.25rem;
			padding:0 0.875rem;
			border-top: solid 0.0625rem #ebebeb;
		   }
		   .info{
			   padding:0px 0.75rem;
				line-height: 1.75rem;
				border-top:solid 0.0625rem #e2e2e2;
				.time,.name,.member{
					display: flex;
					justify-content: space-between;
				}
			
		   }

	}
.detail_pay { height: 3.0625rem; width: 100%; background: #fff; padding: 0px 0.75rem; border-top: 1px solid #ebebeb;
    position: fixed; bottom: 0px; box-sizing: border-box;
    .order_delete {margin-left: 0.625rem; background: #fff; padding: 0.25rem 0.625rem; margin-top: 0.6875rem; border-radius: 0.25rem; color: #333;
 float: right; border: 0.0625rem solid #666;}
	input{
		padding:0.25rem 0.625rem;
		border:solid 0.0625rem #666;
		border-radius: 0.1875rem;
		background-color: #fff;
		margin-top:0.6875rem;
		float: right;
		color:#333;
		font-size:12px;
	}
    }

	.rent-info{
		border-bottom:solid 0.0625rem #e2e2e2;
		background-color: #fff;
		ul{
			padding:1rem 0.875rem;
			li{
				display: flex;
				justify-content: space-between;
				line-height: 1.5rem;
				font-size:14px;
				span:first-child{
					color:#8c8c8c;
				}
			}
		}
		.info{
			border-top:solid 0.0625rem #ebebeb;
			margin:0 0.875rem;
			line-height: 1.875rem;
			display: flex;
			justify-content: space-between;
			font-size:14px;
		}
	}	
	.commodity{
		background-color: #fff;
		display: flex;
		justify-content: space-between;
		padding:0.625rem 0.875rem;
		.jpg{
			width:30%;
			overflow: hidden;
			margin-right:0.625rem;
			img{
				width:100%;
				height: 100%;
			}
		}
		ul{
			position: relative;
			width:70%;
			li{
				display: flex;
				justify-content: space-between;
			}
			li:first-child{
				margin-bottom:0.625rem;
				.left{
					text-align: left;
					width:60%;
					overflow: hidden;
					display: -webkit-box;
					-webkit-line-clamp:2;
					-webkit-box-orient:vertical;
				}
				i{
					font-size:0.75rem;
					color:#ff9500;
				}
			}
			.red{
				font-size:14px;
				color:#f15353;
				small{
					font-size:12px;
					color:#333;
					margin-left:0.625rem;
				}
			}
			.left{
				font-size:14px;
			}
			.rent{
				position: absolute;
				bottom:0;
			}
		}

	}
}
</style>
<style lang="scss" rel="stylesheet/scss" scoped>
	.mint-header{	background: none;color: #666;}
	.is-fixed .mint-header-title{font-weight: bold;}
	.mint-header.is-fixed{border-bottom: 0.0625rem solid #ebebeb;background: #FFF;z-index: 99;}
	.is-right a{font-size: 12px;}
</style>