<template>
	<div id="supplier-center">
		 <c-title :hide="false" text='供应商管理'></c-title>
		 <div class="user">
			 <div class="user-header">
				 <div class="img">
					 <img src="">
				 </div>
				 <div><span>用户名：我的果粒deng</span></div>
				 
			 </div>
			 <div class="user-info">
				 <ul>
					 <li><b>0</b></li>
					 <li><span>今日订单（笔）</span></li>
				 </ul>
				 <ul>
					 <li><b>0.00</b></li>
					 <li><span>今日销售（元）</span></li>
				 </ul>
				 <ul>
					 <li><b>0</b></li>
					 <li><span>累计收入（元）</span></li>
				 </ul>
			 </div>
		 </div>
		 <div class="withdraw">
			 <ul>
				 <li>可提现金额</li>
				 <li>￥<font>0.00</font></li>
			 </ul>
			 <span>提现</span>
		 </div>
		 <div class="store-box">
			 <div class="my-store">
				 <span>我的店铺</span>
				 <i class="fa fa-angle-right"></i>
			 </div>
			 <div class="manage-list">
				 <ul @click="gotoInfo">
					 <div class="img"><img src="../../../assets/images/supplier-info.png"></div>
					 <li><span>信息管理</span></li>
				 </ul>
				 <ul @click="manage">
					 <div class="img"><img src="../../../assets/images/supplier-goods.png"></div>
					 <li ><span>商品管理</span></li>
				 </ul>
				 <ul>
					 <div class="img"><img src="../../../assets/images/supplier-order.png"></div>
					 <li><span>订单管理</span></li>
				 </ul>
				 <ul>
					 <div class="img"><img src="../../../assets/images/supplier-withdraw.png"></div>
					 <li><span>提现记录</span></li>
				 </ul>
			 </div>
		 </div>
		 

	
	</div>
</template>
<script>
import supplier_center_controller from "./supplier_center_controller";
export default supplier_center_controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#supplier-center{
	padding-top:40px;
	
	.user{
		background-color: #f15353;
		color:#fff;
		.user-header{
			padding:0.875rem;
			.img{
				margin-right:0.625rem;
				width:3.25rem;
				height:3.25rem;
				border:solid 0.125rem #fff;
				overflow: hidden;
				border-radius: 50%;
				margin:0 auto;
				img{
					width:100%;
				}
			}
			span{
				font-size:14px;
				display: block;
				line-height:2.25rem;
			}
		}
		.user-info{
			background: rgba(255,255,255,0.2);
			display: flex;
			ul{
				margin:0.625rem 0;
				width:33.3%;
				line-height: 1.5rem;
				b{
					font-size:18px;
				}
			}
			ul:last-child{
				border-right:none;
			}
		}
	}
	.withdraw{
		background: #fff;
		display: flex;
		padding:0.875rem;
		font-size:14px;
		position: relative;
		ul{
			text-align: left;
			line-height: 1.5rem;
			li:last-child{
				color:#f15353;
			}
			font{
				font-size:18px;
			}
		}
		span{
			display: block;
			position: absolute;
			height:1.625rem;
			line-height: 1.625rem;
			padding:0 1rem;
			right:0.875rem;
			top:1.5rem;
			background: #f15353;
			color:#fff;
			border-radius: 0.1875rem;
		}
	}
	.store-box{
		margin-top:0.625rem;
		background: #fff;
		height:22.5rem;
		.my-store{
			height:2.5rem;
			line-height: 2.5rem;
			font-size:14px;
			padding:0 0.875rem;
			display: flex;
			justify-content: space-between;
			border-bottom:solid 0.0625rem #ebebeb;
			i{
				font-size:1.25rem;
				color:#c9c9c9;
				line-height: 2.5rem;
			}
		}
		.manage-list{
			margin-top:1rem;
			margin-bottom:1rem;
			display: flex;
			flex-wrap: wrap;
			ul{
				margin-bottom:0.625rem;
				width:33.3%;
				.img{
					width:2.25rem;
					height:2.25rem;
					margin:0 auto;
					overflow: hidden;
					img{
						width:100%;
					}
				}
				li{
					line-height: 1.5rem;
				}
			}
		}
	}
}
</style>
