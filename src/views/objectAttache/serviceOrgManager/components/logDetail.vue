<template>
	<el-dialog title="详情" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
		<div style="padding-bottom: 40px;">
			<el-row class="mt20 flex flex-center">
				<div style="flex-shrink: 0;margin-right: 20px;">服务机构</div>
				<div>{{row.seorgName}}</div>
			</el-row>
			<el-row class="mt20 flex flex-center">
				<div style="flex-shrink: 0;margin-right: 20px;">国家/区号</div>
				<div>中国大陆（+86）</div>
			</el-row>
			<el-row class="mt20 flex flex-center">
				<div style="flex-shrink: 0;margin-right: 20px;">联系电话</div>
				<el-input placeholder="请输入手机号" v-model="tableData.phonenumber" clearable :readonly="true"></el-input>
			</el-row>
			<el-row class="mt20">
				<div class="mb10" style="flex-shrink: 0;margin-right: 20px;">创建事由（选填）</div>
				<el-input placeholder="" type="textarea" v-model="tableData.createReason" clearable :readonly="true"></el-input>
			</el-row>
			<el-row class="mt20">
				<div class="mb10" style="flex-shrink: 0;margin-right: 20px;">事由依据（选填）</div>
				<div class="flex flex-center" v-if='tableData.evidenceImgs'>
					<el-image class="mr10" style="width: 100px; height: 100px" :src="url" v-for="(url,index) in imgsList" :key="index" fit="fit" :preview-src-list="imgsList"></el-image>
				</div>
			</el-row>
		</div>
	</el-dialog>
</template>

<script>
	import {
		getLogDetail
	} from '@/api/objectAttacheApi/serviceOrgManager.js'
	export default {
		name: "index",
		props: {
			row: {
				type: Object,
				default: () => {
					return {}
				}
			},
			openRow: {
				type: Object,
				default: () => {
					return {}
				}
			},
		},
		data() {
			return {
				isOpen: true,
				imgsList: [],
				imgBasicUrl: this.$store.state.basics.img_url_seorg,
				tableData: {}
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
			async getLogDetail() {
				this.loading = true
				await getLogDetail({
					seorgPhoneGuid: this.openRow.seorgPhoneGuid,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					this.loading = false
					if(res.OK == 'True') {
						if(res.Tag.length) {
							let data = res.Tag[0].Table[0]
							this.tableData = data
							this.imgsList = data.evidenceImgs.split(',')
							this.imgsList = this.imgsList.map(item => this.imgBasicUrl + item)
						} else {
							this.tableData = {}
						}
					}
				})
			}
		},
		created() {
			this.getLogDetail()
		}
	};
</script>

<style lang="scss" scoped>
</style>
