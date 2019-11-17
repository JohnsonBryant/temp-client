<template>
  <el-menu class="navbar" mode="horizontal">
    <span class="nav-item">{{ systemState }}</span>
  </el-menu>
</template>

<script>

export default {
  name: 'NavBar',
  data () {
    return {
      
    }
  },
  computed: {
    systemState () {
      return '当前系统状态：' + (this.$store.state.isOnTest ? '测试中...' : '待机中...');
    },
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  position: relative;
  height: 64px;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  margin-left: 10px;
  margin-right: 10px;
  padding-left: 20px;
  padding-right: 10px;
}

.nav-item {
  display: inline-block;
  height: 64px;
  line-height: 64px;
}
</style>

