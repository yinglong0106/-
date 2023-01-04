<template>
  <el-dialog title="采购服务费用月度详情" :visible.sync="open" :modal="false" width="700px" @closed="$emit('update:open', false)" @opened="initData">
    <div style="padding-bottom: 60px;">
      <tab-title-info :currentRow="currentRow" />
      <searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的机构名称'></searchCom>
      <el-table v-loading="loading" border :data="dataList">
        <el-table-column label="服务机构" prop="seorgName" align="center" :show-overflow-tooltip="true"/>
        <el-table-column label="账号创建日期" prop="registerTime" align="center" :show-overflow-tooltip="true"/>
        <el-table-column label="关联日期" prop="relateTime" align="center" :show-overflow-tooltip="true"/>
        <el-table-column label="采购服务费用" prop="money" align="center" :show-overflow-tooltip="true"/>
      </el-table>
      <pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
    </div>
  </el-dialog>
</template>
<script>
import { supplyMonthList, purchaseMonthList } from '@/api/recruitRoleApi/achieveManagement';
import tabTitleInfo from '@/views/recruitRole/achieveManagement/components/tabTitleInfo.vue'
import searchCom from '@/views/components/common/searchCom.vue'
import pages from '@/views/components/common/pages'

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
    searchCom,
    pages,
  },
  data() {
    return {
      page: 1,
      pageTotal: 0,
      loading: true,
      dataList: [],
      searchResult: 0,
      searchVal: '',
    }
  },
  created() {
  },
  methods: {
    async getList() {
      this.loading = true
      if (this.currentRow.type === '供应对接成果') {
        const res = await supplyMonthList({
          curUserId: this.$store.state.user.adminId,
          year: this.currentRow.year,
          month: this.currentRow.month,
          seorgName: this.searchVal,
          size: '20',
          page: this.page,
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
      } else {
        const res = await purchaseMonthList({
          curUserId: this.$store.state.user.adminId,
          year: this.currentRow.year,
          month: this.currentRow.month,
          seorgName: this.searchVal,
          size: '20',
          page: this.page,
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
      }
    },
    search(data) {
      this.searchVal = data
      this.getList()
    },
    initData() {
      this.getList()
    }
  }
}
</script>
