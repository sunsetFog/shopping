<template>
    <div id="alterAddress">
        <c-title :hide="false" text='我的信息'></c-title>
        <div style="height: 40px;margin-top:0.625rem;"></div>
        <mt-field label="真实姓名" placeholder="请输入真实姓名" v-model='form.member_name'></mt-field>
        <mt-field label="身份证号码" placeholder="请输入身份证号码" v-model='form.member_card'></mt-field>
        <div class="address_addnav1" @click="saveInfo"><span>确认保存</span></div>
        <div style="margin-top:18.75rem;text-align:center;"><span style="font-size:18px;line-height:1.25rem;" @click="showRule"><yd-icon name="question" size="1.25rem" color="#f15353"></yd-icon>使用说明</span></div>

        <yd-popup v-model="show1" position="center" width="90%">
            <div style="height:12.5rem;width:100%;">
            <p style="text-align:left;margin:0.625rem;font-size:22px;text-align:center;">{{explain_title}}</p>
            <p style="text-align:left;margin:0.625rem;width:95%;word-wrap:break-word">{{explain_content}}</p>
            </div>
           
        </yd-popup>
    </div>
    
</template>
<script>
    import myinfo_controller from './myinfo_controller';
    export default myinfo_controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    .address_addnav1 {
        width: 90%;
        margin: 3.125rem auto;
        background: #f15353 !important;
        color: #fff !important;
        text-align: center;
        height: 2.8125rem !important;
        line-height: 2.8125rem !important;
        border-radius: 0.1875rem;
    }
    .address_addnav {
        width: 100%;
        padding: 0 3% 0 6% !important;
        position: fixed;
        bottom: 0;
        left: 0;
        color: #000 !important;
        text-align: center;
        height: 2.75rem !important;
        line-height: 2.75rem !important;
    }
    .red {
        color: red !important;
    }
    .popup-con {
        width: 100%;
    }
    #alterAddress .mint-field .mint-cell-title {
        text-align: left;
    }
    .address_addnav i {
        color: #fff;
        font-size: 22px;
        position: absolute;
        top: 50%;
        height: 1.125rem;
        line-height: 1.125rem;
        margin-left: -2.125rem;
        margin-top: -0.5625rem;
    }
    .maleall {
        background: #FFF;
        text-align: left;
    }
    #alterAddress .males {
        line-height: 3.125rem;
        display: flex;
        border-top: 0.0625rem solid #d9d9d9;
        margin-left: 0.625rem;
    }
    .mydefault {
        line-height: 3.125rem;
        display: flex;
        border-top: 0.0625rem solid #d9d9d9;
        margin-left: 0.625rem;
        align-items: center;
    }
    .maleall span {
        font-size: 16px;
        vertical-align: middle;
        width: 6.5625rem;
        -webkit-box-flex: 0;
        -ms-flex: none;
        flex: none;
    }
    .address {
        flex: 1;
        line-height: 3.125rem;
        .mint-button--default {
            line-height: 3.125rem;
            text-align: left;
            font-size: 16px;
        }
    }
</style>