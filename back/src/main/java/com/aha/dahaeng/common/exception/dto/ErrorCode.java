package com.aha.dahaeng.common.exception.dto;

/**
 * com.aha.dahaeng.common.exception.dto
 * ErrorCode.java
 * @date    2021-04-19 오후 5:31
 * @author  이주희
 *
 * @변경이력
 **/

public enum ErrorCode {
    USER_NOT_FOUND(400,"US_001", "해당 사용자를 찾을 수 없습니다."),
    CODE_NOT_FOUND(400,"US_002", "해당 선생님을 찾을 수 없습니다."),
    PASSWORD_NOT_MATCH(400, "US_003", "비밀 번호가 일치하지 않습니다.");

    private final String code;
    private final String message;
    private final int status;

    ErrorCode(int status, String code, String message) {
        this.status = status;
        this.message = message;
        this.code = code;
    }

    public String getMessage() {
        return this.message;
    }

    public String getCode() {
        return code;
    }

    public int getStatus() {
        return status;
    }
}