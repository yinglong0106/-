<template>
	<el-dialog title="添加字段名称" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
		<div style="padding-bottom: 40px;">
			<el-row class="mt20 pb20">
				<div v-for="(item,index) in fieldList" :key="index">
					<div class="flex jsb flex-center mb10" v-if="item.name">
						<div>{{item.name}}</div>
						<el-button v-if="item.check">已添加</el-button>
						<el-button v-else type="primary" @click="checkField(index)">添加</el-button>
					</div>
				</div>
			</el-row>
		</div>
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
				fieldList: [],

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
				this.fieldList = [{
					name: '固化字段名称1',
					check: false
				}, {
					name: '固化字段名称2',
					check: false
				}, {
					name: '固化字段名称3',
					check: false
				}, {
					name: '固化字段名称4',
					check: false
				}]
			},
			checkField(index) {
				this.fieldList[index].check = true
				this.fieldList = this.clone(this.fieldList)
			}

		},
		created() {
			this.getList()
		}
	};
</script>

<style lang="scss" scoped>
</style>
