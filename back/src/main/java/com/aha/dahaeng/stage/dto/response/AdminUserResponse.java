package com.aha.dahaeng.stage.dto.response;

import lombok.Getter;

import java.util.List;

/**
* com.aha.dahaeng.stage.dto.response
* AdminUserResponse.java
*
* @author 박수빈
* @date 2021-04-30 오후 6:47
* @변경이력
**/

@Getter
public class AdminUserResponse {
    private long burgerAvg;
    private long busAvg;

    List<StudentUserResponse> studentUserResponses;

    public AdminUserResponse(long burgerAvg, long busAvg, List<StudentUserResponse> studentUserResponses) {
        this.burgerAvg = burgerAvg;
        this.busAvg = busAvg;
        this.studentUserResponses = studentUserResponses;
    }
}
