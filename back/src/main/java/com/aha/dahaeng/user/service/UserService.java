package com.aha.dahaeng.user.service;

import com.aha.dahaeng.common.exception.NotFoundException;
import com.aha.dahaeng.common.exception.dto.ErrorCode;
import com.aha.dahaeng.user.domain.Admin;
import com.aha.dahaeng.user.domain.Student;
import com.aha.dahaeng.user.domain.User;
import com.aha.dahaeng.user.dto.request.SignUpRequest;
import com.aha.dahaeng.user.dto.response.UserResponse;
import com.aha.dahaeng.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * com.aha.dahaeng.user.service
 * UserService.java
 * @date    2021-04-22 오후 4:06
 * @author  이주희
 *
 * @변경이력
 * createUser 로직 개발
 **/

@Service
@Transactional
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder; //spring security

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
       return findUser(username);
    }

    public Long createUser(SignUpRequest signUpRequest){ //회원가입
        Long userId = 0L;

        if(signUpRequest.getRole().equals("ROLE_ADMIN")){ //선생님이면
            Admin adminSignUp = Admin.builder()
                    .loginId(signUpRequest.getLoginId())
                    .password(passwordEncoder.encode(signUpRequest.getPassword()))
                    .name(signUpRequest.getName())
                    .build();

            Admin admin = userRepository.save(adminSignUp); //admin 저장

            Long uid = userRepository.findByLoginId(admin.getLoginId()).get().getId(); //저장한 아이디로 조회하여 uid받기
            admin.setPinCode(uid + 530950); //핀코드 생성
            userId = uid;

        }else if(signUpRequest.getRole().equals("ROLE_STUDENT")){ //학생이면
            Student studentSingUp = Student.builder()
                    .loginId(signUpRequest.getLoginId())
                    .password(passwordEncoder.encode(signUpRequest.getPassword()))
                    .name(signUpRequest.getName())
                    .build();

            if(signUpRequest.getPin_code() != 0){
                //pinCode에 해당하는 Admin
                Admin admin = (Admin) userRepository.findByPinCode(signUpRequest.getPin_code()).get();
                studentSingUp = Student.builder()
                        .admin(admin)
                        .build();
            }

            Student student = userRepository.save(studentSingUp);

            userId = userRepository.findByLoginId(student.getLoginId()).get().getId();
        }

        return userId;
    }

    @Transactional(readOnly = true)
    public UserResponse getUserInfo(User user){
        User userInfo = findUser(user.getLoginId());
        return UserResponse.of(userInfo);
    }

    private User findUser(String loginId) {
        return userRepository.findByLoginId(loginId).orElseThrow(() -> {
            return new NotFoundException(ErrorCode.USER_NOT_FOUND);
        });
    }

}
