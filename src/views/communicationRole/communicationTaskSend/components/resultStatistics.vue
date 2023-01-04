<template>
	<el-dialog title="沟通结果统计" :visible.sync="isOpen" width="900px" @close="beforeClose" append-to-body>
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
			<div class="title-bg mb10 mt10">沟通专员信息</div>
			<el-table border :data="tableDataSecond">
				<el-table-column label="账号名称" prop="userName" align="center" />
				<el-table-column label="姓名" prop="name" align="center"  />
				<el-table-column label="联系电话" prop="phone" align="center"  />
			</el-table>
			<div class="title-bg mb10 mt10">用户沟通结果</div>
			<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
				<el-tab-pane label="接受服务" name="first">
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
								<el-button size="mini" type="text" @click="openOperation(scope.row,'check')" v-if="scope.row.status == '2'">查看沟通记录</el-button>
							</template>
						</el-table-column>
					</el-table>
				</el-tab-pane>
				<el-tab-pane label="拒绝服务" name="second"></el-tab-pane>
				<el-tab-pane label="未接通" name="third"></el-tab-pane>
				<el-tab-pane label="无效号码" name="fourth"></el-tab-pane>
				<el-tab-pane label="时间到被收回" name="fifth"></el-tab-pane>
			</el-tabs>
		</div>
		<pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
		<resultOperation v-if="isOperation" @close="closeOperation" :row="openRow" :pageType="pageType"></resultOperation>
	</el-dialog>
</template>

<script>
	import searchCom from '@/views/components/common/searchCom.vue'
	import pages from '@/views/components/common/pages'
	import resultOperation from '@/views/communicationRole/communicationTaskSend/components/resultOperation.vue'
	export default {
		name: "index",
		components: {
			searchCom,
			resultOperation,
			pages
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
				tableDataSecond: [],
				activeName: 'first',
				page: 1,
				pageTotal: 0,
				searchResult: 0,
				searchVal: '',
				isOperation: false,
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
			handleClick() {
				
			},
			openOperation(row,type) {
				this.openRow = row
				this.pageType = type
				this.isOperation = true
			},
			closeOperation() {
				this.isOperation = false
			},
			getList() {
				this.tableData = [{
					name: '林都',
					phone: '（+86）18650767213',
					orgName: '',
					role: '',
					orgType: '',
					address: '',
					status: '2'
					
				},{
					name: '',
					phone: '（+86）18650767213',
					orgName: '',
					role: '',
					orgType: '',
					address: '',
					status: '2'
				}],
				this.tableDataSecond = [{
					userName: 'gtzy00',
					name: '张三',
					phone: '（+86）18650767213'
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
	.title-bg {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 200px;
		background-color: #f2f2f2;
		padding: 10px;
	}
</style>