<template>
  <el-dialog title="供应机构关联记录" :visible.sync="open" width="700px" @closed="$emit('update:open', false)" @opened="initData">
    <div style="padding-bottom: 60px;">
      <searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的机构名称'></searchCom>
      <el-table v-loading="loading" border :data="dataList">
        <el-table-column label="日期" prop="relateTime" align="center" width="160" :show-overflow-tooltip="true"/>
        <el-table-column label="供应机构" prop="orgName" align="center" :show-overflow-tooltip="true"/>
        <el-table-column label="账号创建日期" prop="registerTime" align="center" width="160" :show-overflow-tooltip="true"/>
        <el-table-column label="状态" prop="statusStr" align="center" width="120" :show-overflow-tooltip="true"/>
      </el-table>
      <pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
    </div>
  </el-dialog>
</template>
<script>
import { recordList, } from '@/api/supplyRoleApi/joinManagement';
import searchCom from '@/views/components/common/searchCom.vue'
import pages from '@/views/components/common/pages'

export default {
  name: 'index',
  props: {
    open: {
      type: Boolean,
      default: () => {}
    }
  },
  components: {
    searchCom,
    pages,
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
      const res = await recordList({
        page: this.page,
        size: '20',
        orgName: this.searchVal,
        curUserId: this.$store.state.user.adminId,
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
