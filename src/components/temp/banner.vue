<template>
<div id="banner">
	<div class="m-swipe">
		<div style="line-height: 9.375rem; text-align: center; color: #999; font-size: 16px;" v-if="datas.data == ''">一个轮播都没有...</div>
<c-myswipe
    :pagination-visible="true"
    :slides="datas.data"
    :repeating="true"
    :auto="3000" v-if="datas.data != ''">
    <div v-for="(slide,index) in datas.data" :key="index">
        <a :href="slide.hrefurl|href_filters" v-if="slide.imgurl" style="height:38vw">
          <img width="100%" :src="slide.imgurl" />
        </a>

         <a href="javascript:;" v-if="!slide.imgurl" style="height:38vw">
          <img width="100%" src="../../assets/images/img_default.png" />
        </a>
    </div>
</c-myswipe>
		<!--<mt-swipe :auto="4000" v-if="datas.data != ''">
			<mt-swipe-item v-for="item in datas.data"><a :href="item.hrefurl|| 'javascript:;'"><img :src="item.imgurl"></a></mt-swipe-item>
		</mt-swipe>-->
	</div>
</div>
</template>
<script>
import cMyswipe from 'components/myswipe';	
import { Swipe, SwipeItem } from 'mint-ui';	
  export default {
    props: ['datas'],
    data() {
      return {
        mid:this.fun.getKeyByMid()
      }
    },
    mounted(){
    },
    methods:{

    },
    components: {cMyswipe}
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	.m-swipe{
	img{width: 100%;}}
</style>