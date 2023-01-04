<template>
	<el-dialog title="查看沟通话术" :visible.sync="isOpen" width="900px" @close="beforeClose" append-to-body>
		<div style="padding-bottom: 60px;">
			<el-table border :data="tableDataFirst">
				<el-table-column label="派发日期" prop="paifaDate" align="center" :show-overflow-tooltip="true" width="240" />
				<el-table-column label="执行日期" prop="zhixingDate" align="center" width="240"
					:show-overflow-tooltip="true" />
				<el-table-column label="服务名称" prop="serverName" align="center" width="160" :show-overflow-tooltip="true" />
				<el-table-column label="派发用户数量" prop="paifaNum" align="center"
					:show-overflow-tooltip="true" />
			</el-table>
			<el-divider></el-divider>
			<el-table border :data="tableData">
				<el-table-column label="文件名称" prop="fileName" align="center" :show-overflow-tooltip="true" />
				<el-table-column label="创建日期" prop="date" align="center" width="160"
					:show-overflow-tooltip="true" />
				<el-table-column label="操作" align="center" class-name="small-padding fixed-width">
					<template slot-scope="scope">
						<el-button size="mini" type="text" @click="donwLoad(scope.row)">下载</el-button>
					</template>
				</el-table-column>
			</el-table>
			<pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
		</div>
	</el-dialog>
</template>

<script>
	import pages from '@/views/components/common/pages'
	export default {
		name: "index",
		components: {
			pages,
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
				tableDataFirst: [],
				tableData: [],
				page: 1,
				pageTotal: 0,
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
				//
			},
			donwLoad(row) {
				console.log('下载');
			},
			getList() {
				this.tableData = [{
					fileName: '综合融资服务话术版本2',
					date: '2022-12-12  12：12',
					
				}]
			}
			
		},
		created() {
			this.tableDataFirst.push(this.row)
			this.getList()
		}
	};
</script>

<style lang="scss" scoped>
</style>