<template>
	<el-dialog title="服务专员成果" :visible.sync="isOpen" width="1000px" @close="beforeClose" append-to-body>
		<div style="padding-bottom: 60px;">
			<el-table :data="tableDataFirst" border class="mb20">
				<el-table-column prop="userName" label="姓名" align="center"></el-table-column>
				<el-table-column prop="nation" label="国家/地区" align="center"></el-table-column>
				<el-table-column prop="phonenumber" label="联系电话" align="center"></el-table-column>
				<el-table-column prop="registerTime" label="账号开通日期" align="center" width="160"></el-table-column>
			</el-table>
			<div class="flex flex-center mb20">
				<div class="title-bg1">采购订单验收通过数量</div>
				<div class="ml0">展示这个服务专员领取过哪些服务对象且统计每个服务对象给这个服务专员带来多少业绩</div>
			</div>
			<searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的姓名或者联系电话'></searchCom>
			<el-table :data="tableData" border v-loading="loading">
				<el-table-column prop="userName" label="姓名" align="center"></el-table-column>
				<el-table-column prop="nation" label="国家/区号" align="center"></el-table-column>
				<el-table-column prop="phonenumber" label="联系电话" align="center"></el-table-column>
				<el-table-column prop="registerTime" label="账号开通日期" align="center"></el-table-column>
				<el-table-column prop="acceptOrderNum" label="采购订单验收通过数量" align="center"></el-table-column>
			</el-table>

			<pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
		</div>
	</el-dialog>
</template>

<script>
	import pages from '@/views/components/common/pages'
	import searchCom from '@/views/components/common/searchCom.vue'
	import {
		getGainFlag1UserKpiList
	} from "@/api/operationRoleApi/serviceAttachNew.js"
	import { getRoleUserDetail } from '@/api/operationRoleApi/userManagement.js'
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
				this.getGainFlag1UserKpiList()
				//
			},
			changePage(page) {
				this.page = page
				this.getGainFlag1UserKpiList()
				//
			},
			async getGainFlag1UserKpiList() {
				this.loading = true
				await getGainFlag1UserKpiList({
					phonenumber: this.searchVal,
					page: this.page,
					size: '20',
					staffST1UserId: this.row.userId,
					curUserId: this.$store.state.user.adminId,
				}).then((res) => {
					this.loading = false
					if (res.Tag.length) {
						let data = res.Tag[0].Table
						this.tableData = data
						this.pageTotal = (this.page - 1) * 20 + 21
					} else {
						this.tableData = []
						this.pageTotal = (this.page - 1) * 20 + 1
					}
					this.searchResult = this.tableData.length
				})
			},
		},
		created() {
			// this.getRoleUserDetail()
			this.tableDataFirst.push(this.row)
			this.getGainFlag1UserKpiList()
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
