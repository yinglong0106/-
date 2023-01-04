<template>
	<el-dialog title="" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
		<div style="padding-bottom: 40px;">
			<div>
				<div class="big-title">用户档案>信息应用管理>个人信息管理</div>
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
				<div class="big-title mb10" style="font-size: 20px;">主体信息</div>
				<div class="title-bg mb10" @click="openSettingProve('主体信息>身份证明')">
					<div>身份证明</div>
					<div class="el-icon-arrow-right"></div>
				</div>
				<div class="title-bg mb10" @click="openSettingProve('主体信息>关系证明')">
					<div>关系证明</div>
					<div class="el-icon-arrow-right"></div>
				</div>
				<div class="title-bg mb10" @click="openSettingProve('主体信息>现状证明')">
					<div>现状证明</div>
					<div class="el-icon-arrow-right"></div>
				</div>
				<div class="big-title mb10" style="font-size: 20px;">财务信息</div>
				<div class="title-bg mb10" @click="openSettingProve('财务信息>收入情况')">
					<div>收入情况</div>
					<div class="el-icon-arrow-right"></div>
				</div>
				<div class="title-bg mb10" @click="openSettingProve('财务信息>五险一金')">
					<div>五险一金</div>
					<div class="el-icon-arrow-right"></div>
				</div>
				<div class="title-bg mb10" @click="openSettingProve('财务信息>个人征信记录')">
					<div>个人征信记录</div>
					<div class="el-icon-arrow-right"></div>
				</div>
				<div class="big-title mb10" style="font-size: 20px;">工作信息</div>
				<div class="title-bg mb10" @click="openSettingProve('工作信息>单位信息')">
					<div>单位信息</div>
					<div class="el-icon-arrow-right"></div>
				</div>
				<div class="big-title mb10" style="font-size: 20px;">能力信息</div>
				<div class="title-bg mb10" @click="openSettingProve('能力信息>学历证书')">
					<div>学历证书</div>
					<div class="el-icon-arrow-right"></div>
				</div>
				<div class="title-bg mb10" @click="openSettingProve('能力信息>技能证书')">
					<div>技能证书</div>
					<div class="el-icon-arrow-right"></div>
				</div>
				<div class="title-bg mb10" @click="openSettingProve('能力信息>职称证书')">
					<div>职称证书</div>
					<div class="el-icon-arrow-right"></div>
				</div>
				<div class="title-bg mb10" @click="openSettingProve('能力信息>人才证书')">
					<div>人才证书</div>
					<div class="el-icon-arrow-right"></div>
				</div>
				<div class="big-title mb10" style="font-size: 20px;">资产信息</div>
				<div class="title-bg mb10" @click="openSettingProve('资产信息>动产资产')">
					<div>动产资产</div>
					<div class="el-icon-arrow-right"></div>
				</div>
				<div class="title-bg mb10" @click="openSettingProve('资产信息>不动资产')">
					<div>不动资产</div>
					<div class="el-icon-arrow-right"></div>
				</div>
				<div class="title-bg mb10" @click="openSettingProve('资产信息>金融资产')">
					<div>金融资产</div>
					<div class="el-icon-arrow-right"></div>
				</div>
				<div class="title-bg mb10" @click="openSettingProve('资产信息>无形资产')">
					<div>无形资产</div>
					<div class="el-icon-arrow-right"></div>
				</div>
				<div class="title-bg mb10" @click="openSettingProve('资产信息>权属资产')">
					<div>权属资产</div>
					<div class="el-icon-arrow-right"></div>
				</div>
			</div>
			<settingProve v-if="isSetting" @close="closeSettingProve" :settingTitle="settingTitle"></settingProve>
		</div>
	</el-dialog>
</template>

<script>
	import settingProve from '@/views/operationRole/userMsgManagement/personalUser/components/settingProve.vue'
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
			settingProve
		},
		data() {
			return {
				isOpen: true,
				isSetting: false,
				settingTitle: ''
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
			openSettingProve(title) {
				this.settingTitle = '用户档案>信息应用管理>个人信息管理' + '>' + title
				this.isSetting = true
			},
			closeSettingProve() {
				this.isSetting = false
			}
			
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
		align-items: center;
		width: 300px;
		background-color: #f2f2f2;
		padding: 10px;
	}
</style>