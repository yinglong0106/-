<template>
	<el-dialog title="添加账号申请人" :visible.sync="isOpen" width="900px" @close="beforeClose" append-to-body>
		<div style="padding-bottom: 40px;">
			<div class="mb20">
				<searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的姓名或者联系电话'>
				</searchCom>
			</div>
			<el-table :data="tableData" border v-loading="loading">
				<el-table-column width="30">
					<template v-slot="scope">
						<!-- label值要与el-table数据id实现绑定 -->
						<el-radio v-model="showId" :label="scope.row.seorgStalogGuid"
							@change="handleRowChange(scope.row)">
							{{""}}
						</el-radio>
					</template>
				</el-table-column>
				<el-table-column prop="userName" label="账号名称" align="center" width="160"></el-table-column>
				<el-table-column prop="nickName" label="姓名" align="center" width="160"></el-table-column>
				<el-table-column prop="nation" label="国家/区号" align="center" width="120"></el-table-column>
				<el-table-column prop="phonenumber" label="联系电话" align="center" width="120"></el-table-column>
			</el-table>
			<pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
		</div>
		<span slot="footer" class="dialog-footer">
			<el-button @click="close">取 消</el-button>
			<el-button type="primary" @click="submit" :disabled="!showId.length">保存</el-button>
		</span>
	</el-dialog>
</template>

<script>
	import searchCom from '@/views/components/common/searchCom.vue'
	import pages from '@/views/components/common/pages'
	import {
		getHasSeorgUserList,
		relateST2User
	} from '@/api/objectAttacheApi/objectAttache.js'
	export default {
		name: "index",
		props: {
			row: {
				type: Object,
				default: () => {
					return {}
				}
			},
			oldUserId: {
				type: String,
				default: ''
			}
		},
		components: {
			searchCom,
			pages,
		},
		data() {
			return {
				isOpen: true,
				page: 1,
				pageTotal: 0,
				searchResult: 0,
				searchVal: '',
				tableData: [],
				targetUserId: '',
				showId: '',
				seorgStalogGuid: '',
				loading: false,
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
				this.page = 1
				this.searchVal = data
				this.getHasSeorgUserList()
				//
			},
			changePage(page) {
				this.page = page
				this.getHasSeorgUserList()
			},
			handleRowChange(data) {
				this.seorgStalogGuid = data.seorgStalogGuid
				this.targetUserId = data.userId
			},
			submit() {
				this.relateST2User()
			},
			async getHasSeorgUserList() {
				this.loading = true
				await getHasSeorgUserList({
					phonenumber: this.searchVal,
					size: '20',
					page: this.page,
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
			async relateST2User() {
				console.log('上级SHANG ',this.row);
				this.loading = true
				await relateST2User({
					targetUserId: this.targetUserId,
					orgUserGuid: this.row.orgUserId,
					seorgStalogGuid: this.seorgStalogGuid,
					curUserId: this.$store.state.user.adminId,
					oldUserId: this.oldUserId
				}).then(res => {
					this.loading = false
					if (res.OK == 'True') {
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
			this.getHasSeorgUserList()
		}
	};
</script>

<style lang="scss" scoped>
</style>
