<template >
	<div id="balance_recharge">
		<c-title :hide="false" text='订单支付'></c-title>
		<div style="height: 40px;"></div>
		<div class="pay-box">
			<div class="my_wrapper">
				<div class="left"><span>账</span><span>户</span><span>余</span><span>额：</span></div>
				<div class="my-value">{{balance}} 元</div>
			</div>
			<div class="my_wrapper">
				<div class="left"><span>支</span><span>付</span><span>流</span><span>水</span><span>号：</span></div>
				<div class="my-value">{{order_sn}}</div>
			</div>
			<div class="my_wrapper">
				<div class="left"><span>支</span><span>付</span><span>金</span><span>额：</span></div>
				<div class="my-value">
					<span>{{money}} </span> 元</div>
			</div>
		</div>
		
		<div style="height: 1.25rem;"></div>
		<div id="payBtnList">
			<div class="mod_btns" v-for="btn in buttons">
				<a @click="confirm(btn)" class="mod_btn" :class="[btnclass(btn.value)]">{{btn.name}}{{typename}}</a>

				<div v-if="huanxun_form_quick == btn.value || huanxun_form_wx == btn.value">
					<form id="ipspaysubmit" method="post" :action="huanxun_form_action">
						<input type="hidden" :name="huanxun_input_name" v-model="huanxun_form_input">
					</form>
				</div>
			</div>
			<!-- <el-button style="width: 21.09rem;height: 46px;margin-bottom: 10px;font-size: 16px;font-family: Source Sans Pro, Helvetica, sans-serif;" type="success" @click="confirm('flower')">模拟支付</el-button> -->
		</div>

		<yd-keyboard v-model="popupSpecs" title="安全键盘" input-text="请输入支付密码" :callback="keyboardDone" ref="keyboardDemo1"></yd-keyboard>

		<!--<mt-button type="primary"
																			           size="large"
																			           @click="getWeChatPayParams">微信支付</mt-button>-->
	</div>
</template>
<script>
import order_paymentcontroller from './order_paymentcontroller';
export default order_paymentcontroller;

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
#balance_recharge {
	.pay-box{
		padding:0 0.875rem;
		background: #FFF;
	}
	.my_wrapper {
		text-align: left;
		overflow: hidden;
		display: flex;
		height:2.75rem;
		line-height: 2.75rem;
		.left{
			display: flex;
			justify-content: space-between;
			flex: 0.8;
			margin-right:0.625rem;
			color:#8c8c8c;
		}
		span {
			font-size: 16px;
			line-height: 2.75rem;
		}
		.my-value {
			line-height: 2.75rem;
			text-align: left;
			font-size:16px;
			flex: 2;
			text-align: left;
			span {
				color: red;
			}
		}
	}
}

#payBtnList {
	.mod_btns {
		margin-bottom: 0.75rem;
		font-size: 16px;
		.mod_btn {
			height:2.875rem;
			line-height: 2.875rem;
			display: block;
			width: 90%;
			margin:0 auto;
			border-radius: 0.25rem;
		}
		.mod_btn.bg_wechat {
			background: #26ce29;
			color: #fff;
		}
		.mod_btn.bg_alipay {
			background: #FF6100;
			color: #fff;
		}
		.mod_btn.bg_ali {
			background: #22aaed;
			color: #fff;
		}
		.mod_btn.bg_cash {
			background: #FB0207;
			color: #fff;
		}
		//找人代付
		.mod_btn.bg_payanother {
			background: #ff6666;
			color: #fff;
		}
		//电子钱包快捷支付
		.mod_btn.bg_quick {
			background: #0099ff;
			color: #fff;
		}
	}
}

.pay-psw-info {
	overflow-y: scroll;
	width: 100vw;
	height: auto;
	background: #FFF;
	max-height: 80vh;
	padding-top: 0.625rem;
}

footer {
	position: absolute;
	bottom: 0;
	width: 100vw;
	font-weight: 600;
}

.pay_btn {
	border-top: 0.0625rem solid #ddd;
	width: 100vw;
	height: auto;
}


.pay_btn li {
	width: 33%;
	float: left;
	height: 3rem;
	line-height: 3rem;
	text-align: center;
	background: #fff;
	font-size: 14px;
	border-right: 0.0625rem solid #ddd;
	border-bottom: 0.0625rem solid #ddd;
}


.pay_btn li:active {
	background: #C2C2C2;
}

.b9:active {
	background: #fff !important;
}

.b9 {
	background: #C2C2C2 !important;
}

.pay_content {
	width: 100vw;
	height: 3.125rem;
	margin-bottom: 0.625rem;
}

.pay_content_title {
	width: 100vw;
	height: 1.875rem;
	line-height: 1.875rem;
	margin-bottom: 0.625rem;
	font-size: 18px;
}

.pay_content_view {
	width: 100vw;
	height: 3.125rem; // margin-left: 2px;
	border-bottom: 0.0625rem solid #ddd;
	border-top: 0.0625rem solid #ddd;
	border-right: 0.0625rem solid #ddd;
}

.ipt_pay_p {
	line-height: 3.125rem;
	height: 3.125rem;
	font-size: 20px;
}

.ipt_pay {
	float: left;
	width: 16.27%;
	height: 3.125rem;
	text-align: center;
	border-left: 0.0625rem solid #ddd;
}
</style>