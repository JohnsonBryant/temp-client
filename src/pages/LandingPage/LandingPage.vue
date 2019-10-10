<template>
  <div class="landing-page">
    <el-row style="margin-bottom:10px;">
      <el-col :span="24">
        <el-card shadow="always" style="position:relative;">
          <span>设备管理页</span>

          <el-badge class="selectEqBtn" :value="5">
            <el-button @click="drawerSelectEq = true" size="small">已选择设备</el-button>
          </el-badge>

          <router-link to="/addEquipment">
            <el-button @click="addEquipmentClick()" class="add-equipment-btn" icon="el-icon-plus" type="text"></el-button>
          </router-link>
        </el-card>

        <el-table
          ref="filterTable"
          :data="tableData"
          style="width: 100%; margin-top: 10px;">
          <el-table-column
            prop="company"
            label="委托单位"
            min-width="180"
            :filters="[{text: '南京高华科技股份有限公司', value: '南京高华科技股份有限公司'}, {text: '南京高华科技股份有限公司科技有限公司', value: '南京高华科技股份有限公司科技有限公司'}]"
            :filter-method="filterHandler"
            >
          </el-table-column>
          <el-table-column
            prop="em"
            label="设备厂家"
            min-width="180">
          </el-table-column>
          <el-table-column
            prop="deviceName"
            label="设备名称"
            min-width="150">
          </el-table-column>
          <el-table-column
            prop="deviceType"
            label="设备型号"
            min-width="150">
          </el-table-column>
          <el-table-column
            prop="id"
            label="设备编号"
            min-width="150">
          </el-table-column>
          <el-table-column
            prop="date"
            label="日期"
            sortable
            min-width="150"
            column-key="date"
          >
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-drawer
        class="selectEq-container"
        :visible.sync="drawerSelectEq"
        :direction="directionSelectEq"
        :modal="false"
        :show-close="false"
        size="60%"
      >
      <div class="selectEq-title">
        <el-divider content-position="center">已选择仪器设备</el-divider>
      </div>
      <div class="selectEp-body">

      </div>
      <div class="selectEp-footer">
        <el-button class="selectEp-footer-btn left" type="info" round>清空设备</el-button>
        <el-button class="selectEp-footer-btn right" type="success" round>进入测试</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: 'landing-page',
  data() {
    return {
      drawerSelectEq: false,
      directionSelectEq: 'ttb',
      tableData: [{
          date: '2016-05-02 22:22',
          em: '南京高华',
          deviceName: '温度传感器',
          deviceType: 'ew01',
          id: '01',
          company: '南京高华科技股份有限公司科技有限公司'
        }, {
          date: '2016-05-04 22:22',
          em: '南京高华',
          deviceName: '温度传感器',
          deviceType: 'ew01',
          id: '01',
          company: '南京高华科技股份有限公司'
        }, {
          date: '2016-05-01 22:22',
          em: '南京高华',
          deviceName: '温度传感器',
          deviceType: 'ew01',
          id: '01',
          company: '南京高华科技股份有限公司科技有限公司'
        }, {
          date: '2016-05-03 22:22',
          em: '南京高华',
          deviceName: '温度传感器',
          deviceType: 'ew01',
          id: '01',
          company: '南京高华科技股份有限公司'
        }]
    };
  },
  methods: {
    filterTag(value, row) {
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    addEquipmentClick() {

    }
  }
};
</script>

<style lang="scss" scoped>
.landing-page{
  padding: 10px 10px 0 10px;
}

.selectEqBtn {
  position:absolute;
  right:100px;
  top:10px;
  font-size:26px;
}
.selectEq-container{
}
.selectEq-title{

}
.selectEp-footer{
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  width: 100%;
  text-align: center;
}

.selectEp-footer-btn.left{
  margin-right: 20px;
}
.selectEp-footer-btn.right{
  margin-left: 20px;
}

.add-equipment-btn{
  position:absolute;
  right:24px;
  top:2px;
  font-size:26px;
}
</style>