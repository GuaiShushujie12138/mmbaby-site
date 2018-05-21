/*!  2017-05-11 */
try {
    !function () {
        function a() {
            a.called || (a.called = !0, Lsmain.UI.Viewport.toRender($("#banner")))
        }

        var b = new Lsmain.CookieParser(document.cookie);
        $(document.body).on("mouseenter.swiper", ".swiper-container", function () {
            $(this).find(".swipe-buttons").show();
            var a = $(this).data("swiper");
            a && a.stopAutoplay()
        }), $(document.body).on("mouseout.swiper", ".swiper-container", function (a) {
            if (!Lsmain.event.mouseTriggerOfChild(a)) {
                $(this).find(".swipe-buttons").hide();
                var b = $(this).data("swiper");
                b && b.startAutoplay()
            }
        }), $(document.body).on("click.swiper", ".swiper-container .prev,.swiper-container .next", function (a) {
            a.preventDefault();
            var b = $(this).parents(".swiper-container:eq(0)"), c = b.data("swiper");
            c && ($(this).is(".prev") ? c.swipePrev() : c.swipeNext())
        }), $("#homeCarousel").swiper({
            pagination: ".pagination",
            paginationClickable: !0,
            loop: !0,
            autoplay: 5e3,
            speed: 1e3,
            initialSlide: 0,
            onSlideChangeStart: a,
            autoplayDisableOnInteraction: !1
        }), $(window).scroll(function () {
            $(document).scrollTop() > 150 ? $(".search_mask_in").fadeIn() : $(".search_mask_in").fadeOut()
        }), $(".mask_sel").hover(function () {
            $(this).css("overflow", "visible"), $(this).find("li.two,li.three").show()
        }, function () {
            $(this).css("overflow", "hidden"), $(this).find("li.two,li.three").hide()
        }), $(".mask_sel li:not('.one')").hover(function () {
            $(this).addClass("cur").siblings("li").removeClass("cur")
        }, function () {
            $(".mask_sel li").removeClass("cur")
        });
        var c = ["面料", "辅料", "店铺"], d = 1;
        $(".mask_sel li:not('.one')").on("click", function (a) {
            $(this).siblings("li:first").text($(this).text()), $nowText = $(this).text(), $oneText = $(".mask_sel li.one").text();
            for (var b = 0; b < c.length; b++) c[b] == $nowText && (c.splice(b, 1), b--);
            $(".mask_sel li.two").text(c[0]), $(".mask_sel li.three").text(c[1]), c = ["面料", "辅料", "店铺"], "面料" == $(".mask_sel li.one").text() ? d = 1 : "辅料" == $(".mask_sel li.one").text() ? d = 2 : "店铺" == $(".mask_sel li.one").text() && (d = 3), $("#tabType").val(d)
        }), $(".mask_txt").focus(function (a) {
            $(this).siblings("span").hide()
        }), $(".mask_txt").blur(function (a) {
            "" == $(this).val() && $(".mask_search span").show()
        }), $(".mask_search span").click(function (a) {
            $(this).siblings(".mask_txt").focus()
        }), "" != $(".mask_txt").val() && $(".mask_search span").hide(), $(".mask_search_btn").on("click", function (a) {
            var b = $("#tabType").val(), c = $(".mask_sel ul li.one").text(),
                d = ($("#headerSearch1").attr("action"), $(this).siblings(".mask_txt"));
            "" == d.val() && (d.focus(), d.val(c), setTimeout(function () {
                d.val("")
            }, 100)), "3" == $("#tabType").val() ? $("#headerSearch1").attr("action", "/search/shop-keyword?") : $("#headerSearch1").attr("action", "/search/item-keyword?");
            var e = "";
            switch (Number(b)) {
                case 1:
                    e = "fabricSearch";
                    break;
                case 2:
                    e = "accessoriesSearch";
                    break;
                case 3:
                    e = "shopSearch"
            }
            VeniLog.log(3003, e), $("#headerSearch1").submit()
        }), $(".scroll").mouseenter(function (a) {
            clearInterval(timer), timer = null
        }).mouseleave(function (a) {
            clearInterval(timer), timer = setInterval(autoplay, 8e3)
        }), $(".toolbar_my").hover(function () {
            $(this).children(".toolbar_select").show()
        }, function () {
            $(this).children(".toolbar_select").hide()
        }), $(".dd_inner li").hover(function () {
            $(this).css("border-right", "none").siblings("li").css({
                "border-right": "1px solid #e74c3c",
                width: 139
            }), $(this).siblings("li.dd_li_first,li.dd_li_sec ").css({
                "border-right": "1px solid #e74c3c",
                width: 188
            }), $(this).addClass("hover").siblings("li").removeClass("hover"), $(this).children(".dorpdown_layer").show()
        }, function () {
            $(this).removeClass("hover"), $(this).css("border-right", "none").siblings("li").css({
                "border-right": "none",
                width: 140
            }), $(this).siblings("li.dd_li_first,li.dd_li_sec ").css({
                "border-right": "none",
                width: 189
            }), $(this).children(".dorpdown_layer").hide()
        }), $(".navitems_group li").hover(function () {
            $(this).children(".in_navitems_group").show(), $(this).find(".white_arr").hide().siblings(".gray_arr").show()
        }, function () {
            $(this).find(".white_arr").show().siblings(".gray_arr").hide(), $(this).children(".in_navitems_group").hide()
        }), $(".hot_fabric_tab li").on("mouseenter", function (a) {
            $(this).addClass("cur").siblings("li").removeClass("cur");
            var b = $(this).index(),
                c = $(this).parent().parent().parent(".hot_fabric_l_t").siblings().find(".hot_fabric_des").hide().eq(b);
            Lsmain.UI.Viewport.toRender(c), c.show()
        }), $(".hot_fabric_l_b .hover").on({
            hover: function () {
                $(this).children(".hot_fabric_txt").show()
            }, mouseleave: function () {
                $(this).children(".hot_fabric_txt").hide()
            }
        }), $(".market_r li").hover(function () {
            $(this).parents("ul").find("span").removeClass("cur"), $(this).children("span").addClass("cur")
        }), $(".m_content_arr_r").on("click", function (a) {
            $_t = $(this), $_index = $(this).siblings(".m_content_ad").attr("num"), $length = $_t.siblings(".m_content_ad").find("li").length, $_index++, $_index >= $length && ($_index = $length - 1), $_t.siblings(".m_content_ad").attr({num: $_index}), $_t.siblings(".m_content_ad").children("ul").stop().animate({left: -$(".m_content_ad ul li").width() * $_index}, 500)
        }), $(".m_content_arr_l").on("click", function (a) {
            $_t = $(this), $_index = $(this).siblings(".m_content_ad").attr("num"), $length = $_t.siblings(".m_content_ad").find("li").length, $_index--, $_index <= 0 && ($_index = 0), $_t.siblings(".m_content_ad").attr({num: $_index}), $_t.siblings(".m_content_ad").children("ul").stop().animate({left: -$(".m_content_ad ul li").width() * $_index}, 500)
        }), $(".skip_url").mouseenter(function (a) {
            $(this).parent(".login_in").addClass("current")
        }), $(".skip_url").mouseleave(function (a) {
            $(this).parent(".login_in").removeClass("current")
        }), $(".notice-box").show(), $(".icon-close").on("click", function () {
            $(".notice-box").hide(), b.setCookie("isCloseNotice", "true", null, "/")
        });
        var e = b.isCloseNotice;
        e && $(".notice-box").hide()
    }(), function () {
        function a() {
            this.init()
        }

        a.prototype.init = function () {
            this.start()
        }, a.prototype.initSwiper = function () {
            $("#hotTradeList .swiper-container").swiper({
                initialSlide: 0,
                mode: "vertical",
                autoplay: 3e3,
                speed: 1e3,
                setWrapperSize: !0,
                roundLengths: !0,
                slidesPerView: 4,
                slidesOffsetBefore: 1,
                loop: !0,
                noSwiping: !0,
                autoplayDisableOnInteraction: !1
            })
        }, a.prototype.start = function () {
            this.timer || (this.timer = Lsmain.Timer.interval(3e5), this.timer.iterator(this.getCall(this.refreshHotTradeList))), this.timer.start()
        }, a.prototype.stop = function () {
            this.timer && this.timer.stop()
        }, a.prototype.refreshHotTradeList = function () {
            this.getHotTradeList().complete(this.getCall(this.hotTradeListRender))
        }, a.prototype.getHotTradeList = function () {
            return this.get("/pay/trade/tradeRank")
        }, a.prototype.hotTradeListRender = function (a, b) {
            if (b = a || b, 1 == b.code && b.data.tradeRankList.length > 0) {
                var c = [], d = b.data.tradeRankList;
                c.push('<div class="swiper-container pk-height">'), c.push('<div class="hot_trade_scroll swiper-wrapper">');
                for (var e = 0, f = d.length; e < f; e++) c.push(this.createTradeListItem(d[e]));
                c.push("</div>"), c.push("</div>"), this.mySwiper && this.mySwiper.destroy(!0), $("#hotTradeList").html(c.join("\n")), this.initSwiper()
            }
        }, a.prototype.createTradeListItem = function (a) {
            var b = Lsmain.utils,
                c = ['<a class="swiper-slide clearfix" data-click-log="tradeList" href="/item/' + a.itemId + '" target="_blank">', '<dl class="clearfix">', "   <dt>", '       <img src="' + Lsmain.schemaUrl(a.img) + '">', "   </dt>", '   <dd><em class="left phone">' + b.htmlEncode(a.mobile) + "</em></dd>", '   <dd class="buy_info">购买【' + b.htmlEncode(a.itemName || "").substring(0, 6) + "...】</dd>", '   <dd>总额：<em class="money">￥' + Number(a.money).toFixed(2) + "</em></dd>", "</dl>", '<div class="trade_item_footer">', '   <div class="shop"><span class="line">&equiv;</span>' + b.htmlEncode(a.shopName) + "</div>", '   <div class="right time">' + Lsmain.date.format(a.time, "hh:mm") + "</div>", "</div>", "</a>"];
            return c.join("\n")
        }, Lsmain.UI.Viewport.on("hotTradeList", function () {
            LsPageClass.run(a, !1)
        })
    }(), function () {
        function a() {
        }

        function b(a, b, c) {
            var d = $(a);
            if (b > 1) {
                for (var e = [], f = "", g = 0, h = b; g < h; g++) f = 0 == g ? "swiper-visible-switch swiper-active-switch" : "", e.push('<li class="swiper-pagination-switch ' + f + '"></li>');
                d.find(".dot").html(e.join("\n")), d.swiper({
                    pagination: c,
                    paginationElement: "li",
                    paginationClickable: !0,
                    loop: !0,
                    autoplay: 4e3,
                    speed: 1e3,
                    initialSlide: 0
                })
            } else d.removeClass("swiper-wrapper").find(".prev,.next").remove()
        }

        a.prototype.start = function () {
            this.viewport("commonResource", this.commonAdvertisment), this.viewport("carouselResource", this.carouselAdvertisment1), this.viewport("carouselResource2", this.carouselAdvertisment2), this.viewport("carouselResource3", this.carouselAdvertisment3)
        }, a.prototype.viewport = function (a, b) {
            Lsmain.UI.Viewport.on(a, Lsmain.utils.getCall(this, b))
        }, a.prototype.getResource = function (a) {
            return $.ajax({
                type: "get",
                url: Lsmain.config.urlJoin("f2e-framework.advertUrl", a),
                dataType: "jsonp",
                jsonp: "jsoncallback"
            })
        }, a.prototype.commonAdvertisment = function () {
            this.getResource("/advpull/advs?slotId=2&keyWord=&jsoncallback=?").success(function (a) {
                var b, c, d = [];
                if (!a || a.length < 1) return $(".advert-pic").remove();
                for (var e = 0; e < a.length; e++) c = Lsmain.schemaUrl(a[e].imgUrl), b = ['<a data-click-log="advertPic" href="' + Lsmain.schemaUrl(a[e].linkUrl) + '" title="' + a[e].title + '" ><img src="' + c + ' "/> </a>'], d.push(b);
                $(".advert-pic").html(d.join("\n"))
            })
        }, a.prototype.carouselAdvertisment1 = function () {
            this.getResource("/advpull/advs?slotId=4&keyWord=&jsoncallback=?").success(function (a) {
                for (var c, d = [], e = 0; e < a.length; e++) c = Lsmain.schemaUrl(a[e].imgUrl), d.push(['<li class="swiper-slide">', '<a data-click-log="picFirst" href="' + Lsmain.schemaUrl(a[e].linkUrl) + '" title="' + a[e].title + '" >', '<img src="' + c + ' "/>', " </a>", "</li>"].join("\n"));
                $("#picsFirst .swiper-wrapper").html(d.join("\n")), b("#picsFirst", a.length, ".pagination1")
            })
        }, a.prototype.carouselAdvertisment2 = function () {
            this.getResource("/advpull/advs?slotId=5&keyWord=&jsoncallback=?").success(function (a) {
                for (var c, d = [], e = 0; e < a.length; e++) c = Lsmain.schemaUrl(a[e].imgUrl), d.push(['<li  class="swiper-slide">', '<a data-click-log="picSecond" href="' + a[e].linkUrl + '" title="' + a[e].title + '" >', '<img src="' + c + ' "/>', " </a>", "</li>"].join("\n"));
                $("#picsSecond .swiper-wrapper").html(d.join("\n")), b("#picsSecond", a.length, ".pagination2")
            })
        }, a.prototype.carouselAdvertisment3 = function () {
            // this.getResource("/advpull/advs?slotId=3&keyWord=&jsoncallback=?").success(function (a) {
            //     for (var c, d, e = [], f = 0; f < a.length; f++) d = Lsmain.schemaUrl(a[f].imgUrl), c = ['<li class="pk-list swiper-slide"><a data-click-log="goldBusinessmen" href="' + a[f].linkUrl + '"><div class="fine-accessories"><div class="pk-img"><img src="' + d + '"/></div><div><h2 class="pk-title">' + a[f].title + '</h2><span  class="pk-con">' + a[f].descript + "</span></a></li>"], e.push(c);
            //     $(".list-wrap").html(e.join("\n")), b("#listWrap", a.length, ".pagination3")
            // })
        }, (new a).start()
    }(), $(function () {
        Lsmain.UI.Viewport.start(), $(document).on("click", "#MEIQIA-BTN-HOLDER", function (a) {
            VeniLog.log(3003, "meiqia")
        }), $(".search_btn").click(function (a) {
            var b = $("#stype").val(), c = "";
            switch (Number(b)) {
                case 1:
                    c = "fabricSearch";
                    break;
                case 2:
                    c = "accessoriesSearch";
                    break;
                case 3:
                    c = "shopSearch"
            }
            VeniLog.log(3003, c)
        })
    })
} catch (ex) {
    window.console && console.error(ex), window.BJ_REPORT && BJ_REPORT.report(ex)
}

var $j=JQuery.noConflict();

/*JQuery(function() {
    // 判断客户是否登陆
    JQuery.post("ifLogin", function(data) {
        alert("data: " + data)
        if (data.code == 200 && data.data != null) {
            JQuery("#login-toolbar").css("display", "block");
            JQuery("#un-login-toolbar").css("display", "none");

            JQuery("#customer-name-a").innerHtml(data.data.customerName);
        } else {
            JQuery("#login-toolbar").css("display", "none");
            JQuery("#un-login-toolbar").css("display", "block");
        }
    });
});*/

