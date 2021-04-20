package com.aha.dahaeng.common.exception.dto;

import lombok.Getter;

/**
 * com.aha.dahaeng.common.exception.dto
 * ErrorResponse.java
 * @date    2021-04-19 오후 5:30
 * @author  이주희
 *
 * @변경이력
 **/

@Getter
public class ErrorResponse {

    private String message;
    private String code;

    public ErrorResponse(String message, String code) {
        this.message = message;
        this.code = code;
    }
}