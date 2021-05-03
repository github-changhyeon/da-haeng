package com.aha.dahaeng.stage.domain;

public enum CategoryInfo {
    BUS("BUS", 5),
    BURGER("BURGER", 5);

    private final String name;
    private final int stageNum;

    CategoryInfo(String name, int stageNum) {
        this.name = name;
        this.stageNum = stageNum;
    }
}
