<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-alert
        title="警告提示的文案"
        type="info"
        center
        show-icon
        :closable="false"
      ></el-alert>

      <el-steps :space="200" align-center :active="0" finish-status="success">
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="步骤 3"></el-step>
      </el-steps>
    </el-card>
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
