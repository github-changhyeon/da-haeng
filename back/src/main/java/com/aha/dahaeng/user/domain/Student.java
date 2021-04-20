package com.aha.dahaeng.user.domain;

import lombok.Builder;
import lombok.Getter;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@Getter
@DiscriminatorValue("S")
public class Student extends User {

    private Long adminId;

    public Student(){}

    @Builder
    public Student(Long id, String name, Long adminId) {
        super(id, name, UserRole.ROLE_STUDENT);
        this.adminId = adminId;
    }
}
