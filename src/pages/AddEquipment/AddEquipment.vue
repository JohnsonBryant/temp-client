<template>
  <div class="add-equipment">
    <el-row style="margin-bottom:10px;">
      <el-col :span="24">
        <el-card shadow="always">新增仪器</el-card>
          <div class="addform-container">
            <el-form :model="info" :rules="rulesCompany" ref="info">
              <!-- 新增测试仪器头区块，同一委托单位下可选择批量添加或单个添加 -->
              <div class="add-equip-header">
                <el-form-item prop="company">
                  <el-input class="company-input" placeholder="请输入委托单位名称" v-model="info.company">
                    <template slot="prepend">委托单位：</template>
                  </el-input>
                </el-form-item>                
                <el-button class="submit-btn" type="success" icon="el-icon-check" round
                  @click="submitAddEquipment"
                >提交</el-button>
              </div>
              <el-divider content-position="center">仪器信息</el-divider>
              <!-- 新增仪器主体区块 -->
              <div class="add-equip-body">
                <el-row :gutter="15">
                  <!-- 单个测试仪器信息输入模块 -->
                  <el-col 
                    :span="8"
                    v-for="(equipment, index) in info.equipmentInfo"
                    :key="index">
                    <el-form :model="equipment" :rules="rulesEquipmentInfo" ref="'equipment'+index">
                      <el-card class="box-card box-item">
                        <el-form-item prop="em">
                          <el-input class="device-input" placeholder="请输入仪器厂家" v-model="equipment.em">
                            <template slot="prepend">仪器厂家：</template>
                          </el-input>
                        </el-form-item>
                        <el-form-item prop="deviceName">
                          <el-input class="device-input" placeholder="请输入仪器型号" v-model="equipment.deviceName">
                            <template slot="prepend">仪器名称：</template>
                          </el-input>
                        </el-form-item>
                        <el-form-item prop="deviceType">
                          <el-input class="device-input" placeholder="请输入仪器型号" v-model="equipment.deviceType">
                            <template slot="prepend">仪器型号：</template>
                          </el-input>
                        </el-form-item>
                        <el-form-item prop="deviceID">
                          <el-input class="device-input" placeholder="请输入仪器编号" v-model="equipment.deviceID">
                            <template slot="prepend">仪器编号：</template>
                          </el-input>
                        </el-form-item>
                      </el-card>
                    </el-form>
                  </el-col>
                  <!-- 新增单个测试仪器信息控制按钮模块 -->
                  <el-col :span="8">
                    <el-card class="box-card box-item box-add-btn">
                      <el-button class="btn btn-add" type="success" icon="el-icon-plus" circle
                        @click="addEqInputItem"
                      ></el-button>
                      <el-button class="btn btn-delete" type="danger" icon="el-icon-minus" circle
                        @click="deleteEqInputItem"
                      ></el-button>
                    </el-card>
                  </el-col>
                </el-row>
              </div>
            </el-form>
          </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
let rulesCompany = {
  company: [
    { required: true, message: '请输入委托单位', trigger: ['blur', 'change']}
  ]
};
let rulesEquipmentInfo = {
  em: [
    { required: true, message: '请输入仪器厂家', trigger: ['blur', 'change']}
  ],
  deviceName: [
    { required: true, message: '请输入仪器名称', trigger: ['blur', 'change']}
  ],
  deviceType: [
    { required: true, message: '请输入仪器类型', trigger: ['blur', 'change']}
  ],
  deviceID: [
    { required: true, message: '请输入仪器ID', trigger: ['blur', 'change']}
  ],
};

