package com.aha.dahaeng.stage.domain;

import com.aha.dahaeng.user.domain.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

/**
 * com.aha.dahaeng.stage.domain
 * CategoryResult.java
 *
 * @author 박수빈
 * @date 2021-05-03 오후 4:10
 * @변경이력
 * stage_result -> category_result 로 변경
 * 각 카테고리의 최대값을 반환하는 max_stage 컬럼 추가
**/

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "category_result")
public class CategoryResult {
    @Id
    @Column(name = "result_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "max_stage")
    private Long maxStage;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @Builder
    public CategoryResult(User user, Long maxStage, Category category) {
        this.user = user;
        this.maxStage = maxStage;
        this.category = category;
    }
}
