package com.aha.dahaeng.common.exception;

import com.aha.dahaeng.common.exception.dto.ErrorCode;
import lombok.Getter;

/**
 * com.aha.dahaeng.common.exception
 * BusinessException.java
 * @date    2021-04-19 오후 5:32
 * @author  이주희
 *
 * @변경이력
 **/

@Getter
public class BusinessException extends RuntimeException {
    private final ErrorCode errorCode;

    public BusinessException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
