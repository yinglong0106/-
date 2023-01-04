import request from '@/utils/request'

export function list(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\serveOrg\\stafflog\\getST3List_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

export function recordList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\serveOrg\\stafflog\\getST3LogList_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

export function typeList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\serveOrg\\stafflog\\getSeorgCatList_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

export function serverGroupList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\serveOrg\\stafflog\\getValidST1ListBySeorgGuid_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

export function supplyGroupList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\serveOrg\\stafflog\\getValidST2ListBySeorgGuid_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

export function serverResultList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\serveOrg\\stafflog\\getValidPhListBySeorgGuid_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

export function supplyResultList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\serveOrg\\stafflog\\getValidOrgListBySeorgGuid_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

export function getServerCount(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\serveOrg\\stafflog\\getValidST1CountBySeorgGuid_1_0_1&DBC=w_a',
    method: 'post',
    data
  })
}

export function getSupplyCount(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\serveOrg\\stafflog\\getValidST2CountBySeorgGuid_1_0_1&DBC=w_a',
    method: 'post',
    data
  })
}

export function getServerResultCount(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\serveOrg\\stafflog\\getValidPhCountBySeorgGuid_1_0_1&DBC=w_a',
    method: 'post',
    data
  })
}

export function getSupplyResultCount(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\serveOrg\\stafflog\\getValidOrgCountBySeorgGuid_1_0_1&DBC=w_a',
    method: 'post',
    data
  })
}
