<template>
	<el-dialog title="机构品类权限管理" :visible.sync="isOpen" width="700px" @close="beforeClose">
		<div style="padding-bottom: 60px;" v-loading="loading">
			<el-row class="mt20 pb20 flex flex-center">
				<div style="flex-shrink: 0;margin-right: 20px;">服务机构</div>
				<div>{{row.seorgName}}</div>
			</el-row>
			<div class="title-bg1">服务机构需要有品类权限后，其名下的服务专员才能开展工作。若收回全部品类授权，则机构名下服务专员已绑定的服务对象全部绑。</div>
			<el-row class="mb20">
				<el-button type="primary" @click="openAccreditCategory">授权品类</el-button>
				<el-button type="primary" @click="openAccreditLog">授权品类更新记录</el-button>
				<el-button type="primary" @click="openDelAccredit">批量解除授权</el-button>
			</el-row>
			<searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的品类名称'></searchCom>
			<el-row>
				<el-table :data="tableData" border>
					<el-table-column prop="categoryName" label="品类名称" align="center" ></el-table-column>
					<el-table-column prop="cattypeName" label="品类类型" align="center" width="160"></el-table-column>
					<el-table-column prop="grantTime" label="授权日期" align="center" width="160"></el-table-column>
				</el-table>
			</el-row>
			<pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
			<accreditCategory v-if="isAccredit" @close="closeAccreditCategory" @refresh="getValidCatList" :row="row"></accreditCategory>
			<accreditLog v-if="isLog" @close="closeAccreditLog" @refresh="getValidCatList" :row="row"></accreditLog>
			<batchCancelAccredit v-if="isDel" @close="closeDelAccredit" @refresh="getValidCatList" :row="row"></batchCancelAccredit>
		</div>
	</el-dialog>
</template>

<script>
	import accreditCategory from '@/views/objectAttache/serviceOrgManager/components/accreditCategory'
	import accreditLog from '@/views/objectAttache/serviceOrgManager/components/accreditLog'
	import batchCancelAccredit from '@/views/objectAttache/serviceOrgManager/components/batchCancelAccredit'
	import searchCom from '@/views/components/common/searchCom.vue'
	import pages from '@/views/components/common/pages'
	import {
		getValidCatList
	} from '@/api/objectAttacheApi/serviceOrgManager.js'
	export default {
		name: "index",
		components: {
			accreditCategory,
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
				this.getValidCatList()
				//
			},
			changePage(page) {
				this.page = page
				this.getValidCatList()
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
			async getValidCatList() {
				this.loading = true
				await getValidCatList({
					categoryName: this.searchVal,
					seorgGuid: this.row.seorgGuid,
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
			}
		},
		created() {
			this.getValidCatList()
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
