<template>
	<el-dialog title="" :visible.sync="isOpen" width="900px" @close="beforeClose" append-to-body>
		<div style="padding-bottom: 40px;">
			<div>
				<div class="big-title">用户档案>沟通应用信息>用户类型信息</div>
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
				<div class="flex flex-center mb10">
					<div class="title-bg  mr10">
						<div>用户类型信息</div>
					</div>
					<el-button type="primary" @click="openNew">新建</el-button>
				</div>
			</div>
			
			<div>
				<el-table :data="tableData" border v-loading="loading">
					<el-table-column prop="name" label="机构名称" align="center"></el-table-column>
					<el-table-column prop="role" label="角色类型" align="center"></el-table-column>
					<el-table-column prop="orgType" label="机构类型" align="center"></el-table-column>
					<el-table-column prop="address" label="注册区域" align="center"></el-table-column>
					<el-table-column label="操作" align="center" width="240">
						<template slot-scope="scope">
							<el-button type="text" @click="editOrg(scope.row)">编辑</el-button>
							<el-button type="text" @click="delOrg(scope.row)">删除</el-button>
							<el-button type="text" @click="openEnterpriseMsg(scope.row)">企业信息管理</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<newUserType v-if="isNew" @close="closeNew" @refresh="getList" :pageType="pageType" :row="openRow"></newUserType>
			<enterpriseMsg v-if="isEnterprise" @close="closeEnterpriseMsg" @refresh="getList" :row="openRow"></enterpriseMsg>
		</div>
	</el-dialog>
</template>

<script>
	import newUserType from '@/views/operationRole/userMsgManagement/personalUser/components/newUserType.vue'
	import enterpriseMsg from '@/views/operationRole/userMsgManagement/personalUser/components/enterpriseMsg.vue'
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
			newUserType,
			enterpriseMsg
		},
		data() {
			return {
				isOpen: true,
				loading: false,
				tableData: [],
				isNew: false,
				pageType: 'new',
				openRow: {},
				isEnterprise: false,
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
			openNew() {
				this.isNew = true
				this.pageType = 'new'
				this.openRow = {}
			},
			closeNew() {
				this.isNew = false
			},
			editOrg(row) {
				this.isNew = true
				this.openRow = row
				this.pageType = 'edit'
			},
			openEnterpriseMsg(row) {
				this.openRow = row
				this.isEnterprise = true
			},
			closeEnterpriseMsg() {
				this.isEnterprise = false
			},
			getList() {
				this.tableData = [{
					name: '福建省华夏信融数据服务股份有限公司',
					role: '法人',
					orgType: '保理',
					address: '注册区域'
				}]
			}
			
		},
		created() {
			this.getList()
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