<template>
	<div class="app-container">
		<el-table v-loading="loading" border :data="tableData">
			<el-table-column label="账号名称" prop="userName" align="center" :show-overflow-tooltip="true" />
			<el-table-column label="姓名" prop="name" align="center" width="160"
				:show-overflow-tooltip="true" />
			<el-table-column label="国家/区号" prop="nation" align="center" width="160" :show-overflow-tooltip="true" />
			<el-table-column label="手机号码" prop="phone" align="center"
				:show-overflow-tooltip="true" />
			<el-table-column label="角色名称" prop="role" align="center"
				:show-overflow-tooltip="true" />
			<el-table-column label="操作" align="center" class-name="small-padding fixed-width">
				<template slot-scope="scope">
					<el-button size="mini" type="text" @click="openEditAttach(scope.row)">编辑</el-button>
					<el-button size="mini" type="text" @click="openWatchAttach(scope.row)">查看</el-button>
				</template>
			</el-table-column>
		</el-table>
		<editAttach v-if="isEdit" @close="closeEditAttach" :row="openRow" :pageType="pageType"></editAttach>
	</div>
</template>

<script>
	import editAttach from '@/views/communicationRole/communicationMsg/components/editAttach.vue'
	export default {
		name: "index",
		components: {
			editAttach
		},
		data() {
			return {
				loading: false,
				tableData: [],
				isEdit: false,
				openRow: {},
				pageType: 'watch'
			};
		},
		methods: {
			openEditAttach(row) {
				this.isEdit = true
				this.openRow = row
				this.pageType = 'edit'
			},
			closeEditAttach() {
				this.isEdit = false
			},
			openWatchAttach(row) {
				this.isEdit = true
				this.openRow = row
				this.pageType = 'watch'
			},
			closeEditAttach() {
				this.isEdit = false
			},
			getList() {
				this.tableData = [{
					name: '张华',
					userName: 'goutongzhuanyuan00',
					nation: '中国大陆（+86）',
					phone: '1560910202',
					role: '沟通专员'
				}]
			}
		},
		created() {
			this.getList()
		}
	}
</script>

<style scoped lang="scss">
</style>