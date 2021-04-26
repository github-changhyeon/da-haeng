package com.aha.dahaeng.user.dto.request;

import lombok.Getter;
import lombok.Setter;

/**
 * com.aha.dahaeng.user.dto.request
 * LoginRequest.java
 *
 * @author 이주희
 * @date 2021-04-22 오후 3:09
 * @변경이력
 **/

@Getter
@Setter
public class LoginRequest {
    private String id;
    private String password;
}
