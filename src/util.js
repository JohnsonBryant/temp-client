'use strict'
import moment from 'moment'

function testApi() {
  return ''
  // return 'https://cc14ca8b-dc40-46ff-8ac1-49a0f80fc3c7.mock.pstmn.io'
}

function nowtime() {
  return moment().format('YYYY-MM-DD HH:mm:ss')
}

/**
 * 检查参数是否为整数值
 * @param obj 任意类型值
 * @return bool， 表示参数 obj 是否为整数
 */
function isInteger(obj) {
  return typeof obj === 'number' && obj % 1 === 0;
}

/**
 * 检查参数是否为整数值
 * @param obj 任意类型值
 * @return bool， 表示参数 obj 是否为整数
 */
function isPositiveInteger(obj) {
  return typeof obj === 'number' && obj % 1 === 0 && obj > 0;
}

/**
 * 检查参数是否为正数
 * @param obj 应传入数值型, 传入非数值参数一定返回false
 * @return bool， 表示参数 obj 是否为正数
 */
function isPositiveNumber(obj) {
  return typeof obj === 'number' && !isNaN(obj) && obj >= 0;
}


/**
 * 检查参数是否为有效数值
 * @param obj 应传入数值型, 传入非数值参数一定返回false
 * @return bool， 表示参数 obj 是否为有效数值
 */
function isValidNumber(obj) {
  return typeof obj === 'number' && !isNaN(obj);
}


export default {
  testApi,
  nowtime,
  isInteger,
  isValidNumber,
  isPositiveNumber,
  isPositiveInteger,
}