<template>
	<div class="app-container">
		<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
			<!-- <el-tab-pane label="沟通类" name="first">
        <communicationType v-if="activeName=='first'"></communicationType>
      </el-tab-pane> -->
			<el-tab-pane label="交易类" name="first">
				<el-tabs v-model="activeName1" type="card" @tab-click="handleClick1">
					<el-tab-pane :label="nav.cattypeName + '(' + nav.categoryNum + ')'" :name="nav.cattypeName" v-for="(nav,index) in tableData" :key="index">
						<transactionType v-if="activeName1==nav.cattypeName" :cattypeGuid="nav.cattypeGuid"></transactionType>
					</el-tab-pane>
				</el-tabs>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	import communicationType from '@/views/operationRole/catDealManagement/catSupport/pans/communicationType.vue'
	import transactionType from '@/views/operationRole/catDealManagement/catSupport/pans/transactionType.vue'
	import {
		getCountListOfMode2
	} from '@/api/operationRoleApi/catDealManagement.js'
	export default {
		name: "index",
		components: {
			communicationType,
			transactionType
		},
		data() {
			return {
				activeName: 'first',
				activeName1: '资金资源需求',
				tableData: []
			};
		},
		methods: {
			handleClick(tab) {
				console.log(tab.index);
			},
			handleClick1(tab) {
				console.log(tab.index);
			},
			async getCountListOfMode2() {
				await getCountListOfMode2({
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					if(res.OK == 'True') {
						let data = res.Tag[0].Table
						this.tableData = data
					}
				})
			}
		},
		created() {
			this.getCountListOfMode2()
		}
	}
</script>

<style scoped lang="scss">
	.app-container {
		padding-bottom: 0px;
	}
</style>
