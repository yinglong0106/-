import request from '@/utils/request'

// web-供应机构用户-查询供应机构用户列表
export function getList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\user\\orginfo\\getList_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应机构用户-查询供应品类添加列表
export function getAddedCatList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\user\\orginfo\\getAddedCatList_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应机构用户-查询供应成果列表
export function getKPIOfCat(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\user\\orginfo\\getKPIOfCat_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}