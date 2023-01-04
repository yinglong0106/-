<template>
	<el-dialog title="服务机构数量" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
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
				<div style="background: #F2F2F2;padding: 10px;">服务机构数量({{row.waiterOrgNum}})</div>
			</el-row>
			<searchCom @toSearch='searchData' :searchResult='searchResult' placeholderText='请输入你要找的机构名称'></searchCom>
			<el-row>
				<el-table :data="tableData" border>
					<el-table-column prop="seorgName" label="机构名称" align="center"></el-table-column>
					<el-table-column prop="registerTime" label="账号创建日期" align="center" width="160"></el-table-column>
					<el-table-column prop="waiterNum" label="服务专员数量" align="center"></el-table-column>
					<el-table-column prop="waiterOrgNum" label="操作" align="center" >
						<template slot-scope="scope">
							<el-button type="text" @click="checkServiceRelation(scope.row)">查看服务组织关联关系</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-row>
			<serviceRelation v-if="isService" @close="closeServiceRelation" :row="row" :orgRow="openRow"></serviceRelation>
			<pages :total="pageTotal" @changePage="changePage" :page="page"></pages>
		</div>
	</el-dialog>
</template>

<script>
	import serviceRelation from '@/views/operationRole/catDealManagement/catSupport/pans/serviceRelation'
	import pages from '@/views/components/common/pages.vue'
	import searchCom from '@/views/components/common/searchCom.vue'
	import {
		getSeorgListByCat
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
			serviceRelation,
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
				isService: false,
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
				this.getSeorgListByCat()
			},
			searchData(data) {
				this.searchVal = data
				this.page = 1
				this.getSeorgListByCat()
			},
			checkServiceRelation(row) {
				this.openRow = row
				this.isService = true
			},
			closeServiceRelation() {
				this.isService = false
			},
			async getSeorgListByCat() {
				this.loading = true
				await getSeorgListByCat({
					seorgName: this.searchVal,
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
			this.getSeorgListByCat()
		}
	};
</script>

<style lang="scss" scoped>
</style>
