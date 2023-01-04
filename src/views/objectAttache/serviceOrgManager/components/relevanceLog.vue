<template>
	<el-dialog title="招募专员关联记录" :visible.sync="isOpen" width="900px" @close="beforeClose" append-to-body>
		<div style="padding-bottom: 40px;" v-loading="loading">
			<el-row class="mt20 pb20 flex flex-center">
				<div style="flex-shrink: 0;margin-right: 20px;">服务机构</div>
				<div>{{row.seorgName}}</div>
			</el-row>
			<el-row class="mb20">
				<div style="background: #F2F2F2;padding: 10px;">更新记录</div>
			</el-row>
			<el-row>
				<el-table :data="tableData" border>
					<el-table-column prop="updateTime" label="更新日期" align="center" width="160"></el-table-column>
					<el-table-column prop="userName" label="账号名称" align="center"></el-table-column>
					<el-table-column prop="registerTime" label="账号创建日期" align="center" width="160"></el-table-column>
					<el-table-column prop="nickName" label="姓名" align="center"></el-table-column>
					<el-table-column prop="nation" label="国家/区号" align="center"></el-table-column>
					<el-table-column prop="phonenumber" label="联系电话" align="center"></el-table-column>
				</el-table>
			</el-row>
		</div>
	</el-dialog>
</template>

<script>
	import {
		getST3LogListBySeorgGuid
	} from '@/api/objectAttacheApi/serviceOrgManager.js'
	export default {
		name: "index",
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
				tableData: []
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
			async getST3LogListBySeorgGuid() {
				this.loading = true
				await getST3LogListBySeorgGuid({
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
					}
				})
			}
		},
		created() {
			this.getST3LogListBySeorgGuid()
		}
	};
</script>

<style lang="scss" scoped>
</style>
