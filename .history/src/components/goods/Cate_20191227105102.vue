<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-button type="primary">添加分类</el-button>
        </el-col>
      </el-row>
      <el-table
        :data="cateList"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        stripe
        :tree-props="{children: 'children'}"
      >
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="cat_name" label="分类名称"></el-table-column>
        <el-table-column prop="cat_deleted" label="是否有效">
          <template slot-scope="scope">
            <i class="el-icon-success" v-if="scope.row.cat_deleted==false"></i>
            <i class="el-icon-error" v-else></i>
          </template>
        </el-table-column>
        <el-table-column prop="cat_level" label="排序">
          <template slot-scope="scope">
            <el-tag size="mini" v-if="scope.row.cat_level==0">一级</el-tag>
            <el-tag size="mini" type="success" v-else-if="scope.row.cat_level==1">二级</el-tag>
            <el-tag size="mini" type="warning" v-else>三级</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="showEditDialog(scope.row.cat_id)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="deleteCateById(scope.row.cat_id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      cateList: [],
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      }
    }
  },
  created: function() {
    this.getCateList()
  },
  methods: {
    getCateList: async function() {
      const { data: res } = await this.$http.get('categories', {
        params: this.queryInfo
      })
      console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error('获取分类列表失败')
      }
      this.cateList = res.data.result
    }
  }
}
</script>

<style lang="less" scoped>
.el-icon-success {
  font-size: 20px;
  color: lightgreen;
}
.el-icon-error {
  font-size: 20px;
  color: red;
}
</style>
