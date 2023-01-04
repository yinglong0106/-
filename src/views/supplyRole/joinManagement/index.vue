<template>
  <div class="app-container">
		<div class="flex jsb flex-center">
			<!-- <searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的机构名称'></searchCom> -->
			<div>
				<el-button type="primary" @click="handleOpenRecord">供应机构关联记录</el-button>
			</div>
		</div>

    <el-table v-loading="loading" border :data="dataList">
      <el-table-column label="机构名称" prop="orgName" align="center" :show-overflow-tooltip="true"/>
      <el-table-column label="账号创建日期" prop="registerTime" align="center" width="160" :show-overflow-tooltip="true"/>
      <el-table-column label="关联日期" prop="relateTime" align="center" width="160" :show-overflow-tooltip="true"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="handleOpenAdd(scope.row)"
          >供应品类添加</el-button>
          <el-button
            size="mini"
            type="text"
            @click="handleOpenResult(scope.row)"
          >供应机构成果</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pages @changePage="changePage" :total="pageTotal" :page="page"></pages>

    <supply-record-model :open.sync="open" />
    <supply-type-model :currentRow="currentRow" :open.sync="openAdd" />
    <supply-result-model :currentRow="currentRow" :open.sync="openResult" />

  </div>
</template>

<script>
import { list } from '@/api/supplyRoleApi/joinManagement';
import searchCom from '@/views/components/common/searchCom.vue'
import pages from '@/views/components/common/pages'
import supplyRecordModel from '@/views/supplyRole/joinManagement/components/supplyRecordModel.vue'
import supplyTypeModel from '@/views/supplyRole/joinManagement/components/supplyTypeModel.vue'
import supplyResultModel from '@/views/supplyRole/joinManagement/components/supplyResultModel.vue'

export default {
  name: "index",
  components: {
    searchCom,
    pages,
    supplyRecordModel,
    supplyTypeModel,
    supplyResultModel,
  },
  data() {
    return {
      page: 1,
      pageTotal: 0,
      loading: true,
      dataList: [],
      searchVal: '',
      searchResult: 0,
      open: false,

      openAdd: false,

      openResult: false,

      currentRow: {}
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
    async getList() {
      this.loading = true;
      const res = await list({
        page: this.page,
        size: '20',
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
    handleOpenRecord() {
      this.open = true;
    },
    handleOpenAdd(record) {
      this.openAdd = true;
      this.currentRow = record;
    },
    handleOpenResult(record) {
      this.openResult = true;
      this.currentRow = record;
    },
    changePage(data) {
      this.page = data
      this.getList()
    }
  }
};
</script>
