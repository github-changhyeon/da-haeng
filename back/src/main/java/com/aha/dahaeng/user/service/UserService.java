package com.aha.dahaeng.user.service;

import com.aha.dahaeng.common.exception.NotFoundException;
import com.aha.dahaeng.common.exception.dto.ErrorCode;
import com.aha.dahaeng.stage.domain.Category;
import com.aha.dahaeng.stage.domain.CategoryResult;
import com.aha.dahaeng.stage.repository.CategoryRepository;
import com.aha.dahaeng.stage.repository.CategoryResultRepository;
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

import java.util.List;
import java.util.Optional;


/**
 * com.aha.dahaeng.user.service
 * UserService.java
 * @date    2021-04-22 오후 4:06
 * @author  이주희
 *
 * @변경이력
 * @author 박수빈
 * createUser 로직 개발
 **/

@Service
@Transactional
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final CategoryResultRepository categoryResultRepository;
    private final PasswordEncoder passwordEncoder; //spring security

    @Override
    public UserDetails loadUserByUsername(String loginId) throws UsernameNotFoundException {
       return findUser(loginId);
    }

    public Long createUser(SignUpRequest signUpRequest){ //회원가입
        Long userId = 0L;

        //회원 중복 체크
        if(userRepository.findByLoginId(signUpRequest.getLoginId()).isPresent()){
            return -1L;
        }

        if(signUpRequest.getRole().equals("ROLE_ADMIN")){ //선생님이면
            userId = createAdmin(signUpRequest);
        }else if(signUpRequest.getRole().equals("ROLE_STUDENT")){ //학생이면
            userId = createStudent(signUpRequest);
        }

        //Category별 max_stage 초기화
        saveCategoryResult(signUpRequest.getLoginId());

        return userId;
    }

    private int saveCategoryResult(String loginId) {
        User user = findUser(loginId);

        List<Category> categories = categoryRepository.findAll();
        for (Category category: categories) {
            CategoryResult categoryResult = CategoryResult.builder()
                    .user(user)
                    .maxStage(0L)
                    .category(category)
                    .build();
            categoryResultRepository.save(categoryResult);
        }

        //categoryCount와 Category 개수가 같으면 초기화 성공
        int categoryCount = categoryResultRepository.findByUserId(user.getId()).size();

        return categoryCount;
    }

    private Long createStudent(SignUpRequest signUpRequest) {
        Admin admin = null;

        if(signUpRequest.getPinCode() != 0){
            //pinCode에 해당하는 Admin
            admin = (Admin) userRepository.findByPinCode(signUpRequest.getPinCode()).get();
        }

        Student studentSingUp = Student.builder()
                .loginId(signUpRequest.getLoginId())
                .password(passwordEncoder.encode(signUpRequest.getPassword()))
                .name(signUpRequest.getName())
                .admin(admin)
                .build();

        Student student = userRepository.save(studentSingUp);
        Long userId = userRepository.findByLoginId(student.getLoginId()).get().getId();

        return userId;
    }

    private Long createAdmin(SignUpRequest signUpRequest) {
        Admin adminSignUp = Admin.builder()
                .loginId(signUpRequest.getLoginId())
                .password(passwordEncoder.encode(signUpRequest.getPassword()))
                .name(signUpRequest.getName())
                .build();

        Admin admin = userRepository.save(adminSignUp); //admin 저장
        Long userId = userRepository.findByLoginId(admin.getLoginId()).get().getId(); //저장한 아이디로 조회하여 uid받기
        admin.setPinCode(userId + 530950); //핀코드 생성

        return userId;
    }

    @Transactional(readOnly = true)
    public UserResponse getUserInfo(String loginId){
        User userInfo = findUser(loginId);
        return UserResponse.of(userInfo);
    }

    private User findUser(String loginId) {
        return userRepository.findByLoginId(loginId).orElseThrow(() -> {
            return new NotFoundException(ErrorCode.USER_NOT_FOUND);
        });
    }

}
