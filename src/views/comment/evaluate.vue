<template >
	<div id="evaluate">
		<c-title :hide="false"
		         text='评价'></c-title>
		<div style="height: 40px;"></div>
		<div id="shop">
			<div class="goods">
				<div class="img"><img :src="good.thumb"></div>
				
				<div class="warp">
					<ul class="inner">
						<li class="name">{{good.title}}</li>
						<li class="option">规格: {{good.goods_option_title}}</li>
					</ul>
					<ul class="price">
						<li class="product_price"><small>￥</small>{{good.goods_price}}</li>
						<li  class="option"> ×{{good.total}}</li>
					</ul>
				</div>
			</div>
	
			<div id="pjall">
				<div id="pj"><span>评分:</span>
					<el-rate v-model="level"
					         show-text
					         @change="getStar"></el-rate>
				</div>
				<div style="height:0.625rem"></div>
				<el-input type="textarea"
				          :rows="2"
				          placeholder="请输入评论内容"
				          v-model="comment">
				</el-input>
				
				<!--<ul class="upfile">
					<li><img src="../../assets/images/img_default.png"/></li>
					<li><i class="fa fa-camera"></i></li>
				</ul>-->
			</div>
			
		</div>
		<div class="submit-tbn">
				<el-button 
			           @click="toComment(good)">提交评价</el-button>
		</div>
			
	</div>
</template>
<script>
import order_list_evaluatecontroller from './evaluatecontroller';
export default order_list_evaluatecontroller;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
#evaluate {
	#shop {
		background: #FFF;
		padding:0.625rem 0 0 0;
	}
	
	
	.goods:after{
			content: "";
			display: block;
			clear: both;
		}
	
	
	.goods {
		/*display: flex;
		align-items: stretch;
		flex-flow: row wrap;
		background: #efeded;
		padding: 5px;
		margin-bottom: 5px;
		.img {
			flex: 3;
			img {
				width: 100%;
			}
		}
		.inner {
			flex: 5;
			padding: 0 5px;
			display: flex;
			flex-direction: column;
			align-items: flex-start;
		}
		.name {
			flex: 5;
			text-align: left
		}
		.price {
			flex: 2;
			align-items: center;
		}*/
		
		
		
		
		
			display: flex;
			width: 100%;
			box-sizing: border-box;
			background: #fafafa;
			.img {
				width:6rem;
				height:6rem;
				padding:0.875rem;
				display: inline-block;
				/*background:blue;*/
				img {
					width: 100%;
				}
			}
			.warp{
				width:70vw;
				padding:0.625rem 1rem 0 0;
				display: inline-block;
				.inner {
					width: 70%;
					float: left;
					box-sizing: border-box;
					padding: 0 0.625rem;
					text-align:left;
					.name {
						text-align: left;
						color: #333333;
						margin-bottom: 0.625rem;
						font-size: 14px;
					}
					
				}
				
				.price {
					width: 30%;
					align-items: center;
					text-align: right;
					color: #333333;
					box-sizing: border-box;
					float: left;
					p {
						margin-top: 0
					}
				}
			}
		
		.product_price {
					margin-bottom: 0.625rem;
					font-size: 14px;
					}
		
		
		
		.option {
			color: #8c8c8c;
			font-size: 12px;
			flex: 1;
		}
	}
	#pjall {
		background: #FFF;
		padding: 0.625rem 0.875rem;
		.upfile{text-align: left; margin-top: 0.625rem;
			li{width: 20vw; float: left; height: 20vw; line-height: 20vw;}
			i{font-size: 1rem;border: 0.0625rem dashed #919191;font-weight: normal;color: #919191;padding: 0.625rem;}
			img{width: 100%;}
		}
		textarea {
			width: 87%;
			margin-top: 0.625rem;
			padding: 0.625rem;
		}
		#pj {
			text-align: left;
			span {
				float: left;
				font-size: 14px;
				padding-right: 0.625rem;
			}
		}
	}
	button {
		width: 90%;
		margin-top:1.25rem;
		height: 2.25rem;
	}
	.submit-tbn{
		button{
			width:90%;
			background-color: #f15353;
			height:2.875rem;
			border-radius: 0.25rem;
			font-size:16px;
			color:#fff;
			border:none;
		}
	}
}
</style>