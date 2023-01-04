<template>
	<el-dialog title="批量解除授权" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
		<div style="padding-bottom: 60px;" v-loading="loading">
			<el-row class="mt20 pb20 flex flex-center">
				<div style="flex-shrink: 0;margin-right: 20px;">服务机构</div>
				<div>{{row.seorgName}}</div>
			</el-row>
			<div class="title-bg1">服务机构需要有品类权限后，其名下的服务专员才能开展工作。若收回全部品类授权，则机构名下服务专员已绑定的服务对象全部绑。</div>
			<el-row class="mb20">
				<el-button type="primary" @click="cancelAccredit" :disabled="!multipleSelection.length > 0">解除授权</el-button>
			</el-row>
			<searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的品类名称'></searchCom>
			<el-row>
				<el-table :data="tableData" border @selection-change="handleSelectionChange">
					<el-table-column type="selection" width="55">
					</el-table-column>
					<el-table-column prop="categoryName" label="品类名称" align="center"></el-table-column>
					<el-table-column prop="cattypeName" label="品类类型" align="center"></el-table-column>
					<el-table-column prop="grantTime" label="授权日期" align="center"></el-table-column>
				</el-table>
			</el-row>
			<pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
		</div>
	</el-dialog>
</template>

<script>
	import searchCom from '@/views/components/common/searchCom.vue'
	import pages from '@/views/components/common/pages'
	import {
		getValidCatList,
		ungrantCat
	} from '@/api/objectAttacheApi/serviceOrgManager.js'
	import { pushMessage } from '@/api/commonApi.js'
	export default {
		name: "index",
		components: {
			searchCom,
			pages,
		},
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
				loading: false,
				tableData: [],
				isRelevance: false,
				isLog: false,
				searchResult: 0,
				searchVal: '',
				multipleSelection: [],
				page: 1,
				pageTotal: 0,
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
				this.page = 1
				this.getValidCatList()
				//
			},
			changePage(data) {
				this.page = data
				this.getValidCatList()
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			openRelevance() {
				this.isRelevance = true
			},
			closeRelevance() {
				this.isRelevance = false
			},
			openRelevanceLog() {
				this.isLog = true
			},
			closeRelevanceLog() {
				this.isLog = false
			},
			cancelAccredit() {
				this.ungrantCat()
			},
			async getValidCatList() {
				this.loading = true
				await getValidCatList({
					categoryName: this.searchVal,
					seorgGuid: this.row.seorgGuid,
					size: '20',
					page: this.page,
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
			},
			// 给app推送消息
			async pushMessage(seorgST1UserId,message) {
				await pushMessage(seorgST1UserId,message).then(res=> {
					
				})
			},
			async ungrantCat() {
				let arr = []
				let checkList = this.multipleSelection
				for (let i in checkList) {
					arr.push("'" + checkList[i].categoryGuid + "'")
				}
				console.log(arr);
				await ungrantCat({
					categoryGuid: arr.toString(),
					seorgGuid: this.row.seorgGuid,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					if (res.OK == 'True') {
						
						if (res.Tag.length) {
							let data = res.Tag[0].Table
							for(let i in data) {
								let seorgST1UserId = data[i].seorgST1UserId
								let msgType = data[i].msgType
								let content = data[i].content
								let message = 'servicenotice'
								console.log('message',message);
								this.pushMessage(seorgST1UserId,message)
							}
							this.$message({
								type: 'success',
								message: '操作成功!'
							});
							this.getValidCatList()
							this.$emit('refresh')
						} else {
							this.$message({
								type: 'success',
								message: '操作成功!'
							});
							this.getValidCatList()
							this.$emit('refresh')
						}

					}
				})
			}
		},
		created() {
			this.getValidCatList()
		}
	};
</script>

<style lang="scss" scoped>
	.title-bg1 {
		padding: 10px 0;
		background-color: #D7D7D7;
		margin-bottom: 20px;
		margin-right: 10px;
	}
</style>
