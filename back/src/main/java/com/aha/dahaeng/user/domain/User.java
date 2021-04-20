package com.aha.dahaeng.user.domain;

import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;

/**
 * com.aha.dahaeng.user.domain
 * User.java
 * @date    2021-04-19 오후 5:33
 * @author  이주희
 *
 * @변경이력
 **/

@Entity
@Getter
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "dtype")
public abstract class User {

    @Id
    @Column(name = "USER_ID")
    private Long id;

    private String name;

    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    private UserRole role = UserRole.ROLE_GUEST;

    public User() {
    }

    @Builder
    public User(Long id, String name, UserRole role) {
        this.id = id;
        this.name = name;
        this.role = role;
    }
}
