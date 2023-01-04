<template>
	<el-dialog title="查看需求场景" :visible.sync="isOpen" width="700px" @close="beforeClose">
		<div style="padding-bottom: 40px;" v-loading="loading">
			<div class="flex flex-center mb10 mt10">
				<div class="input-text">品类名称</div>
				<div>{{openRow.categoryName}}</div>
			</div>
			<div class="flex flex-center ">
				<div class="input-text">品类类型</div>
				<div>{{openRow.cattypeName}}</div>
			</div>
			<el-divider></el-divider>
			<template v-if="!hasData">
				<div style="display: flex;justify-content: center;">暂无信息</div>
			</template>
			<template v-else>
				<div v-for="(item,index) in demandObj" :key="index">
					<div class="flex flex-center mb10">
						<div class="input-text">采购路径</div>
						<div>{{item.demandPathName}}</div>
					</div>
					<div class="flex flex-center mb10">
						<div class="input-text">供应路径</div>
						<div>{{item.supplyPathName}}</div>
					</div>
					<div class="flex flex-center mb10">
						<div class="input-text">需求场景</div>
						<div>{{item.scenePathName}}</div>
					</div>
					<!-- <div style="padding-bottom: 40px;">
						<el-tree :data="item.tree" :props="defaultProps" node-key="id" @node-expand="getSon" ></el-tree>
					</div> -->
					<el-divider></el-divider>
				</div>
			</template>
			
		</div>
		
	</el-dialog>
</template>

<script>
	import {
		getRelationOfParByCGuid
	} from '@/api/categoryRole/giveClass.js'
	import {
		getReTopSceneListByCGuid,
		getSonList,
	} from '@/api/categoryRole/categoryCommon.js'
	export default {
		name: "index",
		props: {
			openRow: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},
		data() {
			return {
				isOpen: true,
				loading: false,
				tableData: [],
				defaultProps: {
					children: 'children',
					label: 'name',
				},
				demandObj: {},
				hasData: false,
			};
		},
		methods: {
			close() {
				this.isOpen = false
				this.$emit('closeNew')
			},
			beforeClose() {
				this.close()
			},
			
			async getReTopSceneListByCGuid(index) {
				await getReTopSceneListByCGuid({
					categoryGuid: this.openRow.categoryGuid,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					this.loading = false
					if (res.Tag.length) {
						let data = res.Tag[0].Table
						
						for (let i in data) {
							if (data[i].hasSon == '1') {
								data[i].children = [{
									name: '加载中...'
								}]
							}
						}
						this.demandObj[index].tree = data
					} else {
						this.demandObj[index].tree = []
					}
					console.log('demandObj', this.demandObj);
					this.demandObj = this.clone(this.demandObj)
				})
			},
			
			async getRelationOfParByCGuid() {
				this.loading = true
				await getRelationOfParByCGuid({
					categoryGuid: this.openRow.categoryGuid,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					this.loading = false
					console.log(res);
					if (res.Tag.length) {
						let data = res.Tag[0].Table
						this.hasData = true
						console.log('hasData',this.hasData);
						this.demandObj = data
						// for (let i in data) {
						// 	this.getReTopSceneListByCGuid(i)
						// }
					} else {
						this.demandObj = {}
						this.hasData = false
					}
				})
			},
			getSon(data) {
				if (data.hasSon == '1') {
					this.getSonList(data)
				} else {
					return
				}

			},
			async getSonList(data) {
				let id = data.guid
				await getSonList({
					parentGuid: id,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					console.log(res);
					if (res.Tag.length) {
						// let data = res.Tag[0].Table
						let arr = res.Tag[0].Table
						for (let i in arr) {
							if (arr[i].hasSon == '1') {
								arr[i].children = [{
									name: '加载中...'
								}]
							}
						}
						data.children = arr
					} else {
						data.children = []
					}
				})
			},
		},
		created() {
			this.getRelationOfParByCGuid()
		}
	};
</script>

<style lang="scss" scoped>
	.input-text {
		width: 120px;
		font-weight: bold;
	}
</style>
