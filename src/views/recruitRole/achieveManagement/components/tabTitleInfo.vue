<template>
  <div>
    <el-descriptions :colon="false" :column="1" direction="horizontal">
      <el-descriptions-item label="类别">{{currentRow.typeStr}}</el-descriptions-item>
      <el-descriptions-item label="年度" v-if="currentRow.year">{{currentRow.year}}</el-descriptions-item>
      <el-descriptions-item label="计酬月份" v-if="currentRow.month">{{currentRow.month}}</el-descriptions-item>
      <el-descriptions-item label="采购服务费用">{{currentRow.money}}</el-descriptions-item>
    </el-descriptions>
    <el-divider></el-divider>
  </div>
</template>
<script>
export default {
  name: 'index',
  props: {
    currentRow: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
