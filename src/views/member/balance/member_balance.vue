<template>
    <div id="balance">
    	<c-title :hide="false" text='余额' tolink='detailed' totext='收入明细'></c-title>
    	<div style="height: 4.375rem;"></div>
    	<center><i class="fa fa-diamond" ></i></center>
    	<p class="my-banlance">我的余额<br /><span>￥<b>{{member_credit2}}</b></span></p>
		<p>
			<el-button type="success" @click="chargeHandel">充值</el-button><br />
			<el-button type="danger" @click="transferHandel">转账</el-button><br />
			<el-button type="info" :plain="true" @click="withdrawHandel">提现</el-button>
		</p>
    </div>
</template>
<script>
import memberBanlanceController from './member_banlanceController';
export default memberBanlanceController;

</script>
<style lang="scss" rel="stylesheet/scss" scoped>

	button{width: 90%;margin-bottom:0.75rem;height:2.875rem;}
	i{font-size: 4.375rem;  color: #ffd147;}
	.my-banlance{margin: 1.25rem 0;font-size: 14px;  color: #333;line-height: 2rem;}
	.my-banlance span{font-size: 16px;color: #333;margin-top:0.625rem; }
	.my-banlance span b{font-size: 24px;}
</style>