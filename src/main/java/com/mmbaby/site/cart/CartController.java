package com.mmbaby.site.cart;

import com.dianping.pigeon.util.CollectionUtils;
import com.google.common.collect.Lists;
import com.mmbaby.base.util.GeneralResult;
import com.mmbaby.orderline.dto.cart.CartDTO;
import com.mmbaby.orderline.dto.domain.OrderLineDTO;
import com.mmbaby.product.dto.domain.ProductDTO;
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

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

import static com.mmbaby.site.base.constants.Constants.CUSTOMER_CART;
import static com.mmbaby.site.base.constants.Constants.PRODUCT_ID_LIST;

/**
 * @author Wanghui Fu
 * Created by Guaishushu on 2018/5/19 at 8:43
 */

@RestController
@RequestMapping("/cart")
public class CartController extends BaseController {

    @Autowired
    private ProductQueryService productQueryService;

    /**
     * 添加商品进购物车
     * @param session
     * @return
     */
    @RequestMapping(value = "/add-product", method = RequestMethod.POST)
    public Response addProduct(@RequestParam("productId") Integer productId,
                               @RequestParam(value = "num", defaultValue = "1") Integer num,
                               HttpSession session) {
        if (!isLogin()) {
            return new ErrorResponse("未登录");
        }

        if (productId == null) {
            return new ErrorResponse("添加购物车的productId 不可为空");
        }

        // 根据商品id查询商品
        GeneralResult<ProductDTO> generalResult = productQueryService.queryProductById(productId);
        if (!generalResult.isSuccess()
                || generalResult.getData() == null) {
            return new ErrorResponse(generalResult.getMsg());
        }

        CartDTO cartDTO = getCartDTO(session);
        cartDTO.addProduct(generalResult.getData(), num);

        // 再次放入session
        session.setAttribute(CUSTOMER_CART, cartDTO);

        return new SimpleSuccessResponse();
    }

    /**
     * 获取购物车中的所有商品
     * @param session
     * @return
     */
    @RequestMapping(value = "/get-cart-product", method = RequestMethod.GET)
    public Response getCartProductList(HttpSession session) {
        // 判断是否登陆
        if (!isLogin()) {
            return new ErrorResponse("请先登录");
        }

        // 获取购物车对象
        CartDTO cartDTO = getCartDTO(session);
        if (cartDTO != null
                && !CollectionUtils.isEmpty(cartDTO.getProductMap())) {
            List<OrderLineDTO> orderLineList = Lists.newArrayList();
            orderLineList.addAll(cartDTO.getProductMap().values());

            return new GeneralResponse<>(orderLineList);
        }

        return new SimpleSuccessResponse();
    }

    /**
     * 减少购物车中商品数量
     * @param productId
     * @param session
     * @return
     */
    @RequestMapping(value = "desc-product", method = RequestMethod.POST)
    public Response descProduct(Integer productId, HttpSession session) {
        // 判断是否登陆
        if (!isLogin()) {
            return new ErrorResponse("请先登录");
        }

        // 获取购物车对象
        CartDTO cartDTO = getCartDTO(session);
        if (cartDTO == null
                || CollectionUtils.isEmpty(cartDTO.getProductMap())) {
            return new ErrorResponse("购物车中暂无商品");
        }

        OrderLineDTO orderLineDTO = cartDTO.getProductMap().get(productId);
        if (orderLineDTO == null
                || orderLineDTO.getNumber() < 1) {
            return new ErrorResponse("商品不存在购物车");
        }

        if (orderLineDTO.getNumber() == 1) {
            cartDTO.getProductMap().remove(productId);
        } else {
            orderLineDTO.setNumber(orderLineDTO.getNumber() - 1);
        }

        // 再将cartDTO放进session
        session.setAttribute(CUSTOMER_CART, cartDTO);

        return new SimpleSuccessResponse();
    }

    /**
     * 增加购物车中商品数量
     * @param productId
     * @param session
     * @return
     */
    @RequestMapping(value = "incremen-product", method = RequestMethod.POST)
    public Response incrementProduct(Integer productId, HttpSession session) {
        // 判断是否登陆
        if (!isLogin()) {
            return new ErrorResponse("请先登录");
        }

        // 获取购物车对象
        CartDTO cartDTO = getCartDTO(session);
        if (cartDTO == null
                || CollectionUtils.isEmpty(cartDTO.getProductMap())) {
            return new ErrorResponse("购物车中暂无商品");
        }

        OrderLineDTO orderLineDTO = cartDTO.getProductMap().get(productId);
        if (orderLineDTO == null
                || orderLineDTO.getNumber() < 1) {
            return new ErrorResponse("商品不存在购物车");
        }

        orderLineDTO.setNumber(orderLineDTO.getNumber() + 1);

        // 再将cartDTO放进session
        session.setAttribute(CUSTOMER_CART, cartDTO);

        return new SimpleSuccessResponse();
    }

