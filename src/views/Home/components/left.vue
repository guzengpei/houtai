<template>
  <div>
    <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
      <div
        class="btn"
        @click="isCollapse = !isCollapse"
        :style="{ width: isCollapse ? '64px' : '200px' }"
      >
        <i class="el-icon-more"></i>
      </div>
    </el-radio-group>
    <el-menu
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="#383d41"
      text-color="#ffffff"
      :collapse-transition="true"
      :unique-opened="true"
      active-text-color="#b02418"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-user-solid"></i>
          <span slot="title">用户管理</span>
        </template>
        <el-menu-item-group @click.native="users">
          <el-menu-item index="1-1">
            <i class="el-icon-menu"></i>
            用户列表</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-s-tools"></i>
          <span slot="title">权限管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1" @click.native="setting">
            <i class="el-icon-menu"></i>
            角色列表</el-menu-item
          >
          <el-menu-item index="2-2" @click.native="rights">
            <i class="el-icon-menu"></i>
            权限列表</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-s-goods"></i>
          <span slot="title">商品管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1" @click.native="goods">
            <i class="el-icon-menu"></i>
            商品列表</el-menu-item
          >
          <el-menu-item index="3-2">
            <i class="el-icon-menu"></i>
            分类参数</el-menu-item
          >
          <el-menu-item index="3-3">
            <i class="el-icon-menu"></i>
            商品分类</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-s-order"></i>
          <span slot="title">订单管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="4-1">
            <i class="el-icon-menu"></i>
            订单列表</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-s-marketing"></i>
          <span slot="title">数据统计</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="5-1">
            <i class="el-icon-menu"></i>
            用户列表</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    users () {
      if (this.$route.path === '/users') {
        // this.$router.back()
        // console.log(1)
        // this.$router.go(0)
        // this.$router.push('/users')
      } else {
        // console.log(this.$route.path)
        this.$router.push('/users')
        // console.log(2)
      }
    },
    setting () {
      if (this.$route.path === '/roles') {
        // console.log(1)
      } else {
        // console.log(this.$route.path)
        this.$router.push('/roles')
        // console.log(2)
      }
    },
    rights () {
      if (this.$route.path === '/rights') {
        // console.log(1)
      } else {
        // console.log(this.$route.path)
        this.$router.push('/rights')
        // console.log(2)
      }
    },
    goods () {
      if (this.$route.path === '/goods') {
        // this.$router.back()
        // console.log(1)
        // this.$router.go(0)
        // this.$router.push('/users')
      } else {
        // console.log(this.$route.path)
        this.$router.push('/goods')
        // console.log(2)
      }
    }
  },
  computed: {},
  watch: {
    isCollapse () {
      this.$store.commit('setIsCollapse', this.isCollapse)
    }
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.el-menu {
  border: none;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.btn {
  width: 200px;
  height: 40px;
  background-color: #ff69b4;
  margin-bottom: -20px;
  text-align: center;

  &:hover {
    cursor: pointer;
  }
  /deep/i {
    // position: relative;
    display: block;
    color: #fff;
    font-size: 20px;
    line-height: 40px;
  }
}
/deep/.el-menu-item {
  color: #fff;
}
/deep/.el-menu-item-group__title {
  display: none;
}
</style>
