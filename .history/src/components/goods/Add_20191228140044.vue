<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-alert
        title="添加商品信息"
        type="info"
        center
        show-icon
        :closable="false"
      ></el-alert>

      <el-steps
        :space="200"
        align-center
        :active="activeStep - 0"
        finish-status="success"
      >
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="商品内容"></el-step>
      </el-steps>

      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="100px"
        label-position="top"
      >
        <el-tabs
          v-model="activeStep"
          :tab-position="'left'"
          :before-leave="beforeTabLeave"
          @tab-click="tabClicked"
        >
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="addForm.goods_price" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="addForm.goods_weight" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="addForm.goods_number" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader
                v-model="addForm.goods_cat"
                :options="cateList"
                :props="addFormProps"
                @change="handleChange"
              ></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <el-form-item
              :label="item.attr_name"
              v-for="item in manyTableData"
              :key="item.attr_id"
            >
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox
                  border
                  :label="cb"
                  v-for="(cb, i) in item.attr_vals"
                  :key="i"
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <el-form-item
              :label="item.attr_name"
              v-for="item in onlyTableData"
              :key="item.attr_id"
            >
              <el-input type="text" v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <el-upload
              :action="uploadURL"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              list-type="picture"
              :headers="uploadHeaders"
              :on-success="uploadSuccess"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
            <quill-editor
              v-model="addForm.goods_introduce"
              ref="myQuillEditor"
              :options="editorOption"
            >
            </quill-editor>
            <el-button type="primary" @click="add" class="add-btn"
              >添加商品</el-button
            >
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>

    <el-dialog
      title="图片预览"
      :visible.sync="previewDialogVisible"
      width="50%"
    >
      <img :src="previewImgURL" class="preview_img" />
    </el-dialog>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  data: function() {
    return {
      activeStep: '0',
      addForm: {
        goods_name: '',
        goods_price: 0,
        goods_weight: 0,
        goods_number: 0,
        goods_cat: [],
        pics: [],
        goods_introduce: '',
        attrs: []
      },
      addFormRules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }
        ],
        goods_cat: [{ required: true, message: '请输入内容', trigger: 'blur' }]
      },
      cateList: [],
      addFormProps: {
        expandTrigger: 'hover',
        label: 'cat_name',
        value: 'cat_id',
        children: 'children'
      },
      manyTableData: [],
      onlyTableData: [],
      uploadURL: 'http://127.0.0.1:8888/api/private/v1/upload',
      uploadHeaders: {
        Authorization: window.sessionStorage.getItem('token')
      },
      previewImgURL: '',
      previewDialogVisible: false,
      editorOption: {}
    }
  },
  created: function() {
    this.getCateList()
  },
  methods: {
    getCateList: async function() {
      const { data: res } = await this.$http.get('categories')
      if (res.meta.status !== 200) {
        return this.$message.error('获取商品分类失败')
      }
      this.cateList = res.data
    },
    handleChange: function() {
      console.log(this.addForm)
      if (this.addForm.goods_cat.length !== 3) {
        this.addForm.goods_cat = []
        return false
      }
    },
    beforeTabLeave: function(acitiveName, oldActiveName) {
      if (oldActiveName === '0' && this.addForm.goods_cat.length !== 3) {
        this.$message.error('请选择商品分类')
        return false
      }
    },
    tabClicked: async function() {
      if (this.activeStep === '1') {
        const { data: res } = await this.$http.get(
          `categories/${this.cateId}/attributes`,
          {
            params: { sel: 'many' }
          }
        )
        console.log(res)
        if (res.meta.status !== 200) {
          return this.$message.error('获取动态参数列表失败')
        }
        res.data.forEach(item => {
          item.attr_vals = item.attr_vals ? item.attr_vals.split(' ') : []
        })
        this.manyTableData = res.data
      } else if (this.activeStep === '2') {
        const { data: res } = await this.$http.get(
          `categories/${this.cateId}/attributes`,
          {
            params: { sel: 'only' }
          }
        )
        console.log(res)
        if (res.meta.status !== 200) {
          return this.$message.error('获取静态属性列表失败')
        }
        this.onlyTableData = res.data
      }
    },
    // 预览图片
    handlePreview: function(file) {
      console.log(file)
      this.previewImgURL = file.response.data.url
      this.previewDialogVisible = true
    },
    // 移除图片
    handleRemove: function(file) {
      console.log(file)
      // 找到临时路径
      const tmpPath = file.response.data.tmp_path
      // 找到数组index
      const i = this.addForm.pics.findIndex(item => item === tmpPath)
      // splice移除数组中对应项
      this.addForm.pics.splice(i, 1)
      console.log(this.addForm)
    },
    uploadSuccess: function(response) {
      console.log(response)
      const fileobj = { pic: response.data.tmp_path }
      this.addForm.pics.push(fileobj)
      console.log(this.addForm.pics)
    },
    add: function() {
      this.$refs.addFormRef.validate(valid => {
        if (!valid) {
          return this.$message.error('请填写必要项')
        }
        // 深拷贝，防止对象结构改变对其它双向数据绑定控件的影响
        const form = _.cloneDeep(this.addForm)
        // 对goods_cat处理
        form.goods_cat = form.goods_cat.join(',')
        // 对attrs进行处理，动态参数中attr_vals需转换成string提交
        this.manyTableData.forEach(item => {
          const obj = {
            attr_id: item.attr_id,
            attr_value: item.attr_vals.join(' ')
          }
          this.addForm.attrs.push(obj)
        })
        this.onlyTableData.forEach(item => {
          const obj = { attr_id: item.attr_id, attr_value: item.attr_vals }
          this.addForm.attrs.push(obj)
        })
        form.attrs = this.addForm.attrs
        console.log(form)
      })
    }
  },
  computed: {
    cateId: function() {
      return this.addForm.goods_cat.length === 3
        ? this.addForm.goods_cat[2]
        : null
    }
  }
}
</script>

<style lang="less" scoped>
.el-checkbox {
  margin: 0 10px 0 0 !important;
}
.preview_img {
  width: 100%;
}
.add-btn {
  margin-top: 15px;
}
</style>
