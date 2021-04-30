package com.aha.dahaeng.stage.domain;

import com.aha.dahaeng.user.domain.User;
import lombok.Getter;

import javax.persistence.*;

/**
* com.aha.dahaeng.stage.domain
* StageResult.java
*
* @author 박수빈
* @date 2021-04-29 오후 6:57
* @변경이력
**/

@Entity
@Getter
@Table(name = "stage_result")
public class StageResult {
    @Id
    @Column(name = "result_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "stage_id")
    private Stage stage;
}
