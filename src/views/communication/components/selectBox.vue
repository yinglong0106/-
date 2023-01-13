<template>
   <el-dialog :title="title" :visible.sync="isOpen" width="700px"  @close="beforeClose">
      <el-button class="submitBtn" type="primary" @click="submit">保存</el-button>
      <div style=" border-top:1px solid #DCDFE6;padding:5px 0"></div>
      <div class="flex jsb flex-center mt5" v-if="type != 4">
        <searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的内容'></searchCom>
      </div>
     <div class="mb20">
      <el-radio-group v-model="selectData" class="flex direction-clo">
        <el-radio :disabled="item.selectedFlag == 1" :label="item.dataGuid" v-for="(item,index) in selectList" :key="index" class="mb10">{{item.labelData}}</el-radio>
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
import { getLabelAll } from '@/api/communicationApi/preparation';

export default {
		name: "index",
    components:{pages,searchCom},

		props: {
			openRow: {
				type: String,
				default: () => {
					return ''
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
			};
		},
    mounted() {
      this.init()
    },
		methods: {
        async init(){
          let res  = await getLabelAll({
            type:this.$route.name == 'LabelManage'?'1':'2',
            dataType:  '4',
            targetUserId:this.$route.query.userId,
            size:'20',
            page:this.page,
            curUserId:this.$store.state.user.adminId,
          })
          if (res.Tag.length) {
            let data = res.Tag[0].Table
            this.selectList = data
            this.selectData = data.map(item=>{
              if(item.selectedFlag == 1){
                return item.dataGuid
              }
            })
            this.pageTotal = (this.page - 1) * 20 + 21
          } else {
            this.selectList = []
            this.selectData = []
            this.pageTotal = (this.page - 1) * 20 + 1
          }
        },
        close() {
          this.isOpen = false
          this.$emit('close',this.selectData)
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
				this.init()
			},
      changePage(page) {
				this.page = page
				this.init()
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
