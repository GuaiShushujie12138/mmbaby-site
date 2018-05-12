package com.mmbaby.site.base.request;

import java.io.Serializable;

/**
 * @author Wanghui Fu
 * Created by Guaishushu on 2018/5/12 at 20:01
 */
public class DataRequest<T> implements Serializable {

    private T data;

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "DataRequest{" +
                "data=" + data +
                '}';
    }
}

