<template>
  <el-dialog title="订单详情" :visible.sync="open" width="700px" :modal="false" @closed="$emit('update:open', false)" @opened="initData">
    <div style="padding-bottom: 60px;">
      <tab-title-info :currentRow="currentRow" />
      <searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的采购编号'></searchCom>
      <el-table v-loading="loading" border :data="dataList">
        <el-table-column label="验收通过日期" prop="acceptTime" width="160" align="center"/>
        <el-table-column label="采购日期" prop="createTime" width="160" align="center"/>
        <el-table-column label="采购编号" prop="orderNo" align="center"/>
        <el-table-column label="采购服务费用" prop="money" width="160" align="center"/>
      </el-table>
      <pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
    </div>
  </el-dialog>
</template>
<script>
import { orderList, } from '@/api/supplyRoleApi/achieveManagement';
import searchCom from '@/views/components/common/searchCom.vue'
import pages from '@/views/components/common/pages'
import tabTitleInfo from '@/views/supplyRole/achieveManagement/components/tabTitleInfo.vue'

export default {
  name: 'index',
  components: {
    tabTitleInfo,
    searchCom,
    pages,
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
      searchVal: '',
      searchResult: 0,
    }
  },
  created() {
  },
  methods: {
    async getList() {
      this.loading = true
      const res = await orderList({
        curUserId: this.$store.state.user.adminId,
        year: this.currentRow.year,
        month: this.currentRow.month,
        orderNo: this.searchVal,
        supplyOrgStalogST2Guid: this.currentRow.supplyOrgStalogST3Guid,
        categoryGuid: this.currentRow.categoryGuid,
        cattyeGuid: this.currentRow.cattypeGuid,
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
      this.searchResult = this.dataList.length
    },
    search(data) {
      this.searchVal = data
      this.getList()
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
