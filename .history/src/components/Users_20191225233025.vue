<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      userList: [],
      total: 0
    }
  },
  created: function() {
    this.getUserList()
  },
  methods: {
    getUserList: async function() {
      const { data: res } = await this.$http.get('users', {
        param: this.queryInfo
      })
      console.log(res)
      if (res.meta.status !== 200)
        return this.$message.error('获取用户列表失败')
        
      this.userList = res.data.users
      this.total = res.data.total
    }
  }
}
</script>

<style lang="less" scoped>
</style>
