<template>
  <div style="padding-bottom: 60px;">
    <searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的机构名称'></searchCom>
    <el-table v-loading="loading" border :data="dataList">
      <el-table-column label="账号名称" prop="userName" align="center" :show-overflow-tooltip="true"/>
      <el-table-column label="国家/区域" prop="nation" align="center" :show-overflow-tooltip="true"/>
      <el-table-column label="联系电话" prop="phonenumber" align="center" :show-overflow-tooltip="true"/>
      <el-table-column label="账号注册日期" prop="registerTime" align="center" :show-overflow-tooltip="true"/>
      <el-table-column label="关联机构日期" prop="relateTime" align="center" :show-overflow-tooltip="true"/>
    </el-table>
    <pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
  </div>
</template>
<script>
import { supplyGroupList } from '@/api/recruitRoleApi/recruitManagement';
import searchCom from '@/views/components/common/searchCom.vue'
import pages from '@/views/components/common/pages'

export default {
  name: 'index',
  components: {
    searchCom,
    pages,
  },
  props: {
    currentRow: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      page: 1,
      pageTotal: 0,
      loading: false,
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
      const res = await supplyGroupList({ size: '20', page: this.page, phonenumber: this.searchVal, seorgGuid: this.currentRow.seorgGuid, curUserId: this.$store.state.user.adminId, })
      this.loading = false;
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
      this.$emit('supply-count', data)
    },
    changePage(data) {
      this.page = data;
      this.getList()
    }
  }
}
</script>
