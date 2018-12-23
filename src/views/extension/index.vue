<template xmlns="http://www.w3.org/1999/html">
	<div id="income">
		<c-title :hide="true" text='我的推广'></c-title>
		<!-- <div class="myextension" v-if="!is_agent">
				<div class="banner">
					<img :src="info_img" v-if="!(info_img=='' ||info_img==undefined||info_img==null)">
					<img src="../../assets/images/myextension.png" v-if="(info_img=='' ||info_img==undefined||info_img==null)">
				</div>
				<div class="main">
					推广条件1   申请  
					<div class="welcome" v-if="becomeType_1">
						<div class="text">
							<p>欢迎加入
								<span>{{become_1_info_2}}</span>，请填写申请信息</p>
							<p>邀请人：
								<span>{{become_1_info_1}}</span>&nbsp;请核实</p>
						</div>
						<div class="info">
							<input type="text" v-model="para_name" placeholder="请填写真实姓名" class="inp">
							<input type="number" v-model="para_phone" placeholder="请填写手机号码方便联系" class="inp">
							<input type="submit" @click="become_1_click" value="申请推广" class="btn">
							提交后跳转至success页面（同无条件申请）
						</div>
					</div>
					推广条件2   消费达到N次 
					<div class="welcome" v-if="becomeType_2">
						<div class="text">
							<p>本店累计消费满
								<span>{{become_2_info_1}}</span> 次， 才可开启&lt;{{become_2_info_3}}&gt;推广中心，您已消费
								<span>{{become_2_info_2}}</span> 次，请继续努力</p>
						</div>
						<div class="info">
							<div class="btn" @click="become_2_click">
								点击跳转指定商品列表页面
								<i class="fa fa-shopping-cart"></i> 继续去购物
							</div>
						</div>
					</div>
					推广条件3   消费达到N元 
					<div class="welcome" v-if="becomeType_3">
						<div class="text">
							<p>本店累计消费满
								<span>{{become_3_info_1}}</span>元， 才可开启&lt;{{become_3_info_3}}&gt;推广中心，您已消费
								<span>{{become_3_info_2}}</span> 元，请继续努力</p>
						</div>
						<div class="info">
							<div class="btn" @click="become_3_click">
								点击跳转指定商品列表页面
								<i class="fa fa-shopping-cart"></i> 继续去购物
							</div>
						</div>
					</div>
					推广条件4     购买指定商品
					<div class="welcome" v-if="becomeType_4">
						<div class="text">
							<p>本店需购买商品
								<span>【{{become_4_info_1}}】</span>
								可以点击跳转指定商品页面
								才可开启&lt;{{become_4_info_2}}&gt;推广中心，请现在去购买吧！
							</p>
						</div>
						<div class="info">
							<div class="btn" @click="become_4_click(become_4_info_3)">
								点击跳转指定商品页面
								<i class="fa fa-shopping-cart"></i> 现在去购买
							</div>
						</div>
					</div>
					<div class="vip_main" v-if="!isCheck">
						<div class="title">推广特权</div>
						<div class="vip vip1">
							<div class="ico1">
								<i class="fa fa-qrcode"></i>
							</div>
							<div class="text">
								<div class="t1">专属二维码</div>
								<div class="t2">拥有专属推广二维码，用于推广客户；</div>
							</div>
						</div>
						<div class="vip">
							<div class="ico2">
								<i class="fa fa-cny"></i>
							</div>
							<div class="text">
								<div class="t1">推广收入</div>
								<div class="t2">推广的客户购买商品后，您将获得相应的推广收入；</div>
							</div>
						</div>
					</div>
				</div>
				1：无条件展示     2：申请后展示
				<div class="success" v-if="isCheck">
					<div class="ico">
						<i class="fa fa-check"></i>
					</div>
					<div class="text">您的申请已经提交，请等待审核！</div>
					<a @click="isCheck_click()">
						<div class="sub">去商城逛逛</div>
					</a>
				</div>
			</div> -->
		<!-- <div v-if="is_agent">
			<div class="header">
				<div class="back">
					<i class="mintui mintui-back" v-if="false" @click="goback"></i>
				</div>
				<div class="user">
					<div class="user-head">
						<img :src="userAvatar">
					</div>
					<div class="user-info">
						<div class="user-name">{{userName}}</div>
						<div class="user-other" style="font-weight:bold;font-size:.9rem;">[会员ID:{{vipId}}]</div>
						<div class="user-other">[{{level}}]
						</div>
					</div>
				</div>
			</div>
			<h4>推广收入
				<span id="pricerg">
					<font color="red"><b><small>￥</small>{{total_income}}</b></font>&nbsp;</span>
			</h4>
			插件模版
			<div style="clear:both;"></div>
			<div class="plug-box">
				<router-link class="plug-left" :to="fun.getUrl('distribution',{})" v-if="unCommissionShow && isCommissionShow">
					<ul>
						<li class="icon"><i class="iconfont icon-fenxiao01"></i></li>
						<li class="text">
							<span class="top">{{commission_title}}</span>
							<span>￥{{commission_income}}</span>
						</li>
					</ul>
				</router-link>
				<router-link class="plug-right" :to="fun.getUrl(isAreaDividendShow?'regionalAgencyCenter':'applyRegionalAgency',{})" v-if="unAreaDividendShow && isAreaDividendShow">
					<ul>
						<li class="icon"><i class="iconfont icon-quyu01"></i></li>
						<li class="text">
							<span class="top">{{area_dividend_title}}</span>
							<span>￥{{area_dividend_income}}</span>
						</li>
					</ul>
				</router-link>
				<router-link class="plug-left" :to="fun.getUrl(isTeamDividendShow?'teamAgentCenter':'',{})" v-if="unTeamDividendShow && isTeamDividendShow">
					<ul>
						<li class="icon"><i class="iconfont icon-team-bonus"></i></li>
						<li class="text">
							<span class="top">{{team_dividend_title}}</span>
							<span>￥{{team_dividend_income}}</span>
						</li>
					</ul>
				</router-link>
				<router-link class="plug-right" :to="fun.getUrl(isMerchantShow?'enterprise_index':'',{})" v-if="unMerchantShow && isMerchantShow">
					<ul>
						<li class="icon"><i class="iconfont icon-zhaoshang01"></i></li>
						<li class="text">
							<span class="top">{{merchant_title}}</span>
							<span>￥{{merchant_income}}</span>
						</li>
					</ul>
				</router-link>
				<router-link class="plug-left" :to="fun.getUrl(isMicroShow?'microShop_ShopKeeperCenter':'',{})" v-if="unMicroShow && isMicroShow">
					<ul>
						<li class="icon"><i class="iconfont icon-weidian01"></i></li>
						<li class="text">
							<span class="top">{{micro_title}}</span>
							<span>￥{{micro_income}}</span>
						</li>
					</ul>
				</router-link>
				<router-link class="plug-right" :to="fun.getUrl(isSingleReturnShow?'single_return_center':'',{})" v-if="unSingleReturnShow && isSingleReturnShow">
					<ul>
						<li class="icon"><i class="iconfont icon-dingdan01"></i></li>
						<li class="text">
							<span class="top">{{singleReturn_title}}</span>
							<span>￥{{singleReturn_income}}</span>
						</li>
					</ul>
				</router-link>
				<router-link class="plug-left" :to="fun.getUrl(isTeamLevelReturnShow?'teamlevel_return_center':'',{})" v-if="unTeamLevelReturnShow && isTeamLevelReturnShow">
					<ul>
						<li class="icon"><i class="iconfont icon-team-return"></i></li>
						<li class="text">
							<span class="top">{{teamLevelReturn_title}}</span>
							<span>￥{{teamLevelReturn_income}}</span>
						</li>
					</ul>
				</router-link>
				<router-link class="plug-right" :to="fun.getUrl(isConsumeReturnShow?'consume_return_center':'',{})" v-if="unConsumeReturnShow && isConsumeReturnShow">
					<ul>
						<li class="icon"><i class="iconfont icon-xiaofei01"></i></li>
						<li class="text">
							<span class="top">{{consumeReturn_title}}</span>
							<span>￥{{consumeReturn_income}}</span>
						</li>
					</ul>
				</router-link>
				<router-link class="plug-left" :to="fun.getUrl(isFullReturnShow?'full_return_center':'',{})" v-if="unFullReturnShow && isFullReturnShow">
					<ul>
						<li class="icon"><i class="iconfont icon-mane01"></i></li>
						<li class="text">
							<span class="top">{{fullReturn_title}}</span>
							<span>￥{{fullReturn_income}}</span>
						</li>
					</ul>
				</router-link>
				<router-link class="plug-right" :to="fun.getUrl(isShareholderDividend?'shareholder_dividend':'',{})" v-if="unShareholderDividend && isShareholderDividend">
					<ul>
						<li class="icon"><i class="iconfont icon-gudong01"></i></li>
						<li class="text">
							<span class="top">{{shareholderDividend_title}}</span>
							<span>￥{{shareholderDividend_income}}</span>
						</li>
					</ul>
				</router-link>
				<router-link class="plug-left" :to="fun.getUrl(islevelReturn?'level_return':'',{})" v-if="unlevelReturn && islevelReturn">
					<ul>
						<li class="icon"><i class="iconfont icon-dengji01"></i></li>
						<li class="text">
							<span class="top">{{levelReturn_title}}</span>
							<span>￥{{levelReturn_income}}</span>
						</li>
					</ul>
				</router-link>
				<router-link class="plug-right" :to="fun.getUrl(isFixedReward?'fixedReward':'',{})" v-if="unFixedReward && isFixedReward">
					<ul>
						<li class="icon"><i class="iconfont icon-Medal01"></i></li>
						<li class="text">
							<span class="top">{{fixedReward_title}}</span>
							<span>￥{{fixedReward_income}}</span>
						</li>
					</ul>
				</router-link>
				<router-link class="plug-left" :to="fun.getUrl(isClockIn?'ClockPunch':'',{})" v-if="unClockIn && isClockIn">
					<ul>
						<li class="icon"><i class="iconfont icon-daka01"></i></li>
						<li class="text">
							<span class="top">{{clockIn_title}}</span>
							<span>￥{{clockIn_income}}</span>
						</li>
					</ul>
				</router-link>
				<router-link class="plug-right" :to="fun.getUrl(isVideoDemand?'courseIncome':'',{})" v-if="unVideoDemand && isVideoDemand">
					<ul>
						<li class="icon"><i class="iconfont icon-lecturer01"></i></li>
						<li class="text">
							<span class="top">{{videoDemand_title}}</span>
							<span>￥{{videoDemand_income}}</span>
						</li>
					</ul>
				</router-link>
			</div>
			<div style="clear:both;"></div>
			<div class="more-extension">
				<div class="spare"></div>
				<span id="pricerg">更多推广权限</span>
			</div>
			<h3>更多推广权限</h3>
			<template>
					<yd-grids-group :rows="2">
						<yd-grids-item :link="fun.getUrl('distribution',{})" v-if="unCommissionShow && !isCommissionShow">
							<yd-icon slot="icon" class="icon-fenxiao01" custom size="24px" color="#FF685D"></yd-icon>
							<span slot="text">{{commission_title}}
																		<font>￥{{commission_income}}</font>元</span>
						</yd-grids-item>
						<yd-grids-item :link="fun.getUrl(isAreaDividendShow?'regionalAgencyCenter':'applyRegionalAgency',{})" v-if="unAreaDividendShow && !isAreaDividendShow">
							<yd-icon slot="icon" class="icon-quyu01" custom size="24px" color="#FF685D"></yd-icon>
							<span slot="text">{{area_dividend_title}}
																		<font>￥{{area_dividend_income}}</font>元</span>
						</yd-grids-item>
						<yd-grids-item :link="fun.getUrl(isTeamDividendShow?'teamAgentCenter':'',{})" v-if="unTeamDividendShow && !isTeamDividendShow">
							<yd-icon slot="icon" class="icon-team-bonus" custom size="24px" color="#FF685D"></yd-icon>
							<span slot="text">{{team_dividend_title}}
																		<font>￥{{team_dividend_income}}</font>元</span>
						</yd-grids-item>
						<yd-grids-item :link="fun.getUrl(isMerchantShow?'':'enterprise_apply',{})" v-if="unMerchantShow && !isMerchantShow">
							<yd-icon slot="icon" class="icon-zhaoshang01" custom size="24px" color="#FF685D"></yd-icon>
							<span slot="text">{{merchant_title}}
																		<font>￥{{merchant_income}}</font>元</span>
						</yd-grids-item>
						<yd-grids-item :link="fun.getUrl(isMicroShow?'':'microShop_apply',{})" v-if="unMicroShow && !isMicroShow">
							<yd-icon slot="icon" class="icon-weidian01" custom size="24px" color="#FF685D"></yd-icon>
							<span slot="text">{{micro_title}}
																		<font>￥{{micro_income}}</font>元</span>
						</yd-grids-item>
						<yd-grids-item :link="fun.getUrl(isSingleReturnShow?'':'single_return_center',{})" v-if="unSingleReturnShow && !isSingleReturnShow">
							<yd-icon slot="icon" class="icon-dingdan01" custom size="24px" color="#FF685D"></yd-icon>
							<span slot="text">{{singleReturn_title}}
																		<font>￥{{singleReturn_income}}</font>元</span>
						</yd-grids-item>
						<yd-grids-item :link="fun.getUrl(isTeamLevelReturnShow?'':'teamlevel_return_center',{})" v-if="unTeamLevelReturnShow && !isTeamLevelReturnShow">
							<yd-icon slot="icon" class="icon-team-return" custom size="24px" color="#FF685D"></yd-icon>
							<span slot="text">{{teamLevelReturn_title}}
																		<font>￥{{teamLevelReturn_income}}</font>元</span>
						</yd-grids-item>
						<yd-grids-item :link="fun.getUrl(isConsumeReturnShow?'':'consume_return_center',{})" v-if="unConsumeReturnShow && !isConsumeReturnShow">
							<yd-icon slot="icon" class="icon-xiaofei01" custom size="24px" color="#FF685D"></yd-icon>
							<span slot="text">{{consumeReturn_title}}
																		<font>￥{{consumeReturn_income}}</font>元</span>
						</yd-grids-item>
						<yd-grids-item :link="fun.getUrl(isFullReturnShow?'':'full_return_center',{})" v-if="unFullReturnShow && !isFullReturnShow">
							<yd-icon slot="icon" class="icon-mane01" custom size="24px" color="#FF685D"></yd-icon>
							<span slot="text">{{fullReturn_title}}
																		<font>￥{{fullReturn_income}}</font>元</span>
						</yd-grids-item>
						<yd-grids-item :link="fun.getUrl(isShareholderDividend?'':'shareholder_dividend',{})" v-if="unShareholderDividend && !isShareholderDividend">
							<yd-icon slot="icon" class="icon-gudong01" custom size="24px" color="#FF685D"></yd-icon>
							<span slot="text">{{shareholderDividend_title}}
																		<font>￥{{shareholderDividend_income}}</font>元</span>
						</yd-grids-item>
						<yd-grids-item :link="fun.getUrl(islevelReturn?'':'level_return',{})" v-if="unlevelReturn && !islevelReturn">
							<yd-icon slot="icon" class="icon-dengji01" custom size="24px" color="#FF685D"></yd-icon>
							<span slot="text">{{levelReturn_title}}
																		<font>￥{{levelReturn_income}}</font>元</span>
						</yd-grids-item>
						<yd-grids-item :link="fun.getUrl(isFixedReward?'':'fixedReward',{})" v-if="unFixedReward && !isFixedReward">
							<yd-icon slot="icon" class="icon-Medal01" custom size="24px" color="#FF685D"></yd-icon>
							<span slot="text">{{fixedReward_title}}
																		<font>￥{{fixedReward_income}}</font>元</span>
						</yd-grids-item>
						<yd-grids-item :link="fun.getUrl(isClockIn?'':'ClockPunch',{})" v-if="unClockIn && !isClockIn">
							<yd-icon slot="icon" class="icon-daqia01" custom size="24px" color="#FF685D"></yd-icon>
							<span slot="text">{{clockIn_title}}
																		<font>￥{{clockIn_income}}</font>元</span>
						</yd-grids-item>
						<yd-grids-item :link="fun.getUrl(isVideoDemand?'':'courseIncome',{})" v-if="unVideoDemand && !isVideoDemand">
							<yd-icon slot="icon" class="icon-lecturer01" custom size="24px" color="#FF685D"></yd-icon>
							<span slot="text">{{videoDemand_title}}
																		<font>￥{{videoDemand_income}}</font>元</span>
						</yd-grids-item>
					</yd-grids-group>
			</template>
			<div class="more-income">
				<div class="spare"></div>
				<span>收入</span>
			</div>
			<div class="income-box">
				
					<div class="income-detail" @click="gotoDetail">
						<span>收入明细</span>
						<i class="fa fa-angle-right"></i>
					</div>
				
					<div class="income-cash" @click="gotoRecharge">
						<span>收入提现</span>
						<i class="fa fa-angle-right"></i>
					</div>
				
			</div>
		</div> -->
	<!-- 优化推广中心 -->
		<div id="extension-box">
			<div id="header">
				<div class="top">
					<div id="img">
						<img :src="userInfo.avatar" style="width:100%;height:100%;">
					</div>
					<ul id="info">
						<li id="name">{{userInfo.nickname}}</li>
						<li><span>[会员ID：{{userInfo.member_id}}]</span></li>
					</ul>
					<div class="share" @click="myIncome" v-if="shareShow">
						<i class="iconfont icon-income-my"></i>
						<span>收入分享</span>
					</div>
				</div>
				
				<!-- <ul class="bottom">
					<li @click="gotoIncome">
						<yd-icon class="iconfont icon-income-cashb" custom size="1.5rem" color="#fff"></yd-icon>
						<span>收入提现</span>
					</li>
					<li @click="myIncome">
						<yd-icon class="iconfont icon-income-my" custom size="1.5rem" color="#fff"></yd-icon>
						<span>我的收入</span>
					</li>
				</ul> -->
	<!-- 我的弹窗 -->
				<!-- <div id="forward-btn" @click="gotoIncome">
					<yd-icon class="iconfont icon-tixian2" custom size="1.125rem" color="#fff"></yd-icon>
					<span>收入提现</span>
				</div> -->
				<div id="income">
					<ul>
						<li id="top">累计收入</li>
						<li><small>￥</small>{{userInfo.grand_total}}</li>
					</ul>
					<ul class="right">
						<li id="top">可提现收入</li>
						<li><small>￥</small>{{userInfo.usable_total}}</li>
					</ul>
					<div class="btn" @click="gotoIncome">
						<button type="button">去提现<i class="fa fa-angle-right"></i></button>
					</div>
				</div>	
			</div>
			
			<ul id="detail">
				<li  @click="gotoDetail">
					<span>收入明细</span>
					<i class="fa fa-angle-right"></i>
				</li>
				<li @click="gotoRecharge">
					<span>提现明细</span>
					<i class="fa fa-angle-right"></i>
				</li>
			</ul>

			<!-- 权限插件模版 -->
			<div id="power">
				<div id="title"><div id="spare"></div><h1>权限</h1></div>
					<div id="plugg">
						<div class="plug-list" v-for="item in extension" @click="gotoPage(item)">
							<ul>
								<li id="icon"><yd-icon class="iconfont" custom size="2.5rem" color="#f15353" :class="item.icon"></yd-icon></li>
								<li id="info">
									<div id="top"><span id="name">{{item.title}}</span>
									<!-- <span id="garde" v-if='item.level == null || item.level == "" || item.level == undefined ? false:true'>{{item.level}}</span> -->
									</div>	
									<div id="grade"><span v-if='item.level == null || item.level == "" || item.level == undefined ? false:true'>{{item.level}}</span></div>
									<div id="money"><small>￥</small>{{item.value}}</div>
								</li>
								
							</ul>
						</div>

						<!-- <el-row>
						<el-button type="primary" @click="nextPage()">排队奖励</el-button>
						</el-row> -->
						
					</div>
			</div>

			<!-- 更多权限插件模版 -->

			<div id="more-power">
				<div id="title"><div id="spare"></div><h1>更多权限</h1></div>
				
					<div id="plugg">
							<div class="plug-list" v-for="item in unextension" @click="gotoPage(item)">
								<ul>
									<li id="icon"><yd-icon class="iconfont" custom size="2.5rem" color="#f15353" :class="item.icon"></yd-icon></li>
									<li id="info">
										<div id="top"><span id="name">{{item.title}}</span></div>	
										<div id="money"><small>￥</small>{{item.value}}</div>
									</li>
								</ul>
							</div>
					</div>
			</div>


		</div>

	<!--  结束优化-->
	<div style="height:6.25rem"></div>
	</div>
