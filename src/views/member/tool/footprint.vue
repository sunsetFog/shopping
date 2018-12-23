<template>
	<div id="footprint">
		<c-title :hide="false"
		         text='我的足迹'></c-title>
		<div style="height: 40px;margin-bottom:0.375rem;"></div>
	
		<!--<mt-cell-swipe
				      v-for="n in 10"
				      :right="rightButtons"
				      title="swipe me">
				    </mt-cell-swipe>-->
		<div class="tbs"
		     v-for="(item,index) in datas" v-if='item.goods' @click="toItem(item)">
			<mt-cell-swipe :right="[{content: '删除', style: {  color: '#fff' },
		      handler: () => {delteteItem(item,index)}
		    }]">
				<div class="li2" v-if='item.goods.thumb'><img :src="item.goods.thumb" /></div>
				<div class="li2" v-if='!item.goods.thumb'><img src="../../../assets/images/img_default.png" /></div>
				<div class="li3">
					<div class="product-name">{{item.goods.title}}</div>
					<p class="product-price">￥ <span>{{item.goods.price}}</span></p>
				</div>
			</mt-cell-swipe>
		</div>
	
		<!--<div id="foota"
			     style="display: none;">
				<el-checkbox v-model="checkAll"
				             @change="handleCheckAllChange">全选</el-checkbox>
				<span class="dels">删除</span>
			</div>-->
	</div>
</template>

    
   

<script>
import footprintcontroller from './footprintcontroller';
export default footprintcontroller;

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#footprint {
	.tbs {
		display: flex;
		align-items: center;
		background: #FFF;
		flex-flow: row wrap;
		border-bottom: #f5f5f5 0.0625rem solid;
		margin-bottom: 0.375rem;
		.li1 {
			flex: 10%;
			padding: 0.3125rem 0;
		}
		.li2 {
			flex: 20%;
			
			img {
				width: 25vw;
				height: 25vw;
			}
		}
		.li3 {
			flex: 60%;
			display: flex;
			flex-direction: column;
			text-align: left;
			padding: 0.3125rem 0.625rem;
			box-sizing: border-box;
			.product-name {
				flex: 5;
				font-size: 14px;
				color: #666;
				text-align: justify;
				line-height: 5vw;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				margin-bottom: 1.125rem;
			}
			.product-price {
				flex: 1;
				color: #f15353;
				text-align: right;
				margin: 0;
				font-size: 14px;
				span {
					font-size: 18px;
				}
			}
		}
		.li4 {
			flex: 10%;
		}
	}
	#foota {
		position: fixed;
		bottom: 0;
		background: #FFF;
		width: 100%;
		display: flex;
		align-items: center;
		.el-checkbox {
			flex: 5;
			text-align: left;
			padding-left: 0.9375rem;
		}
		.dels {
			flex: 3;
			border-radius: 0.25rem;
			border: solid 0.0625rem red;
			background: red;
			color: #FFF;
			padding: 0.625rem;
		}
	}
}
</style>