<template >
<div id="balance_recharge">
	<c-title :hide="false" text='充值'></c-title>
	<div style="height: 50px;"></div>
	<div class="my_wrapper">
		<span>当前余额：</span>
		<div class="my-value"><span>{{credit2}} </span> 元</div>
	</div>
	<mt-field label="充值金额：" v-model="money" placeholder="请输入充值金额"></mt-field>
	
	<div style="height: 1.25rem;"></div>

	<div id="payBtnList" v-if="recharge==1">
		<div class="mod_btns" v-for="btn in buttons">
			<a @click = "confirm(btn.value)" class="mod_btn" :class="[btnclass(btn.value)]">{{btn.name}}{{typename}}</a>
 
			<div v-if="huanxun_form_quick == btn.value || huanxun_form_wx == btn.value">
					<form id="ipspaysubmit" method="post" :action="huanxun_form_action">
						<input type="hidden" :name="huanxun_input_name" v-model="huanxun_form_input">
					</form>
				</div>

		</div>
	</div>
	<!--<mt-button type="primary" size="large" @click="confirm">确认充值</mt-button>-->
</div>
</template>
<script>
	import member_balance_recharge from './member_balance_rechargecontroller';
	export default member_balance_recharge;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
#balance_recharge{
	.my_wrapper{background: #FFF; overflow: hidden; display: flex; padding:0 14px;
		line-height: 3.0625rem;height:3.0625rem;
		span{text-align: left;
			font-size: 16px;line-height: 3.0625rem;}
		.my-value{flex: 2;text-align: left; span{color: #f15353;}}
	}
	
}
.mint-field .mint-cell-title {
	 width: 5rem;
	 -webkit-box-flex: 0;
	 -ms-flex: none;
	 flex: none;
	 text-align: left;
	 margin-left: 0.9375rem;}

#payBtnList {
	.mod_btns {margin-bottom:0.75rem ;height: 2.875rem;  line-height: 2.875rem;  font-size: 16px;
		.mod_btn{display: block;width: 90%;margin: 0 auto;border-radius: 0.25rem;}
		.mod_btn.bg_wechat {background: #19ad19;color: #fff;}
		.mod_btn.bg_alipay {background: #22aaed;color: #fff;}
		.mod_btn.bg_ali {background: #22aaed;color: #fff;}

}}
</style>