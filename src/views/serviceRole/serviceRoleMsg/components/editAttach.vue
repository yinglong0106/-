<template>
	<el-dialog :title="title" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
		<div style="padding-bottom: 40px;">
			<div>
				<div class="big-title">账户信息</div>
				<div>
					<div class="flex mb10 jsb">
						<div class="flex">
							<div class="label">头像</div>
							<el-image style="width: 100px; height: 100px" :src="url" fit="fit"></el-image>
						</div>
						<div class="flex">
							<div class="label">账号名称</div>
							<el-input v-model="userName" placeholder="请输入" :disabled='true'></el-input>
						</div>
					</div>
					<div class="flex mb10 jsb">
						<div class="flex">
							<div class="label">姓名</div>
							<el-input v-model="name" placeholder="请输入" :disabled='true'></el-input>
						</div>
						<div class="flex">
							<div class="label">手机号码</div>
							<el-input v-model="phone" placeholder="请输入" :disabled='true'></el-input>
						</div>
					</div>
					<div class="flex mb10 jsb">
						<div class="flex">
							<div class="label">密码</div>
							<el-input v-model="password" placeholder="" :disabled="pageType =='watch'"></el-input>
						</div>
						<div class="flex">
							<div class="label">确认密码</div>
							<el-input v-model="passwordAgain" placeholder="" :disabled="pageType =='watch'"></el-input>
						</div>
					</div>
				</div>
			</div>
			<div>
				<div class="big-title">账户信息</div>
				<div class="flex mb10">
					<div class="flex" style="margin-right: 196px;">
						<div class="label">角色名称</div>
						<div style="padding-top: 10px;">供应专员</div>
					</div>
					<div class="flex">
						<div class="label">归属部门</div>
						<div style="padding-top: 10px;">华夏信融》市场部</div>
					</div>
				</div>
			</div>
		</div>
		<span slot="footer" class="dialog-footer" v-if="pageType == 'edit'">
			<el-button @click="close">取 消</el-button>
			<el-button type="primary" @click="submit" :disabled="!password || !passwordAgain">保存</el-button>
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
			pageType: {
				type: String,
				default: 'watch'
			}
		},
		data() {
			return {
				isOpen: true,
				title: '用户查看',
				url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
				userName: '',
				name: '',
				phone: '',
				password: '',
				passwordAgain: ''
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
				if (this.password != this.passwordAgain) {
					this.$message({
						type: 'error',
						message: '密码和确认密码不一致!'
					});
				}
			}
		},
		created() {
			if (this.pageType == 'watch') {
				this.title = '用户查看'
			} else {
				this.title = '用户编辑'
			}
			this.userName = this.row.userName
			this.name = this.row.name
			this.phone = this.row.phone
		}
	};
</script>

<style lang="scss" scoped>
	.big-title {
		padding: 10px 0;
		border-top: 1px solid #303133;
		border-bottom: 1px solid #303133;
		font-size: 18px;
		color: #303133;
		margin-bottom: 10px;
	}

	.label {
		width: 100px;
		padding-top: 10px;
		flex-shrink: 0;
	}
</style>
