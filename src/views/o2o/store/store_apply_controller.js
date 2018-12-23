import { Indicator, Toast } from 'mint-ui';
import cTitle from '../../../components/title';

//import BMap from 'BMap';

import Vue from 'vue';

import District from 'src/gov_province_city_area_id';

import {DateTime} from 'vue-ydui/dist/lib.px/datetime';


Vue.component(DateTime.name, DateTime);

const IS_SUPPLIER = 3; //todo 已经成为，无需再申请
const REPEAT_APPLY = 2; //todo 已经提交申请，等待审核。
const VISIT_SUCCESS = 1; //todo 访问成功


export default {
    data() {
        return {
            o2o_status: "",
            o2o_info: "",
            applyModel: {
                username: "",
                password: "",
                realname: "",
                mobile: "",
                //store名字
                storeName:"",
                lng:"",
                lat:"",
                beginTime:"",
                endTime:"",
                categoryId:"",
                //省市区 街道id
                provinceId:"",
                cityId:"",
                districtId:"",
                streetId:"",
                address:"",
                //门店图片src
                storeImg:"",
                //资质图片src
                aptitudeImg:[],

                remark:""

            },

            imageUrl: '',
            uploadUrl:'',

            categoryList:[],

            agreement:"",

            categoryShow:false,

            addressShow:false,

            streetShow:false,

            addressName:"",

            categoryName:"",

            //街道
            area:District,

            //省，市，区,街道
            province:"",

            city:"",

            district:"",

            street:"",

            strShow:false,


            districtVal:[],

            agreementChoose:false,

            agreementShow:false

        
        }
    },

    activated() {
        this.init();
        this.getData();
        this.getLocation();
        this.getCategory();
        //this.getImgUpload();
    },
    mounted() {
        //this.getLocation();
    },

    methods: {

        init(){
            //console.log('sssss', uploadUrl);
            this.uploadUrl = this.fun.getRealUrl("plugin.store-cashier.frontend.store.store.upload",{});
            //console.log('ttt', this.fun.getRealUrl("plugin.store-cashier.frontend.store.store.upload",{}));
            this.applyModel.username="";
            this.applyModel.password="";
            this.applyModel.realname="";
            this.applyModel.mobile="";

            this.applyModel.storeName="";
            this.applyModel.lng="";
            this.applyModel.lat="";
            this.applyModel.beginTime="00:00";
            this.applyModel.endTime="00:00";
            this.applyModel.categoryId="";
            //省市区 街道id
            this.applyModel.provinceId="";
            this.applyModel.cityId="";
            this.applyModel.districtId="";
            this.applyModel.streetId="";
            //门店图片src
            this.applyModel.storeImg="";
            //资质图片src
            this.applyModel.aptitudeImg=[];

            this.applyModel.remark="";

            this.agreementChoose=false;
        },
        //获取数据
        getData() {
            let that = this;
            let json = {};

            $http.get('plugin.store-cashier.frontend.store.store.verify-apply-status', json, "加载中...").then(function (response) {
                console.log(response.data)
                if (response.result == 1) {
                    that.o2o_status = response.data.status;
                    that.o2o_info = response.data.agreement;
                } else {
                    Toast(response.msg);
                }
            }, function (response) {
                console.log(response)
            });
        },

        beforeUpload(file) {
            //const isJPG = file.type === 'image/jpeg';
            const isPNG = (file.type === 'image/png' || file.type === 'image/jpeg');
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isPNG) {
                this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isPNG && isLt2M;
        },


        handleAptiRemove(file, fileList) {
            //console.log('handleStoreRemove:', file);
            let f = file.response.data.img;
            if (f) {
                let delIndex = '';
                this.applyModel.aptitudeImg.forEach(function(val, index, arr){
                    if (val == f) {
                       delIndex = index
                    }
                });

                this.applyModel.aptitudeImg.splice(delIndex, 1);

            }
            //console.log('handleStoreRemove:', fileList);
        },

        handleStoreSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            if (res.result == 1) {
                this.applyModel.storeImg = res.data.img;
                console.log('111===', this.applyModel.storeImg);
            } else {
                Toast(res.msg);
            }
        },

        handleAptiSuccess(res, file) {
            if (res.result == 1) {
                this.applyModel.aptitudeImg.push(res.data.img);
                console.log('222===', this.applyModel.aptitudeImg);
            } else {
                Toast(res.msg);
            }
            //console.log('111===', URL.createObjectURL(file.raw));
            //console.log('222===', res);
            //this.imageUrl = URL.createObjectURL(file.raw);
        },

        //提交数据
        setApplyData() {

            //console.log(this.applyModel);

            if (this.fun.isTextEmpty(this.applyModel.username)) {
                Toast("请填写账号");
                return;
            }

            if (this.fun.isTextEmpty(this.applyModel.password)) {
                Toast("请填写密码");
                return;
            }

            if (this.fun.isTextEmpty(this.applyModel.realname)) {
                Toast("请填写真实姓名");
                return;
            }

            if (this.fun.isTextEmpty(this.applyModel.mobile)) {
                Toast("请填写手机号码");
                return;
            }

            if (this.fun.isMoblie(this.applyModel.mobile)) {
                Toast("请输入正确的手机号");
                return;
            }

            if (this.fun.isTextEmpty(this.applyModel.storeName)) {
                Toast("请填写门店名称");
                return;
            }

            if (this.fun.isTextEmpty(this.applyModel.storeImg)){
                Toast("请上传门店图片");
                return;
            }


            if (this.fun.isTextEmpty(this.applyModel.categoryId)){
                Toast("请选择门店分类");
                return;
            }

            if (this.fun.isTextEmpty(this.applyModel.provinceId) || this.fun.isTextEmpty(this.applyModel.cityId) || this.fun.isTextEmpty(this.applyModel.districtId)){
                Toast("请选择省市区");
                return;
            }

            if(this.fun.isTextEmpty(this.applyModel.streetId)){
                Toast("请选择街道");
                return;
            }

            if(this.fun.isTextEmpty(this.applyModel.address)){
                Toast("请填写详细地址");
                return;
            }

            if(this.fun.isTextEmpty(this.applyModel.lng) || this.fun.isTextEmpty(this.applyModel.lat)){
                Toast("经纬度不能为空");
                return;
            }

            if(this.fun.isTextEmpty(this.applyModel.beginTime) || this.fun.isTextEmpty(this.applyModel.endTime)){
                Toast("营业开始时间活营业结束时间不能为空");
                return;
            }


            if(this.fun.isTextEmpty(this.applyModel.aptitudeImg)){
                Toast("请上传资质图片");
                return;
            }

            
            // if(this.fun.isTextEmpty(this.applyModel.remark)){
            //     Toast("请填写备注");
            //     return;
            // }


            if(!this.agreementChoose){
                Toast("请同意申请协议");
                return;
            }

            let that = this;


            let json = { apply: this.applyModel};

            $http.post('plugin.store-cashier.frontend.store.store.apply', json, "提交中...").then(function (response) {
                console.log(response.data)
                if (response.result == 1) {
                    Toast(response.msg);
                    that.goHome();
                } else {
                    Toast(response.msg);
                }
            }, function (response) {
                console.log(response)
            });
        },

        //去商城
        goHome() {
            this.$router.push(this.fun.getUrl('home'));
        },

        //获取当前的经纬度
        getLocation() {
            // let that=this;
            // let geolocation = new AMap.Geolocation();
            // geolocation.getCurrentPosition(function(r){
            //   if(this.getStatus() == BMAP_STATUS_SUCCESS){
            //     console.log(r.point);
            //     that.applyModel.lng=r.point.lng;
            //     that.applyModel.lat=r.point.lat;
            //   }
            // },{enableHighAccuracy: true})

            var mapObj = new AMap.Map("");

            var that=this;

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
                    zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                });

                mapObj.addControl(geolocation);
                geolocation.getCurrentPosition();
                AMap.event.addListener(geolocation, 'complete', that.onComplete);//返回定位信息
                AMap.event.addListener(geolocation, 'error', that.onError);      //返回定位出错信息

            })


        },

        showCategory(){
            this.categoryShow=true;
        },

        //选择类别
        chooseCategory(item){
            this.categoryName="";
            this.applyModel.categoryId=item.id;
            console.log(this.applyModel.categoryId);
            this.categoryShow=false;
            this.categoryName=item.name;
        },

        //获取分类和协议
        getCategory(){
            $http.get("plugin.store-cashier.frontend.store.store.get-store-categorys",{}).then(response =>{
                console.log(response);
                if(response.result==1){
                    this.categoryList=response.data.store_categorys;
                    this.agreement=response.agreement;

                }
            }).catch(error =>{
                console.log(error);
            })
        },

        //地址回调
        addressCallback(obj){
            //this.form.street = "";
            //this.districtVal = "";
            this.addressName = obj.itemName1 + ' ' + obj.itemName2 + ' ' + obj.itemName3;
            this.provice = obj.itemName1;
            this.city = obj.itemName2;
            this.district = obj.itemName3;

            console.log(obj.itemValue1,obj.itemValue2,obj.itemValue3);

            this.applyModel.provinceId=obj.itemValue1;

            this.applyModel.cityId=obj.itemValue2;

            this.applyModel.districtId=obj.itemValue3;
          
            this.getStreet(obj.itemValue3);
        },

        streetConfirm(item) {
            this.street = item.areaname;
            this.applyModel.streetId=item.id;
            console.log( this.applyModel.streetId);
            this.streetShow = false;
        },

        //获取街道
        getStreet(param) {
            $http.get('member.memberAddress.street', { district_id: param }).then(response => {
                console.log(response);
                if (response.result == 1) {

                    if (!this.fun.isTextEmpty(response.data) && response.data.length > 0) {
                        this.districtVal = response.data;
                        this.strShow = true;
                    } else {
                        this.strShow = false;
                    }
                } else {
                    this.strShow = false;
                }

            }).catch(error => {
                console.log(error);
            });
        },


        //获取门店图片上传路径
        getImgUpload(){
            $http.get("plugin.store-cashier.frontend.store.store.upload",{}).then(response =>{
                console.log(response);
                if(response.result == 1){
                    this.storeImg=resposne.data.img;
                }
            }).catch(error =>{
                console.log(error);
            })
        },


        showAgreement(){
            this.agreementShow=true;
        },


        onComplete(data){
            console.log(data);
            
            this.applyModel.lng=data.position.getLng();
            this.applyModel.lat= data.position.getLat();
        },

        onError(error){
            Toast(error.message);
            
        }

    },
    components: {cTitle}
}