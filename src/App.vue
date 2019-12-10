<template>
  <router-view/>
</template>

<script>
export default {
  name: 'app',
  created () {
    this.initStore();
  },
  methods: {
    initStore () {
      // get nessary system data from back end and init stroe when application is reloaded
      this.axios.get('/systemSync')
        .then(res => {
          let result = res.data;
          if (result.isOnTest) {
            // 当前系统在测试状态， 同步前端 store.state 中对应的数据项
            this.$store.commit('setIsOnTest', result.isOnTest);
            this.$store.commit('setCycle', result.cycle);
            this.$store.commit('setIsSendding', result.isSendding);
            this.$store.commit('setEquiptments', result.equipments); // 与后端同步测试仪器信息，包含测试仪器数据
          }
        })
        .catch(err => {
          if (err) {
            alert(`系统初始化错误，错误提示：${err.message}`);
          }
        });
    },
    addMessage(message, messageType) {
      this.$message({
        message: message,
        type: messageType
      });
    },
  },
  sockets:{
  connectMsg (pack) {
    console.log(pack);
  },
  dataMsg (pack) {
    console.log(pack);
    this.$store.commit('setEquiptments', pack);
  },
  directiveModifyID (pack) {
    console.log(pack);
    this.addMessage(`修改传感器ID成功，当前传感器ID为 ${pack.deviceID}`, 'info');
  },
  directiveSearchSensors (pack) {
    console.log(pack);
  },
  // directiveStartTest (pack) {
  //   console.log(pack);
  // },
  // directiveStopTest (pack) {
  //   console.log(pack);
  // },
},
}
</script>

<style lang="scss">
/*复写默认样式*/
.el-submenu__title{
  font-size: 16px;
}

.siderbar-container .el-drawer__header{
  padding: 0;
  margin: 0;
}

.siderbar-container .el-drawer{
  background: rgb(0, 20, 42);
}

.siderbar-container .el-menu{
  border-right: none; 
}

.selectEq-container .el-drawer{
  background: transparent;

}
.selectEq-container .el-drawer__header{
  padding: 0;
  margin: 0;
}
.selectEq-container .el-el-drawer__header, .selectEq-container .el-drawer__body{
  background: #ffffff;
  margin-left: 10px;
  margin-right: 10px;
}

.el-table-filter__bottom button{
  font-size: 15px;
  padding: 0 18px;
}

.el-divider__text {
  color: #909399;
}

.dash-test-item .el-card__body{
  padding: 0;
}
/*复写默认样式*/

</style>