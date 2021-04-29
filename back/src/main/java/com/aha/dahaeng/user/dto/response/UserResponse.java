package com.aha.dahaeng.user.dto.response;

import com.aha.dahaeng.user.domain.User;
import lombok.Getter;

/**
* com.aha.dahaeng.user.dto.response
* UserResponse.java
*
* @author 박수빈
* @date 2021-04-29 오후 2:23
* @변경이력
**/

//UserResponse -> AdminUserResponse / StudentUserResponse

@Getter
public class UserResponse {
    private Long id;
    private String loginId;
    private String name;
    private String role;

    public UserResponse(Long id, String loginId, String name, String role) {
        this.id = id;
        this.loginId = loginId;
        this.name = name;
        this.role = role;
    }

    public static UserResponse of(User user){
        return new UserResponse(user.getId(), user.getLoginId(), user.getName(), user.getRole().name());
    }
}
