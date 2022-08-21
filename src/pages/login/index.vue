<template>
  <div class="login">
    <div class="login-box">
        <div class="login-box--logo">

        </div>
        <div class="login-box--text">
            <span class="login-box--text__line"></span>
            <span class="login-box--text__tips">一键快捷登录</span>
            <span class="login-box--text__line"></span>
        </div>
        <div class="login-box--weixin" @click="goWeixin"></div>
        <div class="login-box--tips">点击微信登录</div>
        <div class="login-box--agreement">
            <el-tooltip content="请勾选协议" placement="bottom" :visible="!hasChecked">
                <el-checkbox v-model="hasChecked" label="" size="large" />
            </el-tooltip>
            我已阅读并接受
            <span>《注册协议》</span>
            <span>《隐私协议》</span>
            <span>《版权声明》</span>
        </div>
    </div>
  </div>
</template>

<script setup>
// import { check } from '@element-plus'
import { reactive, ref, onMounted, getCurrentInstance, nextTick, watch } from 'vue'

let hasChecked = ref(false);

const goWeixin = async () => {
    if (hasChecked.value) {
        const appid = ""
        const redirect_uri = "https://www.baidu.com"
        const response_type = "code"
        const scope = "snsapi_login"
        const state = ""
        const url = `https://open.weixin.qq.com/connect/qrconnect?appid=${appid}&redirect_uri=${redirect_uri}&response_type=${response_type}&scope=${scope}&state=${state}#wechat_redirect`
        window.open(url)
    }
}


</script>


<style scoped lang="scss">

.login {
    &-box {
        margin: 132px auto 0;
        width: 420px;
        height: 480px;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 12px;
        background: #FFFFFF;
        box-shadow: 0px 0px 16px 0px rgba(21, 88, 160, 0.16);
        &--logo {
            margin-top: 60px;
            width: 200px;
            height: 45px;
            background: url("../../assets/images/logo.png");
        }
        &--text {
            margin: 32px 0 46px;
            display: flex;
            align-items: center;
            justify-content: center;
            &__line {
                display: inline-block;
                width: 80px;
                height: 1px;
                background: #D8D8D8;
            }
            &__tips {
                display: inline-block;
                width: 72px;
                height: 12px;
                margin: 0 32px;
                font-family: PingFangSC-Medium;
                font-size: 12px;
                line-height: 12px;
                color: #909399;
            }
        }
        &--weixin {
            width: 80px;
            height: 80px;
            background: url("../../assets/images/weixin.png");
            cursor: pointer;
        }
        &--tips {
            margin: 20px 0 67px;
            font-family: PingFangSC-Medium;
            font-size: 16px;
            font-weight: normal;
            line-height: 19px;
            color: #303133;
        }
        &--agreement {
            display: flex;
            align-items: center;
            font-family: PingFangSC-Medium;
            font-size: 12px;
            font-weight: normal;
            line-height: 14px;
            color: #909399;
        }
    }
}

</style>
