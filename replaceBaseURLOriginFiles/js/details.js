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
            let classId = window.location.hash.split("=")[1];
            mobileConf();
            addeventlistener(classId);
        }
     })();

    function mobileConf() {
        //动态像素比设置
        let pixelRatio = 1 / window.devicePixelRatio;
        $("meta[name='viewport']").attr('content', "width=device-width,initial-scale=" + pixelRatio + ",minimum-scale=" + pixelRatio + ",maximum-scale=" + pixelRatio + ",user-scalable=no");
        //动态设置体大小
        $('html').css('font-size', $(window).width() / 10 + 'px');
    }

    let classId = window.location.hash.split("=")[1];
    
    $.api.classInfo(classId, initClass)
    
    var openList = document.getElementsByClassName('open');
    for (var i = 0; i < openList.length; i++){
        openList[i].switch = false;
    }

    if (!isMobile) {
        initVideoBoxCss();

        setFixedBgCss();
        $(window).resize(function () {
            setFixedBgCss();
            initVideoBoxCss();
        });
    }

    function initVideoBoxCss() {
        let left = $(window).width() / 2 - $('#videoBox').outerWidth() / 2
        if (left < 0) {
            left = 0;
        }
        $('#videoBox').css('left', left);
    }

    function setFixedBgCss() {
        $('#fixedBg').css('height', $(window).height());
        $('#fixedBg').css('background-position-y', $(window).height() - 2160 + 'px');
    }

    $('.part1Icon').mouseover(function () {
        $('#showVideoBg').css('visibility', 'visible');
        $('#showVideo').css('visibility', 'visible');
    });

    $('#showVideo').mouseout(function () {
        $('#showVideoBg').css('visibility', 'hidden');
        $('#showVideo').css('visibility', 'hidden');
    });

    $('#showVideo').click(function (e) {
        if (isMobile) return false;
        e.preventDefault();
        $('#videoBox').css('visibility', 'visible');
        $('.bg').css('visibility', 'visible');
        
        switch (classId) {
            case "19_S_TALINN":
                $('#iframeVideo').attr('src', '//player.bilibili.com/player.html?aid=48795641&cid=85445787&page=1');
                break;
            case "19_S_NPU":
                $('#iframeVideo').attr('src', '//player.bilibili.com/player.html?aid=51785978&cid=90656997&page=1');
                break;
            case "19_S_NGC":
                $('#iframeVideo').attr('src', '//player.bilibili.com/player.html?aid=51783914&cid=90651695&page=1');
                break;
            case "19_SELF":
                $('#iframeVideo').attr('src', '//player.bilibili.com/player.html?aid=46786440&cid=81947864&page=1');
                break;
            default:
                console.log('没有视频地址')
        }
    });

    $('#closeVideo').click(function (e) {
        e.preventDefault();
        $("#videoBox").css('visibility', 'hidden');
        $('.bg').css('visibility', 'hidden');
        $('#iframeVideo').attr('src', '');
    });

    //移动端事件监听
    function addeventlistener(classId) {
        $('#backIndex').on('click', function () {
            window.location.replace("http://@baseurl/pages/home.html");
        });
        $('#showVideo').on('click', function () {
            if (classId === "19_S_TALINN") {
                window.location.replace("https://www.bilibili.com/video/av48795641");
            } else {
                window.location.replace("https://www.bilibili.com/video/av45046320?zw");
            }
        });
        $('#part1Footer').on('click', function () {
            $('#part1').removeClass('openPart1');
        });
        $('#part1Header').on('click', function () {
            $('#part1').addClass('openPart1');
        });
        $('.open').on('click', function (e) {
            e.preventDefault();
            console.log(this.switch)
            if (this.switch) {
                mobileShrink(this);
            } else {
                mobileOpen(this);
            }
            this.switch = !this.switch;
            console.log(this.switch)
        });
    }

    //课程内容初始化
    function initClass(data) {
        if (data.state) {
            if (classId === "19_ISART_EXAM") {
                $('#state').text('报名中')
            } else {
                $('#state').text('众筹中')
            }
            $('#daysRemaining').text(data.daysRemaining);
        } else {
            $('#part1Header').removeClass("part1HeaderActive");
            $('#part1Header').text("报名已结束")
            $('#part1Footer').removeClass("part1HeaderActive");
            $('#state').text('已关闭')
            $('.days').css('visibility', 'hidden');
            if (isMobile) {
                $('.signUpBtn').css('background-color', '#929292');
                $('.signUpBtn').css('color', '#b6b6b6');
                $('.signUpBtn').text('报名已结束');
                return false;
            };
            $('.signUpBtn').attr('href', 'javascript:;');
            $('.signUpBtn').css('background-position-y', '-60px');
            $('.signUpBtn').click(function (e) {
                e.preventDefault();
                $('.bg').css('visibility', 'visible');
                $(".tips2").css('visibility', 'visible');
            });
        }
    }

    //移动课程内容展开
    function open(target) {
        $(target).next().css('height', 'auto');
        $(target).children("div").removeClass('liAIcon1');
        $(target).children("div").addClass('liAIcon2');
    }

    //移动课程内容收缩
    function shrink(target) {
        $(target).next().css('height', '0');
        $(target).children("div").removeClass('liAIcon2');
        $(target).children("div").addClass('liAIcon1');
    }

    //移动课程内容端展开
    function mobileOpen(target) {
        console.log($(target))
        console.log($(target).next())
        $(target).next().css('height', 'auto');
        $(target).children("div").removeClass('mobileCourseOpen');
        $(target).children("div").addClass('mobileCourseClose');
    }

    //移动课程内容收缩
    function mobileShrink(target) {
        $(target).next().css('height', '0');
        $(target).children("div").removeClass('mobileCourseClose');
        $(target).children("div").addClass('mobileCourseOpen');
    }

    if (!isMobile) {
        $('.open').on('click', function (e) {
            e.preventDefault();
            if (this.switch) {
                shrink(this);
            } else {
                open(this);
            }
            this.switch = !this.switch;
        });
    }
});