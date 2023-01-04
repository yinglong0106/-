<template>
	<el-dialog title="投放设置管理" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
		<div v-loading="loading">
			<el-row class="mt20 pb20 flex flex-center">
				<div style="flex-shrink: 0;margin-right: 20px;">品类类型</div>
				<div>{{row.cattypeName}}</div>
			</el-row>
			<el-row class="mt20 pb20 flex flex-center">
				<div style="flex-shrink: 0;margin-right: 20px;">投放数量</div>
				<el-input type="number" placeholder="请输入数量" v-model="value"></el-input>
			</el-row>
			<el-row class="mt20 pb20 flex flex-center">
				将按照服务对象创建日期【正序】的投放数量投放后，该品类类型下的服务专员可在APP端的系统用户处可见可申领。
				
			</el-row>
		</div>
		<span slot="footer" class="dialog-footer">
			<el-button @click="close">取 消</el-button>
			<el-button type="primary" @click="submit" :disabled="!value">投放</el-button>
		</span>
	</el-dialog>
</template>

<script>
	import {
		freeByCT
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
				value: '',
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
			submit() {
				this.freeByCT()
			},
			async freeByCT() {
				this.loading = true
				await freeByCT({
					cattypeGuid: this.row.cattypeGuid,
					freeNum: this.value,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					this.loading = false
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
								message: res.Tag[0].Table[0].msg
							});
						}
					
					}
				})
			}
		},
		created() {
			
		}
	};
</script>

<style lang="scss" scoped>
</style>