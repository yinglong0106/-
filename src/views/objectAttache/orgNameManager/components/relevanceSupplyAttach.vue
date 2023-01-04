<template>
	<el-dialog title="账号申请人管理" :visible.sync="isOpen" width="900px" @close="beforeClose">
		<div style="padding-bottom: 40px;" v-loading="loading">
			<el-row class="mt20 pb20 flex flex-center">
				<div style="flex-shrink: 0;margin-right: 20px;">机构名称</div>
				<div>{{row.orgName}}</div>
			</el-row>
			<el-divider></el-divider>
			<el-row class="mb20 flex flex-center">
				<el-button type="primary" @click="openRelevance" :disabled="tableData.length > 0">添加账号申请人</el-button>
				<div class="ml10">记录这个供应机构账号是哪个服务专员申报。</div>
			</el-row>
			<el-row>
				<el-table :data="tableData" border>
					<el-table-column prop="userName" label="账号名称" align="center" width="160"></el-table-column>
					<el-table-column prop="nickName" label="姓名" align="center" width="160"></el-table-column>
					<el-table-column prop="nation" label="国家/区号" align="center" width="120"></el-table-column>
					<el-table-column prop="phonenumber" label="手机号" align="center" width="120"></el-table-column>
					<el-table-column prop="relateTime" label="添加申请日期" align="center" ></el-table-column>
				</el-table>
			</el-row>
			<relevanceAttach v-if="isRelevance" @close="closeRelevance" @refresh="getST2UserList" :row="row" :oldUserId="oldUserId"></relevanceAttach>
			<relevanceLog v-if="isLog" @close="closeRelevanceLog" @refresh="getST2UserList" :row="row"></relevanceLog>
		</div>
	</el-dialog>
</template>

<script>
	import relevanceAttach from '@/views/objectAttache/orgNameManager/components/relevanceAttach.vue'
	import relevanceLog from '@/views/objectAttache/orgNameManager/components/relevanceLog.vue'
	import {
		getST2UserList
	} from '@/api/objectAttacheApi/objectAttache.js'
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
				oldUserId: '',
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
			async getST2UserList() {
				console.log('上级',this.row);
				this.loading = true
				await getST2UserList({
					orgUserGuid: this.row.orgUserId,
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
							this.oldUserId = data[0].userId
						} else {
							this.tableData = []
							this.oldUserId = ''
						}
						this.searchResult = this.tableData.length
						this.pageTotal = this.tableData.length > 0 ? (this.page - 1) * 20 + 21 : (this.page -
							1) * 20 + 1
					}
				})
			}
		},
		created() {
			this.getST2UserList()
		}
	};
</script>

<style lang="scss" scoped>
</style>
