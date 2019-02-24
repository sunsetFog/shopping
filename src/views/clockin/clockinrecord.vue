<template >
    <div id="clockinrecord">
        <div id="record">
            <c-title :hide="false" :text='title'></c-title>
            <div class="record-content">
                <h3>我的战绩</h3>
                <div class="record-data">
                    <div>
                        <span class="data">{{payAmount}}</span><br>
                        <span class="amount">累计投入(元)</span>
                    </div>

                    <div class="data-mid">
                        <span class="data">{{rewardAmount}}</span><br>
                        <span class="amount">累计赚取(元)</span>
                    </div>

                    <div>
                        <span class="data">{{clockNum}}</span><br>
                        <span class="amount">累计打卡(天)</span>
                    </div>
                </div>

            </div>
            <div class="record-detail" v-if="recordDetailShow">
                <h3>战绩明细</h3>
                <mt-loadmore v-if="goload" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="coupon_loadmore" bottomPullText='' bottomDropText='下拉加载...' bottomLoadingText='' :autoFill='false'>
                    <div v-for="item in recordDetail" class="record-detail-list">
                        <span>{{item.created_at}}</span>
                        <span>{{item.clock_in_status_name}}</span>
                        <span class="amount">{{fun.isTextEmpty(item.has_one_reward)?"":item.has_one_reward.amount}}</span>
                    </div>
                </mt-loadmore>
            </div>
            
        </div>
    </div>
</template>


<script>
import clockinrecord_controller from './clockinrecord_controller';
export default clockinrecord_controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    #record{
        color: #fff;
        text-align: left;
        .record-content{
            margin-top:2.5rem;
            background: #f15353;
            h3{
                line-height: 2.5rem;
                padding:0 0.875rem;
                font-size: 18px;
            }

            .record-data{
                // margin: 10px;
                margin-left: 5%;
                margin-right:5%;
                padding-bottom: 0.625rem;
                font-size: 15px;
                word-wrap: break-word;
                word-break: break-all;
                overflow: hidden;
                .data-mid{
                    margin-right:5%;
                    margin-left: 5%;
                }
                div{
                    float: left;
                    
                    width: 30%;
                    .data{
                        font-size: 20px; 
                    }
                    .amount{
                        font-size: 14px;
                    }
                    
                }

                
            
            }

            
        }

        .record-detail{
            color: #000000;
            padding:0.625rem 5% 0.625rem 5%;
            background: #fff;
            h3{
               font-size: 18px;  
            }

            .record-detail-list{
                font-size: 17px;
                height: 2.8125rem;
                line-height: 2.8125rem;
                .amount{
                    float: right;
                }
            }
        }
    }
</style>