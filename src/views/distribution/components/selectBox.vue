<template>
   <el-dialog :title="title" :visible.sync="isOpen" width="700px"  @close="beforeClose">
      <el-button class="submitBtn" type="primary" @click="submit">保存</el-button>
      <div style=" border-top:1px solid #DCDFE6;padding:5px 0"></div>
      <div class="flex jsb flex-center mt5" v-if="type != 4">
        <searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的内容'></searchCom>
      </div>
     <div class="mb20">
      <el-radio-group v-model="selectData" class="flex direction-clo">
        <el-radio @change="val=>changeVal(val,item)" :label="item.dataGuid" v-for="(item,index) in selectList" :key="index" class="mb10">{{item.name}}</el-radio>
      </el-radio-group>
     </div>
     <div style="padding-bottom: 20px;padding-top:20px">
      <pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
     </div>
    </el-dialog>
</template>
<script>
import pages from '@/views/components/common/pages'
import searchCom from '@/views/components/common/searchCom.vue'
import { getLabelList,getServiceName } from '@/api/communicationApi/distribution';

export default {
		name: "index",
    components:{pages,searchCom},

		props: {
			openRow: {
				type: Object,
				default: () => {
					return {}
				}
			},
			type: {
				type: String,
				default: '1'
			},
      title:{
        type: String,
				default: '机构类型'
      }
		},
    watch:{
      openRow:{
        handler(v){
          console.log(v)
          if(v && v.dataGuid){
            this.selectData = v.dataGuid
            this.changeVal(v.dataGuid,v)
          }
        },
        immediate:true,
        deep:true
      },
      type:{
        handler(v){
          this.init(v)
          console.log(11111)
          console.log(v)
        },
        immediate:true,
        deep:true
      },
    },
		data() {
			return {
				isOpen: true,
				url: '',
				selectData:'',
        selectList:[],
        loading: true,
        page: 1,
				pageTotal: 0,
				searchResult: 0,
				searchVal: '',
        selectInfo:''
			};
		},
    mounted() {
      // this.init()
    },
		methods: {
        async init(type){
          console.log(type)
          let fun,params
          if(type == -1){

            fun = getServiceName
            params = {
              name:this.searchVal,
              curUserId:this.$store.state.user.adminId,
            }
          }else{
            fun = getLabelList
            params = {
              type:type,
              name:this.searchVal,
              size:'20',
              page:this.page,
              curUserId:this.$store.state.user.adminId,
            }
          }
          let res  = await fun(params)
          if (res.Tag.length) {
            let data = res.Tag[0].Table
            data = data.map(item=>{
              let val = item
              val.name = item.name?item.name:item.sdPName
              val.dataGuid =val.dataGuid?val.dataGuid: val.sdPathGuid
              return val
            })
            this.selectList = data
            this.pageTotal = (this.page - 1) * 20 + 21
          } else {
            this.selectList = []

            this.pageTotal = (this.page - 1) * 20 + 1
          }
        },
        close() {
          this.isOpen = false
          this.$emit('close',{
            type:this.type,
            data:this.selectInfo
          })
        },
        changeVal(val,item){
          console.log(item)
          this.selectInfo = item
        },
        beforeClose() {
          this.close()
        },
        getData(){
        this.selectList = []
      },
      submit(){
        this.close()
      },
      search(data) {
				this.searchVal = data
				this.page = 1
				this.init(this.type)
			},
      changePage(page) {
				this.page = page
				this.init(this.type)
			},
		},

		created() {
      this.getData()
			// if (this.type === '1') {
			// 	this.getCancelOrderDetail()
			// } else {
			// 	this.getRefundOrderDetail()
			// }
		}
	};
</script>
<style lang="scss" scoped>
  .submitBtn{
    position: absolute;
    top:11px;
    right:151px;
  }
  .mb15{
    margin-bottom:15px;
  }
</style>
