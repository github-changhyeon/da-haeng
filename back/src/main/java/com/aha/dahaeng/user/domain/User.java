package com.aha.dahaeng.user.domain;

import com.aha.dahaeng.common.security.jwt.JwtDetails;
import lombok.Getter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Map;

/**
 * com.aha.dahaeng.user.domain
 * User.java
 *
 * @author 이주희
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

    @Column(unique = true)
    private String loginId;

    private String password;

    private String name;

    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    private UserRole role = UserRole.ROLE_GUEST;

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
        return null;
    }

    @Override
    public Map<String, Object> getClaims() {
        return null;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public String getUsername() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }
}
