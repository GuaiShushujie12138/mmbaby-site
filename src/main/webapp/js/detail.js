/*!  2017-11-03 */
try {
    $(function () {

        // 获取当前的商品详细信息
        $.get("query-product", function(data) {
            if (data.code == 200 && data.data != null) {
                $("#item_name").html(data.data.name);
                $("#price").html("￥" + data.data.price);
                $("#inventory").html(data.data.inventory);
                $("#sales").html(data.data.sales);
                $("#big_image").attr("src", data.data.pic);
                $("#big_image").attr("alt", data.data.name);
                $("#small_image").attr("src", data.data.pic);
                $("#small_image").attr("alt", data.data.name);
                $("#fbig").attr("src", data.data.pic);
            } else {
                alert("商品不存在!")
            }


        function a(a) {
            return $(a.srcElement || a.target).is(".color-holder-img")
        }

        function b(a) {
            var b = $(".img_big [data-holder]"), c = new Image;
            return $(".img_big img").hide(), a ? (b.length < 1 && (b = $('<img data-holder="img" class="color-holder-img"/>'), $(".img_big").append(b)), c.src = a, b.show().attr("src", a), b.height(c.height > 360 ? 360 : c.height), void b.width(c.width > 360 ? 360 : c.width)) : ($(".img_big .cur").show(), b.remove())
        }

        function c(a, b) {
            var c = a.siblings(".stock_i"), d = parseFloat(c.val()), e = parseFloat(c.attr("maxnum")),
                f = parseFloat(c.attr("minnum"));
            1 == b ? d++ : d--, d < 1 && (d = 1);
            var g = d;
            e ? d > e ? g = e : d < f && (g = f) : g = d < f ? f : d;
            var h = skuCaculater.sync(g, !0);
            if (h.r) {
                var b = $(".cloth_typea1.current").data("decimal");
                1 == b && (g = g.toFixed(2)), c.val(g)
            } else Lsmain.tip.warning(h.message)
        }

        function d() {
            var a = $(".cloth_typea1.current");
            if (a.length < 1) return f("请选择商品类型", !0);
            var b = a.data().id, c = skuCaculater.sku;
            if (1 == b || e()) {
                if (null == c) return f("请选择要购买的商品", !0);
                var d = {
                    itemId: $("#itemId").attr("uid"),
                    skuId: c.skuId,
                    itemTypeId: b,
                    quantity: $(".item_quantity").val()
                };
                return d
            }
        }

        function e() {
            for (var a = $("#skuProps [data-property]"), b = null, c = !0, d = null, e = 0, g = a.length; e < g; e++) {
                d = a.eq(e).children("span").html();
                var h = [];
                h = d.split("：");
                var i = h[0];
                if (b = a.eq(e), b.find(".current").length < 1) {
                    c = !1, f("请选择" + i, !0);
                    break
                }
            }
            return c
        }

        function f(a, b) {
            b ? Lsmain.tip.warning(a) : Lsmain.tip.success(a)
        }

        var g = new ShoppingCart, h = 0;
        $(".img_small").on("click", "img", function () {
            var a = $(this);
            a.addClass("current").siblings("img").removeClass();
            var c = a.index();
            a.parents(".img_small").prev().find("img").eq(c).addClass("cur").siblings("img").removeClass(), a.parents(".img_small").next().find("img").eq(c).show().siblings("img").hide(), $(".bu-cloth").removeClass("current"), h = c, b()
        });
        var i = 0, j = 0, k = 300, l = $(".img_small_content img").length;
        l <= 4 ? $(".detail_btnR,.detail_btnL").hide() : ($(".detail_btnR,.detail_btnL").show(), $(".detail_btnR").click(function (a) {
            i++, j = $(".img_small_content img").length, i <= j - 4 ? ($stepLen = -85 * i, $(this).siblings(".img_small").children(".img_small_content").animate({left: $stepLen}, k)) : i = j - 4
        }), $(".detail_btnL").click(function (a) {
            i--, j = $(".img_small_content img").length, i < 0 ? (i = 0, $(this).siblings(".img_small").children(".img_small_content").animate({left: "0"}, k)) : ($stepLen = -85 * i, $(this).siblings(".img_small").children(".img_small_content").animate({left: $stepLen}, k))
        }));
        var m = 0, n = 0, o = 0, p = 0;
        $(".img_big").children().bind("mouseenter", function (b) {
            a(b) || $(".f_mask,.f_big").show()
        }), $(".img_big").children().bind("mouseleave", function (b) {
            a(b) || $(".f_mask,.f_big").hide()
        }), $(".img_big").children().bind("mousemove", function (b) {
            if (!a(b)) {
                $(".bu-cloth").is(".current"), m = b.pageX - $(".img_big").offset().left - $(".f_mask").width() / 2, n = b.pageY - $(".img_big").offset().top - $(".f_mask").height() / 2, m > 185 ? m = 185 : m < 0 && (m = 0), n > 185 ? n = 185 : n < 0 && (n = 0), $(".f_mask").css({
                    left: m,
                    top: n
                });
                var c = $(".f_big img").eq(h).width(), d = $(".f_big img").eq(h).height();
                o = -m * c / 338, p = -n * d / 338, $(".f_big img").eq(h).css({
                    "min-width": 800,
                    "min-height": 800,
                    "margin-top": p,
                    "margin-left": o
                })
            }
        }), cur1 = $(".img_big").find(".cur2").attr("src");
        var q = 0;
        $(".bu-cloth").click(function () {
            if (!$(this).is(".disabled")) {
                q = $(this).index();
                var a = $(this).children("img").attr("src");
                $(this).parent("ul").find("img").hide(), $(".img_big").find(".cur").removeClass("cur1"), $(".img_big").find(".cur").attr("src", cur1), $(".img_big").find(".cur").attr("src", cur1), b(a), $(this).siblings().removeClass("current").find("em").removeClass("cur_color"), $(this).is(".current") && b(null)
            }
        }), $(".cloth_typea1").click(function () {
            if ($(this).hasClass("current")) return !1;
            $(this).toggleClass("current").find("em").toggleClass("cur"), $(this).parent().siblings().children(".cloth_typea1").removeClass("current").find("em").removeClass("cur");
            var a = $(this).data(), b = 1 == a.id ? "立即调样" : "立即购买", c = a.decimal;
            if ($(".buyNow").html(b), $(this).is(".current")) if (1 == c) {
                $(".stock-in").find(".decimal").show(), $(".stock-in").find(".nodecimal").hide();
                var d = $(this).data().min || 1;
                d = Number(d).toFixed(2), $(".item_quantity").val(d)
            } else {
                $(".stock-in").find(".decimal").hide(), $(".stock-in").find(".nodecimal").show();
                var d = $(this).data().min || 1;
                $(".item_quantity").val(d)
            }
            skuCaculater.refreshStock()
        }), $(".remarks").hover(function () {
            $(this).find("p").toggleClass("none")
        }), $(".selling_pic").bind("click", function (a) {
            var c = $(this).attr("src");
            b(c)
        }), $(".stock_top").on("click", function () {
            c($(this), 1), calTotalPrice()
        }), $(".stock_down").on("click", function () {
            c($(this), 2), calTotalPrice()
        }), $(".item_quantity").change(function () {
            var a = 0;
            a = "none" == $(".item_quantity").eq(0).css("display") ? $(".item_quantity").eq(1).val() : $(".item_quantity").eq(0).val(), skuCaculater.sync(a, !1), calTotalPrice()
        }), $(".item_quantity").keyup(function () {
            calTotalPrice()
        }), $(".shopingCar").on("click", function (a) {
            var b = $(this);
            if (!b.is(".disabled")) {
                var c = d();
                null != c && g.ajaxAddCart(c, b.offset())
            }
        }), $(".buyNow").on("click", function (a) {
            if (!$(this).is(".disabled")) {
                var b = d();
                if (null != b) {
                    var c = JSON.stringify([b]),
                        e = $('<form action="/pay/order/buyNow" method="post"><input type="hidden" name="items" value="" /></form>');
                    $(document.body).append(e), e.find("[name=items]").val(c), e.submit()
                }
            }
        }), $(".login_ing").on("click", function () {
            LS.dialog.login()
        }), $(".goods_right_title li").click(function () {
            var a = $(this).index();
            $(this).addClass("current").siblings().removeClass("current"), $(this).parent().siblings("div:eq(" + a + ")").show().siblings("div").hide()
        }), $(".goods_collect").on("click", function () {
            var a = $(this);
            if (void 0 == a.attr("status")) {
                var b = {objectId: a.attr("uid"), type: "3" == a.attr("type") ? "SHOP" : "ITEM"};
                $.ajax({
                    url: "/favorites/favoritesSave",
                    type: "post",
                    data: JSON.stringify(b),
                    contentType: "application/json",
                    dataType: "json",
                    success: function (b) {
                        0 == b.code ? (f("成功加入收藏夹"), a.addClass("have_saved").attr("status", "y")) : LS.user.token ? f(b.message, !0) : LS.dialog.login()
                    }
                })
            }
        }), $("#item_qr_box").hover(function () {
            $(this).children("#itemQRCode").toggle()
        }), $(".dtail_cn_ul li:odd").css("background", "white"), $(".question").mouseover(function () {
            $(".yfsm").css("display", "block")
        }), $(".question").mouseout(function () {
            $(".yfsm").css("display", "none")
        }), $(".order_eval_article textarea").keyup(function () {
            var a = $(this).val().length, b = 150 - a;
            $(this).siblings().find(".num_tol").text(b)
        })
    }), function () {
        $(function () {
            function a(a) {
                var b = $(a), d = b.data("avgStar"), f = b.data("totalPage");
                return c.find(".eval_list").empty().append(b), c.find("#commentStartNum").html(d), c.find(".order_eval_star .act").removeClass("act"), $("#commentTotalCount").html("(" + b.data("totalCount") + ")"), e && $(document.body).scrollTop($(".goods_right").offset().top), e = !0, {
                    rows: a,
                    pages: f
                }
            }

            function b() {
                var a = $(this);
                a.is(".cur") || (c.find(".left .cur").removeClass("cur"), a.addClass("cur"), f.queryParams.itemType = a.data("itemType"), d.pagination("initParam", 1, f.size, f.queryParams))
            }

            var c = $("#goods_evaluation"), d = c.find(".eval_pagination"), e = !1, f = {
                url: "/pay/trade/comment/commentList",
                size: 1,
                ajax: !0,
                dataType: "text",
                formatter: a,
                queryParams: {itemId: c.data("id"), itemType: 0}
            };
            d.pagination(f), c.on("click.comment", "[data-comment]", b)
        })
    }(), function (a) {
        function b() {
        }

        function c() {
            $(".cloth_type").find("[data-id]:last").click(), $("[data-property]").eq(0).find("[data-property-id]:first").click(), $("[data-property]:gt(0)").each(function () {
                $(this).find("[data-property-id]").not(".disabled").eq(0).click()
            }), $(".calTatalPrice").on("change", calTotalPrice)
        }

        function d() {
            var a = $("#skuProps").find("[data-property]"), b = [];
            return a.each(function () {
                var a = $(this).data();
                b.push(a.property)
            }), b
        }

        function e() {
            var a = $(this);
            j(), g(a) && (r($(this)), j(), i())
        }

        function f(a) {
            i(this), h(), o(this), q()
        }

        function g(a) {
            if (a.is(".disabled")) return a.removeClass("current"), !1;
            var b = a.is(".current") ? "removeClass" : "addClass", c = a.parents("[data-property]").find(".current");
            return c.removeClass("current").find("em").removeClass("cur"), a[b]("current"), a.find("em")[b]("cur"), !0
        }

        function h() {
            var a = n();
            1 == a.type ? (skuCaculater.clear(), skuCaculater.sku = skuCaculater.cardColor, $(".dtail_c_dl").find("[data-value-id]").addClass("disabled"), $(".dtail_c_dl").find(".current[data-value-id]").removeClass("current")) : skuCaculater.sku == skuCaculater.cardColor && (skuCaculater.clear(), $(".dtail_c_dl").find("[data-value-id]").removeClass("disabled"))
        }

        function i() {
            var a = k($(".item_quantity").val());
            !a.r && a.message && Lsmain.tip.warning(a.message)
        }

        function j() {
            var a = skuCaculater.sku, b = $(".cloth_typea1.current").data("decimal");
            if (a) {
                a.stock || 1;
                $("#largeCargoMoq").parents(".cloth_typea1:eq(0)").data("min", a.moq), $("#largeCargoMoq").html(a.moq);
                var c = $(".cloth_typea1.current").attr("data-id");
                if (1 == c) $(".item_quantity").val(1); else if (2 == c) $("#price").html(w(a.swatchPrice)), $(".item_quantity").val($(".cloth_typea1.current").attr("data-min")); else {
                    $("#price").html(w(a.largeCargoPrice));
                    var d = a.moq;
                    1 == b && (d = Number(d).toFixed(2)), $(".item_quantity").val(d), $("#limit p.large").show()
                }
            }
            calTotalPrice(), p()
        }

        function k(a, b) {
            var c = skuCaculater.sku || {largeCargoStock: null}, d = n(), e = {r: !0, message: ""}, f = !0;
            switch (a = isNaN(a) ? 0 : a, d.type) {
                case 1:
                    e = l(d.stock, a, d, b);
                    break;
                case 2:
                    e = l(null, a, d, b);
                    break;
                case 3:
                    e = l(c.largeCargoStock, a, d, b, f);
                    break;
                default:
                    $(".shopingCar,.buyNow").removeClass("disabled"), $(".stock_text").hide()
            }
            return e
        }

        function l(a, b, c, d, e) {
            var f = {r: !0, message: ""}, g = null == b ? Number($(".item_quantity").val() || 0) : b;
            return a && g > a ? f = {r: !1, message: "库存不足"} : c.max != -1 && g > c.max ? f = {
                r: !1,
                message: "购买数量不能大于最大购买量:" + c.max
            } : g < c.min ? f = {
                r: !1,
                message: "购买数量不能小于最小起订量:" + c.min
            } : b <= 0 && (f = {r: !1}), m(f.r), d && !f.r && (f.r = !0), a ? (1 == $(".cloth_typea1.current").data("decimal") && (a = Number(a).toFixed(2)), $(".stock_text").show().find("#stockNum").html('库存：<label class="stock_num">' + a + c.unit + "</label> ")) : $(".stock_text").hide().find("#stockNum").html(""), 0 == a ? ($(".detail_top .buy_in .buy_clo").addClass("gray"), $(".stock_text").show().find("#stockNum").html('<label class="stock_num" style="color: #E74C3C">已售罄</label> ')) : $(".detail_top .buy_in .buy_clo").removeClass("gray"), f
        }

        function m(a) {
            var b = $("#isSelfShop").val();
            a && "" == b ? $(".shopingCar,.buyNow").removeClass("disabled") : $(".shopingCar,.buyNow").addClass("disabled")
        }

        function n() {
            var a = $(".cloth_type .current").data() || {};
            return {type: a.id, min: a.min, max: a.max, unit: a.unit, stock: a.stock}
        }

        function o(a) {
            for (var b = [], c = [], d = skuCaculater.getSkuList(a), e = null, f = null, g = null, h = null, i = 0, j = d.length; i < j; i++) sku = d[i], b.push(sku.swatchPrice), c.push(sku.largeCargoPrice);
            e = Math.min.apply(this, b), f = Math.max.apply(this, b), g = Math.min.apply(this, c), h = Math.max.apply(this, c);
            var k = n();
            1 == k.type ? ($("#price").hide(), $("#swatchPriceUnit,#largeCargoPriceUnit").hide(), $("#priceCard").show(), $("#limit p,.negotiable").hide(), $("#limit p.condition").show()) : 2 == k.type ? ($("#price").show().html(w(e, f)), $("#priceCard").hide(), $("#swatchPriceUnit,#largeCargoPriceUnit").hide(), $("#swatchPriceUnit").show(), $("#limit p,.negotiable").hide(), $("#limit p.range").show()) : 3 == k.type && ($("#price").show().html(w(g, h)), $("#priceCard").hide(), $("#swatchPriceUnit,#largeCargoPriceUnit").hide(), $("#largeCargoPriceUnit,.negotiable").show(), $("#limit p").hide()), calTotalPrice(), p()
        }

        function p() {
            var a = $(".selling-status.current"), b = a.length;
            $(".isfutures").show();
            for (var c = 0; c < b; c++) {
                var d = a.eq(c).text();
                d.indexOf("期货") > -1 && $(".isfutures").hide()
            }
        }

        function q() {
            var a = skuCaculater.sku;
            if (a) {
                var b = $(".cloth_typea1.current").attr("data-id");
                if (1 == b) ; else if (2 == b) $("#price").html(w(a.swatchPrice)), $(".item_quantity").val($(".cloth_typea1.current").attr("data-min")); else if (3 == b) {
                    var c = $(".cloth_typea1.current").data("decimal"), d = a.moq;
                    $("#price").html(w(a.largeCargoPrice)), 1 == c && (d = Number(d).toFixed(2)), $(".item_quantity").val(d), $("#limit p.large").show()
                }
            }
            calTotalPrice(), p()
        }

        function r() {
            var a = t(), b = $("#skuProps").find("[data-property]");
            $("#skuProps").find(".disabled").removeClass("disabled"), skuCaculater.sku = skuCaculater.get(a), b.each(function () {
                var b = ($(this), $(this).find("[data-value-id]"));
                b.each(function () {
                    var b = $(this), c = s(a, b);
                    skuCaculater.contains(c) ? b.removeClass("disalbed") : (b.addClass("disabled"), b.removeClass("current").find("em").removeClass("cur"))
                })
            }), o(a)
        }

        function s(a, b) {
            var c = u(b), d = {};
            for (var e in a) d[e] = a[e];
            return d[c.propertyId] = c, d
        }

        function t() {
            var a = $("#skuProps").find("[data-property] .current"), b = {};
            return a.each(function () {
                var a = u(this);
                b[a.propertyId] = a
            }), b
        }

        function u(a) {
            var b = $(a), c = b.data();
            return {propertyId: c.propertyId, valueId: c.valueId}
        }

        function v() {
            var a = w(skuCaculater.minClothsPrice, skuCaculater.maxClothsPrice),
                b = w(skuCaculater.minLargeCargoPrice, skuCaculater.maxLargeCargoPrice);
            $("#swatchPrice").html(a), $("#largeCargoPrice").html(b)
        }

        function w(a, b) {
            return 1 === arguments.length ? Number(a || 0).toFixed(2).toString() : (Number(a || 0).toFixed(2) + " - " + Number(b || 0).toFixed(2)).toString()
        }

        b.prototype.cardColor = {skuId: 0}, b.prototype.sku = null, b.prototype.init = function (a, b) {
            if (null == b) throw new Error("请设置排序属性键列表");
            this.skuList = a, this.orderKeys = b, this.skuMap = this.initSkuQuickMap(a), this.allKeys = Lsmain.utils.getKeys(this.skuMap), this.studyMap = {}, this.initPriceRange()
        }, b.prototype.initSkuQuickMap = function (a) {
            var b, c = {};
            a = Lsmain.array.ensureArray(a);
            for (var d = 0, e = a.length; d < e; d++) {
                b = a[d];
                var f = b.propValuesMap = this.map(b.propertyList);
                c[this.skuMapKey(f)] = b
            }
            return c
        }, b.prototype.skuMapKey = function (a) {
            for (var b, c = this.orderKeys, d = [], e = 0, f = c.length; e < f; e++) b = a[c[e]], b ? d.push(b.valueId) : d.push("(|-)\\d+");
            return d.join(";")
        }, b.prototype.get = function (a) {
            var b = this.skuMapKey(a);
            return this.skuMap[b]
        }, b.prototype.contains = function (a) {
            if (null == a) throw new Error("请传入属性搜索字典");
            var b = this.skuMapKey(a);
            return this.studyMap[b] !== !1 && (!!this.studyMap[b] || (!!this.skuMap[b] || this.record(b)))
        }, b.prototype.getSkuList = function (a) {
            for (var b, c = this.allKeys, d = this.skuMap, e = this.skuMapKey(a), f = new RegExp(e), g = [], h = 0, i = c.length; h < i; h++) b = c[h], f.test(b) && g.push(d[b]);
            return g
        }, b.prototype.record = function (a) {
            for (var b = this.allKeys, c = new RegExp(a), d = !1, e = 0, f = b.length; e < f; e++) if (c.test(b[e])) {
                d = !0;
                break
            }
            return this.studyMap[a] = d, d
        }, b.prototype.map = function (a) {
            return Lsmain.array.mapDictionary(a, "propertyId")
        }, b.prototype.initPriceRange = function () {
            for (var a, b = [], c = [], d = this.skuList, e = 0, f = d.length; e < f; e++) a = d[e], b.push(a.swatchPrice), c.push(a.largeCargoPrice);
            this.minClothsPrice = Math.min.apply(this, b), this.maxClothsPrice = Math.max.apply(this, b), this.minLargeCargoPrice = Math.min.apply(this, c), this.maxLargeCargoPrice = Math.max.apply(this, c)
        }, b.prototype.clear = function () {
            this.sku = null
        }, b.prototype.refreshStock = i, b.prototype.sync = function (a, b) {
            return k(a, b)
        }, window.skuCaculater = new b, $(function () {
            var a = JSON.parse($("#skuListJson").html() || "{}");
            a && (skuCaculater.init(a, d()), v(), $("#skuProps").on("click.z", "[data-value-id]", e), $(document.body).on("click", ".cloth_type [data-id]", f), r(), c())
        }), a.calTotalPrice = function () {
            var a = n(), b = $("#price"), c = b.html();
            if (3 != a.type && 2 != a.type || isNaN(c) || !b.is(":visible")) $("#totalprice").hide(); else {
                var d = 0;
                d = "none" == $(".item_quantity").eq(0).css("display") ? $(".item_quantity").eq(1).val() : $(".item_quantity").eq(0).val();
                var e = (c * d).toFixed(2);
                e = isNaN(e) ? "" : e;
                var f = 3 == a.type ? $("#largeCargoPriceUnit").text() : $("#swatchPriceUnit").text();
                $("#totalprice").show().find("em").text(f + e)
            }
        }
    }(window)

    });
} catch (ex) {
    window.console && console.error(ex), window.BJ_REPORT && BJ_REPORT.report(ex)
}

