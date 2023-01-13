<template>
  <div class="app-container" style="padding: 15px;">
      <div class="flex jsb flex-center">
        <searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的联系电话'></searchCom>
      </div>

      <el-table v-loading="loading" border :data="tableData" style>
        <el-table-column label="账号名称" prop="userName" align="center"  />
        <el-table-column label="姓名" prop="nickName" align="center" />
        <el-table-column label="联系电话" prop="phonenumber" align="center" />
        <el-table-column label="账号开通日期" prop="createTime" align="center" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="setLabel(scope.row)">沟通专员能力标签设置</el-button>
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
  import { getCommiteList } from '@/api/communicationApi/preparation';
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
			};
		},
		created() {
      console.log(this.$route.name)
			this.getList()
		},
		methods: {
			search(data='') {
				this.searchVal = data
				this.page = 1
				this.getList()
			},
      changePage(page) {
				this.page = page
				this.getList()
			},
      setLabel(row){
        console.log(this.$route.name)
        this.$router.push({
          name:this.$route.name == 'ServiceCommunicateManage'?'ServiceTagManage':'LabelManage',
          query:{
            userId:row.userId
          }
        })
      },
			async getList() {
        this.loading = true
        const res = await getCommiteList({
          name: this.searchVal,
					size: '20',
					page: this.page,
					curUserId: this.$store.state.user.adminId,
          phonenumber:this.searchVal,
          roleKey:this.$route.name == 'CommunicationMsgManage'?'commuRole':'serveRole'
        })
        this.loading = false
        console.log(res)
        if (res.Tag.length) {
          let data = res.Tag[0].Table
          this.tableData = data
          this.pageTotal = (this.page - 1) * 20 + 21
        } else {
          this.tableData = []
          this.pageTotal = (this.page - 1) * 20 + 1
        }
        this.searchResult = this.tableData.length
			},

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

