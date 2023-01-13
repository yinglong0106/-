<template>
  <div class="app-container p15">
    <div class="w350 f-14">
				<div class="mb10">
          <div class="title-bg mb10" >
            <div>任务执行时间</div>
          </div>
          <div >
            <el-row  class="flex flex-center jsb mb10">
              <el-col :span="7">&nbsp;&nbsp;起始日期</el-col>
              <el-col :span="15">
                <el-date-picker
                  v-model="startDate"
                  style="width:207px"
                  value-format="yyyy-MM-dd"
                  type="date"
                  :picker-options="pickerOptions"
                  placeholder="选择日期">
                </el-date-picker>
              </el-col>

              <!-- <el-col :span="11">{{startDate?startDate:'请选择'}}</el-col>
              <el-col :span="4" > <i style="font-size: 24px;" class="el-icon-date"  @click="openTime"></i></el-col> -->
            </el-row>
            <el-row  class="flex flex-center jsb mb10">
              <el-col :span="7">&nbsp;&nbsp;截止日期</el-col>
              <el-col :span="15">
                <el-date-picker
                  v-model="endDate"
                  value-format="yyyy-MM-dd"
                  style="width:207px"
                  type="date"
                  :picker-options="{
                    disabledDate: (time) => {
                      return time.getTime() < new Date(startDate);
                    },
                  }"
                  placeholder="选择日期">
                </el-date-picker>
              </el-col>
              <!-- <el-col :span="11">{{endDate?endDate:'请选择'}}</el-col>
              <el-col :span="4" ><i style="font-size: 24px;" class="el-icon-date"  @click="openTime"></i></el-col> -->
            </el-row>
          </div>
        </div>
        <div class="">
				    <div class="title-bg" @click="toServiceName">
              <div>服务名称选择({{serviceName?1:0}})</div>
              <div class="el-icon-arrow-right"></div>
            </div>
            <div class="p10">
              <div v-if="serviceName">{{serviceName.sdPName}}</div>
            </div>
        </div>
        <div class="">
				    <div class="title-bg" @click="toCommucation">
              <div>{{$route.name == 'ServiceDispatchTasks'?"服务话术选择":"沟通话术选择"}}（{{communication?1:0}}）</div>
              <div class="el-icon-arrow-right"></div>
            </div>
            <div class="p10" >
              <div v-if="communication">{{communication.fieldName}}</div>
            </div>
        </div>
        <div class="mb10">
				    <div class="title-bg mb10" @click="toUser">
              <div>目标用户选择({{target.length}})</div>
              <div class="el-icon-arrow-right"></div>
            </div>
            <div class="w1200">
              <el-table border :data="target" style>
                <el-table-column label="姓名" prop="nickName" align="center" />
                <el-table-column label="联系电话" prop="phonenumber" align="center" />
                <el-table-column label="机构名称" prop="orgName" align="center" />
                <el-table-column label="角色类型" prop="roleType" align="center" />
                <el-table-column label="机构类型" prop="orgType" align="center" />
                <el-table-column label="注册区域" prop="registerCity" align="center" />
                <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                  <template slot-scope="scope">
                    <el-button size="mini" type="text" @click="cancelAdd(scope.index)">取消添加</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <!-- <div class="position">
                <pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
              </div> -->
            </div>
        </div>
        <div class="">
				    <div class="title-bg mb10" @click="specialSelect">
              <div>{{$route.name == 'ServiceDispatchTasks'?'服务专员选择':'沟通专员选择'}}（{{commuteUser.length}}）</div>
              <div class="el-icon-arrow-right"></div>
            </div>
            <div class="w1200">
              <el-table border :data="commuteUser" style>
                <el-table-column label="账号名称" prop="userName" align="center" />
                <el-table-column label="姓名" prop="nickName" align="center" />
                <el-table-column label="联系电话" prop="phonenumber" align="center" />

                <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                  <template slot-scope="scope">
                    <el-button size="mini" type="text" @click="delData(scope.index)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>

            </div>
        </div>
		</div>
    <div class="flex flex-center footer"><el-button @click="dispatchHandle" type="primary" :disabled="canSubmit">派 发</el-button></div>

      <!-- <el-dialog title="执行日期" :visible.sync="setTimeBox" width="700px" destroy-on-close append-to-body>
        <el-button class="submitBtn" type="primary" @click="submitTime" >保存</el-button>
        <div style=" border-top:1px solid #DCDFE6;padding:5px 0"></div>
      <div class="mb20">
        <el-radio-group v-model="selectTime" class="flex direction-clo">
          <el-radio  label="1" class="mb15">2022-12-12--2022-12-12</el-radio >
          <el-radio  label="1" class="mb15">2022-12-12--2022-12-12</el-radio >
          <el-radio  label="2" class="mb15" disabled>2022-12-12--2022-12-12</el-radio >
        </el-radio-group>
      </div>
        <div style="padding-bottom: 20px;padding-top:20px">
          <pages @changePage="changePageTime" :total="pageTotalTime" :page="pageTime"></pages>
        </div>
    </el-dialog> -->
  </div>
</template>

<script>
	import pages from '@/views/components/common/pages'
  import {
    getNewId,
  } from '@/api/commonApi.js'
  import { dispatchButed } from '@/api/communicationApi/distribution';
