<template>
    <div id="love_transfer">
    	<c-title :hide="false" :text='coin_name +"转账"' ></c-title>
    	<div style="height: 120px;"></div>
    	<center><i class="fa fa-balance-scale" ></i></center>
    	<p class="my-banlance"><span>￥<b>{{usable}}</b></span><br />可用{{coin_name}}</p>
    	<mt-field label="会员ID" v-model="recharge_id" placeholder="请输入您要转账的会员ID" id='love_id'></mt-field>
    	<mt-field :label="coin_name" v-model="recharge_value" :placeholder="'请输入您要转账的'+coin_name"></mt-field>
		<p><el-button type="success" @click="getBalance">确认转账</el-button><br /></p> 
		<p class="notes">注：转让手续费比率为{{ratio}}%，<br />您实际转账到数为：{{arrival_count}}</p>
    </div>
</template>
<script>
import overseas_transfer_controller from './overseas_transfer_controller';
export default overseas_transfer_controller;

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#love_transfer{
	#love_id{background-color: #fff;}
	button{width: 70%;margin: 0.9375rem;}
	i{font-size: 4.375rem;  color: #ffcc00;}
	.my-banlance{margin: 1.25rem 0;font-size: 14px;  color: #8c8c8c;}
	.my-banlance span{font-size: 14px;color: #333;margin-top:0.625rem; }
	.my-banlance span b{font-size: 26px;}
	#djj{margin: 0.9375rem 0;    font-size: 18px;}
	#jh{
		#jhst{border-right: 0.0625rem solid #8C8C8C;padding-right: 0.9375rem;}
		span{padding: 0 0.9375rem;}
	}
	#helps{
		position: fixed;bottom: 0;left: 0;right: 0;    
		a{color:#607d8b;font-size: 12px;}
		p{background: #e51c23;color: #FFF;border-radius: 50%;width: 1.25rem;height: 1.25rem;line-height: 1.25rem;margin:0 auto;}
		
	}
	.notes{color:#8c8c8c;}
	
}
</style>