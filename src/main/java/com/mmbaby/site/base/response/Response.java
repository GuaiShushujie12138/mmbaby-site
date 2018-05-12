package com.mmbaby.site.base.response;

/**
 * @author Wanghui Fu
 * Created by Guaishushu on 2018/5/12 at 20:02
 */
public abstract class Response {

    public static final int SUCCESS_CODE = 200;

    public static final int ERROR_CODE = -1;

    public static final int INVALID_TOKEN = -100;

    public static final int NEED_UPDATE = -953;

    protected int code;

    protected String message;

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isSuccess() {
        return this.code == 200;
    }

    public Response(int code, String msg) {
        this.code = code;
        this.message = msg;
    }

    public Response() {
        this.code = SUCCESS_CODE;
        this.message = "success";
    }

}
