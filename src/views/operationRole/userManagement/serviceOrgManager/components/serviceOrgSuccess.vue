<template>
	<el-dialog title="服务机构成果" :visible.sync="isOpen" width="1000px" @close="beforeClose" append-to-body>
		<div style="padding-bottom: 60px;">
			<el-table :data="tableDataFirst" border class="mb20">
				<el-table-column prop="seorgName" label="机构名称" align="center"></el-table-column>
				<el-table-column prop="createTime" label="账号开通日期" align="center"></el-table-column>
			</el-table>
			<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
				<el-tab-pane label="采购对接成果" name="first">
					<div class="flex flex-center mb20">
						<div class="title-bg1">采购订单验收通过数量</div>
						<div class="ml0">展示有哪些服务专员关联过这个服务机构且统计为服务机构在采购对接这块带来多少业绩</div>
					</div>
					<div class="flex jsb flex-center">
						<searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的姓名或者联系电话'>
						</searchCom>
					</div>
					<el-table :data="tableData" border v-loading="loading">
						<el-table-column prop="userName" label="姓名" align="center"></el-table-column>
						<el-table-column prop="nation" label="国家/区号" align="center"></el-table-column>
						<el-table-column prop="phonenumber" label="联系电话" align="center"></el-table-column>
						<el-table-column prop="openingTime" label="账号开通日期" align="center"></el-table-column>
						<el-table-column prop="orderNum" label="采购订单验收通过数量" align="center"></el-table-column>
					</el-table>
				</el-tab-pane>
				<el-tab-pane label="供应对接成果" name="second">
					<div class="flex flex-center mb20">
						<div class="title-bg1">采购订单验收通过数量</div>
						<div class="ml0">展示有哪些供应专员关联过这个服务机构且统计为服务机构在供应对接这块带来多少业绩</div>
					</div>
					<div class="flex jsb flex-center">
						<searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的姓名或者联系电话'>
						</searchCom>
					</div>
					<el-table :data="tableData" border v-loading="loading">
						<el-table-column prop="userName" label="账号名称" align="center"></el-table-column>
						<el-table-column prop="openingTime" label="账号开通日期" align="center"></el-table-column>
						<el-table-column prop="nickName" label="姓名" align="center"></el-table-column>
						<el-table-column prop="nation" label="国家/区号" align="center"></el-table-column>
						<el-table-column prop="phonenumber" label="联系电话" align="center"></el-table-column>
						<el-table-column prop="orderNum" label="采购订单验收通过数量" align="center"></el-table-column>
					</el-table>
				</el-tab-pane>
			</el-tabs>

			<pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
		</div>
	</el-dialog>
</template>

<script>
	import pages from '@/views/components/common/pages'
	import searchCom from '@/views/components/common/searchCom.vue'
	import {
		getST1WithKpiList,
		getST2WithKpiList
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
				tableDataFirst: [],
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
					this.getST1WithKpiList()
				} else if (this.activeName == 'second') {
					this.getST2WithKpiList()
				}
			},
			async getST1WithKpiList() {
				this.loading = true
				await getST1WithKpiList({
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
			async getST2WithKpiList() {
				this.loading = true
				await getST2WithKpiList({
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
		},
		created() {
			this.getData()
			this.tableDataFirst.push(this.row)
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
