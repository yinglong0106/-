<template>
	<div class="app-container" style="padding: 0px;">
		<div class="flex jsb flex-center">
			<searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的任务名称'></searchCom>
		</div>

		<el-table v-loading="loading" border :data="tableData">
			<el-table-column label="派发日期" prop="paifaDate" align="center" width="240" />
			<el-table-column label="执行日期" prop="zhixingDate" align="center" width="240"
				 />
			<el-table-column label="服务名称" prop="serverName" align="center" width="160" :show-overflow-tooltip="true" />
			<el-table-column label="派发用户数量" prop="paifaNum" align="center"
				:show-overflow-tooltip="true" />
			<el-table-column label="操作" align="center" class-name="small-padding fixed-width">
				<template slot-scope="scope">
					<el-row>
						<el-button size="mini" type="text" @click="openResultStatistics(scope.row)">沟通结果统计</el-button>
					</el-row>
				</template>
			</el-table-column>
		</el-table>

		<pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
		<resultStatistics v-if="isResultStatistics" @close="closeResultStatistics" :row="openRow" @refresh="getList"></resultStatistics>
	</div>
</template>

<script>
	import searchCom from '@/views/components/common/searchCom.vue'
	import pages from '@/views/components/common/pages'
	import resultStatistics from '@/views/communicationRole/communicationTaskSend/components/resultStatistics.vue'
	export default {
		name: "index",
		components: {
			searchCom,
			pages,
			resultStatistics
		},
		data() {
			return {
				loading: false,
				page: 1,
				pageTotal: 0,
				searchResult: 0,
				searchVal: '',
				tableData: [],
				openRow: {},
				isResultStatistics: false,
			};
		},
		created() {
			this.getList()
		},
		methods: {
			search(data) {
				this.searchVal = data
				this.page = 1
				//
			},
			changePage(page) {
				this.page = page
				//
			},
			openResultStatistics(row) {
				this.openRow = row
				this.isResultStatistics = true
			},
			closeResultStatistics() {
				this.isResultStatistics = false
			},
			getList() {
				this.tableData = [{
					paifaDate: '2022-12-12  12：12',
					zhixingDate: '2022-12-12 ---2022-12-12',
					serverName: '企业融资服务',
					paifaNum: '100'
					
				}]
			}
		}
	};
</script>

<style lang="scss" scoped>
</style>