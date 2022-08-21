<template>
  <div class="layout">
      <div class="layout-user">
          <div class="layout-user--image"></div>
          <div class="layout-user--name">admin</div>
      </div>
      <div class="layout-menu">
          <div 
            v-for="item in menuList" 
            :key="item.key"
            class="layout-menu--item"
            @click="handleGoRouter(item.router)"
        >
            {{item.label}}
        </div>
      </div>
      <div class="layout-content">
          <router-view></router-view>
      </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, getCurrentInstance, nextTick, watch } from 'vue'
import { useRouter } from "vue-router" 

const Router = useRouter()
let menuList = reactive([
    {key: "design", label: "设计验证", router: "/design"},
    {key: "weather", label: "气象参数", router: "/weather"},
    {key: "download", label: "资料下载", router: "/download"},
    {key: "order", label: "我的订单", router: "/order"}
])

const handleGoRouter = (routerData) => {
    Router.push(routerData)
}

</script>


<style scoped lang="scss">

  .layout {
    height: 100%;
    background: url('../../assets/images/weather-banner.png') no-repeat;
    background-color: #FAFBFC;
    background-size: 100% 120px;
    &-user {
        position: relative;
        height: 120px;
        &--image {
            position: absolute;
            left: 50%;
            bottom: 46px;
            width: 52px;
            height: 52px;
            border-radius: 30px;
            background: #FFFFFF;
            box-sizing: border-box;
            border: 0.5px solid #DCDFE6;
        }
        &--name {
            position: absolute;
            left: 50%;
            bottom: 22px;
            width: 32px;
            height: 16px;
            font-family: PingFangSC-Medium;
            font-size: 16px;
            line-height: 16px;
            letter-spacing: 0px;
            color: #303133;
        }
    }
    &-menu {
        width: 100%;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #FFFFFF;
        border-bottom: 2px solid #E4E7ED;
        &--item {
            width: 130px;
            height: 48px;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0px 20px;
            font-family: HarmonyOS_Sans_SC;
            font-size: 16px;
            line-height: 24px;
            color: #131414;
            cursor: pointer;
            &-active {
                box-shadow: inset 0px -2px 0px 0px #005BAC;
                cursor: pointer;
            }
        }
    }
    &-content {
        width: 1200px;
        margin: 0 auto;
    }
  }

</style>
