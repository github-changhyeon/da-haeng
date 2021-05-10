package com.aha.dahaeng.user.controller;


import com.aha.dahaeng.common.annotation.CurrentLoginId;
import com.aha.dahaeng.user.dto.request.SignUpRequest;
import com.aha.dahaeng.user.dto.response.UserResponse;
import com.aha.dahaeng.user.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;

/**
* com.aha.dahaeng.user.controller
* UserController.java
*
* @author 박수빈
* @date 2021-04-27 오후 4:26
* @변경이력
**/

@Api(tags = {"User"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @ApiOperation(value = "회원 가입")
    @ApiResponses({
            @ApiResponse(code = 201, message = "회원 가입 성공"),
            @ApiResponse(code = 409, message = "중복된 아이디" )
    })
    @PostMapping("")
    public ResponseEntity<String> signUp(final @Valid @RequestBody SignUpRequest signUpRequest){
        Long userId = userService.createUser(signUpRequest);

        if(userId==-1L){ //아이디 중복 체크
            return new ResponseEntity<>("Duplicate Id", HttpStatus.CONFLICT);
        }

        return new ResponseEntity<>("Created", HttpStatus.CREATED);
    }

    @ApiOperation(value = "사용자 정보 조회")
    @GetMapping("")
    public ResponseEntity<UserResponse> getUserInfo(@ApiIgnore @CurrentLoginId String loginId){
        UserResponse userResponse = userService.getUserInfo(loginId);
        return new ResponseEntity<>(userResponse, HttpStatus.OK);
    }

}
