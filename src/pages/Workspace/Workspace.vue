<template>
  <div class="workspace">
    <el-row style="margin-bottom:10px;">
      <el-col :span="24">
        <el-card shadow="always">
          功能配置页
        </el-card>
        <div class="wk-container">
          <el-row gutter="15">
            <el-col span="12">
              <el-card class="wk-item" shadow="always">
                <h4 class="wk-item-title">参数配置</h4>
                <el-divider></el-divider>
                <div class="wk-item-container">
                  <div class="wk-item-pie box1">
                    <el-row gutter="10">
                      <el-col span="10">
                        <el-input placeholder="输入串口号" v-model="portName">
                          <template slot="prepend">串口号：</template>
                        </el-input>
                      </el-col>
                      <el-col span="10">
                        <el-input placeholder="输入波特率" v-model="baudRate">
                          <template slot="prepend">波特率：</template>
                        </el-input>
                      </el-col>
                      <el-col span="4">
                        <el-button type="primary">提交<i class="el-icon-check el-icon--right"></i></el-button>
                      </el-col>
                    </el-row>
                  </div>
                  <div class="wk-item-pie box2">
                    <el-row gutter="10">
                      <el-col span="10">
                        <el-input placeholder="输入最低电压" v-model="portName">
                          <template slot="prepend">最低电压：</template>
                        </el-input>
                      </el-col>
                      <el-col span="10">
                        <el-input placeholder="输入最高电压" v-model="baudRate">
                          <template slot="prepend">最高电压：</template>
                        </el-input>
                      </el-col>
                      <el-col span="4">
                        <el-button type="primary">提交<i class="el-icon-check el-icon--right"></i></el-button>
                      </el-col>                      
                    </el-row>
                  </div>
                  <div class="wk-item-pie box3">
                    <el-row gutter="10">
                      <el-col span="10">
                        <el-input placeholder="输入原始ID" v-model="portName">
                          <template slot="prepend">原始ID：</template>
                        </el-input>
                      </el-col>
                      <el-col span="10">
                        <el-input placeholder="输入新设ID" v-model="baudRate">
                          <template slot="prepend">新设ID：</template>
                        </el-input>
                      </el-col>
                      <el-col span="4">
                        <el-button type="primary">提交<i class="el-icon-check el-icon--right"></i></el-button>
                      </el-col>
                    </el-row>
                    <div class="wk-item-search-sensor">
                      <el-button type="success">搜索传感器<i class="el-icon-check el-icon--right"></i></el-button>
                    </div>                    
                  </div>
                  <div class="wk-item-pie message-box">
                    <p>message 1 message 1 message 1 message 1 message 1 message 1 message 1 message 1 message 1 message 1 message 2</p>
                    <p>message 1</p>
                    <p>message 1</p>
                    <p>message 1</p>
                    <p>message 1</p>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col span="12">
              <el-card class="wk-item" shadow="always">
                <h4 class="wk-item-title">测试模板配置</h4>
                <el-divider></el-divider>
                <el-row gutter="10">
                  <el-col class="wk-template wk-template1" :span="12">
                    <el-input class="cycle-input" placeholder="请输入工作周期s" v-model="company">
                      <template slot="prepend">工作周期：</template>
                    </el-input>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col class="wk-template" :span="12">
                    <el-input class="testEq-item-conf-input" placeholder="输入温度示值" v-model="company">
                      <template slot="prepend">温度示值：</template>
                    </el-input>
                  </el-col>
                  <el-col class="wk-template" :span="12">
                    <el-input class="testEq-item-conf-input" placeholder="输入湿度示值" v-model="company">
                      <template slot="prepend">温度示值：</template>
                    </el-input>
                  </el-col>
                <!-- </el-row>                
                <el-row :gutter="10"> -->
                  <el-col class="wk-template" :span="12">
                    <el-input class="testEq-item-conf-input" placeholder="输入中心点ID" v-model="company">
                      <template slot="prepend">中心点ID：</template>
                    </el-input>
                  </el-col>
                  <el-col class="wk-template" :span="12">
                    <el-input class="testEq-item-conf-input" placeholder="输入传感器ID：1,2" v-model="company">
                      <template slot="prepend">传感器ID：</template>
                    </el-input>
                  </el-col>
                </el-row>                
                <div class="wk-template-btns">
                  <el-button type="primary">保存测试模板<i class="el-icon-check el-icon--right"></i></el-button>
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
export default {
  name: 'workspace',
  data() {
    return {
    };
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

.wk-item-container{
  
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
.wk-item-pie.box2{
  
}
.wk-item-pie.box3{
  
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