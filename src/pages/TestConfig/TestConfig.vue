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
      <div v-if="!isActive">
        <!-- 未处在测试状态，且不是从设备管理页路由并传递参数到本页时显示 -->
        <h4>当前系统未处在测试状态，如需要进行测试，请切换到设备管理页，选择测试设备，启动测试！</h4>
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
      isActive: false,
      testTemplate: {
        cycle: '',
        temp: '',
        humi: '',
        centerID: '',
        IDS: '',
        isSendding: true
      },
      cycle: '',
      testDeviceInfo: []
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
      this.isActive = true;      
      // 如果是从设备管理页路由到本也，并传递了参数，即启动测试功能
      let equipments = this.$route.query.equipments;
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
    }
    // else if () {
      // 如果路由到本页时，未路由传参，需判断是否当前处于测试状态

    // }
    else {
      // 路由到本页，未路由传参且不处于测试状态
      this.isActive = false;
    }
  },
  methods: {
    setAllEquipment() {
      // 使用预先配置的测试模板信息，一键配置所有测试仪器的温度示值、湿度示值、工作周期信息
      let testTemplate = this.testTemplate;
      this.cycle = this.testTemplate.cycle;
      this.testDeviceInfo.forEach((testDevice, index) => {
        testDevice.config.temp = testTemplate.temp;
        testDevice.config.humi = testTemplate.humi;
      });
    },
    startTest() {
      // 检查是否具备启动测试条件

      // 给后台启动测试信号，所有测试设备信息传送到后端程序
      
    },
    stopTest() {
      // 给后台停止测试信号
    },
    setData(originData, newData) {
      Object.keys(newData).forEach((key) => {
        if (originData.hasOwnProperty(key)) {
          Vue.set(originData, key, newData[key])
        }
      })
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