</template>

<script>
	import index_controller from "./index_controller";
	export default index_controller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
	@font-face {
		font-family: "iconfont";
		/* project id 432132 */
		src: url("//at.alicdn.com/t/font_432132_vo5ucd8n7xbhuxr.eot");
		src: url("//at.alicdn.com/t/font_432132_vo5ucd8n7xbhuxr.eot?#iefix") format("embedded-opentype"), url("//at.alicdn.com/t/font_432132_vo5ucd8n7xbhuxr.woff") format("woff"), url("//at.alicdn.com/t/font_432132_vo5ucd8n7xbhuxr.ttf") format("truetype"), url("//at.alicdn.com/t/font_432132_vo5ucd8n7xbhuxr.svg#iconfont") format("svg");
	}
	#income {
		#extension-box {
			#header {
				background-color: #f15353;
				.top{
					background-color: #f15353;
					padding: 1.25rem;
					display: flex;
					position: relative;
					align-items: center;
				}
				#img {
					width: 3.75rem;
					height: 3.75rem;
					border-radius: 1.875rem;
					border: solid 0.125rem #fff;
					overflow: hidden;
				}
				#info {
					margin-left: 0.625rem;
					color: #fff;
					font-size: 14px;
					text-align: left;
					#name {
						font-weight: bold;
						font-size: 18px;
						margin-bottom: 0.625rem;
					}
					span{
						padding:0.125rem 0.375rem;
						background-color: rgba(0, 0, 0, 0.2);
						border-radius: 1.25rem;
						font-size:12px;
					}
				}
				.share{
					position: absolute;
					right: 0.875rem;
					display: flex;
					background-color: rgba(255, 255, 255, 0.2);
					height:1.625rem;
					line-height: 1.625rem;
					border-radius: 0.8125rem;
					padding:0 0.625rem;
					color:#fff;
					i{
						color:#fff;
						line-height: 1.625rem;
						margin-right:0.375rem;
					}
				}
				.bottom{
					background-color: rgba(255, 255, 255, 0.3);
					display: flex;
					li{
						display: flex;
						width:50%;
						height:2.5rem;
						line-height: 2.5rem;
						border-right:solid 0.0625rem #f8acac;
						text-align: left;
						padding-left:1.25rem;
						color:#fff;
						font-size:14px;
						i{
							margin-right:0.5rem;
						}
					}
					li:last-child{
						border:none;
					}
				}
				#forward-btn {
					width: 6.25rem;
					height: 1.75rem;
					line-height: 1.75rem;
					background: rgba(255, 255, 255, 0.3);
					border-radius: 0.875rem;
					position: absolute;
					right: 1.25rem;
					color: #fff;
					span {
						font-size: 14px;
					}
				}
			}
			#income {
				border-radius: 1rem 1rem 0 0;
				background-color: #fff;
				color: #333;
				display: flex;
				padding: 0.875rem 0;
				.right{
					border-right:solid 1px #ebebeb;
				}
				ul {
					width: 36%;
					font-size: 14px;
					text-align: center;
					li{
						font-size:18px;
						line-height: 1.625rem;
						small {
							font-size: 12px;
						}
					}
					#top {
						font-size: 12px;
						color:#8c8c8c;
						
					}
					
				}
				.btn{
					width:24%;
					margin-top:0.875rem;
					text-align: right;
					button{
						display: flex;
						background-color: #f15353;
						border-radius: 0.8125rem;
						height:1.625rem;
						line-height: 1.625rem;
						padding:0 0.625rem;
						color:#fff;
						border:none;
						position: absolute;
						right:0.875rem;
						i{
							font-size:1.125rem;
							margin-left:0.375rem;
							line-height: 1.625rem;
						}
					}
				}
			}
			#detail {
				border-top: solid 0.0625rem #ebebeb;
				border-bottom: solid 0.0625rem #ebebeb;
				background-color: #fff;
				li {
					font-size: 14px;
					margin-left: 0.875rem;
					padding-right: 0.875rem;
					display: flex;
					justify-content: space-between;
					line-height: 2.5rem;
					border-top: solid 0.0625rem #ebebeb;
					i {
						line-height: 2.5rem;
						color: #c9c9c9;
						font-size: 24px;
					}
				}
				li:first-child {
					border: none;
				}
			}
			#power,
			#more-power {
				background-color: #fff;
				margin-top: 0.625rem;
				#title {
					border-bottom: solid 0.0625rem #ebebeb;
					line-height: 2.25rem;
					display: flex;
					padding: 0 0.875rem;
					#spare {
						width: 0.25rem;
						height: 0.875rem;
						background-color: #f15353;
						border-radius: 0.0625rem;
						margin-top: 0.6875rem;
						margin-right: 0.5rem;
					}
					h1 {
						font-size: 14px;
					}
				}
				#plugg {
					display: flex;
					flex-wrap: wrap;
					.plug-list {
						width: 50%;
						border-bottom: solid 0.0625rem #ebebeb;
						border-right: solid 0.0625rem #ebebeb;
					}
					.plug-list:nth-child(2n) {
						border-right: none;
					}
				}
				ul {
					display: flex;
					padding:0.875rem 0.625rem;
					#info {
						width: 100%;
						text-align: left;
						margin-left: 0.375rem;
						position: relative;
						#top {
							display: flex;
							justify-content: space-between;
							font-size: 14px;
							line-height:1.5rem;
							#name {
								white-space: nowrap;
								overflow: hidden;
								text-overflow: ellipsis;
							}
							#right {
								flex: 1;
								text-align: right;
							}
							
						}
						#grade{
							height:1rem;
							span{
								background-color:#ebebeb;
								color:#999;
								border-radius:0.1875rem;
								padding:0 0.375rem;
							}
						}
						#money {
							color: #f15353;
							font-size: 18px;
							height:1.5rem;
							line-height: 1.5rem;
							small {
								font-size: 12px;
							}
						}
					}
				}
				ul:nth-child(2n) {
					border-right: none;
				}
			}
		}
		.more-income {
			height: 2.25rem;
			line-height: 2.25rem;
			padding: 0 0.875rem;
			text-align: left;
			border-bottom: solid 0.0625rem #e2e2e2;
			display: flex;
			align-items: flex-start;
			font-size: 14px;
			.spare {
				width: 0.25rem;
				height: 1rem;
				background-color: #f15353;
				border-radius: 0.0625rem;
				margin-right: 0.375rem;
				margin-top: 0.5625rem;
			}
			span {
				font-weight: bold;
				font-size: 14px;
			}
		}
		.income-box {
			background-color: #fff;
			padding-left: 0.9375rem;
			font-size: 15px;
			border-bottom: solid 0.0625rem #e2e2e2;
			i {
				line-height: 2.75rem;
				font-size: 24px;
				color: #c9c9c9;
			}
			.income-detail {
				height: 2.75rem;
				line-height: 2.75rem;
				padding-right: 0.9375rem;
				border-bottom: solid 0.0625rem #e2e2e2;
				display: flex;
				justify-content: space-between;
			}
			.income-cash {
				height: 2.75rem;
				line-height: 2.75rem;
				padding-right: 0.9375rem;
				display: flex;
				justify-content: space-between;
			}
		}
		.plug-box {
			box-sizing: content-box;
			a {
				width: 50%;
				float: left;
				display: block;
				background-color: #fff;
				padding: 1rem 0.75rem;
				border-bottom: solid 0.0625rem #e2e2e2;
				.icon {
					i {
						font-size: 24px;
						color: #f15353;
					}
				}
				.text {
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
					text-align: center;
					overflow: hidden;
					margin-top: 0.625rem;
					font-size: 12px;
					ul {
						padding: 0 0.625rem;
						li {
							line-height: 1.25rem;
						}
					}
				}
			}
			a:nth-of-type(odd) {
				border-right: solid 0.0625rem #e2e2e2;
			} // display: flex;
			// flex-wrap:wrap;
			// .plug-left,.plug-right{
			// 	width:50%;
			// 	background-color: #fff;
			// 	padding:16px 12px;
			// 	border-bottom:solid 1px #e2e2e2;
			// 	.icon{
			// 		i{
			// 		font-size:24px;
			// 		color:#f15353;
			// 		}
			// 	}
			// 	.text{
			// 		text-overflow: ellipsis;
			// 		overflow: hidden;
			// 		white-space: nowrap;
			// 		text-align:center;
			// 		overflow: hidden;
			// 		margin-top:10px;
			// 		ul{
			// 			padding:0 10px;
			// 		li{
			// 			line-height: 20px;
			// 		}
			// 		}
			// 	}
			// }
			// .plug-left{
			// 	border-right:solid 1px #e2e2e2;
			// }
		}
		.header {
			height: auto;
			background: #f15353;
			background-size: 100% 100%;
			padding: 1.25rem;
			position: relative;
		}
		.header .user {
			display: flex;
		}
		.header .user .user-head {
			box-sizing: content-box;
			height: 3rem;
			width: 3rem;
			background: #fff;
			border-radius: 50%;
			border: 0.125rem solid #fff;
		}
		.header .user .user-head img {
			height: 3rem;
			width: 3rem;
			border-radius: 50%;
		}
		.header .user .user-info {
			margin-left: 1rem;
			text-align: left;
			width: 100%;
			color: #fff;
		}
		.header .user .user-info .user-name {
			font-size: 14px;
			font-weight: bold;
		}
		.header .user .user-info .user-other {
			width: auto;
			font-size: 12px;
		}
		.header .user-gold {
			height: 2.1875rem;
			width: 94%;
			padding: 0.3125rem 3%;
			border-bottom: 0.0625rem solid #e3e3e3;
			background: #fff;
			font-size: 12px;
			line-height: 2.1875rem;
		}
		.header .user-gold .title {
			height: 2.1875rem;
			width: auto;
			float: left;
			color: #666;
		}
		.header .user-gold .num {
			height: 2.1875rem;
			width: auto;
			float: left;
			color: #f90;
		}
		.header .user-gold .draw {
			width: 5rem;
			height: 1.875rem;
			background: #6c9;
			float: right;
		}
		.header .user .set {
			position: absolute;
			right: 0.625rem;
			top: 0.625rem;
			color: #fff;
			font-size: 14px;
		}
		.header .user-op {
			height: 2.1875rem;
			width: 94%;
			padding: 0.3125rem 3%;
			border-bottom: 0.0625rem solid #e2e2e2;
			background: #fff;
			font-size: 12px;
			line-height: 2.1875rem;
		}
		h3 {
			background: #fff;
			margin: 0.625rem 0 0;
			font-weight: normal;
			font-size: 14px;
			height: 2.5rem;
			box-sizing: border-box;
			line-height: 2.5rem;
			color: #f15353;
			border-bottom: 0.0625rem solid #e2e2e2;
			span {
				color: #999;
			}
		}
		.more-extension {
			height: 2.25rem;
			line-height: 2.25rem;
			padding: 0 0.875rem;
			text-align: left;
			border-bottom: solid 0.0625rem #e2e2e2;
			display: flex;
			align-items: flex-start;
			font-size: 14px;
			.spare {
				width: 0.25rem;
				height: 1rem;
				background-color: #f15353;
				border-radius: 0.0625rem;
				margin-right: 0.375rem;
				margin-top: 0.5625rem;
			}
			span {
				font-weight: bold;
				font-size: 14px;
			}
		}
		h4 {
			background: #f5f5f5;
			text-align: left;
			font-weight: normal;
			font-size: 14px;
			height: 2.25rem;
			box-sizing: border-box;
			line-height: 2.25rem;
			color: #333;
			border-bottom: 0.0625rem solid #e2e2e2;
			padding: 0 0.9375rem;
			span {
				color: #999;
			}
		}
		#gongge {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			align-items: center;
			justify-content: space-between;
			background: #fff;
			column-count: 3;
			padding: 0.625rem 0;
			margin-bottom: 0.625rem;
			li {
				flex: 33%;
				padding: 0 0.625rem;
				border: 0.0625rem solid #e2e2e2;
				margin: 0.1875rem;
				border-radius: 0.3125rem;
				i {
					font-size: 34px;
					color: #eb3943;
					margin: 0.625rem 0;
				}
				a {
					color: #333;
					font-size: 14px;
					img {
						width: 1.4375rem;
						margin: 0.3125rem 0;
					}
					font {
						color: #e84e40;
						font-size: 12px;
						padding-top: 0.3125rem;
					}
				}
			}
		}
		#un-gongge {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: space-between;
			background: #fff;
			column-count: 3;
			padding: 0.625rem 0;
			li {
				flex: 25%;
				padding: 0 0.625rem;
				i {
					font-size: 34px;
					margin: 0.9375rem 0;
				}
				a {
					color: #333;
					font-size: 12px;
					img {
						width: 1.4375rem;
						margin: 0.3125rem 0;
					}
					font {
						color: #e84e40;
						font-size: 12px;
						padding-top: 0.3125rem;
					}
				}
			}
		}
		#pricerg {
			text-align: right;
			float: right;
			font {
				color: #f15353;
				font-size: 16px;
			}
		}
		.mszf {
			background: #fff;
			padding: 0 0.625rem;
			margin: 0;
			text-align: left;
			overflow: hidden;
			margin-top: 0.625rem;
			height: 2.75rem;
			box-sizing: border-box;
			line-height: 2.75rem;
			font-size: 14px;
			color: #333;
			i {
				font-size: 17px;
				float: right;
				line-height: 2.75rem;
				color: #999;
			}
			span {
				float: left;
			}
			a {
				color: #000000;
				display: block;
			}
		}
	}
	a {
		text-decoration: none;
		color: #222;
	}
	input {
		border-width: 0;
	}
	.myextension .banner img {
		width: 100%;
	}
	.myextension .main {
		position: relative;
		top: -0.25rem;
	}
	.welcome {
		padding: 0.625rem;
		background: #ffffff;
		.text {
			p {
				font-size: 12px;
				color: #666;
				line-height: 1.2rem;
				span {
					color: #f55955;
				}
			}
		}
		.info {
			margin-top: 0.625rem;
			input {
				display: block;
				margin-bottom: 0.5rem;
				width: 100%;
				height: 2rem;
				border-radius: 0.3125rem;
				padding: 0 0.3125rem;
				box-sizing: border-box;
				outline: none;
			}
			.inp {
				border: 0.0625rem solid #e2e2e2;
			}
			.inp:focus {
				border-color: #f55955;
				box-sizing: border-box;
			}
			span {
				color: #f55955;
			}
			.btn {
				background: #f55955;
				color: #ffffff;
				margin-bottom: 0.5rem;
				width: 100%;
				height: 2rem;
				border-radius: 0.3125rem;
				padding: 0 0.3125rem;
				box-sizing: border-box;
				text-align: center;
				font-size: 12px;
				line-height: 2rem;
				i {
					display: inline-block;
				}
			}
			.btn:focus {
				background: #d8403c;
			}
		}
	}
	.myextension .main .vip_main {
		background: #ffffff;
		margin: 0.9375rem 0;
		.title {
			padding: 0.625rem;
			font-size: 12px;
			border-bottom: 0.0625rem solid #e2e2e2;
			text-align: center;
		}
		.vip {
			padding: 0.9375rem 0.625rem;
			overflow: hidden;
			font-size: 12px;
			color: #999;
			.ico1,
			.ico2 {
				width: 15%;
				float: left;
			}
			.ico1 {
				i {
					background: #32cd32;
				}
			}
			.ico2 {
				i {
					background: #fece00;
				}
			}
			.text {
				float: left;
				width: 85%;
				.t1 {
					font-size: 16px;
					color: #333;
					margin-bottom: 0.3125rem;
					text-align: left;
				}
				.t2 {
					text-align: justify;
				}
			}
			i {
				background: #32cd32;
				height: 2.25rem;
				width: 2.25rem;
				border-radius: 1.125rem;
				color: #fff;
				text-align: center;
				line-height: 2.375rem;
				font-size: 20px;
			}
		}
		.vip1 {
			border-bottom: 0.0625rem solid #e2e2e2;
		}
	}
	.myextension .success {
		height: 12.5rem;
		padding-top: 4.0625rem;
		background: #ffffff;
		.ico {
			height: 4.0625rem;
			width: 4.0625rem;
			margin: auto;
			border: 0.1875rem solid #32cd32;
			border-radius: 4rem;
			color: #32cd32;
			font-size: 36px;
			text-align: center;
			line-height: 4rem;
		}
		.text {
			height: 2rem;
			margin-top: 1.875rem;
			color: #666;
			line-height: 1.6rem;
			text-align: center;
		}
		a .sub {
			height: 2rem;
			width: 80%;
			background: #f55955;
			margin: 1.25rem auto;
			border-radius: 2rem;
			color: #fff;
			line-height: 2rem;
			text-align: center;
			font-size: 14px;
			margin-bottom: 1.25rem;
		}
		a .sub:focus {
			background: #d8403c;
		}
	}
</style>
