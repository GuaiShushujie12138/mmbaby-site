package com.mmbaby.site.base.request;

/**
 * @author Wanghui Fu
 * Created by Guaishushu on 2018/5/12 at 20:04
 */
public class PageRequestData {

    private int pageId = 1;

    private int pageSize = 50;

    private String sort;

    public int getPageId() {
        return pageId;
    }

    public void setPageId(int pageId) {
        this.pageId = pageId;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public String getSort() {
        return sort;
    }

    public void setSort(String sort) {
        this.sort = sort;
    }
}

