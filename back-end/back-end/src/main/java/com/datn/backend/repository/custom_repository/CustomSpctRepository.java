package com.datn.backend.repository.custom_repository;

import com.datn.backend.dto.request.FilterSPCTParams;
import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.model.san_pham.SanPhamChiTiet;
import com.datn.backend.utility.UtilityFunction;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class CustomSpctRepository {

    private final EntityManager entityManager;

    public PagedResponse<SanPhamChiTiet> filterByPage(FilterSPCTParams params) {
        // prepare query
        String query = """
                SELECT *
                FROM san_pham_chi_tiet AS ct
                WHERE ct.san_pham_id = :sanPhamId
                """;
        if (params.getColorId() != null) {
            query = query + "\nAND ct.mau_sac_id = :mauSacId";
            query = query.replace(":mauSacId", params.getColorId());
        }

        if (params.getSizeId() != null) {
            query = query + "\nAND ct.kich_co_id = :kichCoId";
            query = query.replace(":kichCoId", params.getSizeId());
        }

        if (params.getFormId() != null) {
            query = query + "\nAND ct.kieu_dang_id = :kieuDangId";
            query = query.replace(":kieuDangId", params.getFormId());
        }

        if (params.getDesignId() != null) {
            query = query + "\nAND ct.thiet_ke_id = :thietKeId";
            query = query.replace(":thietKeId", params.getDesignId());
        }

        if (params.getSleeveId() != null) {
            query = query + "\nAND ct.tay_ao_id = :tayAoId";
            query = query.replace(":tayAoId", params.getSleeveId());
        }

        if (params.getCollarId() != null) {
            query = query + "\nAND ct.co_ao_id = :coAoId";
            query = query.replace(":coAoId", params.getCollarId());
        }

        if (params.getMaterialId() != null) {
            query = query + "\nAND ct.chat_lieu_id = :chatLieuId";
            query = query.replace(":chatLieuId", params.getMaterialId());
        }

        query = query + "\nAND ct.gia_ban >= :minPrice";
        query = query + "\nAND ct.gia_ban <= :maxPrice";

        // get fields of PagedResponse<SanPhamChiTiet>
        List<SanPhamChiTiet> data = getContent(params, query);
        int totalPages = getTotalPagesAndElements(params, query)[1];

        return PagedResponse.<SanPhamChiTiet>builder()
                .pageNumber(params.getPageNumber())
                .pageSize(params.getPageSize())
                .totalElements(getTotalPagesAndElements(params, query)[0])
                .totalPages(totalPages)
                .pageNumberArr(UtilityFunction.getPageNumberArr(totalPages))
                .data(data)
                .build();
    }

    private List<SanPhamChiTiet> getContent(FilterSPCTParams params, String query) {
        query = query + "\nLIMIT :pageSize";
        query = query + "\nOFFSET :offset";

        int offset = (params.getPageNumber() - 1) * params.getPageSize();

        List<SanPhamChiTiet> list = entityManager.createNativeQuery(query, SanPhamChiTiet.class)
                .setParameter("sanPhamId", params.getProductId())
                .setParameter("minPrice", params.getMinPrice())
                .setParameter("maxPrice", params.getMaxPrice())
                .setParameter("pageSize", params.getPageSize())
                .setParameter("offset", offset)
                .getResultList();

        return list;
    }

    private Integer[] getTotalPagesAndElements(FilterSPCTParams params, String query) {
        Integer[] result = new Integer[2];
        List<SanPhamChiTiet> list = entityManager.createNativeQuery(query, SanPhamChiTiet.class)
                .setParameter("sanPhamId", params.getProductId())
                .setParameter("minPrice", params.getMinPrice())
                .setParameter("maxPrice", params.getMaxPrice())
                .getResultList();
        result[0] = list.size();

        int remainder = result[0] % params.getPageSize();
        result[1] = (remainder == 0) ? (result[0] / params.getPageSize()) : (result[0] / params.getPageSize() + 1);
        return result;
    }

    public List<SanPhamChiTiet> getAll() {
        return null;
    }
}
