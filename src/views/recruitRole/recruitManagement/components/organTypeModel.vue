<template>
  <el-dialog title="机构品类权限" :visible.sync="open" width="700px" @closed="$emit('update:open', false)" @opened="initData">
    <div style="padding-bottom: 60px;">
      <recruit-info :currentRow="currentRow" />
      <el-divider></el-divider>
      <div class="title-bg mb10">系统将品类类型下的品类授权给服务机构后，服务机构的服务专员才能领取各个品类类型下的服务对象，才能开展工作。若服务机构无任一品类类型下的品类授权，则服务专员对应品类类型下的权限服务对象将被回收。</div>
      <el-divider></el-divider>
      <searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的品类名称'></searchCom>
      <el-table v-loading="loading" border :data="dataList">
        <el-table-column label="品类名称" prop="categoryName" align="center" :show-overflow-tooltip="true"/>
        <el-table-column label="品类类型" prop="cattypeName" align="center" :show-overflow-tooltip="true"/>
        <el-table-column label="授权日期" prop="grantTime" align="center" :show-overflow-tooltip="true"/>
      </el-table>
      <pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
    </div>
  </el-dialog>
</template>
<script>
import { typeList } from '@/api/recruitRoleApi/recruitManagement';
import searchCom from '@/views/components/common/searchCom.vue'
import pages from '@/views/components/common/pages'
import recruitInfo from '@/views/recruitRole/recruitManagement/components/recruitInfo.vue'

export default {
  name: 'index',
  components: {
    searchCom,
    pages,
    recruitInfo
  },
  props: {
    currentRow: {
      type: Object,
      default: () => {}
    },
    open: {
      type: Boolean,
      default: () => false,
    }
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
      this.loading = true;
      const res = await typeList({
        seorgGuid: this.currentRow.seorgGuid,
        categoryName: this.searchVal,
        size: '20',
        page: this.page,
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
      this.page = 1
      this.getList()
    },
    initData() {
      this.getList()
    },
    changePage(data) {
      this.page = data;
      this.getList()
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
