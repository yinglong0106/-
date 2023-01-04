<template>
  <div>
    <el-descriptions :colon="false" :column="1" direction="horizontal">
      <el-descriptions-item label="年度" v-if="currentRow.year">{{currentRow.year}}</el-descriptions-item>
      <el-descriptions-item label="计酬月份" v-if="currentRow.month">{{currentRow.month}}</el-descriptions-item>
      <el-descriptions-item label="机构名称" v-if="currentRow.orgName">{{currentRow.orgName}}</el-descriptions-item>
      <el-descriptions-item label="账号创建日期" v-if="currentRow.registerTime">{{currentRow.registerTime}}</el-descriptions-item>
      <el-descriptions-item label="关联日期" v-if="currentRow.relateTime">{{currentRow.relateTime}}</el-descriptions-item>
      <el-descriptions-item label="品类名称" v-if="currentRow.categoryName">{{currentRow.categoryName}}</el-descriptions-item>
      <el-descriptions-item label="品类类型" v-if="currentRow.cattypeName">{{currentRow.cattypeName}}</el-descriptions-item>
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
