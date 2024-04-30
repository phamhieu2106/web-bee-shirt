package com.datn.backend.dto.request;

import lombok.Getter;

@Getter
public class AddNotificationReq {

    private String type;
    private String content;
    private String relatedUrl;
    private Integer custId;
}
