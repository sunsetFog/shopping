<template>
    <div id="love_transfer">
    	<c-title :hide="false" :text='love_name +"转账"' ></c-title>
    	<div style="height: 40px;margin-bottom:1.25rem;"></div>
    	<center><i class="fa fa-heart" ></i></center>
    	<p class="my-banlance">激活{{love_name}}<br /><span>￥<b>{{usable}}</b></span></p>
    	<mt-field label="会员ID" v-model="recharge_id" placeholder="请输入您要转账的会员ID" id='love_id'></mt-field>
    	<div class="inputs">
    	<label for="male">{{love_name}}</label>
    	<input type="text" v-model="recharge_value" :placeholder="'请输入您要转账的'+love_name" id="male"/>
    	</div>
    	<!--<mt-field :label="love_name" v-model.lazy="recharge_value" :placeholder="'请输入您要转账的'+love_name" ></mt-field>-->
		<p><el-button type="success" @click="getBalance">确认转账</el-button><br /></p>
		<p class="notes">注：转账{{love_name}}不能小于{{transfer_fetter}},且为{{transfer_multiple}}的整数倍。<br />转让手续费比率为{{ratio}}%，<br />您实际转账到数为：{{(recharge_value-recharge_value*ratio/100)}}</p>
    </div>
</template>
<script>
import love_transfer_controller from './love_transfer_controller';
export default love_transfer_controller;

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#love_transfer{
	.inputs{background: #FFF;width: 100%;padding: 0.625rem 0.625rem; box-sizing: border-box; display: flex;
		input{border: 0;    -webkit-appearance: none;-moz-appearance: none;
    appearance: none; border-radius: 0; -webkit-box-flex: 1; -ms-flex: 1; flex: 1;outline: 0;line-height: 1.6; font-size: inherit;font-size: 16px;}
		label{font-size: 16px;line-height: 1.6;  width: 6.5625rem;display: block;}
	}
	#love_id{border-bottom: 0.0625rem solid #CCCCCC;}
	button{width: 90%;margin: 1.25rem;height:2.875rem;font-size:16px;}
	i{font-size: 4.375rem;  color: #f15353;}
	.my-banlance{margin: 1.25rem 0;font-size: 14px;  color: #333;line-height: 2rem;}
	.my-banlance span{font-size: 14px;color: #333;margin-top:0.625rem; }
	.my-banlance span b{font-size: 28px;}
	#djj{margin: 0.9375rem 0;    font-size: 18px;}
	#jh{
		#jhst{border-right: 0.0625rem solid #8C8C8C;padding-right: 0.9375rem;}
		span{padding: 0 0.9375rem;}
	}
	#helps{
		position: fixed;bottom: 0;left: 0;right: 0;    
		a{color:#607d8b;font-size: 12px;}
		p{background: #f15353;color: #FFF;border-radius: 50%;width: 1.25rem;height: 1.25rem;line-height: 1.25rem;margin:0 auto;}
		
	}
	.notes{
		color:#8c8c8c;line-height: 1.125rem;
	}
}
</style>