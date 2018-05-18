/*!  2017-05-11 */
try {
    $(function () {
        function a(a, b) {
            var c = 30, d = new Date;
            d.setTime(d.getTime() + 24 * c * 60 * 60 * 1e3), document.cookie = a + "=" + escape(b) + ";expires=" + d.toGMTString()
        }

        function b(a) {
            var b, c = new RegExp("(^| )" + a + "=([^;]*)(;|$)");
            return (b = document.cookie.match(c)) ? unescape(b[2]) : null
        }

        function c(a) {
            var c = new Date;
            c.setTime(c.getTime() - 1);
            var d = b(a);
            null != d && (document.cookie = a + "=" + d + ";expires=" + c.toGMTString())
        }

        function d() {
            b("phone") && $("#phoneInput").val(b("phone"))
        }

        $("#login-username,#slide-login-password,#reg-confirm-password,#reg-password,#phoneInput").focus(function () {
            var a = $(this);
            a.removeClass("login_list_error"), a.siblings().addClass("current"), a.is("#reg-password") && $(".phoneLoginDiv label[for='reg-password']").hide(), a.is("#reg-confirm-password") && $(".phoneLoginDiv label[for='reg-confirm-password']").hide()
        }).blur(function () {
            var a = $(this);
            a.siblings().removeClass("current"), a.is("#phoneInput") && $(".phoneLoginDiv .reg_mark,.phoneLoginDiv .reg_mark1").hide()
        });
        var e = function () {
            var a = $(".widgetPwd"), b = "true";
            return a.length > 0 && ($.each(a, function (a, c) {
                if ("false" === $(c).attr("checkrlt") && (b = "密码强度太弱,请重新设置"), $(c).val().length < 6) return void(b = "密码长度应为6-20位")
            }), 2 == a.length && "true" === b && $(a[0]).val() != $(a[1]).val() && (b = "两次输入密码不一致")), "true" === b || (Lsmain.tip.warning(b), !1)
        };
        $.validator.addMethod("reg-mobile-regex", function (a, b) {
            alert("进来了111!")
            return /^1\d{10}$/.test(a)
        }), $.validator.addMethod("password-regex", function (a, b) {
            alert("进来了222!")
            return /^[a-zA-Z0-9_-]{6,20}$/.test(a)
        }), $("#login-form").validate({
            onkeyup: !1,
            rules: {"login-username": {required: !0}, "slide-login-password": {required: !0}},
            messages: {"login-username": {required: "请输入用户名"}, "slide-login-password": {required: "请输入密码"}},
            errorClass: "login_list_error",
            errorLabelContainer: ".default_login_error",
            submitHandler: function (a) {
                var b = $("#login-btn");
                if (b.hasClass("btn_no")) return !1;
                b.addClass("btn_no").val("登录中...");
                var c = new Lsmain.UrlParserClass;
                c.parse(window.location.href);
                var d = c.paras, e = d.ls_activity_id, f = d.ls_source_id, g = d.ls_content, h = d.jumpTo, i = d.items;
                d.isStaging;
                $.post("/customer/login", {
                        customerName: $.trim($("#login-username").val()),
                        password: $.trim($("#slide-login-password").val()),
                        password: $("#slide-login-password").val(),
                        remember: $("#login-remember").val(),
                        ls_activity_id: e,
                        ls_source_id: f,
                        ls_content: g,
                        jumpTo: h
                }, function (a) {
                    if (1 == a.status || 200 == a.code)  location.href = "/"; else Lsmain.tip.warning(a.message);
                    $("#login-btn").removeClass("btn_no").val("登录")
                })
            }
        }), $(".tab li").on("click", function () {
            $(this).siblings().removeClass("liOnChange"), $(".line").removeClass("lineChange"), $(this).addClass("liOnChange"), $(this).children(".line").addClass("lineChange");
            var a = $(this).attr("class");
            /phoneLogin/.test(a) ? ($(".idLoginDiv").css("display", "none"), $(".phoneLoginDiv").css("display", "block")) : ($(".idLoginDiv").css("display", "block"), $(".phoneLoginDiv").css("display", "none"))
        }), $(".idLogin").on("click", function () {
            $(".fast_login_error").css("display", "none")
        }), $(".phoneLogin").on("click", function () {
            $("#login_error").css("display", "none")
        }), $(".btn_login").on("click", function () {
            $("label[for=phoneCode]").css("top", "65px"), $("label[for=login-password]").css("top", "65px")
        }), $("#get-vcode-btn-quick").sms({
            v: "v3", showMessage: function () {
            }, getHandler: function () {
                var a = $("#phoneInput");
                if ("" == a.val()) return $(".reg_mark").show().text("请输入手机号"), $(".phone-list .reg_error").hide(), !1;
                if (!/^1\d{10}$/.test($("#phoneInput").val())) return $(".reg_mark").show().text("手机号码错误，请重新输入"), !1;
                if (!a.is(".reg_list_error")) {
                    $("#get-vcode-btn-quick").html("请稍后...");
                    var a = $("#phoneInput");
                    return {data: {mobiles: $.trim(a.val()), act: 8}}
                }
            }
        }).sms("on", "complete", function (a, b) {
            return b = a || b, 1 != b.status ? void $(".reg_mark1").show().html(b.message) : void(1 == b.smsType ? ($(".smsType").addClass("none"), $("#register-login").addClass("none"), $("#phoneLogin-btn").removeClass("none").siblings("#register-login").addClass("none")) : ($(".smsType").removeClass("none"), $("#phoneLogin-btn").addClass("none").siblings("#register-login").removeClass("none")))
        }), $(".btn_code", ".phoneLoginDiv").on("mouseover mouseout", function (a) {
            var b = $(this);
            $("#phoneInput");
            "mouseover" == a.type ? b.css("background", "#E8E8E8") : "mouseout" == a.type && b.css("background", "#ECECEC")
        }), $("#phoneLogin-form").validate({
            onkeyup: !1,
            rules: {
                phoneInput: {required: !0},
                phoneCode: {required: !0},
                "reg-password": {required: !0},
                "reg-confirm-password": {required: !0},
                "company-name": {required: !0},
                "contact-name": {required: !0}
            },
            messages: {
                phoneInput: {required: "请输入手机号码"},
                phoneCode: {required: "请输入动态验证码"},
                "reg-password": {required: "请输入密码"},
                "reg-confirm-password": {required: "请重新输入密码"},
                "company-name": {required: "请输入公司名称"},
                "contact-name": {required: "请输入联系人"}
            },
            errorClass: "login_list_error",
            errorLabelContainer: ".fast_login_error",
            submitHandler: function (b) {
                var d = $("#phone-remember").val(), f = $(".smsType.none").length;
                if (0 == f) {
                    var g = $("#register-login");
                    if (!e()) return !1;
                    if ("0" == $("#reg-check-agreement").val()) return messager.error("请勾选用户协议！"), !1;
                    if (g.hasClass("btn_no")) return !1;
                    g.addClass("btn_no").val("注册并登录中..."), $.post("/user/register-confirm", {
                        data: {
                            mobile: $.trim($("#phoneInput").val()),
                            code: $.trim($("#phoneCode").val()),
                            password: $.trim($("#reg-password").val()),
                            repassword: $.trim($("#reg-confirm-password").val()),
                            contactName: $.trim($("#contact-name").val()),
                            companyName: $.trim($("#company-name").val())
                        }
                    }, function (b) {
                        1 == b.status ? (1 == d ? a("phone", $.trim($("#phoneInput").val())) : c("phone"), Lsmain.tip.success("恭喜您，注册成功"), location.href = b.data.url) : Lsmain.tip.warning(b.message), $("#register-login").removeClass("btn_no").val("注册并登录")
                    })
                } else if (1 == f) {
                    var h = $("#phoneLogin-btn");
                    if (h.hasClass("btn_no")) return !1;
                    h.addClass("btn_no").val("登录中..."), $.post("/user/do-quick-login", {
                        data: {
                            mobiles: $.trim($("#phoneInput").val()),
                            code: $.trim($("#phoneCode").val())
                        }
                    }, function (b) {
                        1 == b.status ? (1 == d ? a("phone", $.trim($("#phoneInput").val())) : c("phone"), location.href = b.data.url) : Lsmain.tip.warning(b.message), $("#phoneLogin-btn").removeClass("btn_no").val("登录")
                    })
                }
            }
        }), d(), $("#reg-agreement,.reg-agreement").on("click", function () {
            return $(".agreement").css("display", "block"), !1
        }), $("#agree-btn").on("click", function () {
            $(".agreement").css("display", "none"), $("#chAgree").attr("checked", !0), $(".check_l").addClass("check_g").parent().next().val("1")
        }), $(".agreement em").on("click", function () {
            $(".agreement").css("display", "none"), $("#lsMark").css("display", "none")
        }), $(".register").on("click", function () {
            var a = new Lsmain.UrlParserClass;
            a.parse(window.location.href);
            var b = a.paras, c = (b.ls_activity_id, b.ls_source_id), d = b.ls_content, e = b.jumpTo,
                f = window.location.href;
            if (f.indexOf("activity/springboard") >= 0) location.href = " /user/register?jumpTo=" + e + "&ls_source_id=" + c + "&ls_content=" + d; else if (f.indexOf("?") >= 0) {
                var g = f.split("?");
                location.href = "/user/register?" + g[1]
            } else location.href = "/user/register"
        })
    })
} catch (ex) {
    window.console && console.error(ex), window.BJ_REPORT && BJ_REPORT.report(ex)
}