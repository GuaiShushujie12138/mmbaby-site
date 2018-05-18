/*!  2017-04-14 */
try {
    $(function () {
        var a = function () {
            var a = $(".widgetPwd"), b = "true";
            return a.length > 0 && ($.each(a, function (a, c) {
                return "false" === $(c).attr("checkrlt") && (b = "密码强度太弱,请重新设置"), $(c).val().length < 6 ? void(b = "密码长度应为6-20位") : void 0
            }), 2 == a.length && "true" === b && $(a[0]).val() != $(a[1]).val() && (b = "两次输入密码不一致")), "true" !== b ? (Lsmain.tip.warning(b), !1) : !0
        };
        $.validator.addMethod("reg-mobile-regex", function (a, b) {
            return /^1\d{10}$/.test(a)
        }), $.validator.addMethod("password-regex", function (a, b) {
            return /^[a-zA-Z0-9_-]{6,20}$/.test(a)
        }), $("#reg-password,#reg-confirm-password,#reg-mobile").focus(function () {
            var a = $(this);
            a.removeClass("login_list_error"), a.siblings().addClass("current"), a.is("#reg-password") && $(".reg-form label[for='reg-password']").hide(), a.is("#reg-confirm-password") && $(".reg-form label[for='reg-confirm-password']").hide()
        }).blur(function () {
            var a = $(this);
            a.siblings().removeClass("current"), a.is("#reg-mobile") && ($(".reg-form .reg_mark,.reg-form .reg_mark1").hide(), $(".right.tel").removeClass("success"))
        });
        var b = new Lsmain.UrlParserClass;
        b.parse(window.location.href);
        var c = b.paras, d = c.ls_source_id, e = c.ls_activity_id, f = c.ls_content, g = c.jumpTo, h = c.items;
        c.isStaging;
        $("#reg-form").validate({
            onkeyup: !1,
            rules: {
                "reg-mobile": {required: !0},
                "reg-vcode": {required: !0},
                "customerName": {required: !0},
                "reg-password": {required: !0},
                "reg-confirm-password": {required: !0},
                "email": {required: !0},
                "address": {required: !0}
            },
            messages: {
                "reg-mobile": {required: "请输入手机号"},
                "reg-vcode": {required: "请输入验证码"},
                "customerName": {required: "请输入客户名称"},
                "reg-password": {required: "请输入密码"},
                "reg-confirm-password": {required: "请输入确认密码"},
                "email": {required: "请输入邮箱"},
                "address": {required: "请输入地址信息"}
            },
            errorClass: "reg_list_error",
            errorLabelContainer: ".fast_login_error",
            submitHandler: function (b) {
                if (!a()) return !1;
                if ("0" == $("#reg-check-agreement").val()) return Lsmain.tip.warning("请勾选用户协议！"), !1;
                var c = $("#reg-btn");
                return c.hasClass("btn_no") ? !1 : (c.addClass("btn_no").val("注册中..."), void $.post("/customer/register", {
                        mobile: $.trim($("#reg-mobile").val()),
                        password: $.trim($("#reg-password").val()),
                        repassword: $.trim($("#reg-confirm-password").val()),
                        code: $.trim($("#reg-vcode").val()),
                        customerName: $.trim($("#customerName").val()),
                        address: $.trim($("#address").val()),
                        email:$.trim($("#email").val()),
                        ls_source_id: d,
                        ls_activity_id: e,
                        ls_content: f,
                        jumpTo: g
                }, function (a) {
                    if (200 == a.code) if (Lsmain.tip.success("恭喜您，注册成功")) location.href = "/login"; else if (e) location.href = "/login" + e; else if (a.data.url.indexOf("pay/order/buyNow") >= 0) {
                        var b = h,
                            i = $('<form action="/pay/order/buyNow" method="post"><input type="hidden" name="items" value="" /></form>');
                        $(document.body).append(i), i.find("[name=items]").val(b), i.submit()
                    } else a.data.url.indexOf("activity/springboard") >= 0 ? location.href = " /" + g + "&ls_source_id=" + d + "&ls_content=" + f : location.href = a.data.url; else Lsmain.tip.warning(a.message), $("#get-vcode-btn").html("获取短信校验码").removeAttr("style");
                    c.removeClass("btn_no").val("立即注册")
                }))
            }
        }), $("#get-vcode-btn").sms({
            v: "v3", showMessage: function () {
            }, getHandler: function () {
                var a = $("#reg-mobile");
                return $(".reg-form label[for='reg-mobile']").hide(), "" == a.val() ? ($(".reg_mark").show().text("请输入手机号"), $(".phone-list .reg_error").hide(), !1) : /^1\d{10}$/.test($("#reg-mobile").val()) ? a.is(".reg_list_error") ? void 0 : {
                    data: {
                        mobiles: $.trim(a.val()),
                        act: 1
                    }
                } : ($(".reg_mark").show().text("手机号码错误，请重新输入"), !1)
            }
        }).sms("on", "complete", function (a, b) {
            return b = a || b, 1 != b.status ? void $(".reg_mark1").show().html(b.message) : void $(".right.tel").addClass("success")
        }), $("#reg-agreement,.reg-agreement").on("click", function () {
            return $(".agreement").css("display", "block"), !1
        }), $("#agree-btn").on("click", function () {
            $(".agreement").css("display", "none"), $("#chAgree").attr("checked", !0), $(".check_l").addClass("check_g").parent().next().val("1")
        }), $(".agreement em").on("click", function () {
            $(".agreement").css("display", "none"), $("#lsMark").css("display", "none")
        }), $(".close-btn").on("click", function () {
            $(".agreement").css("display", "none")
        })
    })
} catch (ex) {
    window.console && console.error(ex), window.BJ_REPORT && BJ_REPORT.report(ex)
}
