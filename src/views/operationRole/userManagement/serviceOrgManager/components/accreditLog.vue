<template>
	<el-dialog title="授权品类更新记录" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
		<div style="padding-bottom: 40px;">
			<el-row class="mt20 pb20 flex flex-center">
				<div style="flex-shrink: 0;margin-right: 20px;">服务机构</div>
				<div>{{row.seorgName}}</div>
			</el-row>
			<el-row class="mb20">
				<div style="background: #F2F2F2;padding: 10px;">更新记录</div>
			</el-row>
			<el-row>
				<searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的品类名称'></searchCom>
				<el-table :data="tableData" border>
					<el-table-column prop="categoryName" label="品类名称" align="center"></el-table-column>
					<el-table-column prop="cattypeName" label="品类类型" align="center"></el-table-column>
					<el-table-column prop="statusStr" label="授权状态" align="center"></el-table-column>
					<el-table-column prop="operaTime" label="日期" align="center"></el-table-column>
				</el-table>
			</el-row>
		</div>
	</el-dialog>
</template>

<script>
	import searchCom from '@/views/components/common/searchCom.vue'
	import {
		getCatLogList,
	} from "@/api/operationRoleApi/serviceOrgManager.js"
	export default {
		name: "index",
		components: {
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
				this.getCatLogList()
				//
			},
			async getCatLogList() {
				await getCatLogList({
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
			this.getCatLogList()
		}
	};
</script>

<style lang="scss" scoped>
</style>
