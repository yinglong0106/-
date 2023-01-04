<template>
	<el-dialog title="服务机构结算管理" :visible.sync="isOpen" width="900px" @close="beforeClose">
		<el-row class="mb20 flex flex-center">
			<div class="bold label">年份</div>
			<div>{{row.year}}</div>
		</el-row>
		<el-row class="mb20 flex">
			<div class="bold label">计酬月份</div>
			<div>{{row.month}}</div>
		</el-row>
		<el-row class="mb20 flex">
			<div class="bold label">采购服务费用</div>
			<div>{{row.money}}</div>
		</el-row>
		<div class="flex flex-center jsb">
			<el-row class="flex flex-center mb10">
				<el-input placeholder="请输入你要找的机构名称" clearable v-model="searchVal" @keyup.enter.native="search"
					style="width: 300px;margin-right: 20px;" @clear="clearSearch">
					<i class="el-icon-search el-input__icon" slot="suffix" @click="search" />
				</el-input>
				<div class="" v-if="searchVal">搜索结果</div>
			</el-row>
			<el-button @click="exportFile" type="primary">导出列表</el-button>
		</div>
		<el-row style="padding-bottom: 60px;">
			<el-table :data="tableData" border height="50vh" v-loading="loading">
				<el-table-column prop="seorgName" label="机构名称" align="center">
				</el-table-column>
				<el-table-column prop="registerTime" label="账号创建日期" align="center" width="140">
				</el-table-column>
				<el-table-column prop="SettlementTime" label="计酬月份" align="center" width="100">
				</el-table-column>
				<el-table-column prop="demandMoney" label="采购对接采购服务费用" align="center" width="160">
				</el-table-column>
				<el-table-column prop="supplyMoney" label="供应对接采购服务费用" align="center" width="160">
				</el-table-column>
			</el-table>
		</el-row>
		<pages :total="pageTotal" @changePage="changePage" :page="page"></pages>

	</el-dialog>
</template>

<script>
	import pages from '@/views/components/common/pages'
	import {
		SumByYMOfSeorgList,
		exportMonthDetailList
	} from '@/api/settleRoleApi/serviceOrgSettlement.js'
	export default {
		name: "index",
		components: {
			pages
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
				searchVal: '',
				searchResult: 0,
				tableData: [],
				page: 1,
				pageTotal: 20,
				loading: false,
				openRow: {},
				downloadFileUrl: process.env.VUE_APP_BASE_URL_ASSETS + "/Enclosure/", // 下载模板地址
				timeStr: ''
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
			search() {
				this.page = 1
				this.SumByYMOfSeorgList()
			},
			clearSearch() {
				this.searchVal = ''
				this.search()
			},
			changePage(page) {
				this.page = page
				this.SumByYMOfSeorgList()
			},
			exportFile() {
				this.timeStr = this.GetCurrentTimeStr()
				this.exportMonthDetailList()
			},
			async exportMonthDetailList() {
				this.loading = true
				await exportMonthDetailList({
					year: this.row.year,
					month: this.row.month,
					seorgName: this.searchVal,
					OutputFileName: 'order' + this.timeStr + '.csv',
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					this.loading = false
					this.downFile()
				})
			},
			// 下载文件
			downFile() {
				let fileUrl = this.downloadFileUrl + 'order' + this.timeStr + '.csv'
				console.log(fileUrl);
				window.location.href = fileUrl
				
			},
			async SumByYMOfSeorgList() {
				this.loading = true
				await SumByYMOfSeorgList({
					year: this.row.year,
					month: this.row.month,
					seorgName: this.searchVal,
					size: '20',
					page: this.page,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					this.loading = false
					console.log(res);
					if (res.Tag.length) {
						this.tableData = res.Tag[0].Table
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
			this.SumByYMOfSeorgList()
		}
	};
</script>

<style lang="scss" scoped>
	.label {
		width: 120px;
	}

	.my-label {
		text-align: center !important;
		background-color: #1890FF;
	}
</style>
