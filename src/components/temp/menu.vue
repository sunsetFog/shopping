<template>
<div id="menu">
	<ul v-if="datas.data != ''" :style="{ background: datas.params.bgcolor }">
		<li v-for="(item,index) in datas.data" v-if="(datas.params.num=='25%')? (index==4?false:true):true">
			<a :href="item.hrefurl|href_filters">
				<img v-if="item.imgurl" :src="item.imgurl" :style="{borderRadius:datas.params.style,width:(datas.params.num=='20%')?'13vw':'17vw',height:(datas.params.num=='20%')?'13vw':'17vw'}">
				<img v-if="!item.imgurl" src="../../assets/images/img_default.png" :style="{borderRadius:datas.params.style,width:(datas.params.num=='20%')?'13vw':'17vw',height:(datas.params.num=='20%')?'13vw':'17vw'}">
				<h5 :style="{'color':item.color}">{{item.text}}</h5>
			</a>
		</li>
	</ul>

</div>
</template>
<script>

  export default {
    props: ['datas'],
    data() {
      return {
        mid:this.fun.getKeyByMid()
      }
    },
    mounted(){
true,false
    },
    methods:{

    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	#menu{
		ul{display: flex;padding: 0.625rem 0;
			li{flex: 1; align-items: center;
				img{width: 70%;}
				h5{color: #000000;}
			}
		}
	}
</style>