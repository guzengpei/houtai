<template>
  <div class="login-container">
    <div class="from-box">
      <el-form :model="loginForm" :rules="rules" ref="loginFormRef">
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btn-item">
          <el-button type="primary" @click="login">登陆</el-button>
          <el-button type="info" @click="reset">重制</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  created () { },
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 8, message: '长度3到8之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 8, message: '长度3到8之间', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    reset () {
      this.$refs.loginFormRef.resetFields()
    },
    async login () {
      try {
        await this.$refs.loginFormRef.validate()
        // console.log('校验成功')
        try {
          // const res = await login(this.loginForm)
          const res = await login(this.loginForm)
          console.log(res)
          if (res.data.meta.status === 200) {
            this.$store.commit('setToken', res.data.data)
            this.$router.push('/welcome')
          } else {
            this.$message.error('账号密码错误')
          }
          // console.log(res)
        } catch (err) {
          console.log(err)
        }
      } catch (err) {
        this.$message.error('表单校验失败')
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.login-container {
  width: 100vw;
  height: 100vh;
  background-color: #2b4b6b;
  display: flex;
  justify-content: center;
  align-items: center;
  .from-box {
    background-color: #fff;
    width: 450px;
    height: 240px;
    padding: 30px 15px;
    box-sizing: border-box;
    .btn-item {
      text-align: right;
    }
  }
}
</style>
