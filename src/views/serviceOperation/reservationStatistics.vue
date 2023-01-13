<template>
  <div class="reservationStatistics p15 w1200">
    <el-table  border :data="tableData" style>
          <el-table-column label="派发日期" prop="date" align="center" />
          <el-table-column label="执行日期" prop="date" align="center" />
          <el-table-column label="服务名称" prop="account" align="center" />
          <el-table-column label="派发用户数量" prop="number" align="center" />
      </el-table>
      <el-divider></el-divider>
      <div class="">
        <div class="title-bg mb10" >
          <div>服务专员信息</div>
        </div>
        <div class="mb20">
          <el-table border :data="userTableData" style>
            <el-table-column label="账号名称" prop="account" align="center" />
            <el-table-column label="姓名" prop="name" align="center" />
            <el-table-column label="联系电话" prop="phone" align="center" />
          </el-table>
        </div>
      </div>
      <el-divider></el-divider>
      <div class="">
        <div class="title-bg mb10" >
          <div>意向预约统计（2）</div>
        </div>
        <div class="mb20">
          <el-table border :data="reservationTableData" style>
            <el-table-column label="服务名称" prop="name" align="center" />
            <el-table-column label="数量" prop="number" align="center" />
            <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <el-button size="mini" type="text" @click="checkDetail(scope.row)">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
      </div>
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
        reservationTableData:[
          {
            name:"融资服务",
            number:'0',
          },
          {
            name:"保险服务",
            number:'0',
          },
          {
            name:"合规服务",
            number:'1',
          }
        ],
        checkDetail(row){

        },
        changePage(page) {
          this.page = page
          //
			  },
      }
    },
  }
</script>
<style scoped lang="scss">
  .p15{
      padding:15px;
    }
  .f-14{
    font-size:14px;
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
</style>
