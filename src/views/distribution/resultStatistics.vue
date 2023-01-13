<template>
  <div class="resultStatistics p15">
    <div class="w1200">
      <el-table  border :data="tableData" style>
          <el-table-column label="派发日期" prop="date" align="center" />
          <el-table-column label="执行日期" prop="date" align="center" />
          <el-table-column label="服务名称" prop="account" align="center" />
          <el-table-column label="派发用户数量" prop="number" align="center" />
      </el-table>
      <el-divider></el-divider>
      <div class="">
        <div class="title-bg mb10" >
          <div>沟通专员信息</div>
        </div>
        <div class="mb20">
          <el-table border :data="userTableData" style>
            <el-table-column label="账号名称" prop="account" align="center" />
            <el-table-column label="姓名" prop="name" align="center" />
            <el-table-column label="联系电话" prop="phone" align="center" />
          </el-table>
        </div>

        <div class="title-bg mb10" >
          <div>用户沟通结果</div>
        </div>
        <div>
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="接受服务(9)" name="first" v-loading="loading">
            </el-tab-pane>
            <el-tab-pane label="拒绝服务(8)" name="second" v-loading="loading">
            </el-tab-pane>
            <el-tab-pane label="未接通(7)" name="third" v-loading="loading">
            </el-tab-pane>
            <el-tab-pane label="无效号码(7)" name="third" v-loading="loading">
            </el-tab-pane>
            <el-tab-pane label="时间到被收回(7)" name="third" v-loading="loading">
            </el-tab-pane>
          </el-tabs>
          <div class="flex jsb flex-center mt5 ">
            <searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的机构名称或者联系电话'></searchCom>
          </div>
          <div>
            <el-table border :data="tableData1" style>
              <el-table-column label="姓名" prop="name" align="center" />
              <el-table-column label="联系电话" prop="phone" align="center" />
              <el-table-column label="机构名称" prop="paifaDate" align="center" />
              <el-table-column label="角色类型" prop="paifaDate" align="center" />
              <el-table-column label="机构类型" prop="paifaDate" align="center" />
              <el-table-column label="注册区域" prop="paifaDate" align="center" />
              <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                  <el-button size="mini" type="text" @click="checkRecords(scope.row)">查看沟通记录</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>

    <el-dialog title="沟通结果操作" :visible.sync="isOpen" width="1200px" append-to-body>
      <div class="">
        <el-table border :data="tableData1" style>
          <el-table-column label="姓名" prop="name" align="center" />
          <el-table-column label="联系电话" prop="phone" align="center" />
          <el-table-column label="机构名称" prop="paifaDate" align="center" />
          <el-table-column label="角色类型" prop="paifaDate" align="center" />
          <el-table-column label="机构类型" prop="paifaDate" align="center" />
          <el-table-column label="注册区域" prop="paifaDate" align="center" />
        </el-table>
        <el-divider></el-divider>
        <div class="">
          <div class="title-bg mb10" >
            <div>沟通结果 (必填)</div>
          </div>
          <div class="mb20">
            <el-radio-group v-model="result" class="flex direction-clo plr10">
              <el-radio  label="1" class="mb15">接受服务</el-radio >
              <el-radio  label="3" class="mb15">拒绝服务</el-radio >
              <el-radio  label="2" class="mb15">未接通</el-radio >
              <el-radio  label="2" class="mb15">无效号码</el-radio >
            </el-radio-group>
          </div>
          <div class="pb20">
            <el-input type="textarea" :rows="4" placeholder="" v-model="remark">
				    </el-input>
          </div>

        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
	import pages from '@/views/components/common/pages'
  import searchCom from '@/views/components/common/searchCom.vue'

  export default {
    components:{pages,searchCom},
    data(){
      return {
        loading: true,
        page: 1,
				pageTotal: 0,
        searchVal:'',
        searchResult:0,
        tableData:[{
          date:'2021-03-04',
          account:"融资服务",
          number:2000
        }],
        userTableData:[
          {
            account:"gtzy00",
            name:'张三',
            phone:'（+86）18650767213'
          }
        ],
        tableData1:[ {
          account:"gtzy00",
          name:'张三',
          phone:'（+86）18650767213'
        }],
        activeName:'first',
        isOpen:false,
        result:'3',
        remark:'联系电话取消了号码'
      }
    },
    methods:{
      handleClick(tab, event) {
        console.log(tab);
        this.tableData = []
        this.loading = true
        let index = tab.index

        this.getFixedData()
      },
      async getFixedData() {
            this.loading = false
        // await getFixedData({
        //   type: 1,
        //   name: '',
        //   bizType: this.bizType,
        //   page: 1,
        //   size: '200'
        // }).then(res => {
        //   console.log(res);
        //   this.loading = false
        //   if (res.Tag.length) {
        //     let data = res.Tag[0].Table
        //     this.tableData = data
        //   }
        // })
      },
      checkRecords(row){
        this.isOpen = true
      }
    }
  }
</script>
<style lang="scss" scoped>
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
.mb20{
  margin-bottom:20px;
}
.pb20{
  padding-bottom:20px;
}
.p10{
  padding:10px;
}
.plr10{
  padding:0px 10px;
}
.position{
    position:relative;
    height: 80px;
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
  .w1200{
    width:1200px;
  }
  .footer{
    width:1200px;
    display: flex;
    justify-content: center;
    margin-top:30px;
    padding-bottom:40px;
  }
</style>
