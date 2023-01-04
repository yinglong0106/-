import request from '@/utils/request'

// web-招募/供应专员-查询权限服务机构列表
export function getValidSeorgListByST(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\user\\kpi\\getValidSeorgListByST_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-招募专员成果-查询采购对接成果列表
export function getSeorgDeOrderNumByST3Uid(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\user\\kpi\\getSeorgDeOrderNumByST3Uid_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-招募专员成果-查询供应对接成果列表
export function getSeorgSuOrderNumByST3Uid(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\user\\kpi\\getSeorgSuOrderNumByST3Uid_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应专员用户管理-查询可关联服务机构列表
export function getAvaliaSeorgList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\user\\seRelate\\getAvaliaSeorgList_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应专员用户管理-关联服务机构
export function relateST2User(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\user\\seRelate\\relateST2User_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应专员-查询权限供应机构列表
export function getValidOrgListByST(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\user\\kpi\\getValidOrgListByST_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应专员-查询供应专员成果列表
export function getOrgSuOrderNumByST2Uid(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\user\\kpi\\getOrgSuOrderNumByST2Uid_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}