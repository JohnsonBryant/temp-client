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
                    <el-row :gutter="10">
                      <el-col :span="10">
                        <el-input placeholder="输入串口号" v-model.trim="config.SerialPortName">
                          <template slot="prepend">串口号：</template>
                        </el-input>
                      </el-col>
                      <el-col :span="10">
                        <el-input placeholder="输入波特率" v-model.trim.number="config.BaudRate">
                          <template slot="prepend">波特率：</template>
                        </el-input>
                      </el-col>
                      <el-col :span="4">
                        <el-button @click="handlePortSetClick" type="primary">提交<i class="el-icon-check el-icon--right"></i></el-button>
                      </el-col>
                    </el-row>
                  </div>
                  <div class="wk-item-pie box2">
                    <el-row :gutter="10">
                      <el-col :span="10">
                        <el-input placeholder="输入最低电压" v-model.trim="config.BatteryLow">
                          <template slot="prepend">最低电压：</template>
                        </el-input>
                      </el-col>
                      <el-col :span="10">
                        <el-input placeholder="输入最高电压" v-model.trim="config.BatteryHigh">
                          <template slot="prepend">最高电压：</template>
                        </el-input>
                      </el-col>
                      <el-col :span="4">
                        <el-button @click="handleBatterySetClick" type="primary">提交<i class="el-icon-check el-icon--right"></i></el-button>
                      </el-col>                      
                    </el-row>
                  </div>
                  <div class="wk-item-pie box3">
                    <el-row :gutter="10">
                      <el-col :span="10">
                        <el-input placeholder="输入原始ID" v-model.trim.number="idSetting.originID">
                          <template slot="prepend">原始ID：</template>
                        </el-input>
                      </el-col>
                      <el-col :span="10">
                        <el-input placeholder="输入新设ID" v-model.trim.number="idSetting.newID">
                          <template slot="prepend">新设ID：</template>
                        </el-input>
                      </el-col>
                      <el-col :span="4">
                        <el-button @click="handleIDSetClick" type="primary">提交<i class="el-icon-check el-icon--right"></i></el-button>
                      </el-col>
                    </el-row>
                    <div class="wk-item-search-sensor">
                      <el-button @click="handleSerachSensorClick" type="success">搜索传感器<i class="el-icon-check el-icon--right"></i></el-button>
                    </div>                    
                  </div>
                  <div class="wk-item-pie message-box">
                    <p v-for="message in messages" :key="message.id">{{message.value}}</p> 
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card class="wk-item" shadow="always">
                <h4 class="wk-item-title">测试模板配置</h4>
                <el-divider></el-divider>
                <el-row :gutter="10">
                  <el-col class="wk-template wk-template1" :span="12">
                    <el-input class="cycle-input" placeholder="请输入工作周期s" v-model.trim="testTemplate.cycle">
                      <template slot="prepend">工作周期：</template>
                    </el-input>
                  </el-col>
                </el-row>
                <el-row ::gutter="10">
                  <el-col class="wk-template" :span="12">
                    <el-input class="testEq-item-conf-input" placeholder="输入温度示值" v-model.trim="testTemplate.temp">
                      <template slot="prepend">温度示值：</template>
                    </el-input>
                  </el-col>
                  <el-col class="wk-template" :span="12">
                    <el-input class="testEq-item-conf-input" placeholder="输入湿度示值" v-model.trim="testTemplate.humi">
                      <template slot="prepend">温度示值：</template>
                    </el-input>
                  </el-col>
                  <el-col class="wk-template" :span="12">
                    <el-input class="testEq-item-conf-input" placeholder="输入中心点ID" v-model.trim="testTemplate.centerID">
                      <template slot="prepend">中心点ID：</template>
                    </el-input>
                  </el-col>
                  <el-col class="wk-template" :span="12">
                    <el-input class="testEq-item-conf-input" placeholder="输入传感器ID：1,2" v-model.trim="testTemplate.IDS">
                      <template slot="prepend">传感器ID：</template>
                    </el-input>
                  </el-col>
                </el-row>                
                <div class="wk-template-btns">
                  <el-button @click="handletestTemplateSaveClick" type="primary">保存测试模板<i class="el-icon-check el-icon--right"></i></el-button>
                </div>
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

