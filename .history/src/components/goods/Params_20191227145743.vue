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
            v-model="selectedList"
            :options="cateList"
            :props="cateProps"
            @change="handleCateChange"
          ></el-cascader>
        </el-col>
      </el-row>
      <el-tabs v-model="activeName" @tab-click="handleTabsClick">
        <el-tab-pane label="动态参数" name="many">
          <el-button type="primary" :disabled="isBtnDisabled">添加参数</el-button>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
          <el-button type="primary" :disabled="isBtnDisabled">添加属性</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      cateList: [],
      selectedList: [],
      cateProps: {
        expandTrigger: 'hover',
        label: 'cat_name',
        value: 'cat_id',
        children: 'children'
      },
      activeName: 'many'
    }
  },
  created: function() {
    this.getCateList()
  },
  methods: {
    handleCateChange: function(value) {
      console.log(value)
      if (value.length !== 3) {
        this.selectedList = []
        return false
      }
    },
    getCateList: async function() {
      const { data: res } = await this.$http.get('categories')
      console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error('获取商品分类列表失败')
      }
      this.cateList = res.data
    },
    handleTabsClick: function(tab, event) {
      console.log(this.activeName)
    },
    getParamsList: async function() {
      const { data: res } = await this.$http.get(
        `categories/${this.cateId}/attributes`
      )
      console.log(res)
    }
  },
  // 计算属性
  computed: {
    isBtnDisabled: function() {
      return this.selectedList.length !== 3
    },
    cateId: function() {
      return this.isBtnDisabled ? null : this.selectedList[2]
    }
  }
}
</script>

<style lang="less" scoped>
.el-row {
  margin: 15px 0;
}
</style>
