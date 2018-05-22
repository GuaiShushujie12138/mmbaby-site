package com.mmbaby.site.customer.controller;

import com.mmbaby.base.util.GeneralResult;
import com.mmbaby.customer.dto.domain.CustomerDTO;
import com.mmbaby.customer.dto.submitbiz.CustomerSubmitDTO;
import com.mmbaby.customer.service.CustomerQueryService;
import com.mmbaby.customer.service.CustomerSubmitService;
import com.mmbaby.site.base.controller.BaseController;
import com.mmbaby.site.base.response.*;
import com.site.lookup.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;

import static com.mmbaby.site.base.constants.Constants.LOGIN_CUSTOMER;

/**
 * @author Wanghui Fu
 * Created by Guaishushu on 2018/5/12 at 15:52
 */
@RestController
@RequestMapping("/customer")
public class CustomerController extends BaseController {

    @Autowired
    private CustomerSubmitService customerSubmitService;

    @Autowired
    private CustomerQueryService customerQueryService;

    /**
     * 注册，提交客户信息
     * @param customerSubmitDTO
     * @return
     */
    @RequestMapping(value = "register", method = RequestMethod.POST)
    public Response register(CustomerSubmitDTO customerSubmitDTO) {
        // 检查注册参数
        Response response = checkRegisterArgs(customerSubmitDTO);
        if (!response.isSuccess()) {
            return new ErrorResponse(response.getMessage());
        }

        // 提交注册信息
        GeneralResult<CustomerDTO> generalResult = customerSubmitService.submit(customerSubmitDTO);
        if (!generalResult.isSuccess()) {
            return new ErrorResponse(generalResult.getMsg());
        }

        return new DataSuccessResponse();
    }

    /**
     * 客户登陆
     * @param customerSubmitDTO
     * @return
     */
    @RequestMapping(value = "login", method = RequestMethod.POST)
    public Response login(CustomerSubmitDTO customerSubmitDTO, HttpSession session) {
        // 检查登陆参数
        Response response = checkLoginArgs(customerSubmitDTO);
        if (!response.isSuccess()) {
            return new ErrorResponse(response.getMessage());
        }

        // 进行登陆操作
        GeneralResult<CustomerDTO> generalResult = customerSubmitService.login(customerSubmitDTO);
        if (!generalResult.isSuccess()) {
            return new ErrorResponse(generalResult.getMsg());
        }

        // 登陆成功,将客户信息写进session中
        session.setAttribute(LOGIN_CUSTOMER, generalResult.getData());

        return new DataSuccessResponse();
    }

    /**
     * 客户注销
     * @param session
     * @return
     */
    @RequestMapping(value = "logout", method = RequestMethod.GET)
    public ModelAndView logout(HttpSession session) {
        ModelAndView view = new ModelAndView("index");

        // 清空session内容
        session.invalidate();

        return view;
    }

    /**
     * 更新客户信息
     * @param customerSubmitDTO
     * @return
     */
    @RequestMapping(value = "update-info", method = RequestMethod.POST)
    public Response updateCustomer(CustomerSubmitDTO customerSubmitDTO, HttpSession session) {
        // 检查登陆参数
        Response response = checkUpdateArgs(customerSubmitDTO);
        if (!response.isSuccess()) {
            return new ErrorResponse(response.getMessage());
        }

        GeneralResult<CustomerDTO> generalResult =
                customerSubmitService.updateCustomerInfo(customerSubmitDTO);
        if (!generalResult.isSuccess()
                || generalResult.getData() == null) {
            return new ErrorResponse(generalResult.getMsg());
        }

        // 更新session 中的客户信息
        session.setAttribute(LOGIN_CUSTOMER, generalResult.getData());

        return new GeneralResponse<>(generalResult.getData());
    }

    /**
     * 获取登陆客户信息
     * @param
     * @return
     */
    @RequestMapping(value = "get-customer", method = RequestMethod.POST)
    public Response getLoginCustomer() {
        // 判断是否登陆
        if (!isLogin()) {
            return new ErrorResponse("请先登录");
        }

        return new GeneralResponse<>( getCustomer());
    }

    /**
     * 检查更新参数
     * @param customerSubmitDTO
     * @return
     */
    private Response checkUpdateArgs(CustomerSubmitDTO customerSubmitDTO) {
        if (customerSubmitDTO == null) {
            return new ErrorResponse("提交的参数对象不能为空");
        }

        if (StringUtils.isEmpty(customerSubmitDTO.getCustomerName())) {
            return new ErrorResponse("客户名称不能为空");
        }

        if (StringUtils.isEmpty(customerSubmitDTO.getPassword())) {
            return new ErrorResponse("客户密码不能为空");
        }

        if (StringUtils.isEmpty(customerSubmitDTO.getMobile())) {
            return new ErrorResponse("客户注册手机号不能为空");
        }

        return new SimpleSuccessResponse();
    }

    /**
     * 检查登陆参数
     * @param customerSubmitDTO
     */
    private Response checkLoginArgs(CustomerSubmitDTO customerSubmitDTO) {
        if (customerSubmitDTO == null) {
            return new ErrorResponse("提交的参数对象不能为空");
        }

        if (StringUtils.isEmpty(customerSubmitDTO.getCustomerName())) {
            return new ErrorResponse("客户名称不能为空");
        }

        if (StringUtils.isEmpty(customerSubmitDTO.getPassword())) {
            return new ErrorResponse("客户密码不能为空");
        }

        return new SimpleSuccessResponse();
    }

    /**
     * 检查注册参数
     * @param customerSubmitDTO
     * @return
     */
    private Response checkRegisterArgs(CustomerSubmitDTO customerSubmitDTO) {
        if (customerSubmitDTO == null) {
            return new ErrorResponse("提交的参数对象不能为空");
        }

        if (StringUtils.isEmpty(customerSubmitDTO.getCustomerName())) {
            return new ErrorResponse("客户名称不能为空");
        }

        if (StringUtils.isEmpty(customerSubmitDTO.getPassword())) {
            return new ErrorResponse("客户密码不能为空");
        }

        if (StringUtils.isEmpty(customerSubmitDTO.getMobile())) {
            return new ErrorResponse("客户注册手机号不能为空");
        }

        return new SimpleSuccessResponse();
    }
}
