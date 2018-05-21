/*!  2017-05-23 */
try {
    !function () {
        function a() {
        }

        var b = Lsmain, c = new ShoppingCart, d = new b.CookieParser(document);
        a.prototype.init = function () {
            var a = $("#itemList");
            this.bind("click", ".list_m_more", this.onClickToggleMoreConditions), this.bind("click", ".list_t_m", this.onClickConditionMore), this.bind("click", ".list_t_d", this.onClickCheckMultiple), this.bind("click", ".list_cancel", this.onClickCancelMultiple), this.bind("click", ".list_t_a a", this.onClickCheckCondition), this.bind("click", ".list_confirm", this.onClickSearchByCheckeds), this.bind("mouseenter", a, ".item", this.onMouseEnterItem), this.bind("mouseout", a, ".item", this.onMouseOutItem), this.bind("click", a, ".btn-favorite", this.onEditFavorite), this.bind("click", a, ".btn-buy", this.onKindOfTone), this.bind("click", ".l_classify .l_classify_title", this.toggleCategoryAccordion), this.bind("click", ".list_title i:eq(0)", this.toggleConditionPane), this.initSortPrice()
        }, a.prototype.onClickToggleMoreConditions = function (a, b) {
            var c = $(b), d = $(".list_content").data("display") || 3, e = $(".list_top:gt(" + d + ")"),
                f = !c.data("expanded"), g = "更多选项<em></em>";
            f ? (e.show(), g = '收起<em class="up"></em>') : e.hide(), c.html(g).data("expanded", f)
        }, a.prototype.onClickConditionMore = function (a, b) {
            var c = $(b), d = c.data("expanded");
            d ? c.html("更多<em></em>") : c.html('收起<em class="more_up"></em>'), c.data("expanded", !d), c.prev().toggleClass("list_t_auto")
        }, a.prototype.onClickCheckMultiple = function (a, b) {
            var c = $(b);
            $(".list_t_d").show(), c.parents(".list_content").find(".list_t_m").each(function () {
                $(this).is(":hidden") && $(this).show().data("expanded", !1).html("更多<em></em>")
            }), c.parents(".list_content").find(".list_t_c").removeClass("list_d").find(".list_btn").hide(), c.siblings(".list_t_c").addClass("list_d").find(".list_btn").show(), c.closest(".list_top").find(".list_t_m").hide(), c.hide()
        }, a.prototype.onClickCancelMultiple = function (a, b) {
            var c = $(b);
            c.parent().hide().parent().removeClass("list_d").removeClass("list_t_auto"), c.closest(".list_top").find(".list_t_m,.list_t_d").show(), c.closest(".list_top").find(".list_t_m").show().show().data("expanded", !1).html("更多<em></em>"), c.prev().addClass("disabled").parent().siblings().find("a").removeClass("selected")
        }, a.prototype.onClickCheckCondition = function (a, b) {
            var c = $(b), d = c.closest(".list_t_c");
            if (d.hasClass("list_d")) {
                c.toggleClass("selected");
                var e = d.find(".list_confirm"), f = d.find("a.selected").length,
                    g = f < 1 ? "addClass" : "removeClass";
                return e[g]("disabled"), !1
            }
        }, a.prototype.onClickSearchByCheckeds = function (a, c) {
            var d = $(c);
            if (!d.hasClass("disabled")) {
                var e = d.closest(".list_top"), f = e.find("a.selected").map(function () {
                    return this.getAttribute("val")
                }), g = e.find(".list_t_d[par]").attr("par"), h = new b.UrlParserClass(location.href);
                h.paras[g] = Array.prototype.join.call(f, ","), location.href = h.toString(!0)
            }
        }, a.prototype.onMouseEnterItem = function (a, c) {
            b.event.mouseTriggerOfChild(a) || $(c).addClass("item-hover")
        // }, a.prototype.onEditFavorite = function (a, b) {
        //     this.loginCheck();
        //     var c = $(b), d = c.data() || {}, e = {contentType: "application/json"},
        //         d = {type: "ITEM", objectId: d.itemId},
        //         f = c.hasClass("done") ? "/favorites/favoritesDelete" : "/favorites/favoritesSave";
        //     return this.lock(this.onEditFavorite), this.post(f, d, e).complete(this.yesCall(this.editFavoriteComplete, c, this.onEditFavorite))
        }, a.prototype.loginCheck = function () {
            b.string.isNullOrWhiteSpace(d.token) && (location.href = "/user/login")
        }, a.prototype.editFavoriteComplete = function (a, c) {
            var d = c.hasClass("done") ? "取消成功" : "收藏成功";
            b.tip.success(d), c.toggleClass("done")
        }, a.prototype.onMouseOutItem = function (a, c) {
            b.event.mouseTriggerOfChild(a) || $(c).removeClass("item-hover")
        }, a.prototype.onKindOfTone = function (a, b) {
            var d = $(b).data("itemId"), e = $(b).offset(), f = {left: e.left, top: e.top, curvature: .002};
            c.ajaxAddCart({itemId: d, skuId: 0, quantity: 1, itemTypeId: 1}, f)
        }, a.prototype.initSortPrice = function () {
            var a = $(".price_des");
            $(document).on("click", function () {
                a.hide()
            }), $(".sort .price").click(function (b) {
                var c = $(this), d = c.offset();
                a.css({left: d.left, top: d.top + c.height()}), a.toggle(), b.stopPropagation()
            }), a.on("click", function (a) {
                a.stopPropagation()
            })
        }, a.prototype.toggleCategoryAccordion = function (a, b) {
            var c = $(b), d = c.closest(".l_classify_side"), e = c.siblings(".l_classify_des");
            c.children("em").toggleClass("cur"), d.find(".l_classify_des").slideUp(), d.find(".l_classify_title em").removeClass("cur"), e.is(":hidden") ? e.slideToggle() : e.slideUp()
        }, a.prototype.toggleConditionPane = function (a, b) {
            $(".list_more").toggle(), $(".list_content").slideToggle(300), $(b).toggleClass("btn_sq"), $(b).toggleClass("btn_xs")
        }, LsPageClass.run(a)
    }()
} catch (ex) {
    window.console && console.error(ex), window.BJ_REPORT && BJ_REPORT.report(ex)
}