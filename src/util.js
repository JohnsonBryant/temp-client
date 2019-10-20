'use strict'
import moment from 'moment'

function testApi() {
  // return ''
  return 'https://0f587dce-5a0a-4458-abb7-012839c33dde.mock.pstmn.io'
}

function nowtime() {
  return moment().format('YYYY-MM-DD HH:mm:ss')
}


export default {
  testApi,
  nowtime
}