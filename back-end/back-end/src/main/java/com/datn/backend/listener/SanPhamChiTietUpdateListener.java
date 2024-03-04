package com.datn.backend.listener;

import com.datn.backend.model.dot_giam_gia.DotGiamGiaSanPham;
import com.datn.backend.model.san_pham.SanPhamChiTiet;
import com.datn.backend.repository.DotGiamGiaSanPhamRepository;
import org.hibernate.event.spi.PostUpdateEvent;
import org.hibernate.event.spi.PostUpdateEventListener;
import org.hibernate.persister.entity.EntityPersister;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
public class SanPhamChiTietUpdateListener implements PostUpdateEventListener {

    private final DotGiamGiaSanPhamRepository dotGiamGiaSanPhamRepository;

    @Autowired
    public SanPhamChiTietUpdateListener(DotGiamGiaSanPhamRepository dotGiamGiaSanPhamRepository) {
        super();
        this.dotGiamGiaSanPhamRepository = dotGiamGiaSanPhamRepository;
    }

    //    Mỗi khi giá sản phẩm chi tiết được thay đổi giá thì sản phẩm trong đợt giảm giá sẽ thay đổi theo
    @Override
    public void onPostUpdate(PostUpdateEvent postUpdateEvent) {
        Object entity = postUpdateEvent.getEntity();
        if (entity instanceof SanPhamChiTiet sanPhamChiTiet) {

            // Kiểm tra xem thuộc tính giá bán đã được cập nhật hay không
            if (postUpdateEvent.getOldState() != null && postUpdateEvent.getState() != null) {
                BigDecimal previousGiaBan = (BigDecimal) postUpdateEvent.getOldState()[postUpdateEvent.getPersister().getPropertyIndex("giaBan")];
                BigDecimal currentGiaBan = (BigDecimal) postUpdateEvent.getState()[postUpdateEvent.getPersister().getPropertyIndex("giaBan")];

                // Nếu giá bán thay đổi
                if (!previousGiaBan.equals(currentGiaBan)) {
                    // Lấy ra đối tượng DotGiamGiaSanPham tương ứng với SanPhamChiTiet
                    List<DotGiamGiaSanPham> dotGiamGiaSanPhamList = dotGiamGiaSanPhamRepository.findBySanPhamChiTietId(sanPhamChiTiet.getId());
                    if (!dotGiamGiaSanPhamList.isEmpty()) {
                        for (DotGiamGiaSanPham dotGiamGiaSanPham : dotGiamGiaSanPhamList) {
                            // Cập nhật giá cũ và giá mới của DotGiamGiaSanPham
                            dotGiamGiaSanPham.setGiaCu(currentGiaBan);
                            dotGiamGiaSanPham.setGiaMoi(currentGiaBan
                                    .subtract(currentGiaBan
                                            .multiply(BigDecimal.valueOf(dotGiamGiaSanPham.getGiamGia())
                                                    .divide(new BigDecimal(100)))));

                            // Lưu DotGiamGiaSanPham đã cập nhật
                            dotGiamGiaSanPhamRepository.save(dotGiamGiaSanPham);
                        }
                    }
                }
            }
        }
    }

    @Override
    public boolean requiresPostCommitHandling(EntityPersister entityPersister) {
        return false;
    }
}
