import request from '@/utils/request'

// web-查询服务对象投放管理列表
export function getTKNumByCTList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\serveOrg\\takeback\\getTKNumByCTList_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-查询服务对象投放记录列表
export function getFreeLogList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\serveOrg\\takeback\\getFreeLogList_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-查询服务对象可进行投放管理列表
export function getTKDetailByCTList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\serveOrg\\takeback\\getTKDetailByCTList_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-进行投放
export function freeByCT(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\serveOrg\\takeback\\freeByCT_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// // web-系统收回
// export function getTKDetailByCTList(data) {
//   return request({
//     url: '/QueryData?SqlCmdName=aprc\\web\\serveOrg\\takeback\\freeByCT_1_0_1&DBC=w_a',
//     method: 'post',
//     data: data
//   })
// }