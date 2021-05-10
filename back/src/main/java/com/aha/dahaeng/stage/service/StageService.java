package com.aha.dahaeng.stage.service;

import com.aha.dahaeng.common.exception.NotFoundException;
import com.aha.dahaeng.common.exception.dto.ErrorCode;
import com.aha.dahaeng.stage.domain.CategoryResult;
import com.aha.dahaeng.stage.dto.request.StageResultRequest;
import com.aha.dahaeng.stage.dto.response.AdminUserResponse;
import com.aha.dahaeng.stage.dto.response.StudentUserResponse;
import com.aha.dahaeng.stage.repository.CategoryRepository;
import com.aha.dahaeng.stage.repository.CategoryResultRepository;
import com.aha.dahaeng.user.domain.Student;
import com.aha.dahaeng.user.domain.User;
import com.aha.dahaeng.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

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

    private final CategoryResultRepository categoryResultRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    public AdminUserResponse getStudents(String loginId){
        Long uid = findUser(loginId).getId(); //선생님의 uid

        //선생님의 uid를 admin_id로 가지는 학생들
        List<Student> students = userRepository.findByAdminId(uid);

        List<StudentUserResponse> studentUserResponses = new ArrayList<>();

        int burgerSum = 0;
        int busSum = 0;

        int studentNum = students.size();

        double burgerAvg = 0;
        double busAvg = 0;

        if(studentNum != 0){
            //학생이 있으면
            for (User student : students) {
                StudentUserResponse studentUserResponse = getStudentInfo(student.getLoginId());

                burgerSum += studentUserResponse.getBugerStageResult();
                busSum += studentUserResponse.getBusStageResult();

                studentUserResponses.add(getStudentInfo(student.getLoginId()));
            }

            //Progress에 띄울 평균 (정수형)
            burgerAvg = (burgerSum / (double)(studentNum * categoryRepository.findByName("BURGER").getStage()))*100;
            busAvg = (busSum / (double)(studentNum * categoryRepository.findByName("BUS").getStage()))*100;
        }

        AdminUserResponse adminUserResponse = new AdminUserResponse((long)burgerAvg, (long)busAvg, studentUserResponses);

        return adminUserResponse;
    }

    public StudentUserResponse getStudentInfo(String loginId){
        StudentUserResponse studentUserResponse = null;
        Long burgerStageResult = 0L;
        Long busStageResult = 0L;

        User user = userRepository.findByLoginId(loginId).get();

        List<CategoryResult> categoryResults = categoryResultRepository.findByUserId(user.getId());

        if(categoryResults != null){
            for (CategoryResult cr : categoryResults) {
                String cName = cr.getCategory().getName();
                if(cName.equals("BURGER")){
                    burgerStageResult = cr.getMaxStage();
                }else if(cName.equals(("BUS"))) {
                    busStageResult = cr.getMaxStage();
                }
            }
        }

        studentUserResponse = new StudentUserResponse(user.getName(), burgerStageResult, busStageResult);

        return studentUserResponse;
    }

    private User findUser(String loginId) {
        return userRepository.findByLoginId(loginId).orElseThrow(() -> {
            return new NotFoundException(ErrorCode.USER_NOT_FOUND);
        });
    }

    public void updateStageResult(String loginId, StageResultRequest stageResultRequest) {
        Long userId = userRepository.findByLoginId(loginId).get().getId();
        Long categoryId = categoryRepository.findByName(stageResultRequest.getCategoryName()).getId();

        //TODO: 해당 카테고리에 맞는 stage update 하기
        CategoryResult categoryResult = categoryResultRepository.findByUserIdAndCategoryId(userId, categoryId);
        categoryResult.setMaxStage(stageResultRequest.getStageNumber());

        categoryResultRepository.save(categoryResult);
    }
}

