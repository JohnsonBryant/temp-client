'use strict'
import moment from 'moment'

function testApi() {
  return ''
  return 'https://512258c0-4a07-47eb-80ee-8df6830c42a5.mock.pstmn.io'
}

function nowtime() {
  return moment().format('YYYY-MM-DD HH:mm:ss')
}


export default {
  testApi,
  nowtime
}