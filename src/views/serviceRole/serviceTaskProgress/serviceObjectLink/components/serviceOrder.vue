<template>
	<el-dialog title="" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
		<div style="padding-bottom: 40px;">
			<el-descriptions :colon="false" class="margin-top" :column="1" :border="true" style="margin-bottom: 20px;">
				<el-descriptions-item label-class-name="my-label" content-class-name="my-content" label="执行日期">
					{{row.date}}
				</el-descriptions-item>
				<el-descriptions-item label-class-name="my-label" content-class-name="my-content" label="服务名称">
					{{row.serviceName}}
				</el-descriptions-item>
				<el-descriptions-item label-class-name="my-label" content-class-name="my-content" label="姓名">
					{{row.name}}
				</el-descriptions-item>
				<el-descriptions-item label-class-name="my-label" content-class-name="my-content" label="联系电话">
					{{row.phone}}
				</el-descriptions-item>
				<el-descriptions-item label-class-name="my-label" content-class-name="my-content" label="机构名称">
					{{row.orgName}}
				</el-descriptions-item>
				<el-descriptions-item label-class-name="my-label" content-class-name="my-content" label="角色类型">
					{{row.role}}
				</el-descriptions-item>
				<el-descriptions-item label-class-name="my-label" content-class-name="my-content" label="机构类型">
					{{row.orgType}}
				</el-descriptions-item>
				<el-descriptions-item label-class-name="my-label" content-class-name="my-content" label="注册区域">
					{{row.address}}
				</el-descriptions-item>
			</el-descriptions>
			<el-divider></el-divider>
			<el-button class="mb10" type="primary" @click="openAddTableField">服务名称选择</el-button>
			<div>
				<template v-if="serviceList.length > 0">
					<div class="flex flex-center" v-for="(item,index) in serviceList" :key="index">
						<div class="label">{{item.label}}</div>
						<div class="el-icon-close"></div>
					</div>
				</template>
				<template v-else>
					<div>请添加</div>
				</template>
			</div>
		</div>
		
		<addField v-if="isAddField" @close="closeAddTableField" @refresh="getList"></addField>
	</el-dialog>
</template>

<script>
	import addField from '@/views/operationRole/userMsgManagement/personalUser/components/addField.vue'
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
				serviceList: [],
				isAddField: false,
				openRow: {}
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
			openAddTableField() {
				this.isAddField = true
			},
			closeAddTableField() {
				this.isAddField = false
			},
			getList() {
				this.serviceList = [{
					label: '企业补贴服务',
					id: '1',
				},{
					label: '个人补贴服务',
					id: '2',
				}]
			}
		},
		created() {
			this.getList()
		}
	};
</script>

<style lang="scss" scoped>
</style>
