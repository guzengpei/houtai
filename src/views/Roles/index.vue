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
            <el-row
              class="rowFirst"
              type="flex"
              align="middle"
              v-for="item in scope.row.children"
              :key="item.id"
            >
              <el-col :span="8">
                <el-tag>{{ item.authName }}</el-tag>
                &nbsp;<i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="16">
                <!-- 二级 -->
                <el-row
                  class="rowSecond"
                  v-for="item1 in item.children"
                  :key="item1.id"
                >
                  <el-col :span="8">
                    <el-tag type="success">{{ item1.authName }}</el-tag>
                    &nbsp;<i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="16">
                    <el-tag
                      closable
                      v-for="item2 in item1.children"
                      :key="item2.id"
                      >{{ item2.authName }}</el-tag
                    >
                  </el-col>
                </el-row>
              </el-col>
            </el-row></template
          >
          <!-- 表格展开后的内容 结束 -->
        </el-table-column>
        <el-table-column label="#" prop="id" width="48px" type="index">
        </el-table-column>
        <el-table-column label="角色名称" prop="roleName"> </el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"> </el-table-column>
        <el-table-column label="操作" prop="desc">
          <template v-slot="scope">
            <el-button class="btn" type="primary"
              ><i class="el-icon-edit"></i> 编辑</el-button
            >
            <el-button class="btn" type="danger"
              ><i class="el-icon-delete"></i> 删除</el-button
            >
            <el-button
              class="btn"
              type="warning"
              @click="permissions(scope.row.id)"
              ><i class="el-icon-setting"></i> 分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分配权限弹框 -->
    <el-dialog title="分配权限" :visible.sync="permissionsDialog" width="50%">
      <!-- 中间部分树状图 开始 -->
      <el-tree :data="data" :props="defaultProps"> </el-tree>

      <!-- 中间部分树状图 结束 -->
      <!-- 下面的按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRoles, assignPermissions } from '@/api/roles'
export default {
  created () {
    this.getRoles()
  },
  data () {
    return {
      tableData: [],
      rolesList: [],
      // 权限管理弹框
      permissionsDialog: false,
      data: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
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
    // 点击了分配权限之后
    async permissions (id) {
      // console.log(id)
      const res = await assignPermissions(id)
      console.log(res)
      this.permissionsDialog = true
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
.rowFirst {
  margin: 10px 40px;
  padding: 10px 0;
  border-top: 1px solid #eeeeee;
  border-bottom: 1px solid #eeeeee;
}
.el-tag.el-tag--light{
  margin:8px
  // margin-bottom: 15px;
}
.btn{
  padding: 7px 15px;
  font-size: 12px;
}
</style>
