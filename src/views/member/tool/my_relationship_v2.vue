<template>
	<div id="myrelationship">
		<c-title :hide="false" text='我的关系'></c-title>
    <div style="height:40px;"></div>
		<div class="relation-people">
			<h3 class="h3">我的推荐人</h3>
		</div>
		<div class="relation-people-info">
			<div class="relation-people-info-img">
				<img :src="myReferral.avatar">
			</div>
			<div class="relation-people-information">
				<!-- <p>{{item.nickname}}</p>
				<p>会员id：{{uid}}</p> -->
				<p style="font-size:14px;margin-bottom:0.375rem;">昵称:{{myReferral.nickname}}</p>
				<p>会员ID:{{myReferral.uid}}</p>
			</div>
		</div>
		<div class="relation-people-row">
			<h3 style="color:#8c8c8c;">角色:{{myReferral.role}}</h3>
		</div>
		<div style="height:0.625rem;"></div>
		<div class="relation-people-amount">
			<span>我推荐的人({{total}})</span>
			<a href="javascript:;" @click="openPop()">筛选</a>
		</div>
    <div style="height:0.625rem;"></div>
		<div id="tabs">
				<el-tabs v-model="activeName" @tab-click="handleClick">
					<el-tab-pane :label="level1.level+'('+level1.total+'人)'" name="first" v-if="level1&&level1.is_show">
						<div v-for=" (item,index) in first_content">
							<div class="tbs" @click='toggle($event,index)'>
								<div class="li1"><img :src="item.avatar" /></div>
								<div class="li2">
									<p>昵称:{{item.nickname}}[id:{{item.id}}]</p>
									<p>金额:{{item.order_price}}</p>
									
								</div>
								<div class="li4">
										<i class='fa' :class="{'fa-angle-down':sort==index,'fa-angle-right':sort!=index}"></i>
									</div>
							</div>
							<transition name="fade">
								<div class="tbs3" v-show='sort==index'>
									<div class="left">粉丝数量：{{item.agent_total}}</div>
									<div class="right">粉丝订单金额：{{item.agent_order_price}}元</div>
									<div class="left1">推广角色：{{item.role}}</div>
								</div>
							</transition>
						</div>

            <!-- <button @click="getData()" v-if="btnShow1">加载更多</button> -->
            <!-- <div class="more">
                <yd-button size="large" type="danger" @click.native="getData" v-if="btnShow1">加载更多</yd-button>
            </div> -->
             <yd-button-group style="width:100%;padding:0px;">
        <yd-button size="large" type="hollow" @click.native="getData" v-if="btnShow1" class="more-btn">加载更多</yd-button>
    </yd-button-group>

           
						<!-- v-if="level2&&level2.is_show" -->
					</el-tab-pane>
					<el-tab-pane :label="level2.level+'('+level2.total+'人)'" name="second" v-if="level2&&level2.is_show">
						<div v-for=" (item,index) in second_content">
							<div class="tbs" @click='toggle($event,index)'>
								<div class="li1"><img :src="item.avatar" /></div>
								<div class="li2">
									<p>昵称:{{item.nickname}}[id:{{item.id}}]</p>
									<p>金额:{{item.order_price}}</p>
									
								</div>
								<div class="li4">
										<i class='fa' :class="{'fa-angle-down':sort==index,'fa-angle-right':sort!=index}"></i>
									</div>
							</div>
							<transition name="fade">
								<div class="tbs3" v-show='sort==index'>
									<div class="left">粉丝数量：{{item.agent_total}}</div>
									<div class="right">粉丝订单金额：{{item.agent_order_price}}元</div>
									<div class="left1">推广角色：{{item.role}}</div>
								</div>
							</transition>
              
						</div>

            <!-- <button @click="getData" v-if="btnShow2">加载更多</button> -->
            <!-- <yd-button size="large" type="danger" @click.native="getData" v-if="btnShow2">加载更多</yd-button> -->
             <yd-button-group style="width:100%;padding:0px;">
        <yd-button size="large" type="hollow" @click.native="getData" v-if="btnShow2" class="more-btn">加载更多</yd-button>
    </yd-button-group>
					</el-tab-pane>
					<el-tab-pane :label="level3.level+'('+level3.total+'人)'" name="third" v-if="level3&&level3.is_show">
						<div v-for=" (item,index) in third_content">
							<div class="tbs" @click='toggle($event,index)'>
								<div class="li1"><img :src="item.avatar" /></div>
								<div class="li2">
									<p>昵称:{{item.nickname}}[id:{{item.id}}]</p>
									<p>金额:{{item.order_price}}</p>
									
								</div>
								<div class="li4">
										<i class='fa' :class="{'fa-angle-down':sort==index,'fa-angle-right':sort!=index}"></i>
									</div>
							</div>
							<transition name="fade">
								<div class="tbs3" v-show='sort==index'>
									<div class="left">粉丝数量：{{item.agent_total}}</div>
									<div class="right">粉丝订单金额：{{item.agent_order_price}}元</div>
									<div class="left1">推广角色：{{item.role}}</div>
								</div>
							</transition>
						</div>

            <!-- <button @click="getData" v-if="btnShow3">加载更多</button> -->
            <yd-button-group style="width:100%;padding:0px;">
        <yd-button size="large" type="hollow" @click.native="getData" v-if="btnShow3" class="more-btn">加载更多</yd-button>
    </yd-button-group>
            <!-- <yd-button size="large" type="danger" @click.native="getData()" v-if="btnShow3">加载更多</yd-button> -->
					</el-tab-pane>
				</el-tabs>
			</div>
	
		<yd-popup v-model="show2" position="bottom" height="60%">
			<div class="relation-popup">
				<div class="relation-popup-con">
					<h3 style="color:#8c8c8c;">角色</h3>
					<ul>
						<li :class="{'active':filterSort==index,'':filterSort!=index}" v-for="(item,index) in filterData" @click="filterDataHandle(item,index)">{{item.role}}</li>
					</ul>
          <div style="clear:both"></div>
				</div>
				
				<div class="relation-popup-lever" v-if="filterLevelData.length>0">
					<h3>等级</h3>
					<ul>
						<li :class="{'active':filterLeveSort==index,'':filterLeveSort!=index}" v-for="(levelItem,index) in filterLevelData" @click="filterLevelDataHandle(levelItem,index)">{{levelItem.level_name}}</li>
					</ul>
          <div style="clear:both"></div>
				</div>
        <div class="button">
            <yd-button size="large" type="danger" @click.native="filterGetData">确定</yd-button>
        </div>
        
    
			</div>
           
        </yd-popup>

	</div>
