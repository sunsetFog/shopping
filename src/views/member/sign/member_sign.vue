<template>
  <div id="sign">
    <c-title :hide="false"
             v-bind:text='sign_name'></c-title>
			 <div style="height:40px;"></div>
	<div class='sign-header'>
		<span>连续{{sign_name}}:{{continue_days}}</span>
		<div class='btn' @click='signnow'>{{sign_status?'已'+sign_name:'未'+sign_name}}</div>
		<span>累计{{sign_name}}:{{sign_total}}</span>
		<router-link :to="fun.getUrl('signrules')" class='yicon'>
			<yd-icon name="question" color='#fff'  size='0.9rem'></yd-icon>
		</router-link>	
	</div>
	<router-link :to="fun.getUrl('signrecord')">
		<div class='record'>
			<span>累计签到奖励记录</span>
			<i class="fa fa-angle-right"></i>
  		</div>
	  </router-link>
	<date :signlog='sign_log'></date>  	
  </div>
</template>
<script>
import member_signcontroller from './member_signcontroller';
export default member_signcontroller;

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#sign{
	.sign-header{
		display: flex;
		justify-content: space-between;
		background:#99cc99;
		box-sizing:border-box;
		padding:0.4rem 2rem;
		line-height:3rem;
		position:relative;
		.yicon{
			position:absolute;
			z-index:100;
			right:0.7rem;
			top:-0.7rem;	
		}
		span{
			color:#fff;
		}
		.btn{
			width:3rem;
			height:3rem;
			background:#fff;
			border-radius:50%;
		}				
	}
	.record{
		display: flex;
		justify-content: space-between;
		height:2.5rem;
		line-height: 2.5rem;
		background:#fff;
		text-align:left;
		color:#333;
		font-size:14px;
		box-sizing:border-box;
		padding:0 0.875rem;
		margin:0.625rem 0;
		i{
			line-height: 2.5rem;
			font-size:1.5rem;
			color:#c9c9c9;
		}
		
		.icon{
			display:inline-block;
			width:0.55rem;
			height:0.55rem;
			border:solid 0.0625rem #000;
			border-left:transparent;
			border-bottom:transparent;
			transform:rotate(45deg)	;
			float:right;
			margin-top:0.3rem;

			
		}
	}
}

</style>