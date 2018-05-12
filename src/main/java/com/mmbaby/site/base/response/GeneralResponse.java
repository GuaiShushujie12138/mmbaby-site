package com.mmbaby.site.base.response;

/**
 * @author Wanghui Fu
 * Created by Guaishushu on 2018/5/12 at 20:05
 */
public class GeneralResponse<T> extends Response {

    private T data;

    public GeneralResponse(int code, String msg, T data) {
        super(code, msg);
        this.data = data;
    }

    public GeneralResponse(T data) {
        super();
        this.data = data;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}

