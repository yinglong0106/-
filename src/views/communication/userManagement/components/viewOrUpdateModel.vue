<template>
  <el-dialog :title="isEdit ? '用户编辑' : '用户查看'" :visible.sync="open" width="700px" append-to-body @closed="$emit('update:open', false)" @opened="initData">
    <div class="title-bg mb10">账号信息</div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" size="small" :inline="true">
      <el-row>
        <!-- <el-col :span="12">
          <el-form-item label="头像">
            <el-avatar shape="square" :size="100" fit="fill" :src="currentRow.avatar"></el-avatar>
          </el-form-item>
        </el-col> -->
        <el-col :span="12">
          <el-form-item label="账号名称" prop="nickName">
            <el-input
              v-model="ruleForm.nickName"
              placeholder="请输入账号名称"
              clearable
              disabled
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="姓名" prop="name">
            <el-input
              v-model="ruleForm.name"
              placeholder="请输入姓名"
              clearable
              disabled
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号码" prop="userTel">
            <el-input
              v-model="ruleForm.userTel"
              placeholder="请输入手机号码"
              clearable
              disabled
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              show-password
              v-model="ruleForm.password"
              placeholder="请输入密码"
              clearable
              :disabled='!isEdit'
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input
              type="password"
              show-password
              v-model="ruleForm.confirmPassword"
              placeholder="请输入确认密码"
              clearable
              :disabled='!isEdit'
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="title-bg mb10">角色信息</div>

    <el-form :model="currentRow" size="small" :inline="true">
      <el-row>
        <el-col :span="12">
          <el-form-item label="角色名称">
            {{ this.$route.name == 'ServiceCommunicationMsg'?'服务调度专员':'沟通调度专员'}}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="归属部门">
            {{ this.$route.name == 'ServiceCommunicationMsg'?'服务调度部门':'沟通调度部门'}}
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <div slot="footer" class="dialog-footer" v-if="isEdit">
      <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      <el-button @click="cancel">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { updataUserInfo } from '@/api/operationRoleApi/userManagement'
import { getEncryptStr, getUserDetail } from '@/api/choseManagerApi/choseManagerCom'

export default {
  name: 'index',
  props: {
    currentRow: {
      type: Object,
      default: () => {}
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    open: {
      type: Boolean,
      default: false
    }
  },
  data() {
    var validatePass2 = (rule, value, callback) => {
      console.log(11)
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      rules: {
        nickName: [{
          required: true,
          message: '必填',
          trigger: 'change'
        }],
        password: [{
            required: true,
            message: "用户密码不能为空",
            trigger: "blur"
          },
          {
            min: 6,
            max: 20,
            message: '用户密码长度必须介于 6 和 20 之间',
            trigger: 'blur'
          }
        ],
        confirmPassword: [{
          validator: validatePass2,
          trigger: 'blur',
          required: true,
        }],
        name: [{
          required: true,
          message: '必填',
          trigger: 'change'
        }],
        userTel: [{
          required: true,
          pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
          message: "请输入正确的手机号码",
          trigger: "blur"
        }],
        status: [{
          required: true,
          message: '必填',
          trigger: 'change'
        }],
      },
      passwordStr: '', // 密文
      oldForm: {
        nickName: '',
        deptId: '5e0d4eab-4e4c-11ed-afde-00163e2ca549',
        password: '',
        name: '',
        userTel: '',
        status: '0'
      },
      ruleForm: {
        nickName: '',
        deptId: '5e0d4eab-4e4c-11ed-afde-00163e2ca549',
        password: '',
        confirmPassword: '',
        name: '',
        userTel: '',
        status: '0'
      },
    }
  },
  created() {

  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.ruleForm.password) {
            this.getEncryptStr(this.ruleForm.password)
          } else {
            this.passwordStr = ''
            this.updataUserInfo()
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    async getEncryptStr(password) {
      let oldForm = this.oldForm
      let ruleForm = this.ruleForm
      if (oldForm.password != ruleForm.password || oldForm.name != ruleForm.name || oldForm.userTel != ruleForm.userTel || oldForm.status != ruleForm.status || oldForm.deptId != ruleForm.deptId) {
        await getEncryptStr(password).then(res => {
          if (res.OK == 'True') {
            this.passwordStr = res.Tag
            this.updataUserInfo()
          }
        })
      } else {
        this.cancel()
      }
    },
    async getUserDetail() {
      getUserDetail({
        userId: this.currentRow.userId,
        curUserId: this.$store.state.user.adminId,
      }).then(res => {
        let data = res.Tag[0].Table[0]
        this.ruleForm.nickName = data.userName
        this.ruleForm.name = data.nickName
        this.ruleForm.password = data.password
        this.ruleForm.confirmPassword = ''
        this.ruleForm.userTel = data.phonenumber
        this.ruleForm.status = data.status
        this.ruleForm.roleKey = this.$route.name == 'ServiceCommunicationMsg'?'serveRole':'commuRole',
        this.ruleForm.deptId = data.deptId
        // this.oldForm = this.ruleForm
        this.oldForm.nickName = data.userName
        this.oldForm.name = data.nickName
        this.oldForm.password = data.password
        this.oldForm.userTel = data.phonenumber
        this.oldForm.status = data.status
        this.oldForm.roleKey = this.$route.name == 'ServiceCommunicationMsg'?'serveRole':'commuRole',
        this.oldForm.deptId = data.deptId
      })
    },
    async updataUserInfo() {
      await updataUserInfo({
        passwd: this.passwordStr,
        nickName: this.ruleForm.name,
        phonenumber: this.ruleForm.userTel,
        status: this.ruleForm.status,
        curUserId: this.$store.state.user.adminId,
        deptId: this.ruleForm.deptId,
        userId: this.currentRow.userId
      }).then(res => {
        if (res.OK == 'True') {
          if (res.Tag[0] > 0) {
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
            this.$emit('refresh')
            this.cancel()
          } else {
            this.$message({
              type: 'error',
              message: '账号名称或联系电话已存在!'
            });
          }

        }
      })
    },
    cancel() {
      this.open = false
    },
    initData() {
      this.getUserDetail()
    }
  }
}
</script>
