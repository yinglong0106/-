<template>
	<div class="app-container">
		<el-table :data="tableData" border v-loading="loading">
			<el-table-column prop="year" label="年份" align="center">
			</el-table-column>
			<el-table-column prop="month" label="计酬月份" align="center">
			</el-table-column>
			<el-table-column prop="money" label="采购服务费用" align="center"></el-table-column>
			<el-table-column label="操作" align="center">
				<template slot-scope="scope">
					<el-row>
						<el-button type="text" @click="openSettle(scope.row)">服务机构结算管理</el-button>
					</el-row>
				</template>
			</el-table-column>
		</el-table>
		<pages :total="pageTotal" @changePage="changePage" :page="page"></pages>

		<settleManagement v-if="isSettle" @close="closeSettle" :row="openRow"></settleManagement>
	</div>
</template>

<script>
	import settleManagement from '@/views/settleRole/serviceOrgSettlement/components/settleManagement'
	import pages from '@/views/components/common/pages'
	import {
		SumByYM
	} from '@/api/settleRoleApi/serviceOrgSettlement.js'
	export default {
		name: "index",
		components: {
			settleManagement,
			pages
		},
		data() {
			return {
				loading: true,
				isSettle: false,
				openRow: {},
				tableData: [],
				page: 1,
				pageTotal: 0,
			};
		},
		methods: {
			changePage(data) {
				this.page = data
				this.getDoneList()
			},
			openSettle(row) {
				this.openRow = row
				this.isSettle = true
			},
			closeSettle() {
				this.isSettle = false

			},
			async SumByYM() {
				this.loading = true
				await SumByYM({
					size: '20',
					page: this.page,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					this.loading = false
					console.log(res);
					if (res.Tag.length) {
						this.tableData = res.Tag[0].Table
						this.pageTotal = (this.page - 1) * 20 + 21
					} else {
						this.tableData = []
						this.pageTotal = (this.page - 1) * 20 + 1
					}
				})
			}
		},
		created() {
			this.SumByYM()
		}
	}
</script>

<style scoped lang="scss">
</style>
