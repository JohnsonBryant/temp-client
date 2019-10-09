<template>
  <div class="add-equipment">
    <el-row style="margin-bottom:10px;">
      <el-col :span="24">
        <el-card shadow="always">新增设备</el-card>
        
        <div class="addform-container">
          
          <div class="header">
            <el-input class="company-input" placeholder="请输入委托单位名称" v-model="company">
              <template slot="prepend">委托单位：</template>
            </el-input>
            <el-button class="submit-btn" type="success" icon="el-icon-check" round>提交</el-button>
          </div>
          <el-divider content-position="center">设备信息</el-divider>
          <div class="body">
            <el-row :gutter="15">
              <el-col :span="8">
                <el-card class="box-card box-item">
                  <el-input class="device-input" placeholder="请输入设备厂家" v-model="company">
                    <template slot="prepend">设备厂家：</template>
                  </el-input>
                  <el-input class="device-input" placeholder="请输入设备型号" v-model="company">
                    <template slot="prepend">设备型号：</template>
                  </el-input>
                  <el-input class="device-input" placeholder="请输入设备编号" v-model="company">
                    <template slot="prepend">设备编号：</template>
                  </el-input>
                  <el-input class="device-input" placeholder="请输入工作周期" v-model="company">
                    <template slot="prepend">工作周期：</template>
                  </el-input>
                  <el-input class="device-input" placeholder="请输入温度示值" v-model="company">
                    <template slot="prepend">温度示值：</template>
                  </el-input>
                  <el-input class="device-input" placeholder="请输入湿度示值" v-model="company">
                    <template slot="prepend">湿度示值：</template>
                  </el-input>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card class="box-card  box-item box-add-btn">
                  <el-button class="btn" type="success" icon="el-icon-plus" circle></el-button>
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
export default {
  name: 'add-equipment',
  data() {
    return {
      
    };
  },
};
</script>

<style lang="scss" scoped>
.add-equipment{
  padding: 10px 10px 0 10px;
}

.addform-container{
  margin-top: 10px;
  background-color: rgb(255,255,255);
  height: 75vh;
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
  height: 360px;
  position: relative;
}

.device-input {
  margin-bottom: 14px;
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