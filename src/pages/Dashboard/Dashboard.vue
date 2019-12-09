<template>
<div class="dashboard">
  <el-button
    @click="saveData" 
    class="saveData" type="primary">下载数据<i class="el-icon-download el-icon--right"></i>
  </el-button>
  
  <div v-for="(item,index) in DeviceTestDatas" :key="index">
    <test-item 
      :equipment="item.equipment"
      :updateTime="item.updateTime"
      :test-data="item.testData"
      :temps="item.temps"
      :humis="item.humis"
    />
  </div>

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
      stack: '总量',
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
      // deviceTestData: [
      //   {
      //     equipment: {
      //       company: '南京高华科技股份有限公司',
      //       em: '南京高华',
      //       deviceName: '温湿度检测仪',
      //       deviceType: 'GH-100',
      //       deviceID: '01-001',
      //       id: 1,
      //     },
      //     updateTime: '',
      //     testData: [
      //       {name:'1'+'-电量100%', tempData: 22.22, humiData: 33.33},
      //       {name:'2'+'-电量100%', tempData: 22.22, humiData: 33.33},
      //       {name:'3'+'-电量100%', tempData: 22.22, humiData: 33.33},
      //       {name:'4'+'-电量100%', tempData: 22.22, humiData: 33.33},
      //       {name:'均匀度：', tempData: 22.22, humiData: 33.33},
      //       {name:'波动度：', tempData: 22.22, humiData: 33.33},
      //       {name:'偏差：', tempData: 22.22, humiData: 33.33}
      //     ],
      //     temps: {
      //       title: {
      //         text: '温度',
      //         textStyle: {
      //           fontSize: 16
      //         }
      //       },
      //       tooltip: {
      //         trigger: 'axis'
      //       },
      //       legend: {
      //         left: 35,
      //         textStyle: {
      //           fontSize: 14,
      //         },
      //         data:['ID1','ID2','ID3','ID4','ID5',]
      //       },
      //       grid: {
      //         left: '3%',
      //         right: '4%',
      //         bottom: '3%',
      //         containLabel: true
      //       },
      //       toolbox: {
      //         // feature: {
      //         //   saveAsImage: {}
      //         // }
      //       },
      //       xAxis: {
      //         type: 'category',
      //         boundaryGap: false,
      //         data: ['10:01','10:02','10:03','10:04','10:05','10:06','10:07']
      //       },
      //       yAxis: {
      //         type: 'value'
      //       },
      //       series: [
      //         {
      //           name:'ID1',
      //           type:'line',
      //           stack: '总量',
      //           data:[120, 132, 101, 134, 90, 230, 210]
      //         },
      //         {
      //           name:'ID2',
      //           type:'line',
      //           stack: '总量',
      //           data:[220, 182, 191, 234, 290, 330, 310]
      //         },
      //         {
      //           name:'ID3',
      //           type:'line',
      //           stack: '总量',
      //           data:[150, 232, 201, 154, 190, 330, 410]
      //         },
      //         {
      //           name:'ID4',
      //           type:'line',
      //           stack: '总量',
      //           data:[320, 332, 301, 334, 390, 330, 320]
      //         },
      //         {
      //           name:'ID5',
      //           type:'line',
      //           stack: '总量',
      //           data:[820, 932, 901, 934, 1290, 1330, 1320]
      //         },
      //       ]
      //     },
      //     humis: {
      //       title: {
      //         text: '湿度',
      //         textStyle: {
      //           fontSize: 16
      //         }
      //       },
      //       tooltip: {
      //         trigger: 'axis'
      //       },
      //       legend: {
      //         left: 35,
      //         textStyle: {
      //           fontSize: 14,
      //         },
      //         data:['ID1','ID2','ID3','ID4','ID5']
      //       },
      //       grid: {
      //         left: '3%',
      //         right: '4%',
      //         bottom: '3%',
      //         containLabel: true
      //       },
      //       toolbox: {
      //         // feature: {
      //         //   saveAsImage: {}
      //         // }
      //       },
      //       xAxis: {
      //         type: 'category',
      //         boundaryGap: false,
      //         data: ['10:01','10:02','10:03','10:04','10:05','10:06','10:07']
      //       },
      //       yAxis: {
      //         type: 'value'
      //       },
      //       series: [
      //         {
      //           name:'ID1',
      //           type:'line',
      //           stack: '总量',
      //           data:[120, 132, 101, 134, 90, 230, 210]
      //         },
      //         {
      //           name:'ID2',
      //           type:'line',
      //           stack: '总量',
      //           data:[220, 182, 191, 234, 290, 330, 310]
      //         },
      //         {
      //           name:'ID3',
      //           type:'line',
      //           stack: '总量',
      //           data:[150, 232, 201, 154, 190, 330, 410]
      //         },
      //         {
      //           name:'ID4',
      //           type:'line',
      //           stack: '总量',
      //           data:[320, 332, 301, 334, 390, 330, 320]
      //         },
      //         {
      //           name:'ID5',
      //           type:'line',
      //           stack: '总量',
      //           data:[820, 932, 901, 934, 1290, 1330, 1320]
      //         }
      //       ]
      //     }
      //   }
      // ]
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
            let temp = sensor.length === 0 ? '' : sensor[sensor.length-1].temp;
            let humi = sensor.length === 0 ? '' : sensor[sensor.length-1].humi;
            let batt = sensor.length === 0 ? '' : sensor[sensor.length-1].batt;
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
          deviceTestData.temps = this.prepareGraphData('温度', ele.data);
          deviceTestData.humis = this.prepareGraphData('湿度', ele.data);
          
          deviceTestDatas.push(deviceTestData);
        });
      return deviceTestDatas;
    }
  },
  sockets: {
    testData: function(pack) {
      console.log(pack);
    }
  },
  methods: {
    saveData() {
      // 保存测试数据的 excel 表格，及数据曲线截图
      alert('数据下载成功！');
    },
    prepareGraphData(title, sensorData) {
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
          stack: '总量',
          data: sensorData[id.slice(2)].slice(),
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
</style>