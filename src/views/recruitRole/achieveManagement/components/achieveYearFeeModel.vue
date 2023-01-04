<template>
  <el-dialog title="采购服务费用年度详情" :visible.sync="open" :modal="false" width="700px" @closed="$emit('update:open', false)" @opened="initData">
    <tab-title-info :currentRow="currentRow" />
    <el-table v-loading="loading" border :data="dataList">
      <el-table-column label="计酬月份" prop="month" align="center" :show-overflow-tooltip="true"/>
      <el-table-column label="采购服务费用" prop="money" align="center" :show-overflow-tooltip="true"/>
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

    <achieve-month-fee-model :currentRow="monthCurrentRow" :open.sync="openMonth" />
  </el-dialog>
</template>
<script>
import { supplyYearList, purchaseYearList } from '@/api/recruitRoleApi/achieveManagement';
import tabTitleInfo from '@/views/recruitRole/achieveManagement/components/tabTitleInfo.vue'
import achieveMonthFeeModel from '@/views/recruitRole/achieveManagement/components/achieveMonthFeeModel.vue'

export default {
  name: 'index',
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
  components: {
    tabTitleInfo,
    achieveMonthFeeModel,
  },
  data() {
    return {
      loading: true,
      dataList: [],
      openMonth: false,
      monthCurrentRow: {},
    }
  },
  created() {
  },
  methods: {
    async getList() {
      this.loading = true
      if (this.currentRow.typeStr === '供应对接成果') {
        const res = await supplyYearList({ curUserId: this.$store.state.user.adminId, year: this.currentRow.year })
        this.loading = false
        if (res.Tag.length) {
          let data = res.Tag[0].Table
          this.dataList = data
        } else {
          this.dataList = []
        }
      } else {
        const res = await purchaseYearList({ curUserId: this.$store.state.user.adminId, year: this.currentRow.year })
        this.loading = false
        if (res.Tag.length) {
          let data = res.Tag[0].Table
          this.dataList = data
        } else {
          this.dataList = []
        }
      }
    },
    detail(record) {
      this.monthCurrentRow = { ...this.currentRow, ...record }
      this.openMonth = true
    },
    initData() {
      this.getList()
    }
  }
}
</script>
