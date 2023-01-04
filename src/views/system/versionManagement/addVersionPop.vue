<template>
	<el-dialog title="新增" :visible.sync="isOpen" width="700px" @close="beforeClose" :close-on-click-modal="false">
		<div class="p20" v-loading="loading">
			<el-form ref="editForm" :rules="editFormRules" :model="editForm">
				<el-form-item label="版本号：" label-width="100px" prop="version">
					<el-input v-model="editForm.version" placeholder="同一发布平台版本号只能递增" style="width: 250px;" />
				</el-form-item>
				<el-form-item label="发布平台" label-width="100px" prop="platform">
					<el-select v-model="editForm.platform" placeholder="请选择" >
						<el-option style="padding-bottom: 20px;" v-for="item in platformList" :key="item.value" :label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="权重" label-width="100px" prop="weight">
					<el-input v-model="editForm.weight" placeholder="请输入整数" style="width: 250px;" />
				</el-form-item>
				<el-form-item label="版本大小" label-width="100px">
					<el-input v-model="editForm.size" placeholder="安装包文件大小，单位：M" style="width: 200px;" />
				</el-form-item>
				<el-form-item label="上传安装包" label-width="100px" prop="uploadApk">
					<el-upload style="text-align: left !important;" ref="upload" class="upload-demo" action=""
						:on-preview="handlePreview" :accept="accptSting" :on-remove="handleRemove"
						:on-change="changeFile" :before-remove="beforeRemove" show-file-list :on-success="uploadSuccess"
						multiple :http-request="uploadFile" :limit="1" :on-progress="uploading"
						:on-exceed="handleExceed" :auto-upload="false" :before-upload="beforeUpload"
						:file-list="fileList">
						<div style="text-align: left !important;">
							<el-button size="small" type="primary">上传安装包</el-button>
						</div>
					</el-upload>
				</el-form-item>
				<el-form-item label="版本说明" label-width="100px">
					<el-input v-model="editForm.imprint" type="textarea" placeholder="请输入版本说明" style="width: 100%;" />
				</el-form-item>
				<el-form-item style="text-align: center;padding-bottom: 40px;">
					<el-button type="primary" @click="onSubmit('editForm')">保存</el-button>
					<el-button @click="close">取消</el-button>
				</el-form-item>
			</el-form>
		</div>
	</el-dialog>
</template>

<script>
	import {
		insert_1_0_1,delApp
	} from '@/api/system/versionManagement'
	import {
	  uploadImgToBase64
	} from '@/utils/base64.js' // 导入本地图片转base64的方法
	import {
	  upLoadImgApi,
	} from '@/api/commonApi.js'
	export default {
		name: "index",
		props: {
			row: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},
		data() {
			return {
				isOpen: true,
				loading: false,
				editForm: {
					version: '',
					platform: '',
					weight: '',
					size: '',
					imprint: '',
					uploadApk: '',
				},
				editFormRules: {
					version: [{
						required: true,
						message: '必填',
						trigger: 'blur'
					}],
					platform: [{
						required: true,
						message: '必填',
						trigger: 'blur'
					}],
					uploadApk: [{
						required: true,
						message: '必填',
						trigger: 'blur'
					}],
					weight: [{
						required: true,
						message: '必填',
						trigger: 'blur'
					}],
					size: [{
						required: true,
						message: '必填',
						trigger: 'blur'
					}]
				},
				platformList: [{
					value: '1',
					label: 'Android'
				}, {
					value: '2',
					label: 'IOS'
				}],
				fileList: [], // 上传文件列表
				loading: false, // 上传文件提示
				accptSting: '.apk', // 文件类型限制
				app_path: this.$store.state.basics.app_path,
				huanjing: process.env.VUE_APP_BASE_API=='http://service.xiaofeizzj.com:8011'?'正式':'测试'
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
			onSubmit(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.delApp()
					} else {
						this.$message({
							type: 'error',
							message: '有必填信息没填'
						})
						return false
					}
				})
			},
			async insert_1_0_1() {
				let param = {
					weight: parseInt(this.editForm.weight),
					platform: this.editForm.platform,
					version: this.editForm.version,
					userId: this.$store.state.user.adminId.toString(),
					remark: this.editForm.imprint,
					size: this.editForm.size,
					apkPath: this.app_path,
					curUserId: this.$store.state.user.adminId,
				}
				await insert_1_0_1(param).then(res => {
					this.loading = false
					if (res.Tag[0] > 0) {
						this.$message({
							type: 'success',
							message: '操作成功'
						})
						this.$emit('refresh')
						this.close()
					} else {
						this.$message({
							type: 'error',
							message: '操作失败'
						})
					}
				})
			},
			async delApp() {
				this.loading = true
				let huanjing = this.huanjing
				let fileName = huanjing === '正式'?'COM.FZQBJ.APP.APK': 'TEST.COM.FZQBJ.APP.APK'
				let filePath = 'DOWNLOAD'
				await delApp(fileName,filePath).then(res => {
					if(res.OK == 'True') {
						console.log(res);
						
					}
					this.$refs.upload.submit();
				}).catch(err => {
					console.log('err',err);
					this.$refs.upload.submit();
				})
			},




			// 上传文件
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
			handleExceed(files, fileList) {
				this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
			},
			beforeRemove(file, fileList) {
				if (file && file.status === "success") {
					return this.$confirm(`确定移除 ${ file.name }？`);
				}


			},
			// 检验文件类型
			beforeUpload(file) {

				var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
				console.log('testmsg', testmsg);
				const extension = testmsg === 'apk'
				// 限制文件大小
				const isLt100M = file.size / 1024 / 1024 < 100

				if (!extension) {
					this.$message({
						message: '上传文件只能上传apk格式!',
						type: 'warning'
					});
					return extension
				}
				if (!isLt100M) {
					this.$message({
						message: '上传文件大小不能超过 100MB!',
						type: 'warning'
					});
					return isLt100M
				}
				return extension || isLt100M




			},
			uploading() {
				console.log(888);
				const loading = this.$loading({
					lock: true,
					text: '文件上传中',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)'
				});
				this.loadingPop = loading
			},
			uploadSuccess(response, file, fileList) {
				// this.insertFirstSign()
			},
			// 选择文件
			changeFile(file, fileList) {
				console.log(file);
				this.fileList = fileList
				this.editForm.uploadApk = fileList
			},
			// 正经上传文件
			async uploadFile(item) {
				console.log(item);
				this.loading = true
				const response = await uploadImgToBase64(item.file)
				const base64File = response.result.replace(/.*;base64,/, '')
				let FileName = item.file.name
				let FilePath = 'DOWNLOAD\\'
				let data = base64File
				this.loading = true
				upLoadImgApi(data, FileName, FilePath).then(res => {
					console.log(res);
					if (res.OK == 'True') {
						// this.$message({
						// 	type: 'success',
						// 	message: res.Message
						// })
						this.insert_1_0_1()
					} else {
						this.$message({
							type: 'error',
							message: res.Message
						})
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
