<template>
  <div>
      <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data: function() {
    return {}
  },
  created: function() {},
  methods: {}
}
</script>

<style lang="less" scoped>
</style>
