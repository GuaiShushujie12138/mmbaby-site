/*!  2017-05-11 */
try {
    !function (a) {
        function b() {
        }

        function c(a, b) {
            for (var c = 0; c < a.length; c++) if (a[c] == b) {
                a.splice(c, 1);
                break
            }
        }

        if (!a.OrderManager) {
            var d = Lsmain;
            b.prototype.init = function (a, b) {
                this.submitUrl = b, this.tradeItemList = a || [], this.$pays = $("#tagsPayTypes"), this.$pays.tags({
                    single: !0,
                    onChange: d.utils.getCall(this, this.onChangePayType)
                }), this.$pays.tags("select", 1), this.clothReportService()
            }, b.prototype.syncTradeItemList = function () {
                this.syncTradeLogisticsAndRemarks()
            }, b.prototype.validate = function () {
                return !!this.getSelectedAddressInfo()
            }, b.prototype.onChangePayType = function (a, b) {
                var c = b[0];
                this.payType = c.id, 3 == c.id ? $("#buy").val("下一步") : $("#buy").val("提交订单")
            }, b.prototype.clothReportService = function () {
                var a = [], b = null;
                $(".shop_list.mt15").on("click", " .report-checkbox", function () {
                    b = $(this).parents(".shop_list").attr("data-shop-id"), $(this).is(":checked") ? a.push(b) : c(a, b)
                }), this.applyInspectionShopIds = a
            }, b.prototype.submitFromCartOrder = function (a) {
                if (this.validate()) {
                    VeniLog.log(3003, ".btn_small_t_btn_tjiao_"), $("#buy").attr("operate", "n").val("提交中...");
                    $(".check_mor").attr("id");
                    this.syncTradeItemList();
                    var b = JSON.stringify(userInvoiceManager.getInvoice()), c = JSON.stringify(this.tradeItemList),
                        d = JSON.stringify(this.createLogisticsInfo()), e = JSON.stringify(this.logisticsCompanys),
                        f = JSON.stringify(this.applyInspectionShopIds), g = $(".select-coupon option:selected").val();
                    void 0 == g && (g = "0");
                    var h = $(['<form action="' + this.submitUrl + '" method="post">', '<input type="hidden" name="items" value="" />', '<input type="hidden" name="logistics" value="" />', '<input type="hidden" name="logisticsCompanys" value="" />', '<input type="hidden" name="invoiceJson" value="" />', '<input type="hidden" name="couponId" value="0" />', '<input type="hidden" name="payType" value=""/>', '<input type="hidden" name="stagingJson" value=""/>', '<input type="hidden" name="applyInspectionShopIds" value=""/>', "</form>"].join("\n"));
                    Lsmain.tip.info("提交中,请稍后......");
                    var i = {
                        items: c,
                        logistics: d,
                        logisticsCompanys: e,
                        invoiceJson: b,
                        couponId: g,
                        stagingJson: a,
                        payType: this.payType,
                        applyInspectionShopIds: f
                    };
                    $(document.body).append(h), Lsmain.formWR.fill(h, i), h.submit()
                }
            }, b.prototype.syncTradeLogisticsAndRemarks = function () {
                var a = $('[data-marker="logistics"]'), b = this.tradeItemList, c = this;
                this.syncTradesLogistics(), a.each(function () {
                    var a = $(this).data(), d = b[a.tradeIndex];
                    c.syncTradeItemOrderItemRemarks(d)
                })
            }, b.prototype.syncTradesLogistics = function () {
                for (var a, b, c, d = this.tradeItemList, e = null, f = [], g = 0, h = d.length; g < h; g++) e = d[g], a = $("[data-delivery='" + e.orderItemList[0].shopId + "']"), b = a.find(".radio_delivery:checked"), c = b.val(), f.push($.trim(a.find('[data-marker="logistics"]').text())), e.logisticsItem.logisticsTypeId = c;
                this.logisticsCompanys = f
            }, b.prototype.getSelectedAddressInfo = function () {
                var a = $("#addressList .check_mor"), b = null;
                if (a.length > 0) {
                    var c = a.data().id;
                    b = userAddressManager.getLocal(c)
                }
                return b
            }, b.prototype.createLogisticsInfo = function (a, b) {
                var c = this.getSelectedAddressInfo(), d = {
                    logisticsTypeid: 0,
                    logisticsCompanyId: 0,
                    logisticsCompanyName: "",
                    logisticsSn: "",
                    buyerName: c.name,
                    countryId: c.countryId,
                    countryName: "" | c.countryName,
                    provinceId: c.provinceId || "",
                    provinceName: c.provinceName || "",
                    cityId: c.cityId,
                    cityName: c.cityName || "",
                    districtId: c.areaId || c.districtId,
                    districtName: c.areaName || "",
                    postcode: c.zip || "",
                    address: c.address || "",
                    telephone: c.telephone || "",
                    mobile: c.mobile
                };
                return d
            }, b.prototype.syncTradeItemOrderItemRemarks = function (a) {
                for (var b = this.tradeItemList, c = null, d = null, e = 0, f = b.length; e < f; e++) c = b[e], d = c.orderItemList[0].shopId, c.memo = $("[data-remark=" + d + "]").val()
            }, a.OrderManager = new b, $(function () {
                var b = JSON.parse($("#tradeItemList").html()), c = $("#submitUrl").val();
                a.OrderManager.init(b, c)
            })
        }
    }(window), function (a) {
        function b() {
        }

        var c = Lsmain, d = c.List, e = new c.DataValidator, f = {
            previousMonth: "上月",
            nextMonth: "下月",
            months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            weekdays: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
            weekdaysShort: ["日", "一", "二", "三 ", "四", "五", "六"]
        }, g = 3;
        b.prototype.itemValidationModel = {
            rate: {required: "请设置分期比例", number: "无效的分期比例{0}", min: [1, "分期比例不能小于等于0"]},
            contractTime: {required: "请设置合同约定日期", date: "无效的合同约定日期"}
        }, b.prototype.validationModel = {
            email: {
                required: "请填写邮箱",
                email: "无效的邮箱格式"
            }
        }, b.prototype.init = function () {
            this.$box = $("#tradeStaging"), this.initHandlers();
            var a = this;
            e.onInvalid(function (b) {
                a.error(b)
            })
        }, b.prototype.doSubmit = function (a) {
            var b = $(a.srcElement || a.target);
            b.is(".disabled") || this.submit()
        }, b.prototype.submit = function () {
            var a = this.read(), b = this.stepComplete();
            if (!b.isEmpty()) {
                if (!this.validateDateRange(b)) return this.error("请检查合同约定日期,每个阶段至少相隔:" + g + "天");
                if (this.yesValidation(a)) {
                    if (!$("#chAgreement").is(".check_g")) return this.error("请确认,您是否同意分期支付协议?");
                    var c = {
                        stagingAmount: this.totalAmount + OrderManager.couponPrice,
                        email: a.email,
                        imageList: a.imageList,
                        periodList: b.items
                    };
                    OrderManager.submitFromCartOrder(JSON.stringify(c))
                }
            }
        }, b.prototype.goStaging = function () {
            if (this.validateStaging()) {
                if ($("#totalAmount").html() <= 0) return messager.error("零元订单不支持分期支付！"), !1;
                $("#payInfo").hide(), $("#tradeStaging").show(), $("#header .shop_instal_step").removeClass("shop_instal_step1").addClass("shop_instal_step2"), $(document.documentElement).scrollTop(0), $(document.body).scrollTop(0), OrderManager.couponPrice = OrderManager.couponPrice || 0, this.totalAmount = Number($("#staingAmount").val()) - OrderManager.couponPrice, $("#amount").html(this.totalAmount.toFixed(2))
            }
        }, b.prototype.initHandlers = function () {
            this.bind("click", ".add-setting", this.onClickCreateStaging), this.bind("blur", '[data-provider="rate"]', this.onBlurInputRate), this.bind("click", ".step-datepicker.unlink", this.onClickInitDatePicker), this.bind("click", ".contract_img .delete", this.onClickRemoveUploadImage), AjaxUpload.handlers.stagingUpload = c.utils.getCall(this, this.onStagingUpload), $(document.body).on("blur.staging", "[data-instalment-money]", c.utils.getCall(this, this.onInputStagingBlur)), $("#buyOfStaging").on("click", c.utils.getCall(this, this.goStaging)), $("#submitStaging").click(c.utils.getCall(this, this.doSubmit)), this.bind("click.delete", ".delete-staging-step", this.onClickDeleteStep), $("#chAgreement").parent().click(c.utils.getCall(this, this.btnSubmitStateChange))
        }, b.prototype.btnSubmitStateChange = function () {
            $("#chAgreement").is(".check_g") ? $("#submitStaging").addClass("disabled") : $("#submitStaging").removeClass("disabled")
        }, b.prototype.onClickDeleteStep = function (a, b) {
            $(b).parents("li:eq(0)").remove(), $("#addPanel").show(), $("#secondName").html("尾款："), $("#secondMoneyName").html("尾款金额："), this.refresh()
        }, b.prototype.onInputStagingBlur = function () {
            var a = $("#staingAmount"), b = a.val();
            a.val(Math.floor(Number(b))), this.validateStaging() && this.refreshStagingAmount()
        }, b.prototype.validateStaging = function () {
            return OrderManager.validate()
        }, b.prototype.validateDateRange = function (a) {
            for (var b, d = null, e = !0, f = 0, h = a.count(); f < h; f++) {
                if (b = a.get(f), d && b && c.date.diff(d.contractTime, b.contractTime, "d") < g) {
                    e = !1, this.getWrap(b.name).find(".step-datepicker").addClass("error");
                    break
                }
                d = b
            }
            return e
        }, b.prototype.refreshStagingAmount = function () {
            var a = Number($("#staingAmount").val()), b = Number(a - (OrderManager.couponPrice || 0));
            b = b < 0 ? 0 : b, $("#itemTotalAmount").html(a.toFixed(2)), $("#totalAmount").html(b.toFixed(2)), $(".shopAmount").html(b.toFixed(2))
        }, b.prototype.onStagingUpload = function (a) {
            var b = this.$box.find("#stagingUploadBox"), c = this.$box.find("#stagingUploadBox li").length;
            if (!(c < 10)) return this.error("上传图片最多不超过10张！");
            var d = $($("#stagingUploadTmpl").html());
            d.find("img").attr("src", a), b.append(d)
        }, b.prototype.onClickInitDatePicker = function (a, b) {
            this.tryCreateDatePicker(b)
        }, b.prototype.tryCreateDatePicker = function (a) {
            var b = $(a), d = b.data("pikaday"), e = c.date.convert(this.$box.data("date"));
            return d || (d = new Pikaday({
                field: a,
                format: "YYYY/MM/DD",
                i18n: f,
                minDate: e,
                onSelect: c.utils.getCall(this, this.onSelectStagingDate, b)
            }), b.data("pikaday", d), b.removeClass("unlink"), d.show()), d
        }, b.prototype.onSelectStagingDate = function () {
            var a = arguments[arguments.length - 1], b = this.getDataOf(a[0]), c = this.getWrap(b.name),
                d = c.next("[data-step]"), e = d.find(".step-datepicker");
            this.datePickerRangeRender(a, e, !0);
            var f = c.prev("[data-step]");
            f.length > 0 && this.datePickerRangeRender(f, a, !0)
        }, b.prototype.onClickRemoveUploadImage = function (a, b) {
            $(b).parent().remove()
        }, b.prototype.datePickerRangeRender = function (a, b, d) {
            var e = a.data("pikaday");
            if (e && b.length > 0) {
                var f = this.tryCreateDatePicker(b[0]), h = e.getDate(), i = f.getDate();
                i && h > i ? (b.addClass("error"), f.show(), f.gotoDate(c.date.addDays(h, g))) : i ? b.removeClass("error") : (f.show(), f.gotoDate(c.date.addDays(h, g))), f.setMinDate(c.date.addDays(h, g))
            }
        }, b.prototype.onBlurInputRate = function (a, b) {
            var c = this.getDataOf(b);
            return c.rate <= 0 ? ($(b).addClass("error"), void this.error("比例不能小于等于0")) : ($(b).removeClass("error"), this.currentRateRender(c, $(b)), void this.refresh())
        }, b.prototype.onClickCreateStaging = function (a, b) {
            var c = $($("#stagingStepTmpl").html());
            c.insertBefore($("#addPanel")), $("#addPanel").hide(), $("#secondName").html("中期款："), $("#secondMoneyName").html("中期款金额：");
            var d = this.rateComplete();
            if (!d.isEmpty()) {
                var e = d.sumOf("rate"), f = 100 - e;
                f = f < 0 ? 0 : f, this.fill({name: 3, rate: f, money: ""}, c)
            }
            this.$box.find("[data-provider='rate']").removeAttr("disabled"), c.find("[data-provider='rate']").attr("disabled", "disabled");
            var g = c.prev("[data-step]").find('[data-provider="contractTime"]'),
                h = c.find('[data-provider="contractTime"]');
            this.datePickerRangeRender(g, h, !1), this.refresh()
        }, b.prototype.refresh = function () {
            for (var a = this.getInstalmentStepList().items, b = 0, c = a.length; b < c; b++) b + 1 == c ? this.refreshLast(a) : this.refreshItem(a[b])
        }, b.prototype.currentRateRender = function (a, b) {
            if (!a) return !1;
            var c = this.getInstalmentListExclusive(a.name), d = c.sumOf("rate"), e = 100 - d;
            a.rate < 0 ? (a.rate = 0, this.refreshItem(a)) : a.rate > e && (a.rate = e, this.refreshItem(a))
        }, b.prototype.refreshLast = function (a) {
            if (a) {
                var b = a.pop(), c = this.getWrap(b.name), d = Lsmain.array.sumOf(a, "rate"),
                    e = Lsmain.array.sumOf(a, "amount");
                b.rate = 100 - d, b.money = Number(this.totalAmount - e).toFixed("2"), this.fill(b, c)
            }
        }, b.prototype.refreshItem = function (a) {
            if (a) {
                a.rate = a.rate.toFixed("0"), a.amount = this.totalAmount * (a.rate / 100), a.money = "¥" + Number(a.amount).toFixed("2");
                var b = this.getWrap(a.name);
                this.fill(a, b)
            }
        }, b.prototype.getWrap = function (a) {
            return this.$box.find('[data-provider="name"][value="' + a + '"]').parents("[data-step]")
        }, b.prototype.getDataOf = function (a) {
            var b = this.read($(a).parents("[data-step]"));
            return b.rate = c.utils.ensureDecimal(b.rate, 0), b
        }, b.prototype.rateComplete = function () {
            return this.getInstalmentStepList(function (a) {
                return a.rate >= 0
            })
        }, b.prototype.validateStep = function (a, b) {
            return b.find("[data-provider].error").removeClass("error"), e.model(a, this.itemValidationModel) ? (a.contractTime = c.date.format(a.contractTime, "yyyy-MM-dd hh:mm:ss.S"), a.time = c.date.toUnixTimeStamp(a.contractTime), delete a.contractTime, !0) : (b.find('[data-provider="' + e.currentFormName + '"]').addClass("error"), !1)
        }, b.prototype.stepComplete = function () {
            var a = this;
            return this.getInstalmentStepList(function (b, c) {
                return a.validateStep(b, c)
            })
        }, b.prototype.getInstalmentListExclusive = function (a) {
            var b = this.getInstalmentStepList().queryOf("name", a, "!=");
            b.pop();
            var c = new d(b).query(function (a) {
                return a.rate >= 0
            });
            return new d(c)
        }, b.prototype.getInstalmentStepList = function (a) {
            for (var b, e, f = this.$box.find("[data-step]"), g = [], h = 0, i = f.length; h < i; h++) {
                if (b = f.eq(h), e = this.read(b), e.rate = c.utils.ensureDecimal(e.rate, 0), c.type.isFunction(a) && a(e, b) === !1) {
                    g = [];
                    break
                }
                g.push(e)
            }
            return new d(g)
        }, window.Instalment = LsPageClass.run(b, $("#tradeStaging"))
    }(), function () {
        function a() {
            $.validator.addMethod("mobile", function (a, b) {
                var c = /^1[3|4|5|7|8]\d{9}$/;
                return this.optional(b) || c.test(a)
            }), $.validator.addMethod("zcode", function (a, b) {
                var c = /^[0-9]{6}$/;
                return this.optional(b) || c.test(a)
            })
        }

        function b() {
            $("#buy").on("click", c)
        }

        function c() {
            var a = $(this), b = a.attr("operate");
            return void 0 != b && "y" != b || (3 == OrderManager.payType ? Instalment.goStaging() : OrderManager.submitFromCartOrder()), !1
        }

        a(), $(b)
    }(), function (a) {
        function b() {
        }

        function c(a, b) {
            b.find(".check_mor").find(".gou").remove(), b.find(".check_mor").removeClass("check_mor");
            var c = $("<i class='gou'></i>");
            a.find(".gou").remove(), a.append(c), a.addClass("check_mor")
        }

        function d(a) {
            var b = $(".check_allcont");
            return c($(".check_subcon:first"), b), b.data("speed", 300), b.data("display", 4), b.data("index", 0), b.on("click.address", "[data-id]", function () {
                c($(this), b)
            }), b.on("click.address", ".check_btn_l", h), b.on("click.address", ".check_btn_r", g), e(), b
        }

        function e() {
            var a = $(".check_allcont"), b = a.data("display"), c = a.find(".check_subcon").length;
            c <= b ? $(".check_btn_l,.check_btn_r").hide() : $(".check_btn_l,.check_btn_r").show()
        }

        function f(a) {
            var b = a.find(".check_subcon")[0], c = Lsmain.uiHelp.getMargin(b);
            return Lsmain.uiHelp.offsetOf(b, "Width") + c.left + c.right
        }

        function g(a) {
            var b = $(a.delegateTarget), c = b.data(), d = c.display, e = c.index, g = b.find(".check_subcon").length,
                h = f(b);
            if (e++, e <= g - d) {
                var i = -h * e;
                $(this).siblings(".check_cont").children("ul").animate({left: i}, c.speed)
            } else e = g - d;
            c.index = e
        }

        function h(a) {
            var b = $(a.delegateTarget), c = b.data(), d = c.index, e = f(b);
            if (d--, d < 0) d = 0, $(this).siblings(".check_cont").children("ul").animate({left: 0}, c.speed); else {
                var g = -e * d;
                $(this).siblings(".check_cont").children("ul").animate({left: g}, c.speed)
            }
            c.index = d
        }

        b.prototype.init = function () {
            this.$container = d(this)
        }, b.prototype.tirggerCarouselIcon = function () {
            e()
        }, b.prototype.selectAddress = function (a) {
            c(a, this.$container)
        }, b.prototype.front = function () {
            $("#addressList").animate({left: 0}), this.$container.data("index", 0)
        }, a.userAddressCarousel = new b
    }(window), function () {
        function a() {
            this.shopInvoiceMap = {}, this.bankLengthRange = bankLength.split("-"), this.minBankLength = Number(this.bankLengthRange[0]), this.maxBankLength = Number(this.bankLengthRange[1]), b(this)
        }

        function b(a) {
            $(document.body).on("click.invoice", ".invoice-btn", function () {
                var b = $(this), c = b.data() || {};
                a.setShopInvoice(c)
            }), $(function () {
                c(a)
            })
        }

        function c(a) {
            var b = a.modal = Lsmain.UI.Modal.open("发票信息", $("#invoicePanel").html(), 600, "auto", {
                position: "center",
                once: !1,
                draggable: !0,
                fixed: !0,
                hide: !0
            });
            b.container.on("click.invoice", ".btn-invoice-save", function () {
                d(a)
            }), b.container.on("click", ".in_type a", function (a) {
                $(this).addClass("cur").siblings("a").removeClass("cur"), $(".invoice").hide().eq($(this).index()).show(), b.sync()
            }), a.registValidation(b.find("#appreciactionInvoiceForm"), f), a.registValidation(b.find("#commonInvoiceForm"), e)
        }

        function d(a) {
            var b = a.modal.find(".invoice-type.cur"), c = b.data("value"), d = b.data("form"), e = a.modal.find(d),
                f = Lsmain.formWR.read(e);
            if (e.valid()) {
                if (2 == c) {
                    var g = f.bankAccount = f.bankAccount.replace(/\s/g, ""), h = g.length;
                    if (a.minBankLength > h || a.maxBankLength < h) return void e.find(".global-error").show().html(Lsmain.string.format("银行卡号格式不正确,长度必须在{0}-{1}之间", a.minBankLength, a.maxBankLength))
                }
                f.invoiceType = c, a.saveShopInvoice(f)
            }
        }

        var e = {}, f = {
            rules: {
                companyName: {required: !0},
                payIdentifier: {required: !0},
                regAddress: {required: !0},
                bank: {required: !0},
                bankAccount: {required: !0},
                mobile: {rangelength: [8, 13]}
            },
            messages: {
                companyName: {required: "公司名称不能为空"},
                payIdentifier: {required: "请填写税务登记号"},
                regAddress: {required: "请填写经营地址"},
                bank: {required: "请选择银行类型"},
                bankAccount: {required: "请填写银行账户"},
                mobile: {rangelength: $.validator.format("无效的手机号码")}
            }
        }, g = {
            errorClass: "error", errorPlacement: function () {
            }, success: function () {
                $(this.currentForm).find(".global-error").hide().html("")
            }, showErrors: function (a, b) {
                b.length > 0 && $(this.currentForm).find(".global-error").show().html(b[0].message), this.defaultShowErrors()
            }
        };
        a.prototype.setShopInvoice = function (a) {
            var b = this.modal, c = a.shopId, d = a.common, e = a.vat;
            b.setParam("shopId", c);
            var f = this.getInvoice(c), g = b.find("#commonInvoiceForm"), h = b.find("#appreciactionInvoiceForm");
            if (b.find(".invoice-type,.invoice").hide(), d && b.find(".invoice-type[data-value=1]").show(), e && b.find(".invoice-type[data-value=2]").show(), b.open(), b.find(".global-error").hide(), b.find(".invoice-type:visible").eq(0).click(), f) {
                var i = 1 == f.invoiceType ? g : h;
                b.find(".invoice-type").removeClass(".cur"), b.find(".invoice-type[data-value='" + f.invoiceType + "']").click(), Lsmain.formWR.fill(i, f)
            }
        }, a.prototype.saveShopInvoice = function (a) {
            var b = this.modal.getParam("shopId"), c = $("[data-shop-id='" + b + "']"), d = c.find(".invoice-btn"),
                e = 1 == a.invoiceType ? "普通发票" : "增值发票";
            this.shopInvoiceMap[b] = a, a.shopId = b, c.find(".use-invoice").remove(), $("<span class='use-invoice'></span>").html("已开:" + e).insertAfter(d[0]), this.modal.close(), Lsmain.tip.success("设置成功")
        }, a.prototype.getInvoice = function (a) {
            if (1 === arguments.length) return this.shopInvoiceMap[a];
            var b = [];
            for (var c in this.shopInvoiceMap) b.push(this.getInvoice(c));
            return b
        }, a.prototype.registValidation = function (a, b) {
            b = $.extend({}, b, g), a.validate(b)
        }, window.userInvoiceManager = new a
    }(), function () {
        function a() {
        }

        function b() {
            n()
        }

        function c(a) {
            var b = $(this), c = $(this).data().addressId;
            Lsmain.event.stopParentHandler(a), messager.confirm("是否要删除该地址?", "链尚", function (a) {
                a && o.deleteAddress(c, function (a) {
                    1 == a.status ? (Lsmain.tip.success("删除成功"), b.parents("li:eq(0)").remove()) : Lsmain.tip.warning(a.message)
                })
            })
        }

        function d() {
            var a = $(this), b = a.parents(".check_subcon").attr("id");
            o.setDefault(b, function (b) {
                1 == b.status ? (Lsmain.tip.success("设置成功"), f(a, !0)) : Lsmain.tip.warning(b.message)
            })
        }

        function e(a, b, c) {
            function d(a) {
                var b = document.createElement("div");
                return b.appendChild(document.createTextNode(a)), b.innerHTML
            }

            if (1 == a.status) {
                Lsmain.tip.success("保存成功");
                var e = a.data.userAddress, g = 0 == b;
                g && (b = e.addressId, i(b));
                var h = $("#" + b);
                e.provinceName = c.provinceName, e.cityName = c.cityName, e.areaName = c.areaName, e.address = d(e.address), e.name = d(e.name), e.addressInfo = [e.provinceName, e.cityName, e.areaName].join(" ") + "</br>" + e.address, Lsmain.formWR.fill(h, e), $(".check_sz").attr("checked") ? e.isDefault = !0 : e.isDefault = !1, f(h.find(".set"), e.isDefault), n(), userAddressCarousel.selectAddress(h)
            } else Lsmain.tip.warning(a.message)
        }

        function f(a, b) {
            if (b) {
                $(".check_allcont").find(".m_add,.gou").remove(), $(".check_allcont").find(".set").show(), a.hide(), $("[is_default=1]").attr("is_default", 0);
                var c = a.parents("li:eq(0)");
                c.attr("is_default", 1), c.append('<i class="m_add">默认收货地址</i><i class="gou"></i>'), g(c)
            } else a.parents("li:eq(0)").attr("is_default", 0), a.parents("li:eq(0)").find(".m_add,.gou").remove(), a.show()
        }

        function g(a) {
            h(a, function () {
                var b = $("#addressList"), c = b.children("li"), d = c.eq(0);
                d[0] != a[0] && d.length > 0 && a.insertBefore(d)
            })
        }

        function h(a, b) {
            var c = $("#addressList"), d = c.children("li"), e = d.eq(0),
                f = a.offset().left - a.offsetParent().offset().left;
            e[0] != a[0] && (a.css({zIndex: 999, background: "#fff"}), a.animate({left: -f}, function () {
                a.css("left", ""), a.css({zIndex: 1}), userAddressCarousel.front(), b()
            }))
        }

        function i(a) {
            var b = $("#addressList"), c = $($("#addressItemTemplate").html());
            $con = c.children($("input[name='address']")).html();
            var d = b.find("[is_default=1]"), e = b.children("li");
            c.attr("id", a), c.attr("data-id", a), c.data("id", a), d.length > 0 ? c.insertAfter(d) : e.length < 1 ? b.append(c) : c.insertBefore(e.eq(0))
        }

        function j(a) {
            var b = Lsmain.formWR.read($("#form_sh")), c = {
                id: a,
                name: b.username,
                province_id: b.province,
                city_id: b.city,
                area_id: b.county,
                address: b.address,
                mobile: b.mobile,
                tel: b.tel,
                zcode: b.zcode,
                is_default: "on" == b.is_default || 1 == b.is_default ? "1" : "0"
            };
            return c
        }

        function k() {
            $("#form_sh").data("addressId", 0), m()
        }

        function l() {
            var a = $(this), b = a.data(), c = b.addressId, d = $("#form_sh");
            d.data("addressId", c), m(), o.get(c, function (a) {
                if (1 == a.status) {
                    var b = a.data.address;
                    Lsmain.formWR.fill(d, b), d.find("#province").combobox("val", b.provinceId), d.find("#city").combobox("val", b.cityId), d.find("#county").combobox("val", b.areaId)
                } else Lsmain.tip.error(a.message)
            })
        }

        function m() {
            Lsmain.formWR.clear($("#form_sh")), $("#lsMark").show(), $("#lSlideShow1").show()
        }

        function n() {
            $("#lsMark").css("display", "none"), $("#lSlideShow1").css("display", "none")
        }

        a.prototype.initUserAddress = function () {
            var a = $("#addressList"), b = a.find("input[name=address_meta]"), c = [], d = a.data() || {};
            this.maxAddressList = d.max, b.each(function () {
                c.push($(this).data())
            }), this.addressList = new Lsmain.List(c)
        }, a.prototype.getLocal = function (a) {
            return this.addressList.queryOf("addressId", a)[0]
        }, a.prototype.save = function (a, b) {
            var c = this;
            Lsmain.api.postRequest("/address/add-address", {data: a}).complete(function (d, e) {
                if (e = d || e, 1 == e.status && 0 == a.id) {
                    var f = e.data.userAddress;
                    f.areaName = e.areaName, c.addressList.addOnly(f)
                }
                b(e), c.listener()
            })
        }, a.prototype.get = function (a, b) {
            Lsmain.api.postRequest("/user/do-address-info-ajax", {data: {id: a}}).success(b).error(b)
        }, a.prototype.setDefault = function (a, b) {
            Lsmain.api.postRequest("/user/do-default-address-ajax", {data: {id: a, is_default: 1}}).success(b).error(b)
        }, a.prototype.deleteAddress = function (a, b) {
            var c = this;
            Lsmain.api.postRequest("/user/do-del-address-ajax", {data: {id: a}}).complete(function (d, e) {
                e = d || e, 1 == e.status && c.addressList.remove(function (b) {
                    return b.addressId == a
                }), b(e), c.listener()
            })
        }, a.prototype.initHandlers = function () {
            var a = $(document.body), e = $("#addressList");
            a.on("click", "#lSlide1Close", b), a.on("click", ".btn_add", k), e.on("click", ".del", c), e.on("click", ".set", d), e.on("click", ".amend", l)
        }, a.prototype.listener = function () {
            this.addressList.size() >= this.maxAddressList ? $(".btn_add").hide() : $(".btn_add").show(), userAddressCarousel.tirggerCarouselIcon()
        }, a.prototype.init = function () {
            this.initUserAddress(), this.initHandlers()
        };
        var o = window.userAddressManager = new a;
        $(function () {
            o.init(), userAddressCarousel.init()
        }), $("#form_sh").validate({
            onkeyup: !1,
            rules: {
                username: {required: !0, maxlength: 15},
                address: {required: !0, maxlength: 40},
                mobile: {
                    required: {
                        depends: function () {
                            return $('input[name="tel"]').val().length <= 0
                        }
                    }, mobile: !0
                },
                tel: {
                    required: {
                        depends: function () {
                            return $('input[name="mobile"]').val().length <= 0
                        }
                    }
                },
                zcode: {zcode: !0}
            },
            messages: {
                username: {required: "请输入收货人姓名", maxlength: jQuery.validator.format("姓名不能超过 {0} 个字符")},
                address: {required: "请输入详细地址", maxlength: jQuery.validator.format("详细地址不能超过 {0} 个字符")},
                mobile: {required: "请输入手机号码或固定电话", mobile: "手机格式不正确,请重新输入"},
                tel: {required: "请输入手机号码或固定电话"},
                zcode: {zcode: "邮编格式不正确"}
            },
            errorClass: "add_error",
            groups: {telphone: "mobile tel"},
            errorPlacement: function (a, b) {
                "mobile" == b.attr("name") || "tel" == b.attr("name") ? a.insertAfter("#lastname") : "province" == b.attr("name") || "city" == b.attr("name") || "county" == b.attr("name") ? ($(".addr_error").html(""), a.appendTo(".addr_error")) : b.after(a)
            },
            submitHandler: function (a) {
                var b = $("#form_sh").data("addressId"), c = j(b);
                o.save(c, function (a) {
                    e(a, b, c)
                })
            }
        })
    }(), $(function () {
        function a(a, b) {
            $(a).hover(function () {
                $(this).children(b).css("display", "block")
            }, function () {
                $(b).css("display", "none"), $(b).css("display", "none")
            })
        }

        var b = $("#totalAmount").data("amount");
        b > 0 || $("#tradetotalAmount").data("value") > 0 ? ($("#couponWrap").show(), $("#tagsPayTypes").show()) : ($("#couponWrap").remove(), $("#tagsPayTypes").remove()), $(".logistics_box ul li").click(function () {
            $(this).parent().siblings().children().html($(this).html()), $(this).parent().css("display", "none"), $(this).css("background", "#f1f1f1").siblings().css("background", "#fff")
        }), $(".logistics_box ul li").mouseover(function () {
            $(this).css("background", "#f1f1f1").siblings().css("background", "#fff")
        }), $(".logistics_box ul").each(function (a, b) {
            $(this).children("li:last").css("border-bottom", "none")
        }), a(".logistics_box", ".logistics_box ul"), a(".freight", ".logistics_all");
        var c = !0;
        $(".use_dyq").click(function () {
            c ? ($(this).children().css("backgroundPosition", "-362px -53px"), $(".enter").show(), $(".enter input").val(""), c = !1) : ($(this).children().css("backgroundPosition", "-334px -53px"), $(".enter,.dk_all,.care_con").css("display", "none"), $(".enter input").val(""), c = !0)
        }), $(".sure").click(function () {
            if (/^[0-9a-z]{16}$/.test($(".exchange").val())) {
                var a = $(".select-coupon option:selected").val();
                void 0 == a && (a = "0");
                var b = {couponId: $(".select-coupon option:selected").val()};
                $.post("/pay/coupon/validate", b, function (a) {
                    if (1 == a.code) {
                        var b = parseFloat(a.data.price);
                        OrderManager.couponPrice = b, b = b.toFixed(2), $(".dk_money").html("-￥ " + b), $(".money_d").show(), $(".money_d span").html("-￥ " + b);
                        var c = $(".money_all span:eq(1)").html() - b;
                        c = c < 0 ? 0 : c, $(".money_need span:eq(1)").html(c.toFixed(2)), $(".enter").css("display", "none"), $(".dk_all").css("display", "block"), $(".money_d").css("display", "block")
                    } else Lsmain.tip.warning(a.message)
                }, "json")
            } else messager.error("兑换码输入格式不正确，请重新输入")
        }), $(".use_care").hover(function () {
            $(".care_con").toggle()
        }), $(".cancle").click(function () {
            $(".care_con").css("display", "none")
        }), $(".cancel_use").click(function () {
            $(".money_d").hide(), $(".money_need span:eq(1)").html($(".money_all span:eq(1)").html()), $(".exchange").val(""), $(".enter,.dk_all").css("display", "none"), $(".use_dyq").children().css("backgroundPosition", "-334px -53px"), c = !0
        }), $(".shop_l_c").each(function (a, b) {
            $(".products_num").html(a + 1)
        })
    })
} catch (ex) {
    window.console && console.error(ex), window.BJ_REPORT && BJ_REPORT.report(ex)
}