<template>
  <el-dialog :title="currentRow.typeStr + '采购服务费用详情'" :visible.sync="open" width="700px" @closed="$emit('update:open', false)" @opened="initData">
    <tab-title-info :currentRow="currentRow" />
    <el-table v-loading="loading" border :data="dataList">
      <el-table-column label="年度" prop="year" align="center" :show-overflow-tooltip="true"/>
      <el-table-column label="采购服务费用" prop="money" align="center" :show-overflow-tooltip="true"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="detail(scope.row)"
          >年度详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <achieve-year-fee-model :currentRow="yearCurrentRow" :open.sync="openYear" />
  </el-dialog>
</template>
<script>
import { supplyList, purchaseList } from '@/api/recruitRoleApi/achieveManagement';
import tabTitleInfo from '@/views/recruitRole/achieveManagement/components/tabTitleInfo.vue'
import achieveYearFeeModel from '@/views/recruitRole/achieveManagement/components/achieveYearFeeModel.vue'

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
    achieveYearFeeModel,
  },
  data() {
    return {
      loading: true,
      dataList: [],
      openYear: false,
      yearCurrentRow: {},
    }
  },
  created() {
  },
  methods: {
    async getList() {
      this.loading = true
      if (this.currentRow.typeStr === '供应对接成果') {
        const res = await supplyList({ curUserId: this.$store.state.user.adminId, })
        this.loading = false
        if (res.Tag.length) {
          let data = res.Tag[0].Table
          this.dataList = data
        } else {
          this.dataList = []
        }
      } else {
        const res = await purchaseList({ curUserId: this.$store.state.user.adminId, })
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
      this.yearCurrentRow = { ...this.currentRow, ...record }
      this.openYear = true
    },
    initData() {
      this.getList()
    }
  }
}
</script>
