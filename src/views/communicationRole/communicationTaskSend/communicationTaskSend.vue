<template>
	<div class="app-container" style="padding-bottom: 0px;min-height: calc( 100vh - 160px);">
		<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
			<el-tab-pane label="未开始" name="first">
				<willBegin></willBegin>
			</el-tab-pane>
			<el-tab-pane label="执行中" name="second">
				<begining></begining>
			</el-tab-pane>
			<el-tab-pane label="执行结束" name="third">
				<over></over>
			</el-tab-pane>
		</el-tabs>


	</div>
</template>

<script>
	import searchCom from '@/views/components/common/searchCom.vue'
	import pages from '@/views/components/common/pages'
	import willBegin from '@/views/communicationRole/communicationTaskSend/components/willBegin.vue'
	import begining from '@/views/communicationRole/communicationTaskSend/components/begining.vue'
	import over from '@/views/communicationRole/communicationTaskSend/components/over.vue'
	export default {
		name: "index",
		components: {
			searchCom,
			pages,
			willBegin,
			begining,
			over
		},
		data() {
			return {
				loading: false,
				page: 1,
				pageTotal: 0,
				searchResult: 0,
				searchVal: '',
				activeName: 'first'
			};
		},
		created() {},
		methods: {
			search(data) {
				this.searchVal = data
				this.page = 1
				//
			},
			changePage(page) {
				this.page = page
				//
			},
			handleClick() {
				
			}
		}
	};
</script>

<style lang="scss" scoped>
</style>
