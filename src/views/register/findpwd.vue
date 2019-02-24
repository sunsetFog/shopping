<template>
	<div id="findpwd">
		<c-title :hide="false" text='忘记密码'></c-title>
		<div class="lin">
			<img style='width:20%;height:40px;position:absolute;display:block;left:77%;top:6.5625rem;z-index:999' :src="imgcode" @click='getimgdata' v-if='imgcode'>
			<yd-cell-group>

				<yd-cell-item>
					<span slot="left">国际区号：</span>
					<input slot="right" type="number" placeholder="请输入国际区号" v-model.trim="form.country">
				</yd-cell-item>

				<yd-cell-item v-if='imgcode'>
	
					<span slot="left">图形验证码：</span>
					<input type="text" slot="right" placeholder="请输入右侧图形验证码" v-model.trim="form.captcha">
				</yd-cell-item>

				<yd-cell-item>
					<span slot="left">手机号：</span>

					<input type="tel" slot="right" placeholder="请输入手机号码" v-model.trim="form.mobile">

					<!-- ↓↓关键代码是这里↓↓ -->
					<yd-sendcode slot="right" v-model="start1" @click.native="verificationCode" type="warning"></yd-sendcode>
					<!-- ↑↑关键代码是这里↑↑ -->

				</yd-cell-item>
				<yd-cell-item>
					<span slot="left">验证码：</span>
					<input slot="right" type="text" placeholder="请输入验证码" v-model.trim="form.code">
				</yd-cell-item>

				<yd-cell-item>
					<span slot="left">设置密码：</span>
					<input slot="right" type="password" placeholder="请输入密码" v-model.trim="form.password">
				</yd-cell-item>

				<yd-cell-item>
					<span slot="left">确认密码：</span>
					<input slot="right" type="password" placeholder="请输入密码" v-model.trim="form.confirm_password">
				</yd-cell-item>

			</yd-cell-group>

			<yd-button-group>
				<yd-button size="large" type="primary" @click.native="findpwd">提交修改</yd-button>
			</yd-button-group>

		
		</div>
	</div>
</template>

<script>
import findpwd_controller from "./findpwd_controller";
export default findpwd_controller;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
#findpwd {
  margin-top: 3.125rem;
  width: 100%;
  #code {
    background: #ccc;
    padding: 0.1875rem 0.3125rem;
    border-radius: 0.1875rem;
  }
  h1 {
    color: #42b983;
  }
  .mint-button--large {
    margin-top: 0.625rem;
  }
  #bts {
    margin: auto 0.3125rem;
    .mint-button--default {
      background-color: #13ce66;
      color: #fff;
    }
  }
  .forget {
    color: #999;
    float: right;
  }
}
</style>