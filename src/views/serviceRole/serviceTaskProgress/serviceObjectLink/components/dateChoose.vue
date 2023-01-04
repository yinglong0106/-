<template>
	<el-dialog title="执行日期选择" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
		<el-radio-group v-model="radio">
		    <el-row v-for="(item,index) in radioList" :key="index" class="mb10">
				<el-radio :label="item.id" :disabled="item.disabled">{{item.label}}</el-radio>
			</el-row>
		  </el-radio-group>
		<span slot="footer" class="dialog-footer">
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
		},
		data() {
			return {
				isOpen: true,
				radio: '',
				radioList: []
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
					label: '2022-12-20--2022-12-30',
					id: '1'
				},{
					label: '2022-12-12--2022-12-12',
					id: '2'
				},{
					label: '2022-12-12--2022-12-12',
					id: '3'
				},{
					label: '2022-12-12--2022-12-12',
					id: '4'
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