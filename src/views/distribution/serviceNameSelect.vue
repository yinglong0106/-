<template>
  <div class="serviceNameSelect">
    <div class="w350 f-14 p10">
        <div class="">
				    <div class="title-bg mb10" >
              <div>服务名称选择（{{currentRow?1:0}}）</div>
            </div>

            <div class="">
              <el-table border  @current-change="handleCurrentChange" highlight-current-row :data="tableData" style>
                <el-table-column label="服务名称" prop="sdPName" align="center" />
              </el-table>
              <!-- <div class="position">
                <pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
              </div> -->
            </div>
        </div>
		</div>
    <div class="flex flex-center footer"><el-button type="primary" @click="addRow">保存</el-button></div>
  </div>
</template>
<script>
	import pages from '@/views/components/common/pages'
  import {getServiceName } from '@/api/communicationApi/distribution';
  export default {
    components:{pages},

    data(){
      return {
        titleModel:"",
        type:'1',
        current:{},
        showSelect:false,
        loading: true,
        page: 1,
				pageTotal: 0,
        searchVal:'',
        searchResult:0,
        tableData:[],
        currentRow:this.$store.state.dipatch.serviceName
      }
    },
    created(){
      this.init()
    },
    methods:{
      async init(){
        let params = {
            curUserId:this.$store.state.user.adminId,
          }
          let res = await getServiceName({
              ...params
          })
          if (res.Tag.length) {
            let data = res.Tag[0].Table
            this.tableData = data
            console.log(data)
            // this.pageTotal = (this.page - 1) * 20 + 21
          } else {
            this.tableData = []
            // this.pageTotal = (this.page - 1) * 20 + 1
          }
      },
      closeDamage(){
        this.showSelect = false
      },
      handleCurrentChange(val) {
        this.currentRow = val;
      },
      changePage(page) {
        this.page = page
        this.init()
      },
      addRow(){
        this.$store.commit('SET_SERVICENAME', this.currentRow);
        this.$router.replace({
          name:this.$store.state.app.fromRoute.name,
          query:{...this.$store.state.app.fromRoute.query}
        })
        // this.$router.back()
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
  .w1200{
    min-width:1200px;
  }
  .position{
    position:relative;
    height: 80px;
  }
  .footer{
    width:1200px;
    display: flex;
    justify-content: center;
    margin-top:50px;
    padding-bottom:40px;
  }
</style>
