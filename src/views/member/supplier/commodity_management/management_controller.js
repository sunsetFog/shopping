import cTitle from 'components/title';
import {Toast } from 'mint-ui';
var commodity = [
	{
		id: 1,
		title: '荔枝',
		thumb: '',
		price: 1100,
		stock: 1000,
		virtual_sales: 200,
		edit_active: false,
	},
	{
		id: 2,
		title: '芒果',
		thumb: '',
		price: 1200,
		stock: 1000,
		virtual_sales: 500,
		edit_active: false,
	},
	{
		id: 3,
		title: '龙眼',
		thumb: '',
		price: 1400,
		stock: 1300,
		virtual_sales: 700,
		edit_active: false,
	},
]
export default{
    components: { cTitle },
	data(){
		return{
			commodity_data: [],
			goods_length: '',
		}
	},
	activated() {
		this.init();
		this.getJson();
	},
	methods:{
		init(){
			this.emptyEditActive();
		},
		//商品数据获取
		getJson(){
			var that = this;
			console.log('--params---',that.$route.params);
			// that.commodity_data = commodity;
			let json = {store_id: that.$route.params.store_id};
			$http.post('plugin.store-cashier.frontend.store.goods.get-goods-list',json).then(function (response) {
				console.log('显示manage',response);
				if(response.result == 1){
					that.commodity_data = [];
					for(var i=0;i<response.data.goods_data.length;i++){
						response.data.goods_data[i].edit_active = false;
					}
					that.goods_length = response.data.count;
					that.commodity_data = response.data.goods_data;
					
					console.log('--managJson',that.commodity_data);
				}else{
					that.$message.error(response.msg);
				}
			}, function (response) {
				console.log(response);
			});	
		},
		//路由跳转
		routeTake(response){
			if(response == 1){
				this.$router.push(this.fun.getUrl("CommodityEditor",{store_id: this.$route.params.store_id}));
			}else if(response == 2){
				this.$router.push(this.fun.getUrl("CommodityRelease",{store_id: this.$route.params.store_id}));
			}else if(response == 3){
				this.$router.push(this.fun.getUrl("SelectionClassification",{store_id: this.$route.params.store_id}));
			}
			this.emptyEditActive();
		},
		//更多
		moreEvent(index){
			console.log('more--ya',index)
			if(this.commodity_data[index].edit_active == false){
				this.emptyEditActive();
				this.commodity_data[index].edit_active = true;
			}else{
				this.emptyEditActive();
			}
			
			console.log(this.commodity_data[index].edit_active)
		},
		//清空编辑删除状态
		emptyEditActive(){
			for(var i=0;i<this.commodity_data.length;i++){
				this.commodity_data[i].edit_active = false;
			}
		},
		editJumpEvent(index){
			this.$router.push(this.fun.getUrl("CommodityEditor",{store_id: this.$route.params.store_id,goods_id: this.commodity_data[index].id}));
		},
		//商品删除
		commodityDelete(index){
			console.log(index);
			this.emptyEditActive();
			this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
			var that = this;
			let json = {goods_id: that.commodity_data[index].id};
			$http.post('plugin.store-cashier.frontend.store.goods.destroy-goods',json).then(function (response) {
				console.log('显示',response);
				if(response.result == 1){
					that.$message({
						message: '商品删除成功',
						type: 'success'
					});
					that.commodity_data.splice(index,1);
					that.goods_length = Number(that.goods_length) - 1;
				}else{
					that.$message.error(response.msg);
				}
			}, function (response) {
				console.log(response);
			});	


			}).catch(() => {
				this.$message({
				  type: 'info',
				  message: '已取消删除'
				});          
			});
		},
		//搜索商品
		// searchGoods(){
		// 	console.log('---search');
		// }
		
	}
}