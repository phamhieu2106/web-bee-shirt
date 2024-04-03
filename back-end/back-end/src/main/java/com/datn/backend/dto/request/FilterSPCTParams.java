package com.datn.backend.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FilterSPCTParams {

    private int pageNumber;
    private int pageSize;
    private Integer minPrice;
    private Integer maxPrice;
    private int productId;
    private String colorId;
    private String sizeId;
    private String formId;
    private String designId;
    private String sleeveId;
    private String collarId;
    private String materialId;
}
