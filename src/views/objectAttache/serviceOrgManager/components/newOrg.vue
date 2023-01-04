<template>
	<el-dialog :title="title" :visible.sync="isOpen" width="700px" @close="beforeClose">
		
		<template v-if="pageType == 'new'">
			<div class="mb20">请输入机构名称（1行1个）</div>
			<el-row class="mt20 pb20 flex flex-center">
				<el-input type="textarea" rows="10" placeholder="请输入" v-model="inputField" clearable></el-input>
			</el-row>
		</template>
		<template v-else>
			<el-row class="mt20 pb20 flex flex-center">
				<div style="flex-shrink: 0;margin-right: 20px;">服务机构</div>
				<el-input placeholder="请输入机构名称" v-model="inputField" clearable></el-input>
			</el-row>
		</template>
		<!-- <el-row class="mt20 pb20 flex flex-center">
			<div style="flex-shrink: 0;margin-right: 20px;">签约主体</div>
			<div>
				<el-radio v-model="radio" label="1">机构</el-radio>
				<el-radio v-model="radio" label="2">个人</el-radio>
			</div>
		</el-row> -->
		<span slot="footer" class="dialog-footer">
			<el-button @click="close">取 消</el-button>
			<el-button type="primary" @click="submitNew" :disabled="!inputField.trim()">保存</el-button>
		</span>
	</el-dialog>
</template>

<script>
	import {
		insertOrg,
		updateOrg
	} from '@/api/objectAttacheApi/serviceOrgManager.js'
	export default {
		name: "index",
		props: {
			pageType: {
				type: String,
				default: 'new'
			},
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
				inputField: '',
				// radio: '',
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
			async insertOrg() {
				let data = this.inputField.split('\n')
				let arr = []
				for (let i in data) {
					if (data[i].trim() === '') {
				
					} else {
						let obj = {
							seorgName: data[i].trim(),
							curUserId: this.$store.state.user.adminId
						}
						arr.push(obj)
					}
				}
				
				await insertOrg(JSON.stringify(arr)).then(res => {
					if (res.OK == 'True') {
						
						if (res.Tag[0] > 0) {
							this.$message({
								type: 'success',
								message: '操作成功!'
							});
							this.$emit('refresh')
							this.close()
						} else {
							this.$message({
								type: 'error',
								message: '操作失败!'
							});
						}

					}
				})
			},
			async updateOrg() {
				await updateOrg({
					seorgGuid: this.row.seorgGuid,
					seorgName: this.inputField.trim(),
					curUserId: this.$store.state.user.adminId
				}).then(res => {
					if (res.OK == 'True') {
					
						if (res.Tag[0].Table[0].okFlag > 0) {
							this.$message({
								type: 'success',
								message: '操作成功!'
							});
							this.$emit('refresh')
							this.close()
						} else {
							this.$message({
								type: 'error',
								message: res.Tag[0].Table[0].notOkReason
							});
						}
					
					}
				})
			},
			submitNew() {
				if (this.pageType == 'new') {
					this.insertOrg()
				} else {
					this.updateOrg()
				}
			}
		},
		created() {
			let type = this.pageType 
			console.log(this.row);
			if (type == 'new') {
				this.title = '创建服务机构账号'
			} else {
				this.title = '编辑机构名称'
				this.inputField = this.row.seorgName
				this.radio = this.row.type
			}
		}
	};
</script>

<style lang="scss" scoped>
</style>
