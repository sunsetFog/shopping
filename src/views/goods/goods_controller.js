import {mapState} from 'vuex';
import { Loadmore } from 'mint-ui';
import { Indicator, Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import { Swipe, SwipeItem } from 'components/meswipe';
import cMyswipe from 'components/myswipe';


var specsManage = [];//选择池 用于排序
var optionsId = "";//选择后的 规格ID
var optionsMaxCount = 1;

const SUBMIT_ACTION_CART = "-1";//添加到购物车
const SUBMIT_ACTION_BUY = "-2";//立即购买
var submitActionTag = "";

var goods_id = "";

var share_tag = "-1";

//商品详情
var currentTabIndex = "0";
//标记 防止重复加载
var is_first_content = false;
var is_second_content = false;
var is_third_content = false;
//商品详情

//wx.config(response.data.js); 微信认证
export default {
  data() {
    return {

      //是否是o2o
      is_o2o: false,
      integral:window.localStorage.integral,
      toi: this.fun.getKeyByI(),
      title: '商品详情',
      hoet: false,
      goodTop: false,
      popupSpecs: false,
      radio: '',
      goodsInfo: {},
      popThumb: "",
      popStock: 0,
      popPrice: 0,
      goodsDescription: "",
      goodsCount: 1,
      favorite: false,
      isGoods: false,
      cservice: '',
      //商品详情
      first_content: "",
      second_content: "",
      third_content: [],
      activeName: 'first',
      show: true,
      //商品详情
      isAddCart: false,
      popupSpecs2: false,//无规格选择商品数量
      isGoodsLove: false,//是否显示爱心值
      goods_love_cash: 0,//爱心值 现金
      goods_love_deduction: 0,//爱心值抵扣
      goods_love_name: "",//爱心值title

      //海报显隐
      posterShow:false,
      posterImg:"",
      //活动显示隐藏
      activityShow:false,
      //商城活动
      activityItem:{},

      //商城活动默认第一个
      firstActivityBtn:"",
      //商城活动默认第一个内容
      firstActivityCon:"",

      //商城活动点击开关
      activitySwitch:false,

      //底部margin值开关
      isMarginBottom:false,

      //是否租赁商品
      isRent:false,

      isRight:false,

      //立即购买
      isRentBuyShow:false,

      //限时购开始时间
      beginTime:0,

      //显示购结束时间

      endTime:0,

      endTimeStr:"",

      //限时购开关
      isBuy:false,

      isTime:false,
      //o2o购物车显示

      showCart:false,

      //
      cartsNum:0,


      carts:[],

      cartsTotal:0.00,

      goodsCarts:[],


      //购物车id
      card_id:0,

      //o2o商品数量
      o2oCount:0,

      //门店名字
      o2oName:"",

      //门店电话

      o2oPhone:"",


      o2oLat:"",

      o2olng:"",

      timeLimit:"",

      //柜子商品--开始

      //柜子商品--标记

      isCup:true
      
      //柜子商品--结束

       


    }
  },

  activated() {
    this.posterShow = false;
    this.slider();
    this.toi = this.fun.getKeyByI();
    this.goodTop = false;
    if (!this.fun.isTextEmpty(this.fun.getKey("share_tag"))) {
      share_tag = this.fun.getKey("share_tag");
    }

    //初始化一下参数
    this.goodsInfo = {};
    this.isGoods = false;
    this.goodsCount = 1;
    this.popupSpecs = false;
    this.popupSpecs2 = false;
    this.isGoodsLove = false;
    this.isMarginBottom=false;

    this.isRent=false;

    this.isRentBuyShow=false;

    submitActionTag = "";
    optionsId = "";
    specsManage = [];
    optionsMaxCount = 1;


    //门店购物车id

    this.card_id=this.$route.params.cartId;

    goods_id = this.$route.params.id;

    if (!this.fun.isTextEmpty(this.$route.params.tag) && this.$route.params.tag == "o2o") {

      this.is_o2o = true;
      console.log(this.is_o2o);
    } else {
      this.is_o2o = false;
      console.log(this.is_o2o);
    }

    //柜子商品

    if(!this.fun.isTextEmpty(this.$route.params.mark)){
      this.isCup=false;
    }else{
      this.isCup=true;
    }



    //初始化客服参数
    this.initCservice("");
    //商品详情 初始化参数
    this.initData();

    this.getData();//获取数据
    this.isFavorite();//获取是否收藏
    

    // $http.get('goods.goods.get-goods',{id:goods_id}).then(response =>{
    //   if(response.result == 1){
    //     if(response.data.is_course == 1){
    //       if(response.data.is_course == 1){
    //         this.$router.push(this.fun.getUrl('CourseDetail',{goods_id:goods_id}));
    //       }
    //     }
    //   }
    // }).catch(error =>{
    //   console.log(error)
    // })
    console.log(this.zoneId);

  },

  mounted() {
    this.toi = this.fun.getKeyByI();
    //goodinfo
    console.log('说到底', this.$refs.goodinfo.offsetTop);

    this.slider();


  },

  methods: {
    //初始化客服参数
    initCservice(newCservice) {

      if (!this.fun.isTextEmpty(newCservice)) {
        this.cservice = newCservice;
        return;
      }

      if (!this.fun.isTextEmpty(this.$store.state.temp.mailInfo) && !this.fun.isTextEmpty(this.$store.state.temp.mailInfo.cservice)) {
        this.cservice = this.$store.state.temp.mailInfo.cservice;
        return;
      }

    },

    slider() {
      let that = this;
      // let goodinfo = this.$refs.goodinfo.offsetTop;
      window.onscroll = function () {
        var top = document.documentElement.scrollTop || document.body.scrollTop;
        if (top < that.$refs.goodinfo.offsetTop) {
          that.goodTop = false;
        } else {
          that.goodTop = true;
        };
        if (top < 40) {
          that.hoet = false;
        } else {
          that.hoet = true;
        }
      }
    },

    handleChange() { },

    goto() {
      console.log("share_tag", share_tag);
      if (share_tag == "-1") {
        this.$router.go(-1);
      } else {
        //this.$router.push({ name: 'home', params: {}, query: { i: this.toi } });
        this.$router.push(this.fun.getUrl('home', {}));
      }

    },

    handleTopChange(status) {
      this.topStatus = status;
    },

    //更新
    loadTop() {
      this.$refs.loadmore.onTopLoaded();
    },

    // 加载更多
    loadBottom() {
      this.$refs.loadmore.onBottomLoaded();
      //this.$router.push({ name: 'goodstab', params: { id: this.$route.params.id, goods: this.goodsInfo }, query: { i: this.toi } });
      this.$router.push(this.fun.getUrl('goodstab', { id: this.$route.params.id, goods: this.goodsInfo }));
      //this.$router.push('/goods/goodstabs/' + this.$route.params.id);
    },

    //获取数据
    getData() {
      let that = this;
      let json = { id: goods_id, "i": this.fun.getKeyByI(), "type": this.fun.getTyep(), "mid": this.fun.getKeyByMid()};
      $http.get('goods.goods.get-goods', json, "加载中...").then(function (response) {
        console.log(response)
        if (response.result == 1) {
          that.goodsInfo = response.data;
          that.initPopView();//初始化弹窗view
          that.initPopView2();//初始化弹窗view2 无规格
          that.initShare();//初始化分享设置
          that.setDataByTabIndex();//设置商品详情
          that.setIsAddCart();//判断是否能加入购物车
          that.setIsLove();//判断是否有爱心值
          that.isGoods = true;


          let store_id=that.fun.isTextEmpty(that.$route.params.store_id)?"":that.$route.params.store_id;

          that.footSet(goods_id,store_id);//设置足迹数据//描述title路径share 

          that.isMarginBottom=that.fun.isTextEmpty(response.data.show_push)?false:true;

          if(!that.fun.isTextEmpty(response.data.lease_toy)){
            that.isRent=response.data.lease_toy.is_lease==1?true:false;
            that.isRentBuyShow=response.data.lease_toy.immed_goods_id==0?false:true;
          }

          // if(!that.fun.isTextEmpty(response.data.lease_toy.is_rights)){
          //   that.isRight=response.data.lease_toy.is_rights==1?true:false;
          // }

          if(!that.fun.isTextEmpty(response.data.lease_toy)){
            if(!that.fun.isTextEmpty(response.data.lease_toy.is_rights)){
              that.isRight=response.data.lease_toy.is_rights==1?true:false;
            }
          }
          //限时购

          //console.log(that.fun.isTextEmpty(response.data.has_one_goods_limitbuy));
          if(!that.fun.isTextEmpty(response.data.has_one_goods_limit_buy)){

            that.isBuy=response.data.has_one_goods_limit_buy.status == 1?true:false;
          
            that.beginTime=response.data.has_one_goods_limit_buy.start_time;

            that.timeCompare(that.beginTime);

            console.log(that.isTime);
            
            that.endTime=new Date(parseInt(response.data.has_one_goods_limit_buy.end_time)*1000);

            console.log( that.endTime);

            that.endTimeStr=String(that.endTime);

            that.timeLimit=response.data.has_one_goods_limit_buy.status;
          }

          

          console.log(that.isRent);
          
          //商城活动
          if(response.data.goods_sale.sale_count != 0){
            that.activitySwitch=true;
            that.activityItem = response.data.goods_sale;
            that.showDefaultActivity(response.data.goods_sale);
          }else{
            that.activitySwitch=false;
          }

        } else {
          console.log(response.msg);
          that.isGoods = false;
          Toast(response.msg);
        }

      }, function (response) {
        console.log(response);
        that.isGoods = false;
      });

      // this.goodsInfo = {
      //   "id": 2,
      //   "uniacid": 6,
      //   "brand_id": 1,
      //   "type": 1,
      //   "status": 0,
      //   "display_order": 0,
      //   "title": "sdfsdfsdfvvvvv",
      //   "thumb": "//gw.alicdn.com/imgextra/i2/1596107585/TB2IBpitXXXXXa8XXXXXXXXXXXX_!!1596107585.jpg_760x760q50s150.jpg",
      //   "thumb_url": [
      //     "//gw.alicdn.com/imgextra/i2/1596107585/TB2IBpitXXXXXa8XXXXXXXXXXXX_!!1596107585.jpg_760x760q50s150.jpg",
      //     "//gw.alicdn.com/imgextra/i1/1596107585/TB2WgBJXWnyQeBjSsplXXaLWVXa_!!1596107585.jpg_760x760q50s150.jpg"
      //   ],
      //   "sku": "个",
      //   "description": "",
      //   "content": null,
      //   "goods_sn": "",
      //   "product_sn": "234234234",
      //   "market_price": 32,
      //   "price": 12,
      //   "stock": 222,
      //   "show_sales": 0,
      //   "weight": "0.00",
      //   "has_option": 1,
      //   "is_new": 1,
      //   "is_hot": 0,
      //   "is_discount": 0,
      //   "is_recommand": 0,
      //   "is_comment": 0,
      //   "": null,
      //   "has_many_params": [
      //     {
      //       "goods_id": 2,
      //       "title": "11",
      //       "value": "222"
      //     },
      //     {
      //       "goods_id": 2,
      //       "title": "333",
      //       "value": "333"
      //     }
      //   ],
      //   "has_many_specs": [
      //     {
      //       "id": 111,
      //       "goods_id": 2,
      //       "title": "颜色",
      //       "description": null,
      //       "specitem": [
      //         {
      //           "id": 223,
      //           "title": "白色",
      //           "specid": 111,
      //           "c": false,
      //           "thumb": ""
      //         },
      //         {
      //           "id": 224,
      //           "title": "黑色",
      //           "specid": 111,
      //           "c": false,
      //           "thumb": ""
      //         }
      //       ]
      //     },
      //     {
      //       "id": 112,
      //       "goods_id": 2,
      //       "title": "内存",
      //       "description": null,
      //       "specitem": [
      //         {
      //           "id": 225,
      //           "title": "16G",
      //           "c": false,
      //           "specid": 112,
      //           "thumb": ""
      //         },
      //         {
      //           "id": 226,
      //           "title": "32G",
      //           "specid": 112,
      //           "c": false,
      //           "thumb": ""
      //         }
      //       ]
      //     }
      //   ],
      //   "has_many_options": [
      //     {
      //       "id": 11,
      //       "goods_id": 2,
      //       "title": "白色+16G",
      //       "thumb": "//gw.alicdn.com/imgextra/i1/1596107585/TB2WgBJXWnyQeBjSsplXXaLWVXa_!!1596107585.jpg_760x760q50s150.jpg",
      //       "product_price": 80000000,
      //       "market_price": 4330000,
      //       "stock": 22,
      //       "specs": "223_225",
      //       "weight": "0.00"
      //     },
      //     {
      //       "id": 12,
      //       "goods_id": 2,
      //       "title": "白色+32G",
      //       "thumb": null,
      //       "product_price": 80000000,
      //       "market_price": 50000000,
      //       "stock": 0,
      //       "specs": "223_226",
      //       "weight": "0.00"
      //     },
      //     {
      //       "id": 13,
      //       "goods_id": 2,
      //       "title": "黑色+16G",
      //       "thumb": null,
      //       "product_price": 80000000,
      //       "market_price": 30000000,
      //       "stock": 10,
      //       "specs": "224_225",
      //       "weight": "0.00"
      //     },
      //     {
      //       "id": 14,
      //       "goods_id": 2,
      //       "title": "黑色+32G",
      //       "thumb": null,
      //       "product_price": 80000000,
      //       "market_price": 60000000,
      //       "stock": 15,
      //       "specs": "224_226",
      //       "weight": "0.00"
      //     }
      //   ],
      //   "has_one_share": {
      //     "id": 3,
      //     "goods_id": 2,
      //     "need_follow": 1,
      //     "no_follow_message": "必须关注",
      //     "follow_message": "",
      //     "share_title": "看看我吧",
      //     "share_thumb": "images/6/2017/03/w1leEV09AFbG2Yz9l9vXBycyELL7F2.jpg",
      //     "share_desc": "哈哈哈，分享描述"
      //   },
      //   "has_one_discount": {
      //     "id": 26,
      //     "goods_id": 2,
      //     "level_discount_type": 1,
      //     "discount_method": 1,
      //     "level_id": 1,
      //     "discount_value": "8.00"
      //   },
      //   "has_one_goods_dispatch": {
      //     "id": 1,
      //     "goods_id": 2,
      //     "dispatch_type": 1,
      //     "dispatch_price": 10,
      //     "dispatch_id": 0,
      //     "is_cod": 1
      //   },
      //   "has_one_privilege": {
      //     "id": 1,
      //     "goods_id": 2,
      //     "show_levels": "1",
      //     "show_groups": "",
      //     "buy_levels": "",
      //     "buy_groups": "",
      //     "once_buy_limit": 0,
      //     "total_buy_limit": 0,
      //     "time_begin_limit": 1489029960,
      //     "time_end_limit": 1489029960
      //   },
      //   "has_one_brand": {
      //     "id": 1,
      //     "name": "LV"
      //   }
      // };


    },


    //初始化弹窗view
    initPopView() {
      this.popThumb = this.goodsInfo.thumb;//设置默认图片
      this.popStock = this.goodsInfo.stock;//设置默认库存
      if (this.goodsInfo.has_option == 1) {
        this.popPrice = this.goodsInfo.min_price + "-" + this.goodsInfo.max_price;//设置默认价格
      } else {
        this.popPrice = this.goodsInfo.price;//设置默认价格
      }

      this.goodsDescription = "选择";
      for (let i = 0; i < this.goodsInfo.has_many_specs.length; i++) {
        this.goodsDescription += " " + this.goodsInfo.has_many_specs[i].title;
      }
    },

    initPopView2() {
      if (this.goodsInfo.has_option != 1) {
        this.popThumb = this.goodsInfo.thumb;//设置默认图片
        this.popStock = this.goodsInfo.stock;//设置默认库存
        this.popPrice = this.goodsInfo.price;//设置默认价格
        this.goodsDescription = "";
        optionsMaxCount = this.goodsInfo.stock;//设置最大购买量
      }
    },

    //加入购物车
    addCart() {
      if (!this.isAddCart) {
        return;
      }
      if (!this.isGoods) {
        Toast("商品已下架或不存在");
        return;
      }


      //是o2o商品
      if (this.is_o2o) {
        this.addCartByO2O();
        return;
      }


      submitActionTag = SUBMIT_ACTION_CART;
      console.log(submitActionTag);

      //判断是否有规格

      if (this.goodsInfo.has_option == 1) {//有规格
        this.popupSpecs = true;
      } else {//无规格
        //处理参数
        optionsId = "";
        this.addCartRequest(goods_id, optionsId, this.goodsCount);
      }
    },

    //加入购物车 o2o
    addCartByO2O() {
      let that = this;
      if (this.fun.isTextEmpty(this.$route.params.store_id)) {
        MessageBox.alert("门店参数错误");
        return;
      }
      let store_id = this.$route.params.store_id;
      $http.get('plugin.store-cashier.frontend.shoppingCart.member-cart.store', { goods_id: goods_id, total: 1, "store_id": store_id }).then((response) => {
        console.log('result', response);
        if (response.result == 1) {
          Toast(response.msg);
          that.$router.go(-1);
        } else {
          MessageBox.alert(response.msg);
        }
      }), (response) => {
        MessageBox.alert(response.msg);
      }
    },

    //立即购买
    buyNow() {

      if (!this.isGoods) {
        Toast("商品已下架或不存在");
        return;
      }
      submitActionTag = SUBMIT_ACTION_BUY;
      console.log(submitActionTag);
      console.log(optionsId);
      //判断是否有规格

      if (this.goodsInfo.has_option == 1 && this.fun.isTextEmpty(optionsId)) {//有规格 但是还未选择
        this.popupSpecs = true;
      } else if (this.goodsInfo.has_option == 1 && !this.fun.isTextEmpty(optionsId)) {//有规格 但是已选择

        if(this.goodsCount<=0){
          this.popupSpecs = true;
          return
        }
        //处理参数
        this.buyNowRequest(goods_id, optionsId, this.goodsCount);

      } else if (this.goodsInfo.has_option == 0) {//无规格
        //新处理 显示增加数量
        this.showPopView2();


        //处理参数
        //this.buyNowRequest(goods_id, optionsId, this.goodsCount);
      }

    },

    //提交确认
    submitAction() {

      if (specsManage.length < this.goodsInfo.has_many_specs.length) {
        console.log(this.goodsDescription);
        this.popupSpecs=false;
        Toast(this.goodsDescription);
        return;
      }

      if (submitActionTag == SUBMIT_ACTION_CART) {//购物车网络处理
        this.popupSpecs = false;
        //处理参数
        // if(this.goodsCount<=0){
        //   this.popupSpecs = true;
        //   return
        // }
        this.addCartRequest(goods_id, optionsId, this.goodsCount);

      } else if (submitActionTag == SUBMIT_ACTION_BUY) { //立即购买处理
        this.popupSpecs = false;
        //处理参数

        // if(this.goodsCount<=0){
        //   this.popupSpecs = true;
        //   return
        // }
        this.buyNowRequest(goods_id, optionsId, this.goodsCount);
      }
    },

    //加入购物车网络操作
    addCartRequest(_goodsId, _optionsId, _total) {
      if (optionsMaxCount == 0)//库存不足
      {
        Toast("商品库存不足");
        return;
      }
      if (_total <= 0) {
        this.popupSpecs = false;
        Toast("请选择商品数量");
        return;
      }


      let that = this;
      let goods = [];
      goods.push(_goodsId);
      let jsons = { goods_ids: JSON.stringify(goods), "i": this.fun.getKeyByI(), "type": this.fun.getTyep(), "mid": this.fun.getKeyByMid() };
      $http.get('from.div-from.isDisplay', jsons, "加载中...").then(function (response) {
        if (response.result == 1) {
          if (response.data.status && !response.data.member_status) {
            MessageBox({
              title: '提示',
              message: '购买跨境商品,请补充您的个人信息',
              showCancelButton: true
            }).then(action => {
              if (action == 'confirm') {
              that.$router.push(that.fun.getUrl('myinfo', { tag: 'cart', goodsId: _goodsId, optionsId: _optionsId, total: _total }));
            }
          });
          } else {
            that.addCartReq(_goodsId, _optionsId, _total)
          }
        } else {
          console.log(response.msg);
        }

      }, function (response) {
        console.log(response);
        that.isGoods = false;
      });

      //直接添加购物车
      // let that = this;

      // let json = { goods_id: _goodsId, total: _total, option_id: _optionsId };
      // $http.get('member.member-cart.store', json, "添加中...").then(function (response) {
      //   console.log(response.data)
      //   if (response.result == 1) {
      //     Toast(response.msg);
      //   } else {
      //     Toast(response.msg);
      //   }

      // }, function (response) {
      //   console.log(response)
      // });
    },


    addCartReq(_goodsId, _optionsId, _total) {

      //if(this.goodsInfo.)

      if(this.isRent){
        let json = { goods_id: _goodsId, total: _total, option_id: _optionsId};
        $http.get("plugin.lease-toy.api.member-cart.store",json,"添加中...").then(response =>{
          console.log(response.data)
          if (response.result == 1) {
            console.log("添加购物车成功");
            Toast(response.msg);
          } else {
            Toast(response.msg);
          }
        }).catch(error =>{
          console.log(error);
        })
      }else{
        let that = this;
        let json = { goods_id: _goodsId, total: _total, option_id: _optionsId};
        $http.get('member.member-cart.store', json, "添加中...").then(function (response) {
          console.log(response.data)
          if (response.result == 1) {
            Toast(response.msg);
          } else {
            Toast(response.msg);
          }
        }, function (response) {
          console.log(response)
        });

      }
      
    },

    //立即购买网络操作
    buyNowRequest(_goodsId, _optionsId, _total) {
      if (optionsMaxCount == 0)//库存不足
      {
        Toast("商品库存不足");
        return;
      }
      if (_total <= 0) {
        Toast("请选择商品数量");
        return;
      }

      //请求保税商品接口
      let that = this;
      let goods = [];
      goods.push(_goodsId);
      let jsons = { goods_ids: JSON.stringify(goods), "i": this.fun.getKeyByI(), "type": this.fun.getTyep(), "mid": this.fun.getKeyByMid() };
      $http.get('from.div-from.isDisplay', jsons, "加载中...").then(function (response) {
        if (response.result == 1) {
          if (response.data.status && !response.data.member_status) {
            MessageBox({
              title: '提示',
              message: '购买此商品,请补充您的个人信息',
              showCancelButton: true
            }).then(action => {
              if (action == 'confirm') {
                that.$router.push(that.fun.getUrl('myinfo', { tag: submitActionTag, goodsId: _goodsId, optionsId: _optionsId, total: _total }));
              }
            });
          } else {
            //跳转普通商品和柜子商品
            // if(that.isRent){
            //   that.$router.push(that.fun.getUrl('goodsorder', { tag: "rentActionBuy", goodsId: _goodsId, optionsId: _optionsId, total: _total }));
            // }else{
              //that.$router.push(that.fun.getUrl('goodsorder', { tag: submitActionTag, goodsId: _goodsId, optionsId: _optionsId, total: _total }));
            //}

            if(!that.isCup){
              //柜子商品
              if(that.isRent){
                //柜子商品 --租
                that.$router.push(that.fun.getUrl('goodsorder', { tag: "rentBuy", goodsId: _goodsId, optionsId: _optionsId, total: _total ,mark:that.$route.params.mark}));
              }else{
                //柜子商品 --买
                that.$router.push(that.fun.getUrl('goodsorder', { tag: submitActionTag, goodsId: _goodsId, optionsId: _optionsId, total: _total,mark:that.$route.params.mark }));
              }
            }else{
              //普通商品
              that.$router.push(that.fun.getUrl('goodsorder', { tag: submitActionTag, goodsId: _goodsId, optionsId: _optionsId, total: _total }));
            }
            
          }
        } else {
          console.log(response.msg);
        }

      }, function (response) {
        console.log(response);
      });
      //直接购买
      //this.$router.push(this.fun.getUrl('goodsorder', { tag: submitActionTag, goodsId: _goodsId, optionsId: _optionsId, total: _total }));
    },

    //界面选择规格触发事件
    selectSpecs(data) {
      console.log("selectSpecs");
      var specid = data.specid;//对其他数据筛选 不筛选同级
      //console.log(specid);
      //处理选择池
      this.manageSpecs(data);

      //处理规格组合选择状态
      this.setGoodsSpecs(data);

      //设置选择规格后的 价格、照片、库存
      this.setGoodsSpecsChangeInfo();

      //判断当前购买总量与库存的关系
      this.getMaxCount();

    },

    //判断当前购买总量与库存的关系
    getMaxCount() {
      if (specsManage.length == this.goodsInfo.has_many_specs.length) {
        console.log(optionsMaxCount);
        console.log(this.goodsCount);
        if (optionsMaxCount == 0)//库存不足
        {
          this.goodsCount = 0;
        }
        if (this.goodsCount > optionsMaxCount) {
          this.goodsCount = optionsMaxCount;
        }
      }
    },

    //设置选择规格后的 价格、照片、库存
    setGoodsSpecsChangeInfo() {
      //根据ID 排序 specsManage.sort();
      specsManage.sort(function (a, b) {
        return a.id - b.id;
      });
      if (specsManage.length == this.goodsInfo.has_many_specs.length) {
        let goodsSpecs = "";
        for (let j = 0; j < specsManage.length; j++) {
          goodsSpecs += specsManage[j].id + "_";
        }
        goodsSpecs = goodsSpecs.substring(0, goodsSpecs.length - 1);//处理"_"
        console.log("goodsSpecs", goodsSpecs);
        for (let i = 0; i < this.goodsInfo.has_many_options.length; i++) {
          if (goodsSpecs == this.setGoodsSpecsBySort(this.goodsInfo.has_many_options[i].specs)) {
            this.popPrice = this.goodsInfo.has_many_options[i].product_price;//设置价格
            this.popThumb = this.fun.isTextEmpty(this.goodsInfo.has_many_options[i].thumb) ? this.goodsInfo.thumb : this.goodsInfo.has_many_options[i].thumb;//设置图片
            this.popStock = this.goodsInfo.has_many_options[i].stock;//设置库存

            optionsId = this.goodsInfo.has_many_options[i].id;//设置规格ID，用于生成订单
            optionsMaxCount = this.goodsInfo.has_many_options[i].stock;//库存最大数 用于切换更改买家购买数量
            if (optionsMaxCount > 0) {
              this.goodsCount = 1;
            }

            break;
          }
        }
      }
    },

    //处理商品goodsSpecs 并排序 新方法
    setGoodsSpecsBySort(specs) {

      let _specs = specs.split("_");//先变成数组
      //_specs.sort();//排序
      _specs.sort(function (a, b) {
        return a - b;
      });

      // 在组装回去
      let goodsSpecs = "";
      for (let j = 0; j < _specs.length; j++) {
        goodsSpecs += _specs[j] + "_";
      }
      goodsSpecs = goodsSpecs.substring(0, goodsSpecs.length - 1);//处理"_"

      return goodsSpecs;
    },

    //处理选择池
    manageSpecs(data) {
      var specsObject = new Object();
      specsObject.id = data.id;
      specsObject.specid = data.specid;
      specsObject.title = data.title;

      if (specsManage.length > 0) {
        for (let i = 0; i < specsManage.length; i++) {
          if (specsManage[i].specid == specsObject.specid) {
            specsManage.splice(i, 1);
          }
        }
        specsManage.push(specsObject);
      } else {
        specsManage.push(specsObject);
      }

      //排序
      if (specsManage.length == this.goodsInfo.has_many_specs.length) {
        var newSpecsManage = [];
        for (let i = 0; i < this.goodsInfo.has_many_specs.length; i++) {
          for (let j = 0; j < specsManage.length; j++) {
            if (this.goodsInfo.has_many_specs[i].id == specsManage[j].specid) {
              newSpecsManage.push(specsManage[j]);
              break;
            }
          }
        }
        specsManage = newSpecsManage;
      }
      this.setGoodsDescription();
    },

    //处理goodsDescription 数据
    setGoodsDescription() {
      var description = "";
      //相等代表全选了 体现语句
      if (specsManage.length == this.goodsInfo.has_many_specs.length) {
        description = "已选择 ";
        for (let i = 0; i < specsManage.length; i++) {
          description += specsManage[i].title + " ";
        }
        this.goodsDescription = description;
      } else {
        description = "请选择 ";

        for (let i = 0; i < this.goodsInfo.has_many_specs.length; i++) {
          for (let j = 0; j < specsManage.length; j++) {
            if (this.goodsInfo.has_many_specs[i].id != specsManage[j].specid) {
              description += this.goodsInfo.has_many_specs[i].title + " ";
              break;
            }
          }
        }
        this.goodsDescription = description;
      }
    },

    //处理规格组合选择状态 过滤数据
    setGoodsSpecs(specs) {
      for (let i = 0; i < this.goodsInfo.has_many_specs.length; i++) {
        if (specs.specid != this.goodsInfo.has_many_specs[i].id) {
          this.setGoodsSpecsStatus(this.goodsInfo.has_many_specs[i].specitem, specs.id);
        }
      }
    },

    //处理规格组合选择状态 处理状态 specitem 组合数组(未选中的) id当前选中的ID 根据ID 组合算是否有当前组合
    setGoodsSpecsStatus(specitem, id) {
      console.log(specitem);
      console.log(id);
      let options = [];//数据池


      for (let i = 0; i < this.goodsInfo.has_many_options.length; i++) {
        console.log(this.goodsInfo.has_many_options[i].specs);
        let _specs = this.goodsInfo.has_many_options[i].specs.split("_");
        //console.log(_specs);
        //判断是否包含
        for (let j = 0; j < _specs.length; j++) {
          if (_specs[j] == id) {
            options.push(this.goodsInfo.has_many_options[i]);
          }
        }
      }

      //关键处理方式 后期要优化 效率低
      for (let m = 0; m < options.length; m++) {
        let _specs = options[m].specs.split("_");
        for (let y = 0; y < _specs.length; y++) {
          if (_specs[y] != id && options[m].stock == 0) {
            for (let n = 0; n < specitem.length; n++) {
              if (_specs[y] == specitem[n].id) {
                specitem[n].c = true;
              }
            }
          } else if (_specs[y] != id && options[m].stock > 0) {
            for (let n = 0; n < specitem.length; n++) {
              if (_specs[y] == specitem[n].id) {
                specitem[n].c = false;
              }
            }
          }
        }
      }

      console.log(options);

    },

    //增加
    addGoods() {

      console.log("增加");
      if (specsManage.length == this.goodsInfo.has_many_specs.length && this.goodsCount == optionsMaxCount) {
        console.log("数量超出范围");
        Toast("数量超出范围");
        console.log("max=" + this.goodsCount);
        return;
      }
      this.goodsCount++;

    },

    //减少
    reduceGoods() {
      if (this.goodsCount == 1 || this.goodsCount == 0) {
        return;
      }

      this.goodsCount--;
    },

    //判断是否收藏
    isFavorite() {
      let that = this;
      let json = { goods_id: goods_id, "i": this.fun.getKeyByI(), "type": this.fun.getTyep(), "mid": this.fun.getKeyByMid() };
      $http.get('member.member-favorite.isFavorite', json).then(function (response) {
        console.log(response)
        if (response.result == 1) {
          //已收藏
          that.favorite = response.data.status == 1 ? true : false;
        } else {

        }

      }, function (response) {
        console.log(response);
      });
    },
    //收藏操作
    onFavorite(isFavorite) {
      if (!this.isGoods) {
        Toast("商品已下架或不存在");
        return;
      }
      isFavorite ? this.removeFavorite() : this.addFavorite();
      console.log(isFavorite);
    },

    //添加收藏
    addFavorite() {
      console.log("addFavorite");
      let that = this;
      let json = { goods_id: goods_id, "i": this.fun.getKeyByI(), "type": this.fun.getTyep(), "mid": this.fun.getKeyByMid() };
      $http.get('member.member-favorite.store', json, "处理中...").then(function (response) {
        console.log(response)
        if (response.result == 1) {
          that.favorite = true;
          Toast("操作成功");
        } else {

        }

      }, function (response) {
        console.log(response);
      });
    },

    //移除收藏
    removeFavorite() {
      let that = this;
      let json = { goods_id: goods_id, "i": this.fun.getKeyByI(), "type": this.fun.getTyep(), "mid": this.fun.getKeyByMid() };
      $http.get('member.member-favorite.destroy', json, "处理中...").then(function (response) {
        console.log(response)
        if (response.result == 1) {
          that.favorite = false;
          Toast("操作成功");
        } else {

        }

      }, function (response) {
        console.log(response);
      });
    },

    //足迹记录
    footSet(_goods_id,_store_id) {

      if (!this.isGoods) {
        return;
      }

      let that = this;
      let json = { goods_id: _goods_id, "i": this.fun.getKeyByI(), "type": this.fun.getTyep(), "mid": this.fun.getKeyByMid(),owner_id: _store_id};
      $http.get('member.member-history.store', json).then(function (response) {
        console.log(response)
        if (response.result == 1) {
        } else {

        }

      }, function (response) {
        console.log(response);
      });
    },


    //初始化分享设置
    initShare() {
      let that = this;
      console.log(document.location.href);
      let _url = document.location.href;
      let json = { url: _url, "i": this.fun.getKeyByI(), "type": this.fun.getTyep(), "mid": this.fun.getKeyByMid(), 'goods_id': goods_id };
      $http.post('member.member.wxJsSdkConfig', json).then(function (response) {
        console.log(response)
        if (response.result == 1) {
          //that.cservice = response.data.shop.cservice;
          var cs=response.data.shop.cservice;
          that.share(response.data);
          if(that.fun.isTextEmpty(that.zoneId)){
            that.initCservice(response.data.shop.cservice);//重新赋值
          }else{
            $http.get("plugin.area-store.frontend.store.get-costom-service-by-store-id",{as_id:that.zoneId}).then(response =>{
              if(response.result == 1){
                that.initCservice(response.data.link);
              }else{
                console.log(cs);
                that.initCservice(cs)
              }
            })
          }
          
        } else {

        }
      }, function (response) {
        console.log(response);
      });
    },

    //分享
    shareWeixin() {
      //不是微信端 不访问
      if (this.fun.getTyep() == 5) {
        return;
      } else if (this.fun.getTyep() == 7) {
        this.appSharesinit();
        return;
      }
      MessageBox({
        title: '提示',
        message: '请点击右上角微信分享',
        showCancelButton: true
      });
    },
    //app获取分享数据
    appSharesinit() {
      var that = this;
      var _url = document.location.href;
      var json = { url: _url, "i": this.fun.getKeyByI(), "type": this.fun.getTyep() };
      $http.post('member.member.wxJsSdkConfig', json).then(function (response) {
        if (response.result == 1) {
          that.appShare(response.data);
        }
      }, function (response) {
        console.log(response);
      });

    },
    //app分享设置
    appShare(data) {
      var that = this;
      var _title = (that.fun.isTextEmpty(that.goodsInfo.has_one_share.share_title)) ? that.goodsInfo.title : that.goodsInfo.has_one_share.share_title;
      var _link = document.location.href + "&share_tag=2";
      _link = that.fun.isMid(_link, data.info.uid);

      var _imgUrl = (that.fun.isTextEmpty(that.goodsInfo.has_one_share.share_thumb)) ? that.goodsInfo.thumb : that.goodsInfo.has_one_share.share_thumb;
      var _desc = (that.fun.isTextEmpty(that.goodsInfo.has_one_share.share_desc)) ? data.shop.name : that.goodsInfo.has_one_share.share_desc;
      YDB.Share(_title, _desc, _imgUrl, _link, "Sharesback");
    },

    //组装分享设置
    share(data) {
      let that = this;
      wx.config(data.config);
      wx.ready(function () {

        let _title = (that.fun.isTextEmpty(that.goodsInfo.has_one_share.share_title)) ? that.goodsInfo.title : that.goodsInfo.has_one_share.share_title;
        //let _link = document.location.href + "&mid=" + data.info.uid + "&share_tag=2";
        //let _link = location.protocol+'//'+location.host+location.pathname +'?i='+ that.fun.getKeyByI() +"&type=" +that.fun.getTyep()+ "&mid=" + data.info.uid + "&share_tag=2"; 

        let _link = document.location.href + "&share_tag=2";
        _link = that.fun.isMid(_link, data.info.uid);

        let _imgUrl = (that.fun.isTextEmpty(that.goodsInfo.has_one_share.share_thumb)) ? that.goodsInfo.thumb : that.goodsInfo.has_one_share.share_thumb;
        let _desc = (that.fun.isTextEmpty(that.goodsInfo.has_one_share.share_desc)) ? data.shop.name : that.goodsInfo.has_one_share.share_desc;
        wx.showOptionMenu();
        wx.onMenuShareTimeline({
          title: _title, // 分享标题
          link: _link, // 分享链接
          imgUrl: _imgUrl, // 分享图标
          success: function () {
            Toast("分享成功");
          },
          cancel: function () {
            Toast("取消分享");
          }
        });



        wx.onMenuShareAppMessage({
          title: _title, // 分享标题
          desc: _desc, // 分享描述
          link: _link, // 分享链接
          imgUrl: _imgUrl, // 分享图标
          type: 'link', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function () {
            Toast("分享成功");
          },
          cancel: function () {
            Toast("取消分享");
          }
        });
      });
    },





    //初始化商品详情参数
    initData() {
      currentTabIndex = "0";
      is_first_content = false;
      is_second_content = false;
      is_third_content = false;

      this.first_content = "";
      this.second_content = "";
      this.third_content = [];
      this.activeName = 'first';
      this.show = true;

      this.isAddCart = false;

      this.posterImg="";

      this.isRentBuyShow=false,
       
      this.beginTime=0;
      
      this.endTime=0;

      this.endTimeStr="";
      
      this.isBuy=false
      this.cartsNum=0;

      this.carts=[];
      
      this.cartsTotal=0.00,
      
      this.goodsCarts=[];

      if (!this.fun.isTextEmpty(this.$route.params.tag) && this.$route.params.tag == "o2o") {
        this.init();
      }

    
      

      //this.getCartId();

      
    },

    //设置选择后的数据
    setDataByTabIndex() {
      console.log("setDataByTabIndex");
      if (currentTabIndex == "0" && !is_first_content) {
        is_first_content = true;
        this.first_content = this.goodsInfo.content;
      } else if (currentTabIndex == "1" && !is_second_content) {
        is_second_content = true;
        this.second_content = this.goodsInfo.has_many_params;
      } else if (currentTabIndex == "2" && !is_third_content) {
        is_third_content = true;
        //获取评论
        this.getCommentData();
      }
    },

    //tab 点击
    handleClick(tab, event) {
      //点击同tab 不刷新界面
      if (currentTabIndex == tab.index) {
        return;
      } else {
        currentTabIndex = tab.index;
      }

      this.setDataByTabIndex();
    },

    //获取评论数据
    getCommentData() {
      let that = this;
      let json = { goods_id: goods_id, page: 1, "i": this.fun.getKeyByI(), "type": this.fun.getTyep(), "mid": this.fun.getKeyByMid() };
      console.log(json);
      $http.get('goods.comment.get-comment', json, "获取中...").then(function (response) {
        console.log(response.data)
        if (response.result == 1) {
          that.third_content = response.data.data;
        } else {
          is_third_content = false;//复位
        }
      }, function (response) {
        is_third_content = false;//复位
        console.log(response)
      });
    },

    //跳转评论详情
    toContentInfo(data) {
      //this.$router.push({ name: "CommentDetails", params: { order_id: data.order_id, goods_id: data.goods_id, uid: data.uid }, query: { i: this.toi } });
      this.$router.push(this.fun.getUrl('CommentDetails', { order_id: data.order_id, goods_id: data.goods_id, uid: data.uid }));
    },

    //跳转购物车
    gotoCart() {
      //this.$router.push({ name: "cart", params: {}, query: { i: this.toi } });
      this.$router.push(this.fun.getUrl('home', {}));
    },

    gotoCart1(){
      this.$router.push(this.fun.getUrl('cart', {}));
    },
    //跳转个人中心
    gotoMember() {
      //this.$router.push({ name: "member", params: {}, query: { i: this.toi } });
      this.$router.push(this.fun.getUrl('member', {}));
    },

    //判断是否能加入购物车
    setIsAddCart() {
      //为空是老数据默认值问题
      if (this.fun.isTextEmpty(this.goodsInfo.buy_way) || this.goodsInfo.buy_way == "0") {
        this.isAddCart = true;
      }

      //不能加入 金币产品
      if (this.goodsInfo.buy_way == 1) {
        this.isAddCart = false;
      }

    },


    //无规格选择 增加数量
    showPopView2() {
      this.popupSpecs2 = true;
    },

    hidePopView2() {
      this.popupSpecs2 = false;
    },

    //新处理立即购买
    buyNowNew() {
      this.hidePopView2();
      //处理参数
      
      this.buyNowRequest(goods_id, optionsId, this.goodsCount);
    },


    //是否有爱心值
    setIsLove() {
      if (this.goodsInfo.goods_love) {
        this.isGoodsLove = true;
        let love_cash = this.goodsInfo.price - this.goodsInfo.goods_love.love_coin.amountOfMoney;
        this.goods_love_cash = Number(love_cash.toString().match(/^\d+(?:\.\d{0,2})?/));
        //this.goods_love_cash = (this.goodsInfo.price - this.goodsInfo.goods_love.love_coin.amountOfMoney);
        this.goods_love_deduction = this.goodsInfo.goods_love.love_coin.amountOfCoin;
        this.goods_love_name = this.goodsInfo.goods_love.love_coin.name;
      } else {
        this.isGoodsLove = false;
      }
    },

    //跳转优惠券领取
    gotoCoupon(){
      this.$router.push(this.fun.getUrl('couponStore'));
    },
    //海报生成
    postShow(){
     
      this.posterShow=true;
      
      $http.get("goods.goods-poster.generate-goods-poster",{id:this.$route.params.id},"...加载中").then(response =>{
        if(response.result == 1){
          this.posterImg=response.data;
          
        }else{
          this.posterShow=false;
          MessageBox("提示",response.msg);
        }
        
      }).catch(error =>{
        console.log(error)
      })
    },

    activityShowFun(){
      this.activityShow=true;
      
    },

    //显示商城活动默认活动
    showDefaultActivity(val){
      
      if(val.first_strip_key=="coupon"){
        this.firstActivityBtn="购买返券";
        this.firstActivityCon="商品订单完成返优惠券";
      }else if(val.first_strip_key=="deduction_proportion" || val.first_strip_key=="award_proportion"){
        this.firstActivityBtn=val.love_name;
        this.firstActivityCon="最高抵扣"+val.love_name+val.deduction_proportion+",购买赠送"+val.award_proportion+val.love_name;
      }else if(val.first_strip_key=="max_point_deduct" || val.first_strip_key=="point"){
        this.firstActivityBtn=val.point_name;
        this.firstActivityCon="最高抵扣"+val.point_name+val.max_point_deduct+",购买赠送"+val.point+val.point_name;
      }else if(val.first_strip_key=="ed_full"){
        this.firstActivityBtn="满减";
        this.firstActivityCon="本商品满￥"+val.ed_full+"立减￥"+val.ed_reduction+"";
      }else if(val.first_strip_key=="ed_money" || val.first_strip_key=="ed_num"){
        this.firstActivityBtn="包邮";
        if(val.first_strip_key=="ed_money" && val.ed_num==0){
          this.firstActivityCon="本商品满￥"+val.ed_money+"元包邮";
        }else if(val.first_strip_key=="ed_num" && val.ed_money==0){
          this.firstActivityCon="本商品满"+val.ed_num+"件包邮";
        }else{
          this.firstActivityCon="本商品满￥"+val.ed_money+"元包邮"+",满"+val.ed_num+"件包邮";
        }
        
      }else if(val.first_strip_key=="award_balance"){
        this.firstActivityBtn="余额";
        this.firstActivityCon="购买赠送余额"+val.award_balance+"元";
      }else{
        return
      }
    },

    //推广商品跳转
    pushGoodGoto(val){
      if(val.is_course==1){
          this.$router.push(this.fun.getUrl('CourseDetail',{goods_id:val.id}));
      }else if(val.is_course==0){
          this.$router.push(this.fun.getUrl('goods',{id:val.id}));
      }else{
          return;
    }
  },


  o2oCart(){
    this.o2oCartShow=true;
  },

  o2oGotoOrder(){
    this.o2oCartShow=false;

    if (this.fun.isTextEmpty(this.$route.params.store_id)) {
      MessageBox.alert("门店参数错误");
      return;
    }

    if(this.goodsCount == 0 && this.goodsCount < 0){
      MessageBox.alert("数量不能小于1");
      return
    }

    let store_id = this.$route.params.store_id;
    $http.get('plugin.store-cashier.frontend.shoppingCart.member-cart.store', { goods_id: goods_id, total: this.goodsCount, "store_id": store_id }).then((response) => {
      console.log('result', response);
      if (response.result == 1) {
          this.$router.push(this.fun.getUrl('goodsorder',{ store_id: this.$route.params.store_id, tag: 'store'}));
      } else {
        MessageBox.alert(response.msg);
      }
    }), (response) => {
      MessageBox.alert(response.msg);
    }


    
  },


  goShowCart() {
    if (!this.showCart && this.cartsNum > 0) {
      this.showCart = true;
    } else {
      this.showCart = false;
    }
  },



  getCart(goods) {
    var that = this;
    console.log('getCart...');
    console.log('goods...', goods);
    that.cartsNum = 0;
    that.cartsTotal = 0;
    $http.get('plugin.store-cashier.frontend.shoppingCart.member-cart.index', {store_id:this.$route.params.store_id},"加载中...").then((response) => {
      if (response.result == 1) {
        that.carts = response.data;
        that.goodsCarts = [];
        that.carts.forEach(item => {
          this.$set(that.goodsCarts, item.goods_id, item);
          if (goods && (goods.id == item.goods_id)) {
            goods.buyNum = item.total;
          }
          that.cartsNum += item.total;

          console.log(that.cartsNum);

          console.log(item);
          that.cartsTotal += (item.total * item.goods.price);

        });

      //计算当前商品数量

       console.log(that.carts);

      let good=that.carts.find(item =>item.goods_id == this.$route.params.id);
      console.log(good);
      if(good == undefined){
        that.o2oCount=0;
      }
      that.carts.forEach(item =>{

        
        if(item.goods_id == this.$route.params.id){
          
          that.o2oCount=item.total;
          console.log(item.id);

        }


        
      })


      that.cartsTotal = parseFloat(that.cartsTotal).toFixed(2);
      console.log('cart.result', response.data);
      console.log('goodsCarts...', that.goodsCarts);

        //获取购物车id
        

      } else {
          //Toast("请输入提货人信息");
          //return;
      }
    }), (response) => {
      //alert('网络错误，请稍后再试！')
    }
    
  },


  updateCart(id, num) {
    console.log('reduceCart...');
    console.log('cart...', this.carts);
    console.log('cart id...', id);
    if (num < 0) {
        var total = 0;
        this.carts.forEach(item => {
            if (item.goods_id == id) {
                total = item.total;
            }
        });
        console.log(total+num);
        if (total + num <= 0) {
            this.delItemByCart(id);
            return;
        }
    }
    $http.get('plugin.store-cashier.frontend.shoppingCart.member-cart.updateNum', {num:num, store_id:this.$route.params.store_id,goods_id:id},"加载中...").then((response) => {
      console.log('result', response);
      if (response.result == 1) {
        console.log('response.result', response.result);
        this.getCart();

      } else {
       
        MessageBox('提示', response.msg);
      }
    }), (response) => {
        
    }
    
  },


delItemByCart(cart_id) {
    var that = this;
    $http.get('plugin.store-cashier.frontend.shoppingCart.member-cart.destroy', {store_id:this.$route.params.store_id,goods_id:cart_id},"删除中...").then((response) => {
        if (response.result == 1) {
            that.getCart();

            //that.getCartId();
            that.showCart = false;
        } else {
            //alert('无商品');
            MessageBox('提示', response.msg);
        }
    }), (response) => {
        //alert('网络错误，请稍后再试！')
    }
},


addCart1(goods) {
  console.log('addcart...');
  $http.get('plugin.store-cashier.frontend.shoppingCart.member-cart.store', {goods_id: goods.id, total:1, store_id:this.$route.params.store_id},"加载中...").then((response) => {
    console.log('result', response);
    if (response.result == 1) {
      //goods.buyNum += 1;
      console.log('response.result', response.result);
      this.getCart();

    } else {
      //alert('无商品');
      MessageBox('提示', response.msg);
    }
  }), (response) => {
    //alert('网络错误，请稍后再试！')
  }
},


//获取购物车id
// getCartId(){
//   $http.get("plugin.store-cashier.frontend.shoppingCart.member-cart.getCartId",{goods_id:this.$route.params.id,store_id:this.$route.params.store_id}).then(response =>{
//     console.log(response);
//     if(response.result == 1){
//       this.card_id=response.data.cart_id;

//       this.getCart();
//     }
//   }).catch(error =>{
//     console.log(error);
//   })
// },


init() {
  var that = this;
  $http.get('plugin.store-cashier.frontend.store.get-store-info.get-info-by-store-id', {store_id: this.$route.params.store_id}).then((response) => {
    if (response.result == 1) {
       this.getCart();
       this.o2oName=response.data.store_name;
       this.o2oPhone="tel:"+response.data.store_mobile;
       this.o2oLat=response.data.lat;
       this.o2oLng=response.data.lng;
       console.log(this.o2oPhone);
    } else {

    }
  }), (response) => {
    //alert('网络错误，请稍后再试！')
  }
},


goodsOrder(val) {
  console.log(this.carts);
  let sum=0;

  this.carts.forEach(val =>{
    sum+=val.total;
  })

  if(sum == 0){
    return
  }

  console.log(sum);
  if(val.length == 0 || this.carts.length == 0){
    return
  }else{
    this.$router.push(this.fun.getUrl('goodsorder',{ store_id: this.$route.params.store_id, tag: 'store'}));
  }
},



//全选
lg(){
  console.log("lg");
},

//选中 取消
checkCart(id){
  console.log(id);
},



goToAdress(){
  //this.$router.push({name:'HomeSellerAddress',params:{store_id:this.$route.params.store_id},query:{i:this.toi}})
  window.location.href="http://api.map.baidu.com/marker?location="+this.o2oLat+","+this.o2oLng+"&title=商家位置&content="+this.o2oName+"&output=html";
},

//获取时间-限时购

    timeCompare(begin) {

      let beginTime = new Date(parseInt(begin) * 1000);

      let now = new Date();

      if (now >= beginTime) {
        this.isTime = true;
      } else {
        this.isTime = false;
      }
    },


    //品牌跳转
    toBrandDetail(val) {
      this.$router.push(this.fun.getUrl('GoodsBrand',{id:val}));
    },

    //租赁立即购买

    toRentBuy(val){
      this.$router.push(this.fun.getUrl('goods',{id:val}));
    },


    //倒计时callback

    timeUp(){
      // if(this.timeLimit){

      // }
    },




gotoList(){
  this.$router.push(this.fun.getUrl('o2oStore',{ store_id: this.$route.params.store_id}));
}










    

  






},

  watch: {
    $route(to, from) {


      let a = to;

      console.log(to);
      // 对路由变化作出响应...

      if(to.name=="goods" && from.name=="goods"){
        this.slider();
        this.toi = this.fun.getKeyByI();
        this.goodTop = false;
        if (!this.fun.isTextEmpty(this.fun.getKey("share_tag"))) {
          share_tag = this.fun.getKey("share_tag");
        }
    
        //初始化一下参数
        this.goodsInfo = {};
        this.isGoods = false;
        this.goodsCount = 1;
        this.popupSpecs = false;
        this.popupSpecs2 = false;
        this.isGoodsLove = false;
    
        submitActionTag = "";
        optionsId = "";
        specsManage = [];
        optionsMaxCount = 1;
    
        this.cartsNum=0;
    
        goods_id = this.$route.params.id;
  
        console.log( goods_id);
    
        if (!this.fun.isTextEmpty(this.$route.params.tag) && this.$route.params.tag == "o2o") {
    
          this.is_o2o = true;
          
        } else {
          this.is_o2o = false;
          
        }
    
    
        //初始化客服参数
        this.initCservice("");
        //商品详情 初始化参数
        this.initData();
    
        this.getData();//获取数据
        this.isFavorite();//获取是否收藏
        this.footSet(goods_id);//设置足迹数据
      }
      
      
  
     
    }
  },

  components: { Swipe, SwipeItem, cMyswipe },

  computed:{
    minicartStyle: function () {
      if (this.showCart) {
        return 'display: block;transform: translateY(-100%)';
      }
    },
    leftPrice() {
      if (this.showCart) {
        return 'transform: translateX(-60px);';
      }
    },
    showLogo: function () {
      if (this.showCart) {
        return 'show';
      }
    }
    
  }
}  
