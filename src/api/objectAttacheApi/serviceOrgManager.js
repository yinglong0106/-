import request from '@/utils/request'

// web-查询机构名称信息列表
export function getOrgList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\serveOrg\\info\\getList_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-新增机构名称
export function insertOrg(data) {
  return request({
    url: '/ExSql?SqlCmdName=aprc\\web\\serveOrg\\info\\insert_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-编辑机构名称信息
export function updateOrg(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\serveOrg\\info\\update_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-删除机构名称信息
export function deleteOrg(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\serveOrg\\info\\delete_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-编辑注册验证号码管理
export function updatePhone(data) {
  return request({
    url: '/ExSql?SqlCmdName=aprc\\web\\serveOrg\\info\\updatePhone_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-查询机构当前的登录手机号
export function getCurPhone(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\serveOrg\\info\\getCurPhone_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-新增登录手机号
export function insertLoginPhone(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\serveOrg\\phone\\insert_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-查询手机号更新记录
export function getLogList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\serveOrg\\phone\\getLogList_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-查询手机号更新详情
export function getLogDetail(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\serveOrg\\phone\\getLogDetail_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-查询当前关联的招募专员管理列表
export function getST3UserList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\webserveOrg\\stafflog\\getST3UserList_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-查询可进行关联的招募专员列表
export function getAvaliST3UserList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\serveOrg\\stafflog\\getAvaliST3UserList_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-关联招募专员
export function relateST3User(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\serveOrg\\stafflog\\relateST3User_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-查询招募专员关联记录列表
export function getST3LogListBySeorgGuid(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\serveOrg\\stafflog\\getST3LogListBySeorgGuid_1_0_1&DBC=w_a',
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

// web-给服务机构授权品类
export function grantCat(data) {
  return request({
    url: '/ExSql?SqlCmdName=aprc\\web\\serveOrg\\catlog\\grantCat_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-查询服务机构授权品类成功数量
export function getGrantCatOkNum(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\serveOrg\\catlog\\getGrantCatOkNum_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-给服务机构批量解除授权品类
export function ungrantCat(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\serveOrg\\catlog\\ungrantCat_1_0_1&DBC=w_a',
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

// 查询一级项目列表(一级供应路径)
export function getTopParentWithCatListByPath(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\webSuOrg\\path\\getTopParentWithSCList_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// 查询个人/企业儿子路径列表
export function getSonWithSCListByPath(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\webSuOrg\\path\\getSonWithSCList_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// 查询需求场景一级节点列表
export function getTopParentWithCatList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\scene\\getTopParentWithCatList_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// 查询需求场景儿子节点列表
export function getSonWithCatList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\scene\\getSonWithCatList_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-根据需求场景查询品类信息
export function getListBySecenGuid(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\cat\\info\\getListBySecenGuid_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

