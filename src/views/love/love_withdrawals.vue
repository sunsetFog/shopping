<template >
    <div id="balance_recharge">
        <c-title :hide="false" text='提现'></c-title>
        <div style="height: 40px;margin-bottom:0.625rem;"></div>
        <div class="my_wrapper">
            <span>可提现：</span>
            <div class="my-value"><span>{{usable}} </span></div>
        </div>

        <yd-cell-group>
                <yd-cell-item>
                    <span slot="left">提现：</span>
                    <yd-input slot="right" required v-model="sure_usable" max="20" placeholder="请输入要提现数值"></yd-input>
                </yd-cell-item>
        </yd-cell-group>

        <div id="payBtnList">
            <div class="mod_btns" id="wechatpay">
                <a @click="confirm()" class="mod_btn bg_wechat">确认提现</a>
            </div>
        </div>
    </div>
</template>
<script>
import love_withdrawals_controller from "./love_withdrawals_controller";
export default love_withdrawals_controller;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
#balance_recharge {
  .my_wrapper {
    background: #fff;
    overflow: hidden;
    display: flex;
    line-height: 3.0625rem;
    border-bottom:solid 1px #ebebeb;
    padding-left:14px;
    span {
      width:4rem;
      text-align: left;
      font-size: 16px;
      line-height: 3.0625rem;
    }
    .my-value {
      flex: 2;
      text-align: left;
      span {
        color: #f15353;
      }
    }
  }
}
.mint-field .mint-cell-title {
  width: 4rem;
  -webkit-box-flex: 0;
  -ms-flex: none;
  flex: none;
  text-align: left;
  margin-left: 0.9375rem;
}

#payBtnList {
  .mod_btns {
    margin: 1.25rem auto;
    height: 2.875rem;
    line-height: 2.875rem;
    font-size: 16px;
    .mod_btn {
      display: block;
      width: 96%;
      border-radius: 0.3125rem;
    }
    .mod_btn.bg_wechat {
      margin:0 auto;
      width:90%;
      height:2.875rem;
      background: #26ce29;
      color: #fff;
    }
    .mod_btn.bg_ali {
      background: #22aaed;
      color: #fff;
    }
  }
}
</style>