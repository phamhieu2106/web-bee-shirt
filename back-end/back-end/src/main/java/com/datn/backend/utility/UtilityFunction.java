package com.datn.backend.utility;

import com.datn.backend.dto.response.PagedResponse;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;

import java.text.DecimalFormat;
import java.util.List;
import java.util.Map;

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

    public static String convertToCurrency(double number) {
        DecimalFormat formatter = new DecimalFormat("#,###.##");
        return formatter.format(number);
    }

    public static boolean isNullOrEmpty(Object obj) {
        if (obj == null) {
            return true;
        }
        if (obj instanceof String) {
            return ((String) obj).isEmpty();
        }
        if (obj instanceof CharSequence) {
            return ((CharSequence) obj).length() == 0;
        }
        if (obj.getClass().isArray()) {
            return java.lang.reflect.Array.getLength(obj) == 0;
        }
        if (obj instanceof Iterable) {
            return !((Iterable<?>) obj).iterator().hasNext();
        }
        if (obj instanceof Map) {
            return ((Map<?, ?>) obj).isEmpty();
        }
        return false;
    }
}
