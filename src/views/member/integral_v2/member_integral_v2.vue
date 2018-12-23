<template>
  <div id="balance">
    <c-title :hide="false" :text="integral?integral:'积分'" tolink='integrallist'
             :totext="integral?integral:'积分'+'明细'"></c-title>
    <div style="height: 4.375rem;"></div>
    <center><i class="fa fa-diamond"></i></center>
    <p class="my-banlance">我的{{integral?integral:'积分'}}<br/><span><b>{{credit1}}</b></span></p>
    <p>
      <el-button v-if="false" type="success" @click="chargeHandel">充值</el-button>
      <br/>
      <el-button type="danger" @click="transferHandel">转账</el-button>
      <br/>
      <el-button v-if="false" type="info" :plain="true" @click="withdrawHandel">提现</el-button>
      <el-button v-if="activity" size="large" bgcolor="#000" color="#FFF" @click="toIntegral">
        {{integral?integral:'积分'}}活动
      </el-button>
    </p>
  </div>
</template>
<script>
  import member_integral_v2Controller from './member_integral_v2Controller';

  export default member_integral_v2Controller;

</script>
<style lang="scss" rel="stylesheet/scss" scoped>

  button {
    width: 90%;
    height: 2.875rem;
    font-size: 16px;
    margin-bottom: 12px;
  }

  i {
    font-size: 4.375rem;
    color: #ffd147;
  }

  .my-banlance {
    margin: 1.25rem 0;
    font-size: 14px;
    color: #333;
    line-height: 2rem;
  }

  .my-banlance span {
    font-size: 14px;
    color: #333;
    margin-top: 0.625rem;
  }

  .my-banlance span b {
    font-size: 24px;
  }
</style>