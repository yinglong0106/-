<template>
	<el-dialog title="授权品类" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
		<div style="max-height: 800px;overflow-y: auto;">
			<div>按照供应路径+需求场景的方式逐层打开到需求场景下的品类进行授权</div>
			<el-tree ref="tree" v-loading="loading" :data="tableData" :props="defaultProps" node-key="id"
				@node-expand="getSon" show-checkbox @check-change="handleCheckChange">
			</el-tree>
		</div>
		<span slot="footer" class="dialog-footer">
			<el-button @click="close">取 消</el-button>
			<el-button type="primary" @click="toAccredit" :disabled="checkList.length<1">授权</el-button>
		</span>
	</el-dialog>
</template>

<script>
	import {
		getTopParentWithCatListByPath,
		getSonWithSCListByPath,
		getTopParentWithCatList,
		getSonWithCatList,
		getListBySecenGuid,
		grantCat,
		getGrantCatOkNum
	} from '@/api/objectAttacheApi/serviceOrgManager.js'
	import {
	  getNewId,
	} from '@/api/commonApi.js'
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
				loading: true,
				tableData: [],
				defaultProps: {
					children: 'children',
					label: 'name',
				},
				checkList: [], // 选中的数据
				isPathOver: false, // 路径结束
				isDemandStart: true, // 需求开始
				batchNo: '', //批量uuid
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
			async grantCat() {
				let arr = []
				let checkList = this.checkList
				for(let i in checkList) {
					let obj = {
						categoryGuid: checkList[i].categoryGuid,
						cattypeGuid: checkList[i].cattypeGuid,
						seorgGuid: this.row.seorgGuid,
						batchNo: this.batchNo,
						curUserId: this.$store.state.user.adminId,
					}
					arr.push(obj)
				}
				await grantCat(JSON.stringify(arr)).then(res => {
					if (res.OK == 'True') {
						
						if (res.Tag[0] > 0) {
							// this.$message({
							// 	type: 'success',
							// 	message: '操作成功!'
							// });
							this.getGrantCatOkNum()
						} else {
							this.$message({
								type: 'error',
								message: '授权失败或重复授权!'
							});
						}
					
					}
				})
			},
			// 获取授权成功的数量
			async getGrantCatOkNum() {
				await getGrantCatOkNum({
					batchNo: this.batchNo,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					this.loading = false
					if(res.OK == 'True'){
						let okNum = res.Tag[0].Table[0].okNum
						if (okNum > 0) {
							this.$message({
								type: 'success',
								message: '授权成功' + okNum + '个品类!'
							});
							this.$emit('refresh')
							this.close()
						} else {
							this.$message({
								type: 'error',
								message: '授权失败或重复授权!'
							});
						}
						
					}
				})
			},
			async getTopParentWithCatListByPath() {
				this.loading = true
				await getTopParentWithCatListByPath({
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					this.loading = false
					console.log(res);
					if (res.Tag.length) {
						let data = res.Tag[0].Table
						for (let i in data) {
							data[i].name = data[i].pathName
							if (data[i].hasSon == '1' || data[i].hasSecen == '1') {
								data[i].hasSon == '1'
								data[i].children = [{
									name: '加载中...'
								}]
							} else {
								data[i].hasSon == '0'
							}
							
						}
						this.tableData = data
						console.log(this.tableData);
					} else {
						this.tableData = []
					}
				})
			},
			async getTopParentWithCatList(data) {
				getTopParentWithCatList({
					sdPathGuid: data.sdPathGuid,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					if (res.Tag.length) {
						let arr = res.Tag[0].Table
						for (let i in arr) {
							if (arr[i].hasSon == '1' || arr[i].hasCat == '1') {
								arr[i].hasSon == '1'
								arr[i].children = [{
									name: '加载中...'
								}]
								if(arr[i].hasSon=='1') {
									arr[i].isPathOver = false
								} else {
									arr[i].isPathOver = true
									if(arr[i].hasCat == '1') {
										arr[i].isDemandOver = true
									} else {
										arr[i].isDemandOver = false
									}
								}
							} else {
								arr[i].hasSon == '0'
							}
						}
						data.children = arr
					} else {
						data.children = []
					}
				})
			},
			getSon(data) {
				console.log('data',data);
				if (data.hasSon == '1') {
					if (!data.isPathOver) {
						this.getSonWithSCListByPath(data)
					} else {
						this.getSonWithCatList(data)
					}
					
				} else {
					if(data.isPathOver && !data.isDemandOver) {
						this.getTopParentWithCatList(data)
					} else if(data.isDemandOver){
						this.getListBySecenGuid(data)
					}
				}
			
			},
			async getSonWithSCListByPath(data) {
				this.loading = true
				let id = data.allPathGuids || "'" + data.pathGuid + "'"
				await getSonWithSCListByPath({
					allPathGuids: id,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					this.loading = false
					console.log(res);
					if (res.Tag.length) {
						// let data = res.Tag[0].Table
						let arr = res.Tag[0].Table
						for (let i in arr) {
							arr[i].name = arr[i].pathName
							
							if (arr[i].hasSon == '1' || arr[i].hasSecen == '1') {
								arr[i].hasSon == '1' 
								arr[i].children = [{
									name: '加载中...'
								}]
								if(arr[i].hasSon == '1') {
									arr[i].isPathOver = false
								} else {
									arr[i].isPathOver = true
								}
							} else {
								
							}
						}
						data.children = arr
					} else {
						data.children = []
					}
				})
			},
			async getSonWithCatList(data) {
				let id = data.guid
				await getSonWithCatList({
					parentGuid: id,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					console.log(res);
					if (res.Tag.length) {
						let arr = res.Tag[0].Table
						for (let i in arr) {
							if (arr[i].hasSon == '1' || arr[i].hasCat == '1') {
								arr[i].hasSon == '1'
								arr[i].children = [{
									name: '加载中...'
								}]
								if(arr[i].hasSon) {
									arr[i].isDemandOver = false
									arr[i].isPathOver = true
								} else {
									arr[i].isDemandOver = true
								}
							} else {
								
							}
						}
						data.children = arr
					} else {
						data.children = []
					}
				})
			},
			// 获取品类名称
			async getListBySecenGuid(data) {
				await getListBySecenGuid({
					secenGuid: data.guid,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					if (res.Tag.length) {
						let arr = res.Tag[0].Table
						for (let i in arr) {
							arr[i].name = arr[i].categoryName
						}
						data.children = arr
					} else {
						data.children = []
					}
				})
			},
			// 上传文件获取guid
			async getNewId() {
				this.loading = true
			  await getNewId().then(res => {
			    let guid = res
			    this.batchNo = guid
			    this.grantCat()
			  })
			},
			toAccredit() {
				console.log('授权');
				this.getNewId()
			},

			
			handleCheckChange(data, checked, indeterminate) {
				console.log(data, checked, indeterminate);
				console.log(this.$refs.tree.getCheckedNodes())
				let checkListAll = this.$refs.tree.getCheckedNodes()
				let checkList = []
				for(let i in checkListAll) {
					if(checkListAll[i].categoryGuid) {
						checkList.push(checkListAll[i])
						console.log('品类名称',checkListAll[i].categoryName);
					}
				}
				this.checkList = checkList
			},
		},
		created() {
			this.getTopParentWithCatListByPath()
		}
	};
</script>

<style lang="scss" scoped>
</style>
