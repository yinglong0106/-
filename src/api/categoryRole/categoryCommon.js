import request from '@/utils/request'
import axios from 'axios'

// 查询供需主体顶级列表等
export function getSonOfSDList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=com\\cat\\getSonOfSDList&DBC=w_m',
    method: 'post',
    data: data
  })
}

// // 查询验收期限品类未设置列表
// export function getSonList(data) {
//   axios.defaults.baseURL = '/api'
//   return request({
//     xf_url: '/api',
//     url: '/QueryData?SqlCmdName=com\\cat\\getSonList&DBC=w_m',
//     method: 'post',
//     data: data
//   })
// }

// 查询需求场景一级节点列表
export function getTopParentList(data) {
  // axios.defaults.baseURL = '/api'
  return request({
    // xf_url: '/api',
    url: '/QueryData?SqlCmdName=aprc\\web\\scene\\getTopParentList_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// 查询需求场景儿子节点列表
export function getSonList(data) {
  // axios.defaults.baseURL = '/api'
  return request({
    // xf_url: '/api',
    url: '/QueryData?SqlCmdName=aprc\\web\\scene\\getSontList_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-新增采购/供应场景
export function insertType3(data) {
  // axios.defaults.baseURL = '/api'
  return request({
    // xf_url: '/api',
    url: '/ExSql?SqlCmdName=aprc\\web\\scene\\insert_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-编辑采购/供应场景
export function updateType3(data) {
  // axios.defaults.baseURL = '/api'
  return request({
    // xf_url: '/api',
    url: '/ExSql?SqlCmdName=aprc\\web\\scene\\update_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-删除采购/供应场景
export function deleteType3(data) {
  // axios.defaults.baseURL = '/api'
  return request({
    // xf_url: '/api',
    url: '/ExSql?SqlCmdName=aprc\\web\\scene\\delete_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-变更采购/供应场景节点顺序
export function updateType3Norder(data) {
  // axios.defaults.baseURL = '/api'
  return request({
    // xf_url: '/api',
    url: '/ExSql?SqlCmdName=aprc\\web\\scene\\updateNorder_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-查询品类类型列表
export function getList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\cattype\\getList&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询品类类型带是否有场景的列表
export function getWithHasCatTreeList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\cattype\\getWithHasCatTreeList&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询某个品类类型下的一级场景列表
export function getFirstSceneList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\cat\\getFirstSceneList&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询场景是否有品类名称的列表
export function getSonWithHasCatFlagList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\cat\\getSonWithHasCatFlagList&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询品类类型带是否有场景的列表
export function getListByCatTreeGuid(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\cat\\getListByCatTreeGuid&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-根据品类导出型号名称数据
export function exportSupplyModels(categoryGuid,OutputFileName) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/OutputCsv?SqlCmdName=web\\cat\\exportSupplyModels&DBC=w_m&categoryGuid='+categoryGuid+'&OutputFileName='+OutputFileName,
    method: 'get'
  })
}

// web-根据品类导出品牌名称数据
export function exportSupplyBrandNames(categoryGuid,OutputFileName) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/OutputCsv?SqlCmdName=web\\cat\\exportSupplyBrandNames&DBC=w_m&categoryGuid='+categoryGuid+'&OutputFileName='+OutputFileName,
    method: 'get'
  })
}

// web-根据品类导出型号名称+品牌名称数据
export function exportSModelsAndBNames(categoryGuid,OutputFileName) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/OutputCsv?SqlCmdName=web\\cat\\exportSModelsAndBNames&DBC=w_m&categoryGuid='+categoryGuid+'&OutputFileName='+OutputFileName,
    method: 'get'
  })
}

// 查询需求场景下是否有品类生成器
export function existNTByCatTreeGuid(data) {
  // axios.defaults.baseURL = '/api'
  return request({
    // xf_url: '/api',
    url: '/QueryData?SqlCmdName=aprc\\web\\scene\\hasCategory_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-查询品类名称关联的一级需求场景列表
export function getReTopSceneListByCGuid(data) {
	return request({
		url: '/QueryData?SqlCmdName=aprc\\web\\cat\\info\\getReTopSceneListByCGuid_1_0_1&DBC=w_a',
		method: 'post',
		data: data
	})
}
