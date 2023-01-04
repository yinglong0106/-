<template>
	<el-dialog title="创建登录手机号" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
		<div style="padding-bottom: 40px;"  v-loading="loading">
			<el-row class="mt20 flex flex-center">
				<div style="flex-shrink: 0;margin-right: 20px;">机构名称</div>
				<div>{{row.orgName}}</div>
			</el-row>
			<el-row class="mt20 flex flex-center">
				<div style="flex-shrink: 0;margin-right: 20px;">国家/区号</div>
				<div>中国大陆（+86）</div>
			</el-row>
			<el-row class="mt20 flex flex-center">
				<div style="flex-shrink: 0;margin-right: 20px;">联系电话</div>
				<el-input placeholder="请输入手机号" v-model="phonenumber" clearable></el-input>
			</el-row>
			<el-row class="mt20">
				<div class="mb10" style="flex-shrink: 0;margin-right: 20px;">创建事由（选填）</div>
				<el-input placeholder="" type="textarea" v-model="createReason" clearable></el-input>
			</el-row>
			<el-row class="mt20">
				<div class="mb10" style="flex-shrink: 0;margin-right: 20px;">事由依据（选填）</div>
				<el-upload ref="upload" class="avatar-uploader" action="" :show-file-list="false" :auto-upload="false"
					:on-change="preUploadImg" :http-request="uploadImg" :multiple="true" :on-success="handleAvatarSuccess">
					<div class="flex" style="flex-wrap: wrap;">
						<el-image class="mr10 mb10" style="width: 100px; height: 100px" :src="img"
							v-for="(img,index) in imgListShow" :key="index" fit="fit"></el-image>
						<div class="flex flex-center non-image">
							<div class="el-icon-plus" style="font-size: 36px;"></div>
						</div>
					</div>
				</el-upload>
			</el-row>
		</div>
		<span slot="footer" class="dialog-footer">
		  <el-button @click="close">取 消</el-button>
		  <el-button type="primary" @click="submit" :disabled="!phonenumber.trim()">确 定</el-button>
		</span>
	</el-dialog>
</template>

<script>
	import {
		upLoadImgApi
	} from '@/api/commonApi.js'
	import {
		uploadImgToBase64
	} from '@/utils/base64.js' // 导入本地图片转base64的方法
	import {
		insertLoginPhone
	} from '@/api/objectAttacheApi/objectAttache.js'
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
				uploadUrl: '',
				step: 0, // 用于判断图片是否传完
				phonenumber: '',
				createReason: '',
				loading: false,
				uploaded: false,
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
				if (this.uploadUrl && !this.uploaded) {
					console.log(88888);
					this.$refs.upload.submit();
				} else {
					this.insertLoginPhone()
				}
			},
			async insertLoginPhone() {
				await insertLoginPhone({
					orgGuid: this.row.orgGuid,
					phonenumber: this.phonenumber,
					createReason: this.createReason,
					evidenceImgs: this.uploadUrl,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					this.loading = false
					if(res.OK == 'True') {
						if (res.Tag[0].Table[0].okFlag > 0) {
							this.$message({
								type: 'success',
								message: res.Tag[0].Table[0].msg
							});
							this.$emit('refresh')
							this.close()
						} else {
							this.$message({
								type: 'error',
								message: res.Tag[0].Table[0].msg
							});
							// this.$refs.upload.clearFiles()
							// this.imgList = []
							// this.imgListShow = []
							// this.step = 0
							// this.uploadUrl = []
						}
					}
				})
			},


			// 图片上传相关
			handleAvatarSuccess(res, file) {},
			preUploadImg(file, fileList) {
				this.uploaded = false
				this.imgList = fileList
				let imgList = fileList
				let arr = imgList.map(item => URL.createObjectURL(item.raw))
				let uploadUrl = imgList.map(item => item.name).join(',')
				this.uploadUrl = uploadUrl
				this.imgListShow = arr
			},
			// 正经上传图片
			async uploadImg(item) {
				const response = await uploadImgToBase64(item.file)
				const base64File = response.result.replace(/.*;base64,/, '')
				let FileName = item.file.name
				let FilePath = 'aprc\\web\\org\\phoneimg'
				let data = base64File
				this.loading = true
				upLoadImgApi(data, FileName, FilePath).then(res => {
					if (res.OK == 'True') {
						this.step++
						if (this.step == this.imgListShow.length) {
							this.uploaded = true
							this.insertLoginPhone()
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
</style>
