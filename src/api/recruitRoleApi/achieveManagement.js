import request from '@/utils/request'

export function list(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\serveOrg\\stafflogst3\\outcomeMoney\\totalSum_1_0_1&DBC=w_a',
    method: 'post',
    data
  })
}

export function supplyList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\serveOrg\\stafflogst3\\outcomeMoney\\getSuGroupByYear_1_0_1&DBC=w_a',
    method: 'post',
    data
  })
}

export function supplyYearList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\serveOrg\\stafflogst3\\outcomeMoney\\getSuGroupByMonth_1_0_1&DBC=w_a',
    method: 'post',
    data
  })
}

export function supplyMonthList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\serveOrg\\stafflogst3\\outcomeMoney\\getSuDetailByMonth_1_0_1&DBC=w_a',
    method: 'post',
    data
  })
}

export function purchaseList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\serveOrg\\stafflogst3\\outcomeMoney\\getDeGroupByYear_1_0_1&DBC=w_a',
    method: 'post',
    data
  })
}

export function purchaseYearList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\serveOrg\\stafflogst3\\outcomeMoney\\getDeGroupByMonth_1_0_1&DBC=w_a',
    method: 'post',
    data
  })
}

export function purchaseMonthList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\serveOrg\\stafflogst3\\outcomeMoney\\getDeDetailByMonth_1_0_1&DBC=w_a',
    method: 'post',
    data
  })
}
