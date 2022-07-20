<template>
  <div class="container">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{
        $route.path === "/goods/add" ? "添加商品" : "商品列表"
      }}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- copy内容开始 -->
    <!-- 表格内容 -->
    <div class="table">
      <router-view v-if="$route.path === '/goods/add'" />
      <!-- 点击add之前的商品内容 -->
      <template v-else>
        <!-- 输入框 -->
        <div>
          <el-input
            placeholder="请输入内容"
            class="input-with-select"
            v-model="query"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="goodsSearch"
            ></el-button>
          </el-input>
          <el-button
            class="addBtn"
            type="primary"
            @click="$router.push('/goods/add')"
            >添加商品</el-button
          >
        </div>
        <!-- 表格 -->
        <el-table
          :data="tableData.goods"
          border
          v-loading="loading"
          style="width: 100%"
          :stripe="true"
        >
          <el-table-column type="index" label="#" width="50"> </el-table-column>
          <el-table-column
            prop="goods_name"
            label="商品名称"
            width="600"
          ></el-table-column>
          <el-table-column prop="goods_price" label="商品价格（元）">
          </el-table-column>
          <el-table-column prop="goods_weight" label="商品重量">
          </el-table-column>
          <el-table-column prop="add_time" label="创建时间">
            <template v-slot="scope">
              {{ scope.row.add_time | toYear }}
            </template>
          </el-table-column>
          <el-table-column prop="date" label="操作" width="190">
            <!-- 最后两个按钮插槽 -->
            <template slot-scope="scope">
              <el-button class="btn" type="primary" @click="editBtn(scope)"
                ><i class="el-icon-edit"></i> 编辑</el-button
              >
              <el-button class="btn" type="danger" @click="delBtn(scope)"
                ><i class="el-icon-delete"></i> 删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagenum"
          :page-sizes="[1, 5, 10, 15]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.total"
        >
        </el-pagination>
      </template>
    </div>

    <!-- copy内容结束 -->
  </div>
</template>

<script>
import { getGoodsList } from '@/api/goods'
export default {
  created () {
    this.getGoodsList()
    console.log(this.$route.path)
  },
  data () {
    return {
      tableData: [],
      pagesize: 5,
      pagenum: 1,
      query: '',
      loading: false
    }
  },
  methods: {
    // 分页
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.pagesize = val
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.pagenum = val
    },
    // 获取商品列表
    async getGoodsList () {
      this.loading = true
      try {
        const res = await getGoodsList({ query: this.query, pagenum: this.pagenum, pagesize: this.pagesize })
        console.log(res)
        this.tableData = res.data.data
        this.tolal = res.data.data.total
        this.loading = false
      } catch (err) {
        console.log(err)
      }
    },
    async goodsSearch () {
      this.loading = true
      this.pagesize = 5
      this.pagenum = 1
      await this.getGoodsList()
      this.loading = false
    }
  },
  computed: {},
  watch: {
    pagesize: {
      handler () { this.getGoodsList() }
    },
    pagenum: {
      handler () { this.getGoodsList() }
    }
  },
  filters: {
    toYear (value) {
      const res = new Date(value)
      const Y = res.getFullYear()
      const M = res.getMonth() + 1
      const D = res.getDate()
      const result = Y + '-' + M + '-' + D
      return result
    }
  },
  components: {}
}
</script>

<style scoped lang='less'>
.container {
  background-color: #ebedf1;
  padding: 20px;
  .el-pagination {
    margin-top: 20px;
  }
}
.table {
  background-color: #fff;
  padding: 20px;
  margin-top: 20px;
  border-radius: 5px;
  // border: 1px solid #e1e3e7;
  overflow: hidden;
  .input-with-select {
    width: 25vw;
  }
  .addBtn {
    margin-left: 25px;
  }
}
.el-table {
  margin-top: 20px;
}
.btn {
  width: 73px;
  height: 29px;
  font-size: 12px;
  padding: 0;
}
</style>
