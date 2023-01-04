<template>
	<el-dialog title="添加信息名称" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
		<searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的内容'></searchCom>
		<div>
			<el-radio-group v-model="radio">
			    <el-row v-for="(item,index) in radioList" :key="index" class="mb10">
					<el-radio :label="item.id" :disabled="item.disabled">{{item.label}}</el-radio>
				</el-row>
			  </el-radio-group>
		</div>
		<span slot="footer" class="dialog-footer">
			<el-button @click="close">取 消</el-button>
			<el-button type="primary" @click="submit" :disabled="!radio">保存</el-button>
		</span>
	</el-dialog>
</template>

<script>
	import searchCom from '@/views/components/common/searchCom.vue'
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
			searchCom,
		},
		data() {
			return {
				isOpen: true,
				searchResult: 0,
				searchVal: '',
				radioList: [],
				radio: ''
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
			search(data) {
				this.searchVal = data
				//
			},
			getList() {
				this.radioList = [{
					label: '信息名称1',
					disabled: false,
					id: '1'
				},{
					label: '信息名称2',
					disabled: false,
					id: '2'
				},{
					label: '信息名称3',
					disabled: true,
					id: '3'
				},{
					label: '信息名称4',
					disabled: false,
					id: '4'
				}]
			},
			submit() {
				
			}
		},
		created() {
			this.getList()
		}
	};
</script>

<style lang="scss" scoped>
</style>