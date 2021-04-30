package com.aha.dahaeng.stage.repository;

import com.aha.dahaeng.stage.domain.StageResult;
import org.springframework.data.jpa.repository.JpaRepository;

/**
* com.aha.dahaeng.stage.repository
* StageResultRepository.java
*
* @author 박수빈
* @date 2021-04-30 오후 6:21
* @변경이력
**/

public interface StageResultRepository extends JpaRepository<StageResult, Long> {
}
