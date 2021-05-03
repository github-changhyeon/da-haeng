package com.aha.dahaeng.common.annotation;

import org.springframework.security.core.annotation.AuthenticationPrincipal;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * com.aha.dahaeng.common.annotation
 * CurrentUser.java
 * @date    2021-04-22 오후 6:00
 * @author  이주희
 *
 * @변경이력
 **/

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.PARAMETER)
@AuthenticationPrincipal(expression = "#this == 'anonymousUser' ? null : loginId" )
public @interface CurrentLoginId {
}
