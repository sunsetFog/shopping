<template >
    <div id="clockin">
        
        <div class="J-weixin-tip weixin-tip">
             <div id="clockin-detail">
                <c-title :hide="false" :text='clockin_title' totext='我的战绩' tolink='ClockPunchRecord'></c-title>
                <div class="tomorrow-clockin">
                    <ul>
                        <li>打卡可随机瓜分金额</li>
                        <li><h1>{{totalAmonut}}<small>元</small></h1></li>
                        <li class="time">打卡时间 {{clock_begintime}}：00 - {{clock_endtime}}：00</li>
                        <li class="people">当前有{{totalNumber}}人参与打卡挑战</li>
                    </ul>
                    <div class="right">
                        <router-link :to="fun.getUrl('ClockPunchRule')">
                            <div class="content">
                                <span>挑战规则</span>
                                <i class="fa fa-angle-right"></i>
                            </div>
                            
					    </router-link>
                    </div>
                    <!-- <span>打卡可随机瓜分金额</span><br>
                    <h1>{{totalAmonut}}<small>元</small></h1> -->
                    <!-- <div class="tomorrow-clockin-time" v-if="false"> -->
                    <!-- <div class="tomorrow-clockin-time">
                        打卡时间 05：00 - 08：00
                    </div> -->
                    <!-- <div class="tomorrow-clockin-people">
                        当前有{{totalNumber}}人参与打卡挑战
                    </div> -->
                    <!-- <div class="tomorrow-clockin-rule">
                        <router-link :to="fun.getUrl('ClockPunchRule')">
                            挑战规则 >
					    </router-link>
                    </div> -->
                </div>
                <div class="clockin-pay">
                    <div class="status">
                            <h1>打卡战况</h1>
                            <span class="clockin-pay-people"><small class="success">{{clockInNum}}</small>人成功，<small class="fail">{{notClockInNum}}</small>人失败</span>
                    </div>


                    <div>
                        <!-- <el-button type="success" :disabled="forbidden">
                            {{message}} <yd-countdown time="2017/11/16 18:05:00" :callback="cutDownCallBack" done-text=""></yd-countdown>
                        </el-button><br /> -->
                        <yd-button @click.native="clokinBtnCallBack(btnStatus)" size="large" :disabled="forbidden">
                            {{message}} <yd-countdown :time="cutDownTime" timetype="second" :callback="cutDownCallBack" done-text=""></yd-countdown>
                        </yd-button>
                        <yd-actionsheet :items="actionSheetItems" v-model="actionSheetShow" cancel="取消" size="large"></yd-actionsheet>  
                        
                        <div v-if="huanxun_form_wx">
					       <form id="ipspaysubmit" method="post" :action="huanxun_form_action">
						      <input type="hidden" :name="huanxun_input_name" v-model="huanxun_form_input">
					       </form>
				        </div>               
                    </div> 
                    <div class="clockin-pay-content">
                        
                        
                        
                        <div class="clockin-top">
                            <div class="clockin-top-early" v-if="clockFirstShow && clockFirstMember">
                                <img :src="clockFirstMember.has_one_member.avatar"/>
                                <div class="clockin-top-name">早起之星</div>
                                <p>{{clockFirstMember.has_one_member.nickname}}</p>
                                <p>{{clockFirstMember.clock_in_at}}打卡</p>
                            </div>
                            <div class="clockin-top-lucky" v-if="luckyMemberShow && luckyMember">
                                <img :src="luckyMember.has_one_member.avatar" />
                                <div class="clockin-top-name">幸运之星</div>
                                <p>{{luckyMember.has_one_member.nickname}}</p>
                                <p>{{luckyMember.amount}}元</p>
                            </div>
                            <div class="clockin-top-persist" v-if="continueMemberShow && continueMember">
                                <img :src="continueMember.has_one_member.avatar"/>
                                <div class="clockin-top-name">毅力之星</div>
                                <p>{{continueMember.has_one_member.nickname}}</p>
                                <p>连续{{continueMember.clock_num}}次</p>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
        <div></div>
    
    </div>
</template>

<script>
import clockin_controller from './clockin_controller';
export default clockin_controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>

