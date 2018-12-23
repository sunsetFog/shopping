import cTitle from 'components/title';
import { height } from 'window-size';
// 上传图片弹信息
import {Toast } from 'mint-ui';
import { Field } from 'mint-ui';
export default{
    components: { cTitle },
	data(){
		return{
			cargon_data: {title: '',sku: '',thumb: '',price: '',market_price: '',cost_price: '',stock: ''},
			//setting sun
			imageUrl: '',
			uploadUrl:'', 
			fileList1: [],
			fileList2: [],
      		upNumMax: 0,   
			//选择分类
			options: [],
			selectedOptions3: [],
			sectionOptions: [],
			jumpState: true,
		}
	},
	//setting sun
	activated() {
		this.init();
		this.urlUp();	
		this.getClassifyJson();
		this.getGoodsJson();
	},
	methods: {
		//初始化
		init(){
			for(var item in this.cargon_data){
				this.cargon_data[item] = '';
			}
			this.imageUrl = '';
			this.selectedOptions3 = [];
			this.fileList1 = [];
			this.fileList2 = [];
			this.upNumMax = 0;
		},
		//获取数据
		getGoodsJson(){
			let that = this;
			let json = {goods_id: that.$route.params.goods_id};
			$http.post('plugin.store-cashier.frontend.store.goods.get-goods-detail', json).then(function (response) {
				console.log('显示editJson',response);
				if(response.result == 1){
					that.selectedOptions3 = [];
					that.selectedOptions3 = [Number(response.data.category_ids.parentid),Number(response.data.category_ids.childid)];
					that.cargon_data.title = response.data.title;
					that.cargon_data.sku = response.data.sku;
					that.imageUrl = response.data.thumb;
					that.cargon_data.thumb = response.data.thumb;
					if(response.data.thumb_url != null&&response.data.thumb_url != ''){
						that.fileList1 = [];
						that.fileList2 = [];
						that.upNumMax = response.data.thumb_url.length;
						for(var i=0;i<response.data.thumb_url.length;i++){
							that.fileList1.push({
								url: response.data.thumb_url[i]
							})
							that.fileList2.push({
								url: response.data.thumb_url[i]
							})
						}
					}
						
					that.cargon_data.price = response.data.price;
					that.cargon_data.market_price = response.data.market_price;
					that.cargon_data.cost_price = response.data.cost_price;
					that.cargon_data.stock = response.data.stock;
					// that.cargon_data.virtual_sales = response.data.virtual_sales;
				}else{
					that.$message.error(response.msg);
				}
			}, function (response) {
				console.log(response)
			});
		},
		//选择分类对接数据
		getClassifyJson(){
			let that = this;
			let json = {store_id: that.$route.params.store_id};
			$http.get('plugin.store-cashier.frontend.store.goods-category.get-category-by-store-id', json).then(function (response) {
						console.log('显示分类edit',response);
						if(response.result == 1){
							that.sectionOptions = [];
							for(var i=0;i<response.data.list.length;i++){
								that.sectionOptions.push({
									id: response.data.list[i].id,
									value: response.data.list[i].id,
									label: response.data.list[i].name,
									children: [],
								})
								for(var k=0;k<response.data.list[i].childrens.length;k++){
									that.sectionOptions[i].children.push({
										id: response.data.list[i].childrens[k].id,
										value: response.data.list[i].childrens[k].id,
										label: response.data.list[i].childrens[k].name,
									})
								}		
							}
								console.log('---option----',that.sectionOptions);
								that.options = that.sectionOptions;
						}else{
							that.$message.error(response.msg);
						}
						
			}, function (response) {
				console.log(response)
			});
		},
		//选择分类
		classifyChange(value) {
			console.log('选择分类返回值',value);
			this.selectedOptions3 = value;
		},
		//确认编辑
		confirmationEditor(){
			let that = this;
			that.jumpEvent();
			if(that.jumpState == true){
				// let json = {
				// 	store_id: that.$route.params.store_id,
				// 	goods: JSON.stringify(that.cargon_data),
				// 	category: JSON.stringify(),
				// 	};
				var newArr = [];
				if(that.fileList1.length != 0){
					for(var i=0;i<that.fileList1.length;i++){
						newArr.push(that.fileList1[i].url);
					}
				}else{
					newArr = [];
				}
				let json = {
						store_id: that.$route.params.store_id,
						category_pid: that.selectedOptions3[0],
						category_cid: that.selectedOptions3[1],
						goods_id: that.$route.params.goods_id,
						title: that.cargon_data.title,
						thumb: that.cargon_data.thumb,
						thumb_url: newArr,
						cost_price: that.cargon_data.cost_price,
						market_price: that.cargon_data.market_price,
						price: that.cargon_data.price,
						// virtual_sales: that.cargon_data.virtual_sales,
						sku: that.cargon_data.sku,
						stock: that.cargon_data.stock,
				}
				$http.post('plugin.store-cashier.frontend.store.goods.edit-goods',json).then(function (response) {
					console.log('显示',response);
					if(response.result == 1){
						that.$router.push(that.fun.getUrl("CommodityManagement",{store_id: that.$route.params.store_id}));
						that.$message({
							message: '修改成功',
							type: 'success'
						});
					}else{
						that.$message.error(response.msg);
					}
				}, function (response) {
					console.log(response);
				});

			}else{
				that.$message({
					message: '商品信息不完整',
					type: 'warning'
				});
			}
		},
		//跳转判断
		jumpEvent(){
			this.jumpState = true;
			for(var item in this.cargon_data){
					if(this.cargon_data[item] == ''){
						this.jumpState = false;
					}
			}
			if(this.selectedOptions3.length == 0){
				this.jumpState = false;
			}
			if(this.imageUrl == ''){
				this.jumpState = false;
			}
			console.log('--state----',this.jumpState);
		},
		//setting sun
		//商品图片
		//上传url
		urlUp(){
			var uiClass = document.getElementsByClassName('el-cascader__label')[0];
			uiClass.style.lineHeight = '48px';
			this.uploadUrl = this.fun.getRealUrl("plugin.store-cashier.frontend.store.goods.upload",{});
		},
		handleStoreSuccess(res, file) {
			console.log(res)
            this.imageUrl = URL.createObjectURL(file.raw);
            if (res.result == 1) {
                this.cargon_data.thumb = res.data.img;
            } else {
                Toast(res.msg);
            }
		},
		beforeUpload(file) {
            const isPNG = (file.type === 'image/png' || file.type === 'image/jpeg');
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isPNG) {
                this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isPNG && isLt2M;
		},
		//其他图片
		handleAptiSuccess(res, file) {
			console.log('------param-----',res,file);
				  if (res.result == 1) {
					// this.cargon_data.thumb_url.push(res.data.img);
					this.fileList1.push({
						url: res.data.img
					})
				  } else {
					  Toast(res.msg);
				  }
		  },
		  //删除上传
		  handleAptiRemove(file, fileList) {
				console.log('handleStoreRemove:',file, fileList);
				this.upNumMax = fileList.length;
				let f = file.url;
				if (f) {						
					let delIndex = '';
					this.fileList1.forEach(function(val, index, arr){
						if (val.url == f) {
						delIndex = index;
						}
					});
					this.fileList1.splice(delIndex, 1);
				}
				console.log('bingqilin',this.fileList1);
		  },
		  //遮挡上传
		  occlusion(){
			this.$message.warning('图片数量已达到上限');
		  },
		  //上传监听
		  handleChange(file, fileList) {
			  console.log('change--u',file,fileList);
			  this.upNumMax = fileList.length;
		  },

	}
}