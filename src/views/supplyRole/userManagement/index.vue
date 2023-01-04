<template>
  <div class="app-container">

    <el-table v-loading="loading" border :data="dataList">
      <el-table-column label="账号名称" prop="userName" align="center" :show-overflow-tooltip="true"/>
      <el-table-column label="姓名" prop="nickName" align="center" :show-overflow-tooltip="true"/>
      <el-table-column label="国家/地区" prop="nation" align="center" width="160" :show-overflow-tooltip="true"/>
      <el-table-column label="手机号码" prop="phonenumber" align="center" width="120" :show-overflow-tooltip="true"/>
      <!-- <el-table-column label="角色名称" prop="roleName" align="center" width="160" :show-overflow-tooltip="true"/> -->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="editInfo(scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="text"
            @click="viewInfo(scope.row)"
          >查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- <pages @changePage="changePage" :total="pageTotal" :page="page"></pages> -->

    <view-or-update-model :currentRow="currentRow" :isEdit="isEdit" :open.sync="open" />

  </div>
</template>

<script>
import { getRoleUserList } from "@/api/operationRoleApi/userManagement"
import pages from '@/views/components/common/pages'
import viewOrUpdateModel from '@/views/supplyRole/userManagement/components/viewOrUpdateModel'
import { getUser } from '@/utils/auth'

export default {
  name: "index",
  components: {
    pages,
    viewOrUpdateModel,
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      page: 1,
      pageTotal: 0,
      // 角色表格数据
      dataList: [],
      isEdit: false,
      currentRow: {},
      open: false,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      // this.loading = true
      // await getRoleUserList({
      //   page: this.page,
      //   size: '20',
      //   roleKey: 'gyRole',
      //   phonenumber: '',
      //   curUserId: this.$store.state.user.adminId,
      // }).then((res) => {
      //   this.loading = false
      //   if (res.Tag.length) {
      //     let data = res.Tag[0].Table
      //     this.dataList = data
      //     this.pageTotal = (this.page - 1) * 20 + 21
      //   } else {
      //     this.dataList = []
      //     this.pageTotal = (this.page - 1) * 20 + 1
      //   }
      // })
      this.loading = true
      const user = getUser()
      if (user.roleNames.indexOf('gyRole') > -1) {
        this.dataList = [user]
      } else {
        this.dataList = []
      }
      this.loading = false
    },
    viewInfo(record) {
      this.currentRow = record;
      this.isEdit = false;
      this.open = true;
    },
    editInfo(record) {
      this.currentRow = record;
      this.isEdit = true;
      this.open = true;
    },
    changePage(page) {
      this.page = page
      this.getList()
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