export default {
  name: 'workspace',
  data() {
    return {
      config: {
        SerialPortName: '',
        BaudRate: '',
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
        IDS: ''
      },
      messages: [{id: 0, value: 'first message'}]
    }
  },
  mounted() {
    this.messages.push({id: this.messages.length+1, value: 'message'+new Date().toLocaleTimeString()})
    this.initConfig()
  },
  methods: {
    handlePortSetClick() {
      // 串口参数修改数据提交处理函数
      this.axios.post(this.util.testApi() + '/serialportConf/set', {
          SerialPortName: this.config.SerialPortName,
          BaudRate: this.config.BaudRate
        })
        .then(res => {
          if (res.data.isSuccessed) {
            console.log('串口参数修改成功')
          } else {
            console.log('串口参数修改失败，请按F5刷新后重新尝试！')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleBatterySetClick() {
      // 电池参数修改数据提交处理函数
      this.axios.post(this.util.testApi() + '/batteryConf/set', {
          BatteryLow: this.config.BatteryLow,
          BatteryHigh: this.config.BatteryHigh
        })
        .then(res => {
          if (res.data.isSuccessed) {
            console.log('电池参数修改成功')
          } else {
            console.log('电池参数修改失败，请按F5刷新后重新尝试！')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleIDSetClick() {
      if (this.idSetting.originID === '' || this.idSetting.newID === '') {
        alert('请输入原始ID和新设ID后，再提交修改！')
        return
      }
      // 更改传感器ID，提交处理函数
      this.axios.post(this.util.testApi() + '/idSet', {
          originID: this.idSetting.originID,
          newID: this.idSetting.newID
        })
        .then(res => {
          if (res.data.isSuccessed) {
            console.log('修改传感器ID发送成功')
          } else {
            console.log('修改传感器ID发送失败，请按F5刷新后重新尝试！')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleSerachSensorClick() {
      // 搜索传感器命令发送
      this.axios.get(this.util.testApi() + '/searchSensor')
        .then(res => {
          if (res.data.isSuccessed) {
            console.log('搜索传感器发送成功')
          } else {
            console.log('搜索传感器发送失败，请按F5刷新后重新尝试！')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    handletestTemplateSaveClick() {
      // 测试模板修改提交处理函数
      this.axios.post(this.util.testApi() + '/testTemplate/set', {
          cycle: this.testTemplate.cycle,
          temp: this.testTemplate.temp,
          humi: this.testTemplate.humi,
          centerID: this.testTemplate.centerID,
          IDS: this.testTemplate.IDS,
        })
        .then(res => {
          if (res.data.isSuccessed) {
            console.log('测试模板保存成功')
          } else {
            console.log('测试模板保存失败，请按F5刷新后重新尝试！')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    initConfig() {
      // 获取当前程序配置信息，并初始化 data.config
      this.axios.get(this.util.testApi() + '/config/get')
        .then(res => {
          this.setData(this.config, res.data)
        })
        .catch(err => {
          console.log(err)
        })
      // 获取当前测试模板信息，并初始化 data.testTemplate
      this.axios.get(this.util.testApi() + '/testTemplate/get')
        .then(res => {
          this.setData(this.testTemplate, res.data)
        })
        .catch(err => {
          console.log(err)    
        })
    },
    setData(originData, newData) {
      Object.keys(newData).forEach((key) => {
        Vue.set(originData, key, newData[key])
      })
    }
  }
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
  padding-top: 0;
}

.wk-item-pie.message-box{
  margin-top: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 5px;
  height: 125px;
  border: 2px solid #919094;
  border-radius: 10px;
  overflow: auto;
}

.wk-template{
  padding-top: 10px;
  padding-bottom: 10px;
}
.wk-template.wk-template1{
  padding-top: 0;
}

.wk-template-btns{
  padding-top: 10px;
}
</style>