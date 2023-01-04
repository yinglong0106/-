import request from '@/utils/request'
import axios from 'axios'

// web-查询app版本信息列表
export function getList_1_0_1(data) {
	return request({
		url: '/QueryData?SqlCmdName=aprc\\web\\appVersion\\getList_1_0_1&DBC=w_a',
		method: 'post',
		data: data
	})
}

// web-新增app版本
export function insert_1_0_1(data) {
	return request({
		url: '/Exsql?SqlCmdName=aprc\\web\\appVersion\\insert_1_0_1&DBC=w_a',
		method: 'post',
		data: data
	})
}

// web-发布app版本
export function updateStatus_1_0_1(data) {
	return request({
		url: '/Exsql?SqlCmdName=aprc\\web\\appVersion\\updateStatus_1_0_1&DBC=w_a',
		method: 'post',
		data: data
	})
}

// 删除安装包
export function delApp(fileName, filePath) {
	return request({
		url: '/DeleteFile?FileName=' + fileName + '&FilePath=' + filePath,
		headers: {
			ignoreErr: true
		},
		method: 'get'
	})
}
