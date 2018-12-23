<template>
	<div id="all">
		<mt-loadmore :top-method="loadTop" :top-status.sync="topStatus" @top-status-change="handleTopChange" ref="loadmore">

			<div id="member" style="position:relative;">
				<c-title :hide="true" text='home'></c-title>
				
				<div class="header">
					<div class="icon" v-if="member_item">
						<router-link :to="fun.getUrl('info',{item:member_item})">
						<i class="iconfont icon-shezhi"></i>
						</router-link>
					</div>
					<div class="header-info">
						<div class="left">
							<img v-lazy="avatar">
						</div>
						<div class="user-info">
							<div class="user-name" id="name-one">
								<span id="name-a">{{nickname}}</span>
								<span class="user-other" id="name-b" v-if="level_name">[{{level_name}}] {{validity_value}}
								</span>
							</div>
							<div class="user-name">[{{$store.state.langService.language.langMember.langMemberId}}:{{uid}}]</div>
							<div class="user-other" v-if="MyReferrer.is_show=='1'">[推荐人:{{MyReferrer.nickname}}]
							</div>

							
							<div class="user-name" v-if="is_custom">{{custom_title}}:{{custom_value}}
							</div>
						</div>
						<div class="member-box" @click="gotoMemberGrade" style="z-index:39;" v-if="isMemberGrade">
							<div class="img"><img src="../../assets/images/member-vip02.png"></div>
							<div class="font">会员<i class="fa fa-angle-right"></i></div>
						</div>
					</div>
					<!-- <div class="user">
						<div class="vip">
							<i class="iconfont icon-shoucang1"></i>
						</div>
						<div class="user-head">
							<img v-lazy="avatar">
						</div>
						<div class="user-info">
							<div class="user-name">{{nickname}}</div>
							<div class="user-name">[{{$store.state.langService.language.langMember.langMemberId}}:{{uid}}]</div>
							<div class="user-other" v-if="MyReferrer.is_show=='1'">[推荐人:{{MyReferrer.nickname}}]
							</div>

							<div class="user-other" v-if="level_name">[{{level_name}}] {{validity_value}}
							</div>
							<div class="user-name" v-if="is_custom">{{custom_title}}:{{custom_value}}
							</div>
						</div>
						<div class="set" v-if="member_item">
							<router-link :to="fun.getUrl('info',{item:member_item})">
								<i class="fa fa-gear"></i>
							</router-link>
						</div>
						
					</div> -->
				</div>
				<div id="userinfo">
					<ul>
						<li>
							<router-link :to="fun.getUrl('balance')">
								<span><small>￥</small>{{credit.data}}</span>
								<br>{{credit.text}}</router-link>
						</li>
						<li>
							<router-link :to="fun.getUrl('integral_v2')">
								<span>{{integral.data}}</span>
								<br>{{integral.text}}</router-link>
						</li>
						<li>
							<router-link :to="fun.getUrl('extension')">
								<span><small>￥</small>{{coupon}}</span>
								<br>提现</router-link>


						</li>
					</ul>
				</div>
				<div id="orderlist">
					<div class="ordertltie">
						<!--to="/member/orderList/0"-->
						<router-link :to="fun.getUrl('orderlist',{ status:'0' })">
							<div class="ordername">我的订单</div>
							<div class="">
								<i class="fa fa-angle-right"></i>
							</div>
						</router-link>
					</div>
					<div class="order_all">
						<router-link :to="fun.getUrl('orderlist',{ status:'1'})">
							<div class="order_pub">
								<div class="badge">{{waitPay==0?'':waitPay}}</div>
								<i class="fa money"></i>
								<br>待付款
							</div>
						</router-link>
						<router-link :to="fun.getUrl('orderlist',{ status:'2' })">

							<div class="order_pub">
								<div class="badge ">{{waitSend==0?'':waitSend}}</div>
								<i class="fa box"></i>
								<br>待发货
							</div>
						</router-link>
						<router-link :to="fun.getUrl('orderlist',{ status:'3'})">

							<div class="order_pub">
								<div class="badge ">{{waitReceive==0?'':waitReceive}}</div>
								<i class="fa car"></i>
								<br>待收货
							</div>

						</router-link>
						<!--aftersaleslist-->
						<router-link :to="fun.getUrl('aftersaleslist')">
							<div class="order_pub">
								<div class="badge">{{waitrRefund==0?'':waitrRefund}}</div>
								<i class="fa refun"></i>
								<br>待退款
							</div>
						</router-link>
					</div>

				</div>

				<div id="tool">
					<div class="title">
						<div class="spare"></div>
						<h3>基础工具</h3>
					</div>
					
					<ul class="tool-box">
						<!--<li v-for="item in plugins">
													<router-link :to="{ name:item.to,params:{selected:'1'},query:{i:toi}}"><img :src="item.icon" />
														<br>{{item.name}}</router-link>
												</li>-->
						<li>
							<router-link :to="fun.getUrl('collection',{selected:'1'})">
								<div class="img">
									<img src="../../assets/images/tool-a.png">
								</div>
								</router-link>
								<div>收藏</div>
						</li>
						<li>
							<router-link :to="fun.getUrl('footprint',{selected:'1'})">
								<img src="../../assets/images/tool-b.png">
								</router-link>
								<div>足迹</div>
						</li>
						<li>
							<router-link :to="fun.getUrl('myEvaluation',{selected:'1'})">
								<img src="../../assets/images/tool-c.png">
								</router-link>
								<div>评论</div>
						</li>
						<li>
							<router-link :to="fun.getUrl('myRelationship',{selected:'1'})">
								<img src="../../assets/images/tool-d.png">
							</router-link>
							    <div>关系</div>
						</li>
						<li>      
							<router-link :to="fun.getUrl('address',{selected:'1'})">
								<img src="../../assets/images/tool-e.png">
							</router-link>
							<div>地址管理</div>
						</li>
						<li>
							<router-link :to="fun.getUrl('coupon',{selected:'1'})">
								<img src="../../assets/images/tool-f.png">
								</router-link>
								<div>优惠券</div>
						</li>
						<li @click="openQrCode('block')" v-if="relation_switch">

						      <img src="../../assets/images/tool-g.png">
                                <div>二维码</div>
						</li>
						<li v-if="isApp">
							<router-link :to="fun.getUrl('message',{selected:'1'})">
								<img src="../../assets/images/tool-h.png">
								<div>消息通知</div></router-link>
						</li>
					</ul>
				</div>

				<!-- <div style="height: 10px;clear: both;"></div>

					<template>
					    <yd-cell-group>
					        <yd-cell-item arrow>
					            <yd-icon slot="icon" name="order" size=".42rem"></yd-icon>
					            <span slot="left">我的订单</span>
					            <span slot="right">查看全部订单</span>
					        </yd-cell-item>

					        <yd-cell-item arrow>
					            <img slot="icon" src="http://static.ydcss.com/ydui/img/logo.png">
					            <span slot="left">图标</span>
					            <span slot="right">图标是image</span>
					        </yd-cell-item>
					    </yd-cell-group>
					</template> -->

				<div class="cart">
					<!--<router-link to="/member/marketing">
													<div class="list1" ><div class="ico marketing"></div>
														营销工具
														<i class="fa fa-angle-right" ></i></div>
												</router-link>-->
					<!--<router-link to=""><div class="list1" style="margin:0px;"><i class="iconfont icon-article"></i>我的消息<i class="fa fa-angle-right" style="color:#999; font-size:26px; float:right; line-height:44px;"></i></div></router-link>-->
					<router-link v-if='signs' :to="fun.getUrl('sign')"><!--is_sign -->
						<div class="list1" style="border:none">
						<yd-icon slot="icon" class="iconfont icon-member-clock1" custom size="1.625rem" color="#f15353" style="margin-right:0.375rem"></yd-icon>	
							<span slot="text">{{sign_name}}</span>
							<i class="fa fa-angle-right"></i>
						</div>
					</router-link>
					<!-- <router-link v-if="pluginsList.conference.enable" :to="fun.getUrl('conferenceList')">
						<div class="list1">
							<yd-icon slot="icon" class="icon-member-act-signup1" custom size="1.625rem" color="#f15353" style="margin-right:0.375rem"></yd-icon>
							<span slot="text">活动报名</span>
							<i class="fa fa-angle-right"></i>
						</div>
					</router-link> -->
					<router-link v-if="store_set && store_set.is_open_cashier==1" :to="fun.getUrl('cashier')">
						<div class="list1">
							<yd-icon slot="icon" class="icon-member-cashier" custom size="1.625rem" color="#f15353" style="margin-right:0.375rem"></yd-icon>
							<span slot="text">收银台</span>
							<i class="fa fa-angle-right"></i>
						</div>
					</router-link>
					<router-link :to="fun.getUrl('extension')" v-if="is_extension">
						<div class="list1">
							<yd-icon slot="icon" class="icon-member-extension1" custom size="1.625rem" color="#f15353" style="margin-right:0.375rem"></yd-icon>
							<span slot="text">我的推广</span>
							<i class="fa fa-angle-right"></i>
						</div>    
					</router-link>

					<router-link v-if="haveShop==1" :to="fun.getUrl('microShop_home')">
						<div class="list1">
							<yd-icon slot="icon" class="icon-member-mendian1" custom size="1.625rem" color="#f15353" style="margin-right:0.375rem"></yd-icon>
							<span slot="text">微店中心</span>
							<i class="fa fa-angle-right"></i>
						</div>
					</router-link>
					<router-link v-else-if="haveShop==0" :to="fun.getUrl('microShop_apply')">
						<div class="list1">
							<yd-icon slot="icon" class="icon-member-my-shop1" custom size="1.625rem" color="#f15353" style="margin-right:0.375rem"></yd-icon>
							<span slot="text">我要开店</span>
							<i class="fa fa-angle-right"></i>
						</div>
					</router-link>

					<!--<div id="service">
								<router-link :to= "fun.getUrl('service')">
									<div class="list1">
										<div class="ico extension"></div>我的服务
										<i class="fa fa-angle-right"></i></div>
								</router-link>
							</div>-->

					<div id="service" v-if="isELive">
						<router-link :to="fun.getUrl('lifeService')">
							<div class="list1">
								<yd-icon slot="icon" class="icon-member-life-pay1" custom size="1.625rem" color="#f15353" style="margin-right:0.375rem"></yd-icon>
								<span slot="text">生活缴费</span>
								<i class="fa fa-angle-right"></i>
							</div>
						</router-link>
					</div>

					<!-- <router-link :to="fun.getUrl('supplier')" v-if="pluginsList.supplier_apply.enable">
						<div class="list1">
							<yd-icon slot="icon" class="icon-member-apply1" custom size="1.625rem" color="#f15353" style="margin-right:0.375rem"></yd-icon>
							<span slot="text">{{supplier.value}}</span>
							<i class="fa fa-angle-right"></i>
						</div>
					</router-link> -->

					<router-link v-if="isLove" :to="fun.getUrl('love_index')">
						<div class="list1">
							<yd-icon slot="icon" class="icon-member-exchange1" custom size="1.625rem" color="#f15353" style="margin-right:0.375rem"></yd-icon>
							<span slot="text">{{love_name}}</span>
							<i class="fa fa-angle-right"></i>
						</div>
					</router-link>
					<router-link v-if="coin" :to="fun.getUrl('overseas_index')">
						<div class="list1">
							<yd-icon slot="icon" class="icon-member-currency1" custom size="1.625rem" color="#f15353" style="margin-right:0.375rem"></yd-icon>
							<span slot="text">{{coin_name}}</span>
							<i class="fa fa-angle-right"></i>
						</div>
					</router-link>

					<!-- <router-link v-if="pluginsList.store_apply.enable" :to="fun.getUrl('storeApply')">
						<div class="list1">
							<yd-icon slot="icon" class="icon-member-store-apply1" custom size="1.625rem" color="#f15353" style="margin-right:0.375rem"></yd-icon>
							<span slot="text">门店申请</span>
							<i class="fa fa-angle-right"></i>
						</div>
					</router-link> -->

					<!-- <router-link v-if="pluginsList.credit.enable" :to="fun.getUrl('creditInfo')">
						<div class="list1">
							<yd-icon slot="icon" class="icon-member-credit01" custom size="1.625rem" color="#f15353" style="margin-right:0.375rem"></yd-icon>
							<span slot="text">信用值</span>
							<i class="fa fa-angle-right"></i>
						</div>
					</router-link> -->

					<!-- <router-link v-if="pluginsList.ranking.enable" :to="fun.getUrl('rankingIndex')">
						<div class="list1">
							<yd-icon slot="icon" class="icon-member-bank-list1" custom size="1.625rem" color="#f15353" style="margin-right:0.375rem"></yd-icon>
							<span slot="text">排行榜</span>
							<i class="fa fa-angle-right"></i>
						</div>
					</router-link> -->
					<!-- <router-link v-if="pluginsList.article.enable" :to="fun.getUrl('notice',{id:'0'})">
						<div class="list1">
							<yd-icon slot="icon" class="icon-member-collect1" custom size="1.625rem" color="#f15353" style="margin-right:0.375rem"></yd-icon>
							<span slot="text">{{pluginsList.article.title}}</span>
							<i class="fa fa-angle-right"></i>
						</div>
					</router-link> -->
					<!-- <router-link v-if="pluginsList.clock_in.enable" :to="fun.getUrl('ClockPunch')">
						<div class="list1">
							<yd-icon slot="icon" class="icon-member-get-up" custom size="1.625rem" color="#f15353" style="margin-right:0.375rem"></yd-icon>
							<span slot="text">{{pluginsList.clock_in.title}}</span>
							<i class="fa fa-angle-right"></i>
						</div>
					</router-link> -->

					<!-- <router-link v-if="pluginsList.recharge_code.enable" :to="fun.getUrl('rechargeCode')">
						<div class="list1">
							<yd-icon slot="icon" class="icon-member-recharge1" custom size="1.625rem" color="#f15353" style="margin-right:0.375rem"></yd-icon>
							<span slot="text">充值码</span>
							<i class="fa fa-angle-right"></i>
						</div>
					</router-link>  -->
					<router-link v-if="is_stroeWithdraw" :to="fun.getUrl('storeManage')">
						<div class="list1">
							<yd-icon slot="icon" class="icon-member-cash1" custom size="1.625rem" color="#f15353" style="margin-right:0.375rem"></yd-icon>
							<span slot="text">门店管理</span>
							<i class="fa fa-angle-right"></i>
						</div>
					</router-link>

					<!-- <router-link v-if="pluginsList.video_demand.enable" :to="fun.getUrl('CourseManage')">
						<div class="list1">
							<yd-icon slot="icon" class="icon-member-course3" custom size="1.625rem" color="#f15353" style="margin-right:0.375rem"></yd-icon>
							<span slot="text">课程中心</span>
							<i class="fa fa-angle-right"></i>
						</div>
					</router-link> -->
					<router-link v-if="helps" :to="fun.getUrl('helpcenter')">
						<div class="list1">
							<yd-icon slot="icon" class="icon-member-help" custom size="1.625rem" color="#f15353" style="margin-right:0.375rem"></yd-icon>
							<span slot="text">{{help_name}}</span>
							<i class="fa fa-angle-right"></i>
						</div>
					</router-link>
					<router-link v-if="is_froze" :to="fun.getUrl('FrozenCoin')">
						<div class="list1">
							<yd-icon slot="icon" class="icon-member-frozen1" custom size="1.625rem" color="#f15353" style="margin-right:0.375rem"></yd-icon>
							<span slot="text">{{froze_name}}</span>
							<i class="fa fa-angle-right"></i>
						</div>
					</router-link>

					<div>
						<div class="list1" 	v-for="item in pluginsList" @click="pluginGoto(item)">
							<yd-icon slot="icon" :class="item.class" custom size="1.625rem" color="#f15353" style="margin-right:0.375rem"></yd-icon>
							<span slot="text">{{item.title}}</span>
							<i class="fa fa-angle-right"></i>
						</div>
					</div>


					


				

				<!-- <el-button type="success" @click="frozenCoin()">冻结币</el-button> -->
					<!-- <router-link :to="fun.getUrl('SupplierCenter')">
						<div class="list1">
							<yd-icon slot="icon" class="icon-member-supplier" custom size="1.25rem" color="#f15353" style="margin-right:6px"></yd-icon>
							<span slot="text">供应商管理</span>
							<i class="fa fa-angle-right"></i>
						</div>
					</router-link> -->
					<!--<router-link :to= "fun.getUrl('rentIndex')">
					>>>>>>> b4c7a576a544b0f0d41c76a862a815c179930c5f
											<div class="list1">
												<div class="ico extension"></div>租赁中心
												<i class="fa fa-angle-right"></i></div>
										</router-link>-->

					<!--<router-link to="/member/alipay">
													<div class="list1" ><div class="ico newsetting"></div>支付宝测试
														<i class="fa fa-angle-right" ></i></div>
												</router-link>-->
				</div>
				<div style="height: 1.25rem;clear: both;"></div>
				<mt-button type="primary" size="large" @click="outInfo($event)" v-if="myType==5">退出登录</mt-button>
				<div id="copyright">©{{copyright}}&nbsp;</div>

				<div style="height: 3.75rem;clear: both;"> </div>
				<!--<div slot="top" class="mint-loadmore-top">
												<span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
												<span v-show="topStatus === 'loading'">Loading...</span>
											</div>-->
			</div>
		</mt-loadmore>
		<div id="ewm" ref="hook" @click="openQrCode('none')">

			<div class="pic">

				<img :src="poster" alt="">

			</div>

		</div>
		<div id="jpg"></div>
	</div>
</template>

<script>
import member from "./membercontroller";
export default member;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/css/member.scss";
</style>
