$(document).ready(function () {
    //弹窗居中样式
    setTipsCss();

    function setTipsCss() {
        let left = $(window).width() / 2 - 318;
        let top = $(window).height() / 2 - 202;
        if (left < 0) {
            left = 0;
        };
        if (top < 0) {
            top = 0;
        };
        $('.tips').css('top', top);
        $('.tips').css('left', left);
    }

    $(window).resize(function () {
        setTipsCss();
    });

    //弹出弹窗
    $('.popup').click(function () {
        $('.bg').css('visibility', 'visible');
        $(".tips1").css('visibility', 'visible');
    });
    //关闭弹窗
    $('.close').click(function (e) {
        e.preventDefault();
        $('.bg').css('visibility', 'hidden');
        $(".tips").css('visibility', 'hidden');
    });
});