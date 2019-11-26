'use strict'
import moment from 'moment'

function testApi() {
  return ''
  // return 'https://cc14ca8b-dc40-46ff-8ac1-49a0f80fc3c7.mock.pstmn.io'
}

function nowtime() {
  return moment().format('YYYY-MM-DD HH:mm:ss')
}

function copyObject(orig) {
  var copy = Object.create(Object.getPrototypeOf(orig));
  copyOwnPropertiesFrom(copy, orig);
  return copy;
}

function copyOwnPropertiesFrom(target, source) {
  Object
    .getOwnPropertyNames(source)
    .forEach(function (propKey) {
      var desc = Object.getOwnPropertyDescriptor(source, propKey);
      Object.defineProperty(target, propKey, desc);
    });
  return target;
}

export default {
  testApi,
  nowtime,
  copyObject,
}