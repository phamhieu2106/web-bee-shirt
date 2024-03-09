package com.datn.backend.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

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

    @Override
    public String toString() {
        return "FilterSPCTParams{" +
                "pageNumber=" + pageNumber +
                ", pageSize=" + pageSize +
                ", minPrice=" + minPrice +
                ", maxPrice=" + maxPrice +
                ", productId=" + productId +
                ", colorId='" + colorId + '\'' +
                ", sizeId='" + sizeId + '\'' +
                ", formId='" + formId + '\'' +
                ", designId='" + designId + '\'' +
                ", sleeveId='" + sleeveId + '\'' +
                ", collarId='" + collarId + '\'' +
                ", materialId='" + materialId + '\'' +
                '}';
    }
}
