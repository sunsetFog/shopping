import { mapState } from 'vuex';
import cTitle from 'components/title';
import cMent from 'components/o2oment';
import cStoreList from 'components/storeList';
//import { Swipe, SwipeItem } from 'mint-ui';
import banner from 'components/temp/banner';
import showbanner from 'components/temp/banner';
import showmenu from 'components/temp/menu';
import showtitle from 'components/temp/title';
import showsearch from 'components/temp/search';
import showline from 'components/temp/line';
import showblank from 'components/temp/blank';
import showrichtext from 'components/temp/richtext';
import showpicture from 'components/temp/picture';
import showcube from 'components/temp/cube';
import showarea from 'components/temp/area';
import showshop from 'components/temp/shop';
import showgoods from 'components/temp/goods';
import shownotice from 'components/temp/notice';

import cMyswipe from 'components/myswipe';
import { Swipe, SwipeItem } from 'components/meswipe';
//import BMap from 'BMap';
import { Indicator, Toast } from 'mint-ui';
import { Loadmore } from 'mint-ui';

/*function getParams(name) {

  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
}

function dynamicLoadJs(url, callback) {
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  if(typeof(callback)=='function'){
    script.onload = script.onreadystatechange = function () {
      if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete"){
        callback();
        script.onload = script.onreadystatechange = null;
      }
    };
  }
  head.appendChild(script);
}

let token = getParams('token');
if (!token) {
  dynamicLoadJs('https://api.map.baidu.com/api?v=2.0&ak=B3475112871cafd7401aa6395bde02f1',function(){alert('加载成功')});
  //import BMap from 'BMap'
}*/

var items = [{
    "id": "M1491471961972",
    "temp": "showsearch",
    "params": {
        "placeholder": "", "style": "style2", "color": "#000",
        "bgcolor": "#FFF", "bordercolor": "#fa1f24", "searchurl": "", "uniacid": "6"
    }
    , "data": "", "other": "", "content": ""
}]

