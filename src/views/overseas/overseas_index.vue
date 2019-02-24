<template>
    <div id="love_index">
    	<c-title :hide="false" :text='coin_name' ></c-title>
    	<div style="height: 100px;"></div>
    	<center><i class="fa fa-balance-scale" ></i></center>
    	<p class="my-banlance">可用<font>{{coin_name}}</font><br /><span>￥<b>{{usable}}</b></span>
    		<br /><div id="djj">冻结{{coin_name}}{{froze}}元</div>
    	</p>
		<p>
			<el-button type="success" @click="chargeHandel" v-if="transfer_status">转账</el-button><br />
			<el-button type="success" @click="toBalance">提现到余额</el-button>
		</p>
		<div id="jh">
			<span id="jhst"><router-link :to="fun.getUrl('overseas_record')">激活记录</router-link></span>
			<span><router-link :to="fun.getUrl('overseas_list')">查看明细</router-link></span>
		</div>
		<div id="helps">
			<router-link :to="fun.getUrl('overseas_explain')"><p>?</p>{{coin_name}}说明</router-link>
		</div>
    </div>
</template>
<script>
import overseas_index_Controller from './overseas_index_Controller';
export default overseas_index_Controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#love_index{
	button{width: 70%;margin: 0.3125rem 0;}
	i{font-size: 4.375rem;  color: #ffcc00;}
	.my-banlance{margin: 1.25rem 0;font-size: 14px;  color: #333;line-height: 2rem;}
	.my-banlance span{font-size: 14px;color: #333;margin-top:0.625rem; }
	.my-banlance span b{font-size: 26px;}
	#djj{margin: 0.9375rem 0;    font-size: 18px;}
	#jh{margin-top: 0.3125rem;
		#jhst{border-right: 0.0625rem solid #8C8C8C;padding-right: 0.9375rem;}
		span{padding: 0 0.9375rem;}
	}
	#helps{
		position: fixed;bottom: 0.625rem;left: 0;right: 0;    
		a{color:#607d8b;font-size: 12px;}
		p{background: #f15353;color: #FFF;border-radius: 50%;width: 1.25rem;height: 1.25rem;line-height: 1.25rem;margin:0 auto;margin-bottom: 0.25rem;}
	}
}
</style>