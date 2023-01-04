import request from '@/utils/request'

export function list(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\suOrg\\stafflogst2\\outcomeMoney\\groupByYear_1_0_1&DBC=w_a',
    method: 'post',
    data
  })
}

export function yearList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\suOrg\\stafflogst2\\outcomeMoney\\groupByMonth_1_0_1&DBC=w_a',
    method: 'post',
    data
  })
}

export function monthList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\suOrg\\stafflogst2\\outcomeMoney\\getDetailByMonth_1_0_1&DBC=w_a',
    method: 'post',
    data
  })
}

export function organList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\suOrg\\stafflogst2\\outcomeMoney\\getDetailOfMonthGByCT_1_0_1&DBC=w_a',
    method: 'post',
    data
  })
}

export function orderList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\suOrg\\stafflogst2\\outcomeMoney\\getOrderDetailOfMonthGByCT_1_0_1&DBC=w_a',
    method: 'post',
    data
  })
}
