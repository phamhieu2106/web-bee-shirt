package com.datn.backend.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PagedResponse<T> {

    private int pageNumber;
    private int pageSize;
    private int totalPages;
    private int totalElements;
    private List<T> data;
}
