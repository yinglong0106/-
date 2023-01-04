<template>
  <el-dialog title="机构详情" :visible.sync="open" width="700px" :modal="false" @closed="$emit('update:open', false)" @opened="initData">
    <div style="padding-bottom: 60px;">
      <tab-title-info :currentRow="currentRow" />
      <el-table v-loading="loading" border :data="dataList">
        <el-table-column label="品类名称" prop="categoryName" align="center"/>
        <el-table-column label="品类类型" prop="cattypeName" width="160" align="center"/>
        <el-table-column label="采购服务费用" prop="money" width="160" align="center"/>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="detail(scope.row)"
            >订单详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pages @changePage="changePage" :total="pageTotal" :page="page"></pages>

      <order-detail-model :currentRow="organCurrentRow" :open.sync="openOrgan" />
    </div>
  </el-dialog>
</template>
<script>
import { organList, } from '@/api/supplyRoleApi/achieveManagement';
import pages from '@/views/components/common/pages'
import tabTitleInfo from '@/views/supplyRole/achieveManagement/components/tabTitleInfo.vue'
import orderDetailModel from '@/views/supplyRole/achieveManagement/components/orderDetailModel.vue'

export default {
  name: 'index',
  components: {
    pages,
    tabTitleInfo,
    orderDetailModel,
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
      page: 1,
      pageTotal: 0,
      loading: true,
      dataList: [],
      organCurrentRow: {},
      openOrgan: false,
    }
  },
  created() {
  },
  methods: {
    async getList() {
      this.loading = true
      const res = await organList({
        curUserId: this.$store.state.user.adminId,
        year: this.currentRow.year,
        month: this.currentRow.month,
        size: '20',
        page: this.page
      })
      this.loading = false
      if (res.Tag.length) {
        let data = res.Tag[0].Table
        this.dataList = data
        this.pageTotal = (this.page - 1) * 20 + 21
      } else {
        this.dataList = []
        this.pageTotal = (this.page - 1) * 20 + 1
      }
    },
    detail(record) {
      this.organCurrentRow = { ...this.currentRow, ...record }
      this.openOrgan = true
    },
    initData() {
      this.getList()
    },
    changePage(data) {
      this.page = data
      this.getList()
    }
  }
}
</script>
