package com.mmbaby.site.customer.controller;

import com.mmbaby.customer.dto.submitbiz.CustomerSubmitDTO;
import com.mmbaby.customer.service.CustomerSubmitService;
import com.mmbaby.site.base.controller.BaseController;
import com.mmbaby.site.base.response.DataSuccessResponse;
import com.mmbaby.site.base.response.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Wanghui Fu
 * Created by Guaishushu on 2018/5/12 at 15:52
 */
@RestController
@RequestMapping("/customer")
public class CustomerController extends BaseController {

    @Autowired
    private CustomerSubmitService customerSubmitService;

    /**
     * 注册，提交客户信息
     * @param customerSubmitDTO
     * @return
     */
    @RequestMapping(value = "register", method = RequestMethod.POST)
    public Response register(CustomerSubmitDTO customerSubmitDTO) {

        return new DataSuccessResponse();
    }

    @RequestMapping(value = "login", method = RequestMethod.POST)
    public Response login(CustomerSubmitDTO customerSubmitDTO) {

        return new DataSuccessResponse();
    }

}
