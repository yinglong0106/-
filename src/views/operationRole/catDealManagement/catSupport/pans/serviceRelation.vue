<template>
	<el-dialog title="查看服务组织关联关系" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
		<div style="padding-bottom: 40px;" v-loading="loading">
			<el-row class="mt20 flex flex-center">
				<div style="flex-shrink: 0;margin-right: 20px;width: 120px;">品类类型</div>
				<div>{{row.cattypeName}}</div>
			</el-row>
			<el-row class="mt20 flex flex-center">
				<div style="flex-shrink: 0;margin-right: 20px;width: 120px;">品类名称</div>
				<div>{{row.categoryName}}</div>
			</el-row>
			<el-row class="mt20 flex flex-center">
				<div style="flex-shrink: 0;margin-right: 20px;width: 120px;">服务机构名称</div>
				<div>{{orgRow.seorgName}}</div>
			</el-row>
			<el-row class="mt20 pb20 flex flex-center">
				<div style="flex-shrink: 0;margin-right: 20px;width: 120px;">账号创建日期</div>
				<div>{{orgRow.registerTime}}</div>
			</el-row>
			<el-row class="mb20">
				<div style="background: #F2F2F2;padding: 10px;">招募专员信息</div>
			</el-row>
			<el-row class="mt20 flex flex-center">
				<div style="flex-shrink: 0;margin-right: 20px;width: 120px;">账号名称</div>
				<div>{{tableData.userName}}</div>
			</el-row>
			<el-row class="mt20 flex flex-center">
				<div style="flex-shrink: 0;margin-right: 20px;width: 120px;">账号开通日期</div>
				<div>{{tableData.registerTime}}</div>
			</el-row>
			<el-row class="mt20 flex flex-center">
				<div style="flex-shrink: 0;margin-right: 20px;width: 120px;">姓名</div>
				<div>{{tableData.nickName}}</div>
			</el-row>
			<el-row class="mt20 flex flex-center">
				<div style="flex-shrink: 0;margin-right: 20px;width: 120px;">国家/区号</div>
				<div>{{tableData.nation}}</div>
			</el-row>
			<el-row class="mt20 pb20 flex flex-center">
				<div style="flex-shrink: 0;margin-right: 20px;width: 120px;">联系电话</div>
				<div>{{tableData.phonenumber}}</div>
			</el-row>
		</div>
	</el-dialog>
</template>

<script>
	import {
		getST3UserList
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
			orgRow: {
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
				tableData: {}
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
			async getST3UserList() {
				this.loading = true
				await getST3UserList({
					seorgGuid: this.orgRow.seorgGuid,
					size: '200',
					page: 1,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					this.loading = false
					if (res.OK == 'True') {
					
						console.log(res);
						if (res.Tag.length > 0) {
							let data = res.Tag[0].Table[0]
							this.tableData = data
						}
					}
				})
			}
			
		},
		created() {
			this.getST3UserList()
		}
	};
</script>

<style lang="scss" scoped>
</style>