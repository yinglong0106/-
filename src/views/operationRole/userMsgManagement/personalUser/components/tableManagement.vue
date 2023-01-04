<template>
	<el-dialog title="" :visible.sync="isOpen" width="900px" @close="beforeClose" append-to-body>
		<div style="padding-bottom: 40px;">
			<div class="big-title">{{fileTitle}}</div>
			<el-divider></el-divider>
			<div class="input-box">
				<div class="label">机构名称</div>
				<div class="">福建省华夏信融数据服务股份有限公司</div>
			</div>
			<el-divider></el-divider>
			<el-button class="mb10" type="primary" @click="openAddTableField">添加表单字段</el-button>
			<el-table :data="tableData" border v-loading="loading">
				<el-table-column prop="name" label="字段名称" align="center"></el-table-column>
				<el-table-column prop="content" label="字段内容" align="center"></el-table-column>
				<el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="200">
					<template slot-scope="scope">
						<el-button size="mini" type="text" @click="delField(scope.row)">删除字段名称</el-button>
						<el-button size="mini" type="text" @click="openEditField(scope.row)">编辑字段内容</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<addField v-if="isAddField" @close="closeAddTableField" @refresh="getList"></addField>
		<editFieldContent v-if="isEdit" @close="closeEditField" @refresh="getList" :row="openRow"></editFieldContent>
	</el-dialog>
</template>

<script>
	import addField from '@/views/operationRole/userMsgManagement/personalUser/components/addField.vue'
	import editFieldContent from '@/views/operationRole/userMsgManagement/personalUser/components/editFieldContent.vue'
	export default {
		name: "index",
		components: {
			addField,
			editFieldContent
		},
		props: {
			row: {
				type: Object,
				default: () => {
					return {}
				}
			},
			fileTitle: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				isOpen: true,
				isAddField: false,
				loading: false,
				isEdit: false,
				tableData: [{
					name: '机构类型',
					content: '保理'
				}],
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
			getList() {
				this.TableData = [{
					name: '机构类型',
					content: '保理'
				}]
			},
			delField() {
				
			},
			openEditField(row) {
				this.openRow = row
				this.isEdit = true
			},
			closeEditField() {
				this.isEdit = true
			},
			openAddTableField() {
				this.isAddField = true
			},
			closeAddTableField() {
				this.isAddField = false
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
