<template>
	<div class="cart">
		<c-title :hide="false" text='购物车'></c-title>
		<div style="height:40px;"></div>
		<el-tabs v-model="tabActive">
			<el-tab-pane label="租赁" name="rent" v-if="isRentTab">
				<!-- <div class="hint-info" v-if="isShowListRent">
					<yd-icon class="iconfont icon-tishi" custom size="18px" color="#f15353"></yd-icon>
					<span>您可以免费租两件会员玩具</span>
					<yd-icon class="iconfont icon-guanbi" custom size="14px" color="#d9d9d9" style="position: absolute;;right:14px;"></yd-icon>
				</div> -->
				<div class="rent-box">
					<div class="edit" @click="onRentCartDelete" v-if="isShowListRent">
						<i class="fa fa-pencil-square-o"></i>
						<span>{{!rentDelete?'编辑':'完成'}}</span>
					</div>
					<div v-if="isShowListRent" class="rent_main">
						<el-checkbox-group v-model="rentCheckList" @change="rentAllSelectHandle">
							<div class="rent-one" v-for="item in rentGoods">
								<el-checkbox :label="item" @change="selectGood">&nbsp;</el-checkbox>
								<div class="info-box">
									<div class="img" @click="toRentDetail(item)"><img :src="item.goods.thumb"></div>
									<div class="info">
										<h1 @click="toRentDetail(item)" style="-webkit-box-orient: vertical;">{{item.goods.title}}</h1>
										<ul class="day">
											<li><small>￥</small><b>{{item.goods.price}}</b>&nbsp;<small>/天</small></li>
											<li v-if="item.has_one_lease_goods.is_rights == 1 ?true:false"><i class="iconfont icon-rent"></i></li>
										</ul>
										<div class="bottom">
											<ul class="member">
												<li>吊牌价：￥{{item.goods.market_price}}元</li>	
											</ul>
											<div class="num">
												
												<div class="leftnav" @click='rentDeleteNumber(item)'>-</div>
												<input type="text" disabled=false class="shownum" v-model='item.total'>
												<div class="rightnav" @click='rentAddNumber(item)'>+</div>
											</div>
										</div>
										
									</div>
								</div>
							</div>
						</el-checkbox-group>
						<div class="recommend-box" v-if="!(this.fun.isTextEmpty(hotRentList))">
							<h1>近期热租</h1>
							<div class="line"></div>
							<h2>看看其他宝宝都再想什么</h2>
						</div>
						<div class="box" v-if="!(this.fun.isTextEmpty(hotRentList))">
							<div class="left" v-for="item in hotRentList" @click="gotoHotRentDetail(item.id)">
								<div class="goods-box">
									<div class="img"><img :src="item.thumb" lazy="loaded"></div>
									<div class="text">
										<span><small>￥</small>{{item.price}}<small>/天起</small></span>
										<ul>
											<li>吊牌价：￥{{item.market_price}}元</li>
											<!-- <li>{{item.age}}岁</li> -->
										</ul>
									</div>
								</div>
							</div>
						</div>
						<div class="cart_pay" v-show='!rentDelete'>
							<div class="all" sel="1">
								<div class="checkall">
									<el-checkbox label="全选" @change="rentAllSelect" v-model="rentCheckAll" :checked="rentCheckAll"></el-checkbox>
								</div>
							</div>
							
							<ul class="text">
								<li class="freight"><span style="color:#999; font-size:12px;">(不含运费)</span></li>
								<li>合计：<span style="font-size:14px;color:#f15353">￥</span><span class="totalprice">{{rentTotal}}</span></li>
							</ul>
							<div class="paysub " @click="rentSubmitGoods">结算<small class="total" style="font-size:14px">({{rentCount}})</small></div>
						</div>
					</div>
				</div>
				<!--合计  -->
				<div class="cart_del" v-show='rentDelete'>
					<div class="checkall">
						<el-checkbox @change="rentAllSelect" v-model="rentCheckAll" :checked=rentCheckAll label="全选"></el-checkbox>
					</div>
					<span @click='rentDeleteGoods'>删除</span>
				</div>
				<div id="nocard" v-if='!isShowListRent'>
					<div class="card_no"><i class="fa fa-shopping-cart" style="font-size:6.25rem;"></i>
						<br><span style="line-height:1.125rem; font-size:16px;">购物车快饿瘪了</span>
						<br>主人快去给我找点东西吧</div>
					<div class="card_no_menu">
						<router-link :to="fun.getUrl('member',{})">
							<div class="card_no_nav">个人中心</div>
						</router-link>
						<router-link :to="fun.getUrl('home',{})">
							<div class="card_no_nav">去逛逛</div>
						</router-link>
					</div>
				</div>
			</el-tab-pane>
			<el-tab-pane label="购买" name="pay" v-if="isPayTab">
				<div id="edit" @click="onCartDelete" v-if="isShowList">
					<i class="fa fa-pencil-square-o"></i>
					<p>{{!cartDelete?'编辑':'完成'}}</p>
				</div>
				<div class="cart_main" v-if='isShowList'>
					<el-checkbox-group v-model="checkList" @change="allSelectHandle">
						<div class="cart_good" v-for="(good,index) in goods" v-if="good.goods">
							<div class="ico" v-show='edit'>
								<i class="fa fa-trash-o"></i>
							</div>
								<el-checkbox :label="good" @change="selectGood">&nbsp;</el-checkbox>
							<div class="right">
								<div class="img" @click='toGoodsInfo(good)'><img :src="good.goods.thumb"></div>
								<div class="info">
									<ul class="inner">
										<h1 class="name" @click='toGoodsInfo(good)' style="-webkit-box-orient: vertical;">
											{{good.goods.title}}
										</h1>
										<li class="introduction">{{good.option_str}}</li>
									</ul>
									<div class="other">
										<div class="price">￥<span>{{good.goods.price}}</span></div>
										<div class="num">
											<!-- <div class="leftnav" @click.stop='deleteNumber(good)'>-</div>
											<input type="text" class="shownum" v-model='good.total'>
											<div class="rightnav" @click.stop='addNumber(good)'>+</div> -->
											<div class="leftnav" @click.stop='numberLeft(index)'>-</div>
											<input type="number" class="shownum" v-model.lazy='good.total' @blur="changeCount(good.id,good.total,index)">
											<div class="rightnav" @click.stop='numberRight(index)'>+</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</el-checkbox-group>
					<div class="cart_pay" v-show='!cartDelete'>
						<div class="all" sel="1">
							<div class="checkall">
								<el-checkbox @change="allSelect" v-model="checkAll" :checked=checkAll label="全选"></el-checkbox>
								<span class="t"></span>
							</div>
						</div>
						<ul class="text">
							<li class="freight"><span style="color:#999; font-size:12px;">(不含运费)</span></li>
							<li>合计：<span style="font-size:14px;color:#f15353;">￥</span><span class="totalprice">{{total}}</span></li>
						</ul>
						<div class="paysub " @click="submitGoods">结算<small class="total">({{count}})</small></div>
					</div>
				</div>
				<div class="cart_del" v-show='cartDelete'>
					<div class="checkall">
						<!--<el-checkbox-group v-model="checkList">
																		<el-checkbox label="全选"></el-checkbox>
																	</el-checkbox-group>-->
						<el-checkbox @change="allSelect" v-model="checkAll" :checked=checkAll label="全选"></el-checkbox>
					</div>
					<span @click='deleteGoods'>删除</span>
				</div>
				<div id="nocard" v-if='!isShowList'>
					<div class="card_no"><i class="fa fa-shopping-cart" style="font-size:6.25rem;"></i>
						<br><span style="line-height:1.125rem; font-size:16px;">购物车快饿瘪了</span>
						<br>主人快去给我找点东西吧</div>
					<div class="card_no_menu">
						<router-link :to="fun.getUrl('member',{})">
							<div class="card_no_nav">个人中心</div>
						</router-link>
						<router-link :to="fun.getUrl('home',{})">
							<div class="card_no_nav">去逛逛</div>
						</router-link>
					</div>
				</div>
			</el-tab-pane>
		</el-tabs>
		<!-- <div id="nocard" v-if='isRentTab==false && isPayTab==false'>
							<div class="card_no"><i class="fa fa-shopping-cart" style="font-size:100px;"></i>
								<br><span style="line-height:18px; font-size:16px;">购物车快饿瘪了</span>
								<br>主人快去给我找点东西吧</div>
							<div class="card_no_menu">
								<router-link :to="fun.getUrl('member',{})">
									<div class="card_no_nav">个人中心</div>
								</router-link>
								<router-link :to="fun.getUrl('home',{})">
									<div class="card_no_nav">去逛逛</div>
								</router-link>
							</div>
						</div> -->
		<!-- <div class="cart_del" v-show='cartDelete'>
								<div class="checkall">
									<el-checkbox @change="allSelect" v-model="checkAll" :checked=checkAll label="全选"></el-checkbox>
								</div>
								<span @click='deleteGoods'>删除</span>
							</div> -->
	</div>
</template>

<script>
	import cart from './cart_controller';
	export default cart;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
	@import '../../assets/css/cart.scss'
</style>