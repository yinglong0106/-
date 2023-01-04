<template>
	<el-dialog title="供应品类添加" :visible.sync="isOpen" width="1000px" @close="beforeClose" append-to-body>
		<div style="padding-bottom: 60px;">
			<el-table :data="tableDataFirst" border class="mb20">
				<el-table-column prop="userName" label="机构名称" align="center"></el-table-column>
				<el-table-column prop="createTime" label="账号开通日期" align="center" ></el-table-column>
			</el-table>
			<div class="flex flex-center mb20">
				<div class="title-bg1">供应品类添加</div>
				<div class="ml0">展示这个供应当前添加的品类</div>
			</div>
			<searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的品类名称'></searchCom>
			<el-table :data="tableData" border v-loading="loading">
				<el-table-column prop="nickName" label="品类名称" align="center"></el-table-column>
				<el-table-column prop="createTime" label="品类类型" align="center"></el-table-column>
			</el-table>

			<pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
		</div>
	</el-dialog>
</template>

<script>
	import pages from '@/views/components/common/pages'
	import searchCom from '@/views/components/common/searchCom.vue'
	import {
		statisticGetAllRegisterDetailListByIntroUserId, // 注册
		statisticGetDeOrderOkNumDetailListByIntroUserId, // 采购
		statisticGetSuOrderOkNumDetailListByIntroUserId, // 供应
	} from '@/api/serviceGovernorApi/serviceGovernorCom.js'
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
					this.statisticGetAllRegisterDetailListByIntroUserId()
				} else if (this.activeName == 'second') {
					this.statisticGetDeOrderOkNumDetailListByIntroUserId()
				} else {
					this.statisticGetSuOrderOkNumDetailListByIntroUserId()
				}
			},
			// 总的招募名单
			async statisticGetAllRegisterDetailListByIntroUserId() {
				this.loading = true
				await statisticGetAllRegisterDetailListByIntroUserId({
					queryFields: this.searchVal,
					introducerUserId: this.row.userId,
					curUserId: this.$store.state.user.adminId,
					size: '20',
					page: this.page
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
			// 已开通
			async statisticGetSuOrderOkNumDetailListByIntroUserId() {
				this.loading = true
				await statisticGetSuOrderOkNumDetailListByIntroUserId({
					queryFields: this.searchVal,
					introducerUserId: this.row.userId,
					curUserId: this.$store.state.user.adminId,
					size: '20',
					page: this.page
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
			// 未开通
			async statisticGetDeOrderOkNumDetailListByIntroUserId() {
				this.loading = true
				await statisticGetDeOrderOkNumDetailListByIntroUserId({
					queryFields: this.searchVal,
					introducerUserId: this.row.userId,
					curUserId: this.$store.state.user.adminId,
					size: '20',
					page: this.page
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
			this.tableDataFirst.push(this.row)
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
