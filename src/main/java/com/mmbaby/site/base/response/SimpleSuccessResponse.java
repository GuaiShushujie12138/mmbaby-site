package com.mmbaby.site.base.response;

/**
 * @author Wanghui Fu
 * Created by Guaishushu on 2018/5/12 at 20:02
 */
public class SimpleSuccessResponse extends Response {

    public SimpleSuccessResponse() {
        this.code = SUCCESS_CODE;
        this.message = "操作成功";
    }
}
