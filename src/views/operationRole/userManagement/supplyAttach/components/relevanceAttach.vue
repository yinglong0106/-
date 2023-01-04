<template>
	<el-dialog title="关联服务机构" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
		<div style="padding-bottom: 60px;" v-loading="loading">
			<div class="mb20">
				<searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的机构名称'>
				</searchCom>
			</div>
			<el-table :data="tableData" border>
				<el-table-column width="60px">
					<template v-slot="scope">
						<!-- label值要与el-table数据id实现绑定 -->
						<el-radio v-model="seorgGuid" :label="scope.row.seorgGuid"
							@change="handleRowChange(scope.row)">{{""}}</el-radio>
					</template>
				</el-table-column>
				<el-table-column prop="seorgName" label="机构名称" align="center"></el-table-column>
				<el-table-column prop="registerTime" label="账号创建日期" align="center"></el-table-column>
			</el-table>
			
		</div>
		<span slot="footer" class="dialog-footer">
			<el-button @click="close">取 消</el-button>
			<el-button type="primary" @click="submit" :disabled="!seorgGuid">保 存</el-button>
		</span>
		<pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
	</el-dialog>
</template>

<script>
	import searchCom from '@/views/components/common/searchCom.vue'
	import pages from '@/views/components/common/pages'
	import {
		getAvaliaSeorgList,
		relateST2User
	} from '@/api/operationRoleApi/recruitAttach.js'
	export default {
		name: "index",
		components: {
			searchCom,
			pages
		},
		props: {
			row: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},
		data() {
			return {
				isOpen: true,
				searchResult: 0,
				searchVal: '',
				tableData: [],
				seorgGuid: '',
				loading: false,
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
			search(data) {
				this.searchVal = data
				this.page = 1
				this.getAvaliaSeorgList()
				//
			},
			changePage(page) {
				this.page = page
				this.getAvaliaSeorgList()
				//
			},
			handleRowChange(data) {
				
			},
			async getAvaliaSeorgList() {
				this.loading = true
				await getAvaliaSeorgList({
					seorgName: this.searchVal,
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
				this.loading = true
				await relateST2User({
					targetUserGuid: this.row.userId,
					seorgGuid: this.seorgGuid,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					this.loading = false
					if(res.OK == 'True') {
						if (res.Tag[0].Table[0].okFlag > 0) {
							this.$message({
								type: 'success',
								message: res.Tag[0].Table[0].msg
							});
							this.$emit('refresh')
							this.close()
						} else {
							this.$message({
								type: 'error',
								message: res.Tag[0].Table[0].msg
							});
						}
					}
				})
			},
			submit() {
				this.relateST2User()
			}
		},
		created() {
			this.getAvaliaSeorgList()
		}
	};
</script>

<style lang="scss" scoped>
</style>
