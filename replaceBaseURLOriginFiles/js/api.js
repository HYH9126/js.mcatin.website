/**
 * 所有后端接口请求的前端封装
 * @param window
 * @param $
 * @returns
 */
(function (window, $) {
	let baseURL = 'http://@baseurl';
	let API = function(baseURL) {
		this.baseURL = baseURL;
		
		/**
		 * 根据课程id获取产品信息列表
		 */
		this.classInfo = function(classId, callback) {
			$.get(`${this.baseURL}/class/classInfo?classId=${classId}`, function(data) {
				if (data.errno === 0) {
					let endTime = data.data.info.endTime;
					let callbackRsp = {
						daysRemaining: data.data.deltaDay,
						state: data.data.deltaDay > 0 && data.data.info.status == 0 ? true : false
					}
					callback(callbackRsp);
				} else {
					console.log(data);
				}
			})
		}
		/**
		 * 课程报名接口
		 */
		this.signUp = function(requestData, callback) {
			$.post(`${this.baseURL}/class/signup`, requestData, callback)
		}
		
		/**
		 * 课程报名接口
		 */
		this.signUpOneStep = function(requestData, callback) {
			$.post(`${this.baseURL}/class/signupInOne`, requestData, callback)
		}
		/**
		 * 邮箱激活链接跳转到新的表单页后，填完所有表单内容激活报名
		 */
		this.active = function(requestData, callback) {
			$.post(`${this.baseURL}/class/active`, requestData, callback)
		}
		
		this.upload = function(formData, callback) {
			$.ajax({
			    url: `${this.baseURL}/upload/pdf`,
			    type: 'POST',
			    cache: false,
			    data: new FormData(formData),
			    processData: false,
			    contentType: false
			}).done(callback).fail(callback); 
		}
	}
	
	$.ApiInit = function(baseURL) {
		api = new API(baseURL);
		$.api = api;
	};
	$.ApiInit(baseURL)
}(window, jQuery))