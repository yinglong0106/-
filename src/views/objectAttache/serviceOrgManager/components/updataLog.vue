<template>
	<el-dialog title="手机号更新记录" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
		<div style="padding-bottom: 60px;">
			<el-row class="mt20 flex flex-center mb20">
				<div style="flex-shrink: 0;margin-right: 20px;">服务机构</div>
				<div>{{row.seorgName}}</div>
			</el-row>
			<el-row class="mb20">
				<div style="background: #F2F2F2;padding: 10px;">更新记录</div>
			</el-row>
			<el-table :data="tableData" border v-loading="loading">
				<el-table-column type="index" align="center"></el-table-column>
				<el-table-column prop="createTime" label="更新日期" align="center"></el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-button type="text" @click="toDetail(scope.row)">详情</el-button>

					</template>
				</el-table-column>
			</el-table>
		</div>
		<pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
		<logDetail v-if="isDetail" @close="closeDetail" :row="row" :openRow="openRow"></logDetail>
	</el-dialog>
</template>

<script>
	import {
		getLogList
	} from '@/api/objectAttacheApi/serviceOrgManager.js'
	import logDetail from '@/views/objectAttache/serviceOrgManager/components/logDetail.vue'
	import pages from '@/views/components/common/pages'
	export default {
		name: "index",
		components: {
			pages,
			logDetail
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
				tableData: [],
				page: 1,
				pageTotal: 0,
				isDetail: false,
				openRow: {},
				loading: false,
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
			toDetail(row) {
				this.isDetail = true
				this.openRow = row
			},
			closeDetail() {
				this.isDetail = false
			},
			changePage(page) {
				this.page = page
				this.getLogList()
			},
			async getLogList() {
				this.loading = true
				await getLogList({
					seorgGuid: this.row.seorgGuid,
					curUserId: this.$store.state.user.adminId,
					size: '20',
					page: this.page,
				}).then(res => {
					this.loading = false
					if (res.OK == 'True') {
						if (res.Tag.length) {
							let data = res.Tag[0].Table
							this.tableData = data
						} else {
							this.tableData = []
						}
						this.pageTotal = this.tableData.length > 0 ? (this.page - 1) * 20 + 21 : (this.page -
							1) * 20 + 1
					}
				})
			}
		},
		created() {
			this.getLogList()
		}
	};
</script>

<style lang="scss" scoped>
</style>
