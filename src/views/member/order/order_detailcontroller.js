import cTitle from 'components/title';
import { MessageBox } from 'mint-ui';
import { Lazyload, Button } from 'mint-ui';
export default {
    data() {
        return {
            toi: this.fun.getKeyByI(),
            order_id: '',
            order_data: '',
            bottomStatus: '',
            selected: '1',
            allLoaded: false,
            isVirtual: false,
            receiver: '',
            mobile: '',
            address: '',
            pay_type_id: '',
            orderType: 'shop',
            order_pay_id: '',
            qrcode: '',
            showQrcode: false,
            //确认发货
            dialogVisible: false,
            expressName: '',
            numberName: '',
            addresseeInfo: '',
            options: [],

            //是否使用权益标识
            //isRight:false
        };
    },
    methods:
    {

        //初始化
        init() {
            this.order_id = '';
            this.order_data = '';
            this.bottomStatus = '';
            this.selected = '1';
            this.allLoaded = false;
            this.isVirtual = false;
            this.receiver = '';
            this.mobile = '';
            this.address = '';
            this.qrcode = '';
            this.showQrcode = false;
            this.dialogVisible = false;
            this.options = [];
        },

        operation(btn, order) {

            //this.actions=[{name:"无理由",method:"sheetAction"},{name:"不退了",method:"sheetAction"}];
            if (btn.value == 8) {
                this.checklogistics(order, btn);
            } else if (btn.value == 12) {
                this.deleteOrder(order, btn);

            } else if (btn.value == 10) {
                this.comment(order, btn);

            } else if (btn.value == 1) {
                this.toPay(order, btn);
            } else if (btn.value == 13) {
                //退款
                this.toRefund(order, btn);

            } else if (btn.value == 9) {
                //取消订单
                this.cancleOrder(order, btn);

            } else if (btn.value == 5) {
                //确认订单
                this.confirmOrder(order, btn);

            } else if (btn.value == 18) {
                //退款中
                this.toRefundDetail(order, btn);

            } else if (btn.value == 'cashierPay') {
                //退款中
                this.cashPayOrder(order, btn);

            } else if (btn.value == 'verification_code') {
                //验证核销
                this.verification(order, btn);

            } else if (btn.value == 20) {
                console.log("现金支付");
                //现金付款
                this.verificationCash(order, btn);
            } else if(btn.value == 3) {
                this.gotoRefund(order.id);
            } else if(btn.value == 40){
                this.gotoRefundCheck(order.id);
            } else if(btn.value == 4){
                this.gotoMakeSure(order.id);
            } else if(btn.value == 21){
                this.shopRecord();
            }else if(btn.value == 22){
                this.payMoney();
            }else if(btn.value == 23){
                this.dialogVisible = true;
                this.expressName = '';
                this.numberName = '';  
            }else if(btn.value == 24){
                this.deliverGoodsCancel();
            }else if(btn.value == 25){
                this.collectGoods();
            }else if(btn.value == 26){
                this.closeOrderPay();
            }

        },
        //确认支付
        payMoney(){
            MessageBox({
                title: '提示',
                message: '确认支付该订单?',
                showCancelButton: true
            }).then(action => {
                if (action == 'confirm') {
                    var that = this;
                    let json = {
                        order_id: that.$route.params.order_id,
                    }
                    $http.get('plugin.store-cashier.frontend.store.center.order-operation.pay', json).then(function (response) {
                        if (response.result == 1) {
                            that.getNetData();
                            that.$message({
                                message: '支付成功',
                                type: 'success'
                            });
                        } else {
                        }
                    }, function (response) {
                        console.log(response);
                    });
                }

            });
        },
        //关闭订单
        closeOrderPay(){
            MessageBox({
                title: '提示',
                message: '确定关闭订单?',
                showCancelButton: true
            }).then(action => {
                if (action == 'confirm') {
                    var that = this;
                    let json = {
                        order_id: that.$route.params.order_id,
                    }
                    $http.get('plugin.store-cashier.frontend.store.center.order-operation.close', json).then(function (response) {
                        if (response.result == 1) {
                            that.$router.push(that.fun.getUrl('storeOrderlist',{ status:'0', orderType: 'store' }));
                            that.$message({
                                message: '关闭订单成功',
                                type: 'success'
                            });
                        } else {
                        }
                    }, function (response) {
                        console.log(response);
                    });
                }

            });
        },
        //取消发货
        deliverGoodsCancel(){
            MessageBox({
                title: '提示',
                message: '确定取消发货?',
                showCancelButton: true
            }).then(action => {
                if (action == 'confirm') {
                    var that = this;
                    let json = {
                        order_id: that.$route.params.order_id,
                    }
                    $http.get('plugin.store-cashier.frontend.store.center.order-operation.cancel-send', json).then(function (response) {
                        if (response.result == 1) {
                            that.getNetData();
                            that.$message({
                                message: '取消发货成功',
                                type: 'success'
                            });
                        } else {
                        }
                    }, function (response) {
                        console.log(response);
                    });
                }

            });
        },
        //获取快递公司
        getCompany(){
            var that = this;
            $http.get('plugin.store-cashier.frontend.store.center.sendOrder', {order_id: that.$route.params.order_id}).then(function (response) {
                console.log('oo++3',response);
                if (response.result == 1) {
                    that.options = [];
                    that.options = response.data.express_companies;
                    that.addresseeInfo = response.data.address;
                } else {
                }
            }, function (response) {
                console.log(response);
            });
        },
        //选择快递公司监听
        selectCompany(value){
            console.log(value,this.expressName);
        },
        //确认收货
        collectGoods(){
            MessageBox({
                title: '提示',
                message: '确认收货?',
                showCancelButton: true
            }).then(action => {
                if (action == 'confirm') {
                    var that = this;
                    let json = {
                        order_id: that.$route.params.order_id,
                    }
                    $http.get('plugin.store-cashier.frontend.store.center.order-operation.receive', json).then(function (response) {
                        if (response.result == 1) {
                            that.getNetData();
                            that.$message({
                                message: '收货成功',
                                type: 'success'
                            });
                        } else {
                        }
                    }, function (response) {
                        console.log(response);
                    });
                }

            });
        },
        //确认发货取消
        sendCancel(){
            this.dialogVisible = false;
        },
        //确认发货
        sendGoogs(){
            var that = this;
            if(that.expressName == ''&&that.numberName == ''){
                that.$message.error('请选择快递公司和输入快递单号');
                return;
            }else if(that.expressName == ''){
                that.$message.error('请选择快递公司');
                return;
            }else if(that.numberName == ''){
                that.$message.error('请输入快递单号');
                return;
            }
            let json = {
                order_id: that.$route.params.order_id,
                express_code: that.expressName,
                express_sn: that.numberName,
            }
            $http.get('plugin.store-cashier.frontend.store.center.order-operation.send', json).then(function (response) {
                if (response.result == 1) {
                    that.dialogVisible = false;
                    that.getNetData();
                    that.$message({
                        message: '发货成功',
                        type: 'success'
                    });

                } else {
                }
            }, function (response) {
                console.log(response);
            });
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
              .then(_ => {
                done();
              })
              .catch(_ => {});
        },
        checklogistics(item, btn) {

            this.$router.push(this.fun.getUrl('logistics', { order: item }));

        },
        cashPayOrder(item, btn) {
            MessageBox({
                title: '提示',
                message: '确定此订单已付款?',
                showCancelButton: true
            }).then(action => {
                if (action == 'confirm') {
                    // this.datasource.splice(this.datasource.indexOf(item), 1);
                    this.sentRequest(btn.api, { order_id: item.id, order_pay_id: this.order_pay_id, "i": this.fun.getKeyByI(), "type": this.fun.getTyep() }, false);

                }

            });

        },

        verification(item, btn) {
            this.$router.push(this.fun.getUrl('orderVerification', { order_id: item.id, api: btn.api }));
        },

        verificationCash(item, btn) {
            MessageBox({
                title: '提示',
                message: '确定此订单已付款?',
                showCancelButton: true
            }).then(action => {
                if (action == 'confirm') {
                    // this.datasource.splice(this.datasource.indexOf(item), 1);
                    this.sentRequest('plugin.store-cashier.frontend.store.order-operation.pay', { order_id: item.id, order_pay_id: this.order_pay_id, "i": this.fun.getKeyByI(), "type": this.fun.getTyep() }, false);

                }

            });
        },

        cancleOrder(item, btn) {
            MessageBox({
                title: '提示',
                message: '确定取消此订单?',
                showCancelButton: true
            }).then(action => {
                if (action == 'confirm') {
                    //删除当前选中的地址
                    // this.datasource.splice(this.datasource.indexOf(item), 1);
                    this.sentRequest(btn.api, { order_id: item.id, "i": this.fun.getKeyByI(), "type": this.fun.getTyep() }, false);

                }

            });

        },
        //删除订单
        deleteOrder(item, btn) {
            MessageBox({
                title: '提示',
                message: '确定删除此订单?',
                showCancelButton: true
            }).then(action => {
                if (action == 'confirm') {
                    //删除当前选中的地址
                    this.sentRequest(btn.api, { order_id: item.id, "i": this.fun.getKeyByI(), "type": this.fun.getTyep() }, false);

                }

            });
        },
        toPay(item, btn) {
            //type-2合并支付 type-1订单支付

            this.$router.push(this.fun.getUrl('orderpay', { status: 1, order_ids: item.id }));

        },
        //评价订单
        comment(item, btn) {

            this.$router.push(this.fun.getUrl('comment', { order: item }));

        },
        confirmOrder(item, btn) {
            MessageBox({
                title: '提示',
                message: '您确定' + btn.name + "?",
                showCancelButton: true
            }).then(action => {
                if (action == 'confirm') {
                    var that = this;
                    //this.$emit('ConfrimOrderNotification', item);
                    //调用接口通知服务器收到货物请求
                    $http.get(btn.api, { order_id: item.id, "i": this.fun.getKeyByI(), "type": this.fun.getTyep() }, '正在处理订单...').then(function (response) {
                        if (response.result == 1) {

                            //MessageBox(response.msg);
                            //that.$router.push({ name: "home", params: {} });

                            //that.$router.push(that.fun.getUrl('home', {}));
                            that.getNetData();

                            MessageBox.alert(response.msg);


                        } else {
                            //MessageBox(response.msg, '确定');
                            //that.$router.push({ name: "home", params: {} });

                            //that.$router.push(that.fun.getUrl('home', {}));
                            MessageBox.alert(response.msg);
                        }


                    }, function (response) {
                        MessageBox(response.msg, '确定');
                        //that.$router.push({ name: "home", params: {} });
                        that.$router.push(that.fun.getUrl('home', {}));
                    });

                } else {

                }

            });


        },
        toRefundDetail(item, btn) {

            this.$router.push(this.fun.getUrl('aftersales', { refund_id: item.refund_id }));
        },
        //追加评价
        reCommend(item, btn) {

        },
        //退款
        toRefund(item, btn) {
            //refund

            this.$router.push(this.fun.getUrl('refund', { order: item, type: 1 }));

        },
        //跳转商品详情页面
        toGoodsDetail(goods, isshow,showCourse) {
            if (isshow == 0) {
                if(showCourse ==1){
                    this.$router.push(this.fun.getUrl('CourseDetail',{goods_id:goods.goods_id}));
                }else if(showCourse ==0){
                    if(this.order_data.plugin_id == 32){
                        this.$router.push(this.fun.getUrl('goodsO2O',{id:goods.goods_id,tag:"o2o",store_id:goods.store_id}));
                    }else{
                        this.$router.push(this.fun.getUrl('goods', { id: goods.goods_id}));
                    }   
                    
                }else{
                    return;
                }   

                
            }
        },
        sentRequest(action, params, isIndicator) {
            var that = this;
            $http.get(action, params, '').then(function (response) {

                if (response.result == 1) {
                    MessageBox.alert(response.msg, '提示');
                    if (window.history.length <= 1) {
                        that.$router.push(that.fun.getUrl('home', {}));
                    } else {
                        that.$router.go(-1);
                    }
                } else {
                    MessageBox.alert(response.msg, '提示');

                }
            }, function (response) {
                // error callback
            });
        },
        //发起http请求
        
        getNetData(order_id) {
            var that = this;
            if (this.orderType == 'cashier') {
                var url = 'plugin.store-cashier.frontend.Order.detail';
            } else if (this.orderType == 'store') {
                var url = 'plugin.store-cashier.frontend.store.order-detail';
            } else {
                var url = 'order.detail';
            }

            $http.get(url, { order_id: that.$route.params.order_id, "i": this.fun.getKeyByI(), "type": this.fun.getTyep() }, '正在获取订单...').then(function (response) {
                console.log("显示",response)
                if (response.result == 1) {
                    var myData = response.data;
                    that.order_data = myData;
                    that.order_pay_id = myData.order_pay_id;
                    if (myData.address_info) {
                        that.address = myData.address_info.address;
                        that.mobile = myData.address_info.mobile;
                        that.receiver = myData.address_info.realname;
                    }

                    that.pay_type_id = myData.pay_type_id;

                } else {
                    MessageBox.alert(response.msg);
                    that.$router.go(-1);
                }
            }, function (response) {
                // error callback
            });

        },


        //退还跳转
        gotoRefund(val){
            this.$router.push(this.fun.getUrl("OrderReturn",{id:val}));
        },

          //退还跳转
        gotoRefundCheck(val){
            this.$router.push(this.fun.getUrl("OrderReturnCheck",{id:val}));
        },

        //待确定
        gotoMakeSure(val){
            this.$router.push(this.fun.getUrl("OrderReturnSure",{id:val}));
        },
        //setting sun
        //汇款记录
        shopRecord(){
            this.$router.push(this.fun.getUrl("OrderRecord",{order_id: this.$route.params.order_id,order_state: this.order_data.status_name}));
        },


    },

    activated() {
        if (this.$route.params.orderType && this.$route.params.orderType == 'cashier') {
            this.orderType = 'cashier';
        } else if (this.$route.params.orderType && this.$route.params.orderType == 'store') {
            this.orderType = 'store';
        } else {
            this.orderType = 'shop';
        }
        console.log('detail::', this.$route.params);
        console.log('detail::', this.orderType);

        //console.log( this.$store.state);
        this.init();
        
        
        
        
        
          console.log('routerlook',this.$route.params)
        this.toi = this.fun.getKeyByI();
        this.order_id = this.$route.params.order_id;
        this.getNetData(this.order_id);
        console.log(this.order_id);
        this.getCompany();
        //   console.log(this.order_data);
        //this.isVirtual  = this.order_data.isVirtual;


    },
    components: { cTitle }
}