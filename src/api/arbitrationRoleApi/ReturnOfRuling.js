import request from '@/utils/request'
import axios from 'axios'

// web-查询非系统名义未裁决列表
export function getNonSysWaitJudgeList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\orderJudge\\getNonSysWaitJudgeList_1_0_2&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-查询系统名义未裁决列表
export function getSysWaitJudgeList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\order\\judge\\getSysWaitJudgeList_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-查询非系统名义已裁决列表
export function getNonSysJudgeList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\order\\judge\\getNonSysJudgeList_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-查询系统名义已裁决列表
export function getSysJudgeList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\order\\judge\\getSysJudgeList_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-查询仲裁申请情况-订单取消
export function getCancelOrderDetail(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\order\\getCancelOrderDetail_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-查询仲裁申请情况-订单退货
export function getRefundOrderDetail(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\order\\getRefundOrderDetail_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-查询订单成果接收
export function getOutcomeDetails(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\order\\getOrderCatInfo_1_0_1,aprc\\web\\order\\getOutcomeDetails_1_0_1,aprc\\web\\order\\getOutcomeDetailData_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-查询订单详情
export function getOrderDetail(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\order\\getDetail&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-采购查询订单详情
export function getDemandDetail(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\order\\getDemandDetail_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应查询订单详情
export function getSupplyDetail(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\order\\getSupplyDetail_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-查询采购详情
export function getOrderFeeDemandDetail(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\order\\getOrderFeeDemandDetail_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-查询供应详情
export function getOrderFeeSupplyDetail(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\order\\getOrderFeeSupplyDetail_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-查询采购/供应详情-需求信息
export function getDemandMessage(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\order\\detail\\dReqPlates\\getPlates_1_0_1,aprc\\web\\order\\detail\\dReqPlates\\getPlateFields_1_0_1,aprc\\web\\order\\detail\\dReqPlates\\getPlateFieldValues_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-查询采购/供应详情-供应信息
export function getSupplydMessage(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\order\\detail\\pricePlates\\getPayDetail_1_0_1,aprc\\web\\order\\detail\\pricePlates\\getPlates_1_0_1,aprc\\web\\order\\detail\\pricePlates\\getPlateFields_1_0_1,aprc\\web\\order\\detail\\pricePlates\\getPlateFieldValues_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-裁决意见批复
export function SysMakeJudge(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\order\\judge\\SysMakeJudge_1_0_2&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-系统名义裁决意见批复
export function NonSysMakeJudge(data) {
  return request({
    url: '/ExSql?SqlCmdName=aprc\\web\\order\\judge\\NonSysMakeJudge&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-裁决意见批复后执行
export function webOrderRefund(data) {
  return request({
    url: '/ProxyService/aprc_web_orderRefund_1_0_1?CustomMimeType=application/json',
    method: 'post',
    data: data
  })
}

// web-系统替需方通过验收_1_0_1
export function demandAutoAcceptOrder(data) {
  return request({
    url: '/ExSql?SqlCmdName=aprc\\web\\order\\judge\\demandAutoAcceptOrder_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}
