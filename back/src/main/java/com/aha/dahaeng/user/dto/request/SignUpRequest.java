package com.aha.dahaeng.user.dto.request;

import lombok.Getter;
import lombok.Setter;

/**
* com.aha.dahaeng.user.dto.request
* SignUpRequest.java
*
* @author 박수빈
* @date 2021-04-27 오후 6:51
* @변경이력
**/

@Getter
@Setter
public class SignUpRequest {
    private String loginId;
    private String password;
    private String name;
    private String role;
    private Long pinCode;
}
