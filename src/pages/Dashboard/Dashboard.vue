<template>
<div class="dashboard">
  <el-card shadow="always">
    实时检测
  </el-card>
  <el-card shadow="always" class="wk-container" >
    <div v-if="showMessageState">
      <!-- 未处在测试状态，且不是从设备管理页路由并传递参数到本页时显示 -->
      <h4 style="padding:10px 0 10px 10px; color: crimson;;">当前系统未处在测试状态，如需要进行测试，请切换到设备管理页，选择测试设备，启动测试！</h4>
    </div>
    <div v-for="(item,index) in DeviceTestDatas" :key="index">
      <test-item 
        :equipment="item.equipment"
        :updateTime="item.updateTime"
        :test-data="item.testData"
        :temps="item.temps"
        :humis="item.humis"
      />
    </div>
  </el-card>
</div>
</template>

<script>
import TestItem from './TestItem'

const template = {
  title: {
    text: '', // 根据数据生成 ， 曲线数据类型 温度、湿度
    textStyle: {
      fontSize: 16,
    }
  },
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    left: 35,
    textStyle: {
      fontSize: 14,
    },
    data:[], // 根据数据生成， 对应曲线图标题数组
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: [],  // 根据数据生成， 数据时间数组， 对应曲线图的 X 轴
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name:'ID1', // 根据数据生成， 传感器ID
      type:'line',
      data:[], // 传感器数据
    },
  ]
};

export default {
  components: {
    'test-item': TestItem
  },
  data () {
    return {
    }
  },
  computed: {
    DeviceTestDatas() {
      const equipments = this.$store.state.equipments;
      let deviceTestDatas = [];
        equipments.forEach((ele, index, equipments) => {
          let deviceTestData = {};
          
          deviceTestData.equipment = ele.device;
          deviceTestData.testData = [];
          ele.data['IDS'].forEach((id) => {
            let sensor = ele.data[id];
            let len = sensor['temp'].length;
            let temp = len === 0 ? '' : sensor['temp'][len-1];
            let humi = len === 0 ? '' : sensor['humi'][len-1];
            let batt = len === 0 ? '' : sensor['batt'][len-1];
            let sensorData = {
              name: `${id}-电量${batt}%`,
              tempData: temp,
              humiData: humi,
            };
            deviceTestData.testData.push(sensorData);
          });
          let dataLen = ele.data['evennessTemp'].length;
          let evennessTemp = dataLen === 0 ? '' : ele.data['evennessTemp'][dataLen-1];
          let evennessHumi = dataLen === 0 ? '' : ele.data['evennessHumi'][dataLen-1];
          let fluctuationTemp = dataLen === 0 ? '' : ele.data['fluctuationTemp'][dataLen-1];
          let fluctuationHumi = dataLen === 0 ? '' : ele.data['fluctuationHumi'][dataLen-1];
          let deviationTemp = dataLen === 0 ? '' : ele.data['deviationTemp'][dataLen-1];
          let deviationHumi = dataLen === 0 ? '' : ele.data['deviationHumi'][dataLen-1];
          deviceTestData.testData.push({
            name: '均匀度',
            tempData: evennessTemp,
            humiData: evennessHumi,
          });
          deviceTestData.testData.push({
            name: '波动度',
            tempData: fluctuationTemp,
            humiData: fluctuationHumi,
          });
          deviceTestData.testData.push({
            name: '偏差',
            tempData: deviationTemp,
            humiData: deviationHumi,
          });
          deviceTestData.updateTime = dataLen === 0 ? '' : ele.data['time'][dataLen-1];;
          deviceTestData.temps = this.prepareGraphData('温度', 'temp', ele.data);
          deviceTestData.humis = this.prepareGraphData('湿度', 'humi', ele.data);
          
          deviceTestDatas.push(deviceTestData);
        });
      return deviceTestDatas;
    },
    showMessageState () {
      return (this.$store.state.equipments.length === 0) && !this.$store.state.isOnTest;
    },
  },
  methods: {
    prepareGraphData(title, key, sensorData) {
      let data = JSON.parse(JSON.stringify(template));
      data.title.text = title;
      data.legend.data = sensorData.IDS.map((id) => {
        return `ID${id}`;
      });
      data.xAxis.data = sensorData.time.slice();
      let series = [];
      data.legend.data.forEach((id, index, ids) => {
        let sensorSerie = {
          name: id,
          type: 'line',
          data: sensorData[id.slice(2)][key].slice(),
        };
        series.push(sensorSerie);
      });
      data.series = series;
      return data;
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard{
  padding:10px 10px 0px 10px;
}

.saveData {
  position: fixed;
  top: 12px;
  right: 40px;
  z-index: 1005;
}

.wk-container{
  margin-top: 10px;
  min-height: 75vh;  
}
</style>