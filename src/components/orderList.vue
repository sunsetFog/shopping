<template>
  <div id="orderList">
    <el-checkbox-group v-model="checkList" @change="multiplePayChange">
      <div class="shop" v-for="order in datasource">
        <div class="title">
          <el-checkbox :label="order.id" v-if="status == 1">&nbsp;</el-checkbox>
          <h4>订单号：{{order.order_sn}}</h4> <span>{{order.status_name}}</span>
        </div>
        <router-link :to='fun.getUrl(detailUrl,{order_id:order.id, orderType:orderType})' v-for=" good in order.has_many_order_goods">
          <div class="goods">
            <div class="img"><img :src="good.thumb"></div>
            <div class="warp">
              <div class="inner">
                <div class="name">{{good.title}}</div>
                <div class="option">规格: {{good.goods_option_title}}</div>
                <!-- <div class="option" v-if="order.plugin_id == 40?true:false">押金</div> -->
              </div>
              <div class="price">
                <div class="money"> <small>￥</small>{{good.price}}<span v-if="order.plugin_id == 40?true:false">/天</span></div>
                <div> ×{{good.total}}</div>
                <!-- <div v-if="order.plugin_id == 40?true:false">￥300</div> -->
              </div>
            </div>
          </div>
        </router-link>
        <div class="title">
          <h4 style="text-align:right;">共 {{order.goods_total}} 件商品 实付：￥<b>{{order.price}}</b></h4>
          <!--<span class="del"
                            v-if="order.button_models.length == 1"
                            @click="operation(order.button_models[0],order)">{{order.button_models[0].name}}</span>-->
        </div>
        <div class="allbt" v-if="order.button_models.length > 0">
          <span v-for="item in order.button_models" @click="operation(item,order)">{{item.name}}</span>
        </div>
      </div>
    </el-checkbox-group>
    <div class="qrcode">
      <mt-popup v-model="showQrcode" position="right" modal="false">
        <div>
          <img :src="qrcode" style="width:100%">
          <div style="height: 1.875rem;">请核销员扫码</div>
        </div>
      </mt-popup>
    </div>

<el-dialog title="确认发货" :visible.sync="dialogVisible">
	<section style="width: 100%;text-align: left;">
		<div style="width: 100%;height: 80px;" v-if="addresseeInfo">
			<div style="width: 28%;height: 30px;float: left;line-height: 30px;">收件人信息:</div>
			<div style="width: 70%;float: left;">
				<div style="width: 100%;height: 30px;line-height: 30px;overflow: visible;">
					<span>收件人:{{addresseeInfo.realname}}</span>
					<span>({{addresseeInfo.mobile}})</span>
				</div>
				<div style="width: 100%;overflow: visible;margin-bottom: 10px;">
					收货地址:{{addresseeInfo.address}}
				</div>
			</div>
		</div>
		<div style="width: 100%;height: 45px;line-height: 45px;">
			<div style="float: left;width: 28%;height: 45px;">快递公司:</div>
			<div style="float: left;height: 45px;width: 60%;">
				<!-- <el-input v-model="expressName" placeholder="请输入快递公司"></el-input> -->
				<el-select v-model="expressName" placeholder="请选择" @change="selectCompany">>
					<el-option
					v-for="item in options"
					:key="item.value"
					:label="item.name"
					:value="item.value">
					</el-option>
				</el-select>
			</div>
		</div>
		<div style="width: 100%;height: 45px;line-height: 45px;">
			<div style="float: left;width: 28%;height: 45px;">快递单号:</div>
			<div style="float: left;height: 45px;width: 60%;">
				<el-input v-model="numberName" placeholder="请输入快递单号"></el-input>
			</div>
		</div>

	</section>
  
  <div slot="footer" class="dialog-footer">
    <el-button @click="sendCancel">取 消</el-button>
    <el-button type="primary" @click="sendGoogs">确 定</el-button>
  </div>
</el-dialog>


  </div>
