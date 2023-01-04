<template>
	<el-dialog title="" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
		<div style="padding-bottom: 40px;">
			<div>
				<div class="big-title">用户档案>沟通应用信息>用户交互信息</div>
				<el-divider></el-divider>
				<div class="input-box">
					<div class="label">姓名</div>
					<div class="">林都</div>
				</div>
				<div class="input-box">
					<div class="label">国家及区号</div>
					<div class="">中国大陆（+86）</div>
				</div>
				<div class="input-box">
					<div class="label">联系电话</div>
					<div class="">18650767213</div>
				</div>
				<div class="input-box">
					<div class="label">创建日期</div>
					<div class="">2022-12-12  12：12</div>
				</div>
				<el-divider></el-divider>
			</div>
			<div>
				<div class="big-title mb10">沟通应用信息</div>
				<div class="flex flex-center mb10">
					<div class="title-bg  mr10">
						<div>用户交互信息</div>
					</div>
					<div>记录该系统用户接受服务的时间线</div>
				</div>
			</div>
			
			<div>
				<el-table :data="tableData" border v-loading="loading">
					<el-table-column prop="date" label="日期" align="center"></el-table-column>
					<el-table-column prop="serverName" label="服务名称" align="center"></el-table-column>
					<el-table-column prop="source" label="来源" align="center"></el-table-column>
				</el-table>
			</div>
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
				tableData: []
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
				this.tableData = [{
					date: '2022-12-12 12：12',
					serverName: '服务名称',
					source: '沟通专员'
				}]
			}
			
		},
		created() {
			this.getList()
		}
	};
</script>

<style lang="scss" scoped>
	.big-title {
		font-size: 24px;
		font-weight: bold;
	}
	.input-box {
		display: flex;
		align-items: center;
		margin-bottom: 10px;
		.label {
			width: 100px;
			flex-shrink: 0;
		}
		.tips {
			width: 60px;
			flex-shrink: 0;
			margin-left: 10px;
		}
	}
	.title-bg {
		display: flex;
		justify-content: space-between;
		width: 300px;
		background-color: #f2f2f2;
		padding: 10px;
	}
</style>