<template>
	<div class="app-container">
		<el-table :data="tableData" border v-loading="loading">
			<el-table-column prop="cattypeName" label="品类类型" align="center"></el-table-column>
			<el-table-column prop="takebackNum" label="回收服务对象数量" align="center" ></el-table-column>
			<el-table-column label="操作" align="center" >
				<template slot-scope="scope">
					<el-button type="text" @click="toPutInManager(scope.row)">投放管理</el-button>
					<el-button type="text" @click="toPutInLog(scope.row)">投放记录</el-button>

				</template>
			</el-table-column>
		</el-table>
		<putInManager v-if="isPutIn" @close="closePutIn" :row="openRow" @refresh="getTKNumByCTList"></putInManager>
		<putInLog v-if="isLog" @close="closePutInLog" :row="openRow" @refresh="getTKNumByCTList"></putInLog>
	</div>
</template>

<script>
	import {
		getTKNumByCTList
	} from '@/api/objectAttacheApi/serviceObjectManager.js'
	import putInManager from '@/views/objectAttache/serviceObjectManager/components/putInManager'
	import putInLog from '@/views/objectAttache/serviceObjectManager/components/putInLog'
	export default {
		name: "index",
		components: {
			putInManager,
			putInLog,
		},
		data() {
			return {
				loading: false,
				tableData: [],
				isPutIn: false,
				openRow: {},
				isLog: false
			};
		},
		methods: {
			toPutInManager(row) {
				this.openRow = row
				this.isPutIn = true
			},
			closePutIn() {
				this.isPutIn = false
			},
			toPutInLog(row) {
				this.openRow = row
				this.isLog = true
			},
			closePutInLog() {
				this.isLog = false
			},
			async getTKNumByCTList() {
				this.loading = true
				await getTKNumByCTList({
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
			},
		},
		created() {
			this.getTKNumByCTList()
		}
	}
</script>

<style scoped lang="scss">
</style>
