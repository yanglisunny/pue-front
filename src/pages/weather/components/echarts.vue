<template>
    <div id="echarts" style="width: 100%; height: 400px"></div>
</template>

<script setup>
    import { reactive, ref, onMounted, getCurrentInstance, watch } from 'vue'
    const { proxy } = getCurrentInstance()
    const props = defineProps({
        data: {
            type: Object,
            default: () => {}
        }
    })

    // watch (() => props.data, (nv, ov) => {
    // }) 

    function init() {
        console.log(props.data.value, "ss")
        // 基于准备好的dom，初始化echarts实例
        var myChart = proxy.$echarts.init(document.getElementById('echarts'));
        const colors = ['#005BAC', '#50AC00', '#E73031', '#78C0FF'];
        let option = {
            color: colors,
            tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                    type: 'cross'
                }
            },
            grid: {
                right: '20%'
            },
            legend: {
                // data: ['干球温度', '湿球温度', '含湿量', '相对湿度',]
                data: props.data.value.legendData
            },
            xAxis: [
                {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    // prettier-ignore
                    // data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                    data: props.data.value.months
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '含湿量g/kg',
                    position: 'right',
                    alignTicks: true,
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: colors[2]
                        }
                    },
                    // axisLabel: {
                    //     formatter: '{value} ml'
                    // }
                },
                 {
                    type: 'value',
                    name: '湿球温度°C',
                    position: 'left',
                    alignTicks: true,
                    axisLine: {
                        show: true,
                        lineStyle: {
                        color: colors[1]
                        }
                    },
                    // axisLabel: {
                    //     formatter: '{value} ml'
                    // }
                },
                {
                    type: 'value',
                    name: '相对湿度 %',
                    position: 'right',
                    alignTicks: true,
                    offset: 80,
                    axisLine: {
                        show: true,
                        lineStyle: {
                        color: colors[3]
                        }
                    },
                    // axisLabel: {
                    //     formatter: '{value} ml'
                    // }
                },
                {
                    type: 'value',
                    name: '干球温度°C',
                    position: 'left',
                    alignTicks: true,
                    offset: 80,
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: colors[0]
                        }
                    },
                    // axisLabel: {
                    //     formatter: '{value} °C'
                    // }
                }
            ],
            series: [
                {
                    name: '含湿量',
                    type: 'line',
                    // data: [
                    //     2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
                    // ]
                    data: props.data.value.monthDampishes // dampishes
                },
                {
                    name: '湿球温度',
                    type: 'line',
                    yAxisIndex: 1,
                    // data: [
                    //     2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
                    // ]
                    data: props.data.value.monthTempWetBulbs // tempWetBulbs
                },
                {
                    name: '相对湿度',
                    type: 'bar',
                    yAxisIndex: 2,
                    // data: [
                    //     2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
                    // ]
                    data: props.data.value.monthRelativeHumidities // relativeHumidities
                },
                {
                    name: '干球温度',
                    type: 'line',
                    yAxisIndex: 3,
                    // data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
                    data: props.data.value.monthTempDryBulbs // tempDryBulbs
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }
    onMounted(async()=>{
        init()
    })
</script>

<style lang="scss" scoped>

</style>