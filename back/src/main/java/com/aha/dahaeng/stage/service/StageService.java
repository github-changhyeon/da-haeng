package com.aha.dahaeng.stage.service;

import com.aha.dahaeng.stage.repository.CategoryRepository;
import com.aha.dahaeng.stage.repository.ProgressRepository;
import com.aha.dahaeng.stage.repository.StageRepository;
import com.aha.dahaeng.stage.repository.StageResultRepository;
import com.aha.dahaeng.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    private final StageResultRepository stageResultRepository;
    private final UserRepository userRepository;



}

