import request from '@/utils/request'

// 获取路由
export const getRouters = () => {
  return request({
    // url: '/system/menu/getRouters',
	url: '/ProxyService/aprc_web_menu_getRouters',
    method: 'get'
  })
}