export default {
    data() {
        return {
            toi: this.fun.getKeyByI(),
            amout: false, index2: 1,
            category: [],
            goodsListData: [],
            ads: [],
            banner: banner,
            bannername: 'banner',
            bannerData: [],
            "other": "",
            "content": "",
            show: true,
            tempData: items,
            oftemp: false,
            dftempData: false,
            follow_mode: {},
            isfollow: false,
            pageinfo: '',
            address:'',
            point:{},
            stores:[],
            city:'',
            carousels:[],
            loading: false,
            moreNum: 1,
            activeMore: false,
            topStatus: '',
			bottomStatus: '',
            getAllLoaded: false,
			allLoaded: false,
			goload: false,
            isLoadMore: true,
            page: 1,
			total_page: 0,
        }
    },
    //computed: mapState(['mailInfo']),
    //实时监测this.$store.state.service.chinese的变化，获取最新的语言包
    computed: {

    },
    mounted() {
        console.log('mounted');

        window.addEventListener('scroll', this.slider);
      //this.ready();
    },
    created() {
        console.log('created');
        this.loadMap();
    },
    activated() {
        console.log('activated');
        //this.ofTempD();
        //this.guideFollow();
        //this.fun.setWXTitle(this.$store.state.temp.item.janst);
        this.ready();
        this.indexData();
        this.activeMore = false;
        this.$store.commit('setReferer', '');
        console.log('referer',this.$store.state.referer,window.location.href);
    },
    methods: {
      loadMap: function () {
        // setTimeout(this.ready, 0)
      },
      ready: function () {
        //this.getLocation();

        //this.getChooseCity();

        //var myLocation = window.localStorage.getItem('myLocation');
        var myLocation = this.$store.state.o2oLocation;
        this.initData();

        if (myLocation.point) {
            //myLocation = JSON.parse(myLocation);

            this.address = myLocation.title;
            this.city = myLocation.city;
            this.point = myLocation.point;
            //this.$store.commit('updateLocation', myLocation);
            //this.$store.commit('setLocation', myLocation);
            //初始化数据
            this.getStores();
            //this.getStoresCategory();
        } else{
            console.log('location不存在');
            this.getLocation();
        }
      },

    //顶部状态发生变化相应事件
	handleTopChange(status) {
		this.topStatus = status;
	},
	//底部状态发生变化相应事件
	handleBottomChange(status) {
		this.allLoaded = false;// 若数据已全部获取完毕,不在显示加载更多组件
		this.bottomStatus = status;
	},
	initData() {
		this.page = 1;
		this.goload = true;
		this.total_page = 0;
		this.loading = false;
		this.allLoaded = false;
		this.isLoadMore = true;

	},
	//更新
	loadTop() {
		this.initData();
		var myLocation = this.$store.state.o2oLocation;
        if (myLocation.point) {
            this.address = myLocation.title;
            this.city = myLocation.city;
            this.point = myLocation.point;

            //初始化数据
            this.getStores();
        } else{
            console.log('location不存在');
            this.getLocation();
        }
		this.$refs.loadmore.onTopLoaded();
	},
	// 加载更多
	loadBottom() {
        //	this.allLoaded = true;// 若数据已全部获取完毕,不在显示加载更多组件
       if (this.isLoadMore) {
           console.log('加载更多');

           this.getMoreData(this.page);
           this.$refs.loadmore.onBottomLoaded();

        } else {
           console.log('没有更多数据');
        }
	},

      getLocation() {
        var that = this;
        var mapObj = new AMap.Map('iCenter');
        mapObj.plugin('AMap.Geolocation', function () {
          var geolocation = new AMap.Geolocation({
            enableHighAccuracy: true, // 是否使用高精度定位，默认:true
            timeout: 1000,           // 超过10秒后停止定位，默认：无穷大
            maximumAge: 0,            // 定位结果缓存0毫秒，默认：0
            convert: true,            // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            showButton: true,         // 显示定位按钮，默认：true
            buttonPosition: 'LB',     // 定位按钮停靠位置，默认：'LB'，左下角
            buttonOffset: new AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            showMarker: true,         // 定位成功后在定位到的位置显示点标记，默认：true
            showCircle: true,         // 定位成功后用圆圈表示定位精度范围，默认：true
            panToLocation: true,      // 定位成功后将定位到的位置作为地图中心点，默认：true
            zoomToAccuracy:true       // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          });
          mapObj.addControl(geolocation);
          geolocation.getCurrentPosition();
          AMap.event.addListener(geolocation, 'complete', onComplete); // 返回定位信息
          AMap.event.addListener(geolocation, 'error', onError);       // 返回定位出错信息
        });

        function onComplete(obj){
          var res = '经纬度：' + obj.position +
            '\n精度范围：' + obj.accuracy +
            '米\n定位结果的来源：' + obj.location_type +
            '\n状态信息：' + obj.info +
            '\n地址：' + obj.formattedAddress +
            '\n地址信息：' + JSON.stringify(obj.addressComponent, null, 4);
         //alert(res);
          //alert(JSON.stringify(obj.addressComponent, null, 4));
          var position = obj.position.toString().split(",");
          that.point = {
            lat:position[1],
            lng:position[0],
          };
          that.address = obj.formattedAddress;
          that.title = obj.formattedAddress;
          that.city = obj.addressComponent.city;

          var pos = {
            address:obj.formattedAddress,
            city:obj.addressComponent.city,
            title:obj.formattedAddress,
            point:that.point,
          }
          console.log('test pos', pos);
          that.$store.commit('setLocation', pos);
          that.getStores();



        }

        function onError(obj) {
          //alert(obj.info + '--' + obj.message);
          console.log(obj);
        }
      },

      //获取tengxun定位
      getLocation_qq() {
        /*var geolocation = new qq.maps.Geolocation("OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77", "myapp");
        geolocation.getLocation(showPosition, showErr, options);
        var options = {timeout: 8000};
        var that = this;

        function showPosition(position) {
          //positionNum ++;
          console.log('tx:', position);
          that.address = position.addr;//addComp.city + addComp.district + addComp.street;
          that.city = position.city;

          that.point = {
            lat:position.lat,
            lng:position.lng,
          };
          var pos = {
            address:that.address,
            city:that.city,
            title:that.address,
            point:that.point,
          }

          that.$store.commit('setLocation', pos);
          that.getStores();

        };

        function showErr() {
          //positionNum ++;
          //todo, 弹出失败框
          console.log('tx err:');

        }*/
      },

      getLocationxxx: function () {

        //return;
        //window.localStorage.removeItem("myLocation");
        /*var that = this;
          var map = new BMap.Map("allmap");

          var selCity="";

          var geolocation = new BMap.Geolocation();

        geolocation.getCurrentPosition(function(r){
          if(this.getStatus() == BMAP_STATUS_SUCCESS){
            var mk = new BMap.Marker(r.point);
            console.log('您的位置ok：', r);

              var pt = new BMap.Point(r.point.lng,r.point.lat);
              //创建一个地理位置解析器
              var geoc = new BMap.Geocoder();
              geoc.getLocation(pt, function(rs){//解析格式：城市，区县，街道
                  var addComp = rs.addressComponents;
                  console.log('addComp', addComp);
                  that.address = addComp.city + addComp.district + addComp.street;
                  that.city = addComp.city;

                  that.point = r.point;
                  var pos = {
                      address:that.address,
                      city:that.city,
                      title:that.address,
                      point:r.point,
                  }

                  that.$store.commit('setLocation', pos);
                  that.getStores();
                  //alert(addComp.city + ", " + addComp.district + ", " + addComp.street);
              });
              return false;


          }
          else {
            //todo, 获取收货地址
            that.getMyAddress();
          }
        },{enableHighAccuracy: true})*/
      },

      getMyAddress () {
        if (0) {
          //todo, 失败则跳转
          this.$router.push(this.fun.getUrl('o2oLocation'));
        }
      },

      getStores() {
          console.log('getStoresaaaa111=====:::', this.point);
        var that = this;

        that.getStoresCategory();
        $http.get('plugin.store-cashier.frontend.store.store.get-store-list-to-page', {kwd:'', lng:this.point.lng,lat:this.point.lat,city_name:this.city,page: that.page},"").then((response) => {
            if (response.result == 1) {                     
              console.log('stores:', response);
            //   that.stores = response.data.data;
            var myData = response.data;
            that.total_page = myData.total;
            
            // if (myData.currentPage < myData.lastPage) {
            //    that.activeMore = true;
            // }

            // that.stores = myData.data;



                        that.loading = false;
                        that.allLoaded = false;
                        that.activeMore = true;
						// 搜索结果为空
						if (response.data.total <= 0) {
							that.loading = true;
                            that.allLoaded = true;
                            that.activeMore = false;
							return;
                        }
                        that.stores = myData.data;

					
						if (response.data.currentPage == response.data.lastPage) {
							that.loading = true;
                            that.allLoaded = true;
                            that.activeMore = false;
							return;
						}





                console.log('res9999---pramas',that.allLoaded)
            } else {
              that.stores = [];  
              that.loading = true;
                that.allLoaded = true;
                that.activeMore = false;
              console.log(response.msg)
            }
        }), (response) => {
          //alert('网络错误，请稍后再试！')
        }
      },

      getStoresCategory() {
          var that = this;
        $http.get('plugin.store-cashier.frontend.store.store-category.get-list').then((response) => {
          if (response.result == 1) {
              that.category = response.data;
              console.log('category', response);
        } else {
        }
      }), (response) => {
          //alert('网络错误，请稍后再试！')
        }
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
            console.log(this.point);
            this.$router.push(this.fun.getUrl('o2oSearch', {city:this.city, point:JSON.stringify(this.point)}));
            //this.$router.push('/search');
        },

        tolocation() {
            this.$router.push(this.fun.getUrl('o2oLocation'));
        },

        slider() {
            var top = document.documentElement.scrollTop || document.body.scrollTop;
            if (top < 50) { this.amout = false; } else { this.amout = true; }
        },
        //默认首页数据
        indexData() {
            let that = this;
            $http.get('plugin.store-cashier.frontend.store.get-default.get-index-data').then(function (response) {
                //alert(response.data)
                if (response.result == 1) {
                    console.log('index::::', response);
                    that.bannerData = response.data.banner;
                    that.carousels = response.data.carousels;
                    that.ads = response.data.advs;
                    console.log('ads:', that.ads);
                } else {
                    console.log(response.msg);
                }

            }, function (response) {
                // error callback
                console.log(response);
            });
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
        //查看用户是否需要绑定手机号
        bindMobile() {

            //route=setting.get
            $http.get('setting.get').then((response) => {
                if (response.result == 1) {
                    if (response.data.is_bind_mobile == 1) {
                        //跳转绑定手机页面
                        //this.$router.push({ name: "editmobile", params: { num:'', myparent: this }, query: { i: this.toi } });
                        this.$router.push(this.fun.getUrl('editmobile', { num: '', myparent: this }));
                    }

                } else {

                }

            }, (response) => {
                // error callback
                console.log(response);
                this.oftemp = false; this.dftempData = true;
            });
        },

        //banner点击
        bannerClick(item) {
          console.log('bannerClick', item);
            if (!this.fun.isTextEmpty(item.link)) {
                window.location.href = item.link;//跳转
            }
        },
      
        moreEvent(){
            
            this.moreNum = Number(this.moreNum) + 1;
            console.log('more--res',this.moreNum);
            this.getStores();
        },

        getMoreData(page) {
            var that = this;
            if (this.page == this.total_page) {
                return;
            }

            if (this.page >= this.total_page) {
                that.loading = true; that.allLoaded = true; 
                return;
            } else {
                this.page = this.page + 1;
                $http.get('plugin.store-cashier.frontend.store.store.get-store-list-to-page', {kwd:'', lng:this.point.lng,lat:this.point.lat,city_name:this.city,page: this.page},"获取更多门店").then((response) => {
                    if (response.result == 1) {
                        var myData = response.data;
                        that.loading = false; that.allLoaded = false;

                        if (myData.currentPage >= myData.lastPage) {
                            that.activeMore = false;
                            that.loading = true;
                        }
                        
                        that.stores = that.stores.concat(myData.data);//数组拼接
                    } else {
                        that.page = that.page - 1;
                        that.activeMore = false;

                        that.loading = true; that.allLoaded = true; that.isLoadMore = false; 
                        return;
                    }
                }, function (response) {
                    // error callback
                });

            }


        }



    },



    components: { cTitle, cMent, cStoreList, banner, showbanner, showmenu, showtitle, showsearch, showline, showblank, showrichtext, showpicture, showcube, showarea, showshop, showgoods, shownotice, cMyswipe, Swipe, SwipeItem },

    compiled() {

        this.datate();
    }
}
