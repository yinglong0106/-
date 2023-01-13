<template>
  <div class="targetUserSelection">
    <div class="w350 f-14 p10">
				<div class="mb10">
          <div class="title-bg mb10" >
            <div>用户类型信息</div>
          </div>
          <div class="flex flex-center p10">
            <div class="input-text mr10">机构类型</div>
            <el-input style="width:240px" type="text" :value="mechanism.name" placeholder="请选择" suffix-icon="el-icon-arrow-down"
              @focus="openFather('mechanism')" />
          </div>
          <div class="flex flex-center p10">
            <div class="input-text mr10">注册区域</div>
            <el-input style="width:240px" type="text" :value="areaSelect.name" placeholder="请选择" suffix-icon="el-icon-arrow-down"
              @focus="openFather('areaSelect')" />
          </div>
          <div class="flex flex-center p10">
            <div class="input-text mr10">角色类型</div>
            <el-input style="width:240px" type="text" :value="roleType.name" placeholder="请选择" suffix-icon="el-icon-arrow-down"
              @focus="openFather('roleType')" />
          </div>
        </div>
		</div>
    <div class="p10">
          <div class="title-bg mb10" >
            <div>用户选择（{{hasSelectLength}}/200）</div>
            <div class="el-icon-arrow-right"></div>
          </div>
          <div class="flex jsb flex-center mt5 ">
            <searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的机构名称'></searchCom>
          </div>
          <div class="w1200">
            <el-table border :data="tableData" style>
              <el-table-column label="姓名" prop="nickName" align="center" />
              <el-table-column label="联系电话" prop="phonenumber" align="center" />
              <el-table-column label="机构名称" prop="orgName" align="center" />
              <el-table-column label="角色类型" prop="roleType" align="center" />
              <el-table-column label="机构类型" prop="orgType" align="center" />
              <el-table-column label="注册区域" prop="registerCity" align="center" />
              <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                  <el-button v-if="hasSelect.includes(scope.row.objectGuid)" size="mini" type="info">已添加</el-button>
                  <el-button size="mini" type="text" @click="addRow(scope.row)" v-else>添加</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="position">
              <pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
            </div>
          </div>
      </div>
    <div class="flex flex-center footer"><el-button type="primary" @click="submitHandle">保存</el-button></div>
    <SelectBox v-if="showSelect" :title="titleModel" :type="type" :openRow="current" @close="closeDamage"></SelectBox>
  </div>
</template>
<script>
	import pages from '@/views/components/common/pages'
  import SelectBox from './components/selectBox.vue'
  import searchCom from '@/views/components/common/searchCom.vue'
  import { userTargetList,getNumber,serviceUserTargetList } from '@/api/communicationApi/distribution';

  export default {
    components:{SelectBox,pages,searchCom},

    data(){
      return {
        titleModel:"",
        type:'',
        current:{},
        showSelect:false,
        page: 1,
				pageTotal: 0,
        loading: true,
        searchResult:0,
        searchVal:'',
        mechanism:{
          name:''
        },
        areaSelect:{
          name:''
        },
        roleType:{
          name:''
        },
        tableData:[],
        storeList:this.$store.state.dipatch.target
      }
    },
    created(){
      this.init()

    },
    computed:{
      hasSelect(){
        let target = this.storeList
        if(target && target.length){
          return target.map(item=>{
            return item.objectGuid
          })
        }else{
          return []
        }
      },
      hasSelectLength(){
        let target = this.$store.state.dipatch.target;
        return target.length
      }
    },
    methods:{
      async init(){
        if(this.mechanism.name && this.roleType.name && this.areaSelect.name){
          let params = {
            orgType:this.mechanism.name,
            registerCity:this.areaSelect.name,
            roleType:this.roleType.name,
            orgName:this.searchVal,
            curUserId:this.$store.state.user.adminId,
          }
          let fun = this.$route.name == 'TargetUserSelection'?userTargetList:serviceUserTargetList
          let res = await fun({
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

          let allNumber = await getNumber(params)
          console.log(allNumber)
        }

      },
      closeDamage(data){
        this.showSelect = false
        console.log(data)
        if(!data){
          return
        }
        if(data.type == '2'){
          this.mechanism = data.data
        }else if(data.type == '4'){
          this.areaSelect = data.data
        }else if(data.type == '3'){
          this.roleType = data.data
        }
        this.page = 1
        this.init()
      },
      openFather(data){
        if(data == 'mechanism'){
          this.titleModel = '机构类型选择'
          this.type = '2'
        }else if(data== 'areaSelect'){
          this.titleModel = '注册区域选择'
          this.type = '4'
        }else{
          this.titleModel = '角色类型选择'
          this.type = '3'
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
      addRow(row){
        console.log(row)
        this.storeList.push(row)

        console.log(this.$store)
        console.log(this.$store.state.dipatch.target)
      },
      submitHandle(){
        this.$store.commit('SET_TARGET', this.storeList);
        this.$store.commit('SET_MECHANISM', this.mechanism);
        this.$store.commit('SET_ROLETYPE', this.roleType);
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
    min-width:1200px;
  }
  .footer{
    width:1200px;
    display: flex;
    justify-content: center;
    margin-top:30px;
    padding-bottom:40px;
  }
</style>
