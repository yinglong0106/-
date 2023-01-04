<template>
	<el-dialog title="成果管理" :visible.sync="isOpen" width="700px" @close="beforeClose">
		<div style="padding-bottom: 40px;">
			<div class="flex flex-center jsb mb10">
				<div style="width: 100%;" class="flex flex-center jsb">
					<div class="flex">
						<el-image class="mr10" style="width: 100px; height: 100px"
							:src="imgBasicUrl + resultObj.categoryImg" fit="fit"></el-image>
						<div>
							<div>{{resultObj.categoryName}}</div>
							<div>{{resultObj.categoryAlias}}</div>
						</div>
					</div>
				</div>
			</div>
			<div class="flex jsb">
				<div>采购编号：{{resultObj.orderNo}}</div>
				<div>日期：{{resultObj.orderDate}}</div>
			</div>
			<div v-for="(item,index) in resultObj.outcome" :key='index'>
				<template v-if="item.type=='1'">
					<el-divider></el-divider>
					<div class="content">
						<div class="mb10">{{item.createTime}}</div>
						<div class="flex" style="flex-wrap: wrap;" v-for="(data,dIndex) in item.data" :key="dIndex">
							<el-image class="mr10 mb10" style="width: 100px; height: 100px" :src="url" fit="fit"
								v-for="(url,uIndex) in data.url" :key="uIndex"></el-image>
						</div>
					</div>
				</template>
				<template v-if="item.type=='2'">
					<el-divider></el-divider>
					<div class="content">
						<div class="mb10">{{item.createTime}}</div>
						<div v-for="(data,dIndex) in item.data" :key="dIndex">
							<div class="flex flex-center mb10" v-for="(url,uIndex) in data.url" :key="uIndex">
								<div class="mr20" style="text-decoration: underline;">{{url}}</div>
								<el-button size="mini" @click="downFile(url)">下载</el-button>
							</div>
						</div>
					</div>
				</template>
			</div>
		</div>
	</el-dialog>
</template>

<script>
	import {
		getOutcomeDetails
	} from '@/api/arbitrationRoleApi/ReturnOfRuling.js'
	export default {
		name: "index",
		props: {
			openRow: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},
		data() {
			return {
				isOpen: true,
				url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
				fit: 'fit',
				resultObj: {},
				imgBasicUrl: this.$store.state.basics.img_url_cat,
				imgBasicUrl1: this.$store.state.basics.img_url_ord,
			};
		},
		methods: {
			async getOutcomeDetails() {
				await getOutcomeDetails({
					orderGuid: this.openRow.orderGuid,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					let data = res.Tag[0].Table[0]
					this.resultObj = data
					for (let i in data.outcome) {
						if (data.outcome[i].data.length > 0) {
							if (data.outcome[i].type == '1') {
								for (let j in data.outcome[i].data) {
									data.outcome[i].data[j].url = data.outcome[i].data[j].url.split(',').map(
										item => this.imgBasicUrl1 + item)
								}
							} else {
								for (let j in data.outcome[i].data) {
									data.outcome[i].data[j].url = data.outcome[i].data[j].url.split(',').map(
										item => item)
								}
							}


						}
					}

				})
			},
			close() {
				this.isOpen = false
				this.$emit('close')
			},
			beforeClose() {
				this.close()
			},
			downFile(fileName) {
				console.log('下载');
				window.location.href = this.imgBasicUrl1 + fileName
			}
		},
		created() {
			this.getOutcomeDetails()
		}
	};
</script>

<style lang="scss" scoped>
</style>
