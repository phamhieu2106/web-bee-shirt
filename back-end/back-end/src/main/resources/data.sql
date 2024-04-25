-- default data on create database

INSERT INTO `account`(`trang_thai`,`mat_khau`,`role`,`ten_dang_nhap`)
VALUES (1, '$2a$10$k1XXblzXkl/9cSHvvSp3I.L89Pb4DiFO23nGoenaXunLs8jxDB7de', 'ROLE_ADMIN', 'admin0203');

INSERT INTO `nhan_vien`
(`account_id`,`gioi_tinh`,`cccd`,`dia_chi`,`email`,`ho_ten`,`sdt`)
VALUES (1, 1,'001234567899', 'Hà Nội', 'langcoc@gmail.com', 'Nguyễn Lăng Cọc','0123456789');

INSERT INTO `hinh_thuc_thanh_toan`
(`id`,`hinh_thuc`)
VALUES (1, 'TIEN_MAT'),(2,  'CHUYEN_KHOAN');
