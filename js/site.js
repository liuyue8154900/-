(function (window) {
    var promptWindow = $("#promptWindow");
    var yesBtn = promptWindow.find("button.yesBtn");
    var noBtn = promptWindow.find("button.noBtn");
    var imgBtn = promptWindow.find("img.imgBtn");


    var show = function (message, yes, no) {
        // 显示内容
        var img = $("<img>").attr("src", "/demand_static/images/1_003.png");
        var p = $("<p>").append(img).append(message);
        promptWindow.find("div.warning_con").html(p);

        // 绑定确定事件
        if (yes !== undefined && yes !== null && typeof (yes) === "function") {
            yesBtn.one("click", yes);
        }

        // 绑定取消事件
        if (no !== undefined && no !== null && typeof (no) === "function") {
            noBtn.one("click", no);
        }

        promptWindow.show();
    };

    var hide = function () {
        promptWindow.hide();
    };

    var unbind = function () {
        yesBtn.unbind();
        noBtn.unbind();
    };

    var bind = function () {
        yesBtn.click(hide);
        noBtn.click(hide);
    };

    window.eClose = function () {
        hide();
        unbind();
        bind();
    };

    window.eAlert = function (message, yes) {
        show(message, yes);
    };

    window.eConfirm = function (message, yes, no) {
        show(message, yes, no);
    };

    imgBtn.click(eClose);
    bind();
})(window);