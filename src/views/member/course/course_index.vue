<template>
	<div id="course">
		<c-title :hide="false" text='课程'></c-title>
        <div style="height:40px;"></div>
        <div class="search">
            <!-- <yd-icon slot="icon" class="icon-sousuo" custom size="20px" color="#808080" style="position:absolute;right:22%;z-index:8888;top:-2px;"></yd-icon> -->
            <input type="text" class="s_input input_enter_placeholder" placeholder="搜索课程/讲师"  v-model="searchVal" @click="moreGoods('all')">
        </div>
        <div class="tupian" style="">
            
            <yd-slider autoplay="3000" v-if="showCarousel" style="">
                <yd-slider-item v-for="item in carouselInfo">
                    <a :href="item.link?item.link:'javascript:;'">
                        <div style="height:8.75rem;">
                            <img :src="item.thumb" style="height:100%;">
                        </div>
                    </a>
                </yd-slider-item>
            </yd-slider>
        </div>
        <yd-cell-group style="margin-bottom:0rem;" v-if="showRec">
            <yd-cell-item arrow  @click.native="moreGoods('is_recommand')">
                <span slot="left">精选推荐课程</span>
                <span slot="right">更多</span>
            </yd-cell-item>
        </yd-cell-group>
        <div class="Recommend" v-if="showRec">
            <div class="content" v-for="item in recGoodList" @click="goToDetail(item.goods_id)">
                <div class="touxiang">
                    <img style="width:100%;height:100%;" :src="item.thumb">
                </div>
                <div class="title">
                    <div>
                        <li class="title01">{{item.title}}</li>
                    </div>
                    <div class="title02">共{{item.course_chapter_num}}小节</div>
                    <li class="title03">
                        <ul>
                            <li class="lecturer">讲师：{{item.has_one_lecturer.real_name}}</li>
                            <li class="cost">¥ {{item.price}}</li>
                        </ul>
                    </li>
                </div>
                <div style="clear:both;"></div>
                <div style="width:100%;height:0.0625rem;background-color:#ebebeb;margin-top:0.625rem;transform: scaleY(.5);"></div>
            </div>
            <!-- <div class="content">
                <div class="touxiang"></div>
                <div class="title">
                    <div>
                        <li class="title01">沙拉轻食创意课程套餐</li>
                    </div>
                    <li class="title02">共18小节</li>
                    <li class="title03">
                        <ul>
                            <li class="lecturer">讲师：李翔</li>
                            <li class="cost">¥ 199.00</li>
                        </ul>
                    </li>
                </div>
                <div style="clear:both;"></div>
                <div style="width:363px;height:1px;background-color:#b2b2b2;margin-top:10px;transform: scaleY(.5);"></div>
            </div> -->
            <!-- <div class="content">
                <div class="touxiang"></div>
                <div class="title">
                    <div>
                        <li class="title01">牛乳茶制作课程</li>
                    </div>
                    <li class="title02">共3小节</li>
                    <li class="title03">
                        <ul>
                            <li class="lecturer">讲师：李翔</li>
                            <li class="cost">¥ 1999.00</li>
                        </ul>
                    </li>
                </div>
                <div style="clear:both;"></div>
                <div style="width:363px;height:1px;background-color:#b2b2b2;margin-top:10px;transform: scaleY(.5);"></div>
            </div> -->
        </div>
        <yd-cell-group style="margin-top:0.375rem;margin-bottom:0rem;" v-if="showHot">
            <yd-cell-item arrow  @click.native="moreGoods('is_hot')">
                <span slot="left">热门课程</span>
                <span slot="right">更多</span>
            </yd-cell-item>
        </yd-cell-group>
        <div class="Hot" v-if="showHot" >
            <div class="content" v-for="item in hotGoodList" @click="goToDetail(item.goods_id)">
                <div class="touxiang">
                     <img style="width:100%;height:100%;" :src="item.thumb">
                </div>
                <div class="title">
                    <div>
                        <li class="title01">{{item.title}}</li>
                    </div>
                    <li class="title02">共{{item.course_chapter_num}}小节</li>
                    <li class="title03">
                        <ul>
                            <li class="lecturer">讲师：{{item.has_one_lecturer.real_name}}</li>
                            <li class="cost">¥ {{item.price}}</li>
                        </ul>
                    </li>
                </div>
                <div style="clear:both;"></div>
                <div style="width:100%;height:0.0625rem;background-color:#ebebeb;margin-top:0.625rem;transform: scaleY(.5);"></div>
            </div>
            <!-- <div class="content">
                <div class="touxiang"></div>
                <div class="title">
                    <div>
                        <li class="title01">牛乳茶制作课程</li>
                    </div>
                    <li class="title02">共3小节</li>
                    <li class="title03">
                        <ul>
                            <li class="lecturer">讲师：李翔</li>
                            <li class="cost">¥ 199.00</li>
                        </ul>
                    </li>
                </div>
                <div style="clear:both;"></div>
                <div style="width:363px;height:1px;background-color:#b2b2b2;margin-top:10px;transform: scaleY(.5);"></div>
            </div>
            <div class="content">
                <div class="touxiang"></div>
                <div class="title">
                    <div>
                        <li class="title01">牛乳茶制作课程</li>
                    </div>
                    <li class="title02">共3小节</li>
                    <li class="title03">
                        <ul>
                            <li class="lecturer">讲师：李翔</li>
                            <li class="cost">¥ 199.00</li>
                        </ul>
                    </li>
                </div>
                <div style="clear:both;"></div>
                <div style="width:363px;height:1px;background-color:#b2b2b2;margin-top:10px;transform: scaleY(.5);"></div>
            </div> -->
        </div>
        <yd-cell-group style="margin-top:0.375rem;margin-bottom:0rem;" v-if="showNew">
            <yd-cell-item arrow @click.native="moreGoods('is_new')">
                <span slot="left">最新课程</span>
                <span slot="right">更多</span>
            </yd-cell-item>
        </yd-cell-group>
        <div class="Newest" v-if="showNew">
            <div class="content" v-for="item in newGoodList" @click="goToDetail(item.goods_id)">
                <div class="touxiang">
                    <img style="width:100%;height:100%;" :src="item.thumb">
                </div>
                <div class="title">
                    <div>
                        <li class="title01">{{item.title}}</li>
                    </div>
                    <li class="title02">共{{item.course_chapter_num}}小节</li>
                    <li class="title03">
                        <ul>
                            <li class="lecturer">讲师：{{item.has_one_lecturer.real_name}}</li>
                            <li class="cost">¥ {{item.price}}</li>
                        </ul>
                    </li>
                </div>
                <div style="clear:both;"></div>
               <div style="width:100%;height:0.0625rem;background-color:#ebebeb;margin-top:0.625rem;transform: scaleY(.5);"></div>
            </div>
            <!-- <div class="content">
                <div class="touxiang"></div>
                <div class="title">
                    <div>
                        <li class="title01">牛乳茶制作课程</li>
                    </div>
                    <li class="title02">共3小节</li>
                    <li class="title03">
                        <ul>
                            <li class="lecturer">讲师：李翔</li>
                            <li class="cost">¥ 199.00</li>
                        </ul>
                    </li>
                </div>
                <div style="clear:both;"></div>
                <div style="width:363px;height:1px;background-color:#b2b2b2;margin-top:10px;transform: scaleY(.5);"></div>
            </div>
            <div class="content">
                <div class="touxiang"></div>
                <div class="title">
                    <div>
                        <li class="title01">牛乳茶制作课程</li>
                    </div>
                    <li class="title02">共3小节</li>
                    <li class="title03">
                        <ul>
                            <li class="lecturer">讲师：李翔</li>
                            <li class="cost">¥ 199.00</li>
                        </ul>
                    </li>
                </div>
                <div style="clear:both;"></div>
                <div style="width:363px;height:1px;background-color:#b2b2b2;margin-top:10px;transform: scaleY(.5);"></div>
            </div> -->
        </div>
        <div style="width:100%;height:2.5rem;color:#f15353;background-color:#fff;margin-bottom:3.125rem;" @click="moreGoods('all')">
            <span style="height:2.75rem;line-height:2.75rem;text-align:center;font-size:15px;color:#f15353">查看更多课程 >></span>
        </div>
    </div>
