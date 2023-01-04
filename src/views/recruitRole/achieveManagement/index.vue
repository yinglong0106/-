<template>
  <div>
    <el-table v-loading="loading" border :data="dataList">
      <el-table-column label="类别" prop="typeStr" align="center" :show-overflow-tooltip="true"/>
      <el-table-column label="采购服务费用" prop="totalMoney" align="center" :show-overflow-tooltip="true"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="detail(scope.row)"
          >采购服务费用详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <achieve-fee-model :currentRow="currentRow" :open.sync="open" />
  </div>
</template>
<script>
import { list } from '@/api/recruitRoleApi/achieveManagement';
import achieveFeeModel from '@/views/recruitRole/achieveManagement/components/achieveFeeModel.vue'

export default {
  name: 'index',
  components: {
    achieveFeeModel,
  },
  data() {
    return {
      loading: true,
      dataList: [],
      currentRow: {},
      open: false,
    }
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      this.loading = true
      const res = await list({ curUserId: this.$store.state.user.adminId, })
      this.loading = false
      if (res.Tag.length) {
        let data = res.Tag[0].Table
        this.dataList = data
      } else {
        this.dataList = []
      }
    },
    detail(record) {
      this.currentRow = { ...record, money: record.totalMoney }
      this.open = true
    }
  }
}
</script>
