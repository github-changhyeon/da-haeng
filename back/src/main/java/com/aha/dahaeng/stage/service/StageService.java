package com.aha.dahaeng.stage.service;

import com.aha.dahaeng.common.exception.NotFoundException;
import com.aha.dahaeng.common.exception.dto.ErrorCode;
import com.aha.dahaeng.stage.domain.CategoryInfo;
import com.aha.dahaeng.stage.domain.CategoryResult;
import com.aha.dahaeng.stage.dto.response.AdminUserResponse;
import com.aha.dahaeng.stage.dto.response.StudentUserResponse;
import com.aha.dahaeng.stage.repository.CategoryRepository;
import com.aha.dahaeng.stage.repository.ProgressRepository;
import com.aha.dahaeng.stage.repository.StageRepository;
import com.aha.dahaeng.stage.repository.CategoryResultRepository;
import com.aha.dahaeng.user.domain.User;
import com.aha.dahaeng.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
* com.aha.dahaeng.stage.service
* StageService.java
*
* @author 박수빈
* @date 2021-04-30 오후 6:24
* @변경이력
**/

@Service
@Transactional
@RequiredArgsConstructor
public class StageService {

    private final CategoryRepository categoryRepository;
    private final ProgressRepository progressRepository;
    private final StageRepository stageRepository;
    private final CategoryResultRepository categoryResultRepository;
    private final UserRepository userRepository;

    public AdminUserResponse getStudents(String loginId){
        Long uid = findUser(loginId).getId(); //선생님의 uid

        //선생님의 uid를 admin_id로 가지는 학생들
        List<User> students = userRepository.findByAdminId(uid);

        List<StudentUserResponse> studentUserResponses = new ArrayList<>();

        Long busSum = 0L;
        Long burgerSum = 0L;

        //TODO: 평균 구하기
        for (User student : students) {
            getStudentInfo(student).getBusStageResult();
            studentUserResponses.add(getStudentInfo(student));
        }

//        AdminUserResponse adminUserResponse = new AdminUserResponse(studentUserResponses)
        return null;
    }

    public StudentUserResponse getStudentInfo(User user){
        StudentUserResponse studentUserResponse = null;
        Long burgerStageResult = 1L;
        Long busStageResult = 1L;

        List<CategoryResult> categoryResults = categoryResultRepository.findByUserId(user.getId());
        if(categoryResults != null){
            for (CategoryResult categoryResult : categoryResults) {
                String cName = categoryResult.getCategory().getCategoryInfo().name();
                if(cName.equals(CategoryInfo.BURGER.name())){
                    burgerStageResult = categoryResult.getMaxStage();
                }else if(cName.equals((CategoryInfo.BUS.name()))) {
                    busStageResult = categoryResult.getMaxStage();
                }
            }
            studentUserResponse = new StudentUserResponse(user.getName(), burgerStageResult, busStageResult);
        }
        return studentUserResponse;
    }

    private User findUser(String loginId) {
        return userRepository.findByLoginId(loginId).orElseThrow(() -> {
            return new NotFoundException(ErrorCode.USER_NOT_FOUND);
        });
    }

}

