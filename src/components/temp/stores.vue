<template>
	<div>
<mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" bottomPullText='' bottomDropText='下拉加载...' bottomLoadingText='' :autoFill='false'>
	<div class="store-list"  @click="toRouter(items)" v-for="items in stores" :style="{'background-color':datas.params.bgcolor}">
		<div class="store-img">
			<a class="store-logo" >
				<!--<img :src="{{d.imgurl}}">-->
				<img :src="items.thumb">
			</a>
			<div class="store-category" >

				<span @click.stop="toClassify(items.has_one_category.id)" class="da store-category-name" :style="{'color':datas.params.catecolor}">{{items.has_one_category.name}}</span>
			</div>
		</div>
		<div class="store-intro" >
			<div class="a8q ">
				<h2 class="" :style="{'color':datas.params.namecolor}">{{items.store_name}}</h2>

			</div>
			<div class="a06 a8r">
				<strong class="i8">
					<span class="da" :style="{'color':datas.params.shipcolor}">{{items.dispatch}}</span>
				</strong>
			</div>
			<div class="a8v">
				<p class="a8d">
					<span class="a79 clearfix"><i></i><i></i><i></i><i></i><i class="zo"></i></span>
				</p>
				<p class="a8w" v-show="datas.params.showsale == 1">
					<span class="line_split"></span>月售{{items.order_total}}单
				</p>
			</div>
			<div class="a8v" v-show="datas.params.showscore == 1" >
				<p class="a8w" :style="{'color':datas.params.salecolor}">
				<span style="margin-right:0.625rem;" v-if="items.store_point.point_switch == 0?false:true">{{items.store_point.point}}</span><span v-if="items.store_point.point_deduct_switch == 0?false:true">{{items.store_point.max_point_deduct}}</span>
				</p>
			</div>
			<div class="a8v" v-show="datas.params.showlove == 1">
				<p class="a8w" :style="{'color':datas.params.salecolor}">
				<span style="margin-right:0.625rem;" v-if="items.store_love.award==1?true:false">{{items.store_love.award_proportion}}</span><span v-if="items.store_love.deduction==1?true:false">{{items.store_love.deduction_proportion}}</span>
				</p>
			</div>
		</div>
		<div class="store_honor_box">
			<div class="store_honor_icon1">
				<a :href="'tel:' + items.mobile">
				<i class="fa fa-phone" aria-hidden="true" :style="{'color':datas.params.telcolor}" style="font-size: 16px;margin-right: 0.9375rem;"></i>
				</a>
				<i @click.stop="nav(items)" class="fa fa-location-arrow" aria-hidden="true"  :style="{'color':datas.params.navcolor}" style="font-size: 16px;"></i>
			</div>
			<span class="store_honor_icon1"  :style="{'color':datas.params.discolor}" style="font-size: 12px;">距离{{items.distance}}{{items.unit}}</span>
		</div>
	</div>
		<div id="allmap"></div>
		<div style="width: 100%;height: 40px;line-height: 40px;text-align: center;" v-if="loading">暂无数据</div>
</mt-loadmore>
	</div>

