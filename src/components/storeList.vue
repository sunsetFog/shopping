<template>
	<div id="goodslist">
		<h3><div class="title">{{text}}</div><div class="spas"></div></h3>
		<div class="store">
			<!-- <div  @click="toRouter(items.id)" v-for="items in stores"> -->
			<div  @click="toRouter(items)" v-for="items in stores">
				<div class="list">
					<!-- <div class="store-img" @click.stop="toSeller(items.id)"> -->
					<div class="store-img">
						<a class="store-logo" >
						<img :src="items.thumb">
						</a>	
					</div>
					<div class="classify">
							<span @click.stop="toClassify(items.has_one_category.id)">{{items.has_one_category.name}}</span>
					</div>
					<div class="store-intro">
						<div class="a8q ">
							<h2 class="">{{items.store_name}}</h2>
							<div class="store_honor_box">
								<span class="store_honor_icon">距离{{items.distance}}{{items.unit}}</span>
							</div>
							
						</div>
						<!-- <a :href="'tel:'+items.mobile" style="float:right;display:block;z-index:9999;">
							<yd-icon slot="icon" name="phone2" size="1.2rem" color="#e85151" ></yd-icon>
						</a> -->
						<div style="float:right;display:block;z-index:9999;" @click.stop="toSeller(items.id)">
							<yd-icon slot="icon" name="phone2" size="1.2rem" color="#e85151" ></yd-icon>
						</div>
						<div class="a06 a8r">
							<strong class="i8">
								<span class="da">{{items.dispatch}}</span>
							</strong>
						</div>
						<div class="a8v">
							<p class="a8d">
								<span class="a79 clearfix"><i></i><i></i><i></i><i></i><i class="zo"></i></span>
							</p>
							<p class="a8w">
								<span class="line_split"></span>月售{{items.order_total}}单
							</p>
						</div>

						

						<div class="discount">
							<p><span style="margin-right:0.625rem;" v-if="items.store_point.point_switch == 0?false:true">{{items.store_point.point}}</span><span v-if="items.store_point.point_deduct_switch == 0?false:true">{{items.store_point.max_point_deduct}}</span></p>
							<p><span style="margin-right:0.625rem;" v-if="items.store_love.award==1?true:false">{{items.store_love.award_proportion}}</span><span v-if="items.store_love.deduction==1?true:false">{{items.store_love.deduction_proportion}}</span></p>
						</div>
					</div>
				</div>
			</div>
					<div style="width: 100%;height: 50px;line-height: 50px;" v-if="loading">暂无数据</div>
		</div>
	</div>
</template>

