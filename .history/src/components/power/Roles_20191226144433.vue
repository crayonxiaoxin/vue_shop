<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-table :data="rolesList" border stripe>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column label="角色名称" prop="authName"></el-table-column>
        <el-table-column label="角色描述" prop="path"></el-table-column>
        <el-table-column label="操作" prop="path"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rolesList: []
    }
  },
  created: function() {
    this.getRolesList()
  },
  methods: {
    getRolesList: async function() {
      const { data: res } = await this.$http.get('roles')
      if (res.meta.status !== 200) {
        return this.$message.error('获取角色列表失败')
      }
      this.rolesList = res.data
      console.log(this.rolesList)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
