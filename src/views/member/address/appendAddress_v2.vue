<template>
	<div id="appendAddress">
	
		<c-title :hide="false" text='添加收货地址'></c-title>
		<div style="height: 40px;margin-top:0.625rem;"></div>
		<!-- <mt-field label="收件人" v-model="form.username" placeholder="请输入收件人"></mt-field>
		<mt-field label="联系电话" v-model="form.mobile" placeholder="请输入联系电话" type="tel"></mt-field>
		<div class="maleall">
			<label class="males"><span>设置默认地址 </span>
				<div class="address"
				     style="">
					<mt-switch :v-model="form.isdefault"></mt-switch>
				</div>
			</label>
		</div> -->
		 <yd-cell-group>
			<yd-cell-item>
				<span slot="left">收件人：</span>
				<yd-input slot="right" v-model="form.username" max="20" placeholder="请输入收件人"></yd-input>
			</yd-cell-item>
			<yd-cell-item>
				<span slot="left">联系电话：</span>
				<yd-input slot="right" v-model="form.mobile" placeholder="请输入联系电话" type="tel"></yd-input>
			</yd-cell-item>
    	</yd-cell-group>

		<yd-cell-group>
			<yd-cell-item>
				<span slot="left">设置默认地址：</span>
				<!-- <yd-input slot="right" v-model="form.username" max="20" placeholder="请输入收件人"></yd-input> -->
				<!-- <yd-switch slot="right" v-model="form.isDefault" color="#f15353"></yd-switch> -->
				<!-- <yd-checkbox v-model="form.isDefault" slot="right"></yd-checkbox> -->
				<span slot="right"><mt-switch v-model="form.isDefault"></mt-switch></span>
			</yd-cell-item>
			
    	</yd-cell-group>

        <div>
            <yd-cell-group>
                <yd-cell-item arrow>
                    <span slot="left">所在地区：</span>
                    <input slot="right" type="text" @click.stop="addressShow = true" v-model="addressName" readonly placeholder="请选择收货地址">
                </yd-cell-item>
                <yd-cell-item arrow v-if="strShow">
                     <span slot="left">街道：</span>
					 <input slot="right" type="text" @click.stop="streetChoose" v-model="form.street" readonly placeholder="请选择街道">
                </yd-cell-item>
            </yd-cell-group>

            <yd-cityselect v-model="addressShow" :callback="addressCallback" :items="district"></yd-cityselect>
        </div>
		
		<!-- <mt-field label="" v-model="form.address" placeholder="请输入详细地址"></mt-field> -->

		<yd-cell-group>
			<yd-cell-item>
				<yd-textarea slot="right" placeholder="请输入详细地址" v-model="form.address"  maxlength="100"></yd-textarea>
			</yd-cell-item>
		</yd-cell-group>

		<div style="height: 3.75rem;"></div>

		<div class="address_addnav" @click="appendAddress"><i class="fa fa-plus-circle"></i><span>保存</span></div>

        <yd-popup v-model="streetShow" position="right" width="100%">
			
			<yd-navbar title="选择街道" height="2.5rem" fontsize="14px" fixed>
				<span slot="left">
					<yd-navbar-back-icon @click.native="streetShow = false"></yd-navbar-back-icon>
				</span>
			</yd-navbar>
			<div style="clear:both;margin-top:2.5rem;"></div>
			
			<yd-cell-item arrow v-for="item in districtVal" @click.native="streetConfirm(item.areaname)">
				<span slot="left">{{item.areaname}}</span>
			</yd-cell-item>
           
        </yd-popup>
	
	</div>
</template>
<script>
import appendAddress_v2_controller from './appendAddress_v2_controller';
export default appendAddress_v2_controller;

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.address_addnav {
	width: 100%;
	padding: 0 3% 0 6%!important;
	position: fixed;
	bottom: 0;
	left: 0;
	background: #f15353 !important;
	color: #fff !important;
	text-align: center;
	height: 2.8125rem !important;
	line-height: 2.8125rem !important;
}

.popup-con {
	width: 100%;
}

#appendAddress .mint-field .mint-cell-title {
	text-align: left;
}

.address_addnav i {
	color: #fff;
	font-size: 22px;
	position: absolute;
	top: 50%;
	height: 1.125rem;
	line-height: 1.125rem;
	margin-left: -2.125rem;
	margin-top: -0.5625rem;
}

.maleall {
	background: #FFF;
	text-align: left;
}

#appendAddress .males {
	line-height: 3.125rem;
	display: flex;
	align-items: center;
	border-top: 0.0625rem solid #d9d9d9;
	margin-left: 0.625rem;
	padding-right: 0.625rem;
	.address {
		display: inline-block;
		position: relative;
		width: 100%;
		float: right;
		box-sizing: border-box;
		padding-top: 0rem
	}
}

.maleall span {
	font-size: 16px;
	vertical-align: middle;
	width: 6.5625rem;
	-webkit-box-flex: 0;
	-ms-flex: none;
	flex: none;
	line-height: 3.125rem;
}

#address {
	flex: 1;
	line-height: 3.125rem;
	.mint-button--default {
		line-height: 3.125rem;
		text-align: left;
		font-size: 16px;
	}
}
</style>