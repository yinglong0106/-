<template>
	<el-dialog title="品类详情" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
		<div style="padding-bottom: 40px;" v-loading="loading">
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
				<div style="flex-shrink: 0;margin-right: 20px;">采购服务费用</div>
				<div>{{monthRow.money}}</div>
			</el-row>
			<el-divider></el-divider>
			<el-table :data="tableData" border style="width: 500px">
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
			<classDetail2 v-if="isDetail" @close="closeDetail" :row="row" :yearRow="yearRow" :monthRow="monthRow" :cattypeRow="openRow"></classDetail2>
		</div>
	</el-dialog>
</template>

<script>
	import classDetail2 from '@/views/operationRole/tradingResultsManager/components/classDetail2.vue'
	import { SumByDayOfCT } from '@/api/operationRoleApi/tradingResultsManager'
	export default {
		name: "index",
		components: {
			classDetail2
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
		},
		data() {
			return {
				isOpen: true,
				loading: false,
				tableData: [{}],
				isDetail: false,
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
			toDetail(row) {
				this.openRow = row
				this.isDetail = true
			},
			closeDetail() {
				this.isDetail = false
			},
			async SumByDayOfCT() {
				await SumByDayOfCT({
					acceptDay: this.row.year + '-' + this.yearRow.month + '-' + this.monthRow.day,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					if(res.OK == 'True') {
						if(res.Tag.length) {
							let data = res.Tag[0].Table
							this.tableData = data
						} else {
							this.tableData = []
						}
					}
				})
			}
		},
		created() {
			this.SumByDayOfCT()
		}
	};
</script>

<style lang="scss" scoped>
</style>