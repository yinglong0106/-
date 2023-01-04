<template>
	<el-dialog :title="title" :visible.sync="isOpen" width="900px" @close="beforeClose" append-to-body>
		<div style="padding-bottom: 40px;">
			<el-table border :data="tableDataFirst">
				<el-table-column label="姓名" prop="name" align="center" width="80" />
				<el-table-column label="联系电话" prop="phone" align="center" width="160" />
				<el-table-column label="机构名称" prop="orgName" align="center" />
				<el-table-column label="角色类型" prop="role" align="center" />
				<el-table-column label="机构类型" prop="orgType" align="center" />
				<el-table-column label="注册区域" prop="address" align="center" />
			</el-table>
			<div class="title-bg mb10 mt10">沟通结果(必填)</div>
			<el-radio-group v-model="radio">
				<el-row v-for="(item,index) in radioList" :key="index" class="mb10">
					<el-radio :label="item.id">{{item.label}}</el-radio>
				</el-row>
			</el-radio-group>
			<el-input type="textarea" :rows="3" placeholder="接受服务，若对方有要求，请填写要求；拒绝服务，请告知原因。" v-model="textarea">
			</el-input>
		</div>
		<span slot="footer" class="dialog-footer" v-if="pageType =='operation'">
			<el-button @click="close">取 消</el-button>
			<el-button type="primary" @click="submit" :disabled="!radio">保存</el-button>
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
				default: 'operation',
			}
		},
		data() {
			return {
				isOpen: true,
				title: '沟通结果操作',
				tableDataFirst: [],
				radioList: [],
				radio: '',
				textareaValue: ''
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

			},
			getList() {
				this.radioList = [{
					label: '接受服务',
					id: '1',
				}, {
					label: '拒绝服务',
					id: '2',
				}, {
					label: '未接通',
					id: '3',
				}, {
					label: '无效号码',
					id: '4',
				}, ]
			}
		},
		created() {
			this.tableDataFirst.push(this.row)
			this.getList()
			if (this.pageType == 'check') {
				this.radio = '2'
			}
		}
	};
</script>

<style lang="scss" scoped>
	.title-bg {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 200px;
		background-color: #f2f2f2;
		padding: 10px;
	}
</style>
