import request from '@/utils/request'
import axios from 'axios'

// 费用提现申请管理列表
export function applyWithdrawList(data) {
  return request({
    url: '/QueryData?SqlCmdName=WEB\\guide\\applyWithdrawList&DBC=w_a',
    method: 'post',
    data: data
  })
}

// 费用提现申请管理列表 --结算管理
export function applyWithdrawDetailList(data) {
  return request({
    url: '/QueryData?SqlCmdName=WEB\\guide\\applyWithdrawDetailList&DBC=w_a',
    method: 'post',
    data: data
  })
}

// 报酬信息
export function getEarningsMonthOfYear(data) {
  return request({
    url: '/QueryData?SqlCmdName=WEB\\guide\\getEarningsMonthOfYear_1_0_2&DBC=w_a',
    method: 'post',
    data: data
  })
}

// 收益提现信息
export function withdrawDoneDetail(data) {
  return request({
    url: '/QueryData?SqlCmdName=WEB\\guide\\withdrawDoneDetail&DBC=w_a',
    method: 'post',
    data: data
  })
}

// 引导计酬管理
export function applyWithdrawDetail(data) {
  return request({
    url: '/QueryData?SqlCmdName=WEB\\guide\\applyWithdrawDetail&DBC=w_a',
    method: 'post',
    data: data
  })
}

// 引导计酬管理 -- 结算管理
export function withdrawStatistic(data) {
  return request({
    url: '/QueryData?SqlCmdName=WEB\\guide\\withdrawStatistic_1_0_2&DBC=w_a',
    method: 'post',
    data: data
  })
}
