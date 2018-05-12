package com.mmbaby.site.base.response;

import java.util.HashMap;
import java.util.Map;

/**
 * @author Wanghui Fu
 * Created by Guaishushu on 2018/5/12 at 20:01
 */
public class DataResponse<T> extends SimpleSuccessResponse {

    private Map<String, Object> data;

    public DataResponse(Map<String, Object> data) {
        super();
        this.data = data;
    }

    public DataResponse() {
        super();
        this.data = new HashMap<String, Object>();
    }

    public DataResponse add(String name, Object value) {

        this.data.put(name, value);

        return this;
    }

    public Map<String, Object> getData() {
        return data;
    }
}
