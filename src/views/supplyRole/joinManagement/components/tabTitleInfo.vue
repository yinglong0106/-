<template>
  <el-table :data="currentRowList" border>
    <el-table-column label="机构名称" prop="orgName" align="center" :show-overflow-tooltip="true"/>
    <el-table-column label="账号创建日期" prop="registerTime" align="center" width="160" :show-overflow-tooltip="true"/>
    <el-table-column label="关联日期" prop="relateTime" align="center" width="160" :show-overflow-tooltip="true"/>
  </el-table>
</template>
<script>
export default {
  name: 'index',
  props: {
    currentRow: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      currentRowList: []
    }
  },
  created() {
    this.currentRowList = [this.currentRow]
  }
}
</script>
