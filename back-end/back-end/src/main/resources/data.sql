-- ACCOUNT
INSERT INTO account
(id,mat_khau,role,ten_dang_nhap,trang_thai)
VALUES
    (1,'$2a$10$k1XXblzXkl/9cSHvvSp3I.L89Pb4DiFO23nGoenaXunLs8jxDB7de','ROLE_ADMIN','admin0203',1);
-- pass: 12345678
INSERT INTO nhan_vien
(id,dia_chi,email,gioi_tinh,ho_ten,ngay_sinh,sdt,account_id)
VALUES
    (1,'Người Miền Núi','langcoc@gmail.com',1,'Nguyễn Lăng Cọc','2002-02-02','0123456789',1);

-- Hình thúc thanh toán
INSERT INTO `datn-bee-shirt`.`hinh_thuc_thanh_toan` (`id`,`hinh_thuc`)
VALUES ('1','TIEN_MAT');
INSERT INTO `datn-bee-shirt`.`hinh_thuc_thanh_toan` (`id`,`hinh_thuc`)
VALUES ('2','CHUYEN_KHOAN');
-- Hoa Don
INSERT INTO `datn-bee-shirt`.`hoa_don` (`id`,`dia_chi_nguoi_nhan`, `email_nguoi_nhan`, `loai_hoa_don`, `ma`, `phi_van_chuyen`, `sdt_nguoi_nhan`, `ten_nguoi_nhan`, `tong_tien`, `trang_thai`)
VALUES ('4','Chương Mỹ - Hà Nội', 'duongviethung@gmail.com', 'GIAO_HANG', 'HD01', '30000', '0123456789', 'Nguyen Van A', '650000', 'CHO_XAC_NHAN');
INSERT INTO `datn-bee-shirt`.`hoa_don` (`id`,`dia_chi_nguoi_nhan`, `email_nguoi_nhan`, `loai_hoa_don`, `ma`, `phi_van_chuyen`, `sdt_nguoi_nhan`, `ten_nguoi_nhan`, `tong_tien`, `trang_thai`)
VALUES ('5','Hà Đông - Hà Nội', 'nguyenthib@gmail.com', 'TAI_QUAY', 'HD02', '30000', '0123456789', 'Nguyen Thi B', '300000', 'HOAN_THANH');

UPDATE `datn-bee-shirt`.`hoa_don` SET `tien_giam` = '0' WHERE (`id` = '4');
UPDATE `datn-bee-shirt`.`hoa_don` SET `tien_giam` = '0' WHERE (`id` = '5');

UPDATE `datn-bee-shirt`.`hoa_don` SET `created_at` = '2024-01-22 15:30:01' WHERE (`id` = '4');
UPDATE `datn-bee-shirt`.`hoa_don` SET `created_at` = '2024-01-22 15:30:01' WHERE (`id` = '5');

-- Hoa don chi tiet
INSERT INTO `datn-bee-shirt`.`hoa_don_chi_tiet` (`id`,`gia_ban`, `so_luong`, `id_hoa_don`)
VALUES ('1','300000', '1', '4');
INSERT INTO `datn-bee-shirt`.`hoa_don_chi_tiet` (`id`,`gia_ban`, `so_luong`, `id_hoa_don`)
VALUES ('2','350000', '1', '4');
INSERT INTO `datn-bee-shirt`.`hoa_don_chi_tiet` (`id`,`gia_ban`, `so_luong`, `id_hoa_don`)
VALUES ('3','150000', '2', '5');
-- Lich sử hóa đơn

INSERT INTO `datn-bee-shirt`.`lich_su_hoa_don` (`id`, `mo_ta`, `tieu_de`, `id_hoa_don`,`trang_thai`,`created_at`)
VALUES ('1', 'Tạo đơn', 'Tạo đơn', '4','TAO_DON','2024-01-25 09:43:00');
INSERT INTO `datn-bee-shirt`.`lich_su_hoa_don` (`id`, `mo_ta`, `tieu_de`, `id_hoa_don`,`trang_thai`,`created_at`)
VALUES ('2', 'Chờ xác nhận', 'Chờ xác nhận', '4','CHO_XAC_NHAN','2024-01-25 09:43:00');
INSERT INTO `datn-bee-shirt`.`lich_su_hoa_don` (`id`, `mo_ta`, `tieu_de`, `id_hoa_don`,`trang_thai`,`created_at`)
VALUES ('3', 'Tạo đơn', 'Tạo đơn', '5','TAO_DON','2024-01-25 09:43:00');
-- INSERT INTO `datn-bee-shirt`.`lich_su_hoa_don` (`id`, `mo_ta`, `tieu_de`, `id_hoa_don`,`trang_thai`,`created_at`)
-- VALUES ('4', 'Chờ xác nhận', 'Chờ xác nhận', '5','CHO_XAC_NHAN','2024-01-25 09:43:00');
INSERT INTO `datn-bee-shirt`.`lich_su_hoa_don` (`id`, `mo_ta`, `tieu_de`, `id_hoa_don`,`trang_thai`,`created_at`)
VALUES ('5', 'Hoàn thành', 'Hoàn thành', '5','HOAN_THANH','2024-01-25 09:43:00');

-- Thanh toan
INSERT INTO `datn-bee-shirt`.`thanh_toan` (`id`, `ma_giao_dich`, `so_tien`, `trang_thai`, `id_httt`, `id_hoa_don`)
VALUES ('1', '123456789', '650000', 1, '2', '4');
INSERT INTO `datn-bee-shirt`.`thanh_toan` (`id`, `so_tien`, `trang_thai`, `id_httt`, `id_hoa_don`)
VALUES ('2', '300000', 1, '1', '5');

