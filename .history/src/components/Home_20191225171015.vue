<template>
  <div>
    <el-main>
      <el-header>
        Header
        <el-button type="info" @click="logout">退出</el-button>
      </el-header>
      <el-main>
        <el-aside width="200px">Aside</el-aside>
        <el-main>Main</el-main>
      </el-main>
    </el-main>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    logout: function() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
</style>
