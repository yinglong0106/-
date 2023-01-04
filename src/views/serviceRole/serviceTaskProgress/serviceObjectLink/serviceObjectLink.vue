<template>
	<div class="app-container">
		<div class="flex flex-center">
			<div class="flex flex-center mb20 mr20">
				<div class="label">执行日期</div>
				<el-input placeholder="请选择" suffix-icon="el-icon-arrow-down" v-model="input1" @focus="openDateChoose">
				</el-input>
			</div>
			<searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的服务名称或者机构名称或者联系电话'></searchCom>
		</div>

		<el-table v-loading="loading" border :data="tableData">
			<el-table-column label="执行日期" prop="date" align="center" />
			<el-table-column label="服务名称" prop="serviceName" align="center" />
			<el-table-column label="姓名" prop="name" align="center" width="80" />
			<el-table-column label="联系电话" prop="phone" align="center" />
			<el-table-column label="机构名称" prop="orgName" align="center" />
			<el-table-column label="角色类型" prop="role" align="center" width="80" />
			<el-table-column label="机构类型" prop="orgType" align="center" width="80" />
			<el-table-column label="注册区域" prop="address" align="center" />
			<el-table-column label="操作" align="center" class-name="small-padding fixed-width">
				<template slot-scope="scope">
					<el-row>
						<el-button size="mini" type="text" @click="openCheck(scope.row)">查看服务话术</el-button>
					</el-row>
					<el-row>
						<el-button size="mini" type="text" @click="openProgress(scope.row)">进度标签管理</el-button>
					</el-row>
					<el-row>
						<el-button size="mini" type="text" @click="openServiceOrder(scope.row)" v-if="scope.row.status == '1'">意向服务预约</el-button>
					</el-row>
					<el-row>
						<el-button size="mini" type="text" @click="handleOpenResult(scope.row)" v-if="scope.row.status == '2'">意向服务查看</el-button>
					</el-row>
				</template>
			</el-table-column>
		</el-table>

		<pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
		<dateChoose v-if="isDate" @close="closeDateChoose" @refresh="getList"></dateChoose>
		<checkServiceDetail v-if="isCheck" @close="closeCheck" :row="openRow"></checkServiceDetail>
		<progressLabel v-if="isProgress" @close="closeProgress" :row="openRow"></progressLabel>
	</div>
</template>

<script>
	import searchCom from '@/views/components/common/searchCom.vue'
	import pages from '@/views/components/common/pages'
	import dateChoose from '@/views/serviceRole/serviceTaskProgress/serviceObjectLink/components/dateChoose.vue'
	import checkServiceDetail from '@/views/serviceRole/serviceTaskProgress/serviceObjectLink/components/checkServiceDetail.vue'
	import progressLabel from '@/views/serviceRole/serviceTaskProgress/serviceObjectLink/components/progressLabel.vue'
	export default {
		name: "index",
		components: {
			searchCom,
			pages,
			dateChoose,
			checkServiceDetail,
			progressLabel
		},
		data() {
			return {
				loading: false,
				page: 1,
				pageTotal: 0,
				searchResult: 0,
				searchVal: '',
				isDate: false,
				tableData: [],
				isCheck: false,
				input1: '',
				isProgress: false,
				openRow: {},
				isOrder: false,
			};
		},
		created() {
			this.getList()
		},
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
			openDateChoose() {
				this.isDate = true
			},
			closeDateChoose() {
				this.isDate = false
			},
			openCheck(row) {
				this.isCheck = true
				this.openRow = row
			},
			closeCheck() {
				this.isCheck = false
			},
			openProgress(row) {
				this.isProgress = true
				this.openRow = row
			},
			closeProgress() {
				this.isProgress = false
			},
			openServiceOrder() {
				this.isOrder = true
				this.openRow = row
			},
			closeServiceOrder() {
				this.isOrder = false
			},
			getList() {
				this.tableData = [{
					date: '2022-12-12---2022-12-12',
					serviceName: '产品供应引入+企业融资服务',
					name: '林都',
					phone: '（+86）18650767213',
					orgName: '福建省华夏信融数据服务股份有限公司',
					role: '法人',
					orgType: '小贷',
					address: '福建省福州市',
					status: '1'
				},{
					date: '2022-12-12---2022-12-12',
					serviceName: '产品供应引入+企业融资服务',
					name: '林都',
					phone: '（+86）18650767213',
					orgName: '福建省华夏信融数据服务股份有限公司',
					role: '法人',
					orgType: '小贷',
					address: '福建省福州市',
					status: '2'
				}]
			}
		}
	};
</script>

<style lang="scss" scoped>
	.label {
		width: 120px;
	}
</style>
