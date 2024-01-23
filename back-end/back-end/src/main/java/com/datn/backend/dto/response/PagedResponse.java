package com.datn.backend.dto.response;

import java.util.List;

public class PagedResponse<T> {

    private int pageNumber;
    private int pageSize;
    private int totalPages;
    private int totalElements;
    private List<T> data;
}
