import request from '@/utils/request'

export function list(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\server2\\communicate\\getList_1_0_1&DBC=w_a',
    method: 'post',
    data
  })
}

export function addRow(data) {
  return request({
    url: '/ExSql?SqlCmdName=aprc\\web\\server2\\communicate\\insert_1_0_1&DBC=w_a',
    method: 'post',
    data
  })
}

export function delRow(data) {
  return request({
    url: '/ExSql?SqlCmdName=aprc\\web\\server2\\communicate\\del_1_0_1&DBC=w_a',
    method: 'post',
    data
  })
}


export function getCommiteList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\user\\info\\getRoleUserList_1_0_1&DBC=w_a',
    method: 'post',
    data
  })
}

export function getSetLabel(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\server2\\sysuserlabel\\getListByType_1_0_1&DBC=w_a',
    method: 'post',
    data
  })
}

export function getServiceName(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\server2\\sysuserlabel\\getSdPNameListBy_1_0_1&DBC=w_a',
    method: 'post',
    data
  })
}

export function getLabelAll(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\server2\\sysuserlabel\\getAvaliDataList_1_0_1&DBC=w_a',
    method: 'post',
    data
  })
}

export function getServiceNameAll(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\server2\\sysuserlabel\\getAvaliSdPNameList_1_0_1&DBC=w_a',
    method: 'post',
    data
  })
}

export function setLabel(data) {
  return request({
    url: '/ExSql?SqlCmdName=aprc\\web\\server2\\sysuserlabel\\insert_1_0_1&DBC=w_a',
    method: 'post',
    data
  })
}

export function delLabel(data) {
  return request({
    url: '/ExSql?SqlCmdName=aprc\\web\\server2\\sysuserlabel\\del_1_0_1&DBC=w_a',
    method: 'post',
    data
  })
}







