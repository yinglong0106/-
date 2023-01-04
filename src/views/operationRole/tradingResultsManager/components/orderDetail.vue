<template>
	<el-dialog title="品类详情" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
		<div style="padding-bottom: 60px;" v-loading="loading">
			<el-row class="mt20 flex flex-center">
				<div style="flex-shrink: 0;margin-right: 20px;">年度</div>
				<div>{{row.year}}</div>
			</el-row>
			<el-row class="mt20 flex flex-center">
				<div style="flex-shrink: 0;margin-right: 20px;">计酬月份</div>
				<div>{{yearRow.month}}</div>
			</el-row>
			<el-row class="mt20 flex flex-center">
				<div style="flex-shrink: 0;margin-right: 20px;">日期</div>
				<div>{{monthRow.day}}</div>
			</el-row>
			<el-row class="mt20 flex flex-center">
				<div style="flex-shrink: 0;margin-right: 20px;">品类类型</div>
				<div>{{cattypeRow.cattypeName}}</div>
			</el-row>
			<el-row class="mt20 flex flex-center">
				<div style="flex-shrink: 0;margin-right: 20px;">品类名称</div>
				<div>{{categoryRow.categoryName}}</div>
			</el-row>
			<el-row class="mt20 flex flex-center">
				<div style="flex-shrink: 0;margin-right: 20px;">采购服务费用</div>
				<div>{{categoryRow.money}}</div>
			</el-row>
			<el-divider></el-divider>
			<searchCom @toSearch='searchData' :searchResult='searchResult' placeholderText='请输入你要找的采购编号'></searchCom>
			<el-table :data="tableData" border>
				<el-table-column prop="acceptTime" label="验收通过日期" align="center">
				</el-table-column>
				<el-table-column prop="OrderTime" label="采购日期" align="center">
				</el-table-column>
				<el-table-column prop="orderNo" label="采购编号" align="center" width="180">
				</el-table-column>
				<el-table-column prop="money" label="采购服务费用" align="center">
				</el-table-column>
			</el-table>
			<pages :total="pageTotal" @changePage="changePage" :page="page"></pages>
		</div>
	</el-dialog>
</template>

<script>
	import pages from '@/views/components/common/pages.vue'
	import searchCom from '@/views/components/common/searchCom.vue'
	import { getOrderListByDayOfCG } from '@/api/operationRoleApi/tradingResultsManager'
	export default {
		name: "index",
		components: {
			pages,
			searchCom,
		},
		props: {
			row: {
				type: Object,
				default: () => {
					return {}
				}
			},
			yearRow: {
				type: Object,
				default: () => {
					return {}
				}
			},
			monthRow: {
				type: Object,
				default: () => {
					return {}
				}
			},
			cattypeRow: {
				type: Object,
				default: () => {
					return {}
				}
			},
			categoryRow: {
				type: Object,
				default: () => {
					return {}
				}
			},
		},
		data() {
			return {
				isOpen: true,
				loading: false,
				tableData: [{}],
				isDetail: false,
				openRow: {},
				page: 1,
				pageTotal: 0,
				searchResult: 0,
				tableData: [],
				searchVal: '',
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
			toDetail(row) {
				this.openRow = row
				this.isDetail = true
			},
			closeDetail() {
				this.isDetail = false
			},
			changePage(page) {
				this.page = page
				this.getOrderListByDayOfCG()
			},
			searchData(data) {
				this.searchVal = data
				this.page = 1
				this.getOrderListByDayOfCG()
			},
			async getOrderListByDayOfCG() {
				await getOrderListByDayOfCG({
					acceptDay: this.row.year + '-' + this.yearRow.month + '-' + this.monthRow.day,
					orderNo: this.searchVal,
					categoryGuid: this.categoryRow.categoryGuid,
					page: this.page,
					size: '20',
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					if(res.OK == 'True') {
						if(res.Tag.length) {
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
			this.getOrderListByDayOfCG()
		}
	};
</script>

<style lang="scss" scoped>
</style>