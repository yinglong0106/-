<template>
  <div class="app-container" style="padding: 15px;width:65%" v-loading="loading">
    <div style="padding-bottom: 20px;">
      <el-table :data="tableData" border >
        <el-table-column prop="userName" label="账号名称" align="center"></el-table-column>
        <el-table-column prop="nickName" label="姓名" align="center" width="160"></el-table-column>
        <el-table-column prop="phonenumber" label="联系电话" align="center"></el-table-column>
        <el-table-column prop="createTime" label="账户开通日期" align="center"></el-table-column>
      </el-table>
    </div>
    <el-divider></el-divider>
    <p v-if="$route.name == 'LabelManage'">根据这个沟通专员的能力打标签，方便派发的沟通对象与沟通专员匹配。</p>
    <p v-else>根据这个服务专员的能力打标签，作为服务专员被筛选的条件，方便派发服务对象与服务专员。</p>
    <div class="contentItem">
     <div class="flex flex-center w1500">
      <div class="title-bg mb10 mt10 c-red mr20 w300">用户类型信息</div>
      <div v-if="$route.name == 'LabelManage'">设置这个沟通专员适合沟通工作信息为哪类机构类型的沟通对象</div>
      <div v-else>设置这个服务专员擅长什么机构类型的服务对象</div>
     </div>
      <el-row :gutter="3" class="mt10 mt10 pl10 flex flex-center">
        <el-col :span="8">机构类型</el-col>
        <el-col :span="10" class="text-center "><el-button type="primary" size="mini" @click="setTing('mechanismData')">设置</el-button></el-col>
        <el-col :span="4">多选</el-col>
      </el-row>
      <el-row :gutter="3" class="mt10 mt10 pl10 flex flex-center" v-for="(item,index) in mechanismData" :key="index">
        <el-col :span="10">{{item.labelData}}</el-col>
        <el-col :span="6" class="text-center "><i @click="delData('mechanismData',index,item)" style="font-size:20px" class="el-icon-close"></i></el-col>
      </el-row>
    </div>
    <div class="contentItem">
      <div class="flex flex-center w1500">
        <div  class="title-bg mb10 mt10 mr20 w300">服务名称信息</div>
        <div v-if="$route.name == 'LabelManage'">设置这个沟通专员适合沟通服务服务信息为哪种服务名称的沟通派发</div>
        <div v-else>设置这个服务专员擅长什么服务名称</div>
      </div>
      <el-row :gutter="3" class="mt10 pl10 mt10 flex flex-center">
        <el-col :span="8">服务名称</el-col>
        <el-col :span="10" class="text-center "><el-button type="primary" size="mini"  @click="setTing('serviceData')">设置</el-button></el-col>
        <el-col :span="4">多选</el-col>
      </el-row>
      <el-row :gutter="3" class="mt10 pl10 mt10 flex flex-center" v-for="(item,index) in serviceData" :key="index">
        <el-col :span="10">{{item.labelData}}</el-col>
        <el-col :span="6" class="text-center "><i @click="delData('serviceData',index,item)" style="font-size:20px" class="el-icon-close"></i></el-col>
      </el-row>
    </div>
    <div class="contentItem" v-if="$route.name == 'ServiceTagManage'">
      <div class="flex flex-center w1500">
        <div  class="title-bg mb10 mt10 mr20 w300">专员所在区域</div>
        <div>设置这个服务专员所处的位置</div>
      </div>
      <el-row :gutter="3" class="mt10 pl10 mt10 flex flex-center">
        <el-col :span="8">服务区域</el-col>
        <el-col :span="10" class="text-center "><el-button type="primary" size="mini"  @click="setTingArea">设置</el-button></el-col>
        <el-col :span="4">单选</el-col>
      </el-row>
      <el-row :gutter="3" class="mt10 pl10 mt10 flex flex-center" v-for="(item,index) in serviceArea" :key="index">
        <el-col :span="10">{{item.labelData}}</el-col>
        <el-col :span="6" class="text-center "><i @click="delData('serviceArea',index,item)" style="font-size:20px" class="el-icon-close"></i></el-col>
      </el-row>
    </div>

    <el-dialog :title="currentInfo.type=='mechanismData'?'机构类型':'服务名称'" :visible.sync="editSelect" width="700px" destroy-on-close append-to-body>
      <el-button class="submitBtn" type="primary" @click="submit" >保存</el-button>
      <div style=" border-top:1px solid #DCDFE6;padding:5px 0"></div>
      <div class="flex jsb flex-center mt5 ">
        <searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的内容'></searchCom>
      </div>
     <div class="mb20">
      <el-checkbox-group v-model="selectData" class="flex direction-clo">
        <el-checkbox :disabled="item.selectedFlag == 1" :label="item.dataGuid" class="mb10" v-for="(item,index) in selectList" :key="index">{{item.labelData}}</el-checkbox>
      </el-checkbox-group>
     </div>
     <div style="padding-bottom: 20px;padding-top:20px">
      <pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
     </div>
    </el-dialog>

    <SelectBox v-if="showSelect" :title="'服务区域选择'" :type="'4'" :openRow="serviceArea.length?serviceArea[0]:''" @close="closeDamage"></SelectBox>
  </div>
