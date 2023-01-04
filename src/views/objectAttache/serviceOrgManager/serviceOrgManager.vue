<template>
	<div class="app-container">
		<div class="flex jsb flex-center">
			<searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的机构名称'></searchCom>
			<div class="mb20">
				<el-button type="primary" @click="openNew">创建服务机构账号</el-button>
			</div>
		</div>
		<el-table :data="tableData" border v-loading="loading">
			<el-table-column prop="seorgName" label="机构名称" align="center"></el-table-column>
			<el-table-column prop="seorgCode" label="机构专属码" align="center" width="180"></el-table-column>
			<el-table-column prop="createTime" label="账号创建日期" align="center" width="180"></el-table-column>
			<el-table-column label="操作" align="center" width="180">
				<template slot-scope="scope">
					<el-row>
						<el-button type="text" @click="editOrg(scope.row)">编辑机构名称</el-button>
					</el-row>
					<el-row>
						<el-button type="text" @click="delOrg(scope.row)">删除机构名称</el-button>
					</el-row>
					<!-- <el-row>
						<el-button type="text" @click="toRegisterVerify(scope.row)">注册验证号码管理</el-button>
					</el-row> -->
					<el-row>
						<el-button type="text" @click="toLoginPhoneManage(scope.row)">登录手机号管理</el-button>
					</el-row>
					<el-row>
						<el-button type="text" @click="openRelevanceSupplyAttach(scope.row)">关联招募专员管理</el-button>
					</el-row>
					<el-row>
						<el-button type="text" @click="openOrgCategoryJurisdiction(scope.row)">机构品类权限管理</el-button>
					</el-row>
					<!-- <el-button type="text" @click="signLog(scope.row)">签约记录管理</el-button> -->

				</template>
			</el-table-column>
		</el-table>
		<pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
		<newOrganization v-if="isNew" @close="closeNew" @refresh="getOrgList" :row="openRow" :pageType="pageType">
		</newOrganization>
		<loginPhoneManage v-if="isPhone" @close="closeLoginPhoneManage" @refresh="getOrgList" :row="openRow">
		</loginPhoneManage>
		<relevanceSupplyAttach v-if="isRelevance" @close="closeRelevance" @refresh="getOrgList" :row="openRow"></relevanceSupplyAttach>
		<orgCategoryJurisdiction v-if="isJurisdiction" @close="closeOrgCategoryJurisdiction" @refresh="getOrgList" :row="openRow"></orgCategoryJurisdiction>
	</div>
</template>

<script>
	import searchCom from '@/views/components/common/searchCom.vue'
	import pages from '@/views/components/common/pages'
	import newOrganization from '@/views/objectAttache/serviceOrgManager/components/newOrg.vue'
	import loginPhoneManage from '@/views/objectAttache/serviceOrgManager/components/loginPhoneManage.vue'
	import relevanceSupplyAttach from '@/views/objectAttache/serviceOrgManager/components/relevanceSupplyAttach.vue'
	import orgCategoryJurisdiction from '@/views/objectAttache/serviceOrgManager/components/orgCategoryJurisdiction'
	import {
		getOrgList,
		deleteOrg
	} from '@/api/objectAttacheApi/serviceOrgManager.js'
	import { pushMessage } from '@/api/commonApi.js'
	export default {
		name: "index",
		components: {
			searchCom,
			pages,
			newOrganization,
			loginPhoneManage,
			relevanceSupplyAttach,
			orgCategoryJurisdiction
		},
		data() {
			return {
				loading: false,
				tableData: [],
				page: 1,
				pageTotal: 0,
				searchResult: 0,
				searchVal: '',
				isNew: false,
				openRow: {},
				pageType: 'new',
				isPhone: false,
				isRelevance: false,
				isJurisdiction: false,
			};
		},
		methods: {
			search(data) {
				this.searchVal = data
				this.page = 1
				this.getOrgList()
			},
			changePage(page) {
				this.page = page
				this.getOrgList()
			},
			openNew() {
				this.isNew = true
				this.openRow = {}
				this.pageType = 'new'
			},
			closeNew() {
				this.isNew = false
			},
			editOrg(row) {
				console.log(row);
				this.openRow = row
				this.isNew = true
				this.pageType = 'edit'
			},
			delOrg(row) {
				let msg = '【' + row.seorgName + '】<br/>删除后；<br/>供应专员的权属供应机构自动解除关联关系；<br/>服务专员的权属服务对象全部收回；<br/>已生成的服务机构、供应专员、服务专员的业绩记录保留。'
				this.$confirm(msg, '提示', {
					confirmButtonText: '确定',
					dangerouslyUseHTMLString: true,
					showCancelButton: true,
					type: 'warning'
				}).then(() => {
					this.deleteOrg(row)
				}).catch(() => {});

				

			},
			toLoginPhoneManage(row) {
				this.openRow = row
				this.isPhone = true
			},
			closeLoginPhoneManage() {
				this.isPhone = false
			},
			openRelevanceSupplyAttach(row) {
				this.openRow = row
				this.isRelevance = true
			},
			closeRelevance() {
				this.isRelevance = false
			},
			openOrgCategoryJurisdiction(row) {
				this.openRow = row
				this.isJurisdiction = true
			},
			closeOrgCategoryJurisdiction() {
				this.isJurisdiction = false
			},
			signLog(row) {
				this.openRow = row
			},
			// 给app推送消息
			async pushMessage(seorgST1UserId,message) {
				await pushMessage(seorgST1UserId,message).then(res=> {
					
				})
			},
			async deleteOrg(row) {
				await deleteOrg({
					seorgGuid: row.seorgGuid,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					if (res.OK == 'True') {
						
						if (res.Tag.length) {
							let data = res.Tag[0].Table
							for(let i in data) {
								let seorgST1UserId = data[i].seorgST1UserId
								let msgType = data[i].msgType
								let content = data[i].content
								let message = 'servicenotice'
								console.log('message',message);
								this.pushMessage(seorgST1UserId,message)
							}
							this.$message({
								type: 'success',
								message: '操作成功!'
							});
							this.getOrgList()
						} else {
							this.$message({
								type: 'success',
								message: '操作成功!'
							});
							this.getOrgList()
						}
					
					}
				})
			},
			async getOrgList() {
				this.loading = true
				await getOrgList({
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
		},
		created() {
			this.getOrgList()
		}
	}
</script>

<style scoped lang="scss">
</style>