</template>
<script>
import my_relationship_v2_controller from "./my_relationship_v2_controller";
export default my_relationship_v2_controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#myrelationship {
  width: 100%;
  height: 100%;
  .relation-people {
    h3 {
      color: #333;
      font-size: 14px;
      line-height: 2.25rem;
      padding:0 0.875rem;
      text-align: left;
      font-weight: normal;
      background: #fff;
    }
  }

  .relation-people-info {
    padding: 0.625rem 0.875rem;
    float: left;
    width: 100%;
    .relation-people-info-img {
      width: 3.25rem;
      height: 3.25rem;
      border-radius: 50%;
      overflow: hidden;
      border:solid 0.125rem #fff;
      // margin-top:10px;
      // margin-left:10px;
      float: left;
      line-height: 3.125rem;
      background: #ccc;
      img {
        width: 100%;
      }
    }
    .relation-people-information {
      float: left;
      height: 3.125rem;
      padding-top:0.25rem;
      text-align: left;
      margin-left:0.625rem;
      p {
        margin-left: 0.625rem;
      }
    }
  }

  .relation-people-row {
    background: #fff;
    clear: both;
    h3 {
      color: #333;
      font-size: 12px;
      line-height: 2.25rem;
      padding:0 0.875rem;
      text-align: left;
      font-weight: normal;
      background: #fff;
    }
  }

  .relation-people-amount {
    background: #fff;
    height: 2.75rem;
    line-height: 2.75rem;
    font-size:14px;
    span {
      color: #333;
      padding-left: 0.625rem;
      text-align: left;
      font-weight: normal;
      float: left;
    }

    a {
      float: right;
      margin-right: 3%;
      color:#8c8c8c;
    }
  }

  a {
    float: right;
    margin-right: 3%;
  }
}