</template>
<script>
	import searchCom from '@/views/components/common/searchCom.vue'
	import pages from '@/views/components/common/pages'
  import SelectBox from '@/views/communication/components/selectBox.vue'
  import { getRoleUserDetail } from '@/api/operationRoleApi/userManagement.js'
  import { getSetLabel,getServiceName,getLabelAll,getServiceNameAll,setLabel,delLabel } from '@/api/communicationApi/preparation';
export default {
  name: "index",
  components: {
			searchCom,
			pages,
      SelectBox
		},
    data() {
			return {
				loading: false,
				tableData: [],
        mechanismData:[],
        serviceData:[],
        serviceArea:[],
        currentInfo:{
          type:'',
        },
        editSelect:false,
        searchResult:0,
        selectData:[],
        selectList:[],
        searchVal:"",
        page: 1,
				pageTotal: 0,
        showSelect:false
			};
		},
    created(){
      console.log(this.$route)
      // labelManage  沟通
      this.getRoleUserDetail()
      this.init()
    },
    methods:{
      async init(){
          const getMechanismData = await getSetLabel({
            type:this.$route.name == 'LabelManage'?'1':'2',
            dataType:  '2', //（数据类型：1-机构名称，2-机构类型，3-角色类型，4-注册(服务)区域，5-服务专员标签）
            targetUserId:this.$route.query.userId,
            curUserId:this.$store.state.user.adminId,
          })

          //服务名称
          const getServiceData = await getServiceName({
            type:this.$route.name == 'LabelManage'?'1':'2',
            targetUserId:this.$route.query.userId,
            curUserId:this.$store.state.user.adminId,
          })

          const getServiceArea = await getSetLabel({
            type:this.$route.name == 'LabelManage'?'1':'2',
            dataType:  '4', //（数据类型：1-机构名称，2-机构类型，3-角色类型，4-注册(服务)区域，5-服务专员标签）
            targetUserId:this.$route.query.userId,
            curUserId:this.$store.state.user.adminId,
          })
          this.loading = true
          let [resultA, resultB,resultC] = await Promise.all([
              getMechanismData,
              getServiceData,
              getServiceArea
          ]);
          this.loading = false
          if(resultA.OK == 'True') {
            if(resultA.Tag.length) {
              this.mechanismData = resultA.Tag[0].Table
            } else {
              this.mechanismData = []
            }
          }
          if(resultB.OK == 'True') {
            if(resultB.Tag.length) {
              this.serviceData = resultB.Tag[0].Table
            } else {
              this.serviceData = []
            }
          }
          if(resultC.OK == 'True') {
            if(resultC.Tag.length) {
              this.serviceArea = resultC.Tag[0].Table
            } else {
              this.serviceArea = []
            }
          }

      },
      async getRoleUserDetail() {
        await getRoleUserDetail({
          userId: this.$route.query.userId,
		      curUserId: this.$store.state.user.adminId,
        }).then(res => {
          if(res.OK == 'True') {
            if(res.Tag.length) {
              let data = res.Tag[0].Table
              this.tableData = data
            } else {
              let data = []
              this.tableData = data
            }
          }
        })
      },
      delData(type,index,row){
        // let data = this[type].splice(index,1)
        console.log(row)
        this.$confirm('请确认要删除该数据吗', '', {
					confirmButtonText: '确定',
					type: 'warning'
				}).then(() => {
          this.delHandle(type,index,row)

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
      },
      async delHandle(type,index,row){
        console.log("9909090909")
        console.log(row)
        this.loading = true
        let res = await delLabel({
          userLabelGuid:row.userLabelGuid,
          curUserId:this.$store.state.user.adminId,
        })
        if(res.Tag[0] > 0){
          this.$message({
          	type: 'success',
          	message: '删除成功!'
          });
          this.loading = false
          this.init()
        }else{
          this.loading = false
          this.$message({
          	type: 'error',
          	message: '删除失败!'
          });
        }

      },
    async setTing(type){
      this.currentInfo = {
        type:type,
      }
      let res;
      if(type == 'mechanismData'){
          res  = await getLabelAll({
            type:this.$route.name == 'LabelManage'?'1':'2',
            dataType:  '2',
            targetUserId:this.$route.query.userId,
            size:'20',
            page:this.page,
            curUserId:this.$store.state.user.adminId,
          })
      }else if(type == 'serviceData'){
        res = await getServiceNameAll({
            type:this.$route.name == 'LabelManage'?'1':'2',
            targetUserId:this.$route.query.userId,
            curUserId:this.$store.state.user.adminId,
        })
      }
      if (res.Tag.length) {
          let data = res.Tag[0].Table
          this.selectList = data
          let selectData = data.filter(item=>item.selectedFlag == 1)
          this.selectData = selectData.map(item=>item.dataGuid)
          this.pageTotal = (this.page - 1) * 20 + 21
        } else {
          this.selectList = []
          this.selectData = []
          this.pageTotal = (this.page - 1) * 20 + 1
      }
      this.editSelect = true
    },
    search(data) {
      this.searchVal = data
      this.page = 1
      this.init()
      //
    },
    changePage(page) {
      this.page = page
      this.init()
    },
    async submit(){
      this.editSelect = false
      let dataType;
      if(this.currentInfo.type == 'mechanismData'){
        //机构类型
        dataType = 2
      }else if(this.currentInfo.type == 'serviceData'){
        dataType = 6
      }else if(this.currentInfo.type == 'serviceArea'){
        dataType = 4
      }
      let arr = this.selectData.map(item=>{
        console.log(item)
        if(item){
          return {
            type:this.$route.name == 'LabelManage'?'1':'2',
            dataType:dataType,
            dataGuid:item,
            targetUserId:this.$route.query.userId,
            curUserId:this.$store.state.user.adminId
          }
        }
      })
      console.log(arr)
      let res = await setLabel(JSON.stringify(arr))
      if(res.Tag[0] > 0){
          this.$message({
            type: 'success',
            message: '设置成功!'
          });
          this.search()
        }else{
          this.$message({
            type: 'error',
            message: '设置失败'
          });
        }
      this.init()
      this.selectData = []
      this.editSelect = false
      this.showSelect = false
    },
    setTingArea(){
      this.currentInfo.type = 'serviceArea'
      this.showSelect = true
    },
    closeDamage(data){
      this.selectData = Array.of(data)
      this.showSelect = false
      this.submit()
    },
  },
}
</script>
<style lang="scss" scoped>
	.title-bg {
		background-color: #F2F2F2;
		padding: 10px;
	}
  .c-red{
    color:red
  }
  .w1500{
    width:1500px;
  }
  .p10{
    padding:10px;
  }
  .bt-#DCDFE6{

    width:100%;
    height:1px;
  }
  .pl10{
    padding-left:10px;
  }
  .app-container{
    font-size:14px;
    .w300{
      width:300px;
    }
    .contentItem{
      width:300px;
      margin-bottom: 20px;
    }
  }
  .submitBtn{
    position: absolute;
    top:11px;
    right:151px;
  }

</style>
