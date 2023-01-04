<template>
	<el-dialog title="" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
		<div style="padding-bottom: 40px;">
			<div>
				<div class="big-title">用户档案>信息应用管理>企业信息管理</div>
				<el-divider></el-divider>
				<div class="input-box">
					<div class="label">机构名称</div>
					<div class="">福建省华夏信融数据服务股份有限公司</div>
				</div>
				<el-divider></el-divider>
			</div>
			<div>
				<div class="big-title mb10" style="font-size: 20px;">主体信息</div>
				<div class="title-bg mb10" @click="openSettingProve('主体信息>身份证明')">
					<div>身份证明</div>
					<div class="el-icon-arrow-right"></div>
				</div>
				<div class="title-bg mb10" @click="openSettingProve('主体信息>许可证明')">
					<div>许可证明</div>
					<div class="el-icon-arrow-right"></div>
				</div>
				<div class="title-bg mb10" @click="openSettingProve('主体信息>资质证明')">
					<div>资质证明</div>
					<div class="el-icon-arrow-right"></div>
				</div>
				<div class="big-title mb10" style="font-size: 20px;">财务信息</div>
				<div class="title-bg mb10" @click="openSettingProve('财务信息>财务报表')">
					<div>财务报表</div>
					<div class="el-icon-arrow-right"></div>
				</div>
				<div class="title-bg mb10" @click="openSettingProve('财务信息>纳税记录')">
					<div>纳税记录</div>
					<div class="el-icon-arrow-right"></div>
				</div>
				<div class="big-title mb10" style="font-size: 20px;">经营信息</div>
				<div class="title-bg mb10" @click="openSettingProve('经营信息>员工名单')">
					<div>员工名单</div>
					<div class="el-icon-arrow-right"></div>
				</div>
				<div class="title-bg mb10" @click="openSettingProve('经营信息>核心成员介绍')">
					<div>核心成员介绍</div>
					<div class="el-icon-arrow-right"></div>
				</div>
				<div class="title-bg mb10" @click="openSettingProve('经营信息>企业征信记录')">
					<div>企业征信记录</div>
					<div class="el-icon-arrow-right"></div>
				</div>
				<div class="big-title mb10" style="font-size: 20px;">产品信息</div>
				<div class="title-bg mb10" @click="openSettingProve('产品信息>产品供应表')">
					<div>产品供应表</div>
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
				this.settingTitle = '用户档案>信息应用管理>企业信息管理' + '>' + title
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