</template>
<script>
  import {
    Actionsheet
  } from "mint-ui";
  import {
    MessageBox
  } from "mint-ui";
  export default {
    //select_inde-当前选择行,datasource-数据源,currentdata-当前选择的数据
    props: ["datasource", "status", "getAllLoaded", "orderType", "detailUrl"],
    data() {
      return {
        isShow: false,
        toi: this.fun.getKeyByI(),
        checkList: [],
        loading: false,
        allLoaded: false,
        goload: true,
        qrcode: "",
        showQrcode: false,
        //确认发货
        dialogVisible: false,
        expressName: '',
        numberName: '',
        addresseeInfo: '',
        options: [],
        orderPayId: '',
        //   actions:[],
        //   sheetVisible:''
      };
    },
    methods: {
      setCheckList() {
        this.checkList = [];
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
        } else if (btn.value == "cashierPay") {
          //退款中
          this.cashPayOrder(order, btn);
        } else if (btn.value == "verification_code") {
          this.verification(order, btn);
        } else if (btn.value == 20) {
          this.verificationCash(order, btn);
        } else if (btn.value == 21) {
          // console.log('转账信息',order);
          // this.$router.push(this.fun.getUrl("OrderRecord",{order_id: order.id,order_state: order.status_name}));
          this.$router.push(this.fun.getUrl("OrderRecord",{order_id: order.id,order_state: order.status_name}));
        }else if(btn.value == 22){
          this.orderPayId = order.id; 
          this.payMoney();
                
        }else if(btn.value == 23){
          this.orderPayId = order.id; 
          this.getCompany();
          this.dialogVisible = true;
          this.expressName = '';
          this.numberName = ''; 
                
        }else if(btn.value == 24){
          this.orderPayId = order.id; 
          this.deliverGoodsCancel();
                
        }else if(btn.value == 25){
            this.orderPayId = order.id;
            this.collectGoods();
        }else if(btn.value == 26){
          this.orderPayId = order.id; 
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
                        order_id: that.orderPayId,
                    }
                    $http.get('plugin.store-cashier.frontend.store.center.order-operation.pay', json).then(function (response) {
                        if (response.result == 1) {
                            that.$emit("ConfrimOrderNotification", 'pay');
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
                        order_id: that.orderPayId,
                    }
                    $http.get('plugin.store-cashier.frontend.store.center.order-operation.close', json).then(function (response) {
                        if (response.result == 1) {
                            that.$emit("ConfrimOrderNotification", 'pay');
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
                        order_id: that.orderPayId,
                    }
                    $http.get('plugin.store-cashier.frontend.store.center.order-operation.cancel-send', json).then(function (response) {
                        if (response.result == 1) {
                          that.$emit("ConfrimOrderNotification", 'pay');
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
                        order_id: that.orderPayId,
                    }
                    $http.get('plugin.store-cashier.frontend.store.center.order-operation.receive', json).then(function (response) {
                        if (response.result == 1) {
                            that.$emit("ConfrimOrderNotification", 'pay');
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
        //获取快递公司
        getCompany(){
            var that = this;
            $http.get('plugin.store-cashier.frontend.store.center.sendOrder', {order_id: that.orderPayId}).then(function (response) {
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
        //快递公司选择监听
        selectCompany(value){
            console.log(value,this.expressName);
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
                order_id: that.orderPayId,
                express_code: that.expressName,
                express_sn: that.numberName,
            }
            $http.get('plugin.store-cashier.frontend.store.center.order-operation.send', json).then(function (response) {
                if (response.result == 1) {
                    that.dialogVisible = false;
                    that.$emit("ConfrimOrderNotification", 'pay');
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
      //多订单合并支付的响应方法
      multiplePayChange(value) {
        this.$emit("MultiplePayNotification", this.checkList);
      },
      toDetail(order) {
        this.$emit("ToDetailNotification", order);
      },
      //查看物流
      checklogistics(item, btn) {
        this.$router.push(this.fun.getUrl("logistics", {
          order: item
        }));
      },
      cashPayOrder(item, btn) {
        MessageBox({
          title: "提示",
          message: "确定此订单已付款?",
          showCancelButton: true
        }).then(action => {
          if (action == "confirm") {
            // this.datasource.splice(this.datasource.indexOf(item), 1);
            this.sentRequest(
              btn.api, {
                order_id: item.id,
                order_pay_id: this.order_pay_id,
                i: this.fun.getKeyByI(),
                type: this.fun.getTyep()
              },
              false
            );
          }
        });
      },
      verification(item, btn) {
        this.$router.push(
          this.fun.getUrl("orderVerification", {
            order_id: item.id,
            api: btn.api
          })
        );
      },
      verificationCash(item, btn) {
        MessageBox({
          title: "提示",
          message: "确定此订单已付款?",
          showCancelButton: true
        }).then(action => {
          if (action == "confirm") {
            // this.datasource.splice(this.datasource.indexOf(item), 1);
            this.sentRequest(
              btn.api, {
                order_id: item.id,
                order_pay_id: this.order_pay_id,
                i: this.fun.getKeyByI(),
                type: this.fun.getTyep()
              },
              false
            );
          }
        });
      },
      //取消订单
      cancleOrder(item, btn) {
        MessageBox({
          title: "提示",
          message: "确定取消此订单?",
          showCancelButton: true
        }).then(action => {
          if (action == "confirm") {
            //删除当前选中的地址
            this.datasource.splice(this.datasource.indexOf(item), 1);
            this.sentRequest(btn.api, {
              order_id: item.id
            }, false);
          }
        });
      },
      //删除订单
      deleteOrder(item, btn) {
        MessageBox({
          title: "提示",
          message: "确定删除此订单?",
          showCancelButton: true
        }).then(action => {
          if (action == "confirm") {
            //删除当前选中的地址
            this.datasource.splice(this.datasource.indexOf(item), 1);
            this.sentRequest(btn.api, {
              order_id: item.id
            }, false);
          }
        });
      },
      toPay(item, btn) {
        //status-2合并支付 type-1订单支付
        this.$router.push(
          this.fun.getUrl("orderpay", {
            status: 2,
            order_ids: item.id
          })
        );
      },
      //评价订单
      comment(item, btn) {
        this.$router.push(this.fun.getUrl("comment", {
          order: item
        }));
      },
      //确认收货
      confirmOrder(item, btn) {
        MessageBox({
          title: "提示",
          message: "您确定收到货物?",
          showCancelButton: true
        }).then(action => {
          if (action == "confirm") {
            //this.$emit('ConfrimOrderNotification');
            //调用接口通知服务器收到货物请求
            var that = this;
            $http.get(btn.api, {
              order_id: item.id
            }, "操作中...").then(
              function(response) {
                if (response.result == 1) {
                  that.$emit("ConfrimOrderNotification", item);
                } else {
                  MessageBox.alert(response.msg);
                }
              },
              function(response) {
                // error callback
              }
            );
          } else {}
        });
      },
      //追加评价
      reCommend(item, btn) {},
      toRefundDetail(item, btn) {
        this.$router.push(
          this.fun.getUrl("aftersales", {
            refund_id: item.refund_id
          })
        );
      },
      //退款
      toRefund(item, btn) {
        //refund
        this.$router.push(
          this.fun.getUrl("refund", {
            order_id: item.id,
            type: 1
          })
        );
      },
      sentRequest(action, params, isIndicator) {
        var that=this;
        $http.get(action, params, "").then(
          function(response) {
            console.log('显示',response);
            if (response.result == 1) {
              MessageBox.alert(response.msg, "提示");
              if (window.history.length <= 1) {
                that.$router.push(that.fun.getUrl("home", {}));
              } else {
                that.$router.go(-1);
              }
            } else {
              MessageBox.alert(response.msg, "提示");
            }
          },
          function(response) {
            // error callback
          }
        );
      },
      sheetAction() {
        console.log(this.sheetVisible);
      },
      //更新
      loadTop() {
        // this.initData();
        // this.getOrderList(this.selected);
        alert("刷新");
        this.$refs.loadmore.onTopLoaded();
      },
      // 加载更多
      loadBottom() {
        console.log("加载更多");
        this.$refs.loadmore.onBottomLoaded();
        //this.allLoaded = true;// 若数据已全部获取完毕,不在显示加载更多组件
        if (this.getAllLoaded) {
          this.allLoaded = false;
        } else {
          this.allLoaded = true;
        }
      }
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#orderList{
  .mint-navbar .mint-tab-item{
    padding:0.875rem 0;
  }
}
.olis {
  height: 100vh;
}
.shop {
  background: #fff;
  margin-top: 0.625rem;
  border-bottom: 0.0625rem solid #ebebeb;
  border-top: 0.0625rem solid #ebebeb;
  a {
    color: #000000;
  }
  .title:after {
    content: "";
    display: block;
    clear: both;
  }
  .title {
    padding: 0 0.875rem;
    display: flex;
    align-items: center;
    h4 {
      text-align: left;
      font-weight: normal;
      line-height: 2.25rem;
      flex: 8;
      font-size: 14px;
      b {
        font-size:18px;
      }
    }
    span {
      color: #f15353;
      text-align: right;
      margin-right: 0.0625rem;
      flex: 2;
      font-size:14px;
    }
  }
  span.del {
    border-radius: 0.875rem;
    border: 0.0625rem solid #f15353;
    text-align: center;
    padding: 0.25rem 0.625rem;
    font-size: 12px;
  }
  .allbt {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    border-top: 0.0625rem solid #ebebeb;
    height:2.5rem;
    padding-right:0.875rem;
    span {
      border-radius: 0.1875rem;
      border: 0.0625rem solid #666;
      margin-left:0.625rem;
      padding: 0.25rem 0.625rem;
      text-align: center;
      font-size: 12px;
    }
    // .allbt {
    //   display: flex;
    //   align-items: center;
    //   justify-content: flex-end;
    //   border-top: 1px solid #e2e2e2;
    //   height: 2.75rem;
    //   span {
    //     border-radius: 0.25rem;
    //     border: 1px solid #666;
    //     margin: 0 10px 0 0;
    //     padding: 0.25rem 0.625rem;
    //     text-align: center;
    //     font-size: 12px;
    //   }
    //   span:last-child {
    //     color: #f15353;
    //     border: 1px solid #f15353;
    //   }
    // }
  }
  .goods:after {
    content: "";
    display: block;
    clear: both;
  }
  .goods {
    /*display: -webkit-box;
              display: -ms-flexbox;
              display: flex;
              -webkit-box-align: stretch;
              -ms-flex-align: stretch;
              align-items: stretch;
              -webkit-box-orient: horizontal;
              -webkit-box-direction: normal;
              -ms-flex-flow: row wrap;
              flex-flow: row wrap;
              */
    width: 100%;
    box-sizing: border-box;
    background: #fafafa;
    .img {
      padding:0.625rem 1rem;
      /*flex: 1;*/
      width: 26vw;
      float: left;
      display: inline-block;
      /*background:blue;*/
      img {
        width: 100%;
      }
    }
    .warp {
      width: 74vw;
      padding:0.625rem 1rem 0.625rem 0;
      float: left;
      display: inline-block;
      .inner {
        width: 70%;
        float: left;
        box-sizing: border-box;
        text-align: left;
        .name {
          font-size:14px;
          text-align: left;
          color: #333333;
          margin-bottom: 0.625rem;
        }
      }
      .price {
        font-size:14px;
        width: 30%;
        align-items: center;
        text-align: right;
        color: #333333;
        box-sizing: border-box;
        float: left;
        .money {
          margin-bottom: 0.625rem;
        }
        small{
          font-size:12px;
        }
      }
    }
    .option {
      color: #888;
      font-size: 12px;
      flex: 1;
    }
  }
  #tbs {
    display: flex;
    align-items: center;
    background: #fff;
    flex-flow: row wrap;
    padding: 0.625rem;
    line-height: 1.5rem;
    border-bottom: 0.0625rem solid #d9d9d9;
     .left {
      text-align: left;
      flex: 50%;
      color: #858585;
    }
    .right {
      text-align: right;
      flex: 50%;
    }
    .add {
      color: #259b24;
    }
    .reduce {
      color: #e51c23;
    }
  }
}
</style>
