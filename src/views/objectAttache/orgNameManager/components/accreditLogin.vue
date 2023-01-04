<template>
	<el-dialog title="授权登录系统" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
		<div style="max-height: 800px;overflow-y: auto;" v-loading="loading">
			<el-checkbox-group v-model="checkList">
				<el-row v-for="(item,index) in tableData" >
					<el-checkbox :label="item.lgCodeGuid" :disabled="item.selectedFlag ==='1'">{{item.loginSysName}}</el-checkbox>
				</el-row>
			  </el-checkbox-group>
		</div>
		<span slot="footer" class="dialog-footer">
			<el-button @click="close">取 消</el-button>
			<el-button type="primary" @click="toAccredit" :disabled="checkList.length<1">授权</el-button>
		</span>
	</el-dialog>
</template>

<script>
	import {
		getAvailableLgSysNameList,
		insertByUid,
	} from '@/api/objectAttacheApi/objectAttache.js'
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
				checkList: [], // 选中的数据
				radio: 3
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
			async insertByUid() {
				this.loading = true
				let arr = []
				let checkList = this.checkList
				for (let i in checkList) {
					let obj = {
						lgCodeGuid: checkList[i],
						orgUserId: this.row.orgUserId,
						curUserId: this.$store.state.user.adminId,
					}
					arr.push(obj)
				}
				await insertByUid(JSON.stringify(arr)).then(res => {
					this.loading = false
					if (res.OK == 'True') {

						if (res.Tag[0] > 0) {
							this.$message({
								type: 'success',
								message: '操作成功!'
							});
							this.getAvailableLgSysNameList()
							this.$emit('refresh')
						} else {
							this.$message({
								type: 'error',
								message: '授权失败或重复授权!'
							});
						}

					}
				})
			},
			toAccredit() {
				console.log('授权',this.checkList);
				this.insertByUid()
			},
			async getAvailableLgSysNameList() {
				this.loading = true
				await getAvailableLgSysNameList({
					orgUserId: this.row.orgUserId,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					this.loading = false
					if (res.OK == 'True') {
					
						console.log(res);
						if (res.Tag.length > 0) {
							let data = res.Tag[0].Table
							this.tableData = data
						} else {
							this.tableData = []
						}
						this.searchResult = this.tableData.length
						this.pageTotal = this.tableData.length > 0 ? (this.page - 1) * 20 + 21 : (this.page -
							1) * 20 + 1
					}
				})
			}

		},
		created() {
			this.getAvailableLgSysNameList()
		}
	};
</script>

<style lang="scss" scoped>
</style>
