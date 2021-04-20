package com.aha.dahaeng.common.exception;

import com.aha.dahaeng.common.exception.dto.ErrorCode;

/**
 * com.aha.dahaeng.common.exception
 * NotFoundException.java
 * @date    2021-04-19 오후 5:32
 * @author  이주희
 *
 * @변경이력
 **/

public class NotFoundException extends BusinessException {

    public NotFoundException(ErrorCode errorCode) {
        super(errorCode);
    }

}