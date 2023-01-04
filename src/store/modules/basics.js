const basics = {
	state: {
		imgUrl: process.env.VUE_APP_BASE_URL_ASSETS + '/Enclosure/',
		img_url_cat: process.env.VUE_APP_BASE_URL_ASSETS + '/Enclosure/APRC/CATEGORY/IMAGES/', // 品类
		img_url_jud: process.env.VUE_APP_BASE_URL_ASSETS + '/Enclosure/APRC/JUDGE/IMAGES/', // 仲裁
		img_url_set_acc: process.env.VUE_APP_BASE_URL_ASSETS +
			'/Enclosure/APRC/SETTLEMENT/ACCEPT/IMAGES/', // 结算验收通过
		img_url_set_obe: process.env.VUE_APP_BASE_URL_ASSETS +
			'/Enclosure/APRC/SETTLEMENT/OBEY/IMAGES/', // 结算赔偿支付通过
		img_url_set_ref: process.env.VUE_APP_BASE_URL_ASSETS +
			'/Enclosure/APRC/SETTLEMENT/REFUND/IMAGES/', // 结算需方退货退款支付
		img_url_set_dis: process.env.VUE_APP_BASE_URL_ASSETS +
			'/Enclosure/APRC/SETTLEMENT/DISOBEY/IMAGES/', // 结算违约缴纳
		img_url_ord: process.env.VUE_APP_BASE_URL_ASSETS +
			'/Enclosure/APRC/ORDER/IMAGES/', // 订单相关图片文件夹(成果、退款、验收证明等)
		img_url_user_feedback_user: process.env.VUE_APP_BASE_URL_ASSETS +
			'/Enclosure/APRC/USER/USE_FEEDBACK/IMAGES/', // 工具使用意见反馈图片文件夹
		img_url_user_feedback_order: process.env.VUE_APP_BASE_URL_ASSETS +
			'/Enclosure/APRC/USER/ORDER_FEEDBACK/IMAGES/', // 退货退款异常反馈图片文件夹
		img_url_user_idcard: process.env.VUE_APP_BASE_URL_ASSETS + '/Enclosure/APRC/USER/IDCARD/', // app用户实名认证图片文件夹
		file_url_addphone: process.env.VUE_APP_BASE_URL_ASSETS +
			'/Enclosure/APRC/GUIDE/WEB/ADDPHONE/EXCEL/', // 增加人力资源上传文件文件夹
		img_url_plate: process.env.VUE_APP_BASE_URL_ASSETS + '/Enclosure/APRC/PLATE/IMAGES/', // 板块图片文件夹
		file_url_plate: process.env.VUE_APP_BASE_URL_ASSETS + '/Enclosure/APRC/PLATE/FILES/', // 板块文件文件夹
		file_url_sign: process.env.VUE_APP_BASE_URL_ASSETS + '/Enclosure/ORG/SIGN/IMAGES/', // 机构签约文件夹
		img_url_servicefee: process.env.VUE_APP_BASE_URL_ASSETS +
			'/Enclosure/APRC/SERVICEFEE/MN/IMAGES/', // 定价专员-按型号名称-定价说明图片上传文件夹
		img_url_idcard: process.env.VUE_APP_BASE_URL_ASSETS + '/Enclosure/WEBUSER/IDCARD/', // web用户实名认证图片文件夹
		app_path: process.env.VUE_APP_BASE_URL_ASSETS + '/Enclosure/DOWNLOAD/', // app上传路径
		img_url_org: process.env.VUE_APP_BASE_URL_ASSETS + '/Enclosure/APRC/WEB/ORG/PHONEIMG/', // web对象机构的图片文件夹
		img_url_seorg: process.env.VUE_APP_BASE_URL_ASSETS + '/Enclosure/APRC/WEB/SEORG/PHONEIMG/', // web对象机构的图片文件夹
	},
	mutations: {

	},
	actions: {

	}
}

export default basics
