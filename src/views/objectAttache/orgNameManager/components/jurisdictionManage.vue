<template>
	<el-dialog title="系统登录权限管理" :visible.sync="isOpen" width="700px" @close="beforeClose">
		<div style="padding-bottom: 60px;" v-loading="loading">
			<el-row class="mt20 pb20 flex flex-center">
				<div style="flex-shrink: 0;margin-right: 20px;">供应机构</div>
				<div>{{row.orgName}}</div>
			</el-row>
			<div class="title-bg1">供应机构有系统登录权限后，才能用【机构名称+登录手机号+手机验证码】登录这个授权的系统，进行供应管理</div>
			<el-row class="mb20">
				<el-button type="primary" @click="openAccreditCategory">授权登录系统</el-button>
				<!-- <el-button type="primary" @click="openAccreditLog">授权登录系统更新记录</el-button>
				<el-button type="primary" @click="openDelAccredit">批量解除授权</el-button> -->
			</el-row>
			<searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的登录系统'></searchCom>
			<el-row>
				<el-table :data="tableData" border>
					<el-table-column prop="loginSysName" label="登录系统" align="center" ></el-table-column>
					<el-table-column prop="authorizationTime" label="授权日期" align="center" width="160"></el-table-column>
				</el-table>
			</el-row>
			<!-- <pages @changePage="changePage" :total="pageTotal" :page="page"></pages> -->
			<accreditLogin v-if="isAccredit" @close="closeAccreditCategory" @refresh="getValidListByUid" :row="row"></accreditLogin>
			<accreditLog v-if="isLog" @close="closeAccreditLog" @refresh="getValidListByUid" :row="row"></accreditLog>
			<batchCancelAccredit v-if="isDel" @close="closeDelAccredit" @refresh="getValidListByUid" :row="row"></batchCancelAccredit>
		</div>
	</el-dialog>
</template>

<script>
	import accreditLogin from '@/views/objectAttache/orgNameManager/components/accreditLogin'
	import accreditLog from '@/views/objectAttache/orgNameManager/components/accreditLog'
	import batchCancelAccredit from '@/views/objectAttache/orgNameManager/components/batchCancelAccredit'
	import searchCom from '@/views/components/common/searchCom.vue'
	import pages from '@/views/components/common/pages'
	import {
		getValidListByUid,
	} from '@/api/objectAttacheApi/objectAttache.js'
	export default {
		name: "index",
		components: {
			accreditLogin,
			accreditLog,
			batchCancelAccredit,
			searchCom,
			pages
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
				isAccredit: false,
				isDel: false,
				isLog: false,
				searchResult: 0,
				searchVal: '',
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
				this.getValidListByUid()
				//
			},
			changePage(page) {
				this.page = page
				this.getValidListByUid()
			},
			openAccreditCategory(row) {
				this.openRow = row
				this.isAccredit = true
			},
			closeAccreditCategory() {
				this.isAccredit = false
			},
			openAccreditLog(row) {
				this.openRow = row
				this.isLog = true
			},
			closeAccreditLog() {
				this.isLog = false
			},
			openDelAccredit(row) {
				this.openRow = row
				this.isDel = true
			},
			closeDelAccredit() {
				this.isDel = false
			},
			async getValidListByUid() {
				this.loading = true
				await getValidListByUid({
					orgUserId: this.row.orgUserId,
					curUserId: this.$store.state.user.adminId,
					lgSysName: this.searchVal
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
			this.getValidListByUid()
		}
	};
</script>

<style lang="scss" scoped>
	.title-bg1 {
		padding: 10px 0;
		background-color: #D7D7D7;
		margin-bottom: 20px;
		margin-right: 10px;
	}
</style>
