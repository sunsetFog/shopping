import { mapState } from 'vuex';
import cTitle from 'components/title';
import cMent from 'components/o2oment';
import cStoreList from 'components/storeList';
import { MessageBox } from 'mint-ui';


export default {
    data() {
        return {
            toi: this.fun.getKeyByI(),
            follow_mode: {},
            isfollow: false,
            store_id:'',
            store:{
              comment:{
                average_score: 0,
                comment_total: 0,
                new_comment: null,
              },
              goods_total: 0,
              order_count: 0,
              business_hours: "9:00-22:00",
              store_address: "",
              store_mobile: ""
            },
            category:[],
            goodsList:[],
            goodsCount:0,
            currentCategory:'',
            toolbar:false,
            showGoods:true,
            showStoreInfo:false,
            showCart:false,
            hasCart:false,
            carts:[],
            cartsTotal:0.00,
            cartsNum:0,
            goodsCarts:[],  //购物车转为goods key的数组

            allLoaded: true,//loadmore-all
            goload: false,//loadmore--if
            pageCount: 1,
            catesId: '', 
            loading: false,

        }
    },
    //computed: mapState(['mailInfo']),

    created() {

    },
    activated() {
      this.category=[];
      this.goodsList=[];
      this.currentCategory='';
      this.goodsCount=0;
      this.pageCount = 1;
        //this.ofTempD();
        this.guideFollow();
        this.fun.setWXTitle(this.$store.state.temp.item.janst);
        this.store_id = this.$route.params.store_id;
        console.log('store_id', this.store_id);
        this.init();
        this.getCategory();
        this.cartsNum = 0;
        this.cartsTotal = 0;
        this.showCart = false;
        this.goodsCarts = [];
        this.allLoaded = false;
        
      
    },

    methods: {
      //setting sun
      //搜索跳转
      searchJump(){
        this.$router.push(this.fun.getUrl('StoreSearch',{ store_id: this.store_id}));
      },
      showStore() {
        if (this.showStoreInfo) {
          this.showStoreInfo = false;
          this.showGoods = true;
        } else {
          this.showStoreInfo = true;
          this.showGoods = false;
        }
      },
      goBuy() {
        console.log('goBuy');
        this.$router.push(this.fun.getUrl('cashier_pay',{ store_id: this.store_id}));
      },
      showGoodsInfo() {
        if (this.showGoods) {
          this.showStoreInfo = true;
          this.showGoods = false;
        } else {
          this.showStoreInfo = false;
          this.showGoods = true;
        }
      },
        init() {
          var that = this;
          $http.get('plugin.store-cashier.frontend.store.get-store-info.get-info-by-store-id', {store_id: this.store_id}).then((response) => {
            if (response.result == 1) {
              that.store = response.data;
              that.getCart();
              that.initShare();
              console.log('store', that.store);
            } else {

            }
          }), (response) => {
            //alert('网络错误，请稍后再试！')
          }
        },

        getCategory() {
          var that = this;
          console.log('init category');
          $http.get('plugin.store-cashier.frontend.store.goods-category.get-category-by-store-id', {store_id: this.store_id}).then((response) => {
            if (response.result == 1) {
              console.log('823894==234',response)
              that.category = response.data.list;
              if (that.category.length >0) {
                that.category[0].active = true;
                if (that.category[0].childrens.length > 0) {
                  that.category[0].childrens[0].active = true;
                  that.currentCategory = that.category[0].childrens[0].name;
                  that.pageCount = 1;
                  that.catesId = that.category[0].childrens[0].id;
                  that.getGoodsList(that.category[0].childrens[0].id);
                }
              }

              console.log('category', that.category);
            } else {
              
            }
          }), (response) => {
            //alert('网络错误，请稍后再试！')
          }
        },

      /**
       * 当前一级分类
       * @param items
       */
      selectCategory(items) {
        this.category.forEach(i=>{
          this.$set(i, 'active', false);
        });
        this.$set(items, 'active', true);
        if (items.childrens.length > 0) {
          items.childrens.forEach(i=>{
            this.$set(i, 'active', false);
          });
          this.$set(items.childrens[0], 'active', true);
          this.currentCategory = items.childrens[0].name;
          this.pageCount = 1;
          this.catesId = items.childrens[0].id;
          this.getGoodsList(items.childrens[0].id);
        }
      },

      /**
       * 上一级分类/二级分类
       * @param items
       * @param item
       */
      selectChildCategory(items, item) {
        items.forEach(i=>{
          this.$set(i, 'active', false);
        });
        this.$set(item, 'active', true);
        this.currentCategory = item.name;
        this.pageCount = 1;
        this.catesId = item.id;
        this.getGoodsList(item.id);

        
      },

      /**
       * 二级分类id
       * @param category_id
       */
      getGoodsList(category_id) {
        var that = this;
        that.goload = true;
        console.log('init goodsList');
        $http.get('plugin.store-cashier.frontend.store.goods.get-goods-to-page', {store_id: this.store_id, category_id:category_id,page: that.pageCount},"加载中...").then((response) => {
          console.log('result', response);
          if (response.result == 1) {
            if(that.pageCount == 1){
              that.goodsList = [];
            }
            that.pageCount = Number(that.pageCount) + 1;
            that.loading = false;
						that.allLoaded = false;
						// 搜索结果为空
						if (response.data.total <= 0) {
							that.loading = true;
							that.allLoaded = true;
							return;
						}
            // that.goodsList = response.data.data;
            that.goodsList = that.goodsList.concat(response.data.data);
            that.goodsCount = that.goodsList.length;
            console.log('goodsList', that.goodsList);

						if (response.data.current_page == response.data.last_page) {
							console.log('15条');
							that.loading = true;
							that.allLoaded = true;
							return;
						}




          } else {
            // that.loading = true;
						// that.allLoaded = true;
            that.goodsList=[];
            that.goodsCount = that.goodsList.length;
          }
        }), (response) => {
          //alert('网络错误，请稍后再试！')
        }
      },
      loadTop() {
        console.log('加载更多启动top');

      },
      //loadmore
      loadBottom() {
        
        if(this.allLoaded == false){
            this.getGoodsList(this.catesId);
            this.$refs.loadmore.onBottomLoaded();
        }
        
        
      },

      addCart(goods) {
        console.log('addcart...');
        $http.get('plugin.store-cashier.frontend.shoppingCart.member-cart.store', {goods_id: goods.id, total:1, store_id:this.store_id}).then((response) => {
          console.log('result', response);
          if (response.result == 1) {
            //goods.buyNum += 1;
            console.log('response.result', response.result);
            this.getCart(goods);

          } else {
            //alert('无商品');
            MessageBox('提示', response.msg);
          }
        }), (response) => {
          //alert('网络错误，请稍后再试！')
        }
      },

        /**
         *
          * @param id   购物车id
         * @param num
         */
      updateCart(id, num) {
        console.log('reduceCart...');
        console.log('cart...', this.carts);
        console.log('cart id...', id);
        if (num < 0) {
            var total = 0;
            this.carts.forEach(item => {
                if (item.id == id) {
                    total = item.total;
                }
            });

            if (total + num <= 0) {
                this.delItemByCart(id);
                return;
            }
        }
        $http.get('plugin.store-cashier.frontend.shoppingCart.member-cart.updateNum', {id: id, num:num, store_id:this.store_id}).then((response) => {
          console.log('result', response);
          if (response.result == 1) {
            console.log('response.result', response.result);
            this.getCart();

          } else {
           
            MessageBox('提示', response.msg);
          }
        }), (response) => {
            
        }
        // $http.get('plugin.store-cashier.frontend.shoppingCart.member-cart.updateNum', {id: id, num:num, store_id:this.store_id}).then(response => {
        //   console.log('result', response);
        //   if (response.result == 1) {
        //     console.log('response.result', response.result);
        //     this.orderShow=false;
        //     this.getCart();

        //   } else {
           
        //     MessageBox('提示', response.msg);
        //   }
        // }).catch(error =>{
        //   console.log(error);
        // })
      },

        delItemByCart(cart_id) {
            var that = this;

            $http.get('plugin.store-cashier.frontend.shoppingCart.member-cart.destroy', {store_id:this.store_id, ids:cart_id}).then((response) => {
                if (response.result == 1) {
                    that.getCart();
                    that.showCart = false;
                } else {
                    //alert('无商品');
                    MessageBox('提示', response.msg);
                }
            }), (response) => {
                //alert('网络错误，请稍后再试！')
            }
        },

      clearCart() {
        var that = this;
        console.log('clearCart...');
        var destroyCarts = [];
        this.carts.forEach(item => {
          destroyCarts.push(item.id);
        });


        $http.get('plugin.store-cashier.frontend.shoppingCart.member-cart.destroy', {store_id:this.store_id, ids:destroyCarts}).then((response) => {
          if (response.result == 1) {
            that.getCart();
            that.showCart = false;
          } else {
            //alert('无商品');
            MessageBox('提示', response.msg);
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
          this.$router.push(this.fun.getUrl('goodsorder',{ store_id: this.store_id, tag: 'store'}));
        }
      },

      /**
       * 如果传了商品，通过商品id获取购物车数量
       * @param goods
       */
      getCart(goods) {
        var that = this;
        console.log('getCart...');
        console.log('goods...', goods);
        that.cartsNum = 0;
        that.cartsTotal = 0;
        $http.get('plugin.store-cashier.frontend.shoppingCart.member-cart.index', {store_id:this.store_id}).then((response) => {
          if (response.result == 1) {
            that.carts = response.data;
            that.goodsCarts = [];
            that.carts.forEach(item => {
              this.$set(that.goodsCarts, item.goods_id, item);
              if (goods && (goods.id == item.goods_id)) {
                goods.buyNum = item.total;
              }
              that.cartsNum += item.total;
              that.cartsTotal += (item.total * item.goods.price);
            });

          that.cartsTotal = parseFloat(that.cartsTotal).toFixed(2);
          console.log('cart.result', response.data);
          console.log('goodsCarts...', that.goodsCarts);

          } else {
              //Toast("请输入提货人信息");
              //return;
          }
        }), (response) => {
          //alert('网络错误，请稍后再试！')
        }
        // $http.get('plugin.store-cashier.frontend.shoppingCart.member-cart.index', {store_id:this.store_id}).then((response) => {
        //   if (response.result == 1) {
        //     that.carts = response.data;
        //     that.goodsCarts = [];
        //     that.carts.forEach(item => {
        //       this.$set(that.goodsCarts, item.goods_id, item);
        //       if (goods && (goods.id == item.goods_id)) {
        //         goods.buyNum = item.total;
        //       }
        //       that.cartsNum += item.total;
        //       that.cartsTotal += (item.total * item.goods.price);
        //     });

        //   that.cartsTotal = parseFloat(that.cartsTotal).toFixed(2);
        //   console.log('cart.result', response.data);
        //   console.log('goodsCarts...', that.goodsCarts);

        //   } else {
             
        //   }
        // }).then(function(){
        //   that.orderShow=true;
        // }).catch(response => {
          
        // })
      },

      goShowCart() {
        if (!this.showCart && this.cartsNum > 0) {
          this.showCart = true;
        } else {
          this.showCart = false;
        }
      },

      showToolbar() {
        if (this.toolbar) {
          this.toolbar = false;
        } else {
          this.toolbar = true;
        }
      },

      tel() {
        window.location.href = 'tel://' + this.store.store_mobile;
      },
        //关注方法
        guideFollow() {
            $http.get('member.member.guideFollow').then((response) => {
                if (response.result == 1) {
                    this.isfollow = true;
                    this.follow_mode = response.data;
                } else {
                    this.follow_mode = false;
                    console.log(response.msg)
                }
            }), (response) => {
                //alert('网络错误，请稍后再试！')
            }
        },

        tosearch() {
            this.$router.push(this.fun.getUrl('search'));
            //this.$router.push('/search');
        },
        slider() {
            var top = document.documentElement.scrollTop || document.body.scrollTop;
            if (top < 50) { this.amout = false; } else { this.amout = true; }
        },

        // //获取商城信息
        getMailInfo() {
            let that = this;

            $http.get('setting.get').then(function (response) {
                console.log(response);
                if (response.result == 1) {
                    that.fun.setWXTitle(response.data.name);
                } else {

                }

            }, function (response) {
                // error callback
            });
        },
        //获取地址信息
        getAddressInfo() {
            var that = this;
            if (this.$store.state.city.length == 0 || this.$store.state.province.length == 0 || this.$store.state.district.length == 0) {
                //saveAddresssInfo

                $http.get('member.member-address.address').then(function (response) {

                    if (response.result == 1) {
                        //console.log(JSON.stringify(response.data.city));
                        that.$store.commit('saveAddresssInfo', { city: response.data.city, province: response.data.province, district: response.data.district });
                    }
                }, function (response) {
                    // error callback
                })

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

        //添加购物车地cartId
        goToGoodsO2O(goods){
          this.$router.push(this.fun.getUrl('goodsO2O', { id: goods.goods_id ,"tag":"o2o",store_id: this.store_id}));
        },


        //分享

        initShare(){
          let that=this;
          $http.post('member.member.wxJsSdkConfig', {}).then(response =>{
              if(response.result == 1){
                  this.share(response.data);
                  
              }
          }).catch(error=>{
              console.log(error);
          })
        },
  
        share(data) {
          let that = this;
          wx.config(data.config);
          wx.ready(function () {
    
            let _title = (that.fun.isTextEmpty(that.store.store_name)) ? data.share.title:that.store.store_name;
            
  
            let _link = document.location.href + "&share_tag=2";
            _link = that.fun.isMid(_link, data.info.uid);
    
            let _imgUrl = (that.fun.isTextEmpty(that.store.store_thumb)) ? data.share.icon : that.store.store_thumb;
            let _desc = (that.fun.isTextEmpty(that.store.store_introduce)) ? data.share.desc : that.store.store_introduce;
  
            console.log(_imgUrl);
      
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
        
    },

    components: { cTitle, cMent, cStoreList},
    computed: {
      // a computed getter
      minicartStyle: function () {
        if (this.showCart) {
          return 'display: block;transform: translateY(-100%)';
        }
      },
      showLogo: function () {
        if (this.showCart) {
          return 'show';
        }
      },
      leftPrice() {
        if (this.showCart) {
          return 'transform: translateX(-60px);';
        }
      }
    },
    compiled() {

        this.datate();
    }
}
