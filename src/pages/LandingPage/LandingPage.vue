<template>
  <div class="landing-page">
    <el-row style="margin-bottom:10px;">
      <el-col :span="24">
        <el-card shadow="always" style="position:relative;">
          <span>仪器管理页</span>
          <div class="landing-btns">
            <!-- 搜索委托单位（测试仪器）搜索框 -->
            <el-autocomplete
              v-model="state"
              :fetch-suggestions="querySearchAsync"
              @select="handleSelect"
              class="searchEquipment"
              :class="{searchEquipmentActive: isActiveSearch}"
              placeholder="请输入委托单位"
            ></el-autocomplete>
            <!-- 已选择测试仪器显示 badge -->
            <el-badge class="selectEqBtn" :value="selectedEquipmentCount">
              <el-button @click="drawerSelectEq = true" size="small">已选择仪器</el-button>
            </el-badge>
            <!-- 新增测试仪器按钮 -->
            <router-link to="/addEquipment">
              <el-button @click="addEquipmentClick" class="add-equipment-btn" icon="el-icon-plus" type="text"></el-button>
            </router-link>
          </div>
        </el-card>
        <!-- 已添加测试仪器信息展示表格，表格分页，表格可根据委托单位进行自定义检索表内已有信息 -->
        <el-table
          border resizable
          ref="filterTable"
          :data="equipments"
          style="width: 100%; margin-top: 10px;">
          <el-table-column
            prop="company"
            label="委托单位"
            min-width="160"
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
            min-width="90">
          </el-table-column>
          <el-table-column
            prop="deviceID"
            label="仪器编号"
            min-width="90">
          </el-table-column>
          <el-table-column
            prop="em"
            label="仪器厂家"
            min-width="160">
          </el-table-column>
          <el-table-column
            prop="insertDate"
            label="日期"
            sortable
            min-width="130"
            column-key="date"
          >
          </el-table-column>
          <el-table-column label="操作"
            min-width="200"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleAddToTest(scope.$index, scope.row)"
                :disabled="controlEnabled">选择</el-button>
              <el-button
                size="mini"
                @click="handleDuplicate(scope.$index, scope.row)"
                :disabled="controlEnabled">复制</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                :disabled="controlEnabled">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!-- 已选择测试仪器展示区域 -->
    <el-drawer
        class="selectEq-container"
        :visible.sync="drawerSelectEq"
        :direction="directionSelectEq"
        :modal="false"
        :show-close="false"
        size="60%"
      >
      <div class="selectEq-title">
        <el-divider content-position="center">已选择仪器仪器</el-divider>
      </div>
      <div class="selectEp-body">
        <el-table
          border resizable
          :data="this.$store.state.selectedEquipments"
          style="width: 100%; margin-top: 0px;">
          <el-table-column
            prop="company"
            label="委托单位"
            min-width="160"
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
            min-width="90">
          </el-table-column>
          <el-table-column
            prop="deviceID"
            label="仪器编号"
            min-width="90">
          </el-table-column>
          <el-table-column
            prop="em"
            label="仪器厂家"
            min-width="160">
          </el-table-column>
          <el-table-column
            prop="insertDate"
            label="日期"
            min-width="130"
          >
          </el-table-column>
          <el-table-column label="操作"
            min-width="200"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="deleteSelectedEquipment(scope.$index, scope.row)"
                :disabled="controlEnabled">删除</el-button>
            </template>
          </el-table-column>
        </el-table>   
      </div>
      <div class="selectEp-footer">
        <el-button class="selectEp-footer-btn left" type="info" round
          @click="clearSelected"
          :disabled="controlEnabled">清空选择</el-button>
        <el-button class="selectEp-footer-btn right" type="success" round
          @click="startTest"
          :disabled="controlEnabled">进入测试</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: 'landing-page',
  data() {
    return {
      // 控制已选中测试仪器的下拉抽屉的显示
      drawerSelectEq: false,
      directionSelectEq: 'ttb',
      // 测试仪器检索搜索框相关
      searchText: '',
      isActiveSearch: false,
      state: '',
      companys: [], // 所有委托单位
      // 后端获取的测试仪器数据， 用于用户操作， 选择、复制、删除
      equipments: [],
      // 存储用户已选择的测试仪器， 用于测试准备的确认， 及作为测试仪器配置前的， 最终本次测试使用的测试仪器的数据源
      equipmentsSelected: [],
    };
  },
  beforeMount() {
    setTimeout(this.initSelectedEquipments, 1000);
  },
  mounted() {
    this.getLatestFiveEq();
    this.getLastestFiveCompanys();
  },
  computed: {
    selectedEquipmentCount () {
      let length = 0;
      if (this.$store.state.isOnTest) {
        length = this.$store.state.equipments.length;
      } else {
        length = this.$store.state.selectedEquipments.length;
      }
      return length;
    },
    controlEnabled () {
      // 返回当前系统是否在测试状态的真值， 控制控件的可用状态
      return this.$store.state.isOnTest;
    },
  },
  methods: {
    getLastestFiveCompanys() {
      // 获取所有测试仪器信息
      this.axios.get(this.util.testApi() + '/getLastestFiveCompanys')
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
    getAllCompanys(companyKeyWords) {
      if (companyKeyWords === '') {
        return
      }
      // 获取所有名称包含指定关键字的委托单位
      this.axios.post(this.util.testApi() + '/getAllCompanys', {company: companyKeyWords})
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
      // 获取最近添加的五条测试仪器信息
      this.axios.get(this.util.testApi() + '/lastestFiveTestEq')
        .then(res => {
          this.equipments = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    addEquipmentClick() {
      // 新增测试仪器按钮，导航到新增测试仪器页
    },
    handleDelete(index, row) {
      // 删除测试仪器
      this.$confirm(`<strong>此操作将永久删除该测试仪器,是否继续?</strong>`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          dangerouslyUseHTMLString: true
        }).then(() => {
          // 向删除设备接口发起请求
          this.axios.post(this.util.testApi() + '/deleteEquipment', row)
            .then(res => {
              let result = res.data;
              let type = result.isSuccess ? 'success' : 'warning';
              let messgae = result.message;
              this.addMessage(messgae, type);
              // 从 data.equipments 中删除对应的仪器
              this.equipments.splice(index, 1);
            })
            .catch(err => {
              this.addMessage('异常错误，请刷新后检查是否成功删除!', 'warning');
            });
        }).catch(() => {
          this.addMessage('已取消删除');
        });
    },
    handleDuplicate(index, row) {
      // 以选择仪器信息为模板，新增仪器
      let equipmentString = `${row.company}-${row.em}-${row.deviceName}-${row.deviceType}-${row.deviceID}`;
      this.addMessage('使用 "'+equipmentString+'" 为模板，新增设备！请修改当前信息后，提交！');
      this.$router.push({ path: '/addEquipment', query: { equipment: row }});
    },
    handleSearchTextChange(value) {
      // 暂未使用
      console.log(value);
    },
    handleSelect(item) {
      // 查询此委托单位下的所有测试仪器，并展示给用户
      console.log(item)
    },
    querySearchAsync(queryString, callback) {
      // 先更新所有匹配关键字的委托单位信息
      this.getAllCompanys(this.searchText)
      
      // 前端执行检索匹配
      var companys = this.companys;
      var results = queryString ? companys.filter(this.createStateFilter(queryString)) : companys;
      
      callback(results)
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.indexOf(queryString) === 0);
      };
    },
    clearSelected() {
      // 检查已选择测试设备是否为0
      if (this.$store.state.selectedEquipments.length === 0) {
        return;
      }
      // 清空已选择测试仪器
      this.$confirm(`<strong>是否清空已选择仪器?</strong>`, '提示', {
        confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          dangerouslyUseHTMLString: true
        }).then(() => {
          this.$store.commit('clearAllSelectedEquipments');
          this.addMessage('已成功清空已选择仪器!', 'success');
        }).catch(() => {
          this.addMessage('已取消操作！');
        });
    },
    handleAddToTest(index, row) {
      // 添加到选中测试仪器
      this.$store.commit('addToSelectedEquipments', row);
    },
    deleteSelectedEquipment(index, row) {
      // 从当前选择测试仪器中删除某个仪器
      this.$store.commit('dropFromSelectedEquipments', row);
    },
    startTest() {
      let equipmentsSelected = this.$store.state.selectedEquipments;
      // 检查已选择测试设备是否为0
      if (equipmentsSelected.length === 0) {
        this.addMessage('当前未选择测试仪器，请选择测试仪器后再尝试进入测试！', 'warning');
        return;
      }
      // 路由到测试管理页，将已选择设备信息转移到设备管理页
      this.addMessage('进入测试管理页，请配置测试信息，开始测试！');
      this.$store.commit('switchIsTestPreparing', true);
      this.$router.push({ path: '/testConfig'});
    },
    initSelectedEquipments () {
      if (this.$store.state.isOnTest) {
        let equipments = [];
        this.$store.state.equipments.forEach((ele, index, arr) => {
          equipments.push(ele.device);
        });
        equipments = JSON.parse(JSON.stringify(equipments));
        console.log(equipments);
        this.$store.commit('setSelectedEquipments', equipments);
      }
    },
    addMessage(message, messageType) {
      this.$message({
        message: message,
        type: messageType ? messageType : 'info',
      });
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