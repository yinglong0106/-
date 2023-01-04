<template>
	<el-dialog :title="title" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
		<div>
			<div class="input-box">
				<div class="label">姓名</div>
				<div class="">林都</div>
			</div>
			<div class="input-box">
				<div class="label">国家及区号</div>
				<div class="">中国大陆（+86）</div>
			</div>
			<div class="input-box">
				<div class="label">联系电话</div>
				<div class="">18650767213</div>
			</div>
		</div>
		<div class="title-bg mb10">用户类型信息</div>
		<div class="input-box">
			<div class="label">机构名称</div>
			<el-input v-model="name" placeholder="请输入" ></el-input>
			<div class="tips">选填</div>
		</div>
		<div class="input-box">
			<div class="label">机构类型</div>
			<el-input v-model="orgType" placeholder="请输入" ></el-input>
			<div class="tips">选填</div>
		</div>
		<div class="input-box">
			<div class="label">角色类型</div>
			<el-input v-model="role" placeholder="请输入" ></el-input>
			<div class="tips">选填</div>
		</div>
		<div class="input-box">
			<div class="label">所在区域</div>
			<el-input v-model="address" placeholder="请输入" ></el-input>
			<div class="tips">选填</div>
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
			pageType: {
				type: String,
				default: 'new'
			},
		},
		data() {
			return {
				isOpen: true,
				name: '',
				role: '',
				orgType: '',
				address: '',
				title: '新建用户类型信息'
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
			if(this.pageType === 'new') {
				this.title = '新建用户类型信息'
			} else {
				this.title = '编辑'
				this.name = this.row.name
				this.role = this.row.role
				this.orgType = this.row.orgType
				this.address = this.row.address
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
	.title-bg {
		background-color: #F2F2F2;
		padding: 10px;
	}
</style>