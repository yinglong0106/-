<template>
	<el-dialog title="机构品类权限" :visible.sync="isOpen" width="700px" @close="beforeClose">
		<div style="padding-bottom: 40px;" v-loading="loading">
			<el-row class="mt20 pb20 flex flex-center">
				<div style="flex-shrink: 0;margin-right: 20px;">服务机构</div>
				<div>{{row.seorgName}}</div>
			</el-row>
			<div class="title-bg1">系统将品类类型下的品类授权给服务机构后，服务机构的服务专员才能领取各个品类类型下的服务对象，才能开展工作。若服务机构无任一品类类型下的品类授权，则服务专员对应品类类型下的权限服务对象将被回收。</div>
			<div class="flex flex-center jsb">
				<searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的品类名称'></searchCom>
				<el-button class="mb20" type="primary" @click="openAccreditLog">授权品类更新记录</el-button>
			</div>
			
			<el-row>
				<el-table :data="tableData" border>
					<el-table-column prop="categoryName" label="品类名称" align="center"></el-table-column>
					<el-table-column prop="cattypeName" label="品类类型" align="center"></el-table-column>
					<el-table-column prop="grantTime" label="授权日期" align="center"></el-table-column>
				</el-table>
			</el-row>
			<accreditLog v-if="isLog" @close="closeAccreditLog" @refresh="" :row="row"></accreditLog>
		</div>
	</el-dialog>
</template>

<script>
	import accreditLog from '@/views/operationRole/userManagement/serviceOrgManager/components/accreditLog'
	import searchCom from '@/views/components/common/searchCom.vue'
	import {
		getValidCatList,
	} from "@/api/operationRoleApi/serviceOrgManager.js"
	export default {
		name: "index",
		components: {
			accreditLog,
			searchCom
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
				this.getValidCatList()
				//
			},
			openAccreditLog(row) {
				this.openRow = row
				this.isLog = true
			},
			closeAccreditLog() {
				this.isLog = false
			},
			async getValidCatList() {
				this.loading = true
				await getValidCatList({
					categoryName: this.searchVal,
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
