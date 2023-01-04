<template>
	<el-dialog title="关联招募专员管理" :visible.sync="isOpen" width="900px" @close="beforeClose">
		<div style="padding-bottom: 40px;" v-loading="loading">
			<el-row class="mt20 pb20 flex flex-center">
				<div style="flex-shrink: 0;margin-right: 20px;">服务机构</div>
				<div>{{row.seorgName}}</div>
			</el-row>
			<el-divider></el-divider>
			<el-row class="mb20">
				<el-button type="primary" @click="openRelevance">关联招募专员</el-button>
				<el-button type="primary" @click="openRelevanceLog">招募专员关联记录</el-button>
			</el-row>
			<el-row>
				<el-table :data="tableData" border>
					<el-table-column prop="userName" label="账号名称" align="center"></el-table-column>
					<el-table-column prop="registerTime" label="账号创建日期" align="center" width="160"></el-table-column>
					<el-table-column prop="nickName" label="姓名" align="center"></el-table-column>
					<el-table-column prop="nation" label="国家/区号" align="center"></el-table-column>
					<el-table-column prop="phonenumber" label="手机号" align="center"></el-table-column>
					<el-table-column prop="relateTime" label="关联日期" align="center" width="160"></el-table-column>
				</el-table>
			</el-row>
			<relevanceAttach v-if="isRelevance" @close="closeRelevance" @refresh="getST3UserList" :row="row"></relevanceAttach>
			<relevanceLog v-if="isLog" @close="closeRelevanceLog" @refresh="getST3UserList" :row="row"></relevanceLog>
		</div>
	</el-dialog>
</template>

<script>
	import relevanceAttach from '@/views/objectAttache/serviceOrgManager/components/relevanceAttach.vue'
	import relevanceLog from '@/views/objectAttache/serviceOrgManager/components/relevanceLog.vue'
	import {
		getST3UserList
	} from '@/api/objectAttacheApi/serviceOrgManager.js'
	export default {
		name: "index",
		components: {
			relevanceAttach,
			relevanceLog
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
				isRelevance: false,
				isLog: false,
				loading: false
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
			openRelevanceLog() {
				this.isLog = true
			},
			closeRelevanceLog() {
				this.isLog = false
			},
			async getST3UserList() {
				this.loading = true
				await getST3UserList({
					seorgGuid: this.row.seorgGuid,
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
			}
		},
		created() {
			this.getST3UserList()
		}
	};
</script>

<style lang="scss" scoped>
</style>
