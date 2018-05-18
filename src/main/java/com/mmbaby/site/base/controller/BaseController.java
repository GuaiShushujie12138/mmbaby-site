package com.mmbaby.site.base.controller;

import com.mmbaby.customer.dto.domain.CustomerDTO;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import static com.mmbaby.site.base.constants.Constants.LOGIN_CUSTOMER;

/**
 * @author Wanghui Fu
 * Created by Guaishushu on 2018/5/12 at 21:01
 */
public class BaseController {

    private static String basePath = "";

    public static final String INDEX_URL = "/";

    public boolean isLogin() {
        return getCustomer() != null && getCustomer().getId() != null;
    }

    /**
     * 获取当前登陆的客户
     *
     * @return
     */
    public CustomerDTO getCustomer() {

        HttpServletRequest request =
                ((ServletRequestAttributes) RequestContextHolder
                .getRequestAttributes()).getRequest();
        HttpSession session = request.getSession();

        Object object = session.getAttribute(LOGIN_CUSTOMER);
        CustomerDTO customerDTO = object == null
                ? null
                : (CustomerDTO) object;

        return customerDTO;
    }


    public String getLoginUrl(HttpServletRequest req) throws Exception {
        return getLoginUrl(req, "");
    }

    public String getLoginUrl(HttpServletRequest req,
                              String redirect) throws Exception {

        String loginUrl;

        loginUrl = getBasePath(req) + "/login";

        return loginUrl;
    }

    public String getLogoutUrl(HttpServletRequest req) throws Exception {

        String loginOutUrl = getBasePath(req) + "/logout";

        return loginOutUrl;
    }

    public String getBasePath(HttpServletRequest request) {

        basePath = request.getContextPath();

        return basePath;
    }

    public ModelAndView buildAuthFailView(ModelAndView view, String errorMsg) {
        view.addObject("errorMsg", errorMsg);
        view.addObject("isSuccess", false);
        return view;
    }

    protected ModelAndView buildAuthFailView(ModelAndView view, String errorMsg, String redirectUrl,
                                             String redirectUrlTitle) {
        view.setViewName("authfail");
        view.addObject("errorMsg", errorMsg);
        view.addObject("redirectUrl", redirectUrl);
        view.addObject("redirectUrlTitle", redirectUrlTitle);
        return view;
    }

}
