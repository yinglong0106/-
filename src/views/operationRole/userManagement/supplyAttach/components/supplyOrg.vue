<template>
	<el-dialog title="权限供应机构" :visible.sync="isOpen" width="1000px" @close="beforeClose" append-to-body>
		<div style="padding-bottom: 60px;">
			<el-table :data="tableDataFirst" border class="mb20">
				<el-table-column prop="userName" label="账号名称" align="center"></el-table-column>
				<el-table-column prop="createTime" label="账号开通日期" align="center" width="160"></el-table-column>
				<el-table-column prop="nickName" label="姓名" align="center"></el-table-column>
				<el-table-column prop="nation" label="国家/地区" align="center"></el-table-column>
				<el-table-column prop="phonenumber" label="联系电话" align="center"></el-table-column>
			</el-table>
			<div class="flex flex-center mb20">
				<div class="title-bg1">权限供应机构</div>
				<div class="ml0">统计展示这个供应专员当前由多少个供应机构</div>
			</div>
			<searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的机构名称'></searchCom>
			<el-table :data="tableData" border v-loading="loading">
				<el-table-column prop="seorgName" label="机构名称" align="center"></el-table-column>
				<el-table-column prop="registerTime" label="账号创建日期" align="center"></el-table-column>
				<el-table-column prop="relateTime" label="关联日期" align="center"></el-table-column>
			</el-table>

			<pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
		</div>
	</el-dialog>
</template>

<script>
	import pages from '@/views/components/common/pages'
	import searchCom from '@/views/components/common/searchCom.vue'
	import {
		getValidOrgListByST
	} from '@/api/operationRoleApi/recruitAttach.js'
	import { getRoleUserDetail } from '@/api/operationRoleApi/userManagement.js'
	export default {
		name: "index",
		components: {
			pages,
			searchCom,
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
				loading: false,
				tableData: [],
				tableDataFirst: [],
				openRow: {},
				page: 1,
				pageTotal: 0,
				searchResult: 0,
				searchVal: '',
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
				this.getValidOrgListByST()
				//
			},
			changePage(page) {
				this.page = page
				this.getValidOrgListByST()
				//
			},
			async getValidOrgListByST() {
				this.loading = true
				await getValidOrgListByST({
					orgName: this.searchVal,
					staffUserId: this.row.userId,
					staffType: '2',
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
			async getRoleUserDetail() {
				await getRoleUserDetail({
					userId: this.row.userId,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					if (res.OK == 'True') {
						if (res.Tag.length) {
							let data = res.Tag[0].Table
							this.tableDataFirst = data
						} else {
							let data = []
							this.tableDataFirst = data
						}
					}
				})
			}
		},
		created() {
			this.getValidOrgListByST()
			this.getRoleUserDetail()
		}
	};
</script>

<style lang="scss" scoped>
	.title-bg1 {
		width: 150px;
		padding: 10px 0;
		background-color: #D7D7D7;
		margin-right: 10px;
	}
</style>
