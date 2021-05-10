package com.aha.dahaeng.stage.domain;

import lombok.Getter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
* com.aha.dahaeng.stage.domain
* Category.java
* 
* @author 박수빈
* @date 2021-04-29 오후 6:53
* @변경이력
**/

@Entity
@Getter
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private Long id;

    private String name;

    private Long stage;

    @OneToMany(mappedBy = "category")
    private List<Stage> stages = new ArrayList<>();

    @OneToMany(mappedBy = "category")
    private List<CategoryResult> categoryResults = new ArrayList<>();
}