</template>

<script>
    import courseIndex_controller from "./course_index_controller";
    export default courseIndex_controller;
</script>




<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
#course{
    .search{
        background-color: #fff;
        height:45px;
        line-height: 45px;
    }
}
img{display: block}
    .tupian {
        position: relative;
    }
    .sousuo {
        width: 60%;
        height: 1.875rem;
        background-color: #f2f2f2;
        border-radius: 0.9375rem;
        position: absolute;
        top: 0.625rem;
        left: 20%;
        z-index: 999;
        opacity: 0.6;
    }
    .Recommend,
    .Hot,
    .Newest {
        width: 100%;
        background-color: white;
       padding-right:0rem;
        padding-left: 0.75rem;
    }
    .touxiang {
        width: 4rem;
        height: 4rem;
        background-color: green;
        float: left;
    }
    .content {
        padding-top: 0.625rem;
    }
    .title {
        width: 17.4375rem;
        float: left;
        text-align: left;
        margin-left: 0.75rem;
        font-family: Helvetica, sans-serif;
    }
    .title02 {
        color: #999;
        font-size: 12px;
        margin-bottom: 0.125rem;
    }
    .title01 {
        margin-bottom: 0.5rem;
        font-size: 15px;
        color: #333;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
        overflow:hidden;
    }
    .lecturer {
        float: left;
        color: #999;
        font-size: 12px;
    }
    .cost {
        float: right;
        color: red;
        line-height: 1rem;
        font-size: 12px;
    }
    #course {
        .course {
            margin-top: 2.5rem;
        }
    }
    .header {
        width: 6.25rem;
        height: 6.25rem;
        border-radius: 50%;
        background-color: red;
    }

input{
    border:none;
    width:90%;
    height:1.75rem;
    color:#b89e9e;
    line-height:1.75rem;
    background-color: #fafafa;
    border-radius:0.9375rem;
    padding:0 1.125rem 0 1.125rem;
    margin:0 auto;
    position:relative;
    }
.Recommend,.Hot,.Newest{width:100%;background-color:white;padding-left:12px;}
.touxiang{width:5rem;height:5rem;background-color:green;float:left;}
.content{padding-top:0.625rem;}
.title{width:calc(100% - 6.75rem);float:left;text-align:left;margin-left:0.75rem;padding-right:0.875rem;font-family:Helvetica, sans-serif;}
.title02{color:#999;font-size:12px;margin-bottom:0.125rem;}
.title01{margin-bottom:0.5rem;font-size:15px;color:#333;}
.lecturer{float:left;color:#999;font-size:12px;}
.cost{float:right;color:#f15353;line-height:1rem;font-size:14px;}
#course {
    .course{
        margin-top:2.5rem;
    }
}
.header{width:6.25rem;height:6.25rem;border-radius:50%;}
</style>