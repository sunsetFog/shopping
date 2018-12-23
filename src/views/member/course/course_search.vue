<template>
    <div id="course" style="background-color:white;">
        <c-title :hide="false" text='精选推荐课程'></c-title>
        <div class="box01" style="margin-top:40px;">
            <div class="Search-box">
                <yd-icon slot="icon" class="icon-sousuo" custom size="16px" color="#c9c9c9" style="position:absolute;right:2.25rem;z-index:8888;" @click.native="getData()"></yd-icon>
                <input type="text" class="s_input input_enter_placeholder" placeholder="搜索课程/讲师"  v-model="searchVal">
            </div>
            <div style="padding-left:0.75rem;padding-top:3.25rem;">
                <mt-loadmore v-if="goload" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="coupon_loadmore" bottomPullText='' bottomDropText='下拉加载...' bottomLoadingText='' :autoFill='false' id='olis'>
    
                    <div class="content" v-for="item in goodsList" @click="goToDetail(item.goods_id)">
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
                </mt-loadmore>
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
                                            <li class="cost">¥ 1999.00</li>
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
                            </div>
                            <div class="content">
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
                            </div>
                            <div class="content">
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
                            </div>
                            <div class="content">
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
                            </div>
                            <div class="content">
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
                            </div>
                            <div class="content">
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
        </div>
    </div>
    </div>
    </mt-search>
    </div>
</template>

<script>
    import course_search_controller from "./course_search_controller";
    export default course_search_controller;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
    .Search-box{
        width:100%;
        height:2.8125rem;
        line-height:2.8125rem;
        position:fixed;
        background-color:#fff;
        z-index:98;
        border-bottom:solid 0.0625rem #ebebeb;
    }
    input {
        border: none;
        width:90%;
        height: 1.75rem;
        line-height: 1.75rem;
        border-radius: 0.9375rem;
        padding: 0 1.125rem 0 1.125rem;
        margin: 0 auto;
        position: relative;
        top:0;
        background-color:#fafafa;
    }
    .Recommend,
    .Hot,
    .Newest {
        
        background-color: white;
        padding-right: 0.75rem;
        padding-left: 0.75rem;
    }
    .touxiang {
        width: 5rem;
        height: 5rem;
        background-color: green;
        float: left;
    }
    .content {
        padding-top: 0.625rem;
    }
    .title {
        width:calc(100% - 6.75rem);
        float: left;
        text-align: left;
        margin-left: 0.75rem;
        font-family: Helvetica, sans-serif;
        padding-right:0.875rem;
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
        color: #f15353;
        line-height: 1rem;
        font-size: 14px;
    }
    #course {
        .course {
            margin-top: 2.5rem;
        }
    }
</style>