<template>
	<section id="goods-manage">
		<c-title :hide="false" text='商品管理'></c-title> 
		<!-- <section id="search-box">
			<div class="search-a">
				<yd-icon class="iconfont icon-sousuo1" custom color="#666" size="1.125rem" @click.native="searchGoods"></yd-icon>
				<input type="text" placeholder="搜索商品">
			</div>
			<div class="search-b">
				<yd-icon class="iconfont icon-screen" custom color="#666" size="1.25rem"></yd-icon>
			</div>
		</section> -->
		<section id="release-goods">
			<div class="release-a">
				<yd-icon class="iconfont icon-block" custom color="#f15353" size="1.5rem"></yd-icon>
			</div>
			<span>商品数量：{{goods_length}}</span>
			<div class="release-b" @click="routeTake(2)">
				<span>发布商品</span>
			</div>
		</section>
		<section id="goods-list">
			<div class="goods-list" v-for="(item,index) in commodity_data">
				<div class="goods-a">
					<img style="width: 100%;height: 100%" :src="item.thumb">     
				</div>
				<ul class="goods-b">
					<li class="name">{{item.title}}</li>
					<li class="price"><span>￥</span>{{item.price}}</li>
					<li class="info">
						<font>库存：{{item.stock}}</font>
						<font>销量：{{item.virtual_sales}}</font>
						<span @click="moreEvent(index)">
						<yd-icon class="iconfont icon-more" custom color="#c9c9c9" size="1.5rem"></yd-icon>
						</span>
						<div class="more" v-show="item.edit_active">
							<ul>
								<li @click="editJumpEvent(index)">
									<yd-icon class="iconfont icon-edit" custom color="#fff" size="1.125rem"></yd-icon>
									<span>编辑</span>
								</li>
								<li  @click="commodityDelete(index)">
									<yd-icon class="iconfont icon-delete" custom color="#fff" size="1.125rem"></yd-icon>
									<span>删除</span>
								</li>
							</ul>
							<div class="icon"><yd-icon class="iconfont icon-down" custom size="1.5rem"></yd-icon></div>
						</div>
					</li>
					
				</ul>
			</div>
			<!-- <div class="goods-list">
				<div class="goods-a">
					<img src="">
				</div>
				<ul class="goods-b">
					<li class="name">商品名称商品名称商品名称商品名称</li>
					<li class="price"><span>￥</span>19800.00</li>
					<li class="info">
						<font>库存：1000</font>
						<font>销量：10</font>
						<yd-icon class="iconfont icon-more" custom  size="1.5rem"></yd-icon>
						<div class="more">
							<ul>
								<li @click="routeTake(1)">
									<yd-icon class="iconfont icon-edit" custom color="#fff" size="1.125rem"></yd-icon>
									<span>编辑</span>
								</li>
								<li>
									<yd-icon class="iconfont icon-delete" custom color="#fff" size="1.125rem"></yd-icon>
									<span>删除</span>
								</li>
							</ul>
							<div class="icon"><yd-icon class="iconfont icon-down" custom  size="1.5rem"></yd-icon></div>
						</div>
					</li>
					
				</ul>
			</div> -->
		</section>
	</section>
</template>

<script>
import manage from "./management_controller.js";
export default manage;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
#goods-manage{
	padding-top:40px;
	#search-box{
		background-color: #fff;
		display: flex;
		height:2.8125rem;
		line-height: 2.8125rem;
		position: relative;
		padding-left:1.25rem;
		border-bottom:solid 0.0625rem #ebebeb;
		.search-a{
			background-color: #f2f2f2;
			height:1.75rem;
			line-height: 1.75rem;
			border-radius: 0.875rem;
			display: flex;
			padding:0 0.875rem;
			margin-top:0.5313rem;
			width:18.75rem;
			input{
				border:none;
				width:90%;
				margin-left:0.625rem;
			}
		}
		.search-b{
			width:2.8125rem;
			height:2.8125rem;
			position: absolute;
			right:0;
		}
	}
	#release-goods{
		background-color: #fff;
		display: flex;
		font-size:16px;
		position: relative;
		height:3rem;
		line-height: 3rem;
		border-bottom:solid 0.0625rem #ebebeb;
		.release-a{
			width:3rem;
			height:3rem;
		}
		.release-b{
			position: absolute;
			right:0.875rem;
			top:0.6875rem;
			font-size:14px;
			background-color: #f15353;
			height:1.625rem;
			line-height: 1.625rem;
			padding:0 0.625rem;
			display: block;
			border-radius: 0.8125rem;
			color:#fff;
		}
	}
	#goods-list{
		.goods-list{
			background-color: #fff;
			padding:0.625rem 0;
			display: flex;
			border-bottom:solid 0.0625rem #ebebeb;
			.goods-a{
				width:5rem;
				height:5rem;
				background-color: #ccc;
				margin-left:0.625rem;
			}
			.goods-b{
				margin:0 0.875rem;
				width:16.0625rem;
				text-align: left;
				line-height: 1.25rem;
				.name{
					height:2.5rem;
					font-size:14px;
				}
				.price{
					color:#f15353;
					font-size:16px;
					span{
						font-size:12px;
					}
				}
				.info{
					position: relative;
					color:#8c8c8c;
					font-size:12px;
					font{
						margin-right:1.25rem;
					}
					.icon-more{
						position: absolute;
						right:0;
						z-index: 2;
					}
					.more{
						background: rgba(51,51,51,0.9);
						border-radius: 0.25rem;
						color:#f0f0f0;
						width:5.5rem;
						position: absolute;
						right:0;
						top:-2.75rem;
						ul{
							display: flex;
							justify-content: center;
							li{
								flex:1;
								text-align: center;
								i{
									display: block;
									margin-top:0.125rem;
								}
							}
						}
						.icon{
							position: absolute;
							right:0;
							top:2.25rem;
							i{
								color:rgba(51,51,51,0.9); 
							}
						}
					}
				}
			}
		}
		.goods-list:last-child{
			border:none;
		}
	}
	
}
</style>