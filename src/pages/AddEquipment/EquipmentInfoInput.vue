<template>
<el-col :span="8">
  <el-card class="box-card box-item">
      <el-form :model="info" :rules="rulesInfo" ref="info" >
        <el-form-item prop="em">
          <el-input class="device-input" placeholder="请输入设备厂家" v-model="info.em">
            <template slot="prepend">设备厂家：</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="deviceName">
          <el-input class="device-input" placeholder="请输入设备型号" v-model="info.deviceName">
            <template slot="prepend">设备名称：</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="deviceType">
          <el-input class="device-input" placeholder="请输入设备型号" v-model="info.deviceType">
            <template slot="prepend">设备型号：</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="deviceID">
          <el-input class="device-input" placeholder="请输入设备编号" v-model="info.deviceID">
            <template slot="prepend">设备编号：</template>
          </el-input>
        </el-form-item>
      </el-form>
  </el-card>
</el-col>
</template>

<script>

export default {
  name: 'EquipmentInfoInput',
  props: ['info', 'rulesInfo'],
  data() {
    return {
      
    }
  }
}
</script>

<style scoped>

.box-item{
  position: relative;
  padding-top: 15px;
  height: 360px;
  margin-bottom: 15px;
}

.device-input {
  margin-bottom: 15px;
}

.box-add-btn .btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  font-size: 42px;
}
</style>