.tbs2 {
  background: #f5f5f5;
  align-items: center;
  border-bottom: #ebebeb 0.0625rem solid;
  padding: 0 0.625rem;
  .left {
    width: 46%;
    text-align: left;
    height: 2.8125rem;
    display: inline-block;
    line-height: 2.8125rem;
    img {
      width: 30%;
    }
  }
  .right {
    width: 46%;
    display: inline-block;
    text-align: right;
  }
}
.tbs {
  align-items: center;
  background: #fff;
  border-bottom: #ebebeb 0.0625rem solid;
  padding:0 0.75rem;
  float: left;
  width: 100%;
  background: #fff;
  .left {
    font-size: 12px;
    box-sizing: border-box;
    width: 50%;
    text-align: left;
    height: 2.8125rem;
    line-height: 2.8125rem;
    float: left;
    img {
      width: 30%;
      float: left;
    }
  }
  .right {
    width: 50%;
    text-align: right;
  }
  a {
    color: #000;
  }
  .relation {
    color: #666;
  }
  .id,
  .level {
    font-size: 14px;
    line-height: 2.8125rem;
  }
  .fa.fa-search {
    color: #999;
    font-size: 20px;
  }
  i {
    font-size: 24px;
    color:#929292;
  }
  .img {
    margin: 0.625rem 0;
  }
  .li1 {
    width: 3.125rem;
    height: 3.125rem;
    // margin-top:10px;
    // margin-left:10px;
    float: left;
    line-height: 3.125rem;
    background: #ccc;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .li2 {
    float: left;
    height: 3.125rem;
    p {
      margin-top: 0.4375rem;
      margin-left: 0.625rem;
      text-align: left;
    }
  }
  .li3 {
    flex: 30%;
    width: 30%;
    span {
      border: #b1a6a6 solid 0.0625rem;
      padding: 0.3125rem 1.25rem;
      border-radius: 0.4375rem;
      display: none;
    }
  }
  .li4 {
    // flex: 5%;
    // width: 5%;
    float: right;
    height: 3.125rem;
    line-height: 3.125rem;
  }
}
.imgst {
  background: #f5f5f5;
}
.fade-enter-active {
  transition: 0.5s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
  height: 0px;
}

.tbs3 {
  .left {
    width: 46%;
    text-align: left;
    height: 2.8125rem;
    display: inline-block;
    line-height: 2.8125rem;
    img {
      width: 30%;
    }
  }
  .right {
    width: 46%;
    display: inline-block;
    text-align: right;
    height: 2.8125rem;
    line-height: 2.8125rem;
  }
}

//弹窗
.relation-popup {
  overflow: auto;
  width: 100%;
}
.relation-popup-con {
  border-bottom:solid 0.0625rem #ebebeb;
  padding-bottom: 0.625rem;
  h3 {
    color: red;
    font-size: 12px;
    margin: 0;
    line-height: 2.75rem;
    padding:0 1.25rem;
    text-align: left;
    font-weight: normal;
    background: #fff;
  }

  ul {
    padding: 0 5% 0 5%;
    li {
      width: 30%;
      background: #E8E6E9;
      float: left;
      height: 1.875rem;
      margin-right: 5%;
      margin-bottom: 0.625rem;
      border-radius: 0.3125rem;
      line-height: 1.875rem;
    }

    li:nth-of-type(3n) {
      margin-right: 0;
    }

    .active {
      border: 0.0625rem solid red;
      background: #fff;
    }
  }
}

