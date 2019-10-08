<template>
  <div class="landing-page">
    <el-row style="margin-bottom:10px;">
      <el-col :span="24">
        <el-card shadow="always" style="position:relative;">
          <span>设备管理页</span>

          <el-button icon="el-icon-plus" type="text" style="position:absolute; right:24px;top:2px;font-size:26px;"></el-button>
        </el-card>

        <el-table
          ref="filterTable"
          :data="tableData"
          style="width: 100%; margin-top: 10px;">
          <el-table-column
            prop="company"
            label="委托单位"
            width="180"
            :filters="[{text: '南京高华科技股份有限公司', value: '南京高华科技股份有限公司'}, {text: '南京高华科技股份有限公司科技有限公司', value: '南京高华科技股份有限公司科技有限公司'}]"
            :filter-method="filterHandler"
            >
          </el-table-column>
          <el-table-column
            prop="em"
            label="设备厂家"
            width="180">
          </el-table-column>
          <el-table-column
            prop="deviceType"
            label="设备型号"
            width="150">
          </el-table-column>
          <el-table-column
            prop="id"
            label="设备编号"
            width="150">
          </el-table-column>
          <el-table-column
            prop="cycle"
            label="工作周期"
            width="100"
            :formatter="formatter"
            >
          </el-table-column>
          <el-table-column
            prop="temp"
            label="温度示值"
            width="100"
            :formatter="formatterTemp"            
            >
          </el-table-column>
          <el-table-column
            prop="humi"
            label="湿度示值"
            width="120"
            :formatter="formatterHumi"
            >
          </el-table-column>
          <el-table-column
            prop="date"
            label="日期"
            sortable
            width="150"
            column-key="date"
            :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
            :filter-method="filterHandler"
          >
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'landing-page',
  data() {
    return {
      tableData: [{
          date: '2016-05-02 22:22',
          em: '南京高华',
          deviceType: 'ew01',
          id: '01',
          cycle: 10,
          temp: '22.22',
          humi: '33.33',
          company: '南京高华科技股份有限公司科技有限公司'
        }, {
          date: '2016-05-04 22:22',
          em: '南京高华',
          deviceType: 'ew01',
          id: '01',
          cycle: 10,
          temp: '22.22',
          humi: '33.33',
          company: '南京高华科技股份有限公司'
        }, {
          date: '2016-05-01 22:22',
          em: '南京高华',
          deviceType: 'ew01',
          id: '01',
          cycle: 10,
          temp: '22.22',
          humi: '33.33',
          company: '南京高华科技股份有限公司科技有限公司'
        }, {
          date: '2016-05-03 22:22',
          em: '南京高华',
          deviceType: 'ew01',
          id: '01',
          cycle: 10,
          temp: '22.22',
          humi: '33.33',
          company: '南京高华科技股份有限公司'
        }]
    };
  },
  methods: {
    formatter(row, column) {
      return row.cycle + ' s';
    },
    formatterTemp(row, column) {
      return row.temp + ' ℃';
    },
    formatterHumi(row, column) {
      return row.humi + ' %RH';
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    }
  }
};
</script>

<style lang="scss" scoped>
.landing-page{
  padding: 10px 10px 0 10px;
}
</style>