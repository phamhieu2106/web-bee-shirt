package com.datn.backend.dto.request;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GHNItemRequest {

    private String name;
    private String code;
    private int quantity;
    private long price;
    private int length; // dai cm
    private int width; // rong cm
    private int height; //cao cm
    private long weight; // nang gram
}
