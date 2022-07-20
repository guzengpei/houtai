<template>
  <div class="container">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 外面的大盒子 -->
    <div class="main">
      <!-- 按钮 -->
      <el-button type="primary">添加角色</el-button>
      <!-- 表格开始 -->
      <el-table :data="rolesList" style="width: 100%" :border="true">
        <el-table-column type="expand" label="#" width="48px">
          <!-- 表格展开后的内容 开始 -->
          <template v-slot="scope">
            <el-row>
              <el-col :span="24">
                <!-- 第1级 -->
                <el-row
                  v-for="(item, index) in scope.row.children"
                  :key="index"
                >
                  <el-col :span="8">
                    <el-tag type="success">{{ item.authName }}</el-tag>
                  </el-col>
                  <el-row
                    v-for="(item1, index1) in item.children"
                    :key="index1"
                  >
                    <el-col :span="6">
                      <el-tag type="success">{{ item1.authName }}</el-tag>
                    </el-col>
                    <!-- 第三层 -->
                    <el-row
                      type="flex"
                      v-for="(item2, index2) in item1.children"
                      :key="index2"
                    >
                      <el-col :span="6">
                        <el-tag type="success">{{ item2.authName }}</el-tag>
                      </el-col>
                    </el-row>
                  </el-row>
                </el-row>
              </el-col>
            </el-row>
          </template>
          <!-- 表格展开后的内容 结束 -->
        </el-table-column>
        <el-table-column label="#" prop="id" width="48px" type="index">
        </el-table-column>
        <el-table-column label="角色名称" prop="roleName"> </el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"> </el-table-column>
        <el-table-column label="操作" prop="desc"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getRoles } from '@/api/roles'
export default {
  created () {
    this.getRoles()
  },
  data () {
    return {
      tableData: [{
        id: '12987122',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987123',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987125',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987126',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }],
      rolesList: []
    }
  },
  methods: {
    async getRoles () {
      try {
        const res = await getRoles()
        console.log(res)
        this.rolesList = res.data.data
      } catch (err) {
        console.log(err)
      }
    },
    fn (scope) {
      console.log(scope)
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
// 表格样式
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
// 最外面大盒子
.main {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  .el-table {
    margin-top: 20px;
  }
}

// 各种标签的样式
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
