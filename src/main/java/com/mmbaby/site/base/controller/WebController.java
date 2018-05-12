package com.mmbaby.site.base.controller;

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

    @RequestMapping(value = {"/", "/index", "/index.html"}, method = RequestMethod.GET)
    public ModelAndView getIndex() {

        ModelAndView view = new ModelAndView("index");

        return view;
    }

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public ModelAndView getLogin() {

        ModelAndView view = new ModelAndView("login");

        if (isLogin()) {
            view.setViewName("index");
        }

        return view;
    }

    @RequestMapping(value = "/register", method = RequestMethod.GET)
    public ModelAndView getRegister() {

        ModelAndView view = new ModelAndView("register");

        if (isLogin()) {
            view.setViewName("index");
        }

        return view;
    }
}
