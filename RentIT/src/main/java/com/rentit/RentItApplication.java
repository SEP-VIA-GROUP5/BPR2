package com.rentit;

import com.rentit.security.RsaKeyProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@EnableConfigurationProperties(RsaKeyProperties.class)
public class RentItApplication {

    public static void main(String[] args) {
        SpringApplication.run(RentItApplication.class, args);
    }

    @Configuration(proxyBeanMethods = false)
    public class MyConfiguration {

        @Bean
        public WebMvcConfigurer corsConfigurer() {
            return new WebMvcConfigurer() {
                @Override
                public void addCorsMappings(final CorsRegistry registry) {
                    registry.addMapping("/**").allowedMethods("*").allowedHeaders("*");
                }
            };
        }
    }

}
