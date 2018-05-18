package com.mmbaby.site.base.controller;

import com.mmbaby.customer.dto.domain.CustomerDTO;
import com.mmbaby.site.base.response.GeneralResponse;
import com.mmbaby.site.base.response.Response;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import static com.mmbaby.site.base.constants.Constants.LOGIN_CUSTOMER;

/**
 * @author Wanghui Fu
 * Created by Guaishushu on 2018/4/24 at 18:19
 */
@RestController
@RequestMapping("/")
public class WebController extends BaseController {

    /**
     * 首页
     * @return
     */
    @RequestMapping(value = {"/", "/index", "/index.html"}, method = RequestMethod.GET)
    public ModelAndView getIndex() {

        ModelAndView view = new ModelAndView("index");

        return view;
    }

    /**
     * 客户登陆界面
     * @return
     */
    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public ModelAndView getLogin() {

        ModelAndView view = new ModelAndView("login");

        if (isLogin()) {
            view.setViewName("index");
        }

        return view;
    }

    /**
     * 客户注册界面
     * @return
     */
    @RequestMapping(value = "/register", method = RequestMethod.GET)
    public ModelAndView getRegister() {

        ModelAndView view = new ModelAndView("register");

        if (isLogin()) {
            view.setViewName("index");
        }

        return view;
    }



    /**
     * 是否登陆,并且获取登陆的客户信息
     * @return
     */
    @RequestMapping(value = "/ifLogin", method = RequestMethod.POST, produces = "application/json")
    public Response ifLogin() {
        CustomerDTO customerDTO = getCustomer();

        return new GeneralResponse<CustomerDTO>(customerDTO);
    }
}