#clockin-detail {
    position: fixed;
    width: 100%;
    margin-top:2.5rem;
    font-size: 16px;
    .tomorrow-clockin{
        display: flex;
        justify-content: space-between;
        text-align: left;
        color:#fff;
        padding:1.25rem 0.875rem;
        background:#f15353;
        span {
            font-size: 16px;
        }
        h1{
            margin-top:0.625rem;
            font-size: 30px;
            small{
                font-size: 16px;
                font-weight: normal;
            }
        }
        .time{
            margin-top:1.25rem;
            font-size: 14px;
        }
        .people{
            margin-top:0.3125rem;
            font-size:14px;
        }
        .right{
            padding:0.125rem 0.375rem;
            .content{
                background: rgba(255,255,255,0.4);
                padding:0.0625rem 0.375rem;
                border-radius: 0.875rem;
            }

            span{
                font-size:14px;
            }
            i{
                font-size:18px;
                color:#fff;
                margin-left:0.375rem;
            }
        }
        .tomorrow-clockin-rule{
            margin-top:0.3125rem;
            padding-bottom: 0.625rem;
            font-size:14px;
        }
    }

    .clockin-pay{
        margin-top:0.625rem;
        .status{
            background-color:#fff;
            margin-bottom: 1.25rem;
            h1{
                line-height: 2.5rem;
                border-bottom: solid 0.0625rem #ebebeb;
            }
            span{
                margin:1.25rem 0;
                display: inline-block;
            }
        }
        .success{
            color:#16d285;
            font-size:18px;
        }
        .fail{
            color:#f15353;
            font-size:18px;
        }
        button{
            margin:0 auto;
            height:2.5rem;  
            background-color: #f15353;
            color:#fff;
            border-radius: 0.3125rem;
            width:80%;
            font-size:16px;
            };
        // .yd-actionsheet-active .yd-actionsheet-item{
        //     height: 30px!important;
        //     font-size: 28px;
        // }
    }

    .clockin-pay-content{
        margin-top:0.625rem;
        h1{
            font-size: 20px;
        }
        .clockin-pay-people{
            .success{
                color:#13ce66;
            }
            .fail{
                color:#ff4949;
            }
        }
        .clockin-top{
            width: 90%;
            margin:1.25rem 5% 0rem 5%;
            float: left;
            .clockin-top-early{
                float: left;
                width: 30%;
                img{
                    width:60%;
                    height:60%;
                    -webkit-border-radius:50%;
                    -moz-border-radius:50%;
                    -o-border-radius:50%;
                    border-radius:50%; 
                }
                p{
                    width: 80%;
                    height: 1.25rem;
                    line-height: 1.25rem;
                    font-size: 14px;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                    margin:0.125rem auto;
                }
                .clockin-top-name{
                    width:80%;
                    background-color:red;
                    height: 1.125rem;
                    margin: 0 auto;
                    color:#fff;
                    line-height: 1.125rem;
                    font-size: 14px;
                }
            }

            .clockin-top-lucky{
                float: left;
                width: 30%;
                margin-right:5%;
                margin-left: 5%;
                img{
                    width:60%;
                    height:60%;
                    -webkit-border-radius:50%;
                    -moz-border-radius:50%;
                    -o-border-radius:50%;
                    border-radius:50%; 
                }
                p{
                    width: 80%;
                    height: 1.25rem;
                    line-height: 1.25rem;
                    font-size: 14px;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                    margin:0.125rem auto;
                }

                .clockin-top-name{
                    width:80%;
                    background-color:red;
                    height: 1.125rem;
                    margin: 0 auto;
                    color:#fff;
                    line-height: 1.125rem;
                    font-size: 14px;
                }
            }

            .clockin-top-persist{
                float: left;
                width: 30%;
                img{
                    width:60%;
                    height:60%;
                    -webkit-border-radius:50%;
                    -moz-border-radius:50%;
                    -o-border-radius:50%;
                    border-radius:50%; 
                }
                p{
                    width: 80%;
                    height: 1.25rem;
                    line-height: 1.25rem;
                    font-size: 14px;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                    margin:0.125rem auto;
                }

                .clockin-top-name{
                    width:80%;
                    background-color:red;
                    height: 1.125rem;
                    margin: 0 auto;
                    color:#fff;
                    line-height: 1.125rem;
                    font-size: 14px;
                }
                
            }
        }
    }
}

</style>