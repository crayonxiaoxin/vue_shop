<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <div id="main" style="width: 600px;height:400px;"></div>
    </el-card>
  </div>
</template>

<script>
export default {
  data: function() {
    return {}
  },
  created: function() {},
  mounted: async function() {
    const { data: res } = await this.$http.get('reports/type/1')
    console.log(res)
    
  },
  methods: {}
}
</script>

<style lang="less" scoped>
</style>
