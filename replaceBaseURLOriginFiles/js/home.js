$(document).ready(function () {
    let isMobile = false;
    //判断用户设备
    (function () {
        if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
            isMobile = true;
            mobileConf();
        } else {
            isMobile = false;
        }
    })();

    function mobileConf() {
        //动态像素比设置
        let pixelRatio = 1 / window.devicePixelRatio;
        $("meta[name='viewport']").attr('content', "width=device-width,initial-scale=" + pixelRatio + ",minimum-scale=" + pixelRatio + ",maximum-scale=" + pixelRatio + ",user-scalable=no");
        //动态设置体大小
        $('html').css('font-size', $(window).width() / 16 + 'px');
    }

    hiddenShadow()

    //关于我们居中设置
    initAboutUsCss();
    function initAboutUsCss() {
        console.log($(window).width() / 2)
        console.log($('#aboutUs').outerWidth() / 2)
        let left = ($(window).width() / 2) - ($('#aboutUs').outerWidth() / 2);
        if (left < 0) {
            left = 0;
        };
        $('#aboutUs').css('left', left);
    }

    function showAboutUs() {
        $(document).scrollTop(50);
        $('#aboutUs').css('visibility', 'visible');
        $('.bg').css('visibility', 'visible');
    }

    $('.showAboutUs').click(function (e) {
        e.preventDefault();
        showAboutUs();
    });

    $('#hiddenAboutUs').click(function (e) {
        e.preventDefault();
        $('.bg').css('visibility', 'hidden');
        $("#aboutUs").css('visibility', 'hidden');
    });

    function hiddenShadow() {
        $('.videoBox').mouseover(function () {
            $(this).find('.shadow').css('visibility', 'hidden');
        });
        $('.videoBox').mouseout(function () {
            $(this).find('.shadow').css('visibility', 'visible');
        });
    }

    //其他页面点顶部导航栏中的关于我们
    let isAboutUs = window.location.hash.substr(1).split("&").indexOf('aboutUs=1');
    if (isAboutUs !== -1) {
        showAboutUs();
    }

});