package com.aha.dahaeng.user.service;

import com.aha.dahaeng.common.exception.NotFoundException;
import com.aha.dahaeng.common.exception.dto.ErrorCode;
import com.aha.dahaeng.user.domain.User;
import com.aha.dahaeng.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * com.aha.dahaeng.user.service
 * UserService.java
 * @date    2021-04-22 오후 4:06
 * @author  이주희
 *
 * @변경이력
 **/

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
       return findUser(username);
    }

    public User createUser(){
        return null;
    }

    private User findUser(String loginId) {
        return userRepository.findByLoginId(loginId).orElseThrow(() -> {
            return new NotFoundException(ErrorCode.USER_NOT_FOUND);
        });
    }

}
