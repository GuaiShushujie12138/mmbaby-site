package com.mmbaby.site.address.controller;

import com.mmbaby.address.dto.domain.AddressDTO;
import com.mmbaby.address.dto.submitbiz.AddressSubmitDTO;
import com.mmbaby.address.service.AddressQueryService;
import com.mmbaby.address.service.AddressSubmitService;
import com.mmbaby.base.util.GeneralResult;
import com.mmbaby.customer.dto.domain.CustomerDTO;
import com.mmbaby.site.base.controller.BaseController;
import com.mmbaby.site.base.response.ErrorResponse;
import com.mmbaby.site.base.response.GeneralResponse;
import com.mmbaby.site.base.response.Response;
import com.mmbaby.site.base.response.SimpleSuccessResponse;
import com.site.lookup.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.xml.ws.soap.Addressing;
import java.util.List;

/**
 * @author Wanghui Fu
 * Created by Guaishushu on 2018/5/19 at 9:28
 */

@RestController
@RequestMapping("/address")
public class AddressController extends BaseController {

    @Autowired
    private AddressQueryService addressQueryService;

    @Autowired
    private AddressSubmitService addressSubmitService;

    /**
     * 查询客户的所有收货地址
     * @return
     */
    @RequestMapping(value = "get-all-adress", method = RequestMethod.GET)
    public Response getAllAddress() {
        if (!isLogin()) {
            return new ErrorResponse("请先登陆");
        }

        CustomerDTO customerDTO = getCustomer();

        // 根据客户id查询出所有的收货地址
        GeneralResult<List<AddressDTO>> gerneralResult =
                addressQueryService.queryAddressListByCustomerId(customerDTO.getId());
        if (!gerneralResult.isSuccess()
                || gerneralResult.getData() == null) {
            return new ErrorResponse(gerneralResult.getMsg());
        }

        return new GeneralResponse<>(gerneralResult.getData());
    }

    /**
     * 添加收货地址
     * @param addressSubmitDTO
     * @return
     */
    @RequestMapping(value = "add-adress", method = RequestMethod.POST)
    public Response addAddress(AddressSubmitDTO addressSubmitDTO) {
        if (!isLogin()) {
            return new ErrorResponse("请先登陆");
        }

        // 检查提交参数
        Response response = checkAddressSubmitDTO(addressSubmitDTO);
        if (!response.isSuccess()) {
            return new ErrorResponse(response.getMessage());
        }

        GeneralResult<AddressDTO> generalResult = addressSubmitService.saveAddress(addressSubmitDTO);
        if (!generalResult.isSuccess()
                || generalResult.getData() == null) {
            return new ErrorResponse(generalResult.getMsg());
        }

        return new GeneralResponse<>(generalResult.getData());
    }

    /**
     * 检查提交参数
     * @param addressSubmitDTO
     * @return
     */
    private Response checkAddressSubmitDTO(AddressSubmitDTO addressSubmitDTO) {
        if (StringUtils.isEmpty(addressSubmitDTO.getReceiveName())) {
            return new ErrorResponse("收货人姓名不可为空");
        }

        if (StringUtils.isEmpty(addressSubmitDTO.getAddress())) {
            return new ErrorResponse("收货地址不可为空");
        }

        if (StringUtils.isEmpty(addressSubmitDTO.getMobile())) {
            return new ErrorResponse("收货人手机不可为空");
        }

        return new SimpleSuccessResponse();
    }

}
