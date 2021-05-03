package com.aha.dahaeng.common.config;

import com.aha.dahaeng.common.security.jwt.JwtProperties;
import com.google.common.base.Predicates;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.ApiKey;
import springfox.documentation.service.AuthorizationScope;
import springfox.documentation.service.SecurityReference;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.Arrays;
import java.util.List;

/**
* com.aha.dahaeng.common.config
* SwaggerConfig.java
* 
* @author 박수빈
* @date 2021-04-27 오후 5:46
* @변경이력
**/

@Configuration
@EnableSwagger2
public class SwaggerConfig {
    //Swagger 주소 : http://localhost:8088/api/swagger-ui.html

    static final String OPEN_API_TITLE = "DaHaeng API";
    static final String OPEN_API_DESC = "다행 REST API 문서입니다.";
    static final String OPEN_API_TERMS_OF_SERVICE = "https://swagger.io/terms/";

    private ApiInfo apiInfo(){
        return new ApiInfoBuilder()
                .title(OPEN_API_TITLE)
                .description(OPEN_API_DESC)
                .version("1.0.0")
                .termsOfServiceUrl(OPEN_API_TERMS_OF_SERVICE)
                .build();
    }

    @Bean
    public Docket api(){
        return new Docket(DocumentationType.SWAGGER_2)
                .useDefaultResponseMessages(false)
                .apiInfo(this.apiInfo())
                .select()
                .apis(Predicates.not(RequestHandlerSelectors.
                        basePackage("org.springframework.boot")))
                .paths(PathSelectors.any()).build()
                .securityContexts(Arrays.asList(securityContext()))
                .securitySchemes(Arrays.asList(apiKey()));
    }

    private ApiKey apiKey(){
        return new ApiKey("JWT", JwtProperties.HEADER_STRING, "header");
    }

    private SecurityContext securityContext(){
        return SecurityContext.builder()
                .securityReferences(defaultAuth())
                .forPaths(PathSelectors.any())
                .build();
    }

    private List<SecurityReference> defaultAuth() {
        AuthorizationScope authorizationScope = new AuthorizationScope("global", "accessEverything");
        AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];
        authorizationScopes[0] = authorizationScope;
        return Arrays.asList(new SecurityReference("JWT", authorizationScopes));
    }

}
