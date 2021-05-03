package com.aha.dahaeng.stage.repository;

import com.aha.dahaeng.stage.domain.Progress;
import org.springframework.data.jpa.repository.JpaRepository;

/**
* com.aha.dahaeng.stage.repository
* ProgressRepository.java
*
* @author 박수빈
* @date 2021-04-30 오후 6:22
* @변경이력
**/

public interface ProgressRepository extends JpaRepository<Progress, Long> {
}
