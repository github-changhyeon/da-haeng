package com.aha.dahaeng.common.security;

import com.aha.dahaeng.common.exception.NotMatchException;
import com.aha.dahaeng.common.exception.dto.ErrorCode;
import com.aha.dahaeng.user.domain.User;
import com.aha.dahaeng.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * com.aha.dahaeng.common.security
 * JwtAuthenticationProvider.java
 *
 * @author 이주희
 * @date 2021-04-22 오후 3:06
 * @변경이력
 **/

@RequiredArgsConstructor
public class JwtAuthenticationProvider implements AuthenticationProvider {

    @Autowired
    private UserService userService;
    @Autowired
    private final PasswordEncoder passwordEncoder;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) authentication;
        String id = (String) token.getPrincipal();
        String password = (String) token.getCredentials();
        User user = (User) userService.loadUserByUsername(id);

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new NotMatchException(ErrorCode.PASSWORD_NOT_MATCH);
        }

        return new UsernamePasswordAuthenticationToken(user, password, user.getAuthorities());
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}
