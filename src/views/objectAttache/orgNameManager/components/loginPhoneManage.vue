<template>
	<el-dialog title="登录手机号管理" :visible.sync="isOpen" width="700px" @close="beforeClose">
		<div style="padding-bottom: 40px;" v-loading="loading">
			<el-row class="mt20 pb20 flex flex-center">
				<div style="flex-shrink: 0;margin-right: 20px;">机构名称</div>
				<div>{{row.orgName}}</div>
			</el-row>
			<el-row class="mb20">
				<div style="background: #F2F2F2;padding: 10px;">供应机构通过【机构名称+登录手机号+手机号验证码】方式登录，系统直接给机构设置登录手机号。</div>
			</el-row>
			<el-row class="mb20">
				<el-button type="primary" @click="openNewLoginPhone">创建登录手机号</el-button>
				<el-button type="primary" @click="openUpdataLog">手机号更新记录</el-button>
			</el-row>
			<el-row>
				<el-table :data="tableData" border v-loading="loading">
					<el-table-column prop="nation" label="国家/ 区号" align="center"></el-table-column>
					<el-table-column prop="phonenumber" label="手机号" align="center"></el-table-column>
					<el-table-column prop="createTime" label="创建日期" align="center"></el-table-column>
				</el-table>
			</el-row>

			<newLoginPhone v-if="isNew" @close="closeNewLoginPhone" :row="row" @refresh="getCurPhone"></newLoginPhone>
			<updataLog v-if="isLog" @close="closeUpdataLog" :row="row" @refresh="getCurPhone"></updataLog>
		</div>
	</el-dialog>
</template>

<script>
	import newLoginPhone from '@/views/objectAttache/orgNameManager/components/newLoginPhone.vue'
	import updataLog from '@/views/objectAttache/orgNameManager/components/updataLog.vue'
	import {
		getCurPhone
	} from '@/api/objectAttacheApi/objectAttache.js'
	export default {
		name: "index",
		components: {
			newLoginPhone,
			updataLog
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
				isNew: false,
				isLog: false,
				loading: false,
				tableData: []
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
			openNewLoginPhone() {
				this.isNew = true
			},
			closeNewLoginPhone() {
				this.isNew = false
			},
			openUpdataLog() {
				this.isLog = true
			},
			closeUpdataLog() {
				this.isLog = false
			},
			
			async getCurPhone() {
				this.loading = true
				await getCurPhone({
					orgGuid: this.row.orgGuid,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					this.loading = false
					if(res.OK == 'True') {
						if (res.Tag.length) {
							let data = res.Tag[0].Table
							this.tableData = data
						} else {
							this.tableData = []
						}
					}
				})
			}
		},
		created() {
			this.getCurPhone()
		}
	};
</script>

<style lang="scss" scoped>
</style>
