<template>
    <div id="login">
        <c-title :hide="false" text='用户登录'></c-title>
        <div>
            <div  v-if="appShow">

           
                <yd-cell-group>
                    <yd-cell-item>
                        <span slot="left">手机号：</span>
                        <yd-input slot="right" required v-model="form.mobile" max="20" placeholder="请输入手机号"></yd-input>
                    </yd-cell-item>
                    <yd-cell-item>
                        <span slot="left">密码：</span>
                        <yd-input slot="right" type="password" v-model="form.password" placeholder="请输入密码"></yd-input>
                    </yd-cell-item>
                </yd-cell-group>

                <yd-button-group>
                    <yd-button size="large" @click.native="mobile_login" type="danger">登录</yd-button>
                    <yd-button size="large" @click.native="register" type="primary">注册</yd-button>
                    <!-- <p class="forget"><router-link :to="fun.getUrl('findpwd')">忘记密码</router-link></p> -->

                    <p class="forget" @click="gotoPwd">忘记密码</p>

                    
                </yd-button-group>

             </div>





            <!-- <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model.trim="form.mobile" :attr="{ maxlength: 11 }" :state='form.mobileErr'></mt-field>
            <mt-field label="密码" placeholder="请输入密码" type="password" v-model.trim="form.password" :state='form.passwordErr'></mt-field>

            </div>
            <div id="bts">
            <mt-button type="danger" @click="mobile_login" size="large">登录</mt-button>
            <mt-button type="default" @click="register" size="large">注册</mt-button>
            <p class="forget"><router-link :to="fun.getUrl('findpwd')">忘记密码</router-link></p>
            </div> -->


            <div class="vip_main" v-if="wetach_login==1">
                <div class="title">一键登录</div>
                <div class="weixin vip1" @click="weixin">
                    <div class="ico1">
                        <i class="fa fa-qrcode"></i>
                    </div>
                    <div class="text">
                        <div class="t1">微信登录</div>
                        <div class="t2">微信快捷通道一键登录商城</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import login_controller from "./login_controller";
    export default login_controller;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
    #login {
        margin-top: 3.125rem;
        width: 100%;
        h1 {
            color: #42b983;
        }
        .mint-button--large {
            margin-top: 0.625rem;
        }
        #bts {
            margin: auto 0.3125rem;
        }
        .forget {
            line-height: 2.5rem;
            float: right;
            a {
                color: #999;
            }
        }
        .vip_main {
            background: #ffffff;
            margin-top: 3.125rem;
            .title {
                padding: 0.625rem;
                font-size: 12px;
                border-bottom: 0.0625rem solid #eeeeee;
                text-align: center;
            }
            .weixin {
                padding: 0.9375rem 0.625rem;
                overflow: hidden;
                font-size: 12px;
                color: #999;
                .ico1,
                .ico2 {
                    width: 15%;
                    float: left;
                }
                .ico1 {
                    i {
                        background: #32cd32;
                    }
                }
                .ico2 {
                    i {
                        background: #fece00;
                    }
                }
                .text {
                    float: left;
                    width: 85%;
                    .t1 {
                        font-size: 16px;
                        color: #333;
                        margin-bottom: 0.3125rem;
                        text-align: left;
                    }
                    .t2 {
                        text-align: justify;
                    }
                }
                i {
                    background: #32cd32;
                    height: 2.25rem;
                    width: 2.25rem;
                    border-radius: 1.125rem;
                    color: #fff;
                    text-align: center;
                    line-height: 2.375rem;
                    font-size: 18px;
                }
            }
            .vip1 {
                border-bottom: 0.0625rem solid #eeeeee;
            }
        }
    }
</style>