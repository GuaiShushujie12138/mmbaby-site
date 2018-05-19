package com.mmbaby.site.order.controller;

import com.dianping.pigeon.util.CollectionUtils;
import com.google.common.collect.Lists;
import com.mmbaby.base.util.GeneralResult;
import com.mmbaby.order.dto.domain.OrderDTO;
import com.mmbaby.order.dto.submitbiz.OrderSubmitDTO;
import com.mmbaby.order.enums.OrderStatusEnum;
import com.mmbaby.order.service.OrderQueryService;
import com.mmbaby.order.service.OrderSubmitService;
import com.mmbaby.orderline.dto.cart.CartDTO;
import com.mmbaby.orderline.dto.domain.OrderLineDTO;
import com.mmbaby.site.base.controller.BaseController;
import com.mmbaby.site.base.response.ErrorResponse;
import com.mmbaby.site.base.response.GeneralResponse;
import com.mmbaby.site.base.response.Response;
import com.mmbaby.site.base.response.SimpleSuccessResponse;
import org.springframework.beans.BeanUtils;
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
 * Created by Guaishushu on 2018/5/19 at 9:42
 */

@RestController
@RequestMapping("/order")
public class OrderController extends BaseController {

    @Autowired
    private OrderSubmitService orderSubmitService;

    @Autowired
    private OrderQueryService orderQueryService;

    /**
     * 保存订单
     * @param orderSubmitDTO
     * @param session
     * @return
     */
    @RequestMapping(value = "add-order", method = RequestMethod.POST)
    public Response addOrder(@RequestParam("orderSubmit") OrderSubmitDTO orderSubmitDTO, HttpSession session) {
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

        orderSubmitDTO.setOrderLineList(productList);

        GeneralResult<OrderDTO> generalResult = orderSubmitService.saveOrder(orderSubmitDTO);
        if (!generalResult.isSuccess()
                || generalResult.getData() == null) {
            return new ErrorResponse(generalResult.getMsg());
        }

        // 将session中的购物车中被选中的商品删除
        for (Integer productId : productIdList) {
            cartDTO.getProductMap().remove(productId);
        }

        return new GeneralResponse<>(generalResult.getData());
    }

    /**
     * 支付
     * @param orderId
     * @return
     */
    @RequestMapping(value = "pay", method = RequestMethod.POST)
    public Response payOk(Integer orderId) {
        // 根据orderId 查询订单
        GeneralResult<OrderDTO> generalResult = orderQueryService.queryOrderById(orderId);
        if (!generalResult.isSuccess()
                || generalResult.getData() == null) {
            return new ErrorResponse(generalResult.getMsg());
        }

        // 构造OrderSubmitDTO 对象
        OrderSubmitDTO orderSubmitDTO = buildOrderSubmitDTO(generalResult.getData());

        // 更改订单状态
        orderSubmitDTO.setStatus(OrderStatusEnum.WAIT_RECEIVE.getCode());

        GeneralResult<OrderDTO> generalResult2 = orderSubmitService.updateOrder(orderSubmitDTO);

        return new GeneralResponse<>(generalResult2.getData());
    }

    /**
     * 构造OrderSubmitDTO 对象
     * @param orderDTO
     * @return
     */
    private OrderSubmitDTO buildOrderSubmitDTO(OrderDTO orderDTO) {
        OrderSubmitDTO orderSubmitDTO = new OrderSubmitDTO();

        BeanUtils.copyProperties(orderDTO, orderSubmitDTO);

        return orderSubmitDTO;
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
