import { mapState, mapMutations } from "vuex";
import cStoreList from "components/storeList";
import { Indicator, Toast } from 'mint-ui';
import cTitle from 'components/title';
export default {
  data() {
    return {
      title: "搜索",
      inputs: "",
      amout: false,
      order_by: "",
      order_field: "",
      id: "",

      //


      stores: [],
      loading: false,
      allLoaded: false,
      goload: true,
      isLoadMore: true,
      page: 1,
      total_page: 0,

      point: {}
    };
  },
  activated() {
    // console.log("point");
    // this.id = this.$route.params.id;
    this.initData();
    this.getStoresByCategoryId();
  },

  mounted() {
    //this.slider();
  },
  methods: {
    // 加载更多
    loadBottom() {
      console.log("加载更多启动");
      this.gotoSearch(n);
      this.$refs.loadmore.onBottomLoaded();
    },
    goback() {
      this.$router.go(-1);
    },
    getStoresByCategoryId() {
      this.$dialog.loading.open('定位中...');

      // var that = this;
      // var geolocation = new BMap.Geolocation();
      // geolocation.getCurrentPosition(
      //   function (r) {
      //     if (this.getStatus() == BMAP_STATUS_SUCCESS) {
      //       var mk = new BMap.Marker(r.point);
      //       console.log("您的位置：", r);
      //       that.point = r;
      //       that.getStoresByCategoryIdLngAndLat(r);
      //     } else {
      //       Toast("没有请求到位置信息");
      //     }
      //   },
      //   { enableHighAccuracy: true }
      // );


      var mapObj = new AMap.Map("");

      var that = this;

      mapObj.plugin('AMap.Geolocation', function () {

        var geolocation = new AMap.Geolocation({
          enableHighAccuracy: true,//是否使用高精度定位，默认:true
          timeout: 10000,          //超过10秒后停止定位，默认：无穷大
          maximumAge: 0,           //定位结果缓存0毫秒，默认：0
          convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
          showButton: true,        //显示定位按钮，默认：true
          buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
          buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
          showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
          panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
          zoomToAccuracy: true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        });

        mapObj.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, 'complete', that.onComplete);//返回定位信息
        AMap.event.addListener(geolocation, 'error', that.onError);      //返回定位出错信息

      })


    },

    getStoresByCategoryIdLngAndLat(r) {
      // var that = this;
      // let json = {
      //   category_id: this.id,
      //   lng: r.point.lng,
      //   lat: r.point.lat,
      //   city_name: r.address.city,
      //   page: this.page
      // };
      var that = this;
      let json = {
        category_id: this.id,
        lng: r.position.getLng(),
        lat: r.position.getLat(),
        city_name: r.addressComponent.city,
        page: this.page
      };
      $http.get("plugin.store-cashier.frontend.store.store.get-store-list-by-category-id-to-page", json, "").then(response => {
        if (response.result == 1) {
          console.log("store", response);
          that.stores = response.data.data;
          this.total_page = response.data.lastPage;
        } else {
          that.stores = [];
          Toast(response.msg);
        }
      }).catch(error => {
        console.log(error);
      });
    },


    getMoreData(r) {
      var that = this;
      if (this.page == this.total_page) {

        return;

      }
      if (this.page >= this.total_page) {
        that.loading = true; that.allLoaded = true; return;

      } else {
        this.page = this.page + 1;
        // let json = {
        //   category_id: this.id,
        //   lng: r.point.lng,
        //   lat: r.point.lat,
        //   city_name: r.address.city,
        //   page: this.page
        // }
        let json = {
          category_id: this.id,
          lng: r.position.getLng(),
          lat: r.position.getLat(),
          city_name: r.addressComponent.city,
          page: this.page
        };
        $http.get('plugin.store-cashier.frontend.store.store.get-store-list-by-category-id-to-page', json, '正在获取更多...').then(function (response) {

          if (response.result == 1) {

            that.loading = false;
            that.allLoaded = false;
            that.stores = that.stores.concat(response.data.data);//数组拼接

          } else {
            that.page = that.page - 1;
            that.loading = true;
            that.allLoaded = true;
            that.isLoadMore = false;
            return;
          }
        }, function (response) {
          // error callback
        });

      }
    },
    //更新
    loadTop() {
      this.initData();
      this.getStoresByCategoryId();
      this.$refs.loadmore.onTopLoaded();
    },
    // 加载更多
    loadBottom() {

      //	this.allLoaded = true;// 若数据已全部获取完毕,不在显示加载更多组件
      if (this.isLoadMore) {

        this.getMoreData(this.point);
        this.$refs.loadmore.onBottomLoaded();

      } else {
        console.log('没有更多数据');
      }

    },

    initData() {
      this.id = this.$route.params.id;
      this.stores = [];
      this.page = 1;
      this.goload = true;
      this.total_page = 0;
      this.loading = true;
      this.allLoaded = false;
      this.isLoadMore = true;
      this.point = {};
    },

    onComplete(data){
      this.$dialog.loading.close();
      console.log(111);
      console.log(data.addressComponent.city);
      this.point = data;

      this.getStoresByCategoryIdLngAndLat(data)
    },

    onError(error){
      Toast(error.message);
    }
  },

  components: { cStoreList, cTitle }
};
