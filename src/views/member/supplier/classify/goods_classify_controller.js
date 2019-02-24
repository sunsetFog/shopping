import cTitle from 'components/title';
import {Toast } from 'mint-ui';
export default{
    components: { cTitle },
    data(){
        return{
            classify_data: [],
        }
    },
    activated() {
        this.getJson();
        this.emptyMore();
    },
    methods:{
        getJson(){
            var that = this;
			console.log('--params---',that.$route.params);
			let json = {store_id: that.$route.params.store_id};
			$http.post('plugin.store-cashier.frontend.store.goods-category.get-category-by-store-id',json).then(function (response) {
				console.log('显示classify',response);
				if(response.result == 1){
                    that.classify_data = [];
                    for(var i=0;i<response.data.list.length;i++){
                        response.data.list[i].btn_active = false;
                        response.data.list[i].level_active = false;
                        for(var k=0;k<response.data.list[i].childrens.length;k++){
                            response.data.list[i].childrens[k].btn_active = false;
                            response.data.list[i].childrens[k].level_active = false;
                            // for(var s=0;s<response.data.list[i].childrens[k].thirds.length;s++){
                            //     response.data.list[i].childrens[k].thirds[s].btn_active = false;
                            //     response.data.list[i].childrens[k].thirds[s].level_active = false;
                            // }
                        }
                    }
                    that.classify_data = response.data.list;
                    console.log(that.classify_data)
				}else{
					that.$message.error(response.msg);
				}
			}, function (response) {
				console.log(response);
			});	
        },
        classifyRoute(params,level,index,index2,index3){
            if(params == 1){
                if(level == 2){
                    this.$router.push(this.fun.getUrl("AddClassify",{store_id: this.$route.params.store_id,classify_id: this.classify_data[index].id,level: level}));
                }else if(level == 3){
                    this.$router.push(this.fun.getUrl("AddClassify",{store_id: this.$route.params.store_id,classify_id: this.classify_data[index].childrens[index2].id,level: level}));
                }           
            }else if(params == 2){
                if(level == 1){
                    this.$router.push(this.fun.getUrl("FirstEdit",{store_id: this.$route.params.store_id,classify_id: this.classify_data[index].id,level: level}));
                }else if(level == 2){
                    this.$router.push(this.fun.getUrl("FirstEdit",{store_id: this.$route.params.store_id,classify_id: this.classify_data[index].childrens[index2].id,level: level}));
                }else if(level == 3){
                    this.$router.push(this.fun.getUrl("FirstEdit",{store_id: this.$route.params.store_id,classify_id: this.classify_data[index].childrens[index2].thirds[index3].id,level: level}));
                }
            }
        },
        addClassify(){
            console.log('uiiooo');
            this.$router.push(this.fun.getUrl("AddClassify",{store_id: this.$route.params.store_id,classify_id: 'add',level: 1}));
        },
        //展开
        oneLevel(level,index,index2){
            if(level == 1){
                if(this.classify_data[index].level_active == true){
                    this.emptyMore();
                    // this.classify_data[index].level_active = false;
                }else{
                    if(this.classify_data[index].childrens.length != 0){
                        this.emptyMore();
                        this.classify_data[index].level_active = true;
                    }else{
                        this.$message({
                            message: '此类暂无数据',
                            type: 'error'
                        });
                    }  
                }
            }else if(level == 2){
                if(this.classify_data[index].childrens[index2].level_active == true){
                    this.emptyMore();
                    this.classify_data[index].level_active = true;
                    // this.classify_data[index].childrens[index2].level_active = false;
                }else{
                    if(this.classify_data[index].childrens[index2].thirds.length != 0){
                        this.emptyMore();
                        this.classify_data[index].level_active = true;
                        this.classify_data[index].childrens[index2].level_active = true;
                    }else{
                        this.$message({
                            message: '此类暂无数据',
                            type: 'error'
                        });
                    }
                }
            }
        },
        //更多
        levelMore(level,index,index2,index3){
            if(level == 1){
                if(this.classify_data[index].btn_active == true){
                    this.emptyMore();
                    // this.classify_data[index].btn_active = false;
                }else{
                    this.emptyMore();
                    this.classify_data[index].btn_active = true;
                }
            }else if(level == 2){
                if(this.classify_data[index].childrens[index2].btn_active == true){
                    this.emptyMore();
                    this.classify_data[index].level_active = true;
                    // this.classify_data[index].childrens[index2].btn_active = false;
                }else{
                    this.emptyMore();
                    this.classify_data[index].level_active = true;
                    this.classify_data[index].childrens[index2].btn_active = true;
                }
            }else if(level == 3){
                if(this.classify_data[index].childrens[index2].thirds[index3].btn_active == true){
                    this.emptyMore();
                    this.classify_data[index].level_active = true;
                    this.classify_data[index].childrens[index2].level_active = true;
                    // this.classify_data[index].childrens[index2].thirds[index3].btn_active = false;
                }else{
                    this.emptyMore();
                    this.classify_data[index].level_active = true;
                    this.classify_data[index].childrens[index2].level_active = true;
                    this.classify_data[index].childrens[index2].thirds[index3].btn_active = true;
                }
            }
            
        },
        //清空
        emptyMore(){
            for(var i=0;i<this.classify_data.length;i++){
                this.classify_data[i].btn_active = false;
                this.classify_data[i].level_active = false;
                for(var k=0;k<this.classify_data[i].childrens.length;k++){
                    this.classify_data[i].childrens[k].btn_active = false;
                    this.classify_data[i].childrens[k].level_active = false;
                    // for(var s=0;s<this.classify_data[i].childrens[k].thirds.length;s++){
                    //     this.classify_data[i].childrens[k].thirds[s].btn_active = false;
                    //     this.classify_data[i].childrens[k].thirds[s].level_active = false;
                    // }
                }
            }
        },
        //删除
        deleteClassify(params,index,index2,index3){
            var that = this;
            that.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {

                let deleteId = '';
                if(params == 1){
                    deleteId = that.classify_data[index].id;
                    if(that.classify_data[index].childrens.length != 0){
                        that.$message({
                            message: '先清空二级分类',
                            type: 'error'
                        });
                        return;
                    }
                }else if(params == 2){
                    deleteId = that.classify_data[index].childrens[index2].id;
                    // if(that.classify_data[index].childrens[index2].thirds.length != 0){
                    //     that.$message({
                    //         message: '先清空三级分类',
                    //         type: 'error'
                    //     });
                    //     return;
                    // }
                }else if(params == 3){
                    deleteId = that.classify_data[index].childrens[index2].thirds[index3].id;
                }
                // console.log(params,index,index2,index3,deleteId);
                  
                        let json = {id: deleteId};
                        $http.post('plugin.store-cashier.frontend.store.goods-category.del-category',json).then(function (response) {
                            console.log('显示delete',response);
                            if(response.result == 1){
                                if(params == 1){
                                    that.classify_data.splice(index,1);
                                }else if(params == 2){
                                    that.classify_data[index].childrens.splice(index2,1);
                                }else if(params == 3){
                                    that.classify_data[index].childrens[index2].thirds.splice(index3,1);
                                }
                                that.$message({
                                    message: '删除成功',
                                    type: 'success'
                                });
                                
                            }else{
                                that.$message.error(response.msg);
                            }
                        }, function (response) {
                            console.log(response);
                        });
              }).catch(() => {
                that.$message({
                  type: 'info',
                  message: '已取消删除'
                });          
              });
        },
    }
}