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
import TestConfigItem from './TestConfigItem'

export default {
  name: 'test-config',
  components: {
    'test-config-item': TestConfigItem
  },
  data() {
    return {
      testTemplate: {
        isSendding: true
      },
      cycle: '',
      testDeviceInfo: [
        // {
        //   device: {
        //     company: '南京高华科技股份有限公司',
        //     em: '南京高华',
        //     deviceName: '温湿度传感器',
        //     deviceType: '温湿度',
        //     id: '01',
        //   },
        //   config: {
        //     temp: '',
        //     humi: '',
        //     centerID: '',
        //     IDS: ''
        //   }
        // }
      ]
    }
  },
  methods: {
    setAllEquipment() {
      // 获取测试模板信息

      // 使用预先配置的测试模板信息，一键配置所有测试仪器的温度示值、湿度示值、工作周期信息

    },
    startTest() {
      // 检查是否具备启动测试条件

      // 给后台启动测试信号
    },
    stopTest() {
      // 给后台停止测试信号
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