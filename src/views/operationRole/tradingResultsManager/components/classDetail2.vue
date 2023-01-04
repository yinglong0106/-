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
				<div style="flex-shrink: 0;margin-right: 20px;">采购服务费用</div>
				<div>{{cattypeRow.money}}</div>
			</el-row>
			<el-divider></el-divider>
			<searchCom @toSearch='searchData' :searchResult='searchResult' placeholderText='请输入你要找的品类名称'></searchCom>
			<el-table :data="tableData" border>
				<el-table-column prop="categoryName" label="品类名称" align="center">
				</el-table-column>
				<el-table-column prop="cattypeName" label="品类类型" align="center">
				</el-table-column>
				<el-table-column prop="money" label="采购服务费用" align="center">
				</el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-row>
							<el-button type="text" @click="toDetail(scope.row)">品类详情</el-button>
						</el-row>
					</template>
				</el-table-column>
			</el-table>
			<orderDetail v-if="isDetail" @close="closeDetail" :row="row" :yearRow="yearRow" :monthRow="monthRow" :cattypeRow="cattypeRow" :categoryRow="openRow"></orderDetail>
			<pages :total="pageTotal" @changePage="changePage" :page="page"></pages>
		</div>
	</el-dialog>
</template>

<script>
	import pages from '@/views/components/common/pages.vue'
	import searchCom from '@/views/components/common/searchCom.vue'
	import orderDetail from '@/views/operationRole/tradingResultsManager/components/orderDetail.vue'
	import { SumByDayOfCG } from '@/api/operationRoleApi/tradingResultsManager'
	export default {
		name: "index",
		components: {
			pages,
			searchCom,
			orderDetail
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
				this.SumByDayOfCG()
			},
			searchData(data) {
				this.searchVal = data
				this.page = 1
				this.SumByDayOfCG()
			},
			async SumByDayOfCG() {
				await SumByDayOfCG({
					acceptDay: this.row.year + '-' + this.yearRow.month + '-' + this.monthRow.day,
					categoryName: this.searchVal,
					cattypeGuid: this.cattypeRow.cattypeGuid,
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
			console.log('cattype',this.cattypeRow);
			this.SumByDayOfCG()
		}
	};
</script>

<style lang="scss" scoped>
</style>