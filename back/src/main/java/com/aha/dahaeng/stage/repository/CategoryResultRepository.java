package com.aha.dahaeng.stage.repository;

import com.aha.dahaeng.stage.domain.CategoryResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


/**
* com.aha.dahaeng.stage.repository
* CategoryResultRepository.java
* 
* @author 박수빈
* @date 2021-05-03 오후 4:12
* @변경이력
**/

public interface CategoryResultRepository extends JpaRepository<CategoryResult, Long> {
    List<CategoryResult> findByUserId(Long userId);

    @Query("select cr from CategoryResult cr where cr.user.id = :userId and cr.category.id = :categoryId")
    CategoryResult findByUserIdAndCategoryId(Long userId, Long categoryId);
}
