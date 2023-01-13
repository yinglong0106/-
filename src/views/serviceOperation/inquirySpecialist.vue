<template>
  <div class="app-container" style="padding: 15px;">
      <div class="flex jsb flex-center">
        <div class="flex flex-center">
          <searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的联系电话'></searchCom>
        </div>
      </div>

      <el-table v-loading="loading" border :data="tableData" style>
        <el-table-column label="账号名称" prop="account" align="center"  />
        <el-table-column label="姓名" prop="name" align="center"  />
        <el-table-column label="联系电话" prop="phone" align="center"  />
        <el-table-column label="账号开通日期" prop="date" align="center"  />
        <el-table-column label="操作" width="180" align="center" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="checkDetail(scope.index)">查看品类询价权限</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
  </div>
</template>
<script>
	import searchCom from '@/views/components/common/searchCom.vue'
	import pages from '@/views/components/common/pages'
  import { getToken } from "@/utils/auth";
	export default {
		name: "index",
		components: {
			searchCom,
			pages,
		},
		data() {
			return {
				loading: false,
				page: 1,
				pageTotal: 0,
				searchResult: 0,
				searchVal: '',
				tableData: [],
        showAddTag:false,
        content:""
			};
		},
		created() {
			this.getList()
		},
		methods: {
			search(data) {
				this.searchVal = data
				this.page = 1
				//
			},
			changePage(page) {
				this.page = page
				//
			},
			getList() {
				this.tableData = [{
          account:'测试测试',
          name:'张三',
          phone:'1886900000',
          date:'2022-12-12  12：12'
        }]
			},
      checkDetail(row){
        this.$router.push({
          name:'CategoryPermission'
        })
      }
		}
	};
</script>

<style lang="scss" scoped>
.input-box {
		width: 70%;
		margin: 20px 0px;

		.input-text {
			width: 100px;
			flex-shrink: 0;
		}
	}
</style>


