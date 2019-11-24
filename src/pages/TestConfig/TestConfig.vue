<template>
  <div class="test-config">
    <!-- 测试管理页头，工作周期输入框、控制按钮 -->
    <el-row style="margin-bottom:10px;">
      <el-col :span="24">
        <el-card shadow="always">
            <el-row :gutter="10">
              <el-col :span="2"><span style="height:40px;line-height:40px;">测试管理页</span></el-col>
              <el-col :span="6">
                <el-input class="cycle-input" placeholder="请输入工作周期s" v-model="cycle">
                  <template slot="prepend">工作周期：</template>
                </el-input>
              </el-col>
              <el-col :span="7">
                <el-switch class="cycle-switch"
                  v-model="testTemplate.isSendding"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-text="周期获取数据"
                  inactive-text="仅监测数据">
                </el-switch>
              </el-col>
              <el-col :span="3">
                <el-button @click="setAllEquipment"
                  class="test-header-btn" type="success" round>一键配置</el-button>
              </el-col>
              <el-col :span="3">
                <el-button @click="stopTest" 
                  class="test-header-btn" type="info" round>停止测试</el-button>
              </el-col>
              <el-col :span="3">
                <el-button @click="startTest" 
                  class="test-header-btn" type="success" round>启动测试</el-button>
              </el-col>
            </el-row>
        </el-card>
      </el-col>
    </el-row>
    <!-- 测试仪器配置区块，展示所有测试仪器配置信息 -->
    <div class="testEq-container">
      <div v-if="getCurrentState">
        <!-- 未处在测试状态，且不是从设备管理页路由并传递参数到本页时显示 -->
        <h4 style="padding:10px 0 10px 10px; color: crimson;;">当前系统未处在测试状态，如需要进行测试，请切换到设备管理页，选择测试设备，启动测试！</h4>
      </div>
      <test-config-item 
        v-for="(item,index) in testDeviceInfo"
        :key="index"
        :device="item.device"
        :config="item.config"
      />
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import TestConfigItem from './TestConfigItem';

export default {
  name: 'test-config',
  components: {
    'test-config-item': TestConfigItem
  },
  data() {
    return {
      cycle: '',
      isSendding: false,
      testDeviceInfo: [
        // {
        //   device: {
        //     company: '',
        //     em: '',
        //     deviceName: '',
        //     deviceType: '',
        //     deviceID: '',
        //   },
        //   config: {
        //     temp: '',
        //     humi: '',
        //     centerID: '',
        //     IDS: '',
        //   }
        // }
      ],
      testTemplate: {
        cycle: '',
        temp: '',
        humi: '',
        centerID: '',
        IDS: '',
        isSendding: true
      },
    }
  },
  beforeMount() {
    // 获取测试模板信息，并初始化 data.testTemplate
    this.axios.get(this.util.testApi() + '/testTemplate/get')
      .then(res => {
        this.setData(this.testTemplate, res.data);
      })
      .catch(err => {
        // 失败处理
        console.log(err);
      });
  },
  mounted() {
    if ('equipments' in this.$route.query) {
      // 如果是从设备管理页路由到本也，并传递了参数，即进入测试功能
      let equipments = this.$route.query.equipments;
      if (equipments instanceof Array === false) return;
      equipments.forEach((equipment, index) => {
        let testDevice = {
          device: equipment,
          config: {
            temp: '',
            humi: '',
            centerID: '',
            IDS: ''
          }
        };
        this.testDeviceInfo.push(testDevice);
      });
    } else {

    }
  },
  methods: {
    setAllEquipment() {
      // 使用预先配置的测试模板信息，一键配置所有测试仪器的温度示值、湿度示值、工作周期信息
      let testTemplate = this.testTemplate;
      this.cycle = this.testTemplate.cycle;
      this.isSendding = this.testTemplate.isSendding;
      this.testDeviceInfo.forEach((testDevice, index) => {
        testDevice.config.temp = testTemplate.temp;
        testDevice.config.humi = testTemplate.humi;
      });
    },
    startTest() {
      // 检查当前是否在 测试状态
      if (this.$store.state.isOnTest) {
        this.addMessage('当前系统处于测试转态，请勿重复操作！', 'info');
        return;
      }
      // 检查是否具备启动测试条件
      
      // 给后台启动测试信号，所有测试设备信息传送到后端程序
      
        // 提示操作结果
        this.addMessage('启动测试成功！！', 'success');
        // 启动测试成功，更新 store.state
        this.$store.commit('changeTestState', true);
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
              this.addMessage(messgae, type);
              // 停止采集成功
              if (result.isSuccess) {
                // 更新 store.state.isOntest = false
                this.$store.commit('changeTestState', false);
              }
            })
            .catch(err => {
              this.addMessage('异常错误，请刷新后检查是否成功!', 'warning');
            });
        }).catch(() => {
          this.addMessage('已取消操作！');
        });
    },
    setData(originData, newData) {
      Object.keys(newData).forEach((key) => {
        if (originData.hasOwnProperty(key)) {
          Vue.set(originData, key, newData[key])
        }
      })
    },
    addMessage(message, messageType) {
      this.$message({
        message: message,
        type: messageType ? messageType : 'info'
      });
    },
  },
  computed: {
    getCurrentState () {
      return (this.testDeviceInfo.length === 0) && !this.$store.state.isOnTest;
    }
  }
};
</script>

<style lang="scss" scoped>
.test-config{
  padding: 10px 10px 0 10px;
}

.cycle-switch{
  display:inline-block;
  padding-top: 10px;
  padding-left: 20px;
}

.testEq-container{
  margin-top: 10px;
  background-color: rgb(255,255,255);
  height: 72vh;
  padding: 10px 10px 0 10px;
}


</style>