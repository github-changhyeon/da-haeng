package com.aha.dahaeng.user.domain;

import com.aha.dahaeng.common.security.jwt.JwtDetails;
import lombok.Builder;
import lombok.Getter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.*;

/**
 * com.aha.dahaeng.user.domain
 * User.java
 *
 * @author 이주희
 * @author 박수빈
 * Builder, NotNull 어노테이션 추가
 * pinCode 필드 추가
 * user_id : AI 되는 PK값
 * loin_id : 사용자가 로그인 할 때 사용하는 ID
 * @date 2021-04-19 오후 5:33S
 * @변경이력
 **/


@Entity
@Getter
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "dtype")
public class User implements UserDetails, JwtDetails {

    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "login_id", unique = true)
    private String loginId;

    @NotNull
    private String password;

    @NotNull
    private String name;

    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    private UserRole role = UserRole.ROLE_GUEST;

    @Column(name = "pin_code")
    private Long pinCode;

    @CreationTimestamp
    private LocalDateTime createDate;

    @UpdateTimestamp
    private LocalDateTime updateDate;

    public User() {
    }

    public User(String loginId, String password, String name, UserRole role) {
        this.loginId = loginId;
        this.password = password;
        this.name = name;
        this.role = role;
    }

    @Override
    public String getSubject() {
        return this.loginId;
    }

    @Override
    public Map<String, Object> getClaims() {
        Map<String, Object> claims = new HashMap<>();

        claims.put("loginId", this.loginId);
        claims.put("name", this.name);
        claims.put("role", this.role);

        return claims;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
        grantedAuthorities.add(new SimpleGrantedAuthority(this.role.toString()));

        return grantedAuthorities;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.loginId;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
