<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="执行未开始" name="1" v-loading="loading">
      </el-tab-pane>
      <el-tab-pane label="执行中" name="2" v-loading="loading">
      </el-tab-pane>
      <el-tab-pane label="执行结束" name="3" v-loading="loading">
      </el-tab-pane>
    </el-tabs>
     <div  class="flex jsb flex-center f-14 ">
        <div class="flex flex-center f-14">
            <div class="flex flex-center mb20 mr20">
              <div class="filter-item-title mr10">执行日期</div>
              <el-input  placeholder="请选择" :value="searchTime"
                style="width: 300px;" readonly @focus="openTime">
                <i class="el-icon-date el-input__icon" slot="suffix" @click="openTime">
                </i>
              </el-input>
            </div>
            <searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的服务名称'></searchCom>
        </div>
        <div class="mb20">
          <el-button @click="dispatchHandle" type="primary">{{$route.name == 'Distribution'?'沟通任务派发':'服务任务派发'}}</el-button>
        </div>
     </div>
    <el-table v-loading="loading" border :data="tableData" style>
      <el-table-column label="派发日期" prop="AssignDate" align="center" />
      <el-table-column label="执行日期" prop="taskTime" align="center" />
      <el-table-column label="服务名称" prop="sdPName" align="center" />
      <el-table-column label="派发用户数量" prop="targetObjectNum" align="center" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="checkDetail(scope.row)">派发详情查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pages @changePage="changePage" :total="pageTotal" :page="page"></pages>

    <!-- 选择时间 -->
    <el-dialog title="执行日期" :visible.sync="setTimeBox" width="700px" destroy-on-close append-to-body>
      <el-button class="submitBtn" type="primary" @click="submitTime" >保存</el-button>
      <div style=" border-top:1px solid #DCDFE6;padding:5px 0"></div>
     <div class="mb20 mt10">
      <el-radio-group v-model="selectTime" class="flex direction-clo">
        <el-radio :label="item.taskDate" class="mb15" v-for="(item,index) in timeList" :key="index">{{item.taskDate}}</el-radio >
      </el-radio-group>
     </div>
      <div style="padding-bottom: 20px;padding-top:20px">
        <pages @changePage="changePageTime" :total="pageTotalTime" :page="pageTime"></pages>
      </div>
    </el-dialog>
  </div>
</template>
<script>
	import searchCom from '@/views/components/common/searchCom.vue'
	import pages from '@/views/components/common/pages'
  import { getNotStartList,serviceGetNotStartList,getStartingList,serviceGetStartingList, getEndList,serviceGetEndList,getTaskTimeList,serviceGetTaskTimeList } from '@/api/communicationApi/distribution';
import { pathToFileURL } from 'url';
  export default {
    name: "index",
		components: {
			searchCom,
			pages,
		},
    data() {
      return {
        activeName: '1',
        tableData: [],
        loading: true,
        page: 1,
				pageTotal: 0,
				searchResult: 0,
				searchVal: '',
        searchTime:'',
        setTimeBox:false,
        pageTotalTime:0,
        pageTime:1,
        timeList:[],
        selectTime:''
      };
    },
    created(){
      this.getTimeList()
      this.init()
    },
    watch:{
      activeName(){
        this.page = 1
        this.searchVal = ''
        this.searchTime=''
        this.init()
      },

    },
    methods: {
      async init(){
        let fun, startDate='',endDate='';
        if(this.activeName==1){
          fun = this.$route.name == 'Distribution'?getNotStartList:serviceGetNotStartList
        }else if(this.activeName==2){
          fun = this.$route.name == 'Distribution'? getStartingList:serviceGetStartingList
        }else if(this.activeName==3){
          fun = this.$route.name == 'Distribution'? getEndList:serviceGetEndList
        }

        if(this.searchTime){
          startDate = this.searchTime.split('---')[0]
          endDate = this.searchTime.split('---')[1]
        }
        let res = await fun({
          sdPName:this.searchVal,
          startDate:startDate,
          endDate:endDate,
          size:'20',
          page:this.page,
          curUserId:this.$store.state.user.adminId,
        })
        this.loading = false
        if (res.Tag.length) {
          let data = res.Tag[0].Table
          this.tableData = data
          this.pageTotal = (this.pageTime - 1) * 20 + 21
        } else {
          this.tableData = []
          this.pageTotal = (this.pageTime - 1) * 20 + 1
        }
      },
      async getTimeList(){
        let fun = this.$route.name == 'Distribution'?getTaskTimeList:serviceGetTaskTimeList
        let res = await fun({
          size:'20',
          page:this.pageTime,
          curUserId:this.$store.state.user.adminId,
        })
        if (res.Tag.length) {
          let data = res.Tag[0].Table
          this.timeList = data
          this.pageTotalTime = (this.page - 1) * 20 + 21
        } else {
          this.timeList = []
          this.pageTotalTime = (this.page - 1) * 20 + 1
        }

      },
      handleClick(tab, event) {
        console.log(tab);
        // this.tableData = []
        this.loading = true
        let index = tab.index
      },

      search(data) {
				this.searchVal = data
				this.page = 1
				this.init()
			},
			changePage(page) {
				this.page = page
				this.init()
			},
      changePageTime(page){
        this.pageTime = page
      },
      openTime(){
        this.selectTime = this.searchTime
        this.setTimeBox = true
      },
      checkDetail(row){
          this.$router.push({
            name:this.$route.name == 'Distribution'?'DispatchTasks':'ServiceDispatchTasks',
            query:{
              commuTaskGuid:row.commuTaskGuid
            }
          })
      },
      dispatchHandle(){
        this.$router.push({
            name:this.$route.name == 'Distribution'?'DispatchTasks':'ServiceDispatchTasks',
            // commuTaskGuid:row.commuTaskGuid
          })
      },
      submitTime(){
        this.setTimeBox = false
        this.searchTime = this.selectTime
        // this.pageTotalTime=0
        // this.timeList=[]
        this.pageTime = 1
        this.init()
      }
    },

  };
</script>
<style lang="scss" scoped>
  .f-14{
    font-size: 14px;
  }
  .submitBtn{
    position: absolute;
    top:11px;
    right:151px;
  }
  .mb15{
    margin-bottom:15px;
  }
</style>
