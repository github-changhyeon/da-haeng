package com.aha.dahaeng.common.security.jwt;

import java.util.Map;

/**
 * com.aha.dahaeng.common.security.jwt
 * JwtDetails.java
 *
 * @author 이주희
 * @date 2021-04-22 오후 5:06
 * @변경이력
 **/

public interface JwtDetails {

    public String getSubject();

    public Map<String, Object> getClaims();

}
