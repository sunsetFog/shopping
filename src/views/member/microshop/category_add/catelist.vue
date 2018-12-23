<template>
	<div id="search" transition="fadeInLeft">
		<div id="soso" class="uou" :class="{'mout':amout}">
			<div class="search">
				<el-button slot="prepend" icon="arrow-left" @click='goback'></el-button>
				<el-input placeholder="搜索当前分类商品" v-model="inputs">
					<el-button slot="append" icon="search" @click='search'></el-button>
				</el-input>
	
				<el-col :span="1">
					<i class="fa fa-th-large" v-show="view" @click="$store.commit('views')"></i>
					<i class="fa fa-th-list" v-show="!view" @click="$store.commit('views')"></i>
				</el-col>
			</div>
			<!--<c-sort :goods='datas' v-on:sortIn="sortOut" text='搜索结果'></c-sort>-->
	
		</div>
		<div style="height: 1.5625rem;display: block;"></div>
		<div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
			<mt-loadmore :top-method2="loadTop" @top-status-change2="handleTopChange" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" topPullText='' topDropText='' topLoadingText='' bottomPullText='' bottomDropText='下拉加载...' bottomLoadingText=''>
				<c-goodsList :isSelect="$route.params.isSelect" :num='0' @selectTotal="changeTotal" :goods='datas' text='搜索结果' class='osll' :loading='loading'></c-goodsList>
	
			</mt-loadmore>
		</div>
	
		<div class="bottom">
			<i @click="postSelectGood">
				已选&nbsp;
				<b>{{totalGoodsNum}}</b>&nbsp;件商品
			</i>
			<span>
				<div @click="pushFn">
					确定选择
				</div>
	
				<router-link :to="fun.getUrl('',{num:0,isSelect:true})">
					继续去选择商品
				</router-link>
	
			</span>
		</div>
	
	</div>
</template>

<script>

import catelist_controller from './catelist_controller';
export default catelist_controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#search {
	.bottom {
		width: 100%;
		box-sizing: border-box;
		padding-left: 0.9375rem;
		border-top: 0.0625rem solid #eaeaea;
		position: fixed;
		bottom: 0;
		background: #fff;
		font-size: 18px;
		text-align: left;
		line-height: 3.125rem;
		i {
			font-style: normal;
		}
		a {
			color: #000000;
		}
		b {
			color: #f37385;
		}
		span {
			width: 8.125rem;
			/*padding: 15px;*/
			text-align: center;
			height: 3.125rem;

			color: #fff;
			background: #f15353;
			float: right;
			display: inline-block;
			a,
			div {
				font-size: 16px;
				color: #FFF;
			}
		}
	}
	.osll {
		min-height: 100vh;
		margin-top: 1.375rem;
		box-sizing: border-box;
	}
	// @descendent wrapper {
	// 	overflow: scroll;
	// }
	.page-loadmore-wrapper2 {
		height: 100vh;
		overflow: hidden;
	}
	.uou {
		position: fixed;
		z-index: 99;
		top: 0rem;
		transition: .2s;
		-webkit-transition: .2s;
	}
	.mout {

		top: -2.25rem;
	}
}

.search {
	overflow: hidden;
	background: #fff;
	border-bottom: 0.0625rem solid #f5f5f5;
	.el-button.el-button--default {
		float: left;
		width: 10%;
		border: none;
		padding-top: 1rem;
	}
	.el-input.el-input-group.el-input-group--append {
		float: left;
		width: 80%;

		margin-left: 2%;
		height: 2.8125rem;
	}
	.el-input-group__append .el-button.el-button--default {
		background: #F5F5F5;
		padding-top: 0.5625rem;
		line-height: 1rem;
		padding-right: 1.8125rem;
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
	}
	.el-input.el-input-group.el-input-group--append .el-input-group__append {
		background: #f5f5f5;
	}
	.el-col-1 {
		margin: 0.75rem 0rem;
		color: #666;
		font-size: 16px;
	}
}
</style>