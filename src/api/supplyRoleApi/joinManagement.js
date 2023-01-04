import request from '@/utils/request'

export function list(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\suOrg\\stafflogst2\\getValidList_1_0_1&DBC=w_a',
    method: 'post',
    data
  })
}

export function recordList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\suOrg\\stafflogst2\\getRelateLogList_1_0_1&DBC=w_a',
    method: 'post',
    data
  })
}

export function addList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\suOrg\\stafflogst2\\getValidAddedCatList_1_0_1&DBC=w_a',
    method: 'post',
    data
  })
}

export function resultList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\suOrg\\stafflogst2\\getSupplyOrderNumList_1_0_1&DBC=w_a',
    method: 'post',
    data
  })
}

export function getTypeCount(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\suOrg\\stafflogst2\\getValidAddedCatCount_1_0_1&DBC=w_a',
    method: 'post',
    data
  })
}

export function getResultCount(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\suOrg\\stafflogst2\\getSupplyOrderNum_1_0_1&DBC=w_a',
    method: 'post',
    data
  })
}
