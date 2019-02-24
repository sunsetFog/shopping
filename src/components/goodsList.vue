<template>
	<div id="goodslist">
		<!-- <h3><div class="title">{{text}}</div><div class="spas"></div></h3> -->
		<div class="mai">
			
			<div class="main" v-show='view'>			
				<dl v-for="item in goods" @click.stop.prevent="gotoDetail(item.goods_id)">	
					<!-- <router-link :to="fun.getUrl('goods',{ id: item.goods_id })"> -->
					<dt v-if="item.thumb"><img v-lazy="item.thumb" @click.stop.prevent="gotoDetail(item.goods_id)"/></dt>
					<dt v-if="!item.thumb"><img src="../assets/images/img_default.png"/></dt>
					<dd class="m-text" style="-webkit-box-orient: vertical;">{{item.title}}</dd>
					<dd class="s3"><p class="s1"><span :style="styleCon" class="s"><small>￥</small><em>{{item.price}}</em> </span><span class="s2">￥{{item.market_price}}</span> </p>
					</dd>
					<!-- </router-link> -->
				</dl>			
			</div>
			<div class="main2" v-show='view==false'>
					<div class="list" v-for="items in goods"  @click.stop.prevent="gotoDetail(items.goods_id)">
						<div class="imgs">
							<!-- <router-link :to="fun.getUrl('goods',{ id: items.goods_id })" v-if='items.thumb'><img v-lazy="items.thumb"/></router-link>
							<router-link :to="fun.getUrl('goods',{ id: items.goods_id })" v-if='!items.thumb'><img src="../assets/images/img_default.png"/></router-link> -->
							<img v-lazy="items.thumb" v-if='items.thumb' @click.stop.prevent="gotoDetail(item.goods_id)"/>
							<img src="../assets/images/img_default.png" v-if='!items.thumb'/>
						</div>
						<div class="shop_info">
							<ul>
								<!-- <h4><router-link :to="fun.getUrl('goods',{ id: items.goods_id })">{{items.title}}</router-link></h4>
								<span><router-link :to="fun.getUrl('goods',{ id: items.goods_id })">￥{{items.price}}</router-link></span>	 -->
								<li class="title">
									{{items.title}}</li>
								<li class="member"><small>￥</small>{{items.price}}</li>
							</ul>
						</div>
						
					</div>
				
			</div>	
		</div>

		<div class="loadNomore" v-show='loading'><img src="../assets/images/no-more-product.png"/></div>
	</div>
</template>

<script>
	import { Lazyload } from 'mint-ui';
	import { InfiniteScroll } from 'mint-ui';
	import { mapState } from 'vuex';
	export default {
		props: ['goods', 'text', 'loadMore','loading','disabledt','styleCon','jumpSo','storeId'],
		data() {
			return {
				list:[0],
				toi:this.fun.getKeyByI(),
				types:this.fun.getTyep(),
				// jumpSo: false,
            }
		},
		methods: {
			bgoo(){
				//this.$router.push({name:'goods',params:{id:8},query:{i:2}});
				this.$router.push(this.fun.getUrl('goods',{id:13}));
			},
			//跳转至详情
			gotoDetail(id){
				console.log('stateJump',this.jumpSo,this.storeId);
				if(this.jumpSo == true){
					this.$router.push(this.fun.getUrl('goodsO2O', { id: id,"tag":"o2o",store_id: this.storeId}));
				}else{
					
					$http.get("goods.goods.get-goods",{id:id},"加载中...").then(response =>{
					if(response.result == 1){
					    if(response.data.is_course == 1){
							console.log("goolist .......")
					        this.$router.push(this.fun.getUrl('CourseDetail',{goods_id:id}));
					    }else if(response.data.goods_type == 1){
							this.$router.push(this.fun.getUrl('goodsO2O', { id: id ,"tag":"o2o",store_id: response.data.store_id}));
					    }else{
							console.log("goolist .......")
							 this.$router.push(this.fun.getUrl('goods',{id:id}));
						}
					}
					}).catch(error =>{
						console.log(error);
					})
				}
				
			}
		},
		computed: mapState(["view"])
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	#goodslist {
		background: #f5f5f5;

		a{color: #2b2f33;}
		.main2{
			.list{
				display: -webkit-box;
				display: -webkit-flex;
				background: #ffffff;border-bottom:solid 0.0625rem #ebebeb;}
			.imgs{width:8rem;height:8rem;padding:0.375rem;box-sizing: border-box;   
			overflow: hidden;
					img {width: 100%;}
				}
			.shop_info{ 
				-webkit-box-flex: 1;
				-webkit-flex: 1;
						text-align: left;
						padding:0.625rem 0.75rem;
						ul{
							display: flex;
							justify-content: space-between;
							margin-bottom:0.625rem;
						}
				.title{font-size:14px;
				flex:3;
				 display: -webkit-box;
				 -webkit-box-orient: vertical;
				 -webkit-line-clamp:2;
				 overflow: hidden;
				 }
				.member{font-size:16px;color:#f15353;flex:1;
				text-align: right;margin-left:0.625rem;
				 a{color: #f23030; font-weight: bold;
				margin-top: 0.625rem;}}
			}
			
		}
		.loadNomore img{width: 20%;}
		h3 {
			width: 65%;
			position: relative;
			margin:0 auto 1.25rem;
			height: 1.25rem;
			padding: 0.625rem 0 0;
			.title {
				width: 33%;
				text-align: center;
				padding: 0 0.625rem;
				background: #F5F5F5;
				position: absolute;
				z-index: 9;
				left: 0;
				right: 0;
				margin: auto;
				font-size: 14px;
				color: #666;
			}
			.spas {
				border-bottom: 0.0625rem solid #d9d9d9;
				position: absolute;
				z-index: 5;
				top: 1.25rem;
				width: 100%;
			}
		}
		.mai {
			width: 100%;
			overflow: hidden;
		}
		.main {
			overflow: hidden;
			margin-right: -0.0625rem;
			background: #f5f5f5;

			dl:nth-child(2n){margin-right: 0}

			dl {
				padding: 0;
				/*border-bottom: 1px solid #f5f5f5;
				border-right: 1px solid #f5f5f5;*/
				box-sizing: border-box;
				-moz-box-sizing: border-box;
				-webkit-box-sizing: border-box;
				float: left;
				margin-bottom: 1.2vw;
				margin-right: 1.2vw;
				background: #fff;
				width: 49.4vw;

				dt{height: 50vw;line-height: 82vw;}
				dt{width:100%;
					height:0rem;
					padding-bottom:100%;
					position:relative;
				img {
					width: 100%;

					right:0;
					height:100%;
					position:absolute;
				}}
				.s3 {
					height: 1.5625rem;
					display: block;
					/* line-height: 30px; */
					text-align: left;
					margin: 0 0.3125rem;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
					word-break: break-all;
					overflow: hidden;

				}
				dd {
					margin: 0;
					.s1 {margin:0;
						.s {color: #F55955;
						font-size: 16px;
						vertical-align: middle;}


						em{font-size: 16px;font-style: normal}
					}
					.s2 {
						text-decoration: line-through;
						vertical-align: middle;
						color: #888;
						font-size: 12px;
						margin-left: 0.625rem;
					}
				}
				.m-text {
					font-size: 14px;
					margin: 0.25rem 0.375rem;
					height: 2.625rem;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					word-break: break-all;
					overflow: hidden;
					line-height: 1.34rem;
					text-align: justify;
				}
			}
		}
	}
</style>