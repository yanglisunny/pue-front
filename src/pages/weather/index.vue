
<script setup>
import { Search } from '@element-plus/icons-vue'
import { reactive, ref, onMounted, getCurrentInstance, nextTick, watch } from 'vue'
const { proxy } = getCurrentInstance()
import Echarts from "./components/echarts.vue"
import Table from "./components/table.vue"
import { ElMessage } from 'element-plus'
import { dataType } from 'element-plus/es/components/table-v2/src/common'

const form = reactive({
  stationId: '',
  province: '',
  dataType: '',
  minDampish: undefined,
  maxDampish: undefined,
  bjDampish: undefined,
  minTempDryBulb: undefined,
  maxTempDryBulb: undefined,
  bjTempDryBulb: undefined,
  minTempWetBulb: undefined,
  maxTempWetBulb: undefined,
  bjTempWetBulb: undefined
})
let showEcharts = ref(false)
let echartsData = reactive({})
let tableData = reactive([])
let provinceList = ref([])
let dataTypeList = ref([])
let cityList = ref([])
let dampisList = ref([]) // 含湿量
let tempdryList = ref([])
let tempwetList = ref([])

const onSubmit = async() => {
  let params = {
    submit: true,
    stationId: form.stationId,
    dataType: form.dataType,
    minDampish: form.minDampish,
    maxDampish: form.maxDampish,
    bjDampish: form.bjDampish,
    minTempDryBulb: form.minTempDryBulb,
    maxTempDryBulb: form.maxTempDryBulb,
    bjTempDryBulb: form.bjTempDryBulb,
    minTempWetBulb: form.minTempWetBulb,
    maxTempWetBulb: form.maxTempWetBulb,
    bjTempWetBulb: form.bjTempWetBulb
  }
  /** 获取echarts数据 */
  let res = await proxy.$request({url: proxy.$api.GET_TEMP_INFO, method: "get", params: params})
  if (res.code === 1) {
    echartsData.value = res.data 
    showEcharts.value = true
  } else {
    ElMessage(res.msg)
  }
}

const handleChangeProvince = (provinceId)=> {
  cityList.value = provinceList.value.filter((item) => item.id === provinceId)[0].cities
}
onMounted(async()=>{
  /** 查询城市列表 */
  let provinceRes = await proxy.$request({url: proxy.$api.GET_DICT_CITIES, method: "get"})
  provinceRes.code === 1 ? (provinceList.value = provinceRes.data) : ElMessage(provinceRes.msg)
  /** 获取数据类型 */
  let dataTypeRes = await proxy.$request({url: proxy.$api.GET_DICT_DATATYPE, method: "get"})
  dataTypeRes.code === 1 ? (dataTypeList.value = Object.keys(dataTypeRes.data).map((item) => ({label: dataTypeRes.data[item], value: Number(item)}))) : ElMessage(dataTypeRes.msg)

  return { form, provinceList, dataTypeList, cityList, echartsData, showEcharts}
})

watch (() => form.stationId, async(nv, ov) => {
  if (nv) {
    /** 获取含湿量等数据 */
    let basicRes = await proxy.$request({url: proxy.$api.GET_TEMP_BASIC, method: "get", params: {stationId: form.stationId}})
    if (basicRes.code === 1) {
      dampisList.value = basicRes.data.dampishes
      tempdryList.value = basicRes.data.tempDryBulbs
      tempwetList.value = basicRes.data.tempWetBulbs
      form.minDampish = Math.min(...basicRes.data.dampishes)
      form.maxDampish = Math.max(...basicRes.data.dampishes)
      form.bjDampish = 3
      form.minTempDryBulb = Math.min(...basicRes.data.tempDryBulbs)
      form.maxTempDryBulb = Math.max(...basicRes.data.tempDryBulbs)
      form.bjTempDryBulb = 5
      form.minTempWetBulb = Math.min(...basicRes.data.tempWetBulbs)
      form.maxTempWetBulb = Math.max(...basicRes.data.tempWetBulbs)
      form.bjTempWetBulb = 5
    } else {
      ElMessage(basicRes.msg)
    }
  }
})

</script>

<template>
  <div class="weather">
    <div class="weather-header">
      <el-form
        label-position="top"
        :model="form"
        :inline="true"
        class="weather-header__form"
      >
        <el-form-item label="省份">
          <el-select v-model="form.province" @change="handleChangeProvince" placeholder="Select" size="default">
            <el-option
              v-for="item in provinceList"
              :key="item.id"
              :label="item.province"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="城市">
          <el-select v-model="form.stationId" placeholder="Select" size="default">
            <el-option
              v-for="item in cityList"
              :key="item.stationId"
              :label="item.name"
              :value="item.stationId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="数据类型">
          <el-select v-model="form.dataType" placeholder="Select" size="default">
            <el-option
              v-for="item in dataTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
         <!-- 含湿量 -->
        <el-form-item label="最小含湿量（g/kg）" v-if="form.dataType === 3">
          <el-select v-model="form.minDampish" placeholder="Select" size="default">
            <el-option
              v-for="item in dampisList"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="最大含湿量（g/kg）" v-if="form.dataType === 3">
          <el-select v-model="form.maxDampish" placeholder="Select" size="default">
            <el-option
              v-for="item in dampisList"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="含湿量步进值(g/Kg)" v-if="form.dataType === 3">
          <el-input v-model="form.bjDampish"></el-input>
        </el-form-item>
        <!-- 干球 -->
        <el-form-item label="最小干球温度(°C)" v-if="form.dataType === 4">
          <el-select v-model="form.minTempDryBulb" placeholder="Select" size="default">
            <el-option
              v-for="item in tempdryList"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="最大干球温度(°C)" v-if="form.dataType === 4">
          <el-select v-model="form.maxTempDryBulb" placeholder="Select" size="default">
            <el-option
              v-for="item in tempdryList"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="干球温度步进值(°C)" v-if="form.dataType === 4">
          <el-input v-model="form.bjTempDryBulb"></el-input>
        </el-form-item>
        <!-- 湿球 -->
        <el-form-item label="最小湿球温度(°C)" v-if="form.dataType === 5">
          <el-select v-model="form.minTempWetBulb" placeholder="Select" size="default">
            <el-option
              v-for="item in tempwetList"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="最大湿球温度(°C)" v-if="form.dataType === 5">
          <el-select v-model="form.maxTempWetBulb" placeholder="Select" size="default">
            <el-option
              v-for="item in tempwetList"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="湿球温度步进值(°C)" v-if="form.dataType === 5">
          <el-input v-model="form.bjTempWetBulb"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="weather-content">
     <Echarts :data="echartsData" v-if="showEcharts"/>
      <Table :tableData="tableData"/>
    </div>
  </div>
</template>

<style scoped lang="scss">

  .weather {
    width: 1200px;
    // margin: 16px 0;
    padding: 16px 0;
    &-header {
      width: 1200px;
      height: 108px;
      margin-bottom: 16px;
      border-radius: 12px;
      background: #FFFFFF;
      &__form {
        align-items: end;
        flex-wrap: nowrap;
      }
    }
    &-content {
      min-height: 300px;
      border-radius: 12px;
      background: #FFFFFF;
    }
  }

</style>
