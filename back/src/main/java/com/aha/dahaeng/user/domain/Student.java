package com.aha.dahaeng.user.domain;

import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;

/**
 * com.aha.dahaeng.user.domain
 * Student.java
 * @date    2021-04-26 오후 2:11
 * @author  이주희
 *
 * @변경이력
 **/

@Entity
@Getter
@DiscriminatorValue("S")
public class Student extends User {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "admin_id")
    private Admin admin;

    public Student() {
    }

    @Builder
    public Student(String loginId, String password, String name, Admin admin) {
        super(loginId, password, name, UserRole.ROLE_STUDENT);
        this.admin = admin;

        if(this.admin != null){
            admin.addStudent(this);
        }
    }
}
