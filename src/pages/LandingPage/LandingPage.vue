<template>
  <div class="landing-page">
    <el-row style="margin-bottom:10px;">
      <el-col :span="24">
        <el-card shadow="always" style="position:relative;">
          <span>设备管理页</span>
          <div class="landing-btns">
            <!-- 搜索委托单位（测试设备）搜索框 -->
            <el-autocomplete
              v-model="state"
              :fetch-suggestions="querySearchAsync"
              @select="handleSelect"
              class="searchEquipment"
              :class="{searchEquipmentActive: isActiveSearch}"
              placeholder="请输入委托单位"
            ></el-autocomplete>
            <!-- 已选择测试设备显示 badge -->
            <el-badge class="selectEqBtn" :value="5">
              <el-button @click="drawerSelectEq = true" size="small">已选择设备</el-button>
            </el-badge>
            <!-- 新增测试设备按钮 -->
            <router-link to="/addEquipment">
              <el-button @click="addEquipmentClick()" class="add-equipment-btn" icon="el-icon-plus" type="text"></el-button>
            </router-link>
          </div>
        </el-card>

        <el-table
          ref="filterTable"
          :data="testEqData"
          style="width: 100%; margin-top: 10px;">
          <el-table-column
            prop="value"
            label="委托单位"
            min-width="180"
            :filters="[{text: '南京高华科技股份有限公司', value: '南京高华科技股份有限公司'}, {text: '南京高华科技股份有限公司科技有限公司', value: '南京高华科技股份有限公司科技有限公司'}]"
            :filter-method="filterHandler"
            >
          </el-table-column>
          <el-table-column
            prop="deviceName"
            label="仪器名称"
            min-width="150">
          </el-table-column>
          <el-table-column
            prop="deviceType"
            label="仪器型号"
            min-width="130">
          </el-table-column>
          <el-table-column
            prop="id"
            label="仪器编号"
            min-width="100">
          </el-table-column>
          <el-table-column
            prop="em"
            label="仪器厂家"
            min-width="180">
          </el-table-column>
          <el-table-column
            prop="date"
            label="日期"
            sortable
            min-width="130"
            column-key="date"
          >
          </el-table-column>
          <el-table-column label="操作"
            min-width="180"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleAddToTest(scope.$index, scope.row)">添加</el-button>
              <el-button
                size="mini"
                @click="handleDuplicate(scope.$index, scope.row)">复制</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
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
      searchText: '',
      isActiveSearch: false,
      state: '',
      companys: [], // 所有委托单位
      testEqData: []
    };
  },
  mounted() {
    this.getLatestFiveEq()
    this.getAllCompanys()
  },
  methods: {
    getAllCompanys() {
      // 获取最近添加的五条测试设备信息
      this.axios.get(this.util.testApi() + '/getAllCompanys')
        .then(res => {
          res.data.forEach((item) => {
            item.value = item.company
          })
          this.companys = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    getLatestFiveEq() {
      // 获取最近添加的五条测试设备信息
      this.axios.get(this.util.testApi() + '/lastestFiveTestEq')
        .then(res => {
          res.data.forEach((item) => {
            item.value = item.company
          })
          this.testEqData = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    addEquipmentClick() {
      // 新增测试设备按钮，导航到新增测试设备页
    },
    handleDelete(index, row) {
      // 删除测试设备
      console.log(index, row);
      this.$confirm(`<strong>此操作将永久删除该测试设备,是否继续?</strong>`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          dangerouslyUseHTMLString: true
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })          
        })
    },
    handleDuplicate(index, row) {
      // 以选择设备信息为模板，新增设备
      console.log(index, row);
      // 路由到新增设备页，用此行信息填充新增设备页输入框
    },
    handleAddToTest(index, row) {
      // 添加到选中测试设备
      console.log(index, row);
    },
    handleSearchTextChange(value) {
      console.log(value)
    },
    handleSelect(item) {
      // 从后端查询此委托单位下的所有测试设备，并展示给用户
      console.log(item)
    },
    querySearchAsync(queryString, callback) {
      var companys = this.companys;
      var results = queryString ? companys.filter(this.createStateFilter(queryString)) : companys;
      
      callback(results);
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.indexOf(queryString) === 0);
      };
    },
  }
};
</script>

<style lang="scss" scoped>
.landing-page{
  padding: 10px 10px 0 10px;
}

.landing-btns{
  position:absolute;
  right:24px;
  top: 0;
  font-size:26px;  
}

.selectEqBtn ,.add-equipment-btn{
  margin-left: 40px;
  font-size:26px;
}

.searchEquipment{
  display: inline-block;
  width: 450px;
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

</style>