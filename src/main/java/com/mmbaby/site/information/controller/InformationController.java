package com.mmbaby.site.information.controller;

import com.dianping.pigeon.util.CollectionUtils;
import com.mmbaby.base.util.GeneralResult;
import com.mmbaby.information.dto.domain.InformationDTO;
import com.mmbaby.information.service.InformationQueryService;
import com.mmbaby.site.base.response.ErrorResponse;
import com.mmbaby.site.base.response.GeneralResponse;
import com.mmbaby.site.base.response.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author Wanghui Fu
 * Created by Guaishushu on 2018/5/18 at 20:46
 */

@RestController
@RequestMapping("/information")
public class InformationController {

    @Autowired
    private InformationQueryService informationQueryService;

    /**
     * 获取最近的一条资讯
     * @return
     */
    @RequestMapping(value = "/get-information", method = RequestMethod.GET)
    public Response getInformation() {
        GeneralResult<InformationDTO> generalResult = informationQueryService.queryLastInformation();

        if (!generalResult.isSuccess()
                || generalResult.getData() == null) {
            return new ErrorResponse(generalResult.getMsg());
        }

        return new GeneralResponse<>(generalResult.getData());
    }

    /**
     * 获取资讯列表
     * @return
     */
    @RequestMapping(value = "/get-information-list", method = RequestMethod.GET)
    public Response getInformationList() {
        GeneralResult<List<InformationDTO>> generalResult = informationQueryService.queryInformationList();

        if (!generalResult.isSuccess()
                || CollectionUtils.isEmpty(generalResult.getData())) {
            return new ErrorResponse(generalResult.getMsg());
        }

        return new GeneralResponse<>(generalResult.getData());
    }
}