export default {
  name: 'add-equipment',
  data() {
    return {
      info:{
        company: '',
        equipmentInfo: [
          {em: '', deviceName: '', deviceType: '', deviceID: ''},
        ]
      },
      rulesEquipmentInfo: rulesEquipmentInfo,
      rulesCompany: rulesCompany
    }
  },
  mounted() {
    // 如果是从设备管理页路由到本也，并传递了参数，即设备复制功能
    if ('equipment' in this.$route.query) {
      // 更新 info.equipmentInfo[0]
      this.info.company = this.$route.query.equipment.company;
      for (let key in this.$route.query.equipment) {
        if (this.info.equipmentInfo[0].hasOwnProperty(key)) {
          this.info.equipmentInfo[0][key] = this.$route.query.equipment[key];
        }
      }
    }
  },
  methods: {
    addEqInputItem() {
      this.info.equipmentInfo.push({em: '', deviceName: '', deviceType: '', deviceID: ''})
    },
    deleteEqInputItem() {
      this.info.equipmentInfo.pop({em: '', deviceName: '', deviceType: '', deviceID: ''})
    },
    submitAddEquipment() {
      // 所有单个仪器信息输入区的信息检查，如果检查失败，则不再继续执行后续操作
      // let len = this.info.equipmentInfo.length;
      // for (let i = 0; i < len; i++) {
      //   this.$refs['equipment'+i].validate((valid) => {
      //     if (!valid) {
      //       return;
      //     }
      //   });
      // }
      // 输入的仪器信息检查 : 输入不能为空
      this.$refs['info'].validate((valid) => {
        if (valid) {
          // 输入的仪器不能存在完全相同
          if (!this.validateEquipmentInfo()) {
            this.addMessage('请勿输入两组完全相同的仪器信息！请修改后重新提交！', 'warning');
            return;
          }
          // 打包已输入的仪器信息数组
          let dnow = this.util.nowtime();
          let equipmentInfo = this.info.equipmentInfo.slice().map((item) => {
            item.company = this.info.company
            item.insertDate = dnow
            return item
          })
          //POST至后端新增测试仪器接口
          this.axios.post(this.util.testApi() + '/addEquipment', equipmentInfo)
            .then(res => {
              if (res.data.isSuccessed) {
                this.addMessage('仪器新增成功！', 'success');
              } else {
                this.addMessage('仪器新增失败！', 'warning');
              }
            })
            .catch(err => {
              console.log(err)
            })
        }
      });
    },
    validateEquipmentInfo() {
      // 检查
      let equipmentInfo = this.info.equipmentInfo.map((item,index)=>{
        let equipmentString = '';
        let arr = Object.keys(item);
        for(let i = 0; i < arr.length; i++) {
          equipmentString+= '-'+item[arr[i]];
        }
        return equipmentString.slice(1);
      });
      let checkResult = equipmentInfo.some((item, index, equipmentInfo) => {
        return equipmentInfo.indexOf(item) !== equipmentInfo.lastIndexOf(item);
      });
      return !checkResult;
    },
    addMessage(message, messageType) {
      this.$message({
        message: message,
        type: messageType
      });
    },
  }
};
</script>

<style scoped>
.add-equipment{
  padding: 10px 10px 0 10px;
}

.addform-container{
  margin-top: 10px;
  background-color: rgb(255,255,255);
  min-height: 75vh;
}

.add-equip-header {
  position: relative;
  padding: 15px 0px 0px 86px;
}

.add-equip-header .company-input{
  width: 43%;
}

.add-equip-header .submit-btn{
  position: absolute;
  top: 8px;
  right: 86px;
}

.add-equip-body {
  padding: 0 10px 0px 10px;
}

.box-item{
  position: relative;
  padding-top: 30px;
  height: 360px;
  margin-bottom: 15px;
}

.device-input {
  margin-bottom: 15px;
}

.box-add-btn .btn{
  position: absolute;
  width: 80px;
  height: 80px;
  font-size: 42px;
}

.box-add-btn .btn.btn-add {
  top: 50%;
  left: 50%;
  transform: translate(-125%, -50%);
}

.box-add-btn .btn.btn-delete{
  top: 50%;
  left: 50%;
  transform: translate(25%, -50%);
}
</style>