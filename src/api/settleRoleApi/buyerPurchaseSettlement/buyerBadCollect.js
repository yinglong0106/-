import request from '@/utils/request'
import axios from 'axios'

// web-查看需方违约处罚收取列表
export function getList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\order\\settle\\demandDisobey\\ft1\\getList_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-结算管理-未结算列表
export function getUnPayListByMonth(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\order\\settle\\demandDisobey\\ft1\\getUnPayListByMonth_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-结算管理-已结算列表
export function getPayListByMonth(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\order\\settle\\demand2demandDisobey\\getPayListByMonth_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}