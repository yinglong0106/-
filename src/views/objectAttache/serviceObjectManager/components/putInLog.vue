<template>
	<el-dialog title="投放记录" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
		<div style="padding-bottom: 40px;" v-loading="loading">
			<el-row class="mt20 pb20 flex flex-center">
				<div style="flex-shrink: 0;margin-right: 20px;">品类类型</div>
				<div>{{row.cattypeName}}</div>
			</el-row>
			<el-row class="mb20">
				<div style="background: #F2F2F2;padding: 10px;">投放记录</div>
			</el-row>
			<el-row>
				<el-table :data="tableData" border>
					<el-table-column type="index" width="50" label="序号"></el-table-column>
					<el-table-column prop="operaTime" label="投放日期" align="center"></el-table-column>
					<el-table-column prop="realNum" label="投放数量" align="center"></el-table-column>
				</el-table>
			</el-row>
		</div>
	</el-dialog>
</template>

<script>
	import {
		getFreeLogList
	} from '@/api/objectAttacheApi/serviceObjectManager.js'
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
			async getFreeLogList() {
				this.loading = true
				await getFreeLogList({
					cattypeGuid: this.row.cattypeGuid,
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
			this.getFreeLogList()
		}
	};
</script>

<style lang="scss" scoped>
</style>
