package com.aha.dahaeng.common.security.jwt;

import com.fasterxml.jackson.core.JsonProcessingException;
import io.jsonwebtoken.*;

import javax.xml.bind.DatatypeConverter;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * com.aha.dahaeng.common.security.jwt
 * JwtProvider.java
 *
 * @author 이주희
 * @date 2021-04-22 오후 5:06
 * @변경이력
 **/

public class JwtProvider {

    public static String createAccessToken(JwtDetails principal) {
        return createToken(principal, JwtProperties.EXPIRATION_TIME);
    }

    public static String createRefreshToken(JwtDetails principal) {
        return createToken(principal, JwtProperties.REFRESH_EXPIRATION_TIME);
    }

    public static Map<String, String> createHeader(JwtDetails principal) {
        String token = createAccessToken(principal);
        String refreshToken = createRefreshToken(principal);

        Map<String, String> header = new HashMap<String, String>();
        header.put(JwtProperties.HEADER_STRING, token);
        header.put(JwtProperties.REFRESH_HEADER_STRING, refreshToken);

        return header;
    }

    public static JwtToken createBody(JwtDetails jwtDetails) throws JsonProcessingException {
        String token = JwtProperties.TOKEN_PREFIX + createAccessToken(jwtDetails);
        String refreshToken = JwtProperties.TOKEN_PREFIX + createRefreshToken(jwtDetails);

        return new JwtToken(token, refreshToken);
    }

    public static Claims getClaims(String token) {
        try {
            Claims claims = parseClaims(token);
            return claims;
        } catch (ExpiredJwtException exception) {
            return null;
        } catch (JwtException exception) {
            return null;
        } catch (NullPointerException exception) {
            return null;
        }
    }

    private static String createToken(JwtDetails principal, long expirationTime) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + expirationTime);

        return Jwts.builder().setSubject(principal.getSubject())
                .setClaims(principal.getClaims())
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(SignatureAlgorithm.HS256, JwtProperties.SECRET)
                .compact();
    }

    private static Claims parseClaims(String token) {
        return Jwts.parser().setSigningKey(DatatypeConverter.parseBase64Binary(JwtProperties.SECRET))
                .parseClaimsJws(token).getBody();
    }

}
