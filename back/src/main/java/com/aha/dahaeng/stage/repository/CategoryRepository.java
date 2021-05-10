package com.aha.dahaeng.stage.repository;

import com.aha.dahaeng.stage.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
* com.aha.dahaeng.stage.repository
* CategoryRepository.java
*category
* @author 박수빈
* @date 2021-04-30 오후 6:20
* @변경이력
**/

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Category findByName(String categoryName);
}
