$(document).ready(function () {
	let isMobile = false;
    //判断用户设备
    (function () {
        if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
            isMobile = true;
        } else {
            isMobile = false;
        }
    })();

    (function () {
        if (isMobile) {
			mobileConf();
			initMdate();
			addeventlistener();
        }
     })();

    function mobileConf() {
        //动态像素比设置
        let pixelRatio = 1 / window.devicePixelRatio;
        $("meta[name='viewport']").attr('content', "width=device-width,initial-scale=" + pixelRatio + ",minimum-scale=" + pixelRatio + ",maximum-scale=" + pixelRatio + ",user-scalable=no");
        //动态设置体大小
        $('html').css('font-size', $(window).width() / 10 + 'px');
	}
	
	function initMdate() {
		new Mdate("birthday", {
			beginYear: "1980",
			endYear: "2010",
			format: "-"
		})
	}

	function addeventlistener() {
		$('#backIndex').on('click', function () {
			window.location.replace("http://www.mcatin.art/pages/home.html");
		});
		$(".clo").on('click', function () {
			var userAgent = navigator.userAgent;
			if (userAgent.indexOf("Firefox") != -1 || userAgent.indexOf("Chrome") != -1) {
				window.location.href = "about:blank";
			} else if (userAgent.indexOf('Android') > -1 || userAgent.indexOf('Linux') > -1) {
				window.opener = null; window.open('about:blank', '_self', '').close();
			} else {
				window.opener = null;
				window.open("about:blank", "_self");
				window.close();
			}
		});
	}

	//判断邮箱链接是否失效
	let hashArr = window.location.hash.substr(1).split('&');
	let isLinkError = false;
	hashArr.forEach(ele => {
		if (ele.split('=').includes('error')) {
			isLinkError = true;
		}
	});

	//固定背景设置
	setFixedBgCss();
	$(window).resize(function () {
		setFixedBgCss();
	});
	function setFixedBgCss() {
		$('#fixedBg').css('height', $(window).height());
		$('#fixedBg').css('background-position-y', $(window).height() - 2160 + 'px');
	}

	//邮箱链接失效则停止后面代码执行
	if (isLinkError) {
		$('.con1').css('display', 'none');
		$('.con2').css('display', 'none');
		$('.con3').css('display', 'none');
		$('.signUpTips3').css('display', 'block');
		$("html").scrollTop(0);
		return false;
	}

	function validform1() {
		return $("#form1").validate({
			onfocusout: function (element) {
				$(element).valid();
			},
			rules: {
				surname: {
					required: true
				},
				name: {
					required: true
				},
				email: {
					required: true,
					email: true
				},
				idcard: {
					maxlength: 18,
					minlength: 18
				},
				phone: {
					required: true
				},
				qq: {
					digits: true
				}
			},
			messages: {
				idcard: {
					minlength: "应为18个字符",
					maxlength: "应为18个字符"
				}
			}
		});
	}
	$(validform1());

	function validform2() {
		return $("#form2").validate({
			onfocusout: function (element) {
				$(element).valid();
			},
			rules: {
				university: {
					required: true
				},
				major: {
					required: true
				},
				gre: {
					required: true
				},
				graduationYear: {
					required: true
				}
			}
		});
	}
	$(validform2());

	function validform3() {
		return $("#form3").validate({
			onfocusout: function (element) {
				$(element).valid();
			},
			rules: {
				personalProfile: {
					maxlength: 500
				}
			}
		});
	}
	$(validform3());

	$('#location').distpicker();

	let formData1 = {
	    classId: '',
	    productId: '',
	    surname: '',//姓
	    name: '',//名
	    nameUsedBefore: '',//曾用名
	    sex: 'male',//性别
	    birthday: '',//生日
	    idcard: '',//身份证号
	    maritalStatus: '单身',//婚姻状态
	    usVisa: 'B-1/B-2',//是否有美签
	    passportNo: '',//护照号
	    email: '',
	    phone: '',
	    qq: '',
	    wechat: '',
	    province: '',//省
	    city: '',//市
	    district: '',//区
	    homeAddress: '',
	    receivingAddress: '',//收件地址
	    workAddress: ''
	}

	let formData2 = {
	    tokenId: 0,
	    graduationYear: '',
	    university: '',
	    major: '',
	    gre: ''
	}

	let formData3 = {
	    tokenId: 0,
	    languageAchievement: '',
	    greAchievement: '',
	    workingLife: '',
	    personalProfile: '',//个人简介
	    source: '',//项目获知途径
	}

	//判断是页面应该显示第几步的表单
	let isEmail = window.location.hash.substr(1).split("&").indexOf('email=1');
	if (isEmail !== -1) {
		$('.con1').css('display', 'none');
		$('.con2').css('display', 'block');
	}

	//将课程id注册到表单要提交的数据中
	hashArr.forEach(ele => {
		if (ele.split('=').includes('tokenId')) {
			formData2.tokenId = ele.split('=')[1];
			formData3.tokenId = ele.split('=')[1];
		}
		if (ele.split('=').includes('classId')) {
			formData1.classId = ele.split('=')[1];
		}
		if (ele.split('=').includes('productId')) {
			formData1.productId = ele.split('=')[1];
		}
	});

	//初始化年份选择下拉框的option项
	addYear();

	$('.form1Input').blur(function (e) { 
	    e.preventDefault();
	    formData1[e.target.id] = e.target.value
	    if (e.target.id === 'province') {
	        formData1.city = '';
	        formData1.district = '';
	    }
	    if (e.target.id === 'city') {
	        formData1.district = '';
	    }
	    console.log(formData1)
	});

	if (!isMobile) {
		$('#birthday').datebox({
			onSelect: function (date) {
				var Year = 0;
				var Month = 0;
				var Day = 0;
				var CurrentDate = "";
				Year = date.getFullYear();
				Month = date.getMonth() + 1;
				Day = date.getDate();
				CurrentDate += Year + "-";
				if (Month >= 10) {
					CurrentDate += Month + "-";
				} else {
					CurrentDate += "0" + Month + "-";
				}
				if (Day >= 10) {
					CurrentDate += Day;
				} else {
					CurrentDate += "0" + Day;
				}
				formData1.birthday = CurrentDate;
				console.log(formData1)
			}
		});
	}

	//表单1提交
	$('#form1Submit').click(function (e) { 
		e.preventDefault();
		if (validform1().form()) {
			$.api.signUp(formData1, function (data) {
				console.log(data);
				if (data.errno == 0) { //如果请求成功就进入请查看邮件提示框页面
					$('.con1').css('display', 'none');
					$('.signUpTips1').css('display', 'block');
					$("html").scrollTop(0);
				} else {
					alert('错误')
				}
			});
		}
	});

	$('.form2Input').blur(function (e) {
	    e.preventDefault();
	    formData2[e.target.id] = e.target.value
	    console.log(formData2)
	});

	//表单2点击确定进入表单3
	$('#form2Submit').click(function (e) {
		e.preventDefault();
		if (validform2().form()) {
			$('.con2').css('display', 'none');
			$('.con3').css('display', 'block');
		}
	    console.log(formData2)
	});


	$('.form3Input').blur(function (e) {
	    e.preventDefault();
	    formData3[e.target.id] = e.target.value
	    console.log(formData3)
	});

	//表单3提交
	$('#form3Submit').click(function (e) {
		e.preventDefault();
		if (validform3().form()) { 
			$.api.active(Object.assign(formData2, formData3), function (data) {
				console.log(data);
				if (data.errno == 0) { //如果发送请求成功则进入提示框
					$('.con3').css('display', 'none');
					$('.signUpTips2').css('display', 'block');
				} else {
					alert('错误')
				}
			});
		}
	});

	//表单3点击取消返回表单2
	$('#pre').click(function (e) {
	    e.preventDefault();
	    $('.con3').css('display', 'none');
	    $('.con2').css('display', 'block');
	});

	// 监听change事件:
	$('#fileInput').on('change', function () {
	    console.log($('#fileInput')[0].files);//JQ对象转DOM对象，$('abc')[0]
	    $('#fileInfo').html('')
	    // 检查文件是否选择:
	    if (!$('#fileInput')[0].value) {
	        return;
	    }
	    // 获取File引用:
	    let file = $('#fileInput')[0].files[0];
	    //判断文件大小
	    let size = file.size;
	    if (size >= 3 * 1024 * 1024) {
	        alert('文件大于3兆不行!');
	        return false;
	    }
	    if (file.type !== 'application/pdf') {
	        alert('仅支持PDF格式文件');
	        return;
	    }
	    // 获取File信息:
	    $('#fileInfo').html('大小: ' + file.size / 1024 + 'KB')
	    $.api.upload($('#fileForm')[0], function(data) {
	    	formData2.scorePdfId = data.data.id;
	    })
	});

	function addYear() {
		let date = new Date();
		let y = date.getFullYear();
		if (y > 2019) {
			let diffY = y - 2019;
			for (let i = 0; i < diffY; i++) {
				let year = y + i + 1;
				let domOption = $("<option></option>");
				$(domOption).attr('value', year);
				$(domOption).text(year);
				$("#after").after(domOption);
			}
		}
	}
});

function myformatter(date) {
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	var d = date.getDate();
	return y + '-' + (m < 10 ? ('0' + m) : m) + '-' + (d < 10 ? ('0' + d) : d);
}

function myparser(s) {
	if (!s) return new Date();
	var ss = (s.split('-'));
	var y = parseInt(ss[0], 10);
	var m = parseInt(ss[1], 10);
	var d = parseInt(ss[2], 10);
	if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
		return new Date(y, m - 1, d);
	} else {
		return new Date();
	}
}