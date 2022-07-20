<template>
  <el-container class="container">
    <el-header>
      <img src="@/assets/logo.png" alt="" class="logo" />
      <h2>我是一个后台管理系统</h2>
      <el-button class="out" @click="outFn">退出</el-button>
    </el-header>
    <!-- 内容部分 -->
    <el-container>
      <el-aside
        :width="this.$store.state.isCollapse === false ? '200px' : '64px'"
        ><Left></Left
      ></el-aside>
      <el-main>
        <!-- 二级路由 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Left from './components/left.vue'
export default {
  created () { },
  data () {
    return {}
  },
  methods: {
    outFn () {
      this.$store.commit('setToken', {})
      this.$router.push('/login')
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { Left }
}
</script>

<style scoped lang='less'>
.container {
  // width: 100vw;
  height: 100vh;
  .el-header {
    display: flex;
    align-items: center;
    background-color: #373d41;
    .logo {
      width: 61px;
      height: 56px;
      margin-left: 10px;
    }
    h2 {
      margin-left: 10px;
      color: #fff;
      font-weight: 400;
    }
    .out {
      margin-left: auto;
    }
  }
  .el-container {
    background-color: #373d41;
  }
  .el-main {
    background-color: #fff;
  }
}
.el-main{
  padding: 0;
}
</style>
