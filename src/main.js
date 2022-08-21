import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import request from './config/request'
import store from './store'
import * as echarts from 'echarts' 
import api from './api'

const app = createApp(App)

app.config.globalProperties.$request = request
app.config.globalProperties.$echarts = echarts
app.config.globalProperties.$api = api


app.use(router)
app.use(store)
app.use(ElementPlus)
app.mount('#app')
