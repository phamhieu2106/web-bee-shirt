package com.datn.backend.dto.request;

import lombok.Getter;

import java.time.LocalDate;

@Getter
public class UpdateCustInfoReq {

    private int custId;
    private boolean gender;
    private String fullName;
    private String phone;
    private LocalDate birthday;

    @Override
    public String toString() {
        return "UpdateCustInfoReq{" +
                "custId=" + custId +
                ", gender=" + gender +
                ", fullName='" + fullName + '\'' +
                ", phone='" + phone + '\'' +
                ", birthday=" + birthday +
                '}';
    }
}
