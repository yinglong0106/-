<template>
	<el-dialog title="" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
		<div style="padding-bottom: 40px;">
			<div>
				<div class="big-title">用户档案</div>
				<el-divider></el-divider>
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
				<div class="input-box">
					<div class="label">创建日期</div>
					<div class="">2022-12-12  12：12</div>
				</div>
				<el-divider></el-divider>
			</div>
			<div>
				<div class="big-title mb10">沟通应用信息</div>
				<div class="title-bg mb10" @click="openUserType">
					<div>用户类型信息</div>
					<div class="el-icon-arrow-right"></div>
				</div>
				<div class="title-bg mb10" @click="openUserInteraction">
					<div>用户交互信息</div>
					<div class="el-icon-arrow-right"></div>
				</div>
				<div class="big-title mb10">服务应用信息</div>
				<div class="title-bg mb10" @click="openPersonalMsg">
					<div>个人信息管理</div>
					<div class="el-icon-arrow-right"></div>
				</div>
				<div class="title-bg mb10">
					<div>用户类型信息</div>
				</div>
			</div>
			
			<userType v-if="isUserType" @close="closeUserType" @refresh=""></userType>
			<userInteraction v-if="isUserInteraction" @close="closeUserInteraction"></userInteraction>
			<personalMsg v-if="isPersonalMsg" @close="closePersonalMsg"></personalMsg>
		</div>
	</el-dialog>
</template>

<script>
	import userType from '@/views/operationRole/userMsgManagement/personalUser/components/userType.vue'
	import userInteraction from '@/views/operationRole/userMsgManagement/personalUser/components/userInteraction.vue'
	import personalMsg from '@/views/operationRole/userMsgManagement/personalUser/components/personalMsg.vue'
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
		components: {
			userType,
			userInteraction,
			personalMsg
		},
		data() {
			return {
				isOpen: true,
				isUserType: false,
				isUserInteraction: false,
				isPersonalMsg: false,
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
			openUserType() {
				this.isUserType = true
			},
			closeUserType() {
				this.isUserType = false
			},
			openUserInteraction() {
				this.isUserInteraction = true
			},
			closeUserInteraction() {
				this.isUserInteraction = false
			},
			openPersonalMsg() {
				this.isPersonalMsg = true
			},
			closePersonalMsg() {
				this.isPersonalMsg = false
			},
			
		},
		created() {
			
		}
	};
</script>

<style lang="scss" scoped>
	.big-title {
		font-size: 24px;
		font-weight: bold;
	}
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
		display: flex;
		justify-content: space-between;
		width: 300px;
		background-color: #f2f2f2;
		padding: 10px;
	}
</style>