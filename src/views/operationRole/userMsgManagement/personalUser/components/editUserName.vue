<template>
	<el-dialog title="编辑姓名" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
		<div class="input-box">
			<div class="label">姓名</div>
			<el-input v-model="name" placeholder="请输入" ></el-input>
			<div class="tips">选填</div>
		</div>
		<div class="input-box">
			<div class="label">国家及区号</div>
			<div class="">中国大陆（+86）</div>
		</div>
		<div class="input-box">
			<div class="label">联系电话</div>
			<div class="">18650767213</div>
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
				name: ''
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