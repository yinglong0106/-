<template>
	<el-dialog title="" :visible.sync="isOpen" width="900px" @close="beforeClose" append-to-body>
		<div style="padding-bottom: 40px;">
			<div class="big-title">{{fileTitle}}</div>
			<el-divider></el-divider>
			<div class="input-box">
				<div class="label">机构名称</div>
				<div class="">福建省华夏信融数据服务股份有限公司</div>
			</div>
			<el-divider></el-divider>
			<el-button class="mb10" type="primary" @click="openAddImage">添加图片</el-button>
			<div>
				<template v-if="imageList.length > 0">
					<div class="flex flex-center" style="flex-wrap: wrap;" v-for="(img,index) in imageList"
						:key="index">
						<el-image style="width: 100px; height: 100px" :src="img"></el-image>
					</div>
				</template>
				<template v-else>
					<div>无内容</div>
				</template>
			</div>
		</div>
		<addImages v-if="isAddImage" @close="closeAddImage" @refresh="getList"></addImages>
	</el-dialog>
</template>

<script>
	import addImages from '@/views/operationRole/userMsgManagement/personalUser/components/addImages.vue'
	export default {
		name: "index",
		props: {
			row: {
				type: Object,
				default: () => {
					return {}
				}
			},
			fileTitle: {
				type: String,
				default: ''
			}
		},
		components: {
			addImages
		},
		data() {
			return {
				isOpen: true,
				imageList: [],
				isAddImage: false,
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
			openAddImage() {
				this.isAddImage = true
			},
			closeAddImage() {
				this.isAddImage = false
			},
			getList() {
				this.imageList = ['https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg']
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
		align-items: center;
		width: 300px;
		background-color: #f2f2f2;
		padding: 10px;
	}
</style>
