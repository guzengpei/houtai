<template>
  <div class="container">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 外面大盒子 -->
    <div class="main">
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%" :border="true">
        <el-table-column label="#" type="index" width="48px"> </el-table-column>
        <el-table-column prop="authName" label="权限名称"> </el-table-column>
        <el-table-column prop="path" label="路径"> </el-table-column>
        <el-table-column prop="level" label="权限等级">
          <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.level === '0'" plain
              >等级一</el-button
            >
            <el-button type="success" v-else-if="scope.row.level === '1'" plain
              >等级二</el-button
            >
            <el-button type="warning" v-else plain>等级三</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getRights } from '@/api/roles'
export default {
  created () {
    this.getRights()
  },
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    async getRights () {
      try {
        const res = await getRights()
        console.log(res)
        this.tableData = res.data.data
      } catch (err) {
        console.log(err)
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
.container {
  background-color: #ebedf1;
  padding: 20px;
}
.main {
  margin-top: 20px;
  background-color: #fff;
  padding: 30px 20px;
}
.el-button {
  width: 58px;
  height: 32px;
  padding: 0;
  font-size: 12px;
}
</style>
