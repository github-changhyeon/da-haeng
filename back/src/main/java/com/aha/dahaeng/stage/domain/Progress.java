package com.aha.dahaeng.stage.domain;

import com.aha.dahaeng.user.domain.User;
import lombok.Getter;

import javax.persistence.*;

/**
* com.aha.dahaeng.stage.domain
* Progress.java
*
* @author 박수빈
* @date 2021-04-29 오후 6:56
* @변경이력
**/

@Entity
@Getter
public class Progress {
    @Id
    @Column(name = "progress_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    private int rate;

    @ManyToOne
    @JoinColumn(name = "admin_id")
    private User user;

}
