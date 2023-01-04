<template>
	<div v-loading="loading">
		<div v-for="(item,index) in tableData" :key='index'>
			<div class="title-bg mb10">{{item.alias}}</div>
			<div v-for="(field,index) in item.field">
				<div class="mb10 bold">{{field.alias}}</div>
				<template v-if="field.operation < 4">
					<div class="mb10" v-for="(value,index) in field.values">{{value.value}}</div>
					<el-divider></el-divider>
				</template>
				<template v-else>
					<template v-if="field.operation == 4">
						<div v-for="(value,index) in field.values" class="mb10 flex flex-center"
							style="flex-wrap: wrap;">
							<el-image class="mr10 mb10" :preview-src-list="getImgUrl(value.value)"
								style="width: 100px; height: 100px" v-for="(img,index) in getImgUrl(value.value)"
								:key="index" :src="img"></el-image>
						</div>
					</template>
					<template v-if="field.operation == 5">
						<div v-for="(value,index) in field.values" class="mb10 flex flex-center"
							style="flex-wrap: wrap;">
							<div class="mr10 mb10">{{value.value}}</div>
						</div>
					</template>
				</template>
			
			
			</div>

		</div>
	</div>
</template>

<script>
	import {
		getDemandMessage
	} from '@/api/arbitrationRoleApi/ReturnOfRuling.js'
	export default {
		name: "index",
		props: {
			orderGuid: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				tableData: [],
				imgUrl: this.$store.state.basics.img_url_plate,
				loading: false,
			};
		},
		methods: {
			getImgUrl(str) {
				let imgArr = str.split(',')

				for (let i in imgArr) {
					imgArr[i] = this.imgUrl + imgArr[i]
				}
				return imgArr
			},
			// 需求信息
			async getDemandMessage() {
				this.loading = true
				await getDemandMessage({
					requestGuid: this.orderGuid,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					this.loading = false
					console.log(res);
					let data = []
					if (res.Tag.length) {
						data = res.Tag[0].Table
					} else {
						data = []
					}
					this.tableData = data
				})
			},
		},
		created() {
			this.getDemandMessage()
		}
	}
</script>

<style scoped lang="scss">
	.title-bg {
		background-color: #F2F2F2;
		padding: 10px;
	}
</style>
