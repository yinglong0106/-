import request from '@/utils/request'

export function getNotStartList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\server2\\commutask\\getNotStartList_1_0_1&DBC=w_a',
    method: 'post',
    data
  })
}

export function serviceGetNotStartList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\server2\\servetask\\getNotStartList_1_0_1&DBC=w_a',
    method: 'post',
    data
  })
}

export function getStartingList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\server2\\commutask\\getStartingList_1_0_1&DBC=w_a',
    method: 'post',
    data
  })
}

export function serviceGetStartingList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\web\server2\servetask\getStartingList_1_0_1&DBC=w_a',
    method: 'post',
    data
  })
}

export function getEndList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\server2\\commutask\\getEndList_1_0_1&DBC=w_a',
    method: 'post',
    data
  })
}

export function serviceGetEndList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\server2\\servetask\\getEndList_1_0_1&DBC=w_a',
    method: 'post',
    data
  })
}

export function getTaskTimeList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\server2\\commutask\\getTaskTimeList_1_0_1&DBC=w_a',
    method: 'post',
    data
  })
}

export function serviceGetTaskTimeList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\server2\\servetask\\getTaskTimeList_1_0_1&DBC=w_a',
    method: 'post',
    data
  })
}

export function getLabelList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\server2\\bizdict\\getList_1_0_1&DBC=w_a',
    method: 'post',
    data
  })
}

export function userTargetList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\server2\\stobject\\getListByOrg_1_0_1&DBC=w_a',
    method: 'post',
    data
  })
}

export function serviceUserTargetList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\server2\\servetask\\getHasSdPTobjectListByOrg_1_0_1&DBC=w_a',
    method: 'post',
    data
  })
}

export function getNumber(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\server2\\stobject\\getCountByOrg_1_0_1&DBC=w_a',
    method: 'post',
    data
  })
}

export function getServiceName(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\scene\\sdpath\\getHasNameList_1_0_1&DBC=w_a',
    method: 'post',
    data
  })
}

export function getCommunicateList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\server2\\sysuserlabel\\getListByT_1_0_1&DBC=w_a',
    method: 'post',
    data
  })
}

export function serviceSpecialUser(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\server2\\sysuserlabel\\getSerUListByT_1_0_1&DBC=w_a',
    method: 'post',
    data
  })
}


export function dispatchButed(data) {
  return request({
    url: '/ExSql_Distributed?TransactionName=saveCommuTaskTc_1_0_1&DBC=w_a',
    method: 'post',
    data
  })
}





