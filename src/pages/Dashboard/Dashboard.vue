<template>
<div class="dashboard">
  <el-button class="saveData" type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button>
  <el-card class="dash-test-item" shadow="always">
    <h4>委托单位  --  设备厂家  --  设备名称  --  设备型号  --  设备编号</h4>
    <el-row :gutter="12">
      <el-col :span="18">
        <el-row :gutter="8">
          <el-col :span="12">
            <el-card class="test-item-chart" shadow="always">
              <v-chart style="width:90%;height:460px;" :options="temps"/>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card class="test-item-chart" shadow="always">
              <v-chart style="width:90%;height:460px;" :options="humis"/>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="6">
        <el-card class="test-item-data" shadow="always">
          <h4>数据更新时间：2019-10-11 22:00:00</h4>
          <div class="test-item-testdata">
            <el-table
              :data="testData"
              style="width: 100%"
              stripe="true"
              >
              <el-table-column
                prop="name"
                label="计算值/ID"
                min-width="100"
                >
              </el-table-column>
              <el-table-column
                prop="tempData"
                label="温度"
                min-width="100"
                >
              </el-table-column>
              <el-table-column
                prop="humiData"
                label="湿度"
                min-width="100"
                >
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-card>
    <el-card class="dash-test-item" shadow="always">
    <h4>委托单位  --  设备厂家  --  设备名称  --  设备型号  --  设备编号</h4>
    <el-row :gutter="12">
      <el-col :span="18">
        <el-row :gutter="8">
          <el-col :span="12">
            <el-card class="test-item-chart" shadow="always">
              <v-chart style="width:90%;height:460px;" :options="temps"/>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card class="test-item-chart" shadow="always">
              <v-chart style="width:90%;height:460px;" :options="humis"/>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="6">
        <el-card class="test-item-data" shadow="always">
          <h4>数据更新时间：2019-10-11 22:00:00</h4>
          <div class="test-item-testdata">
            <el-table
              :data="testData"
              style="width: 100%"
              stripe="true"
              >
              <el-table-column
                prop="name"
                label="计算值/ID"
                min-width="100"
                >
              </el-table-column>
              <el-table-column
                prop="tempData"
                label="温度"
                min-width="100"
                >
              </el-table-column>
              <el-table-column
                prop="humiData"
                label="湿度"
                min-width="100"
                >
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-card>
</div>
</template>

<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/polar'

export default {
  components: {
    'v-chart': ECharts
  },
  data () {
    let data = []

    for (let i = 0; i <= 360; i++) {
        let t = i / 180 * Math.PI
        let r = Math.sin(2 * t) * Math.cos(2 * t)
        data.push([r, i])
    }

    return {
      testData: [
        {name:"1", tempData: 22.22, humiData: 33.33},
        {name:"2", tempData: 22.22, humiData: 33.33},
        {name:"3", tempData: 22.22, humiData: 33.33},
        {name:"4", tempData: 22.22, humiData: 33.33},
        {name:"5", tempData: 22.22, humiData: 33.33},
        {name:"均匀度：", tempData: 22.22, humiData: 33.33},
        {name:"波动度：", tempData: 22.22, humiData: 33.33},
        {name:"偏差：", tempData: 22.22, humiData: 33.33}
      ],
      temps: {
        title: {
          text: '折线图堆叠'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一','周二','周三','周四','周五','周六','周日']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name:'邮件营销',
            type:'line',
            stack: '总量',
            data:[120, 132, 101, 134, 90, 230, 210]
          },
          {
            name:'联盟广告',
            type:'line',
            stack: '总量',
            data:[220, 182, 191, 234, 290, 330, 310]
          },
          {
            name:'视频广告',
            type:'line',
            stack: '总量',
            data:[150, 232, 201, 154, 190, 330, 410]
          },
          {
            name:'直接访问',
            type:'line',
            stack: '总量',
            data:[320, 332, 301, 334, 390, 330, 320]
          },
          {
            name:'搜索引擎',
            type:'line',
            stack: '总量',
            data:[820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      },
      humis: {
        title: {
          text: '折线图堆叠'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一','周二','周三','周四','周五','周六','周日']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name:'邮件营销',
            type:'line',
            stack: '总量',
            data:[120, 132, 101, 134, 90, 230, 210]
          },
          {
            name:'联盟广告',
            type:'line',
            stack: '总量',
            data:[220, 182, 191, 234, 290, 330, 310]
          },
          {
            name:'视频广告',
            type:'line',
            stack: '总量',
            data:[150, 232, 201, 154, 190, 330, 410]
          },
          {
            name:'直接访问',
            type:'line',
            stack: '总量',
            data:[320, 332, 301, 334, 390, 330, 320]
          },
          {
            name:'搜索引擎',
            type:'line',
            stack: '总量',
            data:[820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard{
  padding:10px 10px 0px 10px;
}

.dash-test-item{
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 5px;
  padding-right: 5px;
}

.dash-test-item .el-card__body > h4{
  text-align: center;
  padding-bottom: 10px;
  padding-top: 10px;
  color: #707377;
}

.test-item-data .el-card__body > h4{
  text-align: left;
  padding-left: 10px;
  font-size: 14px;
}

.dash-test-item .test-item-chart{
  height: 480px;
}

.dash-test-item .test-item-data{
  height: 480px;
  overflow: auto;
}

.dash-test-item .test-item-col{
  text-align: center;
}

.saveData {
  position: fixed;
  top: 12px;
  right: 40px;
  z-index: 1005;
}
</style>