import identity from 'lodash/identity'
   export default {
    name: "index",
		components: {
      pages
		},
    data(){
      return {
        startDate:this.$store.state.dipatch.startDate,
        endDate:this.$store.state.dipatch.endDate,
        setTimeBox:false,
        page: 1,
				pageTotal: 0,
        loading: true,
        pageTotalTime:0,
        pageTime:1,
        timeList:[],
        tableData:[],
        selectTime:"",
        target:[],
        commuteUser:[],
        serviceName:null,
        communication:null,
        pickerOptions: {
          disabledDate:(time)=>{
            if(this.endDate){
                return time.getTime() < Date.now() || time.getTime() > new Date(this.endDate).getTime();
              }else{
                return time.getTime() < Date.now();
              }
          }
        },

      }
    },
    created(){
      console.log(this.$route.name)
      this.init()
    },
    computed:{
      canSubmit(){
        let flag = true
        if(this.startDate && this.endDate && this.serviceName && this.communication && this.target.length && this.commuteUser.length){
          flag = false
        }
        return flag
      }
    },
    watch:{
      startDate(v){
        this.$store.commit('SET_STARTDATE', v);
      },
      endDate(v){
        this.$store.commit('SET_ENDDATE', v);
      }
    },
    methods:{
      init(){
        this.target = this.$store.state.dipatch.target
        this.commuteUser = this.$store.state.dipatch.commuteUser
        this.serviceName = this.$store.state.dipatch.serviceName
        this.communication = this.$store.state.dipatch.communication
      },
      changePageTime(page){
        this.pageTime = page

      },
      openTime(){
        this.setTimeBox = true
      },
      cancelAdd(index){
        let target = [...this.target]
        target.splice(index,1)
        this.$store.commit('DEL_TARGET',target);
        this.target = target
        this.$message({
          type: 'success',
          message: '取消添加成功!'
        });
      },
      changePage(page) {
				this.page = page
				this.init()
			},
      submitTime(){
        this.setTimeBox = false
        // this.pageTotalTime=0
        // this.timeList=[]
        this.pageTime=1

      },
      delData(index){
        // let data = this[type].splice(index,1)
        this.$confirm('请确认要删除该数据吗', '', {
					confirmButtonText: '确定',
					type: 'warning'
				}).then(() => {
          this.commuteUser = []
          this.$store.commit('SET_COMMUTEUSER', this.commuteUser);
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
      },
      toUser(){
        this.$router.push({
          name:this.$route.name == 'DispatchTasks'?"TargetUserSelection":'SerciceTargetUserSelection',
          query:{
            commuTaskGuid:this.$route.query.commuTaskGuid
          }
        })
      },
      //专员选择
      specialSelect(){
        this.$router.push({
          name:this.$route.name == 'DispatchTasks'?"SpecialistsSelect":'ServicePpecialists',
          query:{
            commuTaskGuid:this.$route.query.commuTaskGuid
          }
        })
      },

      //服务名称选择
      toServiceName(){
        this.$router.push({
          name:this.$route.name == 'DispatchTasks'?"ServiceNameSelect":'OpserviceNameSelect',
          query:{
            commuTaskGuid:this.$route.query.commuTaskGuid
          }
        })
      },
      //话术选择
      toCommucation(){
        this.$router.push({
          name:this.$route.name == 'DispatchTasks'?"CommunicateSelect":'ServiceCommunicateSelect',
          query:{
            commuTaskGuid:this.$route.query.commuTaskGuid
          }
        })
      },

      //派发
      async dispatchHandle(){
        console.log(this.$store)
        let Guid =  await getNewId()
        console.log(this.commuteUser)
        let arr = []
        let paraItem =  {
            commuTaskGuid:Guid,
            startDate:this.startDate,
            endDate:this.endDate,
            sdPathGuid:this.serviceName.sdPathGuid,
            pfelangGuid:this.communication.pfelangGuid,
            bizdict2Guid:this.$store.state.dipatch.mechanism.dataGuid,
            targetUserId:this.commuteUser.length?this.commuteUser[0].userId:'',
            targetObjectNum:this.target.length,
            curUserId:this.$store.state.user.adminId,
          }
        let params1 = {
          DBC:"w_a",
          SqlCmdName:'aprc\\web\\server2\\commutask\\insert_1_0_1',
          Parameter:JSON.stringify(Array.of(paraItem))
        }
        let paraItem2 = this.target.length?this.target.map(item=>{
          return {
            commuTaskGuid:Guid,
            startDate:this.startDate,
            endDate:this.endDate,
            objectGuid:item.objectGuid,
            objectOrgGuid:item.objectOrgGuid,
            curUserId:this.$store.state.user.adminId,
          }
        }):[]
        let params2 = {
          DBC:"w_a",
          SqlCmdName:'aprc\\web\\server2\\commutask\\insertTobj_1_0_1',
          Parameter:JSON.stringify(paraItem2)
        }
        this.loading = true
        let res = await dispatchButed(Array.of(params1,params2))
        this.loading = false
        console.log(res)
        if (res.Tag[0] > 0) {
            this.$message({
              type: 'success',
              message: "派发成功"
            })
            this.$store.commit('SET_CLEAR');
          } else {
            this.$message({
              type: 'error',
              message: res.Message
            })
            this.loadingModel = false
          }
      }
    }
  }
</script>
<style scoped lang="scss">
.p15{
  padding:15px;
}
.f-14{
  font-size:14px;
}
.w350{
  width:350px;
}
.mb15{
  margin-bottom:15px;
}
.p10{
  padding:10px;
}
.submitBtn{
    position: absolute;
    top:11px;
    right:151px;
  }
.title-bg {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 330px;
		background-color: #f2f2f2;
		padding: 10px;
	}
  .position{
    position:relative;
    height: 80px;
  }
  .w1200{
    min-width:1200px;
  }
  .footer{
    width:1200px;
    display: flex;
    justify-content: center;
    margin-top:60px;
    padding-bottom:40px;
    padding-bottom:40px;
  }
</style>
