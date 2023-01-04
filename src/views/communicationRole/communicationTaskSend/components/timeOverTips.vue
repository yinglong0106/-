<template>
	<el-dialog title="" :visible.sync="isOpen" width="400px" @close="beforeClose" append-to-body>
		<div class="flex flex-center mb10">
			<div class="label">执行日期</div>
			<div>2022-12-12---2022-12-12</div>
		</div>
		<div class="flex flex-center mb10">
			<div class="label">执行日期</div>
			<div>企业综合服务</div>
		</div>
		<div>时间到，未完成的用户将被收回，安排下次操作。</div>
		<span slot="footer" class="dialog-footer">
			<el-button type="primary" @click="close">返回沟通任务派发管理</el-button>
		</span>
	</el-dialog>
</template>

<script>
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
				
			}
		},
		created() {
			
		}
	};
</script>

<style lang="scss" scoped>
	.label {
		width: 120px;
	}
</style>