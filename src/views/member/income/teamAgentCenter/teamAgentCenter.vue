<template>
    <div id="teamAgentCenter">
        <c-title :hide="false" :text='mailTeamDividendTitle'></c-title>
        <div style="height:40px"></div>
        <div class="share_holder">
            <div class="header_box">
              <div class="left"><span>{{level_name}}</span></div>
                <ul class="right">
                    <li>{{mailDividend}}比例:{{dividend_ratio}}%</li>
                    <li>下级{{mailDividend}}比例:{{next_dividend_ratio}}%</li>
                </ul>
                
            </div>
            <router-link :to="fun.getUrl('teamCode')">
                <div class="list1 code">
                    <div class="ico extension"></div>{{$yzt('teamAgentCenter.myCode')}}
                    <i class="fa fa-angle-right"></i>
                </div>
            </router-link>
            <ul class="today_bonus">
                <li v-for="item in ratioDatas" :class="item.name">
                    <span>{{item.money}}</span>
                    <br>
                    <b>{{item.data}}</b>
                </li>
                <li class="line">
                    <div class="careat"></div>
                </li>
            </ul>
            
        </div>
    
        <div class="content">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane :label="bonus_lable" name="first" v-if="bonus_active">
    
                    <ul class='rationList'>
                        <li v-for="elem in first_content">
                            <div class="detail">
                                <span class="month">{{elem.create_month}}</span>
                                <div class="info" v-for="item in elem.has_many_dividend">
                                    <ul class="left">
                                        <li>订单号：{{item.order_sn}}</li>
                                        <li class="time">时间：{{item.created_at}}</li>
                                    </ul>
                                    <ul class="right">
                                        <li>{{item.dividend_amount}}</li>
                                        <li class="state">{{item.status_name}}</li>
                                    </ul>
                                </div>
    
                            </div>
    
                        </li>
                    </ul>
    
                </el-tab-pane>
                <el-tab-pane :label="leveling_label" name="second" v-if="leveling_active" >
    
                    <ul class='rationList'>
                        <li v-for="elem in second_content">
                            <div class="detail">
                                <span class="month">{{elem.create_month}}</span>
                                <div class="info" v-for="item in elem.has_many_dividend">
                                    <ul class="left">
                                        <li>订单号：{{item.order_sn}}</li>
                                        <li class="time">时间：{{item.created_at}}</li>
                                    </ul>
                                    <ul class="right">
                                        <li>{{item.dividend_amount}}</li>
                                        <li class="state">{{item.status_name}}</li>
                                    </ul>
                                </div>
    
                            </div>
    
                        </li>
                    </ul>
    
                </el-tab-pane>
                <el-tab-pane label="感恩奖" name="third">
                  <ul class='rationList'>
                        <li v-for="elem in third_content">
                            <div class="detail">
                                <span class="month">{{elem.create_month}}</span>
                                <div class="info" v-for="item in elem.has_many_dividend">
                                    <ul class="left">
                                        <li>订单号：{{item.order_sn}}</li>
                                        <li class="time">时间：{{item.created_at}}</li>
                                    </ul>
                                    <ul class="right">
                                        <li>{{item.dividend_amount}}</li>
                                        <li class="state">{{item.status_name}}</li>
                                    </ul>
                                </div>  
    
                            </div>
    
                        </li>
                    </ul>   
                </el-tab-pane>
                <!-- <el-tab-pane :label="$yzt('teamAgentCenter.dividend_zhitui')" name="third">
    
                    <ul class='rationList'>
                        <li v-for="elem in third_content">
                            <div class="detail">
                              
                                <div class="info">
                                    <div class="left">
                                        <h4>下级
                                            <b>{{elem.subordinate_name}}</b>{{elem.level_name}}</h4>
                                        <span class="created">{{elem.created_at}}</span>
                                    </div>
                                    <div class="right">
                                        <b class="created">+{{elem.reward_amount}}</b>
                                    </div>
                                </div>
    
                            </div>
    
                        </li>
                    </ul>
                </el-tab-pane> -->
            </el-tabs>
    
        </div>
    
    </div>
</template>

