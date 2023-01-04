<template>
	<el-dialog title="沟通结果记录" :visible.sync="isOpen" width="900px" @close="beforeClose" append-to-body>
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
			<searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的机构名称或者联系电话'></searchCom>
			<el-table border :data="tableData">
				<el-table-column label="姓名" prop="name" align="center" width="80" />
				<el-table-column label="联系电话" prop="phone" align="center" width="160"/>
				<el-table-column label="机构名称" prop="orgName" align="center" />
				<el-table-column label="角色类型" prop="role" align="center" />
				<el-table-column label="机构类型" prop="orgType" align="center" />
				<el-table-column label="注册区域" prop="address" align="center" />
				<el-table-column label="操作" align="center" class-name="small-padding fixed-width">
					<template slot-scope="scope">
						<el-button size="mini" type="text" @click="openOperation(scope.row,'operation')" v-if="scope.row.status == '1'">沟通结果操作</el-button>
						<el-button size="mini" type="text" @click="openOperation(scope.row,'check')" v-if="scope.row.status == '2'">查看沟通记录</el-button>
					</template>
				</el-table-column>
			</el-table>
			<pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
			<timeOverTips v-if="isTimeOver" @close="closeTimeOver" @refresh="getList"></timeOverTips>
			<resultOperation v-if="isOperation" @close="closeOperation" :row="openRow" :pageType="pageType"></resultOperation>
		</div>
	</el-dialog>
</template>

<script>
	import pages from '@/views/components/common/pages'
	import searchCom from '@/views/components/common/searchCom.vue'
	import resultOperation from '@/views/communicationRole/communicationTaskSend/components/resultOperation.vue'
	import timeOverTips from '@/views/communicationRole/communicationTaskSend/components/timeOverTips.vue'
	export default {
		name: "index",
		components: {
			pages,
			searchCom,
			resultOperation,
			timeOverTips
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
				searchResult: 0,
				searchVal: '',
				openRow: {},
				pageType: 'operation',
				isOperation: false,
				isTimeOver: false,
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
			search(data) {
				this.searchVal = data
				this.page = 1
				//
			},
			changePage(page) {
				this.page = page
				//
			},
			openOperation(row,type) {
				this.openRow = row
				this.pageType = type
				this.isOperation = true
			},
			closeOperation() {
				this.isOperation = false
			},
			openTimeOver() {
				this.isTimeOver = true
			},
			closeTimeOver() { 
				this.isTimeOver = false
			},
			getList() {
				this.tableData = [{
					name: '林都',
					phone: '（+86）18650767213',
					orgName: '',
					role: '',
					orgType: '',
					address: '',
					status: '1'
					
				},{
					name: '',
					phone: '（+86）18650767213',
					orgName: '',
					role: '',
					orgType: '',
					address: '',
					status: '2'
				}]
			}
			
		},
		created() {
			this.tableDataFirst.push(this.row)
			this.getList()
			this.openTimeOver()
		}
	};
</script>

<style lang="scss" scoped>
</style>