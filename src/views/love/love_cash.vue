<template>
    <div id="love_cash">
    	<c-title :hide="false" text='收入提现奖励详情' ></c-title>
    	<div style="height: 40px;"></div>
      <div style="height:1.25rem;background-color:#fff;"></div>
    	<p>收入提现奖励(元)</p>
    	<p id="money">+100</p>
    	<p id="dingjing">激活</p>
    	<div class="tbs">
    		<div class="left">收入提现类型</div>
    		<div class="right">100.00元</div>
    		<div class="left">收入提现金额</div>
    		<div class="right">20%</div>
    		<div class="left">提现手续费</div>
    		<div class="right">20.00元</div>	
    		<div class="left">{{love_name}}奖励比例</div>
    		<div class="right">20%</div>	    		
    	</div>
      <div class="lise"></div>
    	<div class="tbs">
    		<div class="left">收入提现到账时间</div>
    		<div class="right">2017-07-07 12:11:00</div>
    		<div class="left">奖励时间</div>
    		<div class="right">2017-07-07 12:11:00</div>
    	</div>    	
    </div>
</template>
<script>
import cTitle from 'components/title';
import { MessageBox } from 'mint-ui';
export default
  {
    data() {
      return {
        balance: 0,
        //是否开启充值
        love_name: "",//爱心值自定义名称
        usable: 0, // 登陆会员可用爱心值
      }
    },
    methods:
    {
      getUsable() {
        $http.get('plugin.love.Frontend.Controllers.page.index', {}, "加载中...").then((response)=>{

          if (response.result == 1) {
          		this.usable = response.data.usable;
          		this.love_name = response.data.love_name;
          } else {
             MessageBox.alert(response.msg);
          }

        }, function (response) {
           MessageBox.alert(response);
        });

      },
      getBalance() {

        var that = this;
        $http.get('finance.balance.balance', {}, "加载中...").then(function (response) {

          if (response.result == 1) {
            console.log(response.data);

          } else {
             MessageBox.alert(response.msg);
          }

        }, function (response) {
           MessageBox.alert(response);
        });

      }

    },
    activated() {
		this.getUsable();
    },
    components: { cTitle }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#love_cash{
  padding-bottom:0.625rem;
  color:#333;
  background-color: #fff;
  p{
    background-color: #fff;font-size:14px;
  }
	#money{font-weight:bold;color: #333;font-size: 28px;line-height: 3rem;
  small{
    font-size:14px;
  }
  }
	#dingjing{
    padding-bottom:0.625rem;
    background-color: #fff;
    color:#8c8c8c;
   margin:0 auto;
   }
   .lise{margin:0.625rem 0.9375rem;;border-bottom: 0.0625rem solid #ebebeb;display: block;}
	.tbs{
        display: flex;
        align-items: center;
        background: #FFF;padding: 0 0.9375rem;
        flex-flow: row wrap;    
        box-sizing: border-box;
        font-size: 14px;line-height: 2rem;
        .left {
            flex: 40%;
            text-align: left;
        }
        .right {
            flex: 60%;
            text-align: right;
        }
  
}
}
</style>