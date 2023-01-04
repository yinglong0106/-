<template>
  <el-dialog title="供应品类添加" :visible.sync="open" width="700px" @closed="$emit('update:open', false)" @opened="initData">
    <div style="padding-bottom: 60px;">
      <tab-title-info :currentRow="currentRow" />
      <div class="title-bg mb10">供应品类添加({{count}})</div>
      <searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的品类名称'></searchCom>
      <el-table v-loading="loading" border :data="dataList">
        <el-table-column label="品类名称" prop="categoryName" align="center" :show-overflow-tooltip="true"/>
        <el-table-column label="品类类型" prop="cattypeName" align="center" :show-overflow-tooltip="true"/>
      </el-table>
      <pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
    </div>
  </el-dialog>
</template>
<script>
import { addList, getTypeCount } from '@/api/supplyRoleApi/joinManagement';
import searchCom from '@/views/components/common/searchCom.vue'
import pages from '@/views/components/common/pages'
import tabTitleInfo from '@/views/supplyRole/joinManagement/components/tabTitleInfo.vue'

export default {
  name: 'index',
  props: {
    open: {
      type: Boolean,
      default: () => {}
    },
    currentRow: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    searchCom,
    pages,
    tabTitleInfo,
  },
  data() {
    return {
      page: 1,
      pageTotal: 0,
      loading: true,
      dataList: [],
      searchVal: '',
      searchResult: 0,
      count: 0,
    }
  },
  created() {
  },
  methods: {
    async getList() {
      this.loading = true
      const res = await addList({
        page: this.page,
        size: '20',
        categoryName: this.searchVal,
        orgUserId: this.currentRow.orgUserId,
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
      this.handleCount()
    },
    initData() {
      this.getList()
      this.handleCount()
    },
    changePage(data) {
      this.page = data
      this.getList()
    },
    async handleCount() {
      const { Tag } = await getTypeCount({
        categoryName: this.searchVal,
        orgUserId: this.currentRow.orgUserId,
        curUserId: this.$store.state.user.adminId,
      })
      if (Tag && Tag.length > 0) {
        this.count = Tag[0].total
      }
    }
  }
}
</script>

<style lang="scss" scoped>
	.title-bg {
		background-color: #F2F2F2;
		padding: 10px;
		font-weight: bold;
	}
</style>
