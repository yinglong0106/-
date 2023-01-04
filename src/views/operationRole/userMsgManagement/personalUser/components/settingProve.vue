<template>
	<el-dialog title="" :visible.sync="isOpen" width="900px" @close="beforeClose" append-to-body>
		<div style="padding-bottom: 40px;">
			<div class="big-title">{{settingTitle}}</div>
			<el-divider></el-divider>
			<div class="input-box">
				<div class="label">机构名称</div>
				<div class="">福建省华夏信融数据服务股份有限公司</div>
			</div>
			<el-divider></el-divider>
			<el-button class="mb10" type="primary" @click="openAdd">添加信息名称</el-button>
			<el-table :data="tableData" border v-loading="loading">
				<el-table-column prop="name" label="信息名称" align="center"></el-table-column>
				<el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="200">
					<template slot-scope="scope">
						<el-button size="mini" type="text" @click="delFile(scope.row)">删除</el-button>
						<el-button size="mini" type="text" @click="openTable(scope.row)">表单管理</el-button>
						<el-button size="mini" type="text" @click="openMaterials(scope.row)">材料管理</el-button>
					</template>

				</el-table-column>
			</el-table>
			<addMsgName v-if="isAdd" @close="closeAdd" @refresh="getList"></addMsgName>
			<materialsManagement v-if="isMaterials" @close="closeMaterials" @refresh="getList" :fileTitle="fileTitle"></materialsManagement>
			<tableManagement v-if="isTable" @close="closeTable" @refresh="getList" :fileTitle="fileTitle"></tableManagement>
		</div>
	</el-dialog>
</template>

<script>
	import addMsgName from '@/views/operationRole/userMsgManagement/personalUser/components/addMsgName.vue'
	import materialsManagement from '@/views/operationRole/userMsgManagement/personalUser/components/materialsManagement.vue'
	import tableManagement from '@/views/operationRole/userMsgManagement/personalUser/components/tableManagement.vue'
	export default {
		name: "index",
		props: {
			row: {
				type: Object,
				default: () => {
					return {}
				}
			},
			settingTitle: {
				type: String,
				default: ''
			}
		},
		components: {
			addMsgName,
			materialsManagement,
			tableManagement
		},
		data() {
			return {
				isOpen: true,
				tableData: [],
				loading: false,
				isAdd: false,
				isMaterials: false,
				isTable: false,
				fileTitle: '',
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
			openAdd() {
				this.isAdd = true
			},
			closeAdd() {
				this.isAdd = false
			},
			delFile() {

			},
			openTable(row) {
				this.fileTitle = this.settingTitle + '>' + row.name
				this.isTable = true
			},
			closeTable() {
				this.isTable = false
			},
			openMaterials(row) {
				this.fileTitle = this.settingTitle + '>' + row.name
				this.isMaterials = true
			},
			closeMaterials() {
				this.isMaterials = false
			},
			getList() {
				this.tableData = [{
					name: '营业执照'
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
		align-items: center;
		width: 300px;
		background-color: #f2f2f2;
		padding: 10px;
	}
</style>
