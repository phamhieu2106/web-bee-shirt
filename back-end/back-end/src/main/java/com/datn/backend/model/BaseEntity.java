package com.datn.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Data;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Data
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public class BaseEntity {

    @Column(updatable = false)
    @CreatedDate
    @JsonIgnore
    private LocalDateTime createdAt;

    @Column(updatable = false)
    @CreatedBy
    @JsonIgnore
    private String createdBy;

    @Column(insertable = false)
    @LastModifiedDate
    @JsonIgnore
    private LocalDateTime updatedAt;

    @Column(insertable = false)
    @LastModifiedBy
    @JsonIgnore
    private String lastUpdatedBy;

    @JsonIgnore
    private boolean trangThai;
}
