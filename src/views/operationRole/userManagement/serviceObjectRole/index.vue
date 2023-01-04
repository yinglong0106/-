<template>
	<div class="app-container">
		<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
			<el-tab-pane label="注册" name="first">
				<div class="flex jsb flex-center">
					<searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的姓名或者电话号码'></searchCom>
				</div>
				<el-table :data="tableList" border v-loading="loading">
					<el-table-column prop="userName" label="姓名" align="center"></el-table-column>
					<el-table-column prop="nation" label="国家/地区" align="center"></el-table-column>
					<el-table-column prop="phonenumber" label="联系电话" align="center"></el-table-column>
					<el-table-column prop="registerTime" label="账号开通日期" align="center"></el-table-column>
					<el-table-column label="操作" align="center">
						<template slot-scope="scope">
							<el-row>
								<el-button type="text" @click="openSuccess(scope.row)">服务对象成果</el-button>
							</el-row>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
			<el-tab-pane label="未注册" name="second">
				<div class="flex jsb flex-center">
					<searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的姓名或者电话号码'></searchCom>
				</div>
				<el-table :data="tableList" border v-loading="loading">
					<el-table-column prop="userName" label="姓名" align="center"></el-table-column>
					<el-table-column prop="nation" label="国家/地区" align="center"></el-table-column>
					<el-table-column prop="phonenumber" label="联系电话" align="center"></el-table-column>
				</el-table>
			</el-tab-pane>
		</el-tabs>
		
		<pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
		<serviceAttachSuccess v-if="isSuccess" @close="closeSuccess" :row="openRow"></serviceAttachSuccess>
	</div>
</template>

<script>
	import searchCom from '@/views/components/common/searchCom.vue'
	import pages from '@/views/components/common/pages'
	import serviceAttachSuccess from '@/views/operationRole/userManagement/serviceObjectRole/components/serviceAttachSuccess'
	import {
		getHasRegisteredList,
		getUnRegisteredList
	} from "@/api/operationRoleApi/serviceObjectRole.js"
	export default {
		name: "index",
		components: {
			searchCom,
			pages,
			serviceAttachSuccess
		},
		data() {
			return {
				loading: false,
				tableList: [],
				page: 1,
				pageTotal: 0,
				searchResult: 0,
				searchVal: '',
				pageStatus: '1',
				openRow: {},
				isCategory: false,
				isSuccess: false,
				activeName: 'first'
			};
		},
		methods: {
			handleClick(tab, event) {
				this.page = 1
				this.searchVal = ''
				this.getList()
			},
			search(data) {
				this.searchVal = data
				this.page = 1
				this.getList()
				//
			},
			changePage(page) {
				this.page = page
				this.getList()
				//
			},
			openSuccess(row) {
				this.openRow = row
				this.isSuccess = true
			},
			closeSuccess() {
				this.isSuccess = false
			},
			getList() {
				if(this.activeName == 'first') {
					this.getHasRegisteredList()
				} else {
					this.getUnRegisteredList()
				}
			},
			async getHasRegisteredList() {
				this.loading = true
				await getHasRegisteredList({
					page: this.page,
					size: '20',
					phonenumber: this.searchVal,
					curUserId: this.$store.state.user.adminId,
				}).then((res) => {
					this.loading = false
					if (res.Tag.length) {
						let data = res.Tag[0].Table
						this.tableList = data
						this.pageTotal = (this.page - 1) * 20 + 21
					} else {
						this.tableList = []
						this.pageTotal = (this.page - 1) * 20 + 1
					}
					this.searchResult = this.tableList.length
				})
			},
			async getUnRegisteredList() {
				this.loading = true
				await getUnRegisteredList({
					page: this.page,
					size: '20',
					phonenumber: this.searchVal,
					curUserId: this.$store.state.user.adminId,
				}).then((res) => {
					this.loading = false
					if (res.Tag.length) {
						let data = res.Tag[0].Table
						this.tableList = data
						this.pageTotal = (this.page - 1) * 20 + 21
					} else {
						this.tableList = []
						this.pageTotal = (this.page - 1) * 20 + 1
					}
					this.searchResult = this.tableList.length
				})
			}
		},
		created() {
			this.getList()
		}
	}
</script>

<style scoped lang="scss">
</style>
