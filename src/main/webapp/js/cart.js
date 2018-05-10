/*!  2017-04-14 */
try {
    !function (a) {
        function b() {
        }

        function c(a, b) {
            if ("update" == a) {
                var c = ShopCart.getCartItems(), e = Lsmain.array.mapDictionary(c, "cartId");
                $.each(b, function (a, b) {
                    var d = e[b.cartId];
                    d ? d.quantity = b.quantity : c.push(b)
                })
            } else if ("delete" == a) {
                var c = ShopCart.getCartItems(), f = [];
                $.each(c, function (a, c) {
                    var d = !0;
                    $.each(b, function (a, b) {
                        return c.cartId == b.cartId ? (d = !1, !1) : void 0
                    }), d && f.push(c)
                }), $.each(b, function (a, b) {
                    var c = $("#ci_" + b.itemId + "_" + b.skuId + "_" + b.itemTypeId).closest(".shop_list");
                    $("#tip_" + b.itemId + "_" + b.skuId + "_" + b.itemTypeId).remove(), $("#ci_" + b.itemId + "_" + b.skuId + "_" + b.itemTypeId).remove(), c.find(".shop_l_c.none:eq(0)").removeClass("none").show();
                    var d = c.find(".shop_l_c.none").length;
                    d > 0 && (c.find(".shop_more span").html(d), c.find(".shop_more").show()), c.find(".shop_l_c").length < 3 && c.find(".shop_more").hide()
                }), 0 == f.length && setTimeout(function () {
                    window.location.reload()
                }, 300), d(), ShopCart.listener(), ShopCart.setCartItems(f)
            }
            ShopCart.updateSummary()
        }

        function d() {
            $(".shop_list").each(function (a, b) {
                0 == $(b).find(".shop_l_c").length && $(b).parent().remove()
            })
        }

        function e() {
            var a = [];
            $(".shop_l_c").each(function (b, c) {
                a.push(ShopCart.getCartData($(c)))
            }), ShopCart.init(a)
        }

        a.ShopCart || (b.prototype.initShopCartList = e, b.prototype.initActionBar = function () {
            var a = $("#action-bar"), b = LS.utils.GetWindowHeight() - a.innerHeight(), c = null;
            $(window).scroll(function () {
                clearTimeout(c), a.removeClass("fixed"), c = setTimeout(function () {
                    var c = a.offset().top, d = $(this).scrollTop(), d = $(this).scrollTop();
                    c > d + b ? a.addClass("fixed") : a.removeClass("fixed")
                }, 200)
            }).trigger("scroll")
        }, b.prototype.init = function (a) {
            this.cartItems = a || []
        }, b.prototype.getCartItems = function () {
            return this.cartItems
        }, b.prototype.setCartItems = function (a) {
            this.cartItems = a || []
        }, b.prototype.getSelectedItems = function () {
            var a = [], b = Lsmain.array.mapDictionary(this.getCartItems(), "cartId");
            return $('[data-marker="cart-item"]:checked').each(function (c, d) {
                a.push(b[d.value])
            }), a
        }, b.prototype.getSummary = function () {
            var a = 0, b = 0;
            return $.each(this.getSelectedItems(), function (c, d) {
                b += Number(d.price) * Number(d.quantity), a++
            }), {cartItemsCount: a, totalPrice: b.toFixed(2)}
        }, b.prototype.updateCarts = function (a, b) {
            c("update", a), this.syncCart("update", a, b)
        }, b.prototype.checkCarts = function (a, b) {
            this.syncCart("check", a, b)
        }, b.prototype.addCart = function (a, b, c, d, e) {
            var f = {itemId: a, skuId: b, itemTypeId: c, quantity: d}, g = this;
            Lsmain.api.postRequest("/pay/cart/add").complete(function (a, b) {
                e(a || b), g.listener(f, "add")
            })
        }, b.prototype.deleteCarts = function (a, b) {
            c("delete", a), this.syncCart(a.length <= 1 ? "delete" : "deleteSome", a, b)
        }, b.prototype.syncCart = function (a, b, c, d) {
            var e = JSON.stringify(b), f = $.extend({type: a, items: e}, d), g = this;
            Lsmain.api.postRequest("/pay/cart/asyncUpdate", f).complete(function (d, e) {
                e = d || e, c(e), g.listener(b, a)
            })
        }, b.prototype.doSettle = function () {
            var a = this.getSelectedItems();
            if (!(a.length < 1) && this.validateCart(a)) {
                var b = JSON.stringify(a),
                    c = $('<form action="/pay/order/buyFromCart" method="post"><input type="hidden" name="items" value="" /></form>');
                $("body").append(c), c.find("[name=items]").val(b), c.submit()
            }
        }, b.prototype.updateSummary = function () {
            var a = this.getSummary();
            $("#proNum").html(a.cartItemsCount), $("#totalPrice").html("锟�" + a.totalPrice), this.listener()
        }, b.prototype.validateCart = function (a) {
            var b = !0, a = this.getSelectedItems();
            return $.each(a, function (a, c) {
                return c.quantity < c.min ? (this.alertCartItemValidateError(c, "璐拱鏁伴噺涓嶈兘灏忎簬鏈€灏忚捣璁㈤噺:" + c.min), b = !1, !1) : c.quantity > c.max ? (this.alertCartItemValidateError(c, "璐拱鏁伴噺涓嶈兘澶т簬鏈€澶ц喘涔伴噺:" + c.max), b = !1, !1) : void 0
            }), b || $("body").scrollTop($(".cart-item-validate-error:eq(0)").offset() - 50), b
        }, b.prototype.alertCartItemValidateError = function (a, b) {
            var c = $("#ci_" + a.itemId + "_" + a.skuId + "_" + a.itemTypeId), d = c.parent().find(".shop_more"),
                e = d.data() || {display: 20}, f = c.find(".cart_quantity").data().index, g = f > e.display;
            g && (d.data("collapse", !1), d.click());
            var h = $(['<div id="tip_' + a.itemId + "_" + a.skuId + "_" + a.itemTypeId + '" class="tooltip tooltip-error tooltip-right">', '<div class="tooltip-content">' + b + "</div>", '<div class="tooltip-arrow-outer"></div>', '<div class="tooltip-arrow"></div>', "</div>"].join("\n")),
                i = c.offset();
            c.addClass("cart-item-validate-error"), $("#tip_" + a.itemId + "_" + a.skuId + "_" + a.itemTypeId).remove(), h.css({
                left: i.left + c.width() + 35,
                top: i.top
            }), $("body").append(h)
        }, b.prototype.removeAlertCartItemValidateError = function (a) {
            $("#tip_" + a.itemId + "_" + a.skuId + "_" + a.itemTypeId).remove()
        }, b.prototype.getCartData = function (a, b) {
            var c = a.find("[data-marker=cart_quantity]").data(), d = a.find("[data-marker=cart_quantity]").val();
            return {
                cartId: c.cartId.toString(),
                itemId: c.itemId.toString(),
                skuId: c.skuId.toString(),
                itemTypeId: c.itemTypeId.toString(),
                price: c.price.toString(),
                shopId: c.shopId.toString(),
                minLimit: c.minLimit.toString(),
                maxLimit: c.maxLimit.toString(),
                quantity: null == b ? d.toString() : b.toString()
            }
        }, b.prototype.listener = function (a) {
            $("#settle-btn")[this.buyable() ? "removeClass" : "addClass"]("disable")
        }, b.prototype.buyable = function () {
            var a = this.getSelectedItems();
            return a.length > 0
        }, b.prototype.clearTips = function () {
            $(".tooltip").remove()
        }, a.ShopCart = new b)
    }(window), $(function () {
        function a(a, b) {
            var c;
            c = "cart_quantity" == a.attr("class") ? a : a.siblings(".cart_quantity");
            var d = parseFloat(c.data("minLimit")), e = parseFloat(c.data("maxLimit")),
                f = parseInt(c.data("itemDecimal")), g = c.val();
            "" == g && (g = 0);
            var h = parseFloat(g) + b;
            h > e ? (h = e, 0 == b && c.val(h), ShopCart.alertCartItemValidateError(c.data(), "鏈€澶ф暟閲忛檺鍒讹細" + e)) : d > h ? (h = d, 0 == b && (1 == f && (h = h.toFixed(2)), c.val(h)), ShopCart.alertCartItemValidateError(c.data(), "鏈€灏忔暟閲忛檺鍒讹細" + d)) : (ShopCart.removeAlertCartItemValidateError(c.data()), 1 == f && (h = h.toFixed(2)), c.val(h), 0 != b && c.trigger("change"))
        }

        function b(a) {
            var b = parseFloat(a.val());
            LS.tool.AjaxAbort(a.data("cartId"), function () {
                var c = [ShopCart.getCartData(a.parents(".shop_l_c"), b)];
                ShopCart.updateCarts(c, function (a) {
                    1 == a.code || ShopCart.alertCartItemValidateError(c[0], a.message)
                }, "json")
            }, 300), a.parents(".shop_l_c").find(".cart_totalPrice").text((Number(a.data("price")) * b).toFixed(2))
        }

        function c(a) {
            messager.confirm("鎮ㄧ‘瀹氳鍒犻櫎鍟嗗搧涔堬紵").yes(function () {
                ShopCart.deleteCarts(a, function (a) {
                    1 == a.code || messager.error(a.message)
                }, "json")
            })
        }

        function d(a, b, c) {
            var d = a.parents(b), e = d.find("[data-marker=cart-item]"), f = d.find(".partial_check");
            e.attr("checked", c ? c : !!c), f.attr("checked", c ? c : !!c)
        }

        function e(a) {
            var b = $("#cart_list"), c = b.find("[data-marker=cart-item]").length,
                d = b.find("[data-marker=cart-item]:checked").length;
            b.parent().find(".total_check").attr("checked", !(c > d));
            var e = a.parents(".shop_list"), f = e.find("[data-marker=cart-item]").length;
            if (f > 0) {
                var g = e.find("[data-marker=cart-item]:checked").length;
                e.find(".partial_check").attr("checked", !(f > g))
            }
        }

        function f(a, b, c) {
            var d = $("[data-marker=cart-item]").length, e = $("[data-marker=cart-item]:checked").length;
            $("#allCheck,#totalCheck").attr("checked", !(d > e));
            var f = [];
            a.parents(b).find("[data-marker=cart-item]").each(function () {
                f.push($(this).val())
            });
            ({ids: f.join(","), check: !!c});
            ShopCart.updateSummary()
        }

        ShopCart.initShopCartList(), $(".shop_more").on("click", function () {
            var a = $(this);
            if (a.data("collapse")) {
                a.data("collapse", !1);
                var b = a.parent().find(".shop_l_c").length - a.data().display;
                a.html("灞曞紑鏈簵閾虹殑鏇村鍟嗗搧锛�<span>" + b + "</span>锛�"), a.parent().find(".shop_l_c").addClass("none"), a.parent().find(".shop_l_c:lt(2)").removeClass("none")
            } else a.data("collapse", !0), a.html('鏀惰捣<em class="up"></em>'), a.parent().find(".shop_l_c").removeClass("none")
        }), ShopCart.initActionBar(), $(".quantity_plus").on("click", function () {
            a($(this), 1)
        }), $(".quantity_minus").on("click", function () {
            a($(this), -1)
        }), $(".cart_quantity").on("change", function () {
            a($(this), 0), b($(this))
        }), $(".cart_del").on("click", function () {
            var a = ShopCart.getCartData($(this).parents(".shop_l_c"));
            c([a])
        }), $(".slide_del").on("click", function () {
            var a = [];
            return $("[data-marker=cart-item]:checked").each(function (b, c) {
                a.push(ShopCart.getCartData($(c).parents(".shop_l_c")))
            }), 0 == a.length ? (messager.alert("璇烽€夋嫨浣犺鍒犻櫎鐨勫晢鍝�!"), !1) : void c(a)
        }), $(".total_check").on("click", function () {
            var a = $(this);
            d(a, "#cart_list", a.attr("checked")), f(a, "#cart_list", a.attr("checked")), $("#cart_list").find(".total_check").each(function (b, c) {
                $(c).attr("checked", !!a.attr("checked"))
            })
        }), $(".partial_check").on("click", function () {
            var a = $(this);
            d(a, ".shop_list", a.attr("checked")), e(a), f(a, ".shop_list", a.attr("checked"))
        }), $("[data-marker=cart-item]").on("click", function () {
            var a = $(this);
            e(a), f(a, ".c1", a.attr("checked"))
        }), $("#settle-btn").on("click", function () {
            ShopCart.doSettle()
        })
    })
} catch (ex) {
    window.console && console.error(ex), window.BJ_REPORT && BJ_REPORT.report(ex)
}