<template>
  <div class="app-container" >
      <el-table v-loading="loading" border :data="tableData" style>
        <el-table-column label="账号名称" prop="account" align="center"  />
        <el-table-column label="姓名" prop="name" align="center"  />
        <el-table-column label="联系电话" prop="phone" align="center"  />
        <el-table-column label="账号开通日期" prop="date" align="center"  />
      </el-table>
      <el-divider></el-divider>
      <div class="mb20">
        <div class="title-bg mb10" >
          <div>资金资源需求(40)</div>
        </div>
      </div>
      <div class="flex jsb flex-center">
        <div class="flex flex-center">
          <searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的品类名称'></searchCom>
        </div>
      </div>
      <div style="width:50%;">
        <el-table v-loading="loading" border :data="categoryTableData" style>
          <el-table-column label="品类名称" prop="name" align="center"  />
          <el-table-column label="品类类型" prop="type" align="center"  />
        </el-table>
      </div>

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
        searchVal:'',
				page: 1,
				pageTotal: 0,
				searchResult: 0,
				tableData: [],
        showAddTag:false,
        content:"",
        categoryTableData:[{
          name:'个人用自己的不动资产商品房抵押借款',
          type:'资金资源需求'
        }]
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
  .title-bg {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 300px;
		background-color: #f2f2f2;
		padding: 10px;
	}
</style>


