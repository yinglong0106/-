import request from '@/utils/request'

// web-按月份统计服务机构角色的采购服务费用
export function SumByYM(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\serve\\outcomeMoney\\seorg\\SumByYM_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-按月份统计服务机构用户的采购服务费用
export function SumByYMOfSeorgList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\serve\\outcomeMoney\\seorg\\SumByYMOfSeorgList_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-导出服务机构结算管理(详细列表)文件
export function exportMonthDetailList(query) {
  return request({
    url: '/OutputCsv?SqlCmdName=aprc\\web\\serve\\outcomeMoney\\seorg\\exportMonthDetailList_1_0_1&DBC=w_a&curUserId=' + query.curUserId + '&year=' + query.year + '&month=' + query.month + '&seorgName=' + query.seorgName + '&OutputFileName=' + query.OutputFileName,
    method: 'get',
  })
}