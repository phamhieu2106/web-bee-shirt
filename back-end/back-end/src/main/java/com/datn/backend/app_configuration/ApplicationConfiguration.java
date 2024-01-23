package com.datn.backend.app_configuration;

import com.datn.backend.utility.AuditorAwareImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class ApplicationConfiguration {

    @Bean("auditorAwareImpl")
    public AuditorAware<String> auditorProvider() {
        return new AuditorAwareImpl();
    }

}
