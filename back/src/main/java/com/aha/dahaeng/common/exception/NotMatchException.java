package com.aha.dahaeng.common.exception;

import com.aha.dahaeng.common.exception.dto.ErrorCode;

/**
 * com.aha.dahaeng.common.exception
 * NotMatchException.java
 * @date    2021-04-22 오후 4:19
 * @author  이주희
 *
 * @변경이력
 **/

public class NotMatchException extends BusinessException {

    public NotMatchException(ErrorCode errorCode) {
        super(errorCode);
    }

}