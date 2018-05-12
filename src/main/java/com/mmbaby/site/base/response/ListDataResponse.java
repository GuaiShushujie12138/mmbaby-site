package com.mmbaby.site.base.response;

import java.util.List;

/**
 * @author Wanghui Fu
 * Created by Guaishushu on 2018/5/12 at 20:04
 */
public class ListDataResponse<T> extends DataResponse {

    private int draw;

    //当前页的个数
    private int recordsTotal = 0;

    //总个数
    private int recordsFiltered = 0;

    public ListDataResponse(int draw, int recordsTotal, int recordsFiltered, List<T> list) {
        this.draw = draw;
        this.recordsTotal = recordsTotal;
        this.recordsFiltered = recordsFiltered;
        super.add("list", list);
    }

    public ListDataResponse() {}

    public int getDraw() {
        return draw;
    }

    public int getRecordsTotal() {
        return recordsTotal;
    }

    public int getRecordsFiltered() {
        return recordsFiltered;
    }
}

