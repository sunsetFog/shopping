<template>
 <div :style="'background:'+datas.params.bgcolor">

    <div id="headline-box" @click="gotoList" v-if="datas.params.shownum == 2" >
        <div class="img"><img :src="datas.params.bgimg?datas.params.bgimg:require('../assets/images/loading.jpg')" style="height:100%;width:100%;"></div>
        <yd-rollnotice :style="'height:3.75rem;width:85%;background:'+datas.params.bgcolor">
            <yd-rollnotice-item v-for="item in datas.data"><span class="left"> 热议</span><span class="right">{{item.title}}</span></yd-rollnotice-item>
            <!-- <yd-rollnotice-item><span class="left"> 热议 </span><span class="right">广州地铁明起全线支持Apply Pay</span></yd-rollnotice-item> -->
        </yd-rollnotice>
    </div>
    <div id="headline" @click="gotoList" v-if="datas.params.shownum == 1">
        <div class="img"><img :src="datas.params.bgimg?datas.params.bgimg:require('../assets/images/loading.jpg')" height="30" width="30"></div>
        <yd-rollnotice :style="'height:1.875rem;width:85%;background:'+datas.params.bgcolor">
            <yd-rollnotice-item v-for="item in datas.data"><span class="left"> 热议</span><span class="right">{{item.title}}</span></yd-rollnotice-item>
        </yd-rollnotice>
    </div>
</div>
</template>

<script>
    import {MessageBox} from 'mint-ui';
    export default {
        props: {
            datas: {
                default: []
            }
        },
        data() {
            return {
            }
        },
        mounted() {
        },
        computed: {},
        methods: {
            gotoList(){
                this.$router.push(this.fun.getUrl("ArticleList"));
            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    #headline-box{
            margin-top:0.0625rem;
            display: flex;
            height:3.75rem;
            //background-color: #fff;
            .img{
                margin-right:0.625rem;
                width:15%;
                padding:0.375rem;
                img{
                    width:100%;
                    height:100%;
                }
            }
            .more{
                width:15%;
            }
            .left{
                color:#f15353;
                border:solid 0.0625rem #f15353;
                padding:0rem 0.25rem;
                border-radius: 0.125rem;
                margin-right:0.625rem;
            }
            .right{
                text-align: left;
                width:16.25rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
        #headline{
            margin-top:0.0625rem;
            display: flex;
            height:30px;
            background-color: #fff;
            .img{
                width:15%;
                padding:0 0.375rem;
                margin-right:0.625rem;
                img{
                }
            }
            .more{
                width:15%;
            }
            .left{
                color:#f15353;
                border:solid 0.0625rem #f15353;
                padding:0rem 0.25rem;
                border-radius: 0.125rem;
                margin-right:0.625rem;
            }
            .right{
                text-align: left;
                width:16.25rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
</style>