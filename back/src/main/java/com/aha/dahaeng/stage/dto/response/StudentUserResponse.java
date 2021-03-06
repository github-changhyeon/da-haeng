package com.aha.dahaeng.stage.dto.response;

import lombok.Getter;

/**
* com.aha.dahaeng.stage.dto.response
* StudentUserResponse.java
*
* @author 박수빈
* @date 2021-04-30 오후 6:48
* @변경이력
**/

@Getter
public class StudentUserResponse {
    private String name;
    private long burgerStageResult;
    private long busStageResult;

    public StudentUserResponse(String name, long burgerStageResult, long busStageResult) {
        this.name = name;
        this.burgerStageResult = burgerStageResult;
        this.busStageResult = busStageResult;
    }
}
