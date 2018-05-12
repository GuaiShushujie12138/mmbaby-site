package com.mmbaby.site.base.response;

import java.util.HashMap;
import java.util.Map;

/**
 * @author Wanghui Fu
 * Created by Guaishushu on 2018/5/12 at 20:06
 */
public class DataSuccessResponse extends SimpleSuccessResponse {

    private Map<String, Object> data;

    public DataSuccessResponse(Map<String, Object> data) {
        super();
        this.data = data;
    }

    public DataSuccessResponse() {
        super();
        this.data = new HashMap<>();
    }

    public DataSuccessResponse add(String name, Object value) {

        this.data.put(name, value);

        return this;
    }

    public Map<String, Object> getData() {
        return data;
    }
}
