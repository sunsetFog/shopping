<template >
<div id="balance_recharge">
	<c-title :hide="false" text='提现'></c-title>
	<div style="height: 50px;"></div>
	<div class="my_wrapper">
		<span>当前余额：</span>
		<div class="my-value"><span>{{balance}} </span> 元</div>
	</div>
	<mt-field label="提现金额：" v-model="info_form.balance_money" placeholder="请输入提现金额"></mt-field>

	<div style="line-height: 30px;text-align:left;margin-bottom:1.25rem;padding-left:0.875rem;color:#8c8c8c;">{{poundage}}</div>
	<!--<mt-button type="primary" size="large" @click="confirm">确认提现</mt-button>-->
	<div id="payBtnList">
		<div class="mod_btns" id="wechatpay" v-if="withdrawToWechat">
			<a @click="confirm(1)" class="mod_btn bg_wechat">提现到微信</a>
		</div>
		<div class="mod_btns" id="alipay" v-if="withdrawToAlipay">
			<a @click="confirm(2)" class="mod_btn bg_ali">提现到支付宝</a>
		</div>
		<div class="mod_btns" id="manual" v-if="withdrawToManual">
			<a @click="confirm(3)" class="mod_btn bg_manual">手动提现</a>
		</div>
		<div class="mod_btns" v-if="eupshow">
			<a @click="confirm(4)" class="mod_btn bg_manual">EUP提币</a>
		</div>

		<div class="mod_btns" v-if="hxShow">
			<a @click="confirm(5)" class="mod_btn bg_manual" >提现银行卡</a>
		</div>
	</div>


	<!-- 提现到银行卡弹窗 -->

    <mt-popup v-model="popupVisible" style="width:72%;border-radius:0.375rem;">
      <form :action="action" method="post" style="width:100%;height:100%;">
        <h1 style="font-size:16px;color:#333;padding:1.25rem 0;line-height:2.25rem;font-weight:normal;border-bottom:solid 0.0625rem #ebebeb;">{{notice}}</h1>
          <input type="text" name="ipsRequest" :value="msg" style="display:none;margin-top:0.625rem;"/>
          <input type="submit" value="确认" style="width:100%;height:2.5rem;line-height:2.5rem;font-size: 16px;color: #26a2ff;border: none;"/>
      </form>
    </mt-popup>  
</div>
</template>
<script>
	import member_balance_withdrawals from './member_balance_withdrawalscontroller';
	export default member_balance_withdrawals;

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
	#balance_recharge{
	.my_wrapper{background: #FFF; overflow: hidden; display: flex; padding:0 0.9375rem;
	span{text-align: left;
		font-size: 16px;line-height: 3.0625rem;}
	.my-value{flex: 2;text-align: left; span{color: #f15353;}}
	}
	.mint-tab-item-label{
        line-height: 2.75rem;
    }
	}
	.mint-field .mint-cell-title {
		-webkit-box-flex: 0;
		-ms-flex: none;
		flex: none;
		text-align: left;
		margin-left: 0.9375rem;}

	#payBtnList {
	.mod_btns {margin-bottom:0.75rem;  height: 2.875rem;  line-height: 2.875rem;  font-size: 16px;
	.mod_btn{display: block;width: 90%;margin:0 auto;border-radius: 0.25rem;}
	.mod_btn.bg_wechat {background: #19ad19;color: #fff;}
	.mod_btn.bg_ali {background: #22aaed;color: #fff;}
	.mod_btn.bg_manual {background: #fff;border:solid 0.0625rem #bfcbd9;color: #333;}

	}}
</style>