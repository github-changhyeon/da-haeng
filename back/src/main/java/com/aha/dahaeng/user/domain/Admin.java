package com.aha.dahaeng.user.domain;

import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * com.aha.dahaeng.user.domain
 * Admin.java
 * @date    2021-04-26 오후 2:12
 * @author  이주희
 *
 * @변경이력
 **/

@Entity
@Getter
@DiscriminatorValue("A")
public class Admin extends User {

    private String code;

    @OneToMany(mappedBy = "admin", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Student> students = new ArrayList<>();

    public Admin() {
    }

    @Builder
    public Admin(String loginId, String password, String name, String code) {
        super(loginId, password, name, UserRole.ROLE_ADMIN);
        this.code = code;
    }
}
