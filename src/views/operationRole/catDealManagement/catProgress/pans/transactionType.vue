<template>
	<div style="min-height: 83vh;position: relative;padding-bottom: 60px;">
		<searchCom @toSearch='searchData' :searchResult='searchResult' placeholderText='请输入你要找的品类名称'></searchCom>
		<el-table :data="tableData" border v-loading="loading">
			<el-table-column prop="categoryName" label="品类名称" align="center"></el-table-column>
			<el-table-column prop="cattypeName" label="品类类型" align="center" width="140"></el-table-column>
			<el-table-column prop="deReqCount" label="发起的采购需求数量" align="center" width="140"></el-table-column>
			<el-table-column prop="suPriceCount" label="报价响应的采购需求" align="center"  width="140"></el-table-column>
			<el-table-column prop="orderCount" label="付款的采购需求" align="center" width="140"></el-table-column>
			<el-table-column prop="acceptOrderNum" label="采购订单验收通过数量" align="center" width="158"></el-table-column>
		</el-table>
		<pages :total="pageTotal" @changePage="changePage" :page="page"></pages>
	</div>
</template>

<script>
	
	import pages from '@/views/components/common/pages.vue'
	import searchCom from '@/views/components/common/searchCom.vue'
	import {
		getDealCountList
	} from '@/api/operationRoleApi/catDealManagement.js'
	export default {
		name: "index",
		components: {
			pages,
			searchCom
		},
		props: {
			cattypeGuid: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				page: 1,
				pageTotal: 0,
				searchResult: 0,
				tableData: [],
				searchVal: '',
				loading: false,
			};
		},
		methods: {
			changePage(page) {
				this.page = page
				this.getDealCountList()
			},
			searchData(data) {
				this.searchVal = data
				this.page = 1
				this.getDealCountList()
			},
			async getDealCountList() {
				this.loading = true
				this.tableData = []
				await getDealCountList({
					categoryName: this.searchVal || '',
					cattypeGuid: this.cattypeGuid,
					page: this.page,
					size: '20',
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					this.loading = false
					console.log(res);
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
			this.getDealCountList()
		}
	}
</script>

<style scoped lang="scss">
</style>
