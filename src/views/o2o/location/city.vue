<template>
    <div>
        <!--container-->
        <div class="m-t-10" v-show="!isShowCitys">
            <a class="mint-cell mint-field">
                <div class="mint-cell-wrapper">
                    <div style="font-size: 14px;margin-right:0.625rem;" @click="showCitys">
                        {{city}}
                    </div>
                    <div class="mint-cell-value" style="font-size: 14px">
                        <input v-model="address_detail" type="text" placeholder="请输入您所在的地点" id="suggestId"
                               name="address_detail" class="mint-field-core text-right">
                    </div>
                </div>
            </a>
        </div>

        <div class="xk" v-show="isShowCitys">
            <h2 class="xl"><span>已开通城市</span></h2>
            <ul class="xm scroller">
                <li @click="setCity(item.areaname)" v-for="item in citys">{{item.areaname}}</li>
            </ul>
        </div>

        <div id="allmap" style="width: 100%;height:43.75rem;"></div>

        <!--<div id="search" transition="fadeInLeft">
            <div id="soso" class="uou" :class="{'mout':amout}">
                <div class="search">
                    <el-button slot="prepend" icon="arrow-left" @click='goback'></el-button>
                    <el-input placeholder="请输入内容" v-model="address_detail"  id="suggestId"  name="address_detail" autofocus>
                        &lt;!&ndash;<el-button slot="append" icon="search" @click='search'></el-button>&ndash;&gt;
                    </el-input>
                    <el-col :span="1">
                        <i class="fa fa-th-large" v-show="view" @click="$store.commit('views')"></i>
                        <i class="fa fa-th-list" v-show="!view" @click="$store.commit('views')"></i>
                    </el-col>
                </div>
            </div>

        </div>-->

        <!--<div id="store-list" style="width: 100%;height:auto;">
            <mt-cell title="标题文字"></mt-cell>
        </div>-->

        <!--container end-->
    </div>
</template>

<script>
    //import BMap from 'BMap';

    export default {
        components: {},
        data: () => ({
            headerData: {
                title: '办公地址',
                toLink: ''
            },
            address_detail: null, // 详细地址
            userlocation: {lng: '', lat: ''},
            stores: [],
            city: '广州',
            citys: [],
            isShowCitys:true,
        }),
        created () {
            // 组件创建完后获取数据，这里和1.0不一样，改成了这个样子
            this.loadMap()
        },
        mounted () {
            this.getCity();

        },
        activated () {
            this.address_detail = '';
        },
        methods: {
            loadMap: function () {
                // setTimeout(this.ready, 0)
            },
            goback() {
                this.$router.go(-1);
            },
            ready: function () {
              var th = this;
              var that = this;
              var map = new AMap.Map("container", {
                resizeEnable: true
              });
              //输入提示
              var auto = new AMap.Autocomplete({
                input: "suggestId",
                city:""
              });

              AMap.event.addListener(auto, "select", select);//注册监听，当选中某条记录时会触发
              function select(e) {
                console.log('e:', e);

                AMap.plugin('AMap.Geocoder', function() {
                  var geocoder = new AMap.Geocoder({
                    // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                    city: ''
                  })

                  //var lnglat = [116.396574, 39.992706]
                  geocoder.getAddress(e.poi.location, function(status, result) {
                    console.log(result);
                    if (status === 'complete' && result.info === 'OK') {
                      // result为对应的地理位置详细信息
                      var point = {
                        lat:e.poi.location.lat,
                        lng:e.poi.location.lng,
                      };
                      console.log('write9999999',result);
                    if(result.regeocode.addressComponent.city == ''){
                        var pos = {
                        address:e.poi.address,
                        // city:result.regeocode.addressComponent.district,
                        city:result.regeocode.addressComponent.province,
                        title:e.poi.name,
                        point:point,
                        }
                    }else{
                        var pos = {
                        address:e.poi.address,
                        city:result.regeocode.addressComponent.city,
                        title:e.poi.name,
                        point:point,
                        }
                    }
                      
                      console.log('look55555555',pos,result);

                      th.$store.commit('updateLocation', pos);
                      th.$store.commit('setLocation', pos);
                      if (th.$store.state.referer) {
                        //th.$router.push(th.$store.state.referer);
                        window.location.href = th.$store.state.referer;
                      } else {
                        th.$router.push(th.fun.getUrl('otoHome'));
                      }
                    }
                  })
                })

              }

            },

            showCitys() {
                if (this.isShowCitys) {
                    this.isShowCitys = false;
                } else {
                    this.isShowCitys = true;
                }
            },

            setCity(areaname) {
                this.city = areaname;
                this.isShowCitys = false;
                this.address_detail = '';
                this.ready();
                console.log('isShowCitys', this.isShowCitys);
            },

            getCity() {
                let that = this;
                $http.get('plugin.store-cashier.frontend.store.city.get-citys', this.form).then((response) => {

                    if (response.result == 1 && response.data.length>0) {
                        that.city = response.data[0].areaname;
                        that.citys = response.data;
                        that.ready();
                    } else {

                    }
                }, (response) => {
                    // error callback
                })
            },
        }
    }
</script>

<style>
    /* 去掉地图左下角的百度LOGO */
    .anchorBL {
        display: none;

    }

    .mint-cell-wrapper {
        text-align: left !important;
    }

    .mint-cell-value {
        width: 0 !important;
    }
    .xk {
        width: 100%;
        height: 100%;
        background: #f4f4f4;
        overflow: hidden
    }

    .xl {
        position: relative;
        font-size: 14px;
        color: #b0b0b0;
        text-align: center;
        line-height: 2.5rem;
        margin: 0 0.625rem;
    }

    .xl:before {
        content: "";
        height: 0;
        border-top: 0.0625rem dashed #b0b0b0;
        width: 100%;
        position: absolute;
        top: 50%;
        margin-top: -0.0625rem;
        left: 0
    }

    .xl span {
        background-color: #f4f4f4;
        display: inline-block;
        padding: 0 0.375rem;
        position: relative;
        z-index: 1
    }

    .xm {
        padding: 0.625rem;
        width: 125%;
        box-sizing: border-box;
        padding-right: 3.875rem
    }

    .xm li {
        display: inline-block;
        padding: 0.625rem 0;
        border: 0.0625rem solid #dddddd;
        background: #ffffff;
        color: #333333;
        margin: 0 0.625rem 0.625rem 0rem;
        width: 20%;
        text-align: center;
        float: left
    }

    .xm li.curr {
        border: 0.0625rem solid #d0d0d0;
        background: #f3f3f3
    }

</style>  