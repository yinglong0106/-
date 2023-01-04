<template>
	<el-dialog title="投放管理" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
		<div style="padding-bottom: 60px;" v-loading="loading">
			<el-row class="mt20 pb20 flex flex-center">
				<div style="flex-shrink: 0;margin-right: 20px;">品类类型</div>
				<div>{{row.cattypeName}}</div>
			</el-row>
			<div class="flex-center flex jsb">
				<searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找联系电话'>
				</searchCom>
				<el-button type="primary" @click="openPutIn" class="mb20">投放</el-button>
			</div>
			<el-table :data="tableData" border>
				<el-table-column prop="objectName" label="姓名" align="center"></el-table-column>
				<el-table-column prop="nation" label="国家/区号" align="center"></el-table-column>
				<el-table-column prop="phonenumber" label="联系电话" align="center"></el-table-column>
			</el-table>
			<!-- <pages @changePage="changePage" :total="pageTotal" :page="page"></pages> -->
			<putInSetting v-if="isputIn" @close="closePutIn" :row="row" @refresh="getTKDetailByCTList"></putInSetting>
		</div>
	</el-dialog>
</template>

<script>
	import searchCom from '@/views/components/common/searchCom.vue'
	import pages from '@/views/components/common/pages'
	import putInSetting from '@/views/objectAttache/serviceObjectManager/components/putInSetting'
	import {
		getTKDetailByCTList
	} from '@/api/objectAttacheApi/serviceObjectManager.js'
	export default {
		name: "index",
		components: {
			searchCom,
			pages,
			putInSetting,
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
				isputIn: false,
				loading: false,
				page: 1,
				pageTotal: 0,
				searchResult: 0,
				searchVal: '',
				tableData: []
			};
		},
		methods: {
			close() {
				this.isOpen = false
				this.$emit('refresh')
				this.$emit('close')
			},
			beforeClose() {
				this.close()
			},
			search(data) {
				this.searchVal = data
				this.page = 1
				this.getTKDetailByCTList()
			},
			changePage(page) {
				this.page = page
				this.getTKDetailByCTList()
			},
			openPutIn() {
				this.isputIn = true
			},
			closePutIn() {
				this.isputIn = false
			},
			async getTKDetailByCTList() {
				this.loading = true
				await getTKDetailByCTList({
					cattypeGuid: this.row.cattypeGuid,
					phonenumber: this.searchVal,
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
					}
				})
			}
		},
		created() {
			this.getTKDetailByCTList()
		}
	};
</script>

<style lang="scss" scoped>
</style>