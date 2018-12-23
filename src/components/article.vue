<template>
    <div id="art-list">
    <section id="art-box" :style="'background:'+datas.params.bgcolor" v-if="datas.params.addmethod == 1">
       
        <div class="box" v-for="item in datas.data" @click.stop.prevent="gotoArticle(item)">
            <div class="img"><img :src="item.thumb?item.thumb:require('../assets/images/loading.jpg')"></div>
            <ul>
              <li class="title" style="-webkit-box-orient: vertical;">{{item.title}}</li>
              <!-- <li class="browse-number" style="width:100%;padding-right:0.3125rem;"><span>{{item.read_num}}<small>人浏览</small></span></li> -->
            </ul>
           
        </div>
    </section>

     <section id="art-box" :style="'background:'+datas.params.bgcolor" v-if="datas.params.addmethod == 0">
       
        <div class="box" v-for="item in datas.alldata" @click.stop.prevent="gotoArticle(item)">
            <div class="img"><img :src="item.thumb?item.thumb:require('../assets/images/loading.jpg')"></div>
            <ul>
              <li class="title" style="-webkit-box-orient: vertical;">{{item.title}}</li>
              <!-- <li style="width:100%;padding-right:0.3125rem;"><span>{{item.read_num}}<small>人浏览</small></span></li> -->
            </ul>
           
        </div>
    </section>
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
export default {
  props: {
    datas: {
      default: []
    }
  },
  data() {
    return {};
  },
  mounted() {},
  computed: {},
  methods: {
      //跳转
    gotoArticle(item){
      this.$router.push(this.fun.getUrl("articleContent",{id:item.articleid}));
    }
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#art-list{
    background-color: #fff;
    #art-box{
      text-align: left;
      padding-left:0.875rem;
      .box:last-child{
          border:none;
      }
      .box{
        border-bottom:solid 0.0625rem #ebebeb;
        padding-right:0.875rem;
        display: flex;
        padding: 0.625rem 0;
        ul{
          margin-left:0.875rem;
          width:13.3125rem;
          font-size:16px;
          text-align: left;
          position: relative;
          .title{
            line-height: 1.5rem;
            overflow: hidden;
            text-overflow:ellipsis;//文本溢出显示省略号
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .browse-number{
            color:#8c8c8c;
            position: absolute;
            bottom:0;
            height:1.5rem;
            line-height: 1.5rem;
          }
        }
        .img{
          width:7.5rem;
          height:5.25rem;
          background-color: #ccc;
          //margin-left:0.75rem;
          //margin-right:0.875rem;
          overflow: hidden;
          img{
            width:100%;
            height: 100%;
          }
        }
      }
    }
  }
</style>