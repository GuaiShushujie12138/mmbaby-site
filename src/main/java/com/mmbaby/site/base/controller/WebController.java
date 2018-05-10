package com.mmbaby.site.base.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

/**
 * @author Wanghui Fu
 * Created by Guaishushu on 2018/4/24 at 18:19
 */
@RestController
@RequestMapping("/")
public class WebController {

    @RequestMapping(value = {"/", "/index", "/index.html"}, method = RequestMethod.GET)
    public ModelAndView getIndex() {

        ModelAndView view = new ModelAndView("index");

        return view;
    }
}
