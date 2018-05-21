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
            var b = a.data().id, c = skuCaculater.sku;
            if (1 == b || e()) {
                var d = {
                    itemId: $("#itemId").attr("uid"),
                    skuId: c.skuId,
                    itemTypeId: b,
                    quantity: $(".item_quantity").val()
                };
                return d
            }
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
        $("#item_qr_box").hover(function () {
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

