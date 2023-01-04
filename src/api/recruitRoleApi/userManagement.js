import request from '@/utils/request'

export function list(query) {
  // return request({
  //   url: '/system/role/list',
  //   method: 'get',
  //   params: query
  // })
  return  new Promise((resolve) => {
    return resolve(
      {
        rows: [
          {
            accountName: '手机',
            openDate: '2022-10-06 16:58:23',
            name: '林都',
            country: '中国大陆（+86）',
            phone: '18650767213',
            roleName: '供应专员',
            department: '华夏',
            joinDate: '2022-10-06 16:58:23',
            avatar: 'http://vue.ruoyi.vip/static/img/profile.473f5971.jpg',
            count: 10,
          },{
            accountName: '手机',
            openDate: '2022-10-06 16:58:23',
            name: '林都',
            country: '中国大陆（+86）',
            phone: '18650767213',
            roleName: '供应专员2',
            department: '华夏',
            joinDate: '2022-10-06 16:58:23',
            avatar: 'http://vue.ruoyi.vip/static/img/profile.473f5971.jpg',
            count: 10,
          },
        ],
        total: 2,
      }
    )
  })
}
export function add(record) {
  return new Promise()
}
