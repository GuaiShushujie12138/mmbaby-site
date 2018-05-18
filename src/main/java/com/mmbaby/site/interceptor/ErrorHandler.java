package com.mmbaby.site.interceptor;

import com.mmbaby.site.base.response.ErrorResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * @author Wanghui Fu
 * Created by Guaishushu on 2018/5/18 at 12:14
 */
@ControllerAdvice
public class ErrorHandler {

    private static final Logger LOGGER = LoggerFactory.getLogger(ErrorHandler.class);

    @ExceptionHandler(value = Exception.class)
    @ResponseBody
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse errorResponse(Exception e) {
        LOGGER.error("REST API was invoked with exception", e);
        return new ErrorResponse(e.getMessage());
    }
}
