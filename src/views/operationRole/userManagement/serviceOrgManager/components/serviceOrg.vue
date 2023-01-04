<template>
	<el-dialog title="服务机构团队" :visible.sync="isOpen" width="1000px" @close="beforeClose" append-to-body>
		<div style="padding-bottom: 60px;">
			<el-row class="mt20 pb20 flex flex-center">
				<div style="flex-shrink: 0;margin-right: 20px;">机构名称</div>
				<div>{{row.seorgName}}</div>
			</el-row>
			<el-row class="mt20 pb20 flex flex-center">
				<div style="flex-shrink: 0;margin-right: 20px;">账号创建日期</div>
				<div>{{row.createTime}}</div>
			</el-row>
			<el-divider></el-divider>
			<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
				<el-tab-pane label="服务专员团队" name="first">
					<div class="flex jsb flex-center">
						<searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的电话号码'>
						</searchCom>
					</div>
					<el-table :data="tableData" border v-loading="loading">
						<el-table-column prop="userName" label="姓名" align="center"></el-table-column>
						<el-table-column prop="nation" label="国家/区号" align="center"></el-table-column>
						<el-table-column prop="phonenumber" label="联系电话" align="center"></el-table-column>
						<el-table-column prop="openingTime" label="账号创建日期" align="center"></el-table-column>
						<el-table-column prop="relateTime" label="加入日期" align="center"></el-table-column>
					</el-table>
				</el-tab-pane>
				<el-tab-pane label="供应专员团队" name="second">
					<div class="flex jsb flex-center">
						<searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的电话号码'>
						</searchCom>
					</div>
					<el-table :data="tableData" border v-loading="loading">
						<el-table-column prop="userName" label="账号名称" align="center"></el-table-column>
						<el-table-column prop="openingTime" label="账号创建日期" align="center"></el-table-column>
						<el-table-column prop="nickName" label="姓名" align="center"></el-table-column>
						<el-table-column prop="nation" label="国家/区号" align="center"></el-table-column>
						<el-table-column prop="phonenumber" label="联系电话" align="center"></el-table-column>
						<el-table-column prop="relateTime" label="关联日期" align="center"></el-table-column>
					</el-table>
				</el-tab-pane>
			</el-tabs>

			<!-- <pages @changePage="changePage" :total="pageTotal" :page="page"></pages> -->
		</div>
	</el-dialog>
</template>

<script>
	import pages from '@/views/components/common/pages'
	import searchCom from '@/views/components/common/searchCom.vue'
	import {
		getST1NoKpiList,
		getST2NoKpiList,
	} from "@/api/operationRoleApi/serviceOrgManager.js"
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
				openRow: {},
				page: 1,
				pageTotal: 0,
				searchResult: 0,
				searchVal: '',
				activeName: 'first'
			};
		},
		methods: {
			handleClick(tab, event) {
				console.log(tab, event);
				this.page = 1
				this.searchVal = ''
			},
			close() {
				this.isOpen = false
				this.$emit('close')
			},
			beforeClose() {
				this.close()
			},
			handleClick(tab, event) {
				this.getData()
			},
			search(data) {
				this.searchVal = data
				this.page = 1
				this.getData()
				//
			},
			changePage(page) {
				this.page = page
				this.getData()
				//
			},
			getData() {
				if (this.activeName == 'first') {
					this.getST1NoKpiList()
				} else if (this.activeName == 'second') {
					this.getST2NoKpiList()
				}
			},
			async getST1NoKpiList() {
				this.loading = true
				await getST1NoKpiList({
					phonenumber: this.searchVal,
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
			},
			async getST2NoKpiList() {
				this.loading = true
				await getST2NoKpiList({
					phonenumber: this.searchVal,
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
			this.getData()
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
