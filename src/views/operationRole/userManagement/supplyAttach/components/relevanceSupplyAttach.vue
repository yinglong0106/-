<template>
	<el-dialog title="关联服务机构" :visible.sync="isOpen" width="700px" @close="beforeClose">
		<div style="padding-bottom: 40px;" v-loading="loading">
			<el-table :data="tableDataFirst" border class="mb20">
				<el-table-column prop="userName" label="账号名称" align="center"></el-table-column>
				<el-table-column prop="createTime" label="账号开通日期" align="center" width="160"></el-table-column>
				<el-table-column prop="nickName" label="姓名" align="center"></el-table-column>
				<el-table-column prop="nation" label="国家/地区" align="center"></el-table-column>
				<el-table-column prop="phonenumber" label="联系电话" align="center"></el-table-column>
			</el-table>
			<el-divider></el-divider>
			<el-row class="mb20">
				<el-button type="primary" @click="openRelevance" :disabled="searchResult>0">关联服务机构</el-button>
			</el-row>
			<el-row>
				<el-table :data="tableData" border>
					<el-table-column prop="seorgName" label="机构名称" align="center"></el-table-column>
					<el-table-column prop="registerTime" label="账号创建日期" align="center"></el-table-column>
					<el-table-column prop="relateTime" label="关联日期" align="center"></el-table-column>
				</el-table>
			</el-row>
			<relevanceAttach v-if="isRelevance" @close="closeRelevance" :row="tableDataFirst[0]" @refresh="getValidSeorgListByST"></relevanceAttach>
		</div>
	</el-dialog>
</template>

<script>
	import relevanceAttach from '@/views/operationRole/userManagement/supplyAttach/components/relevanceAttach.vue'
	import {
		getValidSeorgListByST
	} from '@/api/operationRoleApi/recruitAttach.js'
	import { getRoleUserDetail } from '@/api/operationRoleApi/userManagement.js'
	export default {
		name: "index",
		components: {
			relevanceAttach,
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
				loading: false,
				tableData: [],
				tableDataFirst: [],
				isRelevance: false,
				isLog: false,
				searchResult: 0
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
			openRelevance() {
				this.isRelevance = true
			},
			closeRelevance() {
				this.isRelevance = false
			},
			async getValidSeorgListByST() {
				this.loading = true
				await getValidSeorgListByST({
					seorgName: '',
					staffUserId: this.row.userId,
					staffType: '2',
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
			this.getRoleUserDetail()
			this.getValidSeorgListByST()
		}
	};
</script>

<style lang="scss" scoped>
</style>
