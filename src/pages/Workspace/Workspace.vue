<template>
  <div class="workspace">
    <el-row style="margin-bottom:10px;">
      <el-col :span="24">
        <el-card shadow="always">
          功能配置页
        </el-card>
        <div class="wk-container">
          <el-row :gutter="10">
            <el-col :span="12">
              <el-card class="wk-item" shadow="always">
                <h4 class="wk-item-title">参数配置</h4>
                <el-divider></el-divider>
                <div class="wk-item-container">
                  <div class="wk-item-pie box1">
                    <el-form :model="SerialPort" :rules="rulesSerialPort" ref="SerialPort" >
                      <el-row :gutter="10">
                        <el-col :span="10">
                          <el-form-item prop="SerialPortName">
                            <el-input placeholder="输入串口号" v-model.trim="SerialPort.SerialPortName" :disabled="controlEnabled">
                              <template slot="prepend">串口号：</template>
                            </el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="10">
                          <el-form-item prop="BaudRate">
                            <el-input placeholder="输入波特率" v-model.trim.number="SerialPort.BaudRate" :disabled="controlEnabled">
                              <template slot="prepend">波特率：</template>
                            </el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="4">
                          <el-button @click="PortSetClick" type="primary" :disabled="controlEnabled">提交<i class="el-icon-check el-icon--right"></i></el-button>
                        </el-col>
                      </el-row>
                    </el-form>
                  </div>
                  <div class="wk-item-pie box2">
                    <el-form :model="Battery" :rules="rulesBattery" ref="Battery" >
                      <el-row :gutter="10">
                        <el-col :span="10">
                          <el-form-item prop="BatteryLow">
                            <el-input placeholder="输入最低电压" v-model.trim="Battery.BatteryLow" :disabled="controlEnabled">
                              <template slot="prepend">最低电压：</template>
                            </el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="10">
                          <el-form-item prop="BatteryHigh">
                            <el-input placeholder="输入最高电压" v-model.trim="Battery.BatteryHigh" :disabled="controlEnabled">
                              <template slot="prepend">最高电压：</template>
                            </el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="4">
                          <el-button @click="BatterySetClick" type="primary" :disabled="controlEnabled">提交<i class="el-icon-check el-icon--right"></i></el-button>
                        </el-col>                      
                      </el-row>
                    </el-form>
                  </div>
                  <div class="wk-item-pie box3">
                    <el-form :model="idSetting" :rules="rulesidSetting" ref="idSetting" >
                      <el-row :gutter="10">
                        <el-col :span="10">
                          <el-form-item prop="originID">
                            <el-input placeholder="输入原始ID" v-model.trim.number="idSetting.originID" :disabled="controlEnabled">
                              <template slot="prepend">原始ID：</template>
                            </el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="10">
                          <el-form-item prop="newID">
                            <el-input placeholder="输入新设ID" v-model.trim.number="idSetting.newID" :disabled="controlEnabled">
                              <template slot="prepend">新设ID：</template>
                            </el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="4">
                          <el-button @click="IDSetClick" type="primary" :disabled="controlEnabled">提交<i class="el-icon-check el-icon--right"></i></el-button>
                        </el-col>
                      </el-row>
                    </el-form>
                    <div class="wk-item-search-sensor">
                      <el-button @click="SerachSensorClick" type="success" :disabled="controlEnabled">搜索传感器<i class="el-icon-check el-icon--right"></i></el-button>
                      <div class="wk-item-search-sensor-container">
                        <span class="searched-sensor-item" v-for="(sensorID) in searchedSensorIDs" :key="sensorID">{{ sensorID }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card class="wk-item" shadow="always">
                <h4 class="wk-item-title">测试模板配置</h4>
                <el-divider></el-divider>
                <el-form :model="testTemplate" :rules="rulestestTemplate" ref="testTemplate" >
                  <div class="wk-item-pie">
                    <el-row :gutter="10">
                      <el-col :span="11">
                        <el-form-item prop="cycle">
                          <el-input class="cycle-input" placeholder="请输入工作周期s" v-model.trim="testTemplate.cycle" :disabled="controlEnabled">
                            <template slot="prepend">工作周期(s/秒)：</template>
                          </el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="11">
                        <el-form-item prop="centerID">
                          <el-input class="testEq-item-conf-input" placeholder="输入中心点ID" v-model.trim="testTemplate.centerID" :disabled="controlEnabled">
                            <template slot="prepend">中心点ID：</template>
                          </el-input>
                        </el-form-item>                      
                      </el-col>
                    </el-row>
                  </div>
                  <div class="wk-item-pie">
                    <el-row :gutter="10">
                      <el-col :span="11">
                        <el-form-item prop="temp">
                          <el-input class="testEq-item-conf-input" placeholder="输入温度示值" v-model.trim="testTemplate.temp" :disabled="controlEnabled">
                            <template slot="prepend">温度示值(℃)：</template>
                          </el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="11">
                        <el-form-item prop="IDS">
                          <el-input class="testEq-item-conf-input" placeholder="输入传感器ID：1,2" v-model.trim="testTemplate.IDS" :disabled="controlEnabled">
                            <template slot="prepend">传感器ID：</template>
                          </el-input>
                        </el-form-item>                      
                      </el-col>
                    </el-row>
                  </div>
                  <div class="wk-item-pie">
                    <el-row :gutter="10">
                      <el-col :span="11">
                        <el-form-item prop="humi">
                          <el-input class="testEq-item-conf-input" placeholder="输入湿度示值" v-model.trim="testTemplate.humi" :disabled="controlEnabled">
                            <template slot="prepend">湿度示值(%RH)：</template>
                          </el-input>
                        </el-form-item>                
                      </el-col>
                      <el-col :span="11">
                        <div style="padding-top: 10px;padding-left:10px;border: 1px solid #dfdfdf;border-radius: 5px;height: 40px; background-color: #F5F7FA;">
                          <el-form-item prop="isSendding">
                            <el-switch
                              style="display: block"
                              v-model="testTemplate.isSendding"
                              active-color="#13ce66"
                              inactive-color="#ff4949"
                              active-text="周期获取数据"
                              inactive-text="仅监测数据"
                              :disabled="controlEnabled">
                            </el-switch>
                          </el-form-item>
                        </div>
                      </el-col>                  
                    </el-row>
                    <div class="wk-template-btns">
                      <el-button @click="TestTemplateSaveClick" type="primary" :disabled="controlEnabled">保存测试模板<i class="el-icon-check el-icon--right"></i></el-button>
                    </div>
                  </div>
                </el-form>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Vue from 'vue'

let rules = {
  SerialPort: {
    SerialPortName: [
        { required: true, message: '请输入串口名', trigger: 'blur' },
        { min: 4, max: 5, message: '长度在 4 到 5 个字符', trigger: 'blur' }
      ],
    BaudRate: [
      { required: true, message: '请输入波特率', trigger: 'change' }
    ],
  },
  Battery: {
    BatteryLow: [
      { required: true, message: '请输入电量值', trigger: 'change' }
    ],
    BatteryHigh: [
      { required: true, message: '请输入电量值', trigger: 'change' }
    ],
  },
  idSetting: {
    originID: [
        { required: true, message: '请输入原始ID', trigger: 'change' }
      ],
    newID: [
      { required: true, message: '请输入新设ID', trigger: 'change' }
    ],
  },
  testTemplate: {
    cycle: [
        { required: true, message: '请输入周期', trigger: 'change' }
      ],
    temp: [
      { required: true, message: '请输入温度示值', trigger: 'change' }
    ],
    humi: [
      { required: true, message: '请输入湿度示值', trigger: 'change' }
    ],
    centerID: [
      { required: true, message: '请输入中心点ID', trigger: 'change' }
    ],
    IDS: [
      { required: true, message: '请输入其他ID', trigger: 'change' }
    ],
    isSendding: [

    ]
  }
}


export default {
  name: 'workspace',
  data() {
    return {
      SerialPort: {
        SerialPortName: '',
        BaudRate: '',
      },
      Battery: {
        BatteryLow: '',
        BatteryHigh: '',
      },
      idSetting: {
        originID: '',
        newID: ''
      },
      testTemplate: {
        cycle: '',
        temp: '',
        humi: '',
        centerID: '',
        IDS: '',
        isSendding: true
      },
      rulesSerialPort: rules.SerialPort,
      rulesBattery: rules.Battery,
      rulesidSetting: rules.idSetting,
      rulestestTemplate: rules.testTemplate,
      searchedSensorIDs: [1], // 存储搜索传感器功能搜索到的传感器ID
    }
  },
  beforeMount() {
    this.initConfig();
  },
  computed: {
    controlEnabled () {
      return this.$store.state.isOnTest; // 返回当前系统是否在测试状态的真值， 控制控件的可用状态
    },
  },
  methods: {
    initConfig() {
      // 获取当前程序配置信息，并初始化 data.config
      this.axios.get(this.util.testApi() + '/config/get')
      .then(res => {
        this.setData(this.SerialPort, res.data);
        this.setData(this.Battery, res.data);
      })
      .catch(err => {
        this.addMessage(`异常错误，请刷新后重试！${err.message}`, 'warning'); // 失败处理
      })
      // 获取当前测试模板信息，并初始化 data.testTemplate
      this.axios.get(this.util.testApi() + '/testTemplate/get')
      .then(res => {
        this.setData(this.testTemplate, res.data);
      })
      .catch(err => {
        this.addMessage(`异常错误，请刷新后重试！${err.message}`, 'warning'); // 失败处理
      });
    },
    PortSetClick() {
      this.$refs['SerialPort'].validate((valid) => {
        if (valid) {
          // 串口参数修改数据提交处理函数
          this.axios.post(this.util.testApi() + '/serialportConf/set', {
              SerialPortName: this.SerialPort.SerialPortName,
              BaudRate: parseInt(this.SerialPort.BaudRate),
            })
            .then(res => {
              this.showAjaxRequestMessage(res.data);
            })
            .catch(err => {
              this.addMessage('异常错误，请刷新后重试！', 'warning');
            })
        }
      })
    },
    BatterySetClick() {
      this.$refs['Battery'].validate((valid) => {
        if (valid) {
          // 电池参数修改数据提交处理函数
          this.axios.post(this.util.testApi() + '/batteryConf/set', {
              BatteryLow: parseFloat(this.Battery.BatteryLow),
              BatteryHigh: parseFloat(this.Battery.BatteryHigh),
            })
            .then(res => {
              this.showAjaxRequestMessage(res.data);
            })
            .catch(err => {
              this.addMessage('异常错误，请刷新后重试！', 'warning');
            })
        }
      })
    },
    IDSetClick() {
      this.$refs['idSetting'].validate((valid) => {
        if (valid) {
          // 更改传感器ID，提交处理函数
          this.axios.post(this.util.testApi() + '/idSet', {
              originID: this.idSetting.originID,
              newID: this.idSetting.newID
            })
            .then(res => {
              this.showAjaxRequestMessage(res.data);
            })
            .catch(err => {
              this.addMessage('异常错误，请刷新后重试！', 'warning');
            })
        }
      })
    },
    SerachSensorClick() {
      // 重置当前缓存 搜索传感器ID的变量
      const searchedSensorIDs = this.searchedSensorIDs;
      if (searchedSensorIDs.length !== 0) {
        this.searchedSensorIDs.splice(0, this.searchedSensorIDs.length);
      }
      // 搜索传感器命令发送
      this.axios.get(this.util.testApi() + '/searchSensor')
        .then(res => {
          this.showAjaxRequestMessage(res.data);
        })
        .catch(err => {
          this.addMessage('异常错误，请刷新后重试！', 'warning');
        })
    },
    TestTemplateSaveClick() {
      this.$refs['testTemplate'].validate((valid) => {
        if (valid) {
          const testTemplate = this.testTemplate;
          // 检查IDS中是否包含非法字符
          if (/[^\d,，]/.test(testTemplate.IDS)) {
            this.addMessage('输入的其他传感器ID中包含非法字符，只允许输入整数的传感器ID，且以 "," 隔开！', 'warning');
            return;
          }
          let IDS = testTemplate.IDS.split(',').map(id => parseInt(id));
          // 测试模板修改提交处理函数
          this.axios.post(this.util.testApi() + '/testTemplate/set', {
              cycle: parseInt(testTemplate.cycle),
              temp: parseFloat(testTemplate.temp),
              humi: parseFloat(testTemplate.humi),
              centerID: parseInt(testTemplate.centerID),
              IDS: IDS,
              isSendding: testTemplate.isSendding,
            })
            .then(res => {
              this.showAjaxRequestMessage(res.data);
            })
            .catch(err => {
              this.addMessage('异常错误，请刷新后重试！', 'warning');
            })
        }
      })      
    },

    setData(originData, newData) {
      Object.keys(newData).forEach((key) => {
        if (originData.hasOwnProperty(key)) {
          Vue.set(originData, key, newData[key]);
        }
      });
    },
    showAjaxRequestMessage (result) {
      let type = result.isSuccess ? 'success' : 'warning';
      let message = result.message;
      this.addMessage(message, type);
    },
    addMessage(message, messageType) {
      this.$message({
        message: message,
        type: messageType
      });
    },
  },
  sockets:{
    directiveSearchSensors: function(pack){
      // websocket 接收传感器数据
      console.log(pack);
      let searchedSensorIDs = this.searchedSensorIDs;
      if (!searchedSensorIDs.includes(pack.deviceID)) {
        searchedSensorIDs.push(pack.deviceID);
      } else {
        this.addMessage('搜索传感器，重复接收到传感器'+pack.deviceID.toString()+'的应答', 'warning');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.workspace{
  padding: 10px 10px 0 10px;
}

.wk-container{
  margin-top: 10px;
}

.wk-item{
  min-height: 75vh;
}

.wk-item-title{
  color: #303133;
  font-size: 15px;
  font-weight: lighter;
}

.wk-item-search-sensor{
  padding-top: 20px;
}
.wk-item-search-sensor-container{
  padding: 15px 5px 5px 5px;
}
.wk-item-search-sensor .searched-sensor-item{
  display: inline-block;
  margin: 0 5px;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: #464646;
  font-weight: 700;
  background-color: #67C23A;
  border: 1px solid #67C23A;
  border-radius: 15px;
}
.wk-item-pie{
  padding-top: 10px;
  padding-bottom: 10px;
}
.wk-item-pie.box1{
  padding-top: 10px;
}

.wk-item-pie.wk-template1{
  padding-top: 0;
}

.wk-template-btns{
  padding-top: 10px;
}
</style>