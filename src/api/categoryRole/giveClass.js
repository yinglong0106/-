import request from '@/utils/request'
import axios from 'axios'

// web-查询品类信息分页列表
export function getBriefList(data) {
  // axios.defaults.baseURL = '/api'
  return request({
    // xf_url: '/api',
    url: '/QueryData?SqlCmdName=aprc\\web\\cat\\info\\geList_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-查询品类别名
export function getAliasByGuid(data) {
  // axios.defaults.baseURL = '/api'
  return request({
    // xf_url: '/api',
    url: '/QueryData?SqlCmdName=aprc\\web\\cat\\info\\getAliasByGuid_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-编辑品类别名
export function updateAliasByCGuid(data) {
  // axios.defaults.baseURL = '/api'
  return request({
    // xf_url: '/api',
    url: '/ExSql?SqlCmdName=aprc\\web\\cat\\info\\updateAliasByCGuid_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-编辑品类图片
export function updateImgByCGuid(data) {
  // axios.defaults.baseURL = '/api'
  return request({
    // xf_url: '/api',
    url: '/ExSql?SqlCmdName=aprc\\web\\cat\\info\\updateImgByCGuid_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-查询关联供需类型/供需场景
export function getRelationOfParByCGuid(data) {
  // axios.defaults.baseURL = '/api'
  return request({
    // xf_url: '/api',
    url: '/QueryData?SqlCmdName=aprc\\web\\cat\\info\\getReSceneListByCGuid_1_0_2&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-删除品类名称
export function deleteByCGuid(data) {
  // axios.defaults.baseURL = '/api'
  return request({
    // xf_url: '/api',
    url: '/ExSql?SqlCmdName=aprc\\web\\cat\\info\\deleteByCGuid_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// 按条件统计品类名称数量_1_0_1
export function getCountByCon_1_0_1(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\cat\\getCountByCon_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// 按条件搜索品类名称列表_1_0_1
export function getListByCon_1_0_1(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\cat\\getListByCon_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}
