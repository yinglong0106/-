<template>
  <div class="app-container" style="padding: 15px;">
      <div class="flex flex-center">
        <p class="c-red">服务名称标签渠道：</p>
        <p>沟通专员处-接受服务某服务名称；服务专员处--意向服务某服务名称预约以及后续的客服专员接受的服务对象预约--意向服务某服务名称</p>
      </div>
      <div style="width:1000px">
        <el-table v-loading="loading" border :data="tableData" >
          <el-table-column label="序号" type="index" align="center"  width="130" />
          <el-table-column label="服务名称" prop="labelName" align="center"  />
          <el-table-column label="数量（人次）" prop="number"  width="250" align="center"  />
        </el-table>
        <pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
      </div>


  </div>
</template>
<script>
	import pages from '@/views/components/common/pages'
  import { getToken } from "@/utils/auth";
	export default {
		name: "index",
		components: {
			pages,
		},
		data() {
			return {
				loading: false,
				page: 1,
				pageTotal: 0,
				searchResult: 0,
				tableData: [],
        showAddTag:false,
        content:""
			};
		},
		created() {
			this.getList()
		},
		methods: {
			changePage(page) {
				this.page = page
				//
			},

			getList() {
				this.tableData = [{
          labelName:'企业补贴服务',
          number:0
        },
        {
          labelName:'个人补贴服务',
          number:0
        },
        {
          labelName:'企业债权服务',
          number:0
        }]
			},
		}
	};
</script>

<style lang="scss" scoped>
  .c-red{
    color:red
  }
</style>


