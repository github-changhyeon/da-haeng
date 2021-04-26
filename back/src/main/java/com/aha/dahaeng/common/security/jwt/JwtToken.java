package com.aha.dahaeng.common.security.jwt;

import lombok.Getter;
import lombok.Setter;

/**
 * com.aha.dahaeng.common.security.jwt
 * JwtToken.java
 *
 * @author 이주희
 * @date 2021-04-22 오후 5:06
 * @변경이력
 **/

@Getter
@Setter
public class JwtToken {

    private String accessToken;
    private String refreshToken;

    public JwtToken(String accessToken, String refreshToken) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}
