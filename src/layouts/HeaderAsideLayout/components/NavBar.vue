<template>
  <el-menu class="navbar" mode="horizontal">
    <span class="nav-item">{{ systemState }}</span>
    <div class="main-control">
      <el-button 
        @click="stopTest" 
        class="main-control-btn" 
        type="success" round
        :disabled="!systemControlsEnable"
      >停止测试</el-button>
      <!-- <el-button
        @click="startTest" 
        class="main-control-btn" 
        type="success" round
        :disabled="systemControlsEnable"
      >启动测试</el-button> -->
      <el-button
        @click="saveData" 
        class="main-control-btn" 
        type="primary" round>
        下载数据<i class="el-icon-download el-icon--right"></i>
      </el-button>
    </div>
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
    systemControlsEnable () {
      return this.$store.state.isOnTest;
    },
  },
  methods: {
    saveData() {
      // 保存测试数据的 excel 表格，及数据曲线截图
      alert('数据下载成功！');
    },
    stopTest() {
      // 检查当前是否在 非测试状态
      if (!this.$store.state.isOnTest) {
        this.addMessage('当前系统处于非测试转态，请勿重复操作！', 'info');
        return;
      }
      // 提示用户确认，是否停止采集
      this.$confirm(`<strong>此操作将停止采集数据,是否继续?</strong>`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          dangerouslyUseHTMLString: true
        }).then(() => {
          // 向停止采集接口发起请求，给后台停止测试信号
          this.axios.get(this.util.testApi() + '/stopTest')
            .then(res => {
              let result = res.data;
              let type = result.isSuccess ? 'success' : 'warning';
              let messgae = result.message;
              // 停止采集成功
              if (result.isSuccess) {
                // 更新 store.state.isOntest = false
                this.$store.commit('setIsOnTest', false);
                // 清空 store.state 中已选择仪器数组
                this.$store.commit('clearAllSelectedEquipments', false);
                // this.testDeviceInfo = [];
              }
              this.addMessage(messgae, type);
            })
            .catch(err => {
              this.addMessage('异常错误，请刷新后检查是否成功!', 'warning');
            });
        }).catch(() => {
          this.addMessage('已取消操作！');
        });
    },
    addMessage(message, messageType) {
      this.$message({
        message: message,
        type: messageType ? messageType : 'info'
      });
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

.main-control{
  position: absolute;
  display: inline-block;
  top: 0;
  right: 25px;
  height: 64px;
}

.main-control-btn{
  margin-top: 12px;
  margin-left: 30px;
}
</style>

