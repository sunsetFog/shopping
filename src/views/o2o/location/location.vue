<template>
    <div>
        <!--container-->
        <div class="m-t-10">
            <a class="mint-cell mint-field">
                <div class="mint-cell-wrapper">
                    <el-button style="border:0" slot="prepend" icon="arrow-left" @click='goback'></el-button>

                    <div class="mint-cell-value" style="font-size: 14px">
                        <input v-model="address_detail" type="text" placeholder="请输入您所在的地点" id="suggestId"  name="address_detail" class="mint-field-core text-right">
                    </div>
                </div>
            </a>
        </div>

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

        <div id="allmap" style="width: 100%;height:43.75rem;"></div>
        <div id="store-list" style="width: 100%;height:auto;">
            <li v-for="items in stores">

            </li>
        </div>

        <!--container end-->
    </div>
</template>

<script>

  export default {
    components: {
    },
    data: () => ({
      headerData: {
        title: '办公地址',
        toLink: ''
      },
      address_detail: null, // 详细地址
      userlocation: {lng: '', lat: ''},
      stores:[],
    }),
    created () {
      // 组件创建完后获取数据，这里和1.0不一样，改成了这个样子
      this.loadMap()
      // this.ready() // 如果在此处直接调用this.ready()方法，将无法加载地图
    },
    mounted () {
      this.ready()
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

                // var pos = {
                //   address:e.poi.address,
                //   city:result.regeocode.addressComponent.city,
                //   title:e.poi.name,
                //   point:point,
                // }
                
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
                console.log('prite00000000',pos,result);

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

      }
    }
  }
</script>

<style>
    /* 去掉地图左下角的百度LOGO */
    .anchorBL {
        display:none
    }
</style>  