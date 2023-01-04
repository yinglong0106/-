import request from '@/utils/request'

// web-查询机构名称信息列表
export function getList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\serveOrg\\info\\getList_1_0_1&DBC=w_a',
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

// web-查询机构品类权限管理列表
export function getValidCatList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\serveOrg\\catlog\\getValidCatList_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-查询授权品类更新记录列表
export function getCatLogList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\serveOrg\\catlog\\getCatLogList_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}


// web-服务机构用户管理-查询服务专员团队管理列表
export function getST1NoKpiList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\webServeOrg\\staff\\getST1NoKpiList_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-服务机构用户管理-查询供应专员团队管理列表
export function getST2NoKpiList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\webServeOrg\\staff\\getST2NoKpiList_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-服务机构用户管理-查询供应专员的供应对接成果列表
export function getST2WithKpiList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\webServeOrg\\staff\\getST2WithKpiList_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-服务机构用户管理-查询服务专员的采购对接成果列表
export function getST1WithKpiList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\webServeOrg\\staff\\getST1WithKpiList_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}