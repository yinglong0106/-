<template>
	<div class="app-container">
		<el-table v-loading="loading" :data="tableData" border style="width: 500px">
			<el-table-column prop="year" label="年度" align="center">
			</el-table-column>
			<el-table-column prop="money" label="采购服务费用" align="center">
			</el-table-column>
			<el-table-column label="操作" align="center">
				<template slot-scope="scope">
					<el-row>
						<el-button type="text" @click="toDetail(scope.row)">年度详情</el-button>
					</el-row>
				</template>
			</el-table-column>
		</el-table>
		<yearDetail v-if="isDetail" @close="closeDetail" :row="openRow"></yearDetail>
		<!-- <pages @changePage="changePage" :page="page"></pages> -->
	</div>
</template>

<script>
	import pages from '@/views/components/common/pages.vue'
	import yearDetail from '@/views/operationRole/tradingResultsManager/components/yearDetail.vue'
	import { SumByYear } from '@/api/operationRoleApi/tradingResultsManager'
	export default {
		name: "index",
		components: {
			pages,
			yearDetail
		},
		data() {
			return {
				tableData: [],
				page: 1,
				loading: false,
				isDetail: false,
				openRow: {}
			};
		},
		methods: {
			changePage(page) {
				this.page = page
				this.getFixedMappingData()
			},
			toDetail(row) {
				this.openRow = row
				this.isDetail = true
			},
			closeDetail() {
				this.isDetail = false
			},
			async SumByYear() {
				await SumByYear({
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
		mounted() {
			this.SumByYear()
		}
	};
</script>

<style lang="scss">
	.pageBox {
		height: 48px;

		.pageMain {
			position: absolute;
			bottom: 20px;
			left: 20px;
		}

	}
</style>
