package com.mmbaby.site.base.response;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @author Wanghui Fu
 * Created by Guaishushu on 2018/5/12 at 20:05
 */
public class ErrorResponse extends Response {

    private static final Logger LOGGER = LoggerFactory.getLogger(ErrorResponse.class);

    public final static ErrorResponse SYSTEM_WRONG = new ErrorResponse(ERROR_CODE, "系统故障，请稍候重试");
    public final static ErrorResponse LOGIN_FAIL = new ErrorResponse(-101, "登录失败，请检查参数");
    public final static ErrorResponse NEED_LOGIN = new ErrorResponse(-102, "请登陆");
    public final static ErrorResponse VERIFY_FAIL = new ErrorResponse(-103, "登陆校验失败");
    public final static ErrorResponse PRIVILEGE_VERIFY_FAIL = new ErrorResponse(-104, "没有此功能的权限");
    public final static ErrorResponse PAGE_SIZE_TOO_BIG = new ErrorResponse(-105, "分页太大");
    public final static ErrorResponse PAGE_ID_INVALID = new ErrorResponse(-106, "无效的页数ID");
    public final static ErrorResponse NO_USER_DEPT = new ErrorResponse(-107, "此用户无组织信息");
    public final static ErrorResponse INVALID_FILE = new ErrorResponse(-108, "文件错误");
    public final static ErrorResponse INVALID_CUSTOMER = new ErrorResponse(-109, "无效的客户");
    public final static ErrorResponse INVALID_TASK = new ErrorResponse(-110, "无效的任务");
    public final static ErrorResponse INVALID_CUSTOMER_NAME = new ErrorResponse(-113, "客户名无效");
    public final static ErrorResponse INVALID_ARGS = new ErrorResponse(-114, "参数错误，请检查");
    public final static ErrorResponse INVALID_USER = new ErrorResponse(-115, "用户不存在");
    public final static ErrorResponse INVALID_SAVE_PACKING_SLIP_DETAIL_EMPTY = new ErrorResponse(-120, "提交码单，色号列表不能为空");
    public final static ErrorResponse NO_DATA = new ErrorResponse(-117, "暂无数据");

    // todo, 统一划分错误的种类

    public ErrorResponse(String msg) {

        this.code = Response.ERROR_CODE;
        this.message = msg;
        LOGGER.error(this.code + ":" + msg);
    }

    public ErrorResponse() {
        this.code = Response.ERROR_CODE;
    }

    public ErrorResponse(int code, String msg) {
        super(code, msg);
    }

}