<script>
import team_agent_center_controller from "./team_agent_center_controller";
export default team_agent_center_controller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
* {
  box-sizing: border-box;
}
#teamAgentCenter {
  .share_holder {
    .header_box {
      padding: 1rem 0.75rem;
      background: #f15353;
      color: #fff;
      display: flex;
      justify-content: space-between;
      font-size:14px;
      .left{
        line-height: 3rem;
      }
      .right{
        text-align: right;
        li{
          line-height: 1.5rem;
        }
      }
    }

    .today_bonus {
      width: 100%;
      height: 5.125rem;
      background: #fff;
      padding: 1rem 0;
      box-sizing: border-box;
      position: relative;
      border-bottom:solid 0.0625rem #e2e2e2;
      li.line {
        position: absolute;
        width: 0.0625rem;
        height: 3.25rem;
        background: #ddd;
        top: 1rem;
        right: 34%;

        .careat {
          width: 0.375rem;
          height: 0.375rem;
          border: 0.0625rem solid #ebebeb;
          border-left: 0;
          border-bottom: 0;
          -webkit-transform: rotate(45deg);
          -moz-transform: rotate(45deg);
          -ms-transform: rotate(45deg);
          -o-transform: rotate(45deg);
          transform: rotate(45deg);
          background: #fff;
          position: absolute;
          top: 1.4375rem;
          right: -0.1875rem;
        }
      }
      li {
        text-align: center;
        float: left;

        span {
          font-size: 17px;
          line-height: 1.625rem;
          display: inline-block;
          margin-bottom: 0.625rem;
        }
        b {
          font-size: 11px;
          color: #333;
        }
      }

      li.data {
        width: 22%;

        span {
          color: #ffa800;
        }
      }
      li:first-child,
      li:nth-child(2) {
        border-right: 0.0625rem solid #e2e2e2;
      }

      li.mounth {
        width: 34%;

        span {
          color: #fc6a70;
        }
      }
    }
  }
  .code {
    height: 2.75rem;
    background: #fff;
    padding:0 0.9375rem;
    font-size: 15px;
    line-height: 2.75rem;
    color: #333;
    text-align: left;
    box-sizing: border-box;
    margin-bottom:0.625rem;
    i {
      float: right;
      line-height: 2.75rem;
      display: inline-block;
      font-size: 24px;
      color: #c9c9c9;
      text-align: center;
      background-size: 1.25rem;
    }
  }

  .content {
    margin-top:10px;
    .ratioNav {
      padding: 0px;
      margin: 0px;
      height: 2.375rem;
      width: 100%;
      background: #fff;
      border-bottom: 0.0625rem solid #cdcdcd;
      border-top: 0.0625rem solid #cdcdcd;

      li {
        float: left;
        width: 33%;
        text-align: center;
        line-height: 2.1875rem;
        font-size: 14px;
        color: #666;
      }
    }
    .rationList {
      padding: 0;
      margin: 0;
      li {
        span.month {
          display: block;
          text-align: left;
          line-height: 2.25rem;
          padding:0 0.75rem;
          background: #f0f0f0;
          font-size:16px;
        }
        .info {
          border-bottom: 0.0625rem solid #eee;
          overflow: hidden;
          padding: 0.625rem 0.75rem;
          background: #fff;
          font-size:14px;
          .left {
            width: 70%;
            float: left;
            text-align: left;
            box-sizing: border-box;
            .time{
              font-size:12px;
              color:#8c8c8c;
            }
            li{
              line-height: 1.5rem;
            }
            span {
              font-size: 14px;
              font-weight: 400;
              color: #333;
            }
            p {
              font-size: 12px;
              color: #999;
            }
            span.created {
              font-size: 12px;
            }
            h4 {
              font-weight: normal;
              b {
                font-weight: normal;
                color: #f15353;
              }
            }
          }
          .right {
            float: left;
            width: 30%;
            color: #20b86a;
            text-align: right;
            .state{
              font-size:12px;
              color:#8c8c8c;
            }
            li{
              line-height: 1.5rem;
            }
            p {
              margin: 0;
              padding: 0;
              font-size: 12px;
              color: #888;
            }
            b {
              font-weight: normal;
            }
            b.created {
              line-height: 2.1875rem;
            }
          }
        }
      }
    }
  }
}

</style>