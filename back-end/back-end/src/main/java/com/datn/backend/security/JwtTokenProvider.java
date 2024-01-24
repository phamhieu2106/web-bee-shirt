package com.datn.backend.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class JwtTokenProvider {

    @Value("${jwt.secret}")
    private String secret;

    private final String AUDIENCE = "Bee Shirt's customers";
    private final String ISSUER = "Bee Shirt";
    private final String CLAIMS = "authorities";

    // public functions
    // 1
    public String generateToken(MyUserDetails userDetails) {
        String[] claims = getClaimsFromUserDetails(userDetails);
        return JWT.create()
                .withAudience(AUDIENCE)
                .withIssuer(ISSUER)
                .withSubject(userDetails.getUsername())
                .withArrayClaim(CLAIMS, claims)
                .withExpiresAt(new Date(System.currentTimeMillis() + 432_000_000))
                .sign(Algorithm.HMAC512(this.secret.getBytes()));
    }

    // 2
    public List<GrantedAuthority> getAuthorityListFromToken(String token) {
        // claims of token = string[]
        // we want List<String>
        String[] claims = getClaimsFromToken(token);
        return Arrays.stream(claims)
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    // 3
    public String getSubjectFromToken(String token) {
        JWTVerifier jwtVerifier = getJwtVerifier();
        return jwtVerifier.verify(token).getSubject();
    }

    // 4
    public Authentication getAuthentication(String email, List<GrantedAuthority> authorities, HttpServletRequest request) {
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(email, null, authorities);
        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        return authenticationToken;
    }

    // 5
    public boolean checkEmailAndTokenExpiration(String email, String token) {
        JWTVerifier jwtVerifier = getJwtVerifier();
        Date expiredDate = jwtVerifier.verify(token).getExpiresAt();
        boolean isExpired = expiredDate.before(new Date());
        return StringUtils.isNotBlank(email) && !isExpired;
    }

    // private functions
    // 1
    private String[] getClaimsFromUserDetails(MyUserDetails userDetails) {
        List<String> authorities = new ArrayList<>();
        for(GrantedAuthority authority : userDetails.getAuthorities()) {
            authorities.add(authority.getAuthority());
        }
        return authorities.toArray(new String[0]);
    }

    // 2
    private String[] getClaimsFromToken(String token) {
        JWTVerifier jwtVerifier = getJwtVerifier();
        return jwtVerifier.verify(token)
                .getClaim(CLAIMS)
                .asArray(String.class);
    }

    // 3
    private JWTVerifier getJwtVerifier() {
        JWTVerifier jwtVerifier;
        try {
            jwtVerifier = JWT.require(Algorithm.HMAC512(this.secret))
                    .withIssuer(ISSUER)
                    .build();
        } catch(JWTVerificationException ex) {
            throw new JWTVerificationException("Token can't be verified");
        }
        return jwtVerifier;
    }
}
