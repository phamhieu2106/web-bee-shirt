package com.datn.backend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PhieuKhachHangRequest {

    private List<Integer> selectedIds;
    private Integer phieuGiamGiaId;
    private Integer trangThai;
}
