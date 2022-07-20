<template>
  <div class="container">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 表格内容 -->
    <div class="table">
      <!-- 输入框 -->
      <div>
        <el-input
          placeholder="请输入内容"
          v-model="query"
          class="input-with-select"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="getUsersTable"
          ></el-button>
        </el-input>
        <el-button class="addBtn" type="primary" @click="dialogVisible = true"
          >添加用户</el-button
        >
      </div>
      <!-- 表格 -->
      <el-table
        :data="tableData.users"
        border
        style="width: 100%"
        :stripe="true"
      >
        <el-table-column type="index" label="#" width="50"> </el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <!-- 状态开关 -->
          <template slot-scope="scope">
            <!-- {{ row.mg_state }} -->
            <el-switch v-model="scope.row.mg_state" @change="onChange(scope)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="操作" width="180px">
          <!-- 三个按钮插槽 -->
          <template slot-scope="scope">
            <el-button class="btn" type="primary" @click="editBtn(scope)"
              ><i class="el-icon-edit"></i
            ></el-button>
            <el-button class="btn" type="danger" @click="delBtn(scope)"
              ><i class="el-icon-delete"></i
            ></el-button>
            <el-button class="btn" type="warning"
              ><i class="el-icon-setting"></i
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.total"
      >
      </el-pagination>
      <!-- 添加用户弹窗 -->
      <el-dialog
        title="添加用户对话框"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose"
      >
        <template>
          <!-- 表单开始 -->
          <el-form
            :model="addForm"
            :rules="rules"
            ref="addForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="用户名" prop="username">
              <el-input
                v-model="addForm.username"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                type="password"
                v-model="addForm.password"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="addForm.email"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="mobile">
              <el-input v-model.number="addForm.mobile"></el-input>
            </el-form-item>
            <el-form-item class="formBtn">
              <el-button @click="dialogVisible = false">取消</el-button>
              <el-button type="primary" @click="onSubmit">确定</el-button>
            </el-form-item>
          </el-form>
          <!-- 表单结束 -->
        </template>
      </el-dialog>
    </div>

    <!-- 编辑用户弹窗 -->
    <el-dialog
      title="编辑用户"
      :visible.sync="editVisible"
      width="50%"
      :before-close="handleClose"
    >
      <template>
        <!-- 表单开始 -->
        <el-form
          :model="editForm"
          :rules="rules1"
          ref="editForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名称" prop="name">
            <el-input v-model="editForm.username" :disabled="true"></el-input>
          </el-form-item>

          <el-form-item label="邮箱" prop="email">
            <el-input v-model="editForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model.number="editForm.mobile"></el-input>
          </el-form-item>
          <el-form-item class="formBtn">
            <el-button @click="editVisible = false">取消</el-button>
            <el-button type="primary" @click="onEdit">确定</el-button>
          </el-form-item>
        </el-form>
        <!-- 表单结束 -->
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { emailReg, mobileReg } from '@/utils/validate'
import { usersTable, addUsers, changeUser, editUser, delUser } from '@/api/user'
export default {
  created () { this.getUsersTable() },
  data () {
    const mobileReg1 = (rule, value, callback) => {
      mobileReg(value) ? callback() : callback(new Error('手机号格式不正确'))
    }
    const emailReg1 = (rule, value, callback) => {
      emailReg(value) ? callback() : callback(new Error('邮箱格式不正确'))
    }
    return {
      query: '',
      tableData: [],
      pagenum: 1,
      pagesize: 5,
      // 状态栏开关
      value: true,
      // 弹窗组件
      dialogVisible: false,
      // 编辑用户的弹窗
      editVisible: false,

      // add表单数据
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 16, message: '最短3个字符最长16个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '密码为6-16位', trigger: 'blur' }
        ],
        email: [
          { required: false, message: '请输入邮箱', trigger: 'blur' },
          { validator: emailReg1, trigger: 'blur' }

        ],
        mobile: [
          { required: false, message: '请输入手机号', trigger: 'blur' },
          { validator: mobileReg1, trigger: 'blur' }
        ]
      },
      // 编辑用户时弹窗里面的名称
      editForm: {
        username: '',
        email: '',
        mobile: '',
        id: ''
      },
      // 编辑用户中的规则
      rules1: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: emailReg1, trigger: 'blur' }

        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: mobileReg1, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 获取整个表格
    async getUsersTable () {
      try {
        const res = await usersTable({ pagenum: this.pagenum, pagesize: this.pagesize, query: this.query })
        // console.log(res)
        this.tableData = res.data.data
      } catch (err) {
        console.log(err)
      }
    },
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.pagesize = val
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val
    },
    // 弹窗的函数
    handleClose (done) {
      done()
    },
    // 提交创建用户表单
    async onSubmit () {
      // console.log(this.addForm)
      try {
        await this.$refs.addForm.validate()
        console.log(this.addForm)
        try {
          await addUsers(this.addForm)
          this.$message.success('创建成功')
          this.dialogVisible = false
          this.getUsersTable()
        } catch (err) {
          console.log(err)
          this.$message('创建失败')
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 用户状态按钮开关
    async onChange (scope) {
      // console.log(scope.row)
      try {
        const res = await changeUser(scope.row.id, scope.row.mg_state)
        console.log(res)
        if (res.data.meta.status === 200) {
          this.$message.success('修改成功')
        } else {
          this.$message.error('修改失败')
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 编辑用户按钮
    editBtn (scope) {
      this.editVisible = true
      this.editForm.username = scope.row.username
      this.editForm.email = scope.row.email
      this.editForm.mobile = scope.row.mobile
      this.editForm.id = scope.row.id
      // console.log(scope)
    },
    // 编辑之后点击确定
    async onEdit () {
      try {
        await this.$refs.editForm.validate()
        try {
          const res = await editUser({ id: this.editForm.id, email: this.editForm.email, mobile: this.editForm.mobile })
          console.log(res)
          if (res.data.meta.status === 200) {
            this.editVisible = false
            this.getUsersTable()
          } else {
            this.$message.error('更新失败')
          }
        } catch (err) {
          this.$message.error('更新失败')
          console.log(err)
        }
      } catch (err) {
        // console.log(err)
        this.$message.error('信息格式不正确')
      }
    },
    // 删除单个用户按钮
    delBtn (scope) {
      // console.log(12)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await delUser(scope.row.id)
        console.log(res)
        if (res.data.meta.status === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getUsersTable()
        } else {
          this.$message.error('删除失败')
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  computed: {},
  watch: {
    pagesize: {
      handler () { this.getUsersTable() }
    },
    pagenum: {
      handler () { this.getUsersTable() }
    }
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.container {
  // width: 100vw;
  // height: 100vh;
  background-color: #ebedf1;
  padding: 20px;
  /deep/.el-input {
    // margin-top: 0px;
    margin-bottom: 20px;
    width: 25vw;
  }
  .table {
    background-color: #fff;
    padding: 20px;
    margin-top: 20px;
    border-radius: 5px;
    // border: 1px solid #e1e3e7;
    overflow: hidden;
  }
  .addBtn {
    margin-left: 18px;
  }
  /deep/ .el-pagination {
    width: 100%;
  }
  /deep/ .el-input.el-input--mini.el-input--suffix {
    width: 100px;
  }
  /deep/ .el-input.el-pagination__editor.is-in-pagination {
    width: 46px;
  }
  .el-pagination {
    margin-top: 20px;
  }
  /deep/.btn {
    width: 44px;
    height: 28px;
    padding: 0;
    text-align: center;
    line-height: 28px;
  }
}
/deep/.el-dialog__body {
  text-align: center;
}
/deep/ .el-form-item__content {
  width: 300px;
  height: 45px;
  input {
    width: 610px;
  }
}
.formBtn {
  position: relative;
  top: 38px;
  left: 450px;
}
</style>