.relation-popup-lever {
  clear: both;
  h3 {
    color: red;
    font-size: 12px;
    margin: 0;
    line-height: 2.75rem;
    padding:0 1.25rem;
    text-align: left;
    font-weight: normal;
    background: #fff;
  }

  ul {
    padding: 0 5% 0 5%;
    li {
      width: 30%;
      background :#E8E6E9;
      float: left;
      height: 1.875rem;
      margin-right: 5%;
      margin-bottom: 0.625rem;
      border-radius: 0.3125rem;
      line-height: 1.875rem;
    }

    li:nth-of-type(3n) {
      margin-right: 0;
    }

    .active {
      border: 0.0625rem solid red;
      background: #fff;
    }
    // }

    // li:nth-child(1){
    // 	margin-right:5%;
    // }
  }
}
.button{
  button{
    width:90%;
    margin:1.25rem auto;
    height:2.875rem;
    background-color:#f15353;
  }
}
.tbs2 {
  background: #f5f5f5;
  align-items: center;
  border-bottom: #ebebeb 0.0625rem solid;
  padding: 0 0.625rem;
  .left {
    width: 46%;
    text-align: left;
    height: 2.8125rem;
    display: inline-block;
    line-height: 2.8125rem;
    img {
      width: 30%;
    }
  }
  .right {
    width: 46%;
    display: inline-block;
    text-align: right;
  }
}
.tbs {
  align-items: center;
  background: #fff;

  border-bottom: #ebebeb 0.0625rem solid;
  padding: 0.625rem 0.75rem;
  float: left;
  width: 100%;
  background: #fff;
  .left {
    font-size: 12px;
    box-sizing: border-box;
    width: 50%;
    text-align: left;
    height: 2.8125rem;
    line-height: 2.8125rem;
    float: left;
    img {
      width: 30%;
      float: left;
    }
  }
  .right {
    width: 50%;
    text-align: right;
  }
  a {
    color: #000;
  }
  .relation {
    color: #666;
  }
  .id,
  .level {
    font-size: 14px;
    line-height: 2.8125rem;
  }
  .fa.fa-search {
    color: #999;
    font-size: 20px;
  }
  i {
    font-size: 24px;
  }
  .img {
    margin: 0.625rem 0;
  }
  .li1 {
    width: 3.125rem;
    height: 3.125rem;
    // margin-top:10px;
    // margin-left:10px;
    float: left;
    line-height: 3.125rem;
    background: #ccc;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .li2 {
    float: left;
    height: 3.125rem;
    p {
      margin-top: 0.4375rem;
      margin-left: 0.625rem;
      text-align: left;
    }
  }
  .li3 {
    flex: 30%;
    width: 30%;
    span {
      border: #b1a6a6 solid 0.0625rem;
      padding: 0.3125rem 1.25rem;
      border-radius: 0.4375rem;
      display: none;
    }
  }
  .li4 {
    // flex: 5%;
    // width: 5%;
    float: right;
    height: 3.125rem;
    line-height: 3.125rem;
  }
}
.tbs2 {
  padding: 0.625rem 1.25rem;
}
.imgst {
  background: #f5f5f5;
}
.fade-enter-active {
  transition: 0.5s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
  height: 0px;
}

.tbs3 {
  .left {
    width: 46%;
    text-align: left;
    height: 2.8125rem;
    display: inline-block;
    line-height: 2.8125rem;
    img {
      width: 30%;
    }
  }
  .left1 {
    width: 100%;
    text-align: left;
    height: 2.8125rem;
    padding-left: 0.8125rem;
    display: inline-block;
    line-height: 2.8125rem;
    img {
      width: 30%;
    }
  }
  .right {
    width: 46%;
    display: inline-block;
    text-align: right;
    height: 2.8125rem;
    line-height: 2.8125rem;
  }

  
  
}
</style>