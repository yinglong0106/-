import request from '@/utils/request'

// web-服务专员用户-查询服务专员列表
export function getGainFlag1UserList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\user\\appPhone\\getGainFlag1UserList_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-服务专员用户-查询服务专员成果列表
export function getGainFlag1UserKpiList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\user\\appPhone\\getGainFlag1UserKpiList_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}