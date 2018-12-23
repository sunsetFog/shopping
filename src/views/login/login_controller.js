//window.localStorage.isWeiXin
import { mapState, mapMutations } from 'vuex';
import { Field, Button } from 'mint-ui';
import cTitle from 'components/title';
export default {
	
	//name: 'login',
	data() {
		return {
			form: {
				mobile: '',
				mobileErr: '',
				password: '',
				passwordErr: '',
				uuid: 0,
				mid:0
			},
			mydata: '',
			isApp: false,
			apptoken: '',
			wetach_login: false,
			appShow:false
		}
	},
	components: {
		cTitle
	},
	methods: {
		login(data) {
			var that = this;
			$http.post('member.login.index', data,"").then((response)=>{
				if(response.result == 1) {
					window.localStorage.myuserinfo = response.data;
                    console.info('--会员信息--');
					console.info(response.msg);
                    that.$store.commit('setLoginStatus', response.data.status);
                    if (that.fun.isApp()) {
                        YDB.SetUserRelationForPush(response.msg.member_id);
                    }
					if (response.data.url) {
						window.location.href = response.data.url;
					} else {
                        that.$router.push(this.fun.getUrl('home'));
					}
				}else{
                    that.$store.commit('alerts', response.msg);
				}
			});
			
		},
		mobile_login () {

			if(this.fun.isTextEmpty(this.form.mobile))
			{
				this.$dialog.toast({
                    mes: '请填写手机号',
                    timeout: 1500
                });
				return;
			}

			if(this.fun.isTextEmpty(this.form.password))
			{
				this.$dialog.toast({
                    mes: '请填写密码',
                    timeout: 1500
                });
				return;
			}

			this.form.uuid = 0;
			
			this.form.mid = this.fun.isTextEmpty(window.localStorage.getItem("mid")) == null ? 0:window.localStorage.getItem("mid");

			console.log(this.form.mid);

			this.login(this.form);
		},
		register(){
			this.$router.push(this.fun.getUrl('register'));
		},
		weixin(){
			var that = this;
			var i = that.fun.getKeyByI();
			var mid = that.fun.getKeyByMid();
			var type = that.fun.getTyep();
			var accessUrl = that.fun.getSiteRoot() + "/addons/yun_shop/api.php?i=" + i + "&mid=" + mid + "&type=" + type + "&route=member.login.index&uuid=" + YDB_UUID;
			YDB.WXLogin(0, accessUrl);
		},
		init_login() {
			var that = this;
            if (!that.fun.isApp()) {
            	return;
			}
			if (!YDB_isWXApp) {
                return;
			}
			if (that.apptoken) {
                that.login({apptoken:this.apptoken});
			} else {
				$http.get('member.login.index', {'show_wechat_login':true}).then((response)=>{
					if(response.result == 1) {
						that.wetach_login = response.data.wetach_login;
					}
				});
			}
		},
		//跳转修改密码
		gotoPwd(){
			this.$router.push(this.fun.getUrl("findpwd"));
		},

		isAppLogin(){

			$http.post("member.login.phoneSetGet",{}).then(response =>{
				console.log(response);
				if(response.result == 1){
					
					if(response.data.phone_oauth == 1){
						this.appShow=true;
					}else if(response.data.phone_oauth == 0 ){
						this.appShow=false;
					}else{
						return;
					}

				}
			}).catch(error =>{
				console.log(error);
			})
		}
	},
	activated(){

		let app=this.fun.getTyep();

		console.log(app);

		if(app == "7"){

			this.isAppLogin();

		}else{

			this.appShow=true;
		}

		this.apptoken = this.$route.query.apptoken;
		this.init_login();

		

		//this.isAppLogin();

	
	}
}