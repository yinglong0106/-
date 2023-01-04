<template>
	<div class="app-container">
		<div class="flex jsb flex-center">
			<searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的联系电话'></searchCom>
			<div class="flex mb20">
				<el-button type="primary" @click="openNew">创建个人用户</el-button>
			</div>
		</div>

		<el-table v-loading="loading" border :data="dataList">
			<el-table-column label="姓名" prop="name" align="center" width="160"
				:show-overflow-tooltip="true" />
			<el-table-column label="联系电话" prop="phone" align="center" width="160" :show-overflow-tooltip="true" />
			<el-table-column label="创建日期" prop="date" align="center"
				:show-overflow-tooltip="true" />
			<el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="120">
				<template slot-scope="scope">
					<el-row>
						<el-button size="mini" type="text" @click="openEditUserName(scope.row)">编辑姓名</el-button>
					</el-row>
					<el-row>
						<el-button size="mini" type="text" @click="openFileEditor(scope.row)">档案编辑</el-button>
					</el-row>
					<el-row>
						<el-button size="mini" type="text" @click="handleOpenType(scope.row)">删除用户</el-button>
					</el-row>
				</template>
				
			</el-table-column>
		</el-table>

		<pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
		<newUser v-if="isNew" @close="closeNew" @refresh="getList"></newUser>
		<editUserName v-if="isEdit" @close="closeEditUserName" @refresh="getList"></editUserName>
		<FileEditor v-if="isFile" @close="closeFileEditor" @refresh="getList"></FileEditor>
	</div>
</template>

<script>
	import searchCom from '@/views/components/common/searchCom.vue'
	import pages from '@/views/components/common/pages'
	import newUser from '@/views/operationRole/userMsgManagement/personalUser/components/newUser.vue'
	import editUserName from '@/views/operationRole/userMsgManagement/personalUser/components/editUserName.vue'
	import FileEditor from '@/views/operationRole/userMsgManagement/personalUser/components/FileEditor.vue'
	export default {
		name: "index",
		components: {
			searchCom,
			pages,
			newUser,
			editUserName,
			FileEditor
		},
		data() {
			return {
				loading: false,
				page: 1,
				pageTotal: 0,
				searchResult: 0,
				searchVal: '',
				dataList: [],
				isNew: false,
				isEdit: false,
				openRow: {},
				isFile: false,
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
			openNew() {
				this.isNew = true
			},
			closeNew() {
				this.closeNew = false
			},
			openEditUserName(row) {
				this.openRow = row
				this.isEdit = true
			},
			closeEditUserName() {
				this.isEdit = false
			},
			openFileEditor(row) {
				this.openRow = row
				this.isFile = true
			},
			closeFileEditor() {
				this.isFile = false
			},
			getList() {
				this.dataList = [{
					name: 'lxk',
					phone: '(+86)18650767213',
					date: '2022-12-12  12：12'
				}]
			}
		}
	};
</script>

<style lang="scss" scoped>
</style>