<script>
	import { Lazyload } from 'mint-ui';
	import { InfiniteScroll } from 'mint-ui';
	import { mapState } from 'vuex';
	export default {
		props: ['stores', 'text','loading'],
		data() {
			return {
				list:[],
				toi:this.fun.getKeyByI(),
				types:this.fun.getTyep(),
            }
		},
		methods: {
			bgoo(){
				//this.$router.push({name:'goods',params:{id:8},query:{i:2}});
				this.$router.push(this.fun.getUrl('goods',{id:13}));
			},

			toSeller(id){
				this.$router.push({name:'HomeSeller',params:{store_id:id},query:{i:this.toi}})
			},

			toRouter(item){
				// this.$router.push({name:'o2oStore',params:{store_id:id},query:{i:this.toi}});
				if(item.specify_show == 1){
					this.$router.push(this.fun.getUrl('o2oStore',{store_id:item.id}));
				}else{
					this.$router.push(this.fun.getUrl('HomeSeller',{store_id:item.id}));
				}

			},

			//跳转至分类
			toClassify(id){
				console.log(location.href);
				this.$router.push(this.fun.getUrl('o2oCategory',{id:id}));
			}
		},
		computed: mapState(["view"])
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	#goodslist {
		background: #f5f5f5;
		.loadNomore img{width: 20%;}
		h3 {
			width: 65%;
			position: relative;
			margin:0 auto 0.9375rem;
			height: 1.25rem;
			padding: 0.625rem 0 0;
			.title {
				width: 38%;
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
		.store {
			height: auto;
			width: 100%;
			background: #fff;
			margin-top: 0.625rem;
			border-bottom: 0.0625rem solid #f5f3f3;
			.list {
				position: relative;
				padding: 0.9375rem 0.625rem;
				min-height: 6.875rem;
				border-top: 0.0625rem solid #e7e9e4;
				width: 97%;
				background: #fff;
				font-size: 14px;
				color: #333;
				text-align: left;
				.store-img{
					position: relative;
					.store-logo{
						position: absolute;
						left: 0.625rem;
						top: 0;
						bottom: 0;
						float: none;
						width: 4rem;
						height: 4rem;
					}
					img{
						float: left;
						width: 100%;
						height: 100%;
						border-radius: 0.25rem;
						border: 0.0625rem solid #e8e8e8;
						display: inline-block;
						margin-right: 0.5rem;
					}
				}
				.store-intro{
					position: relative;
					margin-left: 5.625rem;
					.a8v{
						// height: 0.875rem;
						margin-top: 0.5rem;
						overflow: hidden;
						font-size: 0;
						.a8d{
							height: 0.75rem;
							padding-top: 0.125rem;
							overflow: hidden;
							display: inline-block;
							position: relative;
							.a79{
								display: inline-block;
								font-size: 0;
								i{
									display: inline-block;
									width: 0.625rem;
									height: 0.625rem;
									background-position: 0 0;
									background-image: url(//static-o2o.360buyimg.com/daojia/new/images/icon/newStar.png);
									background-repeat: no-repeat;
									background-size: auto 0.625rem;
									margin-right: 0.0625rem;
								}
								.zo{
									background-position: -0.625rem 0;
								}
							}
						}
						.a8w{
							font-size: 11px;
							line-height: 0.875rem;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							color: #999;
							display: inline-block;
							.line_split{
								display: inline-block;
								width: 0.5rem;
								height: 0.625rem;
								background: url(//static-o2o.360buyimg.com/daojia/new/images/index/icon_line_split.jpg) no-repeat center 0.125rem;
							}
						}

					}
					.a8r{
						font-size: 0;
						padding-top: 0.625rem;
						overflow: hidden;
						width: 10.25rem;
						.i8{
							display: inline-block;
							border: 0.0625rem solid #16A9ff;
							font-size: 0;
							border-radius: 0.125rem;
							color: #16a9ff;
							line-height: 0;
							// height: 0.9375rem;
							overflow: hidden;
							.da{
								display: inline-block;
								line-height: 1;
								padding: 0.125rem;
								font-size: 10px;
							}
							.db{
								line-height: 1;
								font-size: 10px;
							}
							.a9a{
								display: inline-block;
								padding: 0.125rem;
								line-height: 1;
								font-size: 10px;
							}
						}
					}
					.a8q{
						height: 1.25rem;
						line-height:1.25rem;
						overflow: hidden;
						display: -webkit-box;
						display: -moz-box;
						display: -ms-box;
						display: flex;
						-moz-flex: 1;
						-webkit-flex: 1;
						-ms-flex: 1;
						flex: 1;
						h2{
							font-size: 16px;
							color: #333;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							display: inline-block;
							margin-top: 0;
							font-weight: bold;
							-webkit-flex: 1;
							-moz-flex: 1;
							-ms-flex: 1;
							flex: 1;
						}
						.store_honor_icon{
							display: inline-block;
							width: 5.5rem;
							height: 1.25rem;
							font-size: 12px;
							text-align: right;
							margin-right: 0.125rem;
							background-position: center center;
							background-repeat: no-repeat;
							background-size: 1rem auto;
							color:#8c8c8c;
						}
					}
					.discount{
						margin-top:0.3125rem;
						p{
							font-size: 11px;
							line-height: 0.875rem;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							color: #999;
							
							
						}
					}
				}
			}
		}

		.classify{
			float:left;
			margin-top:4.375rem;
			margin-left:0.625rem;
			span{
				width:4rem;
				height:1.25rem;
				border:0.0625rem solid #ccc;
				display:block;
				text-align:center;
				border-radius:0.1875rem;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
				font-size:8px;
				line-height: 1.25rem;
				cursor: pointer;
			}
		}
	}
</style>
