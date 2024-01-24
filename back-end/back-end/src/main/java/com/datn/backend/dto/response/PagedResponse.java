package com.datn.backend.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.List;

@SuperBuilder
@Getter
@Setter
@NoArgsConstructor
public class PagedResponse<T> {

    private int pageNumber;
    private int pageSize;
    private int totalPages;
    private int[] pageNumberArr;
    private long totalElements;
    private List<T> data;
    private String search;
}
