package com.mmbaby.site.base.controller;

import com.dianping.pigeon.util.CollectionUtils;
import com.google.common.collect.Lists;
import com.mmbaby.customer.dto.domain.CustomerDTO;
import com.mmbaby.site.base.constants.Constants;
import com.mmbaby.site.base.response.GeneralResponse;
import com.mmbaby.site.base.response.Response;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import java.util.Arrays;
import java.util.List;

import static com.mmbaby.site.base.constants.Constants.LOGIN_CUSTOMER;
import static com.mmbaby.site.base.constants.Constants.ORDER_ID;
import static com.mmbaby.site.base.constants.Constants.PRODUCT_ID_LIST;

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
     * 跳转进购物车界面
     * @return
     */
    @RequestMapping(value = "/cart", method = RequestMethod.GET)
    public ModelAndView goCart() {
        ModelAndView view = new ModelAndView("cart");

        // 未登录就跳转到登陆界面
        if (!isLogin()) {
            view.setViewName("login");
        }

        return view;
    }

    /**
     * 进入结算页面
     * @param productIdList
     * @return
     */
    @RequestMapping(value = "/count", method = RequestMethod.POST)
    public ModelAndView goCount(Integer[] productIdList, HttpSession session) {
        ModelAndView view = new ModelAndView("count");

        List<Integer> idList = Arrays.asList(productIdList);

        // 判断是否登陆
        if (!isLogin()) {
            view.setViewName("login");
        } else {
            if (CollectionUtils.isEmpty(idList)) {
                view.setViewName("cart");
            }
            // 将选择的商品id集合放进session
            session.setAttribute(PRODUCT_ID_LIST, idList);
        }

        return view;
    }

    /**
     * 结算界面
     * @param session
     * @return
     */
    @RequestMapping(value = "/go-count", method = RequestMethod.GET)
    public ModelAndView goToCount(HttpSession session) {
        ModelAndView view = new ModelAndView("count");

        // 判断是否登陆
        if (!isLogin()) {
            view.setViewName("login");
        }

        return view;
    }

    /**
     * 支付界面
     * @param session
     * @return
     */
    @RequestMapping(value = "/pay", method = RequestMethod.GET)
    public ModelAndView goToPay(HttpSession session) {
        ModelAndView view = new ModelAndView("pay");

        // 判断是否登陆
        if (!isLogin()) {
            view.setViewName("login");
        }

        return view;
    }

    /**
     * 订单详情界面
     * @param session
     * @return
     */
    @RequestMapping(value = "/order_detail", method = RequestMethod.GET)
    public ModelAndView goToOrderDetail(Integer orderId, HttpSession session) {
        ModelAndView view = new ModelAndView("order_detail");

        // 判断是否登陆
        if (!isLogin()) {
            view.setViewName("login");
        } else {
            session.setAttribute(ORDER_ID, orderId);
        }

        return view;
    }

    /**
     * 个人中心界面
     * @param session
     * @return
     */
    @RequestMapping(value = "/userinfo", method = RequestMethod.GET)
    public ModelAndView goToUserInfo(HttpSession session) {
        ModelAndView view = new ModelAndView("userinfo");

        // 判断是否登陆
        if (!isLogin()) {
            view.setViewName("login");
        } else {

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
