import cTitle from 'components/title';

export default {
    data() {
        return {
            category:[],
            mainInfo:{},
            toi:this.fun.getKeyByI(),
            telephone:""

        }
    },
    //computed: mapState(['mailInfo']),

    mounted() {
        
    },
    created() {
       
    },
    activated() {
        this.init();
        this.getStoresCategory();
        this.getStore();
    },
    methods: {
      //获取页面主要信息
      getStore(){
        $http.get('plugin.store-cashier.frontend.store.get-store-info.get-info-by-store-id', {store_id: this.$route.params.store_id}).then(response=>{
            console.log(response.data);
            if (response.result == 1 && !this.fun.isTextEmpty(response.data)) {
                this.mainInfo=response.data;
                this.telephone="tel:"+response.data.store_mobile;
                this.initShare();
            }
        }).catch(error=>{
            console.log(error);
        })
      },

      getStoresCategory(){
        $http.get('plugin.store-cashier.frontend.store.store-category.get-list').then(response =>{
            if (response.result == 1) {
                this.category = response.data;
            }
        }).catch(error =>{
            console.log(error);
        })
      },

      getStoreDetail(){
        $http.get('plugin.store-cashier.frontend.store.store-home.get-store-information',{store_id:this.$route.params.store_id}).then(response=>{
            console.log(response);
        })
        console.log(this.$route.params.store_id)
      },


      goToShop(){
        this.$router.push({name:'o2oStore',params:{store_id:this.$route.params.store_id},query:{i:this.toi}})
      },

      goToDetail(){
        this.$router.push({name:'HomeSellerDetail',params:{store_id:this.$route.params.store_id},query:{i:this.toi}})
      },

      goToAdress(){
        //this.$router.push({name:'HomeSellerAddress',params:{store_id:this.$route.params.store_id},query:{i:this.toi}})
        window.location.href="http://api.map.baidu.com/marker?location="+this.mainInfo.lat+","+this.mainInfo.lng+"&title=商家位置&content="+this.mainInfo.store_name+"&output=html";
      },

      goToCrash(){
        this.$router.push({name:'cashier_pay',params:{store_id:this.$route.params.store_id},query:{i:this.toi}})
      },

      init(){
        this.category=[];
        this.mainInfo={};
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
  
          let _title = (that.fun.isTextEmpty(that.mainInfo.store_name)) ? data.share.title:that.mainInfo.store_name;
          

          let _link = document.location.href + "&share_tag=2";
          _link = that.fun.isMid(_link, data.info.uid);
  
          let _imgUrl = (that.fun.isTextEmpty(that.mainInfo.store_thumb)) ? data.share.icon : that.mainInfo.store_thumb;
          let _desc = (that.fun.isTextEmpty(that.mainInfo.store_introduce)) ? data.share.desc : that.mainInfo.store_introduce;


    
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



    components: {cTitle},

    compiled() {

        
    }
}
