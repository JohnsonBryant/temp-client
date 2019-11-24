import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isOnTest: false,
    cycle: 10,
    isSendding: true,
    equipments: [],
    selectedEquipments: [],
  },
  mutations: {
    // 当前系统测试状态标识的 mutation
    changeTestState: (state, testState) => state.isOnTest = testState,
    addToSelectedEquipments: (state, equipment) => {
      // 新增选择的测试仪器
      let equipmentsSelected = state.selectedEquipments;
      if (equipmentsSelected.length === 0 || equipmentsSelected.indexOf(equipment) === -1) {
        equipmentsSelected.push(equipment);
      }
    },
    dropFromSelectedEquipments: (state, equipment) => {
      // 从当前选择测试仪器中删减选择的测试仪器
      // 数组的元素是对象，无法使用 Array.indexOf 检查是否存在， 应调整为检查数组元素的每一项属性值是否相等进行判断是否为同一仪器 
      let equipmentsSelected = state.selectedEquipments;
      equipmentsSelected.splice(equipmentsSelected.indexOf(equipment), 1);
    },
    clearAllSelectedEquipments: (state) => {
      state.selectedEquipments.splice(0, state.selectedEquipments.length);
    },
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
 */


/** state.equipmentsSelected
 *  本次测试选择的测试仪器数据
 *  在设备管理页选择，进入测试过程更新
 *  在停止测试时，清空，reset 
 *  在进入测试管理页时， mounted 时， 使用
 */