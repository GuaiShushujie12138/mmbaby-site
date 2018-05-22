/*!  2017-04-14 */
try {
    !function () {
        function a() {
        }

        function b(a) {
            return $(this).html('<img class="autosize personVisitingCard" data-img="" src="' + a + '" />'), $(".personVisitingCard").length < 2 ? void $("#en-upload-license2").show() : !1
        }

        Lsmain;
        window.ApplyContact = a, a.prototype.init = function () {
            $("#applyType").val();
            this.validationModel = this.personalValidationModel, $.extend(AjaxUpload.handlers, {updatePersonVisitingCard: b})
        }, a.prototype.personalValidationModel = {
            contactName: {required: "真实姓名不能为空"},
            position: {required: "职务必须填写"},
            mobile: {mobile: "无效的手机号码"},
            tel: {tel: "无效的电话号码"}
        }, a.prototype.saveContact = function (a) {
            var b = this.read($("#userInfo"));
            b.type = $("#applyType").val(), b.identityPics = b.identityPics.join(","), this.noRedirect = a.noRedirect, this.yesValidation(b) && (this.lock(this.saveContact), this.post("/user/save-contact", b).complete(this.getCall(this.saveContactComplete)))
        }, a.prototype.saveContactComplete = function (a, b) {
            b = a || b, a ? this.error("保存异常,请稍后重新试试!") : 1 == b.status ? this.noRedirect ? this.success("保存成功").delayReload() : this.success("保存成功,前往下一步...").delayRedirect(b.data.url) : (this.unLock(this.saveContact), this.error(b.message))
        }, LsPageClass.run(a)
    }()
} catch (ex) {
    window.console && console.error(ex), window.BJ_REPORT && BJ_REPORT.report(ex)
}