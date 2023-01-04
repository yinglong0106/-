<template>
  <el-dialog title="年度详情" :visible.sync="open" width="700px" @closed="$emit('update:open', false)" @opened="initData">
    <tab-title-info :currentRow="currentRow" />
    <el-table v-loading="loading" border :data="dataList">
      <el-table-column label="计酬月份" prop="month" width="160" align="center"/>
      <el-table-column label="采购服务费用" prop="money" align="center"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="detail(scope.row)"
          >月度详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <month-detail-model :currentRow="yearCurrentRow" :open.sync="openYear" />
  </el-dialog>
</template>
<script>
import { yearList, } from '@/api/supplyRoleApi/achieveManagement';
import tabTitleInfo from '@/views/supplyRole/achieveManagement/components/tabTitleInfo.vue'
import monthDetailModel from '@/views/supplyRole/achieveManagement/components/monthDetailModel.vue'

export default {
  name: 'index',
  components: {
    tabTitleInfo,
    monthDetailModel,
  },
  props: {
    currentRow: {
      type: Object,
      default: () => {}
    },
    open: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      loading: true,
      dataList: [],
      yearCurrentRow: {},
      openYear: false,
    }
  },
  created() {
  },
  methods: {
    async getList() {
      this.loading = true
      const res = await yearList({ curUserId: this.$store.state.user.adminId, year: this.currentRow.year })
      this.loading = false
      if (res.Tag.length) {
        let data = res.Tag[0].Table
        this.dataList = data
      } else {
        this.dataList = []
      }
    },
    detail(record) {
      this.yearCurrentRow = { ...this.currentRow, ...record }
      this.openYear = true
    },
    initData() {
      this.getList()
    },
  }
}
</script>
