<template>
	<transition name="fade">
		<mt-loadmore :top-method="loadTop"
		             @top-status-change="handleTopChange"
		             :bottom-method="loadBottom"
		             :bottom-all-loaded="allLoaded"
		             ref="loadmore"
		             topPullText=''
		             topDropText=''
		             topLoadingText=''
		             bottomPullText=''
		             bottomDropText=''
		             bottomLoadingText=''>
			<div id="tabs">
				<el-tabs v-model="activeName"
				         @tab-click="handleClick">
					<el-tab-pane label="商品介绍"
					             name="first">
						<div id="goods_content" v-html='first_content'></div>
					</el-tab-pane>
					<el-tab-pane label="商品参数" name="second">
						<div class="parameter" v-for="item in second_content">
							<div class="par-info" >
								<span class="name">{{item.title}}</span>
								<span class="value">{{item.value}}</span>
							</div>
						</div>
					</el-tab-pane>
					<el-tab-pane label="用户评价"
					             name="third">
						<div class="pj"
						     v-for="n in third_content">
							<div layout="row"
							     layout-align="start center"
							     id="user">
								<div><img :src="n.head_img_url" /></div>
								<div>{{n.nick_name}}</div>
								<div>{{n.created_at}}</div>
							</div>
							<p>{{n.content}}</p>
							<!--<div class="pl"><span>评论</span></div>-->
						</div>
					</el-tab-pane>
				</el-tabs>
			</div>
		</mt-loadmore>
	</transition>
</template>


<script>
import goodstabs_controller from './goodstabs_controller';
export default goodstabs_controller;

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
#tabs {
	min-height: 100vh;
	#goods_content{ img{width: 100%}}
}

.pl {
	width: 100%;
	text-align: right;
	padding: 0.625rem 0;
	span {
		border: #B1A6A6 0.0625rem solid;
		border-radius: 0.875rem;
		padding: 0.125rem 0.875rem;
		background: #FFFFFF;
		font-size: 12px;
	}
}

.pj {
	background: #FFF;
	padding: 0 0.625rem;
	margin-bottom: 0.3125rem;
	p {
		text-align: left;
		margin: 0;
		padding-bottom: 0.625rem;
	}
	img {
		width: 100%;
	}
}
.parameter{
	height: 100%;
	background: #fff;
	padding: 0.625rem 0.625rem 0 0.625rem;
	text-align: left;
	font-size:14px;
	display: flex;
.par-info{
	display:flex;
	width: 100%;
	padding-bottom: 0.625rem;
	border-bottom: 0.0625rem solid #f1f1f1;
		.name{
			color: #999;
			width: 25%;
			padding-right:0.625rem ;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.value{color: #333;
			width: 75%;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;}
	}
}
#user {
	div:nth-child(1) {
		flex: 1;
		padding: 0.625rem 0.625rem 0.3125rem 0;
		img {
			width: 90%;
			border-radius: 50%;
		}
	}
	div:nth-child(2) {
		flex: 5;
		text-align: left;
	}
	div:nth-child(3) {
		color: #908a8a;
		font-size: 12px;
		padding-right: 0.625rem;
	}
}

.fade-enter-active,
.fade-leave-active {

	transition: all .5s ease;
	transform: translateY(0%);
}

.fade-enter,
.fade-leave-active {
	transition: all .5s ease;

	transform: translateY(100vh);
}
</style>