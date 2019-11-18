<template>
  <div class="workspace">
    <el-row style="margin-bottom:10px;">
      <el-col :span="24">
        <el-card shadow="always">
          功能配置页
        </el-card>
        <div class="wk-container">
          <el-row :gutter="15">
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
                            <el-input placeholder="输入串口号" v-model.trim="SerialPort.SerialPortName">
                              <template slot="prepend">串口号：</template>
                            </el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="10">
                          <el-form-item prop="BaudRate">
                            <el-input placeholder="输入波特率" v-model.trim.number="SerialPort.BaudRate">
                              <template slot="prepend">波特率：</template>
                            </el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="4">
                          <el-button @click="handlePortSetClick" type="primary">提交<i class="el-icon-check el-icon--right"></i></el-button>
                        </el-col>
                      </el-row>
                    </el-form>
                  </div>
                  <div class="wk-item-pie box2">
                    <el-form :model="Battery" :rules="rulesBattery" ref="Battery" >
                      <el-row :gutter="10">
                        <el-col :span="10">
                          <el-form-item prop="BatteryLow">
                            <el-input placeholder="输入最低电压" v-model.trim="Battery.BatteryLow">
                              <template slot="prepend">最低电压：</template>
                            </el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="10">
                          <el-form-item prop="BatteryHigh">
                            <el-input placeholder="输入最高电压" v-model.trim="Battery.BatteryHigh">
                              <template slot="prepend">最高电压：</template>
                            </el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="4">
                          <el-button @click="handleBatterySetClick" type="primary">提交<i class="el-icon-check el-icon--right"></i></el-button>
                        </el-col>                      
                      </el-row>
                    </el-form>
                  </div>
                  <div class="wk-item-pie box3">
                    <el-form :model="idSetting" :rules="rulesidSetting" ref="idSetting" >
                      <el-row :gutter="10">
                        <el-col :span="10">
                          <el-form-item prop="originID">
                            <el-input placeholder="输入原始ID" v-model.trim.number="idSetting.originID">
                              <template slot="prepend">原始ID：</template>
                            </el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="10">
                          <el-form-item prop="newID">
                            <el-input placeholder="输入新设ID" v-model.trim.number="idSetting.newID">
                              <template slot="prepend">新设ID：</template>
                            </el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="4">
                          <el-button @click="handleIDSetClick" type="primary">提交<i class="el-icon-check el-icon--right"></i></el-button>
                        </el-col>
                      </el-row>
                    </el-form>
                    <div class="wk-item-search-sensor">
                      <el-button @click="handleSerachSensorClick" type="success">搜索传感器<i class="el-icon-check el-icon--right"></i></el-button>
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
                      <el-col :span="10">
                        <el-form-item prop="temp">
                          <el-input class="testEq-item-conf-input" placeholder="输入温度示值" v-model.trim="testTemplate.temp">
                            <template slot="prepend">温度示值：</template>
                          </el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="10">
                        <el-form-item prop="humi">
                          <el-input class="testEq-item-conf-input" placeholder="输入湿度示值" v-model.trim="testTemplate.humi">
                            <template slot="prepend">湿度示值：</template>
                          </el-input>
                        </el-form-item>                
                      </el-col>
                    </el-row>
                  </div>
                  <div class="wk-item-pie">
                    <el-row :gutter="10">
                      <el-col :span="10">
                        <el-form-item prop="centerID">
                          <el-input class="testEq-item-conf-input" placeholder="输入中心点ID" v-model.trim="testTemplate.centerID">
                            <template slot="prepend">中心点ID：</template>
                          </el-input>
                        </el-form-item>                      
                      </el-col>
                      <el-col :span="10">
                        <el-form-item prop="IDS">
                          <el-input class="testEq-item-conf-input" placeholder="输入传感器ID：1,2" v-model.trim="testTemplate.IDS">
                            <template slot="prepend">传感器ID：</template>
                          </el-input>
                        </el-form-item>                      
                      </el-col>
                    </el-row>
                  </div>
                  <div class="wk-item-pie">
                    <el-row :gutter="10">
                      <el-col :span="10">
                        <el-form-item prop="cycle">
                          <el-input class="cycle-input" placeholder="请输入工作周期s" v-model.trim="testTemplate.cycle">
                            <template slot="prepend">工作周期：</template>
                          </el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="10" style="padding-top: 10px;border: 1px solid #dfdfdf;border-radius: 5px;height: 40px; background-color: #F5F7FA;">
                        <el-form-item prop="isSendding">
                          <el-switch
                            style="display: block"
                            v-model="testTemplate.isSendding"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            active-text="周期获取数据"
                            inactive-text="仅监测数据">
                          </el-switch>
                        </el-form-item>
                      </el-col>                  
                    </el-row>
                    <div class="wk-template-btns">
                      <el-button @click="handletestTemplateSaveClick" type="primary">保存测试模板<i class="el-icon-check el-icon--right"></i></el-button>
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
        BatteryHigh: ''
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
    }
  },
  mounted() {
    this.initConfig()
  },
  methods: {
    handlePortSetClick() {
      this.$refs['SerialPort'].validate((valid) => {
        if (valid) {
          // 串口参数修改数据提交处理函数
          this.axios.post(this.util.testApi() + '/serialportConf/set', {
              SerialPortName: this.SerialPort.SerialPortName,
              BaudRate: this.SerialPort.BaudRate
            })
            .then(res => {
              if (res.data.isSuccess) {
                this.addMessage('串口参数修改成功', 'success')
              } else {
                this.addMessage('串口参数修改失败，请按F5刷新后重新尝试！', 'warning')
              }
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
    },
    handleBatterySetClick() {
      this.$refs['Battery'].validate((valid) => {
        if (valid) {
          // 电池参数修改数据提交处理函数
          this.axios.post(this.util.testApi() + '/batteryConf/set', {
              BatteryLow: this.Battery.BatteryLow,
              BatteryHigh: this.Battery.BatteryHigh
            })
            .then(res => {
              if (res.data.isSuccess) {
                this.addMessage('电池参数修改成功', 'success')
              } else {
                this.addMessage('电池参数修改失败，请按F5刷新后重新尝试！', 'warning')
              }
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
    },
    handleIDSetClick() {
      this.$refs['idSetting'].validate((valid) => {
        if (valid) {
          // 更改传感器ID，提交处理函数
          this.axios.post(this.util.testApi() + '/idSet', {
              originID: this.idSetting.originID,
              newID: this.idSetting.newID
            })
            .then(res => {
              let result = res.data;
              let type = result.isSuccess ? 'success' : 'warning';
              let message = result.message;
              this.addMessage(message, type);
            })
            .catch(err => {
              this.addMessage('异常错误，请刷新后重试！', 'warning');
            })
        }
      })
    },
    handleSerachSensorClick() {
      // 搜索传感器命令发送
      this.axios.get(this.util.testApi() + '/searchSensor')
        .then(res => {
          if (res.data.isSuccess) {
            this.showSearchSencor('搜索传感器发送成功，1,2,3,4,5,6,7,8,9,10,12,11,13,14,15,16,17，18', 'success')
          } else {
            this.showSearchSencor('搜索传感器发送失败，请按F5刷新后重新尝试！', 'warning')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    handletestTemplateSaveClick() {
      this.$refs['testTemplate'].validate((valid) => {
        if (valid) {
          // 测试模板修改提交处理函数
          this.axios.post(this.util.testApi() + '/testTemplate/set', {
              cycle: this.testTemplate.cycle,
              temp: this.testTemplate.temp,
              humi: this.testTemplate.humi,
              centerID: this.testTemplate.centerID,
              IDS: this.testTemplate.IDS,
              isSendding: this.testTemplate.isSendding,
            })
            .then(res => {
              if (res.data.isSuccess) {
                this.addMessage('测试模板保存成功', 'success')
              } else {
                this.addMessage('测试模板保存失败，请按F5刷新后重新尝试！', 'warning')
              }
            })
            .catch(err => {
              console.log(err)
            })
        }
      })      
    },
    initConfig() {
      // 获取当前程序配置信息，并初始化 data.config
      this.axios.get(this.util.testApi() + '/config/get')
        .then(res => {
          this.setData(this.SerialPort, res.data)
          this.setData(this.Battery, res.data)
        })
        .catch(err => {
          // 失败处理
          console.log(err)
        })
      // 获取当前测试模板信息，并初始化 data.testTemplate
      this.axios.get(this.util.testApi() + '/testTemplate/get')
        .then(res => {
          this.setData(this.testTemplate, res.data)
        })
        .catch(err => {
          // 失败处理
          console.log(err)    
        })
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
        type: messageType
      })
    },
    showSearchSencor(message, messageType) {
      this.$message({
        message: message,
        type: messageType,
        duration: 10000,
        // showClose: true
      })
    }
  },
  sockets:{
    dataMsg: function(pack){
      console.log(pack)
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