package com.datn.backend.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FilterSPCTParams {

    private int pageNumber;
    private int pageSize;
    private int productId;
    private String colorId;
    private String sizeId;
}
