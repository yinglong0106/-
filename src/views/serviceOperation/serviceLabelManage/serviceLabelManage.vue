<template>
  <div class="app-container" style="padding: 15px;width:1000px;">
      <div class="flex jsb flex-center">
        <div class="flex flex-center">
          <searchCom @toSearch='search' :searchResult='searchResult' placeholderText='请输入你要找的标签名称'></searchCom>
          <div class="mb20">搜索结果：1</div>
        </div>
        <div>
          <el-button type="primary" @click="addLabel">添加标签</el-button>
        </div>
      </div>

      <el-table v-loading="loading" border :data="tableData" style>
        <el-table-column label="标签名称" prop="labelName" align="center"  />
        <el-table-column label="操作" width="180" align="center" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="delLabel(scope.index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <pages @changePage="changePage" :total="pageTotal" :page="page"></pages>


      <el-dialog title="添加标签" :visible.sync="showAddTag" width="700px" destroy-on-close append-to-body>
        <p>一行一个</p>
        <el-input class="mb10" type="textarea" placeholder="请输入" :rows="10" v-model="content"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submit" :disabled="!content.trim()">提 交</el-button>
        </span>
      </el-dialog>
  </div>
</template>
<script>
	import searchCom from '@/views/components/common/searchCom.vue'
	import pages from '@/views/components/common/pages'
  import { getToken } from "@/utils/auth";
	export default {
		name: "index",
		components: {
			searchCom,
			pages,
		},
		data() {
			return {
				loading: false,
				page: 1,
				pageTotal: 0,
				searchResult: 0,
				searchVal: '',
				tableData: [{
          labelName:'测试测试'
        }],
        showAddTag:false,
        content:""
			};
		},
		created() {
			this.getList()
		},
		methods: {
			search(data) {
				this.searchVal = data
				this.page = 1
				//
			},
			changePage(page) {
				this.page = page
				//
			},
      delLabel(index){
        // let data = this[type].splice(index,1)
        this.$confirm('请确认要删除该标签吗', '', {
					confirmButtonText: '确定',
					type: 'warning'
				}).then(() => {
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
			getList() {
				this.tableData = [{
					paifaDate: '2022-12-12  12：12',
					zhixingDate: '2022-12-12 ---2022-12-12',
					serverName: '企业融资服务',
					paifaNum: '100'

				}]
			},
      addLabel(){
        this.showAddTag = true
      },
      submit(){
        let data = this.content
        let arr = data.split('\n')
        console.log(arr)
        // insertType3(JSON.stringify(arr)).then(res => {
        //   console.log(res);
        //   if (res.Tag[0] > 0) {
        //     this.content = ''
        //      this.showAddTag = false
        //     this.$message({
        //       type: 'success',
        //       message: '新增成功'
        //     });
        //     this.isBatch = false
        //     this.getTableData()
        //   } else {
        //     this.$message('新增失败');
        //   }
        // })
      }

		}
	};
</script>

<style lang="scss" scoped>
.input-box {
		width: 70%;
		margin: 20px 0px;

		.input-text {
			width: 100px;
			flex-shrink: 0;
		}
	}
</style>


