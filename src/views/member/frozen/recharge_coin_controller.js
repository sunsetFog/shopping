import cTitle from 'components/title';
import { MessageBox } from 'mint-ui';
export default {
	components: { cTitle },
	data() {
		return {
			val: "",

			recharge_val: 0,

			alipay_show:false,

			wechat_show:false,
		}
	},

	activated() {
		this.initData();
		this.getData();
	},
	methods: {

		//获取数据
		getData() {
			$http.get("plugin.froze.Frontend.Controllers.page.index", {}, "加载中...").then(res => {
				if (res.result == 1) {
					console.log(res)
					this.val = res.data.froze;
					this.isPayType(res.data.buttons);
				}
			}).catch(error => {
				console.log(error);
			})
		},

		//初始化数据
		initData() {
			this.val = "";
			this.recharge_val=0;
			this.alipay_show=false;
			this.wechat_show=false;
		},

		//校验数据
		validateData(val) {
			let reg = new RegExp("^\d+(\.\d{1,2})?$");

			if (this.fun.isTextEmpty(val) || val <= 0) {
				MessageBox.alert("充值金额不能为0和负数", '提示');
				return
			}
			//输入小数最多两位
			if (!(val.match(/^\d+(\.\d{1,2})?$/))) {
				MessageBox.alert("请输入正确的金额,最多两位小数", '提示');
				return
			}




		},

		
		//提交订单 方式 -- 支付类型
		submitOrder(way){

			this.validateData(this.recharge_val);

			let json={
				change_value:this.recharge_val,
				pay_way:way == "alipay"?2:way == "wechatpay"?1:""
			}
			$http.get("plugin.froze.Frontend.Modules.Froze.Controllers.recharge.index",json,"...充值中").then(res =>{
				if(res.result == 1){
					if(way == "alipay"){
						this.$router.push(this.fun.getUrl('fre_alipay', { status: 1, recharge_money: this.recharge_val, order_pay_id: res.data.order_sn, uid: res.data.uid,pid:this.$route.query.pid?this.$route.query.pid:res.data.uid,tag:"frozen" }));
					}else if(way == "wechatpay"){
						wx.config(res.data.js);
						this.WXPay(res.data.config);
					}
				}
			}).catch(error =>{
				console.log(error);
			})
		},

		//微信支付
		WXPay(payParams) {
			//alert('"'+payParams.timestamp+'"');
			var that = this;
			wx.chooseWXPay({
				appId: payParams.appId,
				timestamp: payParams.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
				nonceStr: payParams.nonceStr, // 支付签名随机串，不长于 32 位
				package: payParams.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
				signType: payParams.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
				paySign: payParams.paySign, // 支付签名
				success: function (res) {
					// 支付成功后的回调函数

					if (res.errMsg == "chooseWXPay:ok") {
						MessageBox.alert("充值成功", '提示');
						that.$router.go(-1);
					} else {
						MessageBox.alert('充值失败，请返回重试');
					}
				},
				cancel: function (res) {
					//支付取消
				},
				fail: function (res) {
					MessageBox.alert("充值失败，请返回重试。");
				}
			});
		},


		//判断是否有微信或者支付宝支付方式

		isPayType(arr){
			arr.forEach(e => {
				if(e.value == 2){
					this.alipay_show=true;
				}

				if(e.value == 1){
					this.wechat_show=true;
				}
			});
		}


		


		



	}
}