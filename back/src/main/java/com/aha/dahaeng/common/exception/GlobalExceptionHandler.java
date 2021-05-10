package com.aha.dahaeng.common.exception;

import com.aha.dahaeng.common.exception.dto.ErrorCode;
import com.aha.dahaeng.common.exception.dto.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

/**
 * com.aha.dahaeng.common.exception
 * GlobalExceptionHandler.java
 * @date    2021-04-19 오후 5:18
 * @author  이주희
 *
 * @변경이력
 **/

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<?> handleNotFoundException(NotFoundException e){
        ErrorCode errorCode = e.getErrorCode();
        String message = errorCode.getMessage();
        String code = errorCode.getCode();
        ErrorResponse errorResponse = new ErrorResponse(message, code);
        return new ResponseEntity<>(errorResponse, HttpStatus.valueOf(errorCode.getStatus()));
    }

}
