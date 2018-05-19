package com.mmbaby.site.product.controller;

import com.dianping.pigeon.util.CollectionUtils;
import com.google.common.collect.Lists;
import com.mmbaby.base.util.GeneralResult;
import com.mmbaby.orderline.dto.cart.CartDTO;
import com.mmbaby.orderline.dto.domain.OrderLineDTO;
import com.mmbaby.product.dto.domain.ProductDTO;
import com.mmbaby.product.dto.query.ProductQueryDTO;
import com.mmbaby.product.service.ProductQueryService;
import com.mmbaby.site.base.controller.BaseController;
import com.mmbaby.site.base.response.ErrorResponse;
import com.mmbaby.site.base.response.GeneralResponse;
import com.mmbaby.site.base.response.Response;
import com.mmbaby.site.base.response.SimpleSuccessResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;

import java.util.List;
import java.util.Map;

import static com.mmbaby.site.base.constants.Constants.*;

/**
 * @author Wanghui Fu
 * Created by Guaishushu on 2018/5/18 at 12:12
 */

@RestController
@RequestMapping("/product")
public class ProductController extends BaseController {

    @Autowired
    private ProductQueryService productQueryService;

    /**
     * 跳转到商品列表页
     * @param category
     * @param session
     * @return
     */
    @RequestMapping(value = "/get-product-list", method = RequestMethod.GET)
    public ModelAndView getProductList(@RequestParam(value = "category", defaultValue = "10") Integer category,
                                       HttpSession session) {
        ModelAndView view = new ModelAndView("show");

        // 将传进来的category存进session中
        session.setAttribute(PRODUCT_CATEGORY, category);

        return view;
    }

    /**
     * 查询商品列表
     * @param session
     * @return
     */
    @RequestMapping(value = "/query-product-list", method = RequestMethod.GET)
    public Response queryProductList(HttpSession session) {
        // 获取category
        Integer category = session.getAttribute(PRODUCT_CATEGORY) == null
                ? null
                : (Integer) session.getAttribute(PRODUCT_CATEGORY);

        // 获取商家信息
        Long shopId = session.getAttribute(SHOP_ID) == null
                ? null
                : (Long) session.getAttribute(SHOP_ID);

        // 获取价格区间
        Integer price_region = session.getAttribute(PRICE_REGION) == null
                ? null
                : (Integer) session.getAttribute(PRICE_REGION);

        // 构造查询对象
        ProductQueryDTO productQueryDTO = buildProductQueryDTO(category, shopId, price_region);

        // 根据category查询商品
        GeneralResult<List<ProductDTO>> generalResult =
                productQueryService.queryProductList(productQueryDTO);
        if (!generalResult.isSuccess()
                || CollectionUtils.isEmpty(generalResult.getData())) {
            return new GeneralResponse(null);
        }

        return new GeneralResponse<>(generalResult.getData());
    }

    /**
     * 跳转到商品的详情
     * @param productId
     * @param session
     * @return
     */
    @RequestMapping(value = "/show-product", method = RequestMethod.GET)
    public ModelAndView showProduct(@RequestParam(value = "productId", defaultValue = "10") Integer productId,
                                    HttpSession session) {
        ModelAndView view = new ModelAndView("item");

        // 将传进来的productId存进session中
        session.setAttribute(PRODUCT_CATEGORY, productId);

        return view;
    }

    /**
     * 查询单个商品详细信息
     * @param session
     * @return
     */
    @RequestMapping(value = "/query-product", method = RequestMethod.GET)
    public Response queryProduct(HttpSession session) {
        // 获取productId
        Integer productId = session.getAttribute(PRODUCT_ID) == null
                ? DEFAULT_PRODUCT_ID
                : (Integer) session.getAttribute(PRODUCT_ID);

        // 根据productId查询商品信息
        GeneralResult<ProductDTO> generalResult = productQueryService.queryProductById(productId);
        if (!generalResult.isSuccess()
                || generalResult.getData() == null) {
            return new ErrorResponse(generalResult.getMsg());
        }

        return new GeneralResponse<>(generalResult.getData());
    }

    /**
     * 构造ProductQueryDTO 对象
     * @param category
     * @return
     */
    private ProductQueryDTO buildProductQueryDTO(Integer category, Long shopId, Integer priceRegion) {
        ProductQueryDTO productQueryDTO = new ProductQueryDTO();

        if (category != null) {
            productQueryDTO.setCategory(category);
        }

        if (shopId != null) {
            productQueryDTO.setShopId(shopId);
        }

        if (priceRegion != null) {
            productQueryDTO.setPriceRegion(priceRegion);
        }

        return productQueryDTO;
    }
}
