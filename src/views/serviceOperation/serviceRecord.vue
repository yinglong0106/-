<template>
  <div class="serviceRecord p15">
    <div class="w1200">
      <el-table  border :data="tableData" style>
          <el-table-column label="派发日期" prop="date" align="center" />
          <el-table-column label="执行日期" prop="date" align="center" />
          <el-table-column label="服务名称" prop="account" align="center" />
          <el-table-column label="派发用户数量" prop="number" align="center" />
      </el-table>
      <el-divider></el-divider>
      <div class="">
        <div class="title-bg mb20" >
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
          <div class="title-bg mb20" >
            <div>用户服务记录</div>
          </div>
          <div class="flex jsb flex-center mt5 ">
            <searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的机构名称或者联系电话'></searchCom>
          </div>
          <div class="w1200 ">
            <el-table border  @current-change="handleCurrentChange" highlight-current-row :data="tableData" style>
              <el-table-column label="姓名" prop="name" align="center" />
              <el-table-column label="联系电话" prop="phone" align="center" />
              <el-table-column label="机构名称" prop="jigou" align="center" />
              <el-table-column label="角色类型" prop="role" align="center" />
              <el-table-column label="机构类型" prop="type" align="center" />
              <el-table-column label="注册区域" prop="area" align="center" />
              <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                  <template slot-scope="scope">
                    <el-button size="mini" type="text">查看服务记录</el-button>
                  </template>
                </el-table-column>
            </el-table>
            <div class="position">
              <pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
            </div>
          </div>
        </div>
    </div>

    <el-dialog title="查看服务记录" :visible.sync="isOpen" width="1000px" append-to-body>
      <div class="pb30">
        <el-descriptions style="margin-top:-10px" :column="1" :size="size" border>
          <el-descriptions-item>
            <template slot="label">
              执行日期
            </template>
            2022-12-12--2022-12-12
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              服务名称
            </template>
            产品供应引入+企业融资服务
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              姓名
            </template>
            林都
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              联系电话
            </template>
            （+86）18650767213
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              机构名称
            </template>
            福建省华夏信融数据服务股份有限公司
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              角色类型
            </template>
            其他人员
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              机构类型
            </template>
            保理
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              注册区域
            </template>
            福建省福州市
          </el-descriptions-item>
        </el-descriptions>
        <el-divider></el-divider>
        <div class="content">
          <div class="items">
            <div class="flex flex-center mtb15">
              <div>2022-12-12  12：12</div>
              <div class="ml40">对象联系阶段--接受服务</div>
            </div>
            <div class="mtb15">备注内容备注内容</div>
          </div>
          <div class="items">
            <div class="flex flex-center mtb15">
              <div>2022-12-11  12：12</div>
              <div class="ml40">对象联系阶段--接受服务</div>
            </div>
            <div class="mtb15">备注内容备注内容</div>
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
          name:'林都',
          phone:'（+86）18650767213',
          jigou:"福建省华夏信融数据服务股份有限公司",
          role:'法人',
          type:'小贷',
          area:'福建省福州市'
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
        isOpen:true,
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
      },
      changePage(page) {
        this.page = page
        //
      },
      search(data) {
				this.searchVal = data
				this.page = 1
				//
			},
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
    font-size:15px;
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
  .pb30{
    padding:30px;
  }
  .ml40{
    margin-left:40px;
  }
  .mtb15{
    margin:15px 0;
  }
  .content{
    // margin-top:20px;
    .items{

    }
  }
</style>
