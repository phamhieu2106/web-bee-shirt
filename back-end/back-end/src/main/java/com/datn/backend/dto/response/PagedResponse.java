package com.datn.backend.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Builder
@Getter
@Setter
public class PagedResponse<T> {

    private int pageNumber;
    private int pageSize;
    private int totalPages;
    private long totalElements;
    private List<T> data;
}
