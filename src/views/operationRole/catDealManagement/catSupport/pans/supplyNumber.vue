<template>
	<el-dialog title="供应机构数量" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
		<div style="padding-bottom: 60px;" v-loading="loading">
			<el-row class="mt20 flex flex-center">
				<div style="flex-shrink: 0;margin-right: 20px;">品类类型</div>
				<div>{{row.cattypeName}}</div>
			</el-row>
			<el-row class="mt20 pb20 flex flex-center">
				<div style="flex-shrink: 0;margin-right: 20px;">品类名称</div>
				<div>{{row.categoryName}}</div>
			</el-row>
			<el-row class="mb20">
				<div style="background: #F2F2F2;padding: 10px;">供应机构数量({{row.supplyOrgNum}})</div>
			</el-row>
			<searchCom @toSearch='searchData' :searchResult='searchResult' placeholderText='请输入你要找的机构名称'></searchCom>
			<el-row>
				<el-table :data="tableData" border>
					<el-table-column prop="orgName" label="机构名称" align="center"></el-table-column>
					<el-table-column prop="registerTime" label="账号创建日期" align="center" width="160"></el-table-column>
					<el-table-column prop="waiterOrgNum" label="操作" align="center" >
						<template slot-scope="scope">
							<el-button type="text" @click="checkSupplyRelation(scope.row)">查看供应组织关联关系</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-row>
			<supplyRelation v-if="isSupply" @close="closeSupplyRelation" :row="row" :orgRow="openRow"></supplyRelation>
			<pages :total="pageTotal" @changePage="changePage" :page="page"></pages>
		</div>
	</el-dialog>
</template>

<script>
	import supplyRelation from '@/views/operationRole/catDealManagement/catSupport/pans/supplyRelation'
	import pages from '@/views/components/common/pages.vue'
	import searchCom from '@/views/components/common/searchCom.vue'
	import {
		getOrgListByCat
	} from '@/api/operationRoleApi/catDealManagement.js'
	export default {
		name: "index",
		props: {
			row: {
				type: Object,
				default: () => {
					return {}
				}
			},
		},
		components: {
			supplyRelation,
			pages,
			searchCom
		},
		data() {
			return {
				isOpen: true,
				loading: false,
				page: 1,
				pageTotal: 0,
				searchResult: 0,
				tableData: [],
				searchVal: '',
				isSupply: false,
				openRow: {}
			};
		},
		methods: {
			close() {
				this.isOpen = false
				this.$emit('close')
			},
			beforeClose() {
				this.close()
			},
			changePage(page) {
				this.page = page
				this.getOrgListByCat()
			},
			searchData(data) {
				this.searchVal = data
				this.page = 1
				this.getOrgListByCat()
			},
			checkSupplyRelation(row) {
				this.openRow = row
				this.isSupply = true
			},
			closeSupplyRelation() {
				this.isSupply = false
			},
			async getOrgListByCat() {
				this.loading = true
				await getOrgListByCat({
					orgName: this.searchVal,
					categoryGuid: this.row.categoryGuid,
					page: this.page,
					size: '20',
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					this.loading = false
					if (res.OK == 'True') {
					
						console.log(res);
						if (res.Tag.length > 0) {
							let data = res.Tag[0].Table
							this.tableData = data
						} else {
							this.tableData = []
						}
						this.searchResult = this.tableData.length
						this.pageTotal = this.tableData.length > 0 ? (this.page - 1) * 20 + 21 : (this.page - 1) *
							20 + 1
					}
				})
			}
		},
		created() {
			this.getOrgListByCat()
		}
	};
</script>

<style lang="scss" scoped>
</style>
