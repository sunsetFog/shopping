


<template>
  <div id="withdrawal">
    <c-title :hide="false" text='收入提现'></c-title>
    <div style="height: 40px;"></div>
    <!--<el-table :data="datasource" border stripe style="width: 100%" @select="handleSelectionChange" @select-all="selectAll" align='center'>
                  <el-table-column type="selection" width="45" :selectable="isCheck">
                  </el-table-column>
                  <el-table-column label="类型" width="105">
                    <template scope="scope">{{ scope.row.type_name }}
</template>
              </el-table-column>
              <el-table-column prop="income" label="金额" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="poundage" label="手续费" show-overflow-tooltip>
              </el-table-column>
            </el-table>-->

    <ul class="tbbox">
      <li class="libg ones">
        <el-checkbox @change="allSelect" v-model="checkAll" :checked=checkAll :disabled="!isCheckAll">&nbsp</el-checkbox>
      </li>
      <li class="libg">类型</li>
      <li class="libg">金额</li>
      <li class="libg">手续费</li>
    </ul>
    <el-checkbox-group v-model="checkList" @change="allSelectHandle">

      <template v-for="item in datasource">
        <ul class="tbbox">
          <li class="libg2 ones">
            <el-checkbox :label=item @change="selectItem" :disabled="!item.can">&nbsp</el-checkbox>
          </li>
          <li class="libg2">{{item.type_name}}
            <p v-if="!item.can" style="line-height: 0.75rem; font-size: 12px;">最低提现额:{{item.roll_out_limit}}</p>
          </li>
          <li class="libg2">{{item.income}}</li>
          <li class="libg2">{{item.poundage}}</li>
        </ul>
      </template>
    </el-checkbox-group>
    <div style="height:0.625rem;background-color:#fff;"></div>

    <div class="userinfo">
      <ul>
        <li>
          <span class="top">{{totalwithdrawal}}</span></br>
          <span class="bottom">提现金额合计</span>
        </li>
      </ul>
      <ul>
        <li>
          <span class="top">{{poundage}}</span></br>
          <span class="bottom">手续费合计</span>
        </li>
      </ul>
      <ul>
        <li>
          <span class="top">{{servicetax}}</span></br>
          <span class="bottom">劳务税合计</span>
        </li>
      </ul>
    </div>

    <!-- <div id="userinfo">
      <ul>
        <li>
          <span>{{totalwithdrawal}}</span>
          <br>提现金额合计
        </li>
        <li>
          <span>{{poundage}}</span>
          <br>手续费合计
        </li>
        <li>
          <span>{{servicetax}}</span>
          <br>劳务税合计
        </li>
      </ul>
    </div> -->

    <span class="wrapper">

<template v-if="balance_special">
  <el-button type="danger" v-if="isBalance" @click="withdrawToBalance(balance.value)">
    {{balance.name}} （手续费:{{independent_poundage}} 劳务税:{{independent_special}})</el-button>
</template>

<template v-if="!balance_special">
  <el-button type="danger" v-if="isBalance" @click="withdrawToBalance(balance.value)">
    {{balance.name}}</el-button>
</template>

      <el-button type="success" v-if="isWechat" @click="withdrawToBalance(wechat.value)">{{wechat.name}}</el-button>
      <el-button type="danger" v-if="isAlipay" @click="withdrawToBalance(alipay.value)">{{alipay.name}}</el-button>
      <el-button type="success" v-if="isManual" @click="checkManual(manual.value)">{{manual.name}}</el-button>
      <el-button type="success" v-if="isHx" @click="checkHxpay(huanxun.value)">{{huanxun.name}}</el-button>

      <!-- //eup支付 -->

      <el-button type="success" v-if="isEup" @click="checkEup(eup.value)">{{eup.name}}</el-button>

      <el-button type="info" :plain="true" @click="toRecord">提现记录</el-button>
    </span>


    <!-- 提现到银行卡弹窗 -->

    <mt-popup v-model="popupVisible" style="width:72%;border-radius:0.375rem;">
      <form :action="action" method="post" style="width:100%;height:100%;">
        <h1 style="font-size:16px;color:#333;padding:1.25rem 0;line-height:2.25rem;font-weight:normal;border-bottom:solid 0.0625rem #ebebeb;">{{notice}}</h1>
          <input type="text" name="ipsRequest" :value="msg" style="display:none;margin-top:0.625rem;"/>
          <input type="submit" value="确认" style="width:100%;height:2.5rem;line-height:2.5rem;font-size: 16px;color: #26a2ff;border: none;"/>
      </form>
    </mt-popup>  

  </div>
</template>
<script>
  import member_income_withdrawal_controller from './member_income_withdrawal_controller';
  export default member_income_withdrawal_controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#withdrawal {
  .tbbox {
    display: flex;
    background: #FFF;
    line-height: 2.5rem;
    .libg {
      flex: 2;
      background: #eef1f6;
      font-weight: bold;
    }
    .libg2 {
      flex: 2;
    }
    .ones {
      flex: 1;
    }
  }
  #userinfo {
    background: #FFF;
    margin: 0.625rem 0;
    ul {
      display: flex;
      align-items: center;
    }
    ul li:last-child {
      border: 0;
    }
    ul li {
      color: #8c8c8c;
      text-align: center;
      display: block;
      flex: 1;
    }
    ul li span {
      color: #333;
      font-size:17px;
      display:inline-block;
      margin-bottom:0.625rem;
    }
    ul li {
      float: left;
      width: 33.3333%;
      margin: 1rem 0;
      border-right: 0.0625rem solid #e2e2e2;
      box-sizing: border-box;
    }
  }
  .userinfo{
    background-color: #fff;
    padding:1rem 0;
    margin-top:0.625rem;
    display: flex;
    ul{
      flex: 33.3%;
      border-right:solid 0.0625rem #e2e2e2;
      .top{
        display: inline-block;
        margin-bottom:0.625rem;
        font-size:17px;
      }
      ul li {
        float: left;
        width: 33.3333%;
        margin: 16px 0;
        border-right: 1px solid #e2e2e2;
        box-sizing: border-box;
      }
    }
    .userinfo {
      background-color: #fff;
      padding: 16px 0;
      margin-top: 10px;
      display: flex;
      ul {
        flex: 33.3%;
        border-right: solid 1px #e2e2e2;
        .top {
          display: inline-block;
          margin-bottom: 10px;
          font-size: 17px;
        }
        .bottom {
          color: #8c8c8c;
        }
      }
      ul:last-child {
        border: 0;
      }
    }

  }
  .wrapper {
    display: flex;
    flex-flow: row wrap;
    margin-top: 1.25rem;
    margin-bottom:1.25rem;
    button {
      width:90%;
      margin: 0.375rem auto;
      height:2.875rem;
    }
  }
}
</style>