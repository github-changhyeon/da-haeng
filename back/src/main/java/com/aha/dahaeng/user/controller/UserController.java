package com.aha.dahaeng.user.controller;


import com.aha.dahaeng.user.dto.request.SignUpRequest;
import com.aha.dahaeng.user.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    @ApiResponse(code = 201, message = "created")
    @PostMapping("")
    public ResponseEntity<String> signUp(final @Valid @RequestBody SignUpRequest signUpRequest){
        userService.createUser(signUpRequest);
        return new ResponseEntity<>("Created", HttpStatus.CREATED);
    }
}