</template>
<script>
  import AMap from 'AMap';

    export default {
        props: ['datas'],
        data() {
            return {
                mid:this.fun.getKeyByMid(),
                toi:this.fun.getKeyByI(),
                location:this.$store.state.o2oLocation,
				point:{},
				city:'',
                stores:[],
				address:'',
				//setting sun
				allLoaded: true,
				loading: false,
				pageNum: 1,
				resState: false,
				pageState: false,
            }
        },
        mounted() {
			//setting sun 
			this.pageState = false;
			this.resState = false;
			this.pageNum = 1;
			this.loading = false;
			this.stores = [];
			
            console.log('store-mounted',this.datas);
            console.log('==========mounted-location=========',this.location);
            this.ready();
			if (this.location.point == undefined) {
                console.log('info===== not exists location.');

                this.ready();
			} else {
			    this.point = this.location.point;
				this.city = this.location.city;
				this.getStores();
			}
			
            

        },
        created() {

        },
        activated() {
            console.log('activated');
            console.log('activated-location',this.location);
            if (this.location.point == undefined) {
                console.log('info===== not exists location.');
                this.ready();
            } else {
                this.point = this.location.point;
                this.city = this.location.city;
			}
			//setting sun 
			this.pageState = false;
			this.resState = false;
			this.pageNum = 1;
			this.loading = false;
			this.stores = [];
			this.getStores();
			
        },
        methods:{
			//setting sun
			loadBottom() {
				
				if(this.allLoaded == false){
					this.pageState = true;
					this.getStores();
					this.$refs.loadmore.onBottomLoaded();
				}
            },

            toSeller(id){
                this.$router.push({name:'HomeSeller',params:{store_id:id},query:{i:this.toi}})
            },

            //跳转至分类
            toClassify(id){
                console.log(location.href);
                this.$router.push(this.fun.getUrl('o2oCategory',{id:id}));
            },

            nav(store){
                //console.log(store.longitude);
                //return;
                var map = new BMap.Map("allmap");
                var point = new BMap.Point(store.longitude,store.latitude);
                map.centerAndZoom(point, 16);
                map.enableScrollWheelZoom();

                /*var myIcon = new BMap.Icon("myicon.png",new BMap.Size(30,30),{
                    anchor: new BMap.Size(10,10)
                });*/

                var myIcon = new BMap.Icon(
                    'http://webmap0.map.bdstatic.com/wolfman/static/common/images/us_cursor_9517a2b.png', // 百度图片
                    new BMap.Size(10,22), // 视窗大小
                    {
                        imageSize: new BMap.Size(144,92), // 引用图片实际大小
                        imageOffset:new BMap.Size(-10,0)  // 图片相对视窗的偏移
                    }
                );

                var marker=new BMap.Marker(point,{icon: myIcon});
                map.addOverlay(marker);

                var geolocation = new BMap.Geolocation();
                geolocation.getCurrentPosition(function(r){
                    if(this.getStatus() == BMAP_STATUS_SUCCESS){
                        var mk = new BMap.Marker(r.point);
                        map.addOverlay(mk);
                        //map.panTo(r.point);//地图中心点移到当前位置
						//130.37229,46.818283
                        var latCurrent = r.point.lat;
                        var lngCurrent = r.point.lng;


                        location.href="https://api.map.baidu.com/direction?origin="+latCurrent+","+lngCurrent+"&destination="+store.latitude+","+store.longitude+"&mode=driving&region=全国&output=html";
                        //location.href="https://api.map.baidu.com/direction?origin="+latCurrent+","+lngCurrent+"&destination=46.818283,130.37229&mode=driving&region=全国&output=html";

                    }
                    else {
                        alert('failed'+this.getStatus());
                    }
                },{enableHighAccuracy: true})


                map.addOverlay(marker);
                //todo, 接口里没有地址信息，就先不创建marker了
                var licontent="<b>"+store.address.detailed_address+"</b><br>";
                licontent+="<span><strong>地址：</strong>"+store.address.detailed_address+"</span><br>";
                licontent+="<span><strong>电话：</strong>"+store.mobile+"</span><br>";
                var opts = {
                    width : 200,
                    height: 80,
                };
                var  infoWindow = new BMap.InfoWindow(licontent, opts);
                marker.openInfoWindow(infoWindow);
                marker.addEventListener('click',function(){
                    marker.openInfoWindow(infoWindow);
                });
			},

            toRouter(item){
				// this.$router.push({name:'o2oStore',params:{store_id:id},query:{i:this.toi}});
				if(item.specify_show == 1){
					this.$router.push(this.fun.getUrl('o2oStore',{store_id:item.id}));
				}else{
					this.$router.push(this.fun.getUrl('HomeSeller',{store_id:item.id}));
				}

			},
            ready: function () {
                //this.getLocation();

                var myLocation = this.$store.state.o2oLocation;;

                if (myLocation.point) {
                    this.address = myLocation.title;
                    this.city = myLocation.city;
                    this.point = myLocation.point;
                    console.log('myLocation:', myLocation);
                    this.$store.commit('updateLocation', myLocation);

                    //初始化数据
                    //this.getStores();
                    //this.getStoresCategory();
                } else{
                    console.log('location不存在');
                    this.getLocation();
                }
            },

            getLocation: function () {
              var that = this;
              var mapObj = new AMap.Map('iCenter');
              mapObj.plugin('AMap.Geolocation', function () {
                var geolocation = new AMap.Geolocation({
                  enableHighAccuracy: true, // 是否使用高精度定位，默认:true
                  timeout: 10000,           // 超过10秒后停止定位，默认：无穷大
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
                that.$store.commit('updateLocation', pos);
				that.$store.commit('setLocation', pos);
				//setting sun 
				that.pageNum = 1;
				that.loading = false;
				that.stores = [];
                that.getStores();

              }

              function onError(obj) {
                //alert(obj.info + '--' + obj.message);
                console.log(obj);
              }

            },

            getMyAddress () {
                if (0) {
                    //todo, 失败则跳转
                    this.$router.push(this.fun.getUrl('o2oLocation'));
                }
            },

            tolocation() {
                this.$router.push(this.fun.getUrl('o2oLocation'));
            },
			//setting sun
            getStores() {
                var that = this;
                //that.getStoresCategory();
				var num = (this.datas.params.num === undefined || this.datas.params.num == 0) ? 5 : this.datas.params.num;
                $http.get('plugin.store-cashier.frontend.store.store.get-store-list-to-page', {page: this.pageNum,kwd:'', lng:this.point.lng,lat:this.point.lat,city_name:this.city}).then((response) => {
                    if (response.result == 1) {
                        // console.log('stores:', response);
                        // that.stores = response.data.data;
						// that.stores = that.stores.slice(0, num);
						if(!this.resState == true){
							this.resState = true;
							this.upOther(response);
						}
						if(this.pageState == true){
							this.upOther(response);
						}

                    } else {
						this.loading = true;
						this.allLoaded = true;
						console.log(response.msg)
						that.stores = [];
                    }
                }), (response) => {
                    //alert('网络错误，请稍后再试！')
                }
            },
			upOther(response){
							if(this.pageNum == 1){
								this.stores = [];
							}
							this.pageNum = Number(this.pageNum) + 1;
							this.loading = false;
							this.allLoaded = false;
							// 搜索结果为空
							if (response.data.total <= 0) {
								this.loading = true;
								this.allLoaded = true;
								return;
							}
							this.stores = this.stores.concat(response.data.data);
							console.log('商品内容', this.stores);
							if (response.data.current_page == response.data.last_page) {
								this.loading = true;
								this.allLoaded = true;
								return;
							}
			},
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	.p1{
		position: relative !important;
	}
	.store-category-name{
		width: 3.4375rem;
		display: block;
		word-wrap: break-word;
	}
	.store-list {
		position: relative;
		padding: 0.9375rem 0.625rem;
		min-height: 4.375rem;
		border-top: 0.0625rem solid #e7e9e4;
		/*width: 97%;*/
		background: #fff;
		font-size: 12px;
		/*font-size: .9rem;*/
		color: #333;
		text-align: left;
	}

	.store-img {
		position: relative;
	}

	.store-img .store-logo {
		position: absolute;
		left: 0.625rem;
		top: 0;
		bottom: 0;
		float: none;
		width: 4rem;
		height: 4rem;
	}

	.store-img img {
		float: left;
		width: 100%;
		height: 100%;
		border-radius: 0.25rem;
		border: 0.0625rem solid #e8e8e8;
		display: inline-block;
		margin-right: 0.5rem;
	}

	.store-intro {
		width: 12.5rem;
		display: inline-block;
		position: relative;
		margin-left: 5.625rem;
	}

	.store-intro .a8q {
		height: 1.25rem;
		line-height: 1.25rem;
		overflow: hidden;
		display: -webkit-box;
		display: -ms-box;
		display: -ms-flexbox;
		display: flex;
		-moz-flex: 1;
		-ms-flex: 1;
		-webkit-box-flex: 1;
		flex: 1;
	}

	.store-intro .a8q h2{
		font-size: 16px;
		color: #333;
		/*overflow: hidden;*/
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		display: inline-block;
		margin-top: 0;
		font-weight: bold;
		-moz-flex: 1;
		-ms-flex: 1;
		-webkit-box-flex: 1;
		flex: 1;
	}

	.store-intro .a8q .store_honor_icon1 {
		display: inline-block;
		width: 5.5rem;
		height: 1.25rem;
		font-size: 12px;
		text-align: right;
		margin-right: 0.125rem;
		background-position: center center;
		background-repeat: no-repeat;
		background-size: 1rem auto;
	}

	.store-intro .a8r {
		font-size: 0;
		padding-top: 0.625rem;
		overflow: hidden;
	}

	.store-intro .a8r .i8{
		display: inline-block;
		border: 0.0625rem solid #16A9ff;
		font-size: 0;
		border-radius: 0.125rem;
		color: #16a9ff;
		line-height: 0;
		// height: 0.9375rem;
		overflow: hidden;
	}

	.store-intro .a8r .i8 .da {
		display: inline-block;
		line-height: 1;
		padding: 0.125rem;
		font-size: 10px;
	}

	.store-intro .a8v {
		height: 0.875rem;
		margin-top: 0.5rem;
		overflow: hidden;
		font-size: 0;
	}

	.store-intro .a8v .a8d {
		height: 0.75rem;
		/*padding-top: 2px;*/
		overflow: hidden;
		display: inline-block;
		position: relative;
	}

	.store-intro .a8v .a8d .a79 {
		display: inline-block;
		font-size: 0;
	}

	.store-intro .a8v .a8d .a79 i {
		display: inline-block;
		width: 0.625rem;
		height: 0.625rem;
		background-position: 0 0;
		background-image: url(//static-o2o.360buyimg.com/daojia/new/images/icon/newStar.png);
		background-repeat: no-repeat;
		background-size: auto 0.625rem;
		margin-right: 0.0625rem;
	}

	.store-intro .a8v .a8d .a79 .zo {
		background-position: -0.625rem 0;
	}

	.store-intro .a8v .a8w {
		font-size: 11px;
		line-height: 0.875rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: #999;
		display: inline-block;
	}

	.store-intro .a8v .a8w .line_split {
		display: inline-block;
		width: 0.5rem;
		height: 0.625rem;
		background: url(//static-o2o.360buyimg.com/daojia/new/images/index/icon_line_split.jpg) no-repeat center 0.125rem;
	}

	.store_honor_box{
		display: inline-block;
		position: absolute;
		top: 0.625rem;
		text-align: right;
		right: 0.625rem;
	}

	.store_honor_icon1{
		display: block;
	}

	.store-category{
		position: absolute;
		top: 4.375rem;
		left: 1.125rem;
	}
</style>