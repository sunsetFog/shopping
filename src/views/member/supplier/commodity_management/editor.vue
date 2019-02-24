<template>
	<section id="goods-edit">
		<c-title :hide="false" text='商品编辑'></c-title>
		<section id="edit-a">
			<mt-field label="商品名称:" placeholder="请输入商品名称" v-model="cargon_data.title"></mt-field>
			<mt-field label="商品单位:" placeholder="请输入商品单位" v-model="cargon_data.sku"></mt-field>
			
			<!-- <ul>
				<li>
					<span>商品名称：</span>
					<input type="text" placeholder="请输入商品名称" v-model="cargon_data.title" >
				</li>
				<li>
					<span>商品单位：</span>  
					<input type="text" placeholder="请输入商品单位" v-model="cargon_data.sku">
				</li> 
				<li>
						<span style="float: left;">商品分类：</span>
						<span class="block" style="float: left;">
						<el-cascader
							expand-trigger="click"
							:options="options"
							v-model="selectedOptions3"
							@change="classifyChange">
						</el-cascader>
						</span>
				</li> -->
				<!-- <li>
					<span>商品分类：</span>
					<input type="text" placeholder="食品-饮品-牛奶" v-model="cargon_data.classification"> 
					<i class="fa fa-angle-right"></i> 
				</li> -->
			<!-- </ul> -->
		</section>

		<section style="height: 48px;background: white;margin-top: 10px;line-height: 48px;">
			<span style="float: left;font-size: 16px;padding-left: 10px;box-sizing: border-box;">商品分类：</span>
						<span class="block" style="float: left;">
						<el-cascader
							expand-trigger="click"
							:options="options"
							v-model="selectedOptions3"
							@change="classifyChange">
						</el-cascader>
			</span>
		</section>


		<section id="edit-b">
			<div class="top">
				<!-- setting sun -->
					<div style="height:3.125rem;text-align:left;line-height:3.125rem;padding-left: 10px;box-size: border-box;">
						<span style="font-size:16px;">商品图片：</span>
					</div>
					<div style="padding-bottom: 10px;box-sizing: border-box;text-align: center;">
						<div>
							<el-upload :action="uploadUrl" :on-preview="handlePreview" :limit="1" list-type="picture-card" :show-file-list="false" :on-exceed="handleExceed" :before-upload="beforeUpload" :on-success="handleStoreSuccess">
								<img v-if="imageUrl" :src="imageUrl" class="avatar">
								<i v-else class="el-icon-plus"></i>
							</el-upload>
						</div>
					</div>

			</div>
		</section>

		<section style="background: white;margin-top:0.625rem;padding-bottom: 10px;box-sizing: border-box">
				<div style="height:50px;text-align:left;padding-left:13px;line-height:50px;">
						<span style="font-size:16px;">其他图片：</span>
				</div>
				<div style="text-align: center;">
					<el-upload class="upload-demo" :data="{'attach':'upload'}" :on-change="handleChange" :action="uploadUrl" :on-preview="handlePreview" :on-remove="handleAptiRemove" :file-list="fileList2" list-type="picture-card" :on-exceed="handleExceed" :before-upload="beforeUpload" :on-success="handleAptiSuccess">
						<div style="width: 100%;height: 100%;background: rgba(45,45,45,0);position: relative;">
						<i class="el-icon-plus"></i>
						<div style="width: 100%;height: 100%;background: rgba(45,45,45,0);position: absolute;left: 0px;top:0px;z-index: 2;" @click.stop="occlusion()" v-if="upNumMax>=4">
						</div>
						</div>
					</el-upload>
				</div>
		</section>



		<section id="edit-c">
			<!-- <ul>
				<li>
					<span>商品现价：</span>
					<input type="text" placeholder="请输入商品现价" v-model="cargon_data.price">
				</li>
				<li>
					<span>商品原价：</span>  
					<input type="text" placeholder="请输入商品原价" v-model="cargon_data.market_price">
				</li>
				<li>
					<span>商品成本：</span>
					<input type="text" placeholder="1000" v-model="cargon_data.cost_price">  
				</li>
			</ul> -->
			<mt-field label="商品现价:" placeholder="请输入商品现价" type="number" v-model="cargon_data.price"></mt-field>
			<mt-field label="商品原价:" placeholder="请输入商品原价" type="number" v-model="cargon_data.market_price"></mt-field>
			<mt-field label="商品成本:" placeholder="请输入商品成本" type="number" v-model="cargon_data.cost_price"></mt-field>
		</section>
		<section id="edit-d">
			<!-- <ul>
				<li>
					<span>商品库存：</span>
					<input type="text" placeholder="请输入商品库存" v-model="cargon_data.stock">
				</li>
				<li> 
					<span>虚拟销量：</span>
					<input type="text" placeholder="请输入虚拟销量" v-model="cargon_data.virtual_sales">
				</li>
			</ul> -->
			<mt-field label="商品库存:" placeholder="请输入商品库存" type="number" v-model="cargon_data.stock"></mt-field>
			<!-- <mt-field label="虚拟销量:" placeholder="请输入虚拟销量" type="number" v-model="cargon_data.virtual_sales"></mt-field> -->
		</section>
		<section id="btn">
			<button type="button" @click="confirmationEditor">确认编辑</button>
		</section>
	</section>
