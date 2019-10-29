'use strict'
import moment from 'moment'

function testApi() {
  return ''
  // return 'https://cc14ca8b-dc40-46ff-8ac1-49a0f80fc3c7.mock.pstmn.io'
}

function nowtime() {
  return moment().format('YYYY-MM-DD HH:mm:ss')
}


export default {
  testApi,
  nowtime
}