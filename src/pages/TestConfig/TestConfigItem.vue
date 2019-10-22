<template>
<el-card class="testEq-item" shadow="always">
  <h4>{{device.company}}  --  {{device.em}}  --  {{device.deviceName}}  --  {{device.deviceType}}  --  {{device.id}}</h4>
  <div class="testEq-item-conf">
    <el-row :gutter="20">
      <el-col :span="5">
        <el-input class="testEq-item-conf-input" placeholder="输入温度示值" v-model="config.temp">
          <template slot="prepend">温度示值：</template>
        </el-input>
      </el-col>
      <el-col :span="5">
        <el-input class="testEq-item-conf-input" placeholder="输入湿度示值" v-model="config.humi">
          <template slot="prepend">温度示值：</template>
        </el-input>
      </el-col>
      <el-col :span="5">
        <el-input class="testEq-item-conf-input" placeholder="输入中心点ID" v-model="config.centerID">
          <template slot="prepend">中心点ID：</template>
        </el-input>
      </el-col>
      <el-col :span="9">
        <el-input class="testEq-item-conf-input" placeholder="输入传感器ID：1,2" v-model="config.IDS">
          <template slot="prepend">传感器ID：</template>
        </el-input>
      </el-col>
    </el-row>
  </div>
</el-card>
</template>

<script>
export default {
  name: 'testConfigItem',
  props: ['device', 'config']
}
</script>

<style scoped>
.testEq-item{
  margin-bottom: 10px;
}

.testEq-item h4{
  color: #707377;
}

.testEq-item-conf{
  margin-top: 25px;
}
</style>