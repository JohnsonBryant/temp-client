import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isOnTest: false,
    cycle: 10,
    isSendding: true,
    isTestPreparing: false,
    selectedEquipments: [],
    equipments: [],
    deviceTestData: [],
  },
  mutations: {
    // 更改当前系统测试状态标识
    setIsOnTest: (state, testState) => state.isOnTest = testState,
    // 更改当前是否启动进入测试
    switchIsTestPreparing: (state, isPreparing) => state.isTestPreparing = isPreparing,
    // 更改周期
    setCycle: (state, cycle) => state.cycle = cycle,
    // 更改是否发送
    setIsSendding: (state, isSendding) => state.isSendding = isSendding,
    // 新增选择仪器
    addToSelectedEquipments: (state, equipment) => {
      let equipmentsSelected = state.selectedEquipments;
      // 检查当前已选择的仪器中是否存在ID与新选择仪器相同的
      let duplicated = equipmentsSelected.some((ele, index, all) => {
        return ele.id === equipment.id;
      });
      if (equipmentsSelected.length === 0 || !duplicated) {
        equipmentsSelected.push(equipment);
      }
    },
    // 从当前选择测试仪器中删减
    dropFromSelectedEquipments: (state, equipment) => {
      let equipmentsSelected = state.selectedEquipments;
      equipmentsSelected.splice(equipmentsSelected.indexOf(equipment), 1);
    },
    // 清空选择仪器
    clearAllSelectedEquipments: (state) => state.selectedEquipments.splice(0, state.selectedEquipments.length),
    // 设置选择仪器
    setSelectedEquipments: (state, equipments) => state.selectedEquipments.splice(0, state.selectedEquipments.length, ...equipments),
    // 启动测试时， 初始化设置测试仪器数组
    setEquiptments: (state, equipments) => state.equipments.splice(0, state.equipments.length, ...equipments),
    // 启动测试失败、或者停止测试时触发， 用于清空测试仪器信息数组
    resetEquipments: (state) => state.equipments = [],

  }
});

export default store;

/** state.isOntest
 *  标识当前系统是否在测试状态的标志
 */


/** state.cycle
 *  当前测试的周期获取的周期值
 */


/** state.isSendding 
 *  设备的当前测试， 是否使主节点向子节点下发周期获取指令的标志
 */


/** state.equipments
 *  当前系统、测试设备所有信息，以服务端为基准，前端由 store 维护
 *  当前测试的测试设备的所有信息
 *    测试仪器信息
 *      委托单位、厂家、仪器名称、仪器型号、仪器编号
 *    测试仪器配置信息
 *      温湿度示值、中心点ID、其他由测试仪器挂载的传感器ID
 *    传感器数据： ID为键，数据数组为值
 *    数据时间： 时间数组为值
 *    检测数据： 检测数据数组为值， 包含 温度与湿度的 均匀度、波动度、偏差，共 6 项数据
 */


 /** isTestPreparing
  *  标识当前是否为测试准备状态， 即在设备管理页选择了设备，并点击了进入测试按钮， 点击进入测试时，置为 true
  *  点击停止测试按钮， 并成功停止测试时， 置为 false
  */


/** state.equipmentsSelected
 *  本次测试选择的测试仪器数据
 *  在设备管理页选择，进入测试过程更新
 *  在停止测试时，清空，reset 
 *  在进入测试管理页时， mounted 时， 使用
 */


 /** state.deviceTestData
  *  本次测试全部仪器所有数据
  *  启动测试、 网页刷新时， 重新创建
  *  后端推送数据时， 更新
  *  停止测试，使用完时清空
  */