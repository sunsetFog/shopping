<template>
    <div id="course">
        <c-title :hide="false" text='会员升级'></c-title>
        <div style="height:40px;"></div>
        <div class="box" v-for="item in updateGoods" @click="gotoBuy(item.goods.id)">
            <div class="content-a">
                <div class="header">
                    <img :src="item.goods.thumb" style="width:100%;height:100%;">
                </div>
                <ul class="members">
                    <li  class="member01">{{item.goods.title}}</li>
                    <li  class="member02">￥{{item.goods.price}}</li>
                </ul>
                <div class="clearfix"></div>
            </div> 
            
        </div>
    </div>
</template>

<script>
    import course_member_level_controller from "./course_member_level_controller";
    export default course_member_level_controller;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>

.box{
    width:100%;
    background-color: #fff;
    padding-left:0.75rem;
    //padding-top:40px;
}
.content-a{
    width:100%;
    height:100%;
    background-color: #fff;
    padding:0.75rem 0.75rem 0.75rem 0rem;
    border-bottom:solid 0.0625rem #e3e3e3;
}
.header{
    float:left;
    width:4rem;
    height:4rem;
    background-color: green;
    margin-right:0.625rem;
}
.members{
    width:calc(100% - 4.625rem);
    font-size: 15px;
    float:left;
}
.member01{
    float:left;
}
.member02{
    float:right;
}
.clearfix{
    clear: both;
}
</style>