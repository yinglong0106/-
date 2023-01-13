<template>
    <div class="app-container" style="padding: 15px;">
      <div class="flex jsb flex-center">
        <searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的文件名称'></searchCom>
        <div>
          <el-button type="primary" @click="addScript">添加话术</el-button>
        </div>
      </div>

    <el-table v-loading="loading" border :data="tableData" style>
      <el-table-column label="文件名称" prop="fieldName" align="center"  />
      <el-table-column label="创建日期" prop="createTime" align="center" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="delData(scope.row)">删除</el-button>
          <el-button size="mini" type="text" @click="donwLoad(scope.row)">下载</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="h50"></div>
    <pages @changePage="changePage" :total="pageTotal" :page="page"></pages>

      <el-dialog title="添加话术" :visible.sync="showAddScript" width="700px" destroy-on-close @close="beforeClose"  append-to-body>
        <div class="input-box"  v-loading="loadingModel">
          <div class="flex flex-center">
            <div class="input-text">文件名称</div>
            <el-input type="text"  v-model="filename" placeholder="请输入" />
          </div>
          <div class="flex mt20">
            <el-upload ref="upload" class="upload-demo" action="" :on-preview="handlePreview" :on-success="uploadSuccess"
                :on-remove="handleRemove" :on-change="changeFile" :before-remove="beforeRemove" show-file-list
                multiple :http-request="uploadFile" :limit="1" :on-progress="uploading" :accept="accptSting"
                :on-exceed="handleExceed" :auto-upload="false" :before-upload="beforeUpload" :file-list="fileList">
                <el-button size="small" type="primary">文件上传</el-button>
              </el-upload>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" :disabled="!fileList.length || !filename.length" @click="submitUpload">提 交</el-button>
        </span>
      </el-dialog>
    </div>
