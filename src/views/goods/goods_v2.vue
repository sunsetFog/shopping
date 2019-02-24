<template>
	<transition name="fade2">
		<div id="goods">
			<div id="hoid" @click="goto" :class="{hoet:hoet}" v-if="isCup">
				<div id="back">
					<i class="mintui mintui-back"></i>
				</div>
			</div>
			<div id="cart" @click="gotoCart" :class="{hoet:hoet}" v-if="isCup">
				<div id="back">
					<i class="iconfont icon-ai-home"></i>
				</div>
			</div>
			<div id="member" @click="gotoMember" :class="{hoet:hoet}" v-if="isCup">
				<div id="back">
					<!-- <i class="fa fa-user"></i> -->
					<i class="iconfont icon-wode-wode"></i>
				</div>
			</div>
			<c-myswipe style="height: 100vw;" :pagination-visible="true" :slides="goodsInfo.thumb_url" :repeating="true" :auto="0">
				<div v-for="(ithumb,index) in goodsInfo.thumb_url" :key="index">
					<template v-if='ithumb'>
						<img :src="ithumb" width="100%">
					</template>
					<template v-if='!ithumb'>
						<img src="../../assets/images/img_default.png" width="100%">
					</template>
				</div>
			</c-myswipe>
			<div class="rob-time" v-if="isBuy && isTime">
				<div class="img"><img src="../../assets/images/rob-time.png" width="16%;"></div>
				<ul class="price">
					<li class="text"><span>限时<br>购买</span></li>
					<!-- <li class="none-line"><small>￥</small><b>3.2</b>&nbsp;/天</li>
					<li class="middle-line"><small>￥</small><b>3.2</b>&nbsp;/天</li> -->
				</ul>
				<div class="time">
					<span class="text">截至倒计时：</span>
					<yd-countdown slot="right" :time="endTimeStr" class="bottom" >
						<em style="padding:0.125rem;border-radius:0.125rem;">{%d1}<em>{%d2}</em></em>天
						<em style="padding:0.125rem;border-radius:0.125rem;">{%h1}<em>{%h2}</em></em><b>:</b>
						<em style="padding:0.125rem;border-radius:0.125rem;">{%m1}<em>{%m2}</em></em><b>:</b>
						<em style="padding:0.125rem;border-radius:0.125rem;">{%s1}<em>{%s2}</em></em>
					</yd-countdown>
				</div>
			</div>

			<el-row>
				<div class="info-box">
					<div class="title-box">
					<h1 style="-webkit-box-orient:vertical;">{{goodsInfo.title}}</h1>
					<i class="iconfont icon-erweima" @click="postShow()"></i>
					<i class="iconfont icon-fenxiang" @click="shareWeixin()"></i>
					</div>
					<h2>
						<el-col :span="24" id='price' v-if="!isGoodsLove">￥
							<span id="price-num">{{(goodsInfo.has_option==1?goodsInfo.min_price==goodsInfo.max_price?goodsInfo.max_price:goodsInfo.min_price+"-"+goodsInfo.max_price:goodsInfo.price)}}</span>
						</el-col>
					</h2>
					
				</div>
			</el-row>

			<el-row>
				<!-- <el-col :span="24" id='price' v-if="!isGoodsLove">￥
					<span id="price-num">{{(goodsInfo.has_option==1?goodsInfo.min_price+"-"+goodsInfo.max_price:goodsInfo.price)}}</span>
				</el-col> -->

				

				<el-col :span="24" id='price' style="background: #fff;" v-if="isGoodsLove">
					<el-col :span="5" style="background: #f15353;padding: 0.125rem 0.25rem;color: #fff;border-radius:0.1875rem;">
						<div id="price-num" style="font-size: 0.8rem;font-weight: 600;text-align: center;">天天兑价</div>
						<div id="price-num" style="font-size: 0.8rem;font-weight: 600;text-align: center;">￥{{goodsInfo.price}}<span v-if="isRent">/天</span></div>
					</el-col>

					<el-col :span="19" class="sale" style="text-align:left;padding-left:0.625rem;">
						<div id="price-num" style="font-size: 0.8rem;font-weight: 600;text-align: left;">￥{{goods_love_cash+" + "+goods_love_deduction+goods_love_name}}</div>
						<div id="price-num" style="font-size: 0.8rem;font-weight: 600;text-align: left;color:#000">
							原价:￥{{goodsInfo.price}}
							<span v-if="isRent">/天</span>
							<i class="iconfont icon-rent" style="font-size:1rem;color:#FF9500" v-if="(isRent && isRight)"></i>
						</div>
					</el-col>
				</el-col>

				<el-col :span="24" id='stockcontainer'>
						<el-col :span="12">库存:{{goodsInfo.stock}}</el-col>
						<el-col :span="12" class="sale">{{isRent?"租赁次数":"销量"}}:{{goodsInfo.show_sales}}</el-col>
				</el-col>

			</el-row>

			<div v-if="!this.fun.isTextEmpty(goodsInfo.has_one_brand)">
				<div class="brand" @click="toBrandDetail(goodsInfo.has_one_brand.id)" v-if="isCup">
					<ul class="logo">
						<li>
							<yd-icon class="iconfont icon-pinpai" custom size="1rem" color="#f15353"></yd-icon>
							<span>品牌简介</span>
						</li>
						<li class="return"><i class="fa fa-angle-right"></i></li>
					</ul>
				</div>
			</div>

			

			<div v-if="!isRent">
				<div class="member-box" v-if="!is_o2o&&isGoods&&goodsInfo.has_option!=1" @click="buyNow">
					<span id="optiondiv">{{(goodsCount>0)?"已添加"+goodsCount+goodsInfo.sku:"请选择商品数量"}}</span>
					<i class="fa fa-angle-right"></i>
				</div>
			</div>

			
			
			
			<div class="act-box">
				<div v-if="isCup">
					<ul class="coupon" @click="gotoCoupon" v-if="goodsInfo.availability==1?true:false">
						<li class="">领券</li>
						<li><span>优惠券</span></li>
						<i class="fa fa-angle-right"></i>
					</ul>
				</div>
				
				<ul class="vip" v-if="!this.fun.isTextEmpty(goodsInfo.member_discount)">
					<li><span>会员</span></li>
					<li class="grade"><span>{{goodsInfo.member_discount.level_name}}</span></li>
					<li>会员专享价<span>￥{{goodsInfo.member_discount.discount_value}}</span><span v-if="isRent">/天</span></li>
				</ul>
				<ul class="act" @click="activityShowFun" v-if="activitySwitch">
					<li class="act1">活动</li>
					<li class="act2"><span >{{firstActivityBtn}}</span></li>
					<li class="act3"><span>{{firstActivityCon}}</span></li>
					<i class="fa fa-angle-right"></i>
				</ul>
			</div>
				


			<mt-popup v-model="popupSpecs" position="bottom" class="mint-popup-4" closeOnClickModal='true'>
				<div class="specifications">
					<div class="shopimg">
						<div id="chooser_img">
							<img :src="popThumb == null || popThumb == '' || popThumb == undefined?goodsInfo.thumb:popThumb">
						</div>
						<div class="right">
							<div class="price">￥
								<span id="option_price">{{popPrice}}</span><span v-if="isRent">/天</span>
							</div>
							<div class="option">库存{{popStock}}{{goodsInfo.sku}}</div>
							<div class="option">{{goodsDescription}}</div>
						</div>
					</div>

					<div class="shopinfo">
						<dl v-for="specs in goodsInfo.has_many_specs">
							<dt>{{specs.title}}</dt>
							<dd>
								<el-radio-group v-model="specs.description" size='small' fill='#f15353' @change="selectSpecs">
									<el-radio-button :disabled=specitem.c v-for="specitem in specs.specitem" :label="specitem">{{specitem.title}}</el-radio-button>
								</el-radio-group>
							</dd>
						</dl>

					</div>
					<div v-if="!isRent">
						<el-row>
							<el-col :span="12" id='num'>购买数量：</el-col>
							<el-col :span="11">
								<div class="num">

									<div class="leftnav" @click='reduceGoods'>-</div>
									<!-- <input type="text" disabled=false class="shownum" v-model='goodsCount'> -->
									<input type="number" class="shownum" v-model.lazy='goodsCount'>
									<div class="rightnav" @click='addGoods'>+</div>
									<!-- <input type="number" class="shownum" v-model.lazy='goodsCount'> -->
								</div>
							</el-col>
						</el-row>
					</div>
					<el-button size='small' id='btsmall' type='danger' @click="submitAction">确认</el-button>
				</div>
			</mt-popup>

			<mt-popup v-model="popupSpecs2" position="bottom" class="mint-popup-4" closeOnClickModal='true'>
				<div class="specifications">
					<div class="shopimg">
						<div id="chooser_img">
							<img :src="popThumb">
						</div>
						<div class="right">
							<div class="price">￥
								<span id="option_price">{{popPrice}}</span><span v-if="isRent">/天</span>
							</div>
							<div class="option">库存{{popStock}}{{goodsInfo.sku}}</div>
							<div class="option">{{goodsDescription}}</div>
						</div>
					</div>
					
					<div v-if="!isRent">
						<el-row>
							<el-col :span="12" id='num'>购买数量：</el-col>
							<el-col :span="11">
								<div class="num">

									<div class="leftnav" @click='reduceGoods'>-</div>
									<!-- <input type="text" disabled=false class="shownum" v-model='goodsCount'> -->
									<input type="number" class="shownum" v-model.lazy='goodsCount' >
									<div class="rightnav" @click='addGoods'>+</div>

									<!-- <input type="number" class="shownum" v-model.lazy='goodsCount' > -->
								</div>
							</el-col>
						</el-row>
					</div>
					<el-button size='small' id='btsmall' type='danger' @click="buyNowNew">确认</el-button>
				</div>
			</mt-popup>

			<mt-popup v-model="posterShow" closeOnClickModal='true' style="width:20.9375rem;height:30.3125rem;padding:0rem;">
				<div style="width:100%;overflow:hidden;">
					<!-- <img :src="posterImg" style="width:100%;height:100%;"/> -->

					<img v-lazy="posterImg" v-if='posterImg'  style="width:100%;border-radius:0.375rem;"/>
					<img src="../../assets/images/img_default.png" v-if='!posterImg' style="width:100%;height:100%;border-radius:0.375rem;"/>
					
				</div>
			</mt-popup>

			
			 <yd-popup v-model="activityShow" position="bottom" width="70%">
				<yd-navbar title="活动" height="2.5rem" fontsize="14px" fixed>
				<span slot="right">
					<!-- <yd-navbar-back-icon @click.native="activityShow = false"></yd-navbar-back-icon> -->
					<i class="iconfont icon-guanbi" style="color:#666;size:1.25rem;" @click="activityShow = false"></i>
				</span>
				</yd-navbar>
				<div style="clear:both;margin-top:2.5rem;">
					<yd-cell-group>
						<yd-cell-item v-if="activityItem.ed_full==0 && activityItem.ed_reduction==0?false:true">
							<div slot="left" style="border-radius:0.1875rem;border:0.0625rem solid #f15353;color:#f15353;padding:0.125rem 0.625rem;font-size:12px;">满减</div>
							<span slot="right">本商品满<span style="color:#df1e13;">￥{{activityItem.ed_full}}</span>立减<span style="color:#df1e13;">￥{{activityItem.ed_reduction}}</span></span>
						</yd-cell-item>
						<yd-cell-item v-if="activityItem.ed_money==0 && activityItem.ed_num==0?false:true">
							<div slot="left" style="border-radius:0.1875rem;border:0.0625rem solid #f15353;color:#f15353;padding:0.125rem 0.625rem;font-size:12px;">包邮</div>
							<span slot="right"><span v-if="activityItem.ed_money==0?false:true"><span>本商品满<span style="color:#df1e13;">￥{{activityItem.ed_money}}</span>包邮</span></br></span><span v-if="activityItem.ed_num==0?false:true">本商品满<span style="color:#df1e13;">{{activityItem.ed_num}}件</span>包邮</span></span>
						</yd-cell-item>
						<yd-cell-item v-if="activityItem.point==0 && activityItem.max_point_deduct==0?false:true">
							<div slot="left" style="border-radius:0.1875rem;border:0.0625rem solid #f15353;color:#f15353;padding:0.125rem 0.625rem;font-size:12px;">{{activityItem.point_name}}</div>
							<span slot="right"><span>最高抵扣<span style="color:#df1e13;">{{activityItem.max_point_deduct}}</span>{{activityItem.point_name}}</span><br><span> 购买赠送<span style="color:#df1e13;">{{activityItem.point}}</span>{{activityItem.point_name}}</span></span>
            			</yd-cell-item>
						<yd-cell-item v-if="activityItem.award_proportion==0 && activityItem.deduction_proportion==0?false:true">
							<div slot="left" style="border-radius:0.1875rem;border:0.0625rem solid #f15353;color:#f15353;padding:0.125rem 0.625rem;font-size:12px;">{{activityItem.love_name}}</div>
							<span slot="right"><span>最高抵扣<span style="color:#df1e13;">{{activityItem.deduction_proportion}}</span>{{activityItem.love_name}}</span><br><span> 购买赠送<span style="color:#df1e13;">{{activityItem.award_proportion}}</span>{{activityItem.love_name}}</span></span>
            			</yd-cell-item>
						<yd-cell-item v-if="activityItem.coupon==0?false:true">
							<div slot="left" style="border-radius:0.1875rem;border:0.0625rem solid #f15353;color:#f15353;padding:0.125rem 0.625rem;font-size:12px;">购买返券</div>
							<span slot="right">商品订单完成赠送优惠券</span>
						</yd-cell-item>

						<yd-cell-item v-if="activityItem.award_balance==0?false:true">
							<div slot="left" style="border-radius:0.1875rem;border:0.0625rem solid #E85151;color:#f15353;padding:0.125rem 0.625rem;font-size:12px;">余额</div>
							<span slot="right">购买赠送<span style="color:#df1e13;">{{activityItem.award_balance}}</span>余额</span>
						</yd-cell-item>

        			</yd-cell-group>

				</div>
				
			</yd-popup>

			


			<div v-if="isCup"><div v-if="isRent"><div class="but" v-if="isRentBuyShow" @click="toRentBuy(goodsInfo.lease_toy.immed_goods_id)"><button>立即</br>购买</button></div></div></div>

			<div id="foot">
				<div class="addfav" :class="{'nocar':!isGoods}" type="info"  v-if="!is_o2o">
					<template v-if="!favorite">
						<i class="fa fa-star normal" @click="onFavorite(favorite)"></i>
						收藏
						</i>
					</template>
					<template v-if="favorite">
						<i class="fa fa-star active" @click="onFavorite(favorite)"></i>
						收藏
						</i>
					</template>
				</div>
				<div v-if="isCup" class="addfav">
					<div  type="info" v-if="!is_o2o">
						<template>
							<i class="fa fa-cart-plus active" @click="gotoCart1()" ></i>
							购物车
							</i>
						</template>
					</div>
				</div>
				<div class="addfav"  v-if="!is_o2o&&cservice">
					<a :href="cservice">
						<i class="iconfont icon-kefu" style="font-size:1rem;"></i>客服</a>
				</div>
				<div :class="{'cart':true,'cell':true,'nocar':!isGoods||!isAddCart}" @click="addCart" v-if="isCup">加入购物车</div>
				<div v-if="!isRent" class="buy cell">
					<div :class="{'nocar':!isGoods}" v-if="!is_o2o" @click="buyNow">立即购买</div>
				</div>

				<div v-if="isRent && !isCup" class="buy cell">
					<div :class="{'nocar':!isGoods}" v-if="!is_o2o" @click="buyNow">立即租</div>
				</div>
			</div>

			<!-- <div style="height: 10px;"></div> -->
			<div id="shopInfo" ref='goodinfo' :class="{goodTop:goodTop==true,bottomMargin:isMarginBottom}" >
				<div id="tabs">
					<el-tabs v-model="activeName" @tab-click="handleClick">
						<el-tab-pane label="商品介绍" name="first">
							<div id="goods_content" v-html='first_content'></div>
						</el-tab-pane>
						<el-tab-pane label="商品参数" name="second">
							<div class="parameter" v-for="item in second_content">
								<div class="par-info">
									<span class="name">{{item.title}}</span>
									<span class="value">{{item.value}}</span>
								</div>
							</div>
						</el-tab-pane>
						<el-tab-pane label="用户评价" name="third">
							<div>
								<div class="pj" v-for="n in third_content">
									<div layout="row" layout-align="start center" id="user">
										<div>
											<img :src="n.head_img_url" />
										</div>
										<div>{{n.nick_name}}</div>
										<div>{{n.created_at}}</div>
									</div>
									<el-rate v-model="n.level" disabled show-text text-color="#ff9900" text-template="{value}">
									</el-rate>
									<p>{{n.content}}</p>

									<div v-if="n.append">
										<p class="last_day">追评
											<span>{{n.append.created_at}}</span>
										</p>
										<p class="">{{n.append.content}}</p>
									</div>

									<div class="comment" v-if="isCup">
										<span @click='toContentInfo(n)'>评论数:{{n.reply_count}}</span>
									</div>
								</div>
							</div>

						</el-tab-pane>
					</el-tabs>
				</div>
				
			</div>

			<!-- <div :class="{bottomMargin:isMarginBottom}"></div> -->
			
			<div class="like-list" v-if="this.fun.isTextEmpty(goodsInfo.show_push)?false:true">
				<div class="box06">
					<div class="img"><img src="../../assets/images/goods-like01.png"></div>
					<h3 class="like">猜你喜欢</h3>
				</div>
				<!-- <div class="like-box">
					<div style="float:left;text-align:center;width:20%;margin-left:2.5%;margin-right:2.5%;margin-top:10px;" v-for="item in goodsInfo.show_push" @click="pushGoodGoto(item)">
						<div style="width:100%;height:68px;">
							<img :src="item.thumb" style="width:100%;height:100%;">
						</div>
						<div style="width:100%;"><span style="margin-top:6px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:100%;height:20px;display:block;">{{item.title}}</span></div>
						<span style="color:#f15353;margin-top:6px;">￥{{item.price}}</span>
						
					</div>
				</div> -->
				<div class="like-box" >
					<div class="box" v-for="item in goodsInfo.show_push" @click="pushGoodGoto(item)">
						<div class="goods-img">
							<img :src="item.thumb" style="width:100%;height:100%;">
						</div>
						<ul style="goods-info">
							<li class="name"><span>{{item.title}}</span></li>
							<li class="pay">
								<span class="left"><small>￥</small>{{item.price}}</span>
								<span class="right"><small>￥</small>{{item.price}}</span>
							</li>
						</ul>
						
						
					</div>
				</div>


				<div class="cloud">
					<div class="img"><img src="../../assets/images/cloud.png"></div>
					<h4>没有更多了</h4>
				</div>
			</div>
			<div style="height:3.125rem;"></div>
			

			<div style="height: 0;" v-if="this.fun.isTextEmpty(goodsInfo.show_push)?false:true"></div>

			<div style="height: 3.125rem;" v-if="this.fun.isTextEmpty(goodsInfo.show_push)"></div>



		</div>

	</transition>
</template>

<script>
	import goods from './goods_controller';
	export default goods;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	@import '../../assets/css/goods.scss'
</style>
