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
            <el-button class="test-header-btn left" type="info" round>停止测试</el-button>
            <el-button class="test-header-btn right" type="success" round>启动测试</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <div class="testEq-container">
    
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
}
</style>