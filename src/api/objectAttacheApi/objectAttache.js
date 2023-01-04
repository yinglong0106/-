import request from '@/utils/request'

// web-查询机构名称信息列表
export function getOrgList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\org\\info\\getList_1_0_2&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-新增机构名称
export function insertOrg(data) {
  return request({
    url: '/ExSql?SqlCmdName=aprc\\web\\org\\info\\insert_1_0_3&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-编辑机构名称信息
export function updateOrg(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\org\\info\\update_1_0_2&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-删除机构名称信息
export function deleteOrg(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\org\\info\\delete_1_0_3&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-编辑注册验证号码管理
export function updatePhone(data) {
  return request({
    url: '/ExSql?SqlCmdName=aprc\\web\\org\\info\\updatePhone_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-查询机构当前的登录手机号
export function getCurPhone(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\org\\info\\getCurPhone_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-新增登录手机号
export function insertLoginPhone(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\org\\phoneLog\\insert_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-查询手机号更新记录
export function getLogList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\org\\phoneLog\\getLogList_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-查询手机号更新详情
export function getLogDetail(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\org\\phoneLog\\getLogDetail_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-查询当前关联供应专员管理列表
export function getST2UserList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\org\\stafflog\\getST2UserList_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-查可关联的供应专员列表
export function getHasSeorgUserList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\org\\stafflog\\getHasSeorgUserList_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-关联供应专员
export function relateST2User(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\org\\stafflog\\relateST2User_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-查询供应专员关联记录列表
export function getST2LogListByorgGuid(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\org\\stafflog\\getST2LogListByorgGuid_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-系统登录权限管理-查询当前已授权登录系统列表
export function getValidListByUid(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\org\\lgcode\\getValidListByUid_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-系统登录权限管理-查询可授权登录系统多选列表
export function getAvailableLgSysNameList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\org\\lgcode\\getAvailableLgSysNameList_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-系统登录权限管理-授权登录系统
export function insertByUid(data) {
  return request({
    url: '/ExSql?SqlCmdName=aprc\\web\\org\\lgcode\\insertByUid_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}
