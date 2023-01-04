<template>
	<el-dialog title="年度详情" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
		<div style="padding-bottom: 40px;" v-loading="loading">
			<el-row class="mt20 flex flex-center">
				<div style="flex-shrink: 0;margin-right: 20px;">年度</div>
				<div>{{row.year}}</div>
			</el-row>
			<el-row class="mt20 flex flex-center">
				<div style="flex-shrink: 0;margin-right: 20px;">采购服务费用</div>
				<div>{{row.money}}</div>
			</el-row>
			<el-divider></el-divider>
			<el-table :data="tableData" border style="width: 500px">
				<el-table-column prop="month" label="计酬月份" align="center">
				</el-table-column>
				<el-table-column prop="money" label="采购服务费用" align="center">
				</el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-row>
							<el-button type="text" @click="toDetail(scope.row)">月度详情</el-button>
						</el-row>
					</template>
				</el-table-column>
			</el-table>
			<monthDetail v-if="isDetail" @close="closeDetail" :row="row" :yearRow="openRow"></monthDetail>
		</div>
	</el-dialog>
</template>

<script>
	import monthDetail from '@/views/operationRole/tradingResultsManager/components/monthDetail.vue'
	import { SumByMonth } from '@/api/operationRoleApi/tradingResultsManager'
	export default {
		name: "index",
		components: {
			monthDetail
		},
		props: {
			row: {
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
				tableData: [],
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
			async SumByMonth() {
				await SumByMonth({
					year: this.row.year,
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
			this.SumByMonth()
		}
	};
</script>

<style lang="scss" scoped>
</style>