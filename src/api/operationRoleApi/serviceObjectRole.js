import request from '@/utils/request'

// web-服务对象用户-查询服务对象已注册列表
export function getHasRegisteredList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\user\\appPhone\\getHasRegisteredList_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-服务对象用户-查询服务对象成果列表
export function getDemandUserKpiListByUid(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\user\\appPhone\\getDemandUserKpiListByUid_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-服务对象用户-查询服务对象未注册列表
export function getUnRegisteredList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\user\\appPhone\\getUnRegisteredList_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}