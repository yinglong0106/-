<template>
	<div style="min-height: 83vh;position: relative;padding-bottom: 60px;">
		<searchCom @toSearch='searchData' :searchResult='searchResult' placeholderText='请输入你要找的品类名称'></searchCom>
		<el-table :data="tableData" border v-loading="loading">
			<el-table-column prop="categoryName" label="品类名称" align="center"></el-table-column>
			<el-table-column prop="cattypeName" label="品类类型" align="center"></el-table-column>
			<el-table-column prop="supplyOrgNum" label="供应机构数量" align="center">
				<template slot-scope="scope">
					<el-button type="text" @click="supplyOrgNumber(scope.row)">{{scope.row.supplyOrgNum}}</el-button>
				</template>
			</el-table-column>
			<el-table-column prop="waiterOrgNum" label="服务机构数量" align="center">
				<template slot-scope="scope">
					<el-button type="text" @click="serviceOrgNumber(scope.row)">{{scope.row.waiterOrgNum}}</el-button>
				</template>
			</el-table-column>
		</el-table>
		<pages :total="pageTotal" @changePage="changePage" :page="page"></pages>
		<supplyNumber v-if="isSupply" @close="closeSupplyOrgNumber" :row="openRow"></supplyNumber>
		<serviceOrgNumber v-if="isService" @close="closeServiceOrgNumber" :row="openRow"></serviceOrgNumber>
	</div>
</template>

<script>
	import pages from '@/views/components/common/pages.vue'
	import searchCom from '@/views/components/common/searchCom.vue'
	import supplyNumber from '@/views/operationRole/catDealManagement/catSupport/pans/supplyNumber'
	import serviceOrgNumber from '@/views/operationRole/catDealManagement/catSupport/pans/serviceOrgNumber'
	import {
		getAllOrgNumByCat
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
			supplyNumber,
			serviceOrgNumber
		},
		data() {
			return {
				page: 1,
				pageTotal: 0,
				searchResult: 0,
				tableData: [],
				searchVal: '',
				loading: true,
				isSupply: false,
				isService: false,
				openRow: {}
			};
		},
		methods: {
			changePage(page) {
				this.page = page
				this.getAllOrgNumByCat()
			},
			searchData(data) {
				this.searchVal = data
				this.page = 1
				this.getAllOrgNumByCat()
			},
			supplyOrgNumber(row) {
				this.openRow = row
				this.isSupply = true
			},
			closeSupplyOrgNumber() {
				this.isSupply = false
			},
			serviceOrgNumber(row) {
				this.openRow = row
				this.isService = true
			},
			closeServiceOrgNumber() {
				this.isService = false
			},
			async getAllOrgNumByCat() {
				this.loading = true
				await getAllOrgNumByCat({
					categoryName: this.searchVal || '',
					cattypeGuid: this.cattypeGuid,
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
			this.getAllOrgNumByCat()
		}
	}
</script>

<style scoped lang="scss">
</style>
