<template>
	<el-dialog title="关联招募专员" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
		<div style="padding-bottom: 40px;">
			<div class="mb20">
				<searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的姓名或者联系电话'>
				</searchCom>
			</div>
			<el-table :data="tableData" border>
				<el-table-column width="30">
					<template v-slot="scope">
						<!-- label值要与el-table数据id实现绑定 -->
						<el-radio v-model="targetUserGuid" :label="scope.row.userId" @change="handleRowChange(scope.row)">
							{{""}}
						</el-radio>
					</template>
				</el-table-column>
				<el-table-column prop="userName" label="账号名称" align="center"></el-table-column>
				<el-table-column prop="registerTime" label="账号创建日期" align="center" width="160"></el-table-column>
				<el-table-column prop="nickName" label="姓名" align="center"></el-table-column>
				<el-table-column prop="nation" label="国家/区号" align="center"></el-table-column>
				<el-table-column prop="phonenumber" label="联系电话" align="center"></el-table-column>
			</el-table>
		</div>
		<span slot="footer" class="dialog-footer">
			<el-button @click="close">取 消</el-button>
			<el-button type="primary" @click="submit" :disabled="!targetUserGuid">保存</el-button>
		</span>
	</el-dialog>
</template>

<script>
	import searchCom from '@/views/components/common/searchCom.vue'
	import {
		getAvaliST3UserList,
		relateST3User
	} from '@/api/objectAttacheApi/serviceOrgManager.js'
	export default {
		name: "index",
		props: {
			row: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},
		components: {
			searchCom,
		},
		data() {
			return {
				isOpen: true,
				searchResult: 0,
				searchVal: '',
				tableData: [],
				targetUserGuid: ''
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
				this.getAvaliST3UserList()
				//
			},
			handleRowChange(data) {

			},
			submit() {
				this.relateST3User()
			},
			async getAvaliST3UserList() {
				await getAvaliST3UserList({
					phonenumber: this.searchVal,
					size: '200',
					page: 1,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					this.loading = false
					if (res.OK == 'True') {

						console.log(res);
						if (res.Tag.length > 0) {
							let data = res.Tag[0].Table
							this.tableData = data
						} else {
							this.tableData = []
						}
						this.searchResult = this.tableData.length
						this.pageTotal = this.tableData.length > 0 ? (this.page - 1) * 20 + 21 : (this.page -
							1) * 20 + 1
					}
				})
			},
			async relateST3User() {
				this.loading = true
				await relateST3User({
					targetUserId: this.targetUserGuid,
					seorgGuid: this.row.seorgGuid,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					this.loading = false
					if(res.OK == 'True') {
						if (res.Tag[0].Table[0].okFlag > 0) {
							this.$message({
								type: 'success',
								message: res.Tag[0].Table[0].notOkReason
							});
							this.$emit('refresh')
							this.close()
						} else {
							this.$message({
								type: 'error',
								message: res.Tag[0].Table[0].notOkReason
							});
						}
					}
				})
			},
		},
		created() {
			this.getAvaliST3UserList()
		}
	};
</script>

<style lang="scss" scoped>
</style>
