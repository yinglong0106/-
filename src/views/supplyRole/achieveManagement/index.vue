<template>
  <div class="app-container">

    <el-table v-loading="loading" border :data="dataList">
      <el-table-column label="年度" prop="year" align="center"/>
      <el-table-column label="采购服务费用" prop="money" width="160" align="center"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="detail(scope.row)"
            >年度详情</el-button>
          </template>
        </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <year-detail-model :currentRow="currentRow" :open.sync="open" />

  </div>
</template>

<script>
import { list, } from '@/api/supplyRoleApi/achieveManagement';
import yearDetailModel from '@/views/supplyRole/achieveManagement/components/yearDetailModel.vue'

export default {
  name: "index",
  components: {
    yearDetailModel,
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 角色表格数据
      dataList: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
      },
      // 是否显示弹出层
      open: false,
      currentRow: {},
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询角色列表 */
    async getList() {
      this.loading = true;
      const res = await list({ curUserId: this.$store.state.user.adminId, })
      this.loading = false
      if (res.Tag.length) {
        let data = res.Tag[0].Table
        this.dataList = data
      } else {
        this.dataList = []
      }
    },
    detail(record) {
      this.currentRow = record
      this.open = true;
    },
  }
};
</script>
