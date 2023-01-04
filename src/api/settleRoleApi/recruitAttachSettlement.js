import request from '@/utils/request'

// web-按年度月份统计招募专员角色的采购服务费用
export function SumByYM(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\serve\\outcomeMoney\\st3\\SumByYM_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-按月份统计招募专员用户的采购服务费用列表
export function SumByYMOfST3UserList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\serve\\outcomeMoney\\st3\\SumByYMOfST3UserList_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-导出招募专员结算管理(详细列表)文件
export function exportMonthDetailList(query) {
  return request({
    url: '/OutputCsv?SqlCmdName=aprc\\web\\serve\\outcomeMoney\\st3\\exportMonthDetailList_1_0_1&DBC=w_a&curUserId=' + query.curUserId + '&year=' + query.year + '&month=' + query.month + '&phonenumber=' + query.phonenumber + '&OutputFileName=' + query.OutputFileName,
    method: 'get',
  })
}