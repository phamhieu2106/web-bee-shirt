package com.datn.backend.dto.response;

import com.datn.backend.constant.ApplicationConstant;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

/**
 * @author HungDV
 */
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class BaseResponse {
    @DateTimeFormat(pattern = ApplicationConstant.DEFAULT_DATE_TIME_FORMAT)
    private LocalDateTime createdAt;
    private String createdBy;
    private LocalDateTime updatedAt;
    private String lastUpdatedBy;
}
