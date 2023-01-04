<template>
	<div class="app-container">
		<div class="flex jsb flex-center">
			<searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的机构名称'></searchCom>
		</div>
		<el-table :data="tableList" border v-loading="loading">
			<el-table-column prop="orgName" label="机构名称" align="center"></el-table-column>
			<el-table-column prop="createTime" label="账号创建日期" align="center"></el-table-column>
			<el-table-column label="操作" align="center">
				<template slot-scope="scope">
					<el-row>
						<el-button type="text" @click="openSupplyCategory(scope.row)">供应品类添加</el-button>
					</el-row>
					<el-row>
						<el-button type="text" @click="openSuccess(scope.row)">供应机构成果</el-button>
					</el-row>
				</template>
			</el-table-column>
		</el-table>
		<pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
		<supplyCategory v-if="isCategory" @close="closeSupplyCategory" :row="openRow"></supplyCategory>
		<supplyOrgSuccess v-if="isSuccess" @close="closeSuccess" :row="openRow"></supplyOrgSuccess>
	</div>
</template>

<script>
	import searchCom from '@/views/components/common/searchCom.vue'
	import pages from '@/views/components/common/pages'
	import supplyCategory from '@/views/operationRole/userManagement/supplyOrgManager/components/supplyCategory'
	import supplyOrgSuccess from '@/views/operationRole/userManagement/supplyOrgManager/components/supplyOrgSuccess'
	import {
		getList
	} from "@/api/operationRoleApi/supplyOrgManager.js"
	export default {
		name: "index",
		components: {
			searchCom,
			pages,
			supplyCategory,
			supplyOrgSuccess
		},
		data() {
			return {
				loading: false,
				tableList: [],
				page: 1,
				pageTotal: 0,
				searchResult: 0,
				searchVal: '',
				pageStatus: '1',
				openRow: {},
				isCategory: false,
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
			openSupplyCategory(row) {
				this.openRow = row
				this.isCategory = true
			},
			closeSupplyCategory() {
				this.isCategory = false
			},
			openSuccess(row) {
				this.openRow = row
				this.isSuccess = true
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
					page: this.page,
					size: '20',
					orgName: this.searchVal,
					curUserId: this.$store.state.user.adminId,
				}).then((res) => {
					this.loading = false
					if (res.Tag.length) {
						let data = res.Tag[0].Table
						this.tableList = data
						this.pageTotal = (this.page - 1) * 20 + 21
					} else {
						this.tableList = []
						this.pageTotal = (this.page - 1) * 20 + 1
					}
					this.searchResult = this.tableList.length
				})
			}
		},
		created() {
			this.getList()
		}
	}
</script>

<style scoped lang="scss">
</style>
