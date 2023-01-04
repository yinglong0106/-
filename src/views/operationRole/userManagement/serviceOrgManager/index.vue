<template>
	<div class="app-container">
		<div class="flex jsb flex-center">
			<searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的机构名称'></searchCom>
		</div>
		<el-table :data="tableList" border v-loading="loading">
			<el-table-column prop="seorgName" label="机构名称" align="center"></el-table-column>
			<el-table-column prop="createTime" label="账号创建日期" align="center"></el-table-column>
			<el-table-column label="操作" align="center">
				<template slot-scope="scope">
					<el-row>
						<el-button type="text" @click="toOrgCategory(scope.row)">机构品类权限</el-button>
					</el-row>
					<el-row>
						<el-button type="text" @click="toServiceOrgTeam(scope.row)">服务机构团队</el-button>
					</el-row>
					<el-row>
						<el-button type="text" @click="toSuccess(scope.row)">服务机构成果</el-button>
					</el-row>
				</template>
			</el-table-column>
		</el-table>
		<pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
		<serviceOrg v-if="isTeam" @close="closeServiceOrgTeam" :row="openRow"></serviceOrg>
		<orgCategoryJurisdiction v-if="isJurisdiction" @close="closeOrgCategory" :row='openRow'></orgCategoryJurisdiction>
		<serviceOrgSuccess v-if="isSuccess" @close="closeSuccess" :row="openRow"></serviceOrgSuccess>
	</div>
</template>

<script>
	import searchCom from '@/views/components/common/searchCom.vue'
	import pages from '@/views/components/common/pages'
	import serviceOrg from '@/views/operationRole/userManagement/serviceOrgManager/components/serviceOrg'
	import orgCategoryJurisdiction from '@/views/operationRole/userManagement/serviceOrgManager/components/orgCategoryJurisdiction'
	import serviceOrgSuccess from '@/views/operationRole/userManagement/serviceOrgManager/components/serviceOrgSuccess'
	import {
		getList,
	} from "@/api/operationRoleApi/serviceOrgManager.js"
	export default {
		name: "index",
		components: {
			searchCom,
			pages,
			serviceOrg,
			orgCategoryJurisdiction,
			serviceOrgSuccess
		},
		data() {
			return {
				loading: false,
				tableList: [],
				page: 1,
				pageTotal: 0,
				searchResult: 0,
				searchVal: '',
				openRow: {},
				isJurisdiction: false,
				isTeam: false,
				isSuccess: false,
			};
		},
		methods: {
			search(data) {
				this.searchVal = data
				this.page = 1
				this.getList()
				//
			},
			changePage(page) {
				this.page = page
				this.getList()
				//
			},
			toOrgCategory(row) {
				this.openRow = row
				this.isJurisdiction = true
			},
			closeOrgCategory() {
				this.isJurisdiction = false
			},
			toServiceOrgTeam(row) {
				this.isTeam = true
				this.openRow = row
			},
			closeServiceOrgTeam() {
				this.isTeam = false
			},
			toSuccess(row) {
				this.isSuccess = true
				this.openRow = row
			},
			closeSuccess() {
				this.isSuccess = false
			},
			getList() {
				this.getList()
			},
			async getList() {
				this.loading = true
				await getList({
					seorgName: this.searchVal,
					size: '20',
					page: this.page,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					this.loading = false
					if (res.OK == 'True') {
			
						console.log(res);
						if (res.Tag.length > 0) {
							let data = res.Tag[0].Table
							this.tableList = data
						} else {
							this.tableList = []
						}
						this.searchResult = this.tableList.length
						this.pageTotal = this.tableList.length > 0 ? (this.page - 1) * 20 + 21 : (this.page -
							1) * 20 + 1
					}
				})
			},
		},
		created() {
			this.getList()
		}
	}
</script>

<style scoped lang="scss">
</style>
