package com.aha.dahaeng.common.security.jwt;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * com.aha.dahaeng.common.security.jwt
 * JwtProperties.java
 *
 * @author 이주희
 * @date 2021-04-22 오후 5:06
 * @변경이력
 **/

@Getter
@Setter
@Component
@ConfigurationProperties(prefix = "jwtproperties")
public class JwtProperties {

    private String secret;
    private String tokenPrefix;
    private int expirationTime;
    private int refreshExpirationTime;
    private String header;
    private String refreshHeader;

}
