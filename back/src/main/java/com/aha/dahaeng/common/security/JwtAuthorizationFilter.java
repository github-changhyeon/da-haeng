package com.aha.dahaeng.common.security;

import com.aha.dahaeng.common.security.jwt.JwtProperties;
import com.aha.dahaeng.common.security.jwt.JwtProvider;
import com.aha.dahaeng.user.domain.User;
import com.aha.dahaeng.user.repository.UserRepository;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * com.aha.dahaeng.common.security
 * JwtAuthorizationFilter.java
 *
 * @author 이주희
 * @date 2021-04-22 오후 6:09
 * @변경이력
 **/

public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

    private UserRepository userRepository;

    public JwtAuthorizationFilter(AuthenticationManager authenticationManager, UserRepository userRepository) {
        super(authenticationManager);
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        String header = request.getHeader(JwtProperties.HEADER_STRING);

        if (header == null || !header.startsWith(JwtProperties.TOKEN_PREFIX)) {
            chain.doFilter(request, response);
            return;
        }

        Authentication authentication = getUsernamePasswordAuthentication(request);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        chain.doFilter(request, response);
    }

    private Authentication getUsernamePasswordAuthentication(HttpServletRequest request) {
        Authentication authentication = null;
        String token = request.getHeader(JwtProperties.HEADER_STRING);
        if (token != null) {
            Claims claims = JwtProvider.getClaims(token.replace(JwtProperties.TOKEN_PREFIX, ""));
            if (claims != null) {
                User user = userRepository.findByLoginId((String) claims.get("loginId")).orElseThrow(() -> {
                    return new UsernameNotFoundException("해당 email이 존재하지 않습니다");
                });

                authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
            }
        }

        return authentication;
    }
}
