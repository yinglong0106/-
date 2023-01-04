<template>
	<el-dialog title="字段内容管理" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
		<div class="input-box">
			<div class="label">字段名称</div>
			<el-input v-model="content" placeholder="请输入" ></el-input>
		</div>
		<span slot="footer" class="dialog-footer">
			<el-button @click="close">取 消</el-button>
			<el-button type="primary" @click="submit">保存</el-button>
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
				content: ''
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
			if(this.row.content) {
				this.content = this.row.content
			}
		}
	};
</script>

<style lang="scss" scoped>
	.input-box {
		display: flex;
		align-items: center;
		margin-bottom: 10px;
		.label {
			width: 100px;
			flex-shrink: 0;
		}
		.tips {
			width: 60px;
			flex-shrink: 0;
			margin-left: 10px;
		}
	}
</style>