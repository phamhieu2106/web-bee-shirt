package com.datn.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditorAwareImpl")
public class BackEndApplication implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(BackEndApplication.class, args);
    }

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Override
    public void run(String... args) throws Exception {
//        String encode = passwordEncoder.encode("123456");
//        System.out.println(encode);
    }
}
