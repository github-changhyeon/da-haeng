package com.aha.dahaeng.user.repository;

import com.aha.dahaeng.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * com.aha.dahaeng.user.repository
 * UserRepository.java
 * @date    2021-04-22 오후 3:09
 * @author  이주희
 *
 * @변경이력
 **/

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByLoginId(String loginId);
    Optional<User> findByPinCode(Long pinCode);
}
