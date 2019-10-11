<template>
  <div class="test-config">
    <el-row style="margin-bottom:10px;">
      <el-col class="header" :span="24">
        <el-card shadow="always">
          <div class="header-input-container">
            <span>测试管理页</span>
            <el-input class="cycle-input" placeholder="请输入工作周期s" v-model="company">
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

    <div class="testEq-container">
      <el-card class="testEq-item" shadow="always">
        <h4>委托单位  --  设备厂家  --  设备名称  --  设备型号  --  设备编号</h4>
        <div class="testEq-item-conf">
          <el-row :gutter="20">
            <el-col :span="5">
              <el-input class="testEq-item-conf-input" placeholder="输入温度示值" v-model="company">
                <template slot="prepend">温度示值：</template>
              </el-input>
            </el-col>
            <el-col :span="5">
              <el-input class="testEq-item-conf-input" placeholder="输入湿度示值" v-model="company">
                <template slot="prepend">温度示值：</template>
              </el-input>
            </el-col>
            <el-col :span="5">
              <el-input class="testEq-item-conf-input" placeholder="输入中心点ID" v-model="company">
                <template slot="prepend">中心点ID：</template>
              </el-input>
            </el-col>
            <el-col :span="9">
              <el-input class="testEq-item-conf-input" placeholder="输入传感器ID：1,2" v-model="company">
                <template slot="prepend">传感器ID：</template>
              </el-input>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <el-card class="testEq-item" shadow="always">
        <h4>委托单位  --  设备厂家  --  设备名称  --  设备型号  --  设备编号</h4>
        <div class="testEq-item-conf">
          <el-row :gutter="20">
            <el-col :span="5">
              <el-input class="testEq-item-conf-input" placeholder="输入温度示值" v-model="company">
                <template slot="prepend">温度示值：</template>
              </el-input>
            </el-col>
            <el-col :span="5">
              <el-input class="testEq-item-conf-input" placeholder="输入湿度示值" v-model="company">
                <template slot="prepend">温度示值：</template>
              </el-input>
            </el-col>
            <el-col :span="5">
              <el-input class="testEq-item-conf-input" placeholder="输入中心点ID" v-model="company">
                <template slot="prepend">中心点ID：</template>
              </el-input>
            </el-col>
            <el-col :span="9">
              <el-input class="testEq-item-conf-input" placeholder="输入传感器ID：1,2" v-model="company">
                <template slot="prepend">传感器ID：</template>
              </el-input>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <el-card class="testEq-item" shadow="always">
        <h4>委托单位  --  设备厂家  --  设备名称  --  设备型号  --  设备编号</h4>
        <div class="testEq-item-conf">
          <el-row :gutter="20">
            <el-col :span="5">
              <el-input class="testEq-item-conf-input" placeholder="输入温度示值" v-model="company">
                <template slot="prepend">温度示值：</template>
              </el-input>
            </el-col>
            <el-col :span="5">
              <el-input class="testEq-item-conf-input" placeholder="输入湿度示值" v-model="company">
                <template slot="prepend">温度示值：</template>
              </el-input>
            </el-col>
            <el-col :span="5">
              <el-input class="testEq-item-conf-input" placeholder="输入中心点ID" v-model="company">
                <template slot="prepend">中心点ID：</template>
              </el-input>
            </el-col>
            <el-col :span="9">
              <el-input class="testEq-item-conf-input" placeholder="输入传感器ID：1,2" v-model="company">
                <template slot="prepend">传感器ID：</template>
              </el-input>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'test-config',
  data() {
    return {
    };
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