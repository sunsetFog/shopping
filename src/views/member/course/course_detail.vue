<template>
	<div id="course">
		<c-title :hide="false" text='课程详情'></c-title>
		<div class="spare"></div>
		<div>
			<div class="box01" v-if="is_show">
				<ul class="title" style="padding-top:1.25rem;">
					<li style="margin-bottom:0.625rem;">{{goodTit}}</li>
					<li>售价¥ {{goodPrice}}</li>
				</ul>
				<div class="watch" @click="study()" v-if="isLook"><span style="line-height:1.875rem;color:white;">立即观看</span> </div>
				<div class="watch" @click="buy()" v-if="!isLook"><span style="line-height:1.875rem;color:white;">立即购买</span> </div>
			</div>
			<div class="box-con" v-if="is_vshow">
				<iframe :src="vedioSrc" frameborder="0" allowfullscreen height="200" width="100%">
										</iframe>
			</div>
		</div>
		<div class="course-title">
			<h1>课程名称：<span>{{goodTit}}</span></h1>
		</div>
		<!-- <div class="box02">
			<div style="font-size:15px;line-height:2.25rem;margin-left:0.75rem;margin-right:0.75rem;">
				<span style="text-align:left;font-weight:bold;">目录摘要</span><span style="margin-left:0.25rem;">共{{chapterNum}}节</span>
			</div>
			<div style="width:calc(100% - 0.75rem);height:0.0625rem;background-color:#ebebeb;margin-left:0.75rem;"></div>
			<ul style="margin-left:0.75rem;margin-right:0.75rem;font-size:14px;padding-top:0.625rem;padding-bottom:0.625rem;">
				<li style="line-height:2.25rem;" v-for="(item,index) in chapterList" @click="viewPermission(item.id,index,item.video_address,item.course_id,item.is_audition)">
					<yd-icon slot="icon" class="icon-bofang" custom size="1.25rem" :class='{iconBofang:index==active}'></yd-icon>
					<span :class="{iconword:index==active}">第{{index+1}}节&nbsp;&nbsp;{{item.chapter_name}}</span><span slot="right" style="color:green" v-if="item.is_audition==0?false:true">【免费试听】</span>
				</li>
			</ul>
		</div> -->
		<div class="box03">
			<div class="left">
				<div class="touxiang">
					<img :src="teacherImg" style="width:100%;height:100%;border-radius:1.5rem;">
				</div>
				<ul style="float:left;">
					<li style="font-size:15px;margin-bottom:0.5rem;color:#f15353;">主讲</li>
					<li>{{teacherName}}</li>
				</ul>
			</div>
			<div class="anniu">
				<div @click="moneyShow" v-if="rewardBtnShow">
					<yd-button class="button">
						<span class="dashang">打赏</span></yd-button>
					<yd-icon slot="icon" class="icon-giftfill" color="#ffcd00" custom size="1.25rem" style="position:relative;left:-3.4375rem;top:0.125rem;"></yd-icon>
				</div>
			</div>
			<div class="clearfix"></div>
		</div>
		<!-- // -->
		<div id="tabs">
			<el-tabs v-model="tabActive">
				<el-tab-pane label="目录" name="first">
					<div class="box02">
						<!-- <div style="font-size:15px;line-height:2.25rem;margin-left:0.75rem;margin-right:0.75rem;">
							<span style="text-align:left;font-weight:bold;">目录摘要</span><span style="margin-left:0.25rem;">共{{chapterNum}}节</span>
						</div> -->
						<div style="width:calc(100% - 0.75rem);height:0.0625rem;background-color:#ebebeb;margin-left:0.75rem;"></div>
						<ul style="margin-left:0.75rem;margin-right:0.75rem;font-size:14px;padding-top:0.625rem;padding-bottom:0.625rem;">
							<li style="line-height:2.25rem;" v-for="(item,index) in chapterList" @click="viewPermission(item.id,index,item.video_address,item.course_id,item.is_audition)">
								<yd-icon slot="icon" class="icon-bofang" custom size="1.25rem" :class='{iconBofang:index==active}'></yd-icon>
								<span :class="{iconword:index==active}">第{{index+1}}节&nbsp;&nbsp;{{item.chapter_name}}</span><span slot="right" style="color:green" v-if="item.is_audition==0?false:true">【免费试听】</span>
							</li>
						</ul>
					</div>
				</el-tab-pane>
				<el-tab-pane label="课程介绍" name="second">
					<div class="box04" v-if="contentShow">
						<!-- <div class="jieshao">课程介绍</div> -->
						<div style="width:100%;height:0.0625rem;background-color:rgba(178, 178, 178, 0.5);"></div>
						<p style="margin-right:0.75rem;margin-top:0.625rem;" v-html="goodsContent">
						</p>
					</div>
				</el-tab-pane>
			</el-tabs>
		</div>
		<!-- // -->
		<!-- <div class="box04" v-if="contentShow">
			<div class="jieshao">课程介绍</div>
			<div style="width:100%;height:0.0625rem;background-color:rgba(178, 178, 178, 0.5);"></div>
			<p style="margin-right:0.75rem;margin-top:0.625rem;" v-html="goodsContent">
			</p>
		</div> -->
		<div v-if="pushShow" style="margin-bottom:3.125rem;background:#fff;">
			<div class="box06">
				<div class="like">猜你喜欢</div>
				<div style="width:100%;height:0.0625rem;background-color:rgba(178, 178, 178, 0.5);"></div>
			</div>
			<!-- <div class="like-box">
						<div style="float:left;text-align:center;width:20%;margin-left:2.5%;margin-right:2.5%;margin-top:10px;" v-for="item in pushGoodList" @click="pushGoodGoto(item)">
							<div style="width:100%;height:68px;">
								<img :src="item.thumb" style="width:100%;height:100%;">
							</div>
							<div style="width:100%;"><span style="margin-top:6px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:100%;height:20px;display:block;">{{item.title}}</span></div>
							<span style="color:#f15353;margin-top:6px;">￥{{item.price}}</span>
							
						</div>
					</div> -->
			<div class="like-box" v-for="item in pushGoodList" @click="pushGoodGoto(item)">
				<div style="margin-left:2.5%;margin-right:2.5%;margin-top:0.625rem;display:flex;">
					<div style="height:4.25rem;flex:1.1">
						<img :src="item.thumb" style="width:100%;height:100%;">
					</div>
					<div style="flex:5;margin-left:0.3125rem;">
						<div style="width:100%;float:left"><span style="margin-top:0.375rem;width:100%;display:block;word-wrap:break-word;overflow:hidden;">{{item.title}}</span></div>
						<span style="color:#f15353;margin-top:1.6875rem;float:right;">￥{{item.price}}</span>
					</div>
				</div>
			</div>
		</div>
		<div class="box05">
			<!-- <div style="flex:1;width:100%;" v-if="is_study">
						<yd-button type="primary" style="width:100%;height:44px;padding:0px;" @click.native="study">立即学习</yd-button>
					</div> -->
			<div class="my" @click="toMyCourse">
				<yd-icon class="iconfont icon-gerenzhongxin" custom size="1.125rem" color="#f7ba2a" style="display:block;margin:0.3125rem 0;"></yd-icon>
				我的
			</div>
			<div class="kefu" v-if="cservice">
				<a :href="cservice">
					<yd-icon class="iconfont icon-kefu" custom size="1.125rem" color="#b7b7b7" style="display:block;margin:0.3125rem 0;"></yd-icon>
					客服
				</a>
			</div>
			<div style="flex:3;" v-if="is_update" class="update" @click="update">
				<button type="danger" style="width:100%;">升级会员</button>
			</div>
			<div style="flex:3;" v-if="is_buy" class="buy" @click="buy">
				<button type="warning" style="width:100%;">单次购买</button>
			</div>
		</div>
		<yd-popup v-model="rewardShow" position="bottom" height="11rem">
			<yd-cell-group title="打赏金额" style="padding-top:0.3125rem;background-color:#f5f5f5;">
				<yd-cell-item>
					<span slot="left">¥&nbsp;</span>
					<yd-input slot="right" v-model="rewardMoney" required :show-success-icon="false" :show-error-icon="false" type="number" placeholder="请输入打赏金额"></yd-input>
				</yd-cell-item>
			</yd-cell-group>
			<yd-button-group>
				<yd-button type="primary" size="large" style="height:2.75rem;" @click.native="confirmReward">确定打赏</yd-button>
			</yd-button-group>
		</yd-popup>

		<!-- // -->
		<yd-popup v-model="rewardMoneyBtn" position="bottom" height="11rem">
			<yd-cell-group title="打赏金额" style="padding-top:0.3125rem;background-color:#f5f5f5;">
				<div style="margin:0.625rem 0.625rem 3.75rem 0.625rem;">
					<span style="display:block;float:left;width: 4rem;height: 2.25rem;border:0.0625rem solid #ff3824;border-radius:0.375rem;margin-right:0.625rem;line-height:2.25rem;" v-for="(item,index) in rewardArr" :class="{moneyActive:index == moneyActiveClass}" @click="chooseMoney(item.value,index)">{{item.name}}</span>
				</div>
			</yd-cell-group>
		
			
			<yd-button-group>
				<yd-button type="primary" size="large" style="height:2.75rem;" @click.native="confirmReward">确定打赏</yd-button>
			</yd-button-group>
		</yd-popup>

		<yd-actionsheet :items="actionSheetItems" v-model="actionSheetShow" cancel="取消" size="large"></yd-actionsheet>
	</div>
