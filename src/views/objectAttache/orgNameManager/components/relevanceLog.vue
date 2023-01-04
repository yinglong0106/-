<template>
	<el-dialog title="供应专员关联记录" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
		<div style="padding-bottom: 60px;">
			<el-row class="mt20 pb20 flex flex-center">
				<div style="flex-shrink: 0;margin-right: 20px;">机构名称</div>
				<div>{{row.orgName}}</div>
			</el-row>
			<el-row class="mb20">
				<div style="background: #F2F2F2;padding: 10px;">更新记录</div>
			</el-row>
			<el-row>
				<el-table :data="tableData" border v-loading="loading">
					<el-table-column prop="updateTime" label="更新日期" align="center" width="160"></el-table-column>
					<el-table-column prop="userName" label="账号名称" align="center" width="120"></el-table-column>
					<el-table-column prop="registerTime" label="账号创建日期" align="center" width="160"></el-table-column>
					<el-table-column prop="nickName" label="姓名" align="center" width="120"></el-table-column>
					<el-table-column prop="nation" label="国家/区号" align="center" width="120"></el-table-column>
					<el-table-column prop="phonenumber" label="联系电话" align="center" width="120"></el-table-column>
					<el-table-column prop="seorgName" label="所在服务机构" align="center" width="160"></el-table-column>
					<el-table-column prop="seorgCreateTime" label="所在服务机构账号创建日期" align="center" width="160"></el-table-column>
				</el-table>
			</el-row>
			<pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
		</div>
	</el-dialog>
</template>

<script>
	import {
		getST2LogListByorgGuid
	} from '@/api/objectAttacheApi/objectAttache.js'
	import pages from '@/views/components/common/pages'
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
			},
		},
		data() {
			return {
				isOpen: true,
				loading: false,
				tableData: [],
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
			changePage(page) {
				this.page = page
				this.getST2LogListByorgGuid()
			},
			async getST2LogListByorgGuid() {
				this.loading = true
				await getST2LogListByorgGuid({
					orgUserGuid: this.row.orgUserId,
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
			this.getST2LogListByorgGuid()
		}
	};
</script>

<style lang="scss" scoped>
</style>
