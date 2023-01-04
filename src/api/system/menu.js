import request from '@/utils/request'

// 查询菜单列表
export function listMenu(query) {
  return request({
    // url: '/system/menu/list',
	url: '/ProxyService/aprc_web_menulist?CustomMimeType=application/json',
    method: 'get',
    params: query
  })
}

// 查询菜单详细
export function getMenu(menuId) {
  return request({
    url: '/ProxyService/aprc_web_menu_getById?menuId=' + menuId + '&CustomMimeType=application/json',
    method: 'get'
  })
}

// 查询菜单下拉树结构
export function treeselect() {
  return request({
    url: '/ProxyService/aprc_web_menulist/treeselect',
    method: 'get'
  })
}

// 根据角色ID查询菜单下拉树结构
export function roleMenuTreeselect(roleId) {
  return request({
    url: '/ProxyService/aprc_web_menulist/treeselect' + roleId,
    method: 'get'
  })
}

// 新增菜单
export function addMenu(data) {
  return request({
    url: '/ProxyService/aprc_web_menu_insert?CustomMimeType=application/json',
    method: 'post',
    data: data
  })
}

// 修改菜单
export function updateMenu(data) {
  return request({
    url: '/ProxyService/aprc_web_menu_update?CustomMimeType=application/json',
    method: 'post',
    data: data
  })
}

// 删除菜单
export function delMenu(menuId) {
  return request({
    url: '/ProxyService/aprc_web_menu_delByMid?menuId=' + menuId + '&CustomMimeType=application/json',
    method: 'post'
  })
}