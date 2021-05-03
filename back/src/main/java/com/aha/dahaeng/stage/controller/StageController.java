package com.aha.dahaeng.stage.controller;

import com.aha.dahaeng.common.annotation.CurrentUser;
import com.aha.dahaeng.stage.dto.response.AdminUserResponse;
import com.aha.dahaeng.stage.service.StageService;
import com.aha.dahaeng.user.domain.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

/**
* com.aha.dahaeng.stage.controller
* StageController.java
*
* @author 박수빈
* @date 2021-04-29 오후 5:49
* @변경이력
**/

@Api(tags = {"Stage"})
@RestController
@RequiredArgsConstructor
@RequestMapping("stage")
public class StageController {
    private final StageService stageService;

    @GetMapping("/admin")
    @ApiOperation(value = "마이페이지 정보 조회(선생님)")
    public ResponseEntity<AdminUserResponse> getAdminInfo(@ApiIgnore @CurrentUser User user){
        AdminUserResponse result = stageService.getStudents(user);
        return new ResponseEntity<AdminUserResponse>(result, HttpStatus.OK);
    }

}
