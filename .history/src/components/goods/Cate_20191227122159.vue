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
          <el-button type="primary" @click="showAddDialog">添加分类</el-button>
        </el-col>
      </el-row>
      <el-table
        :data="cateList"
        style="width: 100%;margin-bottom: 20px;"
        row-key="cat_id"
        border
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

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <el-dialog title="添加分类" :visible.sync="addDialogVisible" width="50%" @close="addFormClosed">
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="80px">
        <el-form-item label="分类名称" prop="cateName">
          <el-input v-model="addForm.cateName"></el-input>
        </el-form-item>
        <el-form-item label="父级分类">
          <div>
            <el-cascader
              size="small"
              v-model="addForm.cateSelected"
              :options="parentCateList"
              :props="parentCateProps"
              @change="parentCateChanged"
              clearable
            ></el-cascader>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
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
      },
      total: 0,
      addDialogVisible: false,
      addForm: {
        cateName: '',
        cateSelected: []
      },
      addFormRules: {
        cateName: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ]
      },
      parentCateProps: {
        expandTrigger: 'hover',
        checkStrictly: true,
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      parentCateList: []
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
      this.total = res.data.total
    },
    handleSizeChange: function(newSize) {
      this.queryInfo.pagesize = newSize
      this.getCateList()
    },
    handleCurrentChange: function(newPage) {
      this.queryInfo.pagenum = newPage
      this.getCateList()
    },
    showEditDialog: function(catId) {},
    deleteCateById: function(catId) {},
    parentCateChanged: function(value) {
      console.log(value)
    },
    showAddDialog: function() {
      this.getParentCateList()
      this.addDialogVisible = true
    },
    addFormClosed: function() {
      this.$refs['addFormRef'].resetFields()
    },
    getParentCateList: async function() {
      const { data: res } = await this.$http.get('categories', {
        params: { type: 2 }
      })
      console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error('获取父级分类列表失败')
      }
      this.parentCateList = res.data
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
.el-cascader {
  width: 100%;
}
</style>