</template>
<script>
	import searchCom from '@/views/components/common/searchCom.vue'
	import pages from '@/views/components/common/pages'
  import { getToken } from "@/utils/auth";
  import { list,addRow,delRow } from '@/api/communicationApi/preparation';
  import {
    uploadImgToBase64
  } from '@/utils/base64.js' // 导入本地图片转base64的方法
  import {
    upLoadImgApi,
    getNewId,
    getFileProgress,
    getUploadResult
  } from '@/api/commonApi.js'
	export default {
		name: "index",
		components: {
			searchCom,
			pages,
		},
		data() {
			return {
				loading: false,
        loadingModel:false,
				page: 1,
				pageTotal: 0,
				searchResult: 0,
				searchVal: '',
				tableData: [],
				openRow: {},
        showAddScript:false,
        loadingPop: '',
        filename:'',
        fileList: [],
        fileNameGuid:'',
        accptSting: ".doc, .docx, .xls, .xlsx, .ppt, .pdf, .zip, .rar, .7z, .txt, .csv", // 文件类型限制
        testmsg:'',
        headers: {
          Authorization: "Bearer " + getToken(),
        },
			};
		},
		created() {
			this.getList()
		},
		methods: {
			search(data='') {
				this.searchVal = data
				this.page = 1
				this.getList()
			},
			changePage(page) {
				this.page = page
				this.getList()
			},
      donwLoad(row) {
				console.log('下载');
        let type = this.$route.name == 'PreparationManage'?'1':'2'
        let fileUrl = process.env.VUE_APP_BASE_URL_ASSETS + "/Enclosure/APRC\\WEB\\SERVER2\\pfelang\\"+type+"/"+row.fieldValue.toLocaleUpperCase()
				console.log(process.env.VUE_APP_BASE_URL_ASSETS + "/Enclosure/APRC\\WEB\\SERVER2\\pfelang\\"+type+"/"+row.fieldValue.toLocaleUpperCase());
        console.log(fileUrl)
				window.location.href = fileUrl
			},
      // 检验文件类型
      beforeUpload(file) {
        var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
        this.testmsg = testmsg
        const extension = testmsg === 'xls'
        const extension2 = testmsg === 'xlsx'
        const extension3 = testmsg === 'doc'
        const extension4 = testmsg === 'docx'
        const extension9 = testmsg === 'ppt'
        const extension10 = testmsg === 'pdf'
        const extension11 = testmsg === 'zip'
        const extension12 = testmsg === 'rar'
        const extension13 = testmsg === '7z'
        const extension14 = testmsg === 'txt'
        const extension15 = testmsg === 'csv'
        const extension5 = testmsg === 'png'
        const extension6 = testmsg === 'jpeg'
        const extension7 = testmsg === 'jpg'
        const extension8 = testmsg === 'gif'
        // 限制文件大小
        const isLt3M = file.size / 1024 / 1024 < 3
        const isLt50M = file.size / 1024 / 1024 < 50
          if (!extension && !extension2 && !extension3 && !extension4 && !extension9 && !extension10 && !extension11 && !extension12 && !extension13 && !extension14 && !extension15) {
            this.$message({
              message: '上传文件只能上传doc、docx、xls、xlsx、ppt、pdf、zip、rar、7z、txt、csv格式!',
              type: 'warning'
            });
            return extension || extension2 || extension3 || extension4 || extension9 || extension10 || extension11 || extension12 || extension13 || extension14 || extension15
          }
          if (!isLt50M) {
            this.$message({
              message: '上传文件大小不能超过 50MB!',
              type: 'warning'
            });
            return isLt50M
          }
          return extension || extension2 || extension3 || extension4 || extension9 || extension10 || extension11 || extension12 || extension13 || extension14 || extension15 || isLt50M

      },
      delData(row){
        this.$confirm('请确认是否要删除'+row.fieldName, '', {
					confirmButtonText: '确定',
					type: 'warning'
				}).then(async () => {
          this.handleDel(row)
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
      },
      async handleDel(row){
        this.loading = true
        let res = await delRow({
            pfelangGuid:row.pfelangGuid,
            curUserId: this.$store.state.user.adminId,
          })
          this.loading = false
          if(res.OK == 'True'){
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.search()
          }else{
            this.$message({
              type: 'error',
              message: '删除失败'
            });
          }
      },
			async getList() {
        this.loading = true

        const res = await list({
          name: this.searchVal,
					size: '20',
					page: this.page,
					curUserId: this.$store.state.user.adminId,
          type:this.$route.name == 'PreparationManage'?'1':'2'
        })
        this.loading = false
        console.log(res)
        if (res.Tag.length) {
          let data = res.Tag[0].Table
          this.tableData = data
          this.pageTotal = (this.page - 1) * 20 + 21
        } else {
          this.tableData = []
          this.pageTotal = (this.page - 1) * 20 + 1
        }
        this.searchResult = this.tableData.length
			},
      addScript(){
        this.showAddScript = true
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
        this.fileList = fileList
      },
      handlePreview(file) {
        console.log(file);
      },
      handleChange(file, fileList){
        console.log(fileList);
        this.fileList = fileList
        console.log(888888)
      },
			handleExceed(files, fileList) {
				this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
			},
      onError(){
        this.$message.warning("上传失败")
        this.loadingPop.close()
      },
       // 正经上传文件
       async uploadFile(item) {
        console.log(item);
        const response = await uploadImgToBase64(item.file)
        const base64File = response.result.replace(/.*;base64,/, '')
        let type = this.$route.name == 'PreparationManage'?'1':'2'
        let FilePath = "APRC\\WEB\\SERVER2\\pfelang\\"+type+"\\"
        let data = base64File
        this.fileNameGuid =  await getNewId()
        // let FileName = item.file.name
        let FileName = this.fileNameGuid+'.'+ this.testmsg
        console.log("fileNameGuid",FileName.toLocaleUpperCase())
        upLoadImgApi(data, FileName.toLocaleUpperCase(), FilePath).then(res => {
          console.log(res);
          if (res.OK == 'True') {
            // this.$message({
            //   type: 'success',
            //   message: res.Message
            // })
            // this.$emit('refresh')
            // this.close()
          } else {
            this.$message({
              type: 'error',
              message: res.Message
            })
          }
        })

      },
			beforeRemove(file, fileList) {
				return this.$confirm(`确定移除 ${ file.name }？`);
			},
			uploading() {
				const loading = this.$loading({
					lock: true,
					text: '文件上传中',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)'
				});
				this.loadingPop = loading
			},
      async uploadSuccess(response, file, fileList) {
        this.loadingModel = true
        await addRow({
          type:this.$route.name == 'PreparationManage'?'1':'2',
          fileName:this.filename,
          fileValue: this.fileNameGuid+'.'+this.testmsg,
          curUserId:this.$store.state.user.adminId,
        }).then(res => {

          if (res.Tag[0] > 0) {
            this.$message({
              type: 'success',
              message: "操作成功"
            })
            this.loadingModel = false
            this.search()
            this.$refs.upload.clearFiles(); // 方法呢？
            this.filename =''
            this.fileList = []
            this.showAddScript = false
          } else {
            this.$message({
              type: 'error',
              message: res.Message
            })
            this.loadingModel = false
          }

        })
			},

      // 选择文件
      changeFile(file, fileList) {
        console.log(file);
        this.fileList = fileList
      },
			submitUpload() {
        console.log(this.fileList)
        if(!this.fileList.length || !this.filename){
          !this.filename?this.$message.error('请填写文件名称'):this.$message.error('请上传文件')
          return
        }
				this.$refs.upload.submit();
			},
      beforeClose(){
        this.loadingModel = false
        this.$refs.upload.clearFiles(); // 方法呢？
        this.filename =''
        this.fileList = []
      }
		}
	};
</script>

<style lang="scss" scoped>
.input-box {
		width: 70%;
		margin: 20px 0px;

		.input-text {
			width: 100px;
			flex-shrink: 0;
		}
	}
  .h50{
    height:50px;
  }
</style>
