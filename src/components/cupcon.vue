<template>
	<!-- 大于三张优惠券 -->
	<div :style="'background:'+datas.params.bgcolor">
		<div id="coupon" v-if="datas.params.shownum>3">
			<div class="coupon-con">
				<div class="coupon-con-1">
					<div class="coupon-a" v-for="(item,index) in coupon_list" :class="{'last':item.api_availability == 2 || item.api_availability == 3}" @click="selectedcoupon(item,index)" :style="'background:'+datas.params.couponcolor">
						<ul>
							<li v-if="item.coupon_method==1"><font>￥</font>{{item.deduct}}</li>
							<li v-if="item.coupon_method==2">{{item.discount}}<font>折</font></li>
							<li><span>{{item.name}}</span></li>
						</ul>
						<div class="spare-a"></div>
						<div class="spare-b"></div>

						<div class="img" v-if="item.api_availability == 3 ? true:false"><img src="../assets/images/lootall.png"></div>

						<div class="img" v-if="item.api_availability == 2 ? true:false"><img src="../assets/images/receive.png"></div>
					</div>
					<!-- <div class="coupon-a last">
						<ul>
							<li>
								<font>￥</font>10</li>
							<li><span>满1000元可用</span></li>
						</ul>
						<div class="spare-a"></div>
						<div class="spare-b"></div>
						<div class="img"><img src="../assets/images/lootall.png"></div>
					</div>
					<div class="coupon-a last">
						<ul>
							<li>
								<font>￥</font>10</li>
							<li><span>满1000元可用</span></li>
						</ul>
						<div class="spare-a"></div>
						<div class="spare-b"></div>
						<div class="img"><img src="../assets/images/lootall.png"></div>
					</div>
					<div class="coupon-a last">
						<ul>
							<li>
								<font></font>8
								<font>折</font>
							</li>
							<li><span>满1000元可用</span></li>
						</ul>
						<div class="spare-a"></div>
						<div class="spare-b"></div>
						<div class="img"><img src="../assets/images/receive.png"></div>
					</div> -->
				</div>
			</div>
		</div>
		<!-- 小于等于三张优惠券 -->
		<div id="coupon1" v-if="datas.params.shownum <= 3">
			<div class="coupon-a" v-for="(item,index) in coupon_list" :class="{'last':item.api_availability == 2 || item.api_availability == 3}" @click="selectedcoupon(item,index)" :style="'background:'+datas.params.couponcolor">
				<ul>
					<li v-if="item.coupon_method==1"><font>￥</font>{{item.deduct}}</li>
					<li v-if="item.coupon_method==2">{{item.discount}}<font>折</font></li>
					<li><span>{{item.name}}</span></li>
				</ul>
				<div class="spare-a"></div>
				<div class="spare-b"></div>

				<div class="img" v-if="item.api_availability == 3 ? true:false"><img src="../assets/images/lootall.png"></div>

				<div class="img" v-if="item.api_availability == 2 ? true:false"><img src="../assets/images/receive.png"></div>
			</div>
			<!-- <div class="coupon-a last">
				<ul>
					<li>
						<font>￥</font>10</li>
					<li><span>满1000元可用</span></li>
				</ul>
				<div class="spare-a"></div>
				<div class="spare-b"></div>
				<div class="img"><img src="../assets/images/lootall.png"></div>
			</div>
			<div class="coupon-a last">
				<ul>
					<li>
						<font></font>8
						<font>折</font>
					</li>
					<li><span>满1000元可用</span></li>
				</ul>
				<div class="spare-a"></div>
				<div class="spare-b"></div>
				<div class="img"><img src="../assets/images/receive.png"></div>
			</div> -->
		</div>
	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui';
	export default {
		props: {
			datas:{
				default:[]
			}
		},
		data() {
			return {
				coupon_list:[]
			}
		},

		mounted(){
			console.log(this.datas.data);
			if(this.datas.params.addmethod == "0"){
				this.autoGetData();
			}else{
				this.coupon_list=this.datas.data;
			}
		},
		
		activated() {

		},

		computed: {},
		methods: {
			selectedcoupon(item, index) {

				if(item.api_availability == 3){
					return;
				}
				//领取
				var that = this;
				$http.get('coupon.member-coupon.get-coupon', { coupon_id: item.coupon_id }, '正在抢此优惠券').then(function (response) {

					if (response.result == 1) {
						var temp = response.data;
						that.$set(that.coupon_list, index, temp);
						//console.log(that.list);

					} else {
						//MessageBox.alert(response.msg);
						MessageBox.alert(response.msg);
					}
				}, function (response) {
					// error callback
				});
			},
			
			autoGetData(){
				$http.get("coupon.member-coupon.coupons-for-designer",{}).then(res =>{
					if(res.result == 1){
						this.coupon_list=res.data.data;
					}
				}).catch(error =>{
					console.log(error);
				})
			}
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	#coupon {
		overflow: hidden;
		overflow-x: auto;
		margin-top: 0.0625rem;
		.coupon-con {
			// margin-top: 0.0625rem; 
			// width: 100%;
			// justify-content: space-between;
			// padding: 0.625rem;
			// background-color: #fff;
			// overflow-y: hidden;
			// position: relative;
			height: 3.75rem;
			width: 6.25rem;
			position: relative;
		}
		.coupon-con-1 {
			left: 0px;
			top: 0px;
			position: absolute;
			height: 3.75rem;
			overflow-x: auto;
			white-space: nowrap;
			display: flex;
		}
		.coupon-a {
			overflow: hidden; // background-color:rgba(241,83,83,0.8) ;
			background-color: #ff9800;
			border-radius: 0.25rem; //width: 7.125rem;
			width: 7.125rem;
			height: 3.75rem;
			position: relative; //float: left;
			margin-right: 0.625rem;
			ul {
				color: #fff;
				li:first-child {
					margin-top: 0.5rem;
					line-height: 1.5rem;
					font-size: 24px;
					font-weight: bold;
					font {
						font-size: 12px;
						font-weight: normal;
					}
				}
				li:last-child {
					span {
						padding: 0 0.375rem;
						border-radius: 0.1875rem; // background:rgba(255,184,76,0.2);
					}
				}
			}
			.img {
				width: 4rem;
				height: 4rem;
				position: absolute;
				top: -1.5rem;
				right: -1.5rem;
				img {
					width: 100%;
				}
			}
			.spare-a {
				width: 0.625rem;
				height: 0.625rem;
				background-color: #fff;
				border-radius: 0.3125rem;
				position: absolute;
				top: calc(50% - 0.3125rem);
				left: -0.3125rem;
			}
			.spare-b {
				width: 0.625rem;
				height: 0.625rem;
				background-color: #fff;
				border-radius: 0.3125rem;
				position: absolute;
				top: calc(50% - 0.3125rem);
				right: -0.3125rem;
			}
		}
		.coupon-a:first-child {
			margin-left: 0.625rem;
		}
		.last {
			background-color: #eaeaea;
		}
	}
	#coupon1 {
		margin-top: 0.0625rem;
		display: flex;
		justify-content: space-between;
		padding: 0.625rem;
		background-color: #fff;
		.coupon-a {
			overflow: hidden; // background-color:rgba(241,83,83,0.8) ;
			background-color: #ff9800;
			border-radius: 0.25rem;
			width: 7.125rem;
			height: 3.75rem;
			position: relative;
			ul {
				color: #fff;
				li:first-child {
					margin-top: 0.5rem;
					line-height: 1.5rem;
					font-size: 24px;
					font-weight: bold;
					font {
						font-size: 12px;
						font-weight: normal;
					}
				}
				li:last-child {
					span {
						padding: 0 0.375rem;
						border-radius: 0.1875rem; // background:rgba(255,184,76,0.2);
					}
				}
			}
			.img {
				width: 4rem;
				height: 4rem;
				position: absolute;
				top: -1.5rem;
				right: -1.5rem;
				img {
					width: 100%;
				}
			}
			.spare-a {
				width: 0.625rem;
				height: 0.625rem;
				background-color: #fff;
				border-radius: 0.3125rem;
				position: absolute;
				top: calc(50% - 0.3125rem);
				left: -0.3125rem;
			}
			.spare-b {
				width: 0.625rem;
				height: 0.625rem;
				background-color: #fff;
				border-radius: 0.3125rem;
				position: absolute;
				top: calc(50% - 0.3125rem);
				right: -0.3125rem;
			}
		}
		.last {
			background-color: #eaeaea;
		}
	}
</style>