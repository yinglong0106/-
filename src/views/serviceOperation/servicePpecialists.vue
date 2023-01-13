<template>
  <div class="targetUserSelection">
    <div class="w350 f-14 p10">
				<div class="mb10">
          <div class="title-bg mb10" >
            <div>服务专员筛选</div>
          </div>
          <div class="title-bg mb10" >
            <div>用户类型信息</div>
          </div>
          <div class="flex flex-center p10">
            <div class="input-text mr10">机构类型</div>
            <el-input style="width:240px" type="text" :value="mechanism.label" placeholder="请选择" suffix-icon="el-icon-arrow-down"
              @focus="openFather('mechanism')" />
          </div>

          <div class="title-bg mb10" >
            <div>专员标签信息</div>
          </div>
          <div class="flex flex-center p10">
            <div class="input-text mr10">专员标签</div>
            <el-input style="width:240px" type="text" :value="specialTag.label" placeholder="请选择" suffix-icon="el-icon-arrow-down"
              @focus="openFather('specialTag')" />
          </div>

          <div class="title-bg mb10" >
            <div>所处区域信息</div>
          </div>
          <div class="flex flex-center p10">
            <div class="input-text mr10">服务区域</div>
            <el-input style="width:240px" type="text" :value="areaSelect.label" placeholder="请选择" suffix-icon="el-icon-arrow-down"
              @focus="openFather('areaSelect')" />
          </div>
        </div>

        <div class="">
				    <div class="title-bg mb10" >
              <div>服务专员选择（{{commuteUser.length}}）</div>
            </div>
            <div class="flex jsb flex-center mt5 ">
              <searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的内容'></searchCom>
            </div>
            <div class="w1200 ">
              <el-table border  @current-change="handleCurrentChange" highlight-current-row :data="tableData" style>
                <el-table-column label="账号名称" prop="userName" align="center" />
                <el-table-column label="姓名" prop="nickName" align="center" />
                <el-table-column label="联系电话" prop="phonenumber" align="center" />
              </el-table>
              <div class="position">
                <pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
              </div>
            </div>
        </div>
		</div>
    <div class="flex flex-center footer"><el-button type="primary" @click="submitHandle">添加</el-button></div>
    <SelectBox v-if="showSelect" :title="titleModel" :type="type" :openRow="current" @close="closeDamage"></SelectBox>
  </div>
</template>
<script>
	import pages from '@/views/components/common/pages'
  import SelectBox from '@/views/distribution/components/selectBox.vue'
  import searchCom from '@/views/components/common/searchCom.vue'
  import {serviceSpecialUser } from '@/api/communicationApi/distribution';

  export default {
    components:{SelectBox,pages,searchCom},

    data(){
      return {
        titleModel:"",
        type:'',
        current:{},
        showSelect:false,
        loading: true,
        page: 1,
				pageTotal: 0,
        searchVal:'',
        searchResult:0,
        mechanism:{
          label:''
        },
        services:{
          name:''
        },
        specialTag:{
          name:''
        },
        areaSelect:{
          name:""
        },
        tableData:[{
          account:"111",
          name:"222",
          phone:'18859211502'
        }],
        currentRow:this.$store.state.dipatch.commuteUser
      }
    },
    methods:{
      async init(){
        if(this.mechanism.name && this.services.name && this.areaSelect.name && this.specialTag.name){
          let params = {
            serviceGetEndList:this.searchVal,
            sdPathGuid:this.services.dataGuid,
            data2Guid:this.mechanism.dataGuid,
            data4Guid:this.areaSelect.dataGuid,
            data5Guid:this.specialTag.dataGuid,
            curUserId:this.$store.state.user.adminId,
          }
          let res = await serviceSpecialUser({
              size:'20',
              page:this.page,
              ...params
          })
          if (res.Tag.length) {
            let data = res.Tag[0].Table
            this.tableData = data
            this.pageTotal = (this.page - 1) * 20 + 21
          } else {
            this.tableData = []
            this.pageTotal = (this.page - 1) * 20 + 1
          }
        }

      },
      closeDamage(data){
        this.showSelect = false
        if(!data){
          return
        }
        if(data.type == '2'){
          this.mechanism = data.data
        }else if(data.type == '-1'){
          this.services = data.data
        }else if(data.type == '5'){
          this.specialTag = data.data
        }else if(data.type == '4'){
          this.areaSelect = data.data
        }
        this.page = 1
        this.init()
      },
      openFather(data){
        if(data == 'mechanism'){
          this.titleModel = '机构类型选择'
          this.type = '2'
        }else if(data== 'services'){
          this.titleModel = '服务名称选择'
          this.type = '-1'
        }else if(data == 'specialTag'){
          this.titleModel = '专员标签选择'
          this.type = '5'
        }else if(data == 'areaSelect'){
          this.titleModel = '服务专员所在区域'
          this.type = '4'
        }
        this.current = this[data]
        this.showSelect = true
      },
      changePage(page) {
        this.page = page
        this.init()
      },
      search(data) {
				this.searchVal = data
				this.page = 1
        this.init()
			},
      handleCurrentChange(val) {
        this.currentRow = val;
      },
      submitHandle(){
        this.$store.commit('SET_COMMUTEUSER', Array.of(this.currentRow));
        // this.$router.back()
        this.$router.replace({
          name:this.$store.state.app.fromRoute.name,
          query:{...this.$store.state.app.fromRoute.query}
        })
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
    margin-top:30px;
    padding-bottom:40px;
  }
</style>
