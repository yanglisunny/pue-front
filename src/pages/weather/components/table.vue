<template>
    <el-table :data="props.tableData" border style="width: 100%">
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address" />
    </el-table>
</template>

<script setup>
    import { reactive, ref, onMounted, getCurrentInstance } from 'vue'
    const { proxy } = getCurrentInstance()
    const props = defineProps({
        tableData: {
            type: Object,
            default: () => []
        }
    })
    
    onMounted(async()=>{
    })
</script>

<style lang="scss" scoped>

</style>