<template>
	<el-dialog :title="title" :visible.sync="isOpen" width="900px" @close="beforeClose" append-to-body>
		<div style="padding-bottom: 40px;">
			<el-descriptions :colon="false" class="margin-top" :column="1" :border="true" style="margin-bottom: 20px;">
			  <el-descriptions-item label-class-name="my-label" content-class-name="my-content" label="执行日期">{{row.date}}
			  </el-descriptions-item>
			  <el-descriptions-item label-class-name="my-label" content-class-name="my-content" label="服务名称">{{row.serviceName}}
			  </el-descriptions-item>
			  <el-descriptions-item label-class-name="my-label" content-class-name="my-content" label="姓名">{{row.name}}
			  </el-descriptions-item>
			  <el-descriptions-item label-class-name="my-label" content-class-name="my-content" label="联系电话">{{row.phone}}
			  </el-descriptions-item>
			  <el-descriptions-item label-class-name="my-label" content-class-name="my-content" label="机构名称">{{row.orgName}}
			  </el-descriptions-item>
			  <el-descriptions-item label-class-name="my-label" content-class-name="my-content" label="角色类型">{{row.role}}
			  </el-descriptions-item>
			  <el-descriptions-item label-class-name="my-label" content-class-name="my-content" label="机构类型">{{row.orgType}}
			  </el-descriptions-item>
			  <el-descriptions-item label-class-name="my-label" content-class-name="my-content" label="注册区域">{{row.address}}
			  </el-descriptions-item>
			</el-descriptions>
			<el-divider></el-divider>
			<div class="flex flex-center mb10 mt10">
				<div class="title-bg mr10">对象联系阶段</div>
				<div>
					<span>同意服务则进入服务材料收集管理；</span>
					<span style="color: red;">拒绝服务则结束本次服务并从列表移除；</span>
				</div>
			</div>
			
			<el-radio-group v-model="radio">
				<el-row v-for="(item,index) in radioList" :key="index" class="mb10">
					<el-radio :label="item.id">{{item.label}}</el-radio>
				</el-row>
			</el-radio-group>
			<el-input type="textarea" :rows="3" placeholder="若有备注，请填写，方便日后跟踪" v-model="textareaValue">
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
					label: '同意服务',
					id: '1',
				}, {
					label: '拒绝服务',
					id: '2',
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
