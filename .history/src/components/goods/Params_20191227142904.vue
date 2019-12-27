<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-alert title="注意：只允许为第三级分类设置相关参数！" type="warning" show-icon :closable="false"></el-alert>
      <el-row :gutter="20">
        <el-col :span="10">
          <span>选择商品分类：</span>
          <el-cascader
            v-model="cateList"
            :options="cateOptions"
            :props="cateProps"
            @change="handleCateChange"
          ></el-cascader>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      cateList: [],
      cateOptions: [],
      cateProps: {
        expandTrigger: 'hover'
      }
    }
  },
  created: function() {
      this.getCateList()
  },
  methods: {
    handleCateChange: function(value) {
      console.log(value)
    },
    getCateList: async function() {
      const { data: res } = await this.$http.get('categories')
      console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error('获取商品分类列表失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.el-row {
  margin: 15px 0;
}
</style>
