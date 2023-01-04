<template>
	<el-dialog title="添加图片" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
		<el-upload ref="upload" class="avatar-uploader" action="" :show-file-list="false"
			:auto-upload="false" :on-change="preUploadImg" :http-request="uploadImg" :multiple="true"
			:on-success="handleAvatarSuccess">
			<div class="flex" style="flex-wrap: wrap;">
				<el-image class="mr10 mb10" style="width: 100px; height: 100px" :src="img"
					v-for="(img,index) in imgListShow" :key="index" fit="fit"></el-image>
				<div class="flex flex-center non-image">
					<div class="el-icon-plus" style="font-size: 36px;"></div>
				</div>
			</div>
		</el-upload>
		<span slot="footer" class="dialog-footer">
			<el-button @click="close">取 消</el-button>
			<el-button type="primary" @click="submit" :disabled="!imgListShow.length">保存</el-button>
		</span>
	</el-dialog>
</template>

<script>
	import {
		upLoadImgApi,
		GetfeeNo
	} from '@/api/commonApi.js'
	import {
		uploadImgToBase64
	} from '@/utils/base64.js' // 导入本地图片转base64的方法
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
				imgList: [], // 图片储存
				imgListShow: [], // 展示列表
				url: '',
				uploadUrl: '',
				step: 0,
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
			submit() {
				
			},
			// 图片上传相关
			handleAvatarSuccess(res, file) {},
			preUploadImg(file, fileList) {
				this.imgList = fileList
				let imgList = fileList
				let arr = imgList.map(item => URL.createObjectURL(item.raw))
				let uploadUrl = imgList.map(item => item.name).join(',')
				this.uploadUrl = uploadUrl
				console.log(arr, uploadUrl);
				this.imgListShow = arr
			},
			// 正经上传图片
			async uploadImg(item) {
				console.log(item);
				const response = await uploadImgToBase64(item.file)
				const base64File = response.result.replace(/.*;base64,/, '')
				let FileName = item.file.name
				let FilePath = 'aprc\\judge\\images'
				let data = base64File
				upLoadImgApi(data, FileName, FilePath).then(res => {
					if (res.OK == 'True') {
						this.step++
						if (this.step == this.imgList.length) {
							// this.NonSysMakeJudge()
						}
			
					}
				})
			},
		},
		created() {
			
		}
	};
</script>

<style lang="scss" scoped>
	.non-image {
		width: 100px;
		height: 100px;
		justify-content: center;
		background-color: #F5F7FA;
	}
</style>