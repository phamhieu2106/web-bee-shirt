package com.datn.backend.utility;

import com.datn.backend.dto.response.PagedResponse;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;

import java.util.List;

public class UtilityFunction {

    public static int[] getPageNumberArr(int totalPage) {
        int[] pageNumberArr = new int[totalPage];
        for (int i = 1; i <= totalPage; ++i) {
            pageNumberArr[i - 1] = i;
        }
        return pageNumberArr;
    }


    /**
     * @param page Du lieu muon chuyen doi qua
     * @param responseDataFormat format cua du lieu thanh response
     * @param <T> Đối tượng cua Page ban dầu
     * @param <K> doi tuong muon chuyen qua PagedResponse
     * @return PagedResponse voi doi tuong moi
     */
    public static <T, K> PagedResponse<K>  mapToPagedResponse(Page<T> page,Class<K> responseDataFormat,String search) {
        ModelMapper mapper = new ModelMapper();
        return  PagedResponse.
                <K>builder()
                .pageNumber(page.getNumber())
                .pageSize(page.getSize())
                .totalPages(page.getTotalPages())
                .pageNumberArr(getPageNumberArr(page.getTotalPages()))
                .totalElements(page.getTotalElements())
                .data(
                        page.getContent().stream().map(
                                (object) -> mapper.map(object,responseDataFormat)
                        ).toList()
                )
                .search(search)
                .build();
    }
}
