<template>
	<div style="min-height: 83vh;position: relative;padding-bottom: 60px;">
		<searchCom @toSearch='searchData' :searchResult='searchResult' placeholderText='请输入你要找的品类名称'></searchCom>
		<el-table :data="tableData" border v-loading="loading">
			<el-table-column prop="categoryName" label="品类名称" align="center"></el-table-column>
			<el-table-column prop="cattypeName" label="品类类型" align="center" width="140"></el-table-column>
			<el-table-column prop="supplierCount" label="供方数量" align="center" width="140"></el-table-column>
			<el-table-column prop="deReqCount" label="查询用人单位数量" align="center" width="140"></el-table-column>
			<el-table-column prop="demandFriendCount" label="【我是应聘者】数量" align="center" width="140"></el-table-column>
			<el-table-column prop="supplyFriendCount" label="【我是招聘者】数量" align="center" width="140"></el-table-column>
		</el-table>
		<pages :total="pageTotal" @changePage="changePage" :page="page"></pages>
	</div>
</template>

<script>
	import pages from '@/views/components/common/pages.vue'
	import searchCom from '@/views/components/common/searchCom.vue'
	import {
		getChatCountList
	} from '@/api/operationRoleApi/catDealManagement.js'
	export default {
		name: "index",
		props: {
			cattypeGuid: {
				type: String,
				default: ''
			}
		},
		components: {
			pages,
			searchCom,
		},
		data() {
			return {
				page: 1,
				pageTotal: 0,
				searchResult: 0,
				tableData: [],
				searchVal: '',
				loading: true,
				openRow: {}
			};
		},
		methods: {
			changePage(page) {
				this.page = page
				this.getChatCountList()
			},
			searchData(data) {
				this.searchVal = data
				this.page = 1
				this.getChatCountList()
			},
			async getChatCountList() {
				this.loading = true
				await getChatCountList({
					categoryName: this.searchVal || '',
					page: this.page,
					size: '20',
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					this.loading = false
					let data = []
					if (res.Tag.length) {
						data = res.Tag[0].Table
					} else {
						data = []
					}
					this.tableData = data
					this.searchResult = this.tableData.length
					this.pageTotal = this.tableData.length > 0 ? (this.page - 1) * 20 + 21 : (this.page - 1) *
						20 + 1
				})
			}
		},
		created() {
			this.getChatCountList()
		}
	}
</script>

<style scoped lang="scss">
</style>
