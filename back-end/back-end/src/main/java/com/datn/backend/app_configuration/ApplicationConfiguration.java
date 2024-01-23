package com.datn.backend.app_configuration;

import com.datn.backend.utility.AuditorAwareImpl;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;

@Configuration
public class ApplicationConfiguration {

    @Bean("auditorAwareImpl")
    public AuditorAware<String> auditorProvider() {
        return new AuditorAwareImpl();
    }

    @Bean
    public ModelMapper modelMapper(){
        return new ModelMapper();
    }
}
