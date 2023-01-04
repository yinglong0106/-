<template>
  <el-dialog title="月度详情" :visible.sync="open" width="700px" :modal="false" @closed="$emit('update:open', false)" @opened="initData">
    <div style="padding-bottom: 60px;">
      <tab-title-info :currentRow="currentRow" />
      <searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的机构名称'></searchCom>
      <el-table v-loading="loading" border="" :data="dataList">
        <el-table-column label="机构名称" prop="orgName" align="center"/>
        <el-table-column label="账号创建日期" prop="registerTime" width="160" align="center"/>
        <el-table-column label="关联日期" prop="relateTime" width="160" align="center"/>
        <el-table-column label="采购服务费用" prop="money" width="160" align="center"/>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="detail(scope.row)"
            >机构详情</el-button>
          </template>
        </el-table-column>
      </el-table>

      <pages @changePage="changePage" :total="pageTotal" :page="page"></pages>

      <organ-detail-model :currentRow="monthCurrentRow" :open.sync="openMonth" />
    </div>
  </el-dialog>
</template>
<script>
import { monthList, } from '@/api/supplyRoleApi/achieveManagement';
import searchCom from '@/views/components/common/searchCom.vue'
import pages from '@/views/components/common/pages'
import tabTitleInfo from '@/views/supplyRole/achieveManagement/components/tabTitleInfo.vue'
import organDetailModel from '@/views/supplyRole/achieveManagement/components/organDetailModel.vue'

export default {
  name: 'index',
  components: {
    searchCom,
    pages,
    tabTitleInfo,
    organDetailModel,
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
      monthCurrentRow: {},
      openMonth: false,
    }
  },
  created() {
  },
  methods: {
    async getList() {
      this.loading = true
      const res = await monthList({
        curUserId: this.$store.state.user.adminId,
        year: this.currentRow.year,
        month: this.currentRow.month,
        orgName: this.searchVal,
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
    detail(record) {
      this.monthCurrentRow = { ...this.currentRow, ...record }
      this.openMonth = true
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