</template>

<script>
	import course_detail_controller from "./course_detail_controller";
	export default course_detail_controller;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
	#course {
		padding-bottom: 3.125rem;
	}
	.icon-bofang {
		color: #ccc;
	}
	.spare {
		width: 100%;
		height: 2.5rem;
	}
	.box01 {
		width: 100%;
		height: 12.5rem;
		background-color: green;
		padding-top: 1rem;
	}
	.course-title {
		line-height: 2.5rem;
		background-color: #fff;
		padding: 0 0.75rem;
		text-align: left;
		color: #333;
		margin-bottom: 0.625rem;
		h1 {
			text-overflow: ellipsis;
			font-size: 14px;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}
		span {
			font-weight: normal;
			color: #8c8c8c;
		}
	}
	.box02 {
		background-color: white;
		text-align: left;
	}
	.title {
		color: white;
	}
	.watch {
		width: 13.125rem;
		height: 1.875rem;
		background-color: orange;
		margin: 0 auto;
		border-radius: 0.25rem;
		margin-top: 1.25rem;
	}
	.box03 {
		width: 100%;
		background-color: white;
		padding: 1.5rem 0.75rem 1.5rem 0.75rem;
		margin-top: 0.625rem;
	}
	.left {
		float: left;
	}
	.touxiang {
		width: 3rem;
		height: 3rem;
		background-color: #333;
		border-radius: 1.5rem;
		float: left;
		margin-right: 0.625rem;
	}
	.clearfix {
		clear: both;
	}
	.anniu {
		float: right;
	}
	.button {
		width: 4rem;
		height: 2.25rem;
		background-color: #ff3824;
		border-radius: 0.375rem;
		margin-top: 0.375rem;
		margin-right: -1.25rem;
	}
	.dashang {
		margin-left: 1.875rem;
	}
	.box04 {
		width: 100%;
		background-color: white;
		margin-top: 0.5rem;
		padding-bottom: 1.875rem;
		padding-left: 0.75rem;
		text-align: left;
	}
	.box05 {
		position: fixed;
		bottom: 0;
		width: 100%;
		margin-top: 0.5rem;
		display: flex;
		.my {
			height: 3.0625rem;
			flex: 2;
			background-color: #fff;
			font-size: 12px;
			color: #333;
			span {
				width: 100%;
				display: inline-block;
			}
		}
		.kefu {
			height: 3.0625rem;
			flex: 2;
			background-color: #fff;
			font-size: 12px;
			color: #333;
			span {
				display: inline-block;
				width: 100%;
			}
		}
		.update {
			height: 3.0625rem;
			line-height: 3.0625rem;
			background-color: #ff9500;
			font-size: 15px;
			button {
				border: none;
				color: #fff;
			}
		}
		.buy {
			height: 3.0625rem;
			line-height: 3.0625rem;
			font-size: 15px;
			background-color: #dd2727;
			button {
				border: none;
				color: #fff;
			}
		}
	}
	.like {
		line-height: 2.25rem;
		font-size: 15px;
		text-align: left;
		margin-left: 5%;
	}
	.jieshao {
		line-height: 2.25rem;
		font-size: 15px;
		text-align: left;
	}
	.box06 {
		width: 100%;
		background-color: white;
		margin-top: 0.5rem;
	}
	.like-box {
		width: 100%;
		height: 4.6875rem;
		background-color: white;
		text-align: left;
		margin-bottom: 0.625rem;
	}
	.iconBofang {
		position: relative;
		top: 0.0625rem;
		color: #ff9600;
	}
	.iconword {
		color: #ff9600;
	}


	.moneyActive{
		background-color: #ff3824;
	}
</style>