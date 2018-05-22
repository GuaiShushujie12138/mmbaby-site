package com.mmbaby.site.product.controller;

import com.dianping.pigeon.util.CollectionUtils;
import com.google.common.collect.Lists;
import com.mmbaby.base.util.GeneralResult;
import com.mmbaby.base.util.PageUtil;
import com.mmbaby.orderline.dto.cart.CartDTO;
import com.mmbaby.orderline.dto.domain.OrderLineDTO;
import com.mmbaby.product.dto.domain.ProductDTO;
import com.mmbaby.product.dto.query.ProductQueryDTO;
import com.mmbaby.product.service.ProductQueryService;
import com.mmbaby.shop.dto.domain.ShopDTO;
import com.mmbaby.shop.service.ShopQueryService;
import com.mmbaby.site.base.controller.BaseController;
import com.mmbaby.site.base.response.ErrorResponse;
import com.mmbaby.site.base.response.GeneralResponse;
import com.mmbaby.site.base.response.Response;
import com.mmbaby.site.base.response.SimpleSuccessResponse;
import com.site.lookup.util.StringUtils;
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

    @Autowired
    private ShopQueryService shopQueryService;

    /**
     * 跳转到商品列表页
     * @param category
     * @param session
     * @return
     */
    @RequestMapping(value = "/get-product-list", method = RequestMethod.GET)
    public ModelAndView getProductList(@RequestParam(value = "category", required = false) Integer category,
                                       @RequestParam(value = "shopId", required = false) Long shopId,
                                       @RequestParam(value = "priceRegion", required = false) Integer priceRegion,
                                       @RequestParam(value = "ageRegion", required = false) Integer ageRegion,
                                       HttpSession session) {
        ModelAndView view = new ModelAndView("show");

        if (category != null) {
            // 将传进来的category存进session中
            session.setAttribute(PRODUCT_CATEGORY, category);

            // 如果category传进来了，那么其他的搜索条件都失效，清空其他session中的条件
            session.removeAttribute(SHOP_ID);
            session.removeAttribute(PRICE_REGION);
            session.removeAttribute(AGE_REGION);
        }

        if (shopId != null) {
            // 将传进来的shopId存进session中
            session.setAttribute(SHOP_ID, shopId);
        } else {
            session.removeAttribute(SHOP_ID);
        }

        if (priceRegion != null) {
            // 将传进来的priceRegion存进session中
            session.setAttribute(PRICE_REGION, priceRegion);
        } else {
            session.removeAttribute(PRICE_REGION);
        }

        if (ageRegion != null) {
            // 将传进来的ageRegion存进session中
            session.setAttribute(AGE_REGION, ageRegion);
        } else {
            session.removeAttribute(AGE_REGION);
        }

        return view;
    }

    /**
     * 搜索商品
     * @param keyWord
     * @param session
     * @return
     */
    @RequestMapping(value = "/search-product", method = RequestMethod.GET)
    public ModelAndView searchProduct(@RequestParam(value = "keyWord", defaultValue = "纸尿裤") String keyWord,
                                      HttpSession session) {
        ModelAndView view = new ModelAndView("show");

        session.setAttribute(KEY_WORD, keyWord);

        return view;
    }

    /**
     * 查询商品列表
     * @param session
     * @return
     */
    @RequestMapping(value = "/query-product-list", method = RequestMethod.GET)
    public Response queryProductList(@RequestParam(value = "shopId", required = false) Long shopId,
                                     @RequestParam(value = "priceRegion", required = false) Integer priceRegion,
                                     @RequestParam(value = "ageRegion", required = false) Integer ageRegion,
                                     @RequestParam(value = "sort", required = false) String sort,
                                     @RequestParam(value = "pageSize", defaultValue = "10") Integer pageSize,
                                     @RequestParam(value = "page", defaultValue = "1") Integer page,
                                     @RequestParam(value = "keyword", required = false) String keyWord,
                                     HttpSession session) {
        if (StringUtils.isEmpty(keyWord)) {
            keyWord = session.getAttribute(KEY_WORD) == null
                    ? null
                    : (String) session.getAttribute(KEY_WORD);
        }

        if (StringUtils.isEmpty(keyWord)) {
            // 获取category
            Integer category = session.getAttribute(PRODUCT_CATEGORY) == null
                    ? null
                    : (Integer) session.getAttribute(PRODUCT_CATEGORY);

            Long shop_id = null;
            Integer price_region = null;
            Integer age_region = null;

            if (shopId == null) {
                // 获取商家信息
                shop_id = session.getAttribute(SHOP_ID) == null
                        ? null
                        : (Long) session.getAttribute(SHOP_ID);
            } else if (shopId == 0) {
                // 说明shopId 失效，已经不再使用该条件
                session.removeAttribute(SHOP_ID);
            } else {
                shop_id = shopId;
                session.setAttribute(SHOP_ID, shop_id);
            }

            if (priceRegion == null) {
                // 获取价格区间
                price_region = session.getAttribute(PRICE_REGION) == null
                        ? null
                        : (Integer) session.getAttribute(PRICE_REGION);
            } else if (priceRegion == 0) {
                // 说明priceRegion 失效，已经不再使用该条件
                session.removeAttribute(PRICE_REGION);
            } else {
                price_region = priceRegion;
                session.setAttribute(PRICE_REGION, price_region);
            }

            if (ageRegion == null) {
                // 获取年龄区间
                age_region = session.getAttribute(AGE_REGION) == null
                        ? null
                        : (Integer) session.getAttribute(AGE_REGION);
            } else if (ageRegion == 0) {
                // 说明priceRegion 失效，已经不再使用该条件
                session.removeAttribute(AGE_REGION);
            } else {
                age_region = ageRegion;
                session.setAttribute(AGE_REGION, age_region);
            }

            // 构造查询对象
            ProductQueryDTO productQueryDTO = buildProductQueryDTO(category, shop_id, price_region, age_region);

            // 构造分页对象
            PageUtil pageUtil = new PageUtil(page, pageSize);
            // 排序
            pageUtil.setSort(sort);
            // 搜索关键字
            if (StringUtils.isNotEmpty(keyWord)) {
                pageUtil.setKeyWord(keyWord);
            }

            // 根据category查询商品
            GeneralResult<List<ProductDTO>> generalResult =
                    productQueryService.queryProductList(productQueryDTO, pageUtil);
            if (!generalResult.isSuccess()
                    || CollectionUtils.isEmpty(generalResult.getData())) {
                return new GeneralResponse(null);
            }

            // 查询店铺名称,put
            List<ProductDTO> productList = buildProductList(generalResult.getData());

            return new GeneralResponse<>(productList);
        }

        PageUtil pageUtil = new PageUtil();
        pageUtil.setKeyWord(keyWord);
        GeneralResult<List<ProductDTO>> generalResult = productQueryService.queryByKeyWord(pageUtil);

        if (!generalResult.isSuccess()
                || CollectionUtils.isEmpty(generalResult.getData())) {
            return new GeneralResponse(null);
        }

        // 查询店铺名称,put
        List<ProductDTO> productList = buildProductList(generalResult.getData());

        // 清除keyword
        session.removeAttribute(KEY_WORD);

        return new GeneralResponse<>(productList);
    }

    /**
     * 跳转到商品的详情
     * @param productId
     * @param session
     * @return
     */
    @RequestMapping(value = "/get-product", method = RequestMethod.GET)
    public ModelAndView showProduct(@RequestParam(value = "id", defaultValue = "10") Integer productId,
                                    HttpSession session) {
        ModelAndView view = new ModelAndView("item");

        // 将传进来的productId存进session中
        session.setAttribute(PRODUCT_ID, productId);

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
     * 构造List<ProductDTO> 对象 put 店铺名称
     * @param productList
     * @return
     */
    private List<ProductDTO> buildProductList(List<ProductDTO> productList) {
        for (ProductDTO productDTO : productList) {
            GeneralResult<ShopDTO> generalResult = shopQueryService.queryShopById(productDTO.getShopId());
            if (generalResult.isSuccess()
                    && generalResult.getData() != null) {
                productDTO.setShopName(generalResult.getData().getName());
            }
        }

        return productList;
    }

    /**
     * 构造ProductQueryDTO 对象
     * @param category
     * @param shopId
     * @param priceRegion
     * @param ageRegion
     * @return
     */
    private ProductQueryDTO buildProductQueryDTO(Integer category, Long shopId,
                                                 Integer priceRegion, Integer ageRegion) {
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

        if (ageRegion != null) {
            productQueryDTO.setAgeRegion(ageRegion);
        }

        return productQueryDTO;
    }
}
