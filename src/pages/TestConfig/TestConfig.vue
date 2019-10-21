<template>
  <div class="test-config">
    <!-- 测试管理页头，工作周期输入框、控制按钮 -->
    <el-row style="margin-bottom:10px;">
      <el-col class="header" :span="24">
        <el-card shadow="always">
          <div class="header-input-container">
            <span>测试管理页</span>
            <el-input class="cycle-input" placeholder="请输入工作周期s" v-model="cycle">
              <template slot="prepend">工作周期：</template>
            </el-input>
          </div>
          <div class="header-control">
            <el-button class="test-header-btn" type="success" round>一键配置</el-button>
            <el-button class="test-header-btn" type="info" round>停止测试</el-button>
            <el-button class="test-header-btn" type="success" round>启动测试</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 测试设备配置区块，展示所有测试设备配置信息 -->
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
};
</script>

<style lang="scss" scoped>
.test-config{
  padding: 10px 10px 0 10px;
}

.header{
  position: relative;
}
.header-input-container{
  display: inline-block;
  width: 50%;
}
.cycle-input{
  width: 50%;
  margin-left: 35px;
}
.header-control{
  position: absolute;
  top: 22px;
  left: 50%;
  width: 50%;
  text-align: right;
}
.test-header-btn{
  margin-right: 25px;
}

.testEq-container{
  margin-top: 10px;
  background-color: rgb(255,255,255);
  height: 72vh;
  padding: 10px 10px 0 10px;
}

</style>