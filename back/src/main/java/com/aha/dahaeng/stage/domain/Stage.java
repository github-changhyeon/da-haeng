package com.aha.dahaeng.stage.domain;

import lombok.Getter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
* com.aha.dahaeng.stage.domain
* Stage.java
* 
* @author 박수빈
* @date 2021-04-30 오후 3:39
* @변경이력
**/

@Entity
@Getter
public class Stage {
    @Id
    @Column(name = "stage_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @Column(name = "stage_number")
    private Long stageNumber;

}
