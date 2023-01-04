<template>
  <div class="app-container">
		<div class="flex jsb flex-center">
			<searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的机构名称'></searchCom>
			<div>
				<el-button type="primary" @click="handleOpenRecord">服务机构关联记录</el-button>
			</div>
		</div>

    <el-table v-loading="loading" border :data="dataList">
      <el-table-column label="机构名称" prop="seorgName" align="center" :show-overflow-tooltip="true"/>
      <el-table-column label="账号创建日期" prop="registerTime" align="center" width="160" :show-overflow-tooltip="true"/>
      <el-table-column label="关联日期" prop="relateTime" align="center" width="160" :show-overflow-tooltip="true"/>
      <el-table-column label="采购对接采购订单验收通过数量" prop="demandOrderNum" align="center" :show-overflow-tooltip="true"/>
      <el-table-column label="供应对接采购订单验收通过数量" prop="supplyOrderNum" align="center" :show-overflow-tooltip="true"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="handleOpenType(scope.row)"
          >机构品类权限</el-button>
          <el-button
            size="mini"
            type="text"
            @click="handleOpenGroup(scope.row)"
          >服务机构团队</el-button>
          <el-button
            size="mini"
            type="text"
            @click="handleOpenResult(scope.row)"
          >服务权限成果</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pages @changePage="changePage" :total="pageTotal" :page="page"></pages>

    <server-record-model :open.sync="openRecord" />

    <organ-type-model :currentRow="currentRow" :open.sync="openType" />

    <server-group-model :currentRow="currentRow" :open.sync="openGroup" />

    <server-result-model :currentRow="currentRow" :open.sync="openResult" />

  </div>
</template>

<script>
import { list } from '@/api/recruitRoleApi/recruitManagement';
import searchCom from '@/views/components/common/searchCom.vue'
import pages from '@/views/components/common/pages'
import serverRecordModel from '@/views/recruitRole/recruitManagement/components/serverRecordModel.vue'
import organTypeModel from '@/views/recruitRole/recruitManagement/components/organTypeModel.vue'
import serverGroupModel from '@/views/recruitRole/recruitManagement/components/serverGroupModel.vue'
import serverResultModel from '@/views/recruitRole/recruitManagement/components/serverResultModel.vue'

export default {
  name: "index",
  components: {
    searchCom,
    pages,
    serverRecordModel,
    organTypeModel,
    serverGroupModel,
    serverResultModel,
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      page: 1,
      pageTotal: 0,
      // 角色表格数据
      dataList: [],

      currentRow: {},
      searchVal: '',
      searchResult: 0,

      openRecord: false,

      openType: false,

      openGroup: false,

      openResult: false,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    search(data) {
      this.searchVal = data
      this.page = 1
      this.getList()
    },
    changePage(page) {
      this.page = page
      this.getList()
    },
    async getList() {
      this.loading = true;
      const res = await list({
        page: this.page,
        size: '20',
        seorgName: this.searchVal,
        curUserId: this.$store.state.user.adminId,
      })
      this.loading = false
      if (res.Tag.length) {
        let data = res.Tag[0].Table
        this.dataList = data
        this.pageTotal = (this.page - 1) * 20 + 21
      } else {
        this.tableList = []
        this.pageTotal = (this.page - 1) * 20 + 1
      }
      this.searchResult = this.dataList.length
    },
    handleOpenRecord() {
      this.openRecord = true;
    },
    handleOpenType(record) {
      this.openType = true;
      this.currentRow = record;
    },
    handleOpenGroup(record) {
      this.openGroup = true;
      this.currentRow = record;
    },
    handleOpenResult(record) {
      this.openResult = true;
      this.currentRow = record;
    },
  }
};
</script>

<style lang="scss" scoped>
	.title-bg {
		background-color: #F2F2F2;
		padding: 10px;
		font-weight: bold;
	}
</style>
