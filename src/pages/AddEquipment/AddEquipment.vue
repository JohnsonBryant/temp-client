<template>
  <div class="add-equipment">
    <el-row style="margin-bottom:10px;">
      <el-col :span="24">
        <el-card shadow="always">新增设备</el-card>
          <div class="addform-container">
            <!-- 新增测试设备头区块，同一委托单位下可选择批量添加或单个添加 -->
            <div class="header">
                <el-input class="company-input" placeholder="请输入委托单位名称" v-model="company">
                  <template slot="prepend">委托单位：</template>
                </el-input>
              <el-button class="submit-btn" type="success" icon="el-icon-check" round
                @click="submitAddEquipment"
              >提交</el-button>
            </div>
            <el-divider content-position="center">设备信息</el-divider>
            <!-- 新增设备主体区块 -->
            <div class="body">
              <el-row :gutter="15">
                <!-- 单个测试设备信息输入模块 -->
                <equipment-info-input 
                  v-for="(info,index) in equipmentInfo" :key="index"
                  :info="info"
                  :rulesInfo="rulesInfo"
                />
                <!-- 新增单个测试设备信息输入模块 -->
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
          </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import EquipmentInfoInput from './EquipmentInfoInput';

let rulesInfo = {
  em: [
    { required: true, message: '请输入设备厂家', trigger: ['blur', 'change']}
  ],
  deviceName: [
    { required: true, message: '请输入设备名称', trigger: ['blur', 'change']}
  ],
  deviceType: [
    { required: true, message: '请输入设备类型', trigger: ['blur', 'change']}
  ],
  deviceID: [
    { required: true, message: '请输入设备ID', trigger: ['blur', 'change']}
  ],
};

export default {
  name: 'add-equipment',
  components: {
    'equipment-info-input': EquipmentInfoInput,
  },
  data() {
    return {
      company: '',
      equipmentInfo: [
        {em: '', deviceName: '', deviceType: '', deviceID: ''},
      ],
      rulesInfo: rulesInfo
    }
  },
  methods: {
    addEqInputItem() {
      this.equipmentInfo.push({em: '', deviceName: '', deviceType: '', deviceID: ''})
    },
    deleteEqInputItem() {
      this.equipmentInfo.pop({em: '', deviceName: '', deviceType: '', deviceID: ''})
    },
    submitAddEquipment() {
      // 输入的设备信息检查 : 输入不能为空
      this.$refs['info'].validate((valid) => {
        if (valid) {
          // 输入的设备不能存在完全相同
          
          let dnow = this.util.nowtime()
          // 打包已输入的设备信息数组
          let equipmentInfo = this.equipmentInfo.slice().map((item) => {
            item.company = this.company
            item.insertDate = dnow
            return item
          })
          console.log(equipmentInfo)
          //POST至后端新增测试设备接口
          this.axios.post(this.util.testApi() + '/addEquipment', equipmentInfo)
            .then(res => {
              if (res.data.isSuccessed) {
                this.addMessage('设备新增成功！', 'success');
              } else {
                this.addMessage('设备新增失败！', 'warning');
              }
            })
            .catch(err => {
              console.log(err)
            })
        }
      });
    },
    validateEquipmentInfo() {
      let ret = true
      // 检查
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

.header {
  position: relative;
  padding: 8px 5px 0px 86px;
}

.header .company-input{
  width: 43%;
}

.header .submit-btn{
  position: absolute;
  top: 8px;
  right: 86px;
}

.body {
  padding: 0 10px 10px;
}

.box-item{
  position: relative;
  padding-top: 30px;
  height: 360px;
  margin-bottom: 15px;
}

.device-input {
  margin-bottom: 30px;
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