import request from '@/utils/request'

// web-按年度查询服务业绩统计
export function SumByYear(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\serve\\outcomeMoney\\SumByYear_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// ﻿web-根据年度按月份查询服务业绩统计
export function SumByMonth(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\serve\\outcomeMoney\\SumByMonth_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// ﻿﻿web-根据月份按日查询服务业绩统计
export function SumByDay(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\serve\\outcomeMoney\\SumByDay_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// ﻿web-根据日期查询各品类类型的采购服务费用统计
export function SumByDayOfCT(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\serve\\outcomeMoney\\SumByDayOfCT_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-查询服务业绩统计的月份详情列表
export function SumByDayOfCG(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\serve\\outcomeMoney\\SumByDayOfCG_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-查询服务业绩统计的月份详情列表
export function getOrderListByDayOfCG(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\serve\\outcomeMoney\\getOrderListByDayOfCG_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}