    /**
     * 增加或者减少购物车中商品数量
     * @param productId
     * @param num
     * @param session
     * @return
     */
    @RequestMapping(value = "update-product", method = RequestMethod.POST)
    public Response updateProduct(Integer productId, Integer num, HttpSession session) {
        // 判断是否登陆
        if (!isLogin()) {
            return new ErrorResponse("请先登录");
        }

        if (num < 0) {
            return new ErrorResponse("商品数量不可为负");
        }

        // 获取购物车对象
        CartDTO cartDTO = getCartDTO(session);
        if (cartDTO == null
                || CollectionUtils.isEmpty(cartDTO.getProductMap())) {
            return new ErrorResponse("购物车中暂无商品");
        }

        OrderLineDTO orderLineDTO = cartDTO.getProductMap().get(productId);
        if (orderLineDTO == null
                || orderLineDTO.getNumber() < 1) {
            return new ErrorResponse("商品不存在购物车");
        }

        if (num <= 0) {
            cartDTO.getProductMap().remove(productId);
        } else {
            orderLineDTO.setNumber(num);
        }

        // 再将cartDTO放进session
        session.setAttribute(CUSTOMER_CART, cartDTO);

        return new SimpleSuccessResponse();
    }

    /**
     * 删除购物车商品
     * @param productId
     * @param session
     * @return
     */
    @RequestMapping(value = "del-product", method = RequestMethod.POST)
    public Response delProduct(Integer productId, HttpSession session) {
        // 判断是否登陆
        if (!isLogin()) {
            return new ErrorResponse("请先登录");
        }

        // 获取购物车对象
        CartDTO cartDTO = getCartDTO(session);
        if (cartDTO == null
                || CollectionUtils.isEmpty(cartDTO.getProductMap())) {
            return new ErrorResponse("购物车中暂无商品");
        }

        OrderLineDTO orderLineDTO = cartDTO.getProductMap().get(productId);
        if (orderLineDTO == null
                || orderLineDTO.getNumber() < 1) {
            return new ErrorResponse("商品不存在购物车");
        }

        cartDTO.getProductMap().remove(productId);

        // 再将cartDTO放进session
        session.setAttribute(CUSTOMER_CART, cartDTO);

        return new SimpleSuccessResponse();
    }

    /**
     * 获取购物车中选择的要结算的商品集合
     * @param session
     * @return
     */
    @RequestMapping(value = "get-count-product", method = RequestMethod.GET)
    public Response getCountProductList(HttpSession session) {
        // 判断是否登陆
        if (!isLogin()) {
            return new ErrorResponse("请先登录");
        }

        // 获取购物车对象
        CartDTO cartDTO = getCartDTO(session);

        // 获取结算时选择的商品id集合
        List<Integer> productIdList = getProductIdList(session);

        // 获取选择的商品信息
        List<OrderLineDTO> productList = Lists.newArrayList();
        if (!CollectionUtils.isEmpty(cartDTO.getProductMap())
                && !CollectionUtils.isEmpty(productIdList)) {
            Map<Integer, OrderLineDTO> productMap = cartDTO.getProductMap();
            for (Integer productId : productIdList) {
                productList.add(productMap.get(productId));
            }
        }

        return new GeneralResponse<>(productIdList);
    }

    /**
     * 获取结算时选择的商品id集合
     * @param session
     * @return
     */
    private List<Integer> getProductIdList(HttpSession session) {
        List<Integer> productIdList = session.getAttribute(PRODUCT_ID_LIST) == null
                ? Lists.newArrayList()
                : (List<Integer>) session.getAttribute(PRODUCT_ID_LIST);

        return productIdList;
    }

    /**
     * 获取购物车对象
     * @param session
     * @return
     */
    private CartDTO getCartDTO(HttpSession session) {
        CartDTO cartDTO = session.getAttribute(CUSTOMER_CART) == null
                ? new CartDTO()
                : (CartDTO) session.getAttribute(CUSTOMER_CART);

        return cartDTO;
    }
}
