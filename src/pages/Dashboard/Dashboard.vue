<template>
<div class="dashboard">
  <el-button
    @click="saveData" 
    class="saveData" type="primary">下载数据<i class="el-icon-download el-icon--right"></i>
  </el-button>
  
  <div v-for="(item,index) in deviceDatas" :key="index">
    <test-item 
      :test-data="item.testData"
      :temps="item.temps"
      :humis="item.humis"
    />
  </div>

</div>
</template>

<script>
import TestItem from './TestItem'

export default {
  components: {
    'test-item': TestItem
  },
  data () {
    return {
      deviceDatas: [
        // {
        //   testData: [
        //     {name:"1"+'-电量100%', tempData: 22.22, humiData: 33.33},
        //     {name:"2", tempData: 22.22, humiData: 33.33},
        //     {name:"3", tempData: 22.22, humiData: 33.33},
        //     {name:"4", tempData: 22.22, humiData: 33.33},
        //     {name:"15"+'-电量100%', tempData: 22.22, humiData: 33.33},
        //     {name:"均匀度：", tempData: 22.22, humiData: 33.33},
        //     {name:"波动度：", tempData: 22.22, humiData: 33.33},
        //     {name:"偏差：", tempData: 22.22, humiData: 33.33}
        //   ],
        //   temps: {
        //     title: {
        //       text: '温度',
        //       textStyle: {
        //         fontSize: 16
        //       }
        //     },
        //     tooltip: {
        //       trigger: 'axis'
        //     },
        //     legend: {
        //       left: 35,
        //       textStyle: {
        //         fontSize: 14,
        //       },
        //       data:['ID1','ID2','ID3','ID4','ID5','ID6','ID7','ID8','ID9','ID10']
        //     },
        //     grid: {
        //       left: '3%',
        //       right: '4%',
        //       bottom: '3%',
        //       containLabel: true
        //     },
        //     toolbox: {
        //       // feature: {
        //       //   saveAsImage: {}
        //       // }
        //     },
        //     xAxis: {
        //       type: 'category',
        //       boundaryGap: false,
        //       data: ['10:01','10:02','10:03','10:04','10:05','10:06','10:07']
        //     },
        //     yAxis: {
        //       type: 'value'
        //     },
        //     series: [
        //       {
        //         name:'ID1',
        //         type:'line',
        //         stack: '总量',
        //         data:[120, 132, 101, 134, 90, 230, 210]
        //       },
        //       {
        //         name:'ID2',
        //         type:'line',
        //         stack: '总量',
        //         data:[220, 182, 191, 234, 290, 330, 310]
        //       },
        //       {
        //         name:'ID3',
        //         type:'line',
        //         stack: '总量',
        //         data:[150, 232, 201, 154, 190, 330, 410]
        //       },
        //       {
        //         name:'ID4',
        //         type:'line',
        //         stack: '总量',
        //         data:[320, 332, 301, 334, 390, 330, 320]
        //       },
        //       {
        //         name:'ID5',
        //         type:'line',
        //         stack: '总量',
        //         data:[820, 932, 901, 934, 1290, 1330, 1320]
        //       },
        //       {
        //         name:'ID6',
        //         type:'line',
        //         stack: '总量',
        //         data:[125, 137, 106, 139, 95, 235, 215]
        //       },
        //       {
        //         name:'ID7',
        //         type:'line',
        //         stack: '总量',
        //         data:[224, 185, 195, 235, 295, 335, 315]
        //       },
        //       {
        //         name:'ID8',
        //         type:'line',
        //         stack: '总量',
        //         data:[155, 235, 205, 155, 195, 335, 415]
        //       },
        //       {
        //         name:'ID9',
        //         type:'line',
        //         stack: '总量',
        //         data:[325, 335, 305, 335, 395, 335, 325]
        //       },
        //       {
        //         name:'ID10',
        //         type:'line',
        //         stack: '总量',
        //         data:[825, 935, 905, 935, 1295, 1335, 1325]
        //       }
        //     ]
        //   },
        //   humis: {
        //     title: {
        //       text: '湿度',
        //       textStyle: {
        //         fontSize: 16
        //       }
        //     },
        //     tooltip: {
        //       trigger: 'axis'
        //     },
        //     legend: {
        //       left: 35,
        //       textStyle: {
        //         fontSize: 14,
        //       },
        //       data:['ID1','ID2','ID3','ID4','ID5']
        //     },
        //     grid: {
        //       left: '3%',
        //       right: '4%',
        //       bottom: '3%',
        //       containLabel: true
        //     },
        //     toolbox: {
        //       // feature: {
        //       //   saveAsImage: {}
        //       // }
        //     },
        //     xAxis: {
        //       type: 'category',
        //       boundaryGap: false,
        //       data: ['10:01','10:02','10:03','10:04','10:05','10:06','10:07']
        //     },
        //     yAxis: {
        //       type: 'value'
        //     },
        //     series: [
        //       {
        //         name:'ID1',
        //         type:'line',
        //         stack: '总量',
        //         data:[120, 132, 101, 134, 90, 230, 210]
        //       },
        //       {
        //         name:'ID2',
        //         type:'line',
        //         stack: '总量',
        //         data:[220, 182, 191, 234, 290, 330, 310]
        //       },
        //       {
        //         name:'ID3',
        //         type:'line',
        //         stack: '总量',
        //         data:[150, 232, 201, 154, 190, 330, 410]
        //       },
        //       {
        //         name:'ID4',
        //         type:'line',
        //         stack: '总量',
        //         data:[320, 332, 301, 334, 390, 330, 320]
        //       },
        //       {
        //         name:'ID5',
        //         type:'line',
        //         stack: '总量',
        //         data:[820, 932, 901, 934, 1290, 1330, 1320]
        //       }
        //     ]
        //   }
        // }
      ]
    }
  },
  sockets: {
    testData: function(pack) {
      console.log(pack)
    }
  },
  methods: {
    saveData() {
      // 保存测试数据的 excel 表格，及数据曲线截图
      alert('数据下载成功！')
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