</template>

<script>
import editor from "./editor_controller.js";
export default editor;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
// setting sun
.avatar {
		width: 100%;
		height: 100%;
}
.el-cascader{
	width: 15.625rem;
}


#goods-edit{
	text-align: left;
	padding-top:2.5rem;
	padding-bottom:3.875rem;
	#edit-b{
		background-color:#fff;
		margin-top:0.625rem;
		.top,.bottom{
			-padding:0 0.875rem;
			font-size:14px;
			h1{
				line-height: 2.25rem;
				text-align: left;
				font-weight: normal;
			}
			.icon{
				padding-top:1.125rem;
				width:4.5rem;
				height:4.5rem;
				background-color: #fafafa;
				font-size:12px;
				i{
					padding:0.125rem;
					background-color: #fff;
					border:solid 0.0625rem #ebebeb;
					border-radius: 1.25rem;
				}
				span{
					display:block;
					margin-top:0.25rem;
				}
			}
		}
		.bottom{
			border-bottom:none;
		}
		.top{
			.goods-header{
				display: flex;
				justify-content: space-between;
				height:3.75rem;
				line-height: 3.75rem;
				.fa{
					font-size:1.5rem;
					color:#c9c9c9;
					position: absolute;
					right:0.875rem;
					line-height: 3.75rem;
				}
			}
		}
	}
	#edit-goods-img{
		margin-top:0.625rem;
		background-color: #fff;
		font-size:16px;
		text-align: left;
		padding:0 0.875rem 0.625rem 0.875rem;
		span{
			display: block;
			line-height: 2.25rem;
		}
		.img-box{
			display: flex;
			flex-wrap: wrap;
			.img{
				width:4.875rem;
				height:4.875rem;
				border-radius: 0.125rem;
				overflow: hidden;
				background-color: #fafafa;
				margin-top:0.625rem;
			}
			.icon{
				z-index: 10;
				width:1.375rem;
				height:1.375rem;
				display: flex;
				justify-content: center;
					background-color: #ccc;
					border-radius: 50%;
					border:solid 0.125rem #fff;
					position: relative;
					left:-5.375rem;
					top:0.25rem;
					i{
						font-size:0.75rem;
						color:#fff;
						line-height: 1.25rem;
						display: block;
					}
				}
		}
		
	}
	#edit-c,#edit-a{
		margin-top:0.625rem;
		background-color: #fff;
		ul{
			li{
				height:2.75rem;
				line-height: 2.75rem;
				padding:0 0.875rem;
				border-bottom:solid 0.0625rem #ebebeb;
				font-size:16px;
				text-align: left;
				input{
					border:none;
					color:#8c8c8c;
				}
			}
			
		}
	}
	#edit-a{
		ul{
			li:last-child{
				border:none;
				i{
					font-size:1.5rem;
					color:#c9c9c9;
					position: absolute;
					right:0.875rem;
					line-height: 2.75rem;
				}
				input{
					font-size:14px;
				}
			}
		}
		
	}
	#edit-d{
		margin-top:0.625rem;
		background-color: #fff;
		ul{
			li{
				height:2.75rem;
				line-height: 2.75rem;
				padding:0 0.875rem;
				border-bottom:solid 0.0625rem #ebebeb;
				font-size:16px;
				text-align: left;
				input{
					border:none;
				}
			}
			li:last-child{
				border:none;
			}
		}
	}
	#btn{
		background-color: #fff;
		width:100%;
		position: fixed;
		bottom:0;
		z-index: 100;
		border-top:solid 0.0625rem #ebebeb;
		padding:0 0.875rem;
		margin-top:1.25rem;
		button{
			height:2.5rem;
			line-height: 2.5rem;
			border-radius: 0.1875rem;
			margin:0.375rem 0;
			width:100%;
			color:#fff;
			font-size:16px;
			border:none;
			background-color: #f15353;
		}
	}
}
</style>