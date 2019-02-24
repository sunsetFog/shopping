<template>
    <div id="love_transfer">
        <c-title :hide="false" :text='love_name +"出售"' ></c-title>
        <div style="height: 40px;margin-bottom:1.25rem"></div>
        <center><i class="fa fa-heart" ></i></center>
        <p class="my-banlance">出售{{love_name}}<br /><span>￥<b>{{usable}}</b></span></p>
        <mt-field :label="love_name" v-model="sell_value" :placeholder="'请输入您要出售的'+love_name"></mt-field>
        <p><el-button type="success" @click="getBalance">确认出售</el-button><br /></p>

        <p class="notes">注：交易手续费收取{{poundage}}%，<br/>
            交易限制(最小额度){{trading_limit}}，<br/>
            交易限制(倍数) {{trading_fold}}，<br/>
            只有 {{trading_fold}} 或 {{trading_fold}} 的倍数是可以交易。

        </p>



    </div>
</template>
<script>
    import love_trading_sell_controller from './love_trading_sell_controller';
    export default love_trading_sell_controller;

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    #love_transfer{
        button{width: 90%;margin: 1.25rem;height:2.875rem;font-size:16px;}
        i{font-size: 4.375rem;  color: #f15353;}
        .my-banlance{margin: 1.25rem 0;font-size: 14px;  color: #333;line-height: 1.875rem;}
        .my-banlance span{font-size: 14px;color: #333;margin-top:0.625rem; }
        .my-banlance span b{font-size: 28px;}
        .notes{
            color:#8c8c8c;line-height: 1.125rem;
        }
    }
</style>