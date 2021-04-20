package com.aha.dahaeng.user.domain;

import lombok.Builder;
import lombok.Getter;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@Getter
@DiscriminatorValue("A")
public class Admin extends User {

    private String code;

    public Admin(){}

    @Builder
    public Admin(Long id, String name, String code) {
        super(id, name, UserRole.ROLE_ADMIN);
        this.code = code;
    }
}
