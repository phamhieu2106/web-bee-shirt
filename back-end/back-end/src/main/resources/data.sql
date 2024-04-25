CREATE
DATABASE  IF NOT EXISTS `datn-bee-shirt` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE
`datn-bee-shirt`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: datn-bee-shirt
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account`
(
    `id`            int    NOT NULL AUTO_INCREMENT,
    `mat_khau`      varchar(255) DEFAULT NULL,
    `role`          varchar(255) DEFAULT NULL,
    `ten_dang_nhap` varchar(255) DEFAULT NULL,
    `trang_thai`    bit(1) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK
TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account`
VALUES (1, '$2a$10$ZhpJ7yzZ9lY79aKTYoyAkeeE1X5ZkiJ8O1n2yZTjhMwJY0oph/2.m', 'ROLE_CUSTOMER', '0375773888', _binary ''),
       (2, '$2a$10$WwBv.J8zkQwuFNHIX1b0G.DZiYALP3dIAt0nOVmZO2p46B3xpqMzq', 'ROLE_ADMIN', 'nhanvien01@gmail.com',
        _binary ''),
       (3, '$2a$10$0vsjU81JdXDI/fXkr3KEt.ahxJvhyLfL0xnxl4fwiAvB0IvxMtXbi', 'ROLE_CUSTOMER', '0433888888', _binary ''),
       (4, '$2a$10$y/bn.yv.S.Zn4sTykikFm.iK0VLLqTxXi5eZgtbGMeRY6kUGbiPca', 'ROLE_ADMIN', 'hungdvph29421@fpt.edu.vn',
        _binary ''),
       (5, '$2a$10$k1XXblzXkl/9cSHvvSp3I.L89Pb4DiFO23nGoenaXunLs8jxDB7de', 'ROLE_ADMIN', 'admin0203', _binary ''),
       (6, '$2a$10$u3Dc2b6/2edsiegfTbBtsOK4DfmL/1h.a2Y43C1KZpVmqEvv84f3y', 'ROLE_CUSTOMER', '0998765432', _binary '');
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK
TABLES;

--
-- Table structure for table `chat_lieu`
--

DROP TABLE IF EXISTS `chat_lieu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_lieu`
(
    `id`              int    NOT NULL AUTO_INCREMENT,
    `created_at`      datetime(6) DEFAULT NULL,
    `created_by`      varchar(255) DEFAULT NULL,
    `last_updated_by` varchar(255) DEFAULT NULL,
    `updated_at`      datetime(6) DEFAULT NULL,
    `ten`             varchar(255) DEFAULT NULL,
    `trang_thai`      bit(1) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_lieu`
--

LOCK
TABLES `chat_lieu` WRITE;
/*!40000 ALTER TABLE `chat_lieu` DISABLE KEYS */;
INSERT INTO `chat_lieu`
VALUES (1, '2024-04-10 09:56:20.493223', 'admin0203', NULL, NULL, 'Cotton', _binary ''),
       (2, '2024-04-10 09:56:44.707789', 'admin0203', NULL, NULL, 'Lụa', _binary ''),
       (3, '2024-04-10 09:57:19.986660', 'admin0203', NULL, NULL, 'Nhung tăm', _binary ''),
       (4, '2024-04-10 09:57:50.346075', 'admin0203', 'admin0203', '2024-04-15 21:47:50.249361', 'Denim', _binary ''),
       (5, '2024-04-15 21:48:12.157378', 'admin0203', NULL, NULL, 'Oxford', _binary '');
/*!40000 ALTER TABLE `chat_lieu` ENABLE KEYS */;
UNLOCK
TABLES;

--
-- Table structure for table `co_ao`
--

DROP TABLE IF EXISTS `co_ao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `co_ao`
(
    `id`              int    NOT NULL AUTO_INCREMENT,
    `created_at`      datetime(6) DEFAULT NULL,
    `created_by`      varchar(255) DEFAULT NULL,
    `last_updated_by` varchar(255) DEFAULT NULL,
    `updated_at`      datetime(6) DEFAULT NULL,
    `ten`             varchar(255) DEFAULT NULL,
    `trang_thai`      bit(1) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `co_ao`
--

LOCK
TABLES `co_ao` WRITE;
/*!40000 ALTER TABLE `co_ao` DISABLE KEYS */;
INSERT INTO `co_ao`
VALUES (1, '2024-04-10 09:54:49.211693', 'admin0203', NULL, NULL, 'Cổ tròn', _binary ''),
       (2, '2024-04-10 09:55:00.780511', 'admin0203', NULL, NULL, 'Cổ chữ V', _binary ''),
       (3, '2024-04-10 09:55:15.997299', 'admin0203', 'admin0203', '2024-04-15 21:46:38.919306', 'Cổ điển',
        _binary ''),
       (4, '2024-04-10 09:55:40.743539', 'admin0203', NULL, NULL, 'Cổ cao', _binary '');
/*!40000 ALTER TABLE `co_ao` ENABLE KEYS */;
UNLOCK
TABLES;

--
-- Table structure for table `danh_sach_chi_tiet`
--

DROP TABLE IF EXISTS `danh_sach_chi_tiet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `danh_sach_chi_tiet`
(
    `id`              int NOT NULL AUTO_INCREMENT,
    `created_at`      datetime(6) DEFAULT NULL,
    `created_by`      varchar(255) DEFAULT NULL,
    `last_updated_by` varchar(255) DEFAULT NULL,
    `updated_at`      datetime(6) DEFAULT NULL,
    `khach_hang_id`   int          DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `UK_j4ki5uri6jth6sadv3c329joa` (`khach_hang_id`),
    CONSTRAINT `FK1hreicpwti9f262xnh5ssfilo` FOREIGN KEY (`khach_hang_id`) REFERENCES `khach_hang` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `danh_sach_chi_tiet`
--

LOCK
TABLES `danh_sach_chi_tiet` WRITE;
/*!40000 ALTER TABLE `danh_sach_chi_tiet` DISABLE KEYS */;
INSERT INTO `danh_sach_chi_tiet`
VALUES (1, '2024-04-10 09:34:22.247853', 'admin0203', NULL, NULL, 2),
       (2, '2024-04-14 18:34:36.214158', 'admin0203', NULL, NULL, 3);
/*!40000 ALTER TABLE `danh_sach_chi_tiet` ENABLE KEYS */;
UNLOCK
TABLES;

--
-- Table structure for table `dia_chi`
--

DROP TABLE IF EXISTS `dia_chi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dia_chi`
(
    `id`              int    NOT NULL AUTO_INCREMENT,
    `created_at`      datetime(6) DEFAULT NULL,
    `created_by`      varchar(255) DEFAULT NULL,
    `last_updated_by` varchar(255) DEFAULT NULL,
    `updated_at`      datetime(6) DEFAULT NULL,
    `duong`           varchar(255) DEFAULT NULL,
    `ho_ten`          varchar(255) DEFAULT NULL,
    `huyen`           varchar(255) DEFAULT NULL,
    `mac_dinh`        bit(1) NOT NULL,
    `sdt`             varchar(255) DEFAULT NULL,
    `tinh`            varchar(255) DEFAULT NULL,
    `xa`              varchar(255) DEFAULT NULL,
    `khach_hang_id`   int          DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY               `FKbbd8bxqdl1w9vhasn86u0q9w3` (`khach_hang_id`),
    CONSTRAINT `FKbbd8bxqdl1w9vhasn86u0q9w3` FOREIGN KEY (`khach_hang_id`) REFERENCES `khach_hang` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dia_chi`
--

LOCK
TABLES `dia_chi` WRITE;
/*!40000 ALTER TABLE `dia_chi` DISABLE KEYS */;
INSERT INTO `dia_chi`
VALUES (1, '2024-04-10 09:29:16.492500', 'admin0203', NULL, NULL, 'Thôn 1', NULL, 'Huyện Chương Mỹ', _binary '', NULL,
        'Hà Nội', 'Xã Đại Yên', 1),
       (2, '2024-04-10 09:34:22.246839', 'admin0203', NULL, NULL, 'Ngõ 99', NULL, 'Quận Nam Từ Liêm', _binary '', NULL,
        'Hà Nội', 'Phường Mễ Trì', 2),
       (3, '2024-04-10 09:36:22.677310', 'admin0203', NULL, NULL, 'nhà 30', NULL, 'Huyện đảo Hoàng Sa', _binary '\0',
        NULL, 'Đà Nẵng', 'Hoàng Sa', 2),
       (4, '2024-04-10 09:37:14.121355', 'admin0203', NULL, NULL, 'abc', NULL, 'Huyện Long Điền', _binary '\0', NULL,
        'Bà Rịa - Vũng Tàu', 'Thị trấn Long Hải', 2),
       (5, '2024-04-14 18:34:36.196770', 'admin0203', NULL, NULL, 'nhà 30', NULL, 'Huyện Phong Thổ', _binary '', NULL,
        'Lai Châu', 'Xã Nậm Xe', 3);
/*!40000 ALTER TABLE `dia_chi` ENABLE KEYS */;
UNLOCK
TABLES;

--
-- Table structure for table `dot_giam_gia`
--

DROP TABLE IF EXISTS `dot_giam_gia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dot_giam_gia`
(
    `id`                int NOT NULL AUTO_INCREMENT,
    `created_at`        datetime(6) DEFAULT NULL,
    `created_by`        varchar(255) DEFAULT NULL,
    `last_updated_by`   varchar(255) DEFAULT NULL,
    `updated_at`        datetime(6) DEFAULT NULL,
    `gia_tri_phan_tram` int          DEFAULT NULL,
    `ma_dot_giam_gia`   varchar(255) DEFAULT NULL,
    `ten_dot_giam_gia`  varchar(255) DEFAULT NULL,
    `trang_thai`        int          DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dot_giam_gia`
--

LOCK
TABLES `dot_giam_gia` WRITE;
/*!40000 ALTER TABLE `dot_giam_gia` DISABLE KEYS */;
INSERT INTO `dot_giam_gia`
VALUES (1, '2024-04-10 22:06:39.539755', 'admin0203', NULL, NULL, 20, 'DGG0DB962D', '30 thang 4', 0),
       (2, '2024-04-11 23:02:13.195881', 'admin0203', NULL, NULL, 10, 'DGG08F99D8', 'dfgbhn', 0),
       (3, '2024-04-14 18:38:02.317110', 'admin0203', NULL, NULL, 20, 'DGG344CFBA', 'dot giam gia 14 04', 0),
       (4, '2024-04-15 22:53:58.562771', 'admin0203', NULL, NULL, 8, 'DGG577125D', 'Giải phóng miền nam', 1);
/*!40000 ALTER TABLE `dot_giam_gia` ENABLE KEYS */;
UNLOCK
TABLES;

--
-- Table structure for table `dot_giam_gia_san_pham`
--

DROP TABLE IF EXISTS `dot_giam_gia_san_pham`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dot_giam_gia_san_pham`
(
    `id`                   int NOT NULL AUTO_INCREMENT,
    `created_at`           datetime(6) DEFAULT NULL,
    `created_by`           varchar(255) DEFAULT NULL,
    `last_updated_by`      varchar(255) DEFAULT NULL,
    `updated_at`           datetime(6) DEFAULT NULL,
    `thoi_gian_bat_dau`    datetime(6) DEFAULT NULL,
    `thoi_gian_ket_thuc`   datetime(6) DEFAULT NULL,
    `dot_giam_gia_id`      int          DEFAULT NULL,
    `san_pham_chi_tiet_id` int          DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY                    `FKjbtk25k8sxmitbpkof4f8auwk` (`dot_giam_gia_id`),
    KEY                    `FKjdh6kribb549mwwgej7br6so4` (`san_pham_chi_tiet_id`),
    CONSTRAINT `FKjbtk25k8sxmitbpkof4f8auwk` FOREIGN KEY (`dot_giam_gia_id`) REFERENCES `dot_giam_gia` (`id`),
    CONSTRAINT `FKjdh6kribb549mwwgej7br6so4` FOREIGN KEY (`san_pham_chi_tiet_id`) REFERENCES `san_pham_chi_tiet` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dot_giam_gia_san_pham`
--

LOCK
TABLES `dot_giam_gia_san_pham` WRITE;
/*!40000 ALTER TABLE `dot_giam_gia_san_pham` DISABLE KEYS */;
INSERT INTO `dot_giam_gia_san_pham`
VALUES (1, '2024-04-10 22:06:39.547765', 'admin0203', NULL, NULL, '2024-04-10 22:10:00.000000',
        '2024-04-11 22:06:00.000000', 1, 23),
       (2, '2024-04-10 22:07:01.741666', 'admin0203', NULL, NULL, '2024-04-10 22:10:00.000000',
        '2024-04-11 22:06:00.000000', 1, 24),
       (3, '2024-04-11 23:02:13.226938', 'admin0203', NULL, NULL, '2024-04-11 23:02:00.000000',
        '2024-04-12 13:02:00.000000', 2, 17),
       (4, '2024-04-14 18:38:02.332174', 'admin0203', NULL, NULL, '2024-04-14 18:37:00.000000',
        '2024-04-14 21:37:00.000000', 3, 36),
       (5, '2024-04-14 18:38:02.338173', 'admin0203', NULL, NULL, '2024-04-14 18:37:00.000000',
        '2024-04-14 21:37:00.000000', 3, 37),
       (6, '2024-04-15 22:53:58.569306', 'admin0203', NULL, NULL, '2024-04-15 22:53:00.000000',
        '2024-05-12 22:53:00.000000', 4, 23),
       (7, '2024-04-15 22:53:58.574349', 'admin0203', NULL, NULL, '2024-04-15 22:53:00.000000',
        '2024-05-12 22:53:00.000000', 4, 25),
       (8, '2024-04-15 22:53:58.577358', 'admin0203', NULL, NULL, '2024-04-15 22:53:00.000000',
        '2024-05-12 22:53:00.000000', 4, 19),
       (9, '2024-04-15 22:53:58.580371', 'admin0203', NULL, NULL, '2024-04-15 22:53:00.000000',
        '2024-05-12 22:53:00.000000', 4, 20);
/*!40000 ALTER TABLE `dot_giam_gia_san_pham` ENABLE KEYS */;
UNLOCK
TABLES;

--
-- Table structure for table `ds_yeu_thich_chi_tiet`
--

DROP TABLE IF EXISTS `ds_yeu_thich_chi_tiet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ds_yeu_thich_chi_tiet`
(
    `id`          int NOT NULL AUTO_INCREMENT,
    `so_luong`    int NOT NULL,
    `gio_hang_id` int DEFAULT NULL,
    `spct_id`     int DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY           `FKk0ju90jenuk49d4l6gdkbgq4f` (`gio_hang_id`),
    KEY           `FK7gj8e3cffejlrkrv4855bkabh` (`spct_id`),
    CONSTRAINT `FK7gj8e3cffejlrkrv4855bkabh` FOREIGN KEY (`spct_id`) REFERENCES `san_pham_chi_tiet` (`id`),
    CONSTRAINT `FKk0ju90jenuk49d4l6gdkbgq4f` FOREIGN KEY (`gio_hang_id`) REFERENCES `danh_sach_chi_tiet` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ds_yeu_thich_chi_tiet`
--

LOCK
TABLES `ds_yeu_thich_chi_tiet` WRITE;
/*!40000 ALTER TABLE `ds_yeu_thich_chi_tiet` DISABLE KEYS */;
/*!40000 ALTER TABLE `ds_yeu_thich_chi_tiet` ENABLE KEYS */;
UNLOCK
TABLES;

--
-- Table structure for table `gio_hang`
--

DROP TABLE IF EXISTS `gio_hang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gio_hang`
(
    `id`              int NOT NULL AUTO_INCREMENT,
    `created_at`      datetime(6) DEFAULT NULL,
    `created_by`      varchar(255) DEFAULT NULL,
    `last_updated_by` varchar(255) DEFAULT NULL,
    `updated_at`      datetime(6) DEFAULT NULL,
    `khach_hang_id`   int          DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `UK_l2kj7mgai2gvxdsli3yf35w2h` (`khach_hang_id`),
    CONSTRAINT `FKtfg3dplbmn3wiwy26si1daye3` FOREIGN KEY (`khach_hang_id`) REFERENCES `khach_hang` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gio_hang`
--

LOCK
TABLES `gio_hang` WRITE;
/*!40000 ALTER TABLE `gio_hang` DISABLE KEYS */;
INSERT INTO `gio_hang`
VALUES (1, '2024-04-10 09:34:22.247853', 'admin0203', NULL, NULL, 2),
       (2, '2024-04-14 18:34:36.203309', 'admin0203', NULL, NULL, 3);
/*!40000 ALTER TABLE `gio_hang` ENABLE KEYS */;
UNLOCK
TABLES;

--
-- Table structure for table `gio_hang_chi_tiet`
--

DROP TABLE IF EXISTS `gio_hang_chi_tiet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gio_hang_chi_tiet`
(
    `id`          int NOT NULL AUTO_INCREMENT,
    `so_luong`    int NOT NULL,
    `gio_hang_id` int DEFAULT NULL,
    `spct_id`     int DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY           `FKa5oymui7wplf9fwttmw8v1o3o` (`gio_hang_id`),
    KEY           `FKcvkcb0n1ghigo34hxlf5w30vu` (`spct_id`),
    CONSTRAINT `FKa5oymui7wplf9fwttmw8v1o3o` FOREIGN KEY (`gio_hang_id`) REFERENCES `gio_hang` (`id`),
    CONSTRAINT `FKcvkcb0n1ghigo34hxlf5w30vu` FOREIGN KEY (`spct_id`) REFERENCES `san_pham_chi_tiet` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gio_hang_chi_tiet`
--

LOCK
TABLES `gio_hang_chi_tiet` WRITE;
/*!40000 ALTER TABLE `gio_hang_chi_tiet` DISABLE KEYS */;
/*!40000 ALTER TABLE `gio_hang_chi_tiet` ENABLE KEYS */;
UNLOCK
TABLES;

--
-- Table structure for table `hinh_anh`
--

DROP TABLE IF EXISTS `hinh_anh`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hinh_anh`
(
    `id`         int NOT NULL AUTO_INCREMENT,
    `url`        varchar(255) DEFAULT NULL,
    `image_id`   varchar(255) DEFAULT NULL,
    `image_name` varchar(255) DEFAULT NULL,
    `image_url`  varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hinh_anh`
--

LOCK
TABLES `hinh_anh` WRITE;
/*!40000 ALTER TABLE `hinh_anh` DISABLE KEYS */;
INSERT INTO `hinh_anh`
VALUES (1, NULL, 'gxacbxaowr22fgxjk3fm', 'Screenshot 2024-02-05 162514',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1708832802/gxacbxaowr22fgxjk3fm.png'),
       (2, NULL, 'mvql9pu8inyksu89lz0r', 'Screenshot 2024-02-17 210142',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1708832805/mvql9pu8inyksu89lz0r.png'),
       (3, NULL, 'n08xocvqcaoetrewotjd', 'thymeleaf_advance',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1708832807/n08xocvqcaoetrewotjd.png'),
       (4, NULL, 'hn1cnz5ochmirmchbohv', 'J6_de2',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1708832807/hn1cnz5ochmirmchbohv.png'),
       (5, NULL, 'do5vx8fror26m7lqyfwk', 'PTCN_BTVN_B3',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1708832809/do5vx8fror26m7lqyfwk.png'),
       (6, NULL, 'opxwibji6mawp1zo8zve', 'Screenshot 2023-07-30 103218',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1708832810/opxwibji6mawp1zo8zve.png'),
       (7, NULL, 's8auxp6kuvucamb95fd6', 'Screenshot 2023-09-13 213556',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1708948846/s8auxp6kuvucamb95fd6.png'),
       (8, NULL, 'zbm75ee1n6f7fsotiy97', 'Screenshot 2023-09-12 211850',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1708948849/zbm75ee1n6f7fsotiy97.png'),
       (9, NULL, 'b4gpnlchurlatb0dpwij', 'Screenshot 2023-09-09 094142',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1708948851/b4gpnlchurlatb0dpwij.png'),
       (10, NULL, 'm4dt9xsz2jshhuttktrt', 'Screenshot 2023-09-09 094046',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1708948853/m4dt9xsz2jshhuttktrt.png'),
       (11, NULL, 'mbjpangxfyfag4n2k1qy', 'Screenshot 2023-08-07 145608',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1708948848/mbjpangxfyfag4n2k1qy.png'),
       (12, NULL, 'gqiepftg5lgslm3bs2px', 'Screenshot 2023-07-30 103218',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1708948850/gqiepftg5lgslm3bs2px.png'),
       (13, NULL, 'zkg6hhbsgmmwks55tjsm', 'PTCN_BTVN_B3',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1708948852/zkg6hhbsgmmwks55tjsm.png'),
       (14, NULL, 'jbcb5yabhw9psxvmxpiw', 'J6_de2',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1708948854/jbcb5yabhw9psxvmxpiw.png'),
       (15, NULL, 'gl8wgnkgq8izkqqmqtw1', 'lovepik-display-of-white-collar-image-of-male-staff-picture_500872022',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1710164473/gl8wgnkgq8izkqqmqtw1.jpg'),
       (16, NULL, 'kwewxy7afe7qxandgpd4',
        'pngtree-telephone-operator-financial-female-company-etiquette-photographs-with-pictures-image_833293',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1710164472/kwewxy7afe7qxandgpd4.jpg'),
       (17, NULL, 'glclb2rxs0gcoit02c0j', 'c84a5402b3459fbab76c7afec21b2366',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1710164480/glclb2rxs0gcoit02c0j.jpg'),
       (18, NULL, 'uyxxkbce06dijgkbho4p', 'Anh-cty-4-min',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1710164486/uyxxkbce06dijgkbho4p.jpg'),
       (19, NULL, 'ljcf8xotdz1kfr6qwokm', 'ao1',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1712759959/ljcf8xotdz1kfr6qwokm.webp'),
       (20, NULL, 'gzuk0dpjok6gunvqd1u9', 'ao3',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1712759959/gzuk0dpjok6gunvqd1u9.webp'),
       (21, NULL, 'atcrezrmqr8hp2xjhghe', 'ao6',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1712760291/atcrezrmqr8hp2xjhghe.jpg'),
       (22, NULL, 'kcc1xzbmonzguvk0k1vn', 'ao5jpg',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1712760294/kcc1xzbmonzguvk0k1vn.jpg'),
       (23, NULL, 'yfwqyuprz5xvu0qfc97e', 'ao4',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1712760296/yfwqyuprz5xvu0qfc97e.webp'),
       (24, NULL, 'udznon5b07quoawcnlr1', 'ao11',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1712761189/udznon5b07quoawcnlr1.webp'),
       (25, NULL, 'qemgujr2g6k6q1s3aeqr', 'ao7',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1712761186/qemgujr2g6k6q1s3aeqr.jpg'),
       (26, NULL, 's8mplk2gxrlebu2ai395', 'ao8',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1712761189/s8mplk2gxrlebu2ai395.jpg'),
       (27, NULL, 'k7tajifrquzua5ab0qsy', 'ao12',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1712761193/k7tajifrquzua5ab0qsy.webp'),
       (28, NULL, 'v5lvp7miwlzcb2u4tnat', 'ao13',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1712761197/v5lvp7miwlzcb2u4tnat.webp'),
       (29, NULL, 'i3hjzn1evuelzitlgjfs', 'ao1',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1713094381/i3hjzn1evuelzitlgjfs.webp'),
       (30, NULL, 'elg7rkdfmksudxqyjtwo', 'ao3',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1713094382/elg7rkdfmksudxqyjtwo.webp'),
       (31, NULL, 'n4a82x9mvrfftnkee0d5', 'ao5jpg',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1713094383/n4a82x9mvrfftnkee0d5.jpg');
/*!40000 ALTER TABLE `hinh_anh` ENABLE KEYS */;
UNLOCK
TABLES;

--
-- Table structure for table `hinh_thuc_thanh_toan`
--

DROP TABLE IF EXISTS `hinh_thuc_thanh_toan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hinh_thuc_thanh_toan`
(
    `id`              int NOT NULL AUTO_INCREMENT,
    `created_at`      datetime(6) DEFAULT NULL,
    `created_by`      varchar(255) DEFAULT NULL,
    `last_updated_by` varchar(255) DEFAULT NULL,
    `updated_at`      datetime(6) DEFAULT NULL,
    `hinh_thuc`       enum('TIEN_MAT','CHUYEN_KHOAN') DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hinh_thuc_thanh_toan`
--

LOCK
TABLES `hinh_thuc_thanh_toan` WRITE;
/*!40000 ALTER TABLE `hinh_thuc_thanh_toan` DISABLE KEYS */;
INSERT INTO `hinh_thuc_thanh_toan`
VALUES (1, '2024-04-10 22:03:13.662371', 'admin0203', NULL, NULL, 'TIEN_MAT'),
       (2, '2024-04-10 22:19:17.864219', 'admin0203', NULL, NULL, 'CHUYEN_KHOAN');
/*!40000 ALTER TABLE `hinh_thuc_thanh_toan` ENABLE KEYS */;
UNLOCK
TABLES;

--
-- Table structure for table `hoa_don`
--

DROP TABLE IF EXISTS `hoa_don`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hoa_don`
(
    `id`                 int NOT NULL AUTO_INCREMENT,
    `created_at`         datetime(6) DEFAULT NULL,
    `created_by`         varchar(255)   DEFAULT NULL,
    `last_updated_by`    varchar(255)   DEFAULT NULL,
    `updated_at`         datetime(6) DEFAULT NULL,
    `dia_chi_nguoi_nhan` varchar(255)   DEFAULT NULL,
    `email_nguoi_nhan`   varchar(255)   DEFAULT NULL,
    `ghi_chu`            varchar(255)   DEFAULT NULL,
    `loai_hoa_don`       enum('TAI_QUAY','GIAO_HANG') DEFAULT NULL,
    `ma`                 varchar(255)   DEFAULT NULL,
    `phi_van_chuyen`     decimal(38, 2) DEFAULT NULL,
    `sdt_nguoi_nhan`     varchar(255)   DEFAULT NULL,
    `ten_nguoi_nhan`     varchar(255)   DEFAULT NULL,
    `tien_giam`          decimal(38, 2) DEFAULT NULL,
    `tong_tien`          decimal(38, 2) DEFAULT NULL,
    `trang_thai`         enum('TAO_DON','CHO_XAC_NHAN','DA_XAC_NHAN','CHO_GIAO','DANG_GIAO','HOAN_THANH','HUY','TRA_HANG') DEFAULT NULL,
    `id_khach_hang`      int            DEFAULT NULL,
    `id_nhan_vien`       int            DEFAULT NULL,
    `id_phieu_giam_gia`  int            DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY                  `FKrygimdf5nr1g2t6u03gvtr1te` (`id_khach_hang`),
    KEY                  `FKkuxkrkgq8yftm4d8d7o0w6nbv` (`id_nhan_vien`),
    KEY                  `FKmueylgcm7h1gb4f9nbnp3j5c6` (`id_phieu_giam_gia`),
    CONSTRAINT `FKkuxkrkgq8yftm4d8d7o0w6nbv` FOREIGN KEY (`id_nhan_vien`) REFERENCES `nhan_vien` (`id`),
    CONSTRAINT `FKmueylgcm7h1gb4f9nbnp3j5c6` FOREIGN KEY (`id_phieu_giam_gia`) REFERENCES `phieu_giam_gia` (`id`),
    CONSTRAINT `FKrygimdf5nr1g2t6u03gvtr1te` FOREIGN KEY (`id_khach_hang`) REFERENCES `khach_hang` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hoa_don`
--

LOCK
TABLES `hoa_don` WRITE;
/*!40000 ALTER TABLE `hoa_don` DISABLE KEYS */;
INSERT INTO `hoa_don`
VALUES (1, '2024-04-10 22:03:13.623806', 'admin0203', 'admin0203', '2024-04-10 22:07:59.895744', NULL, NULL, NULL,
        'TAI_QUAY', 'HD0', 0.00, NULL, NULL, 50000.00, 1200000.00, 'TRA_HANG', NULL, 1, 1),
       (2, '2024-04-10 22:07:59.849133', 'admin0203', 'admin0203', '2024-04-10 22:07:59.864152', NULL, NULL, '',
        'TAI_QUAY', 'HDA699C449', 0.00, NULL, NULL, 0.00, 600000.00, 'HOAN_THANH', NULL, 1, NULL),
       (3, '2024-04-10 22:19:17.775548', 'admin0203', 'admin0203', '2024-04-11 15:56:36.542239',
        'nhà 30,Hoàng Sa,Huyện đảo Hoàng Sa,Đà Nẵng', NULL, NULL, 'GIAO_HANG', 'HD2', 46201.00, '0433888888',
        'Nguyễn Thị Thanh Nga', 330000.00, 3000000.00, 'HOAN_THANH', 2, 1, 4),
       (4, '2024-04-10 22:19:53.686511', 'admin0203', 'admin0203', '2024-04-11 13:19:40.008366',
        'Thôn 1,Xã Đại Yên,Huyện Chương Mỹ,Hà Nội', NULL, NULL, 'GIAO_HANG', 'HD3', 25300.00, '0375773888',
        'Dương Việt Hùng', 0.00, 3360000.00, 'TRA_HANG', 1, 1, NULL),
       (5, '2024-04-10 22:21:02.500459', 'admin0203', 'admin0203', '2024-04-11 14:17:38.520565',
        'Thôn 1,Xã Đại Yên,Huyện Chương Mỹ,Hà Nội', NULL, NULL, 'GIAO_HANG', 'HD4', 25300.00, '0375773888',
        'Dương Việt Hùng', 50000.00, 1200000.00, 'HUY', 1, 1, 1),
       (6, '2024-04-11 13:19:39.889573', 'admin0203', 'admin0203', '2024-04-11 13:19:39.959290', NULL, NULL, '',
        'TAI_QUAY', 'HDEBCF2C19', 0.00, NULL, NULL, 0.00, 2760000.00, 'HOAN_THANH', 1, 3, NULL),
       (7, '2024-04-11 13:42:19.038990', 'admin0203', 'admin0203', '2024-04-11 14:14:19.744632',
        'Ngõ 99,Phường Mễ Trì,Quận Nam Từ Liêm,Hà Nội', NULL, NULL, 'GIAO_HANG', 'HD6', 25200.00, '0433888888',
        'Nguyễn Thị Thanh Nga', 0.00, 600000.00, 'DANG_GIAO', 2, 3, NULL),
       (8, '2024-04-11 16:09:47.949684', 'admin0203', 'admin0203', '2024-04-11 16:09:47.968171',
        'nhà 30,Hoàng Sa,Huyện đảo Hoàng Sa,Đà Nẵng', NULL, NULL, 'GIAO_HANG', 'HD7', 46201.00, '0433888888',
        'Nguyễn Thị Thanh Nga', 330000.00, 3000000.00, 'CHO_XAC_NHAN', 2, 3, 4),
       (9, '2024-04-11 16:58:34.338531', 'admin0203', 'admin0203', '2024-04-12 09:49:44.157009',
        'sdfgrh,Xã Quài Cang,Huyện Tuần Giáo,Điện Biên', NULL, NULL, 'GIAO_HANG', 'HD8', 25301.00, '0375773888',
        'Dương Việt Hùng', 0.00, 600000.00, 'CHO_XAC_NHAN', 1, 3, NULL),
       (10, '2024-04-11 17:03:49.393741', 'admin0203', 'admin0203', '2024-04-11 17:03:49.405734',
        'fdghj,Xã Trì Quang,Huyện Bảo Thắng,Lào Cai', NULL, NULL, 'GIAO_HANG', 'HD9', 25301.00, '0987654312', 'hung',
        135000.00, 1350000.00, 'CHO_XAC_NHAN', NULL, 3, 3),
       (11, '2024-04-11 21:18:28.707055', 'admin0203', 'admin0203', '2024-04-11 21:18:28.761056',
        '30/4 dbp,Xã Xuân Tầm,Huyện Văn Yên,Yên Bái', NULL, NULL, 'GIAO_HANG', 'HD10', 25301.00, '0987654321', 'hungdv',
        0.00, 600000.00, 'CHO_XAC_NHAN', NULL, 3, NULL),
       (16, '2024-04-12 21:55:49.613231', 'admin0203', 'admin0203', '2024-04-12 21:55:49.688483',
        'Ngõ 99,Phường Mễ Trì,Quận Nam Từ Liêm,Hà Nội', NULL, NULL, 'GIAO_HANG', 'HD11', 24200.00, '0433888888',
        'Nguyễn Thị Thanh Nga', 0.00, 600000.00, 'CHO_XAC_NHAN', 2, 3, NULL),
       (17, '2024-04-14 18:36:26.728008', 'admin0203', 'admin0203', '2024-04-14 18:43:02.936243', NULL, NULL, NULL,
        'TAI_QUAY', 'HD12', 0.00, NULL, NULL, 0.00, 1500000.00, 'TRA_HANG', 3, 3, NULL),
       (18, '2024-04-14 18:39:00.159214', 'admin0203', 'admin0203', '2024-04-14 21:21:38.705185',
        'ádfghjk,Xã Pa Vây Sử,Huyện Phong Thổ,Lai Châu', NULL, NULL, 'GIAO_HANG', 'HD13', 25301.00, '0433888888',
        'Nguyễn Thị Thanh Nga', 0.00, 34800000.00, 'CHO_GIAO', 2, 3, NULL);
/*!40000 ALTER TABLE `hoa_don` ENABLE KEYS */;
UNLOCK
TABLES;

--
-- Table structure for table `hoa_don_chi_tiet`
--

DROP TABLE IF EXISTS `hoa_don_chi_tiet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hoa_don_chi_tiet`
(
    `id`                  int NOT NULL AUTO_INCREMENT,
    `gia_ban`             decimal(38, 2) DEFAULT NULL,
    `gia_nhap`            decimal(38, 2) DEFAULT NULL,
    `so_luong`            int NOT NULL,
    `id_hoa_don`          int            DEFAULT NULL,
    `id_hoa_don_tra_hang` int            DEFAULT NULL,
    `id_spct`             int            DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY                   `FK5adopt864mjisuy5xmgmy8iun` (`id_hoa_don`),
    KEY                   `FK8ue9uh9qjbp1lhy52ajb46hpk` (`id_hoa_don_tra_hang`),
    KEY                   `FKtg7wf3f4noic4uhrdn3lju7k6` (`id_spct`),
    CONSTRAINT `FK5adopt864mjisuy5xmgmy8iun` FOREIGN KEY (`id_hoa_don`) REFERENCES `hoa_don` (`id`),
    CONSTRAINT `FK8ue9uh9qjbp1lhy52ajb46hpk` FOREIGN KEY (`id_hoa_don_tra_hang`) REFERENCES `hoa_don_tra_hang` (`id`),
    CONSTRAINT `FKtg7wf3f4noic4uhrdn3lju7k6` FOREIGN KEY (`id_spct`) REFERENCES `san_pham_chi_tiet` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hoa_don_chi_tiet`
--

LOCK
TABLES `hoa_don_chi_tiet` WRITE;
/*!40000 ALTER TABLE `hoa_don_chi_tiet` DISABLE KEYS */;
INSERT INTO `hoa_don_chi_tiet`
VALUES (1, 600000.00, 300000.00, 2, 1, NULL, 17),
       (2, 600000.00, 300000.00, 1, 2, NULL, 17),
       (3, 600000.00, 300000.00, 1, NULL, 1, 17),
       (5, 600000.00, 300000.00, 5, 3, NULL, 17),
       (13, 600000.00, 300000.00, 2, 4, NULL, 17),
       (14, 600000.00, 300000.00, 2, 5, NULL, 17),
       (15, 1080000.00, 1000000.00, 2, 4, NULL, 23),
       (16, 600000.00, 300000.00, 1, 6, NULL, 17),
       (17, 1080000.00, 1000000.00, 2, 6, NULL, 23),
       (18, 600000.00, 300000.00, 1, NULL, 2, 17),
       (19, 600000.00, 300000.00, 1, 7, NULL, 17),
       (21, 600000.00, 300000.00, 5, 8, NULL, 17),
       (22, 600000.00, 300000.00, 1, 9, NULL, 17),
       (23, 1350000.00, 1000000.00, 1, 10, NULL, 26),
       (24, 600000.00, 300000.00, 1, 11, NULL, 17),
       (25, 600000.00, 300000.00, 1, 16, NULL, 17),
       (26, 1500000.00, 1000000.00, 1, 17, NULL, 36),
       (27, 1200000.00, 1000000.00, 29, 18, NULL, 36),
       (28, 1500000.00, 1000000.00, 1, NULL, 3, 36);
/*!40000 ALTER TABLE `hoa_don_chi_tiet` ENABLE KEYS */;
UNLOCK
TABLES;

--
-- Table structure for table `hoa_don_tra_hang`
--

DROP TABLE IF EXISTS `hoa_don_tra_hang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hoa_don_tra_hang`
(
    `id`                           int NOT NULL AUTO_INCREMENT,
    `dia_chi_nguoi_nhan`           varchar(255)   DEFAULT NULL,
    `email_nguoi_nhan`             varchar(255)   DEFAULT NULL,
    `ghi_chu`                      varchar(255)   DEFAULT NULL,
    `ma`                           varchar(255)   DEFAULT NULL,
    `sdt_nguoi_nhan`               varchar(255)   DEFAULT NULL,
    `ten_nguoi_nhan`               varchar(255)   DEFAULT NULL,
    `tong_tien`                    decimal(38, 2) DEFAULT NULL,
    `hoa_don_id`                   int            DEFAULT NULL,
    `created_at`                   datetime(6) DEFAULT NULL,
    `created_by`                   varchar(255)   DEFAULT NULL,
    `last_updated_by`              varchar(255)   DEFAULT NULL,
    `updated_at`                   datetime(6) DEFAULT NULL,
    `tong_tien_phieu_giam_gia_cu`  decimal(38, 2) DEFAULT NULL,
    `tong_tien_phieu_giam_gia_moi` decimal(38, 2) DEFAULT NULL,
    `tong_tien_tra_khach`          decimal(38, 2) DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `UK_a10fuo2ij18b8kd3chd02okrx` (`hoa_don_id`),
    CONSTRAINT `FKtpfop93u138d574n1hc3onapr` FOREIGN KEY (`hoa_don_id`) REFERENCES `hoa_don` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hoa_don_tra_hang`
--

LOCK
TABLES `hoa_don_tra_hang` WRITE;
/*!40000 ALTER TABLE `hoa_don_tra_hang` DISABLE KEYS */;
INSERT INTO `hoa_don_tra_hang`
VALUES (1, NULL, NULL, 'Sản phẩm không đúng như mô tả', 'HDTHE406C259', NULL, NULL, 600000.00, 1, NULL, NULL, NULL,
        NULL, NULL, NULL, NULL),
       (2, 'Thôn 1,Xã Đại Yên,Huyện Chương Mỹ,Hà Nội', NULL, 'Sản phẩm không đúng như mô tả', 'HDTHBF6DB0DD',
        '0375773888', 'Dương Việt Hùng', 600000.00, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
       (3, NULL, 'duongviethung2003@gmail.com', 'Sản phẩm không đúng như mô tả', 'HDTH406BB78D', '0998765432',
        'Nguyễn Văn A', 1500000.00, 17, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
/*!40000 ALTER TABLE `hoa_don_tra_hang` ENABLE KEYS */;
UNLOCK
TABLES;

--
-- Table structure for table `khach_hang`
--

DROP TABLE IF EXISTS `khach_hang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `khach_hang`
(
    `id`              int    NOT NULL AUTO_INCREMENT,
    `created_at`      datetime(6) DEFAULT NULL,
    `created_by`      varchar(255) DEFAULT NULL,
    `last_updated_by` varchar(255) DEFAULT NULL,
    `updated_at`      datetime(6) DEFAULT NULL,
    `email`           varchar(255) DEFAULT NULL,
    `gioi_tinh`       bit(1) NOT NULL,
    `ho_ten`          varchar(255) DEFAULT NULL,
    `ngay_sinh`       date         DEFAULT NULL,
    `sdt`             varchar(255) DEFAULT NULL,
    `trang_thai`      int    NOT NULL,
    `account_id`      int          DEFAULT NULL,
    `image_id`        int          DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `UK_altrjwb4si5pi5noki9m4luou` (`account_id`),
    UNIQUE KEY `UK_a19bvk2c2t500smv1kch12fck` (`image_id`),
    CONSTRAINT `FK98t4n6gmjvxcfk7ecl91hov2k` FOREIGN KEY (`image_id`) REFERENCES `khach_hang_image` (`id`),
    CONSTRAINT `FKhmkyfp115c2sjj4gjab9ciyqd` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `khach_hang`
--

LOCK
TABLES `khach_hang` WRITE;
/*!40000 ALTER TABLE `khach_hang` DISABLE KEYS */;
INSERT INTO `khach_hang`
VALUES (1, '2024-04-10 09:29:16.458731', 'admin0203', NULL, NULL, NULL, _binary '', 'Dương Việt Hùng', '2003-03-01',
        '0375773888', 1, 1, NULL),
       (2, '2024-04-10 09:34:22.231803', 'admin0203', NULL, NULL, 'hungboong30@gmail.com', _binary '\0',
        'Nguyễn Thị Thanh Nga', '2024-04-09', '0433888888', 1, 3, 2),
       (3, '2024-04-14 18:34:36.184207', 'admin0203', NULL, NULL, 'duongviethung2003@gmail.com', _binary '',
        'Nguyễn Văn A', '2024-04-12', '0998765432', 1, 6, 4);
/*!40000 ALTER TABLE `khach_hang` ENABLE KEYS */;
UNLOCK
TABLES;

--
-- Table structure for table `khach_hang_image`
--

DROP TABLE IF EXISTS `khach_hang_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `khach_hang_image`
(
    `id`         int NOT NULL AUTO_INCREMENT,
    `image_id`   varchar(255) DEFAULT NULL,
    `image_name` varchar(255) DEFAULT NULL,
    `image_url`  varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `khach_hang_image`
--

LOCK
TABLES `khach_hang_image` WRITE;
/*!40000 ALTER TABLE `khach_hang_image` DISABLE KEYS */;
INSERT INTO `khach_hang_image`
VALUES (1, 'xb0uu0wjqqkcvdvpronf', 'anh_the_1',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1712716355/xb0uu0wjqqkcvdvpronf.jpg'),
       (2, 'ncd9fdy28b8hddjvrhbx', 'anh_the_2',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1712716460/ncd9fdy28b8hddjvrhbx.jpg'),
       (3, 'y8go9fr5t2u1zxl1ljle', 'lovepik-display-of-white-collar-image-of-male-staff-picture_500872022',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1712759649/y8go9fr5t2u1zxl1ljle.jpg'),
       (4, 'hgqvl8kd7l4cgrmnsqvc', 'anh_the_2',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1713094474/hgqvl8kd7l4cgrmnsqvc.jpg');
/*!40000 ALTER TABLE `khach_hang_image` ENABLE KEYS */;
UNLOCK
TABLES;

--
-- Table structure for table `kich_co`
--

DROP TABLE IF EXISTS `kich_co`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kich_co`
(
    `id`              int    NOT NULL AUTO_INCREMENT,
    `created_at`      datetime(6) DEFAULT NULL,
    `created_by`      varchar(255) DEFAULT NULL,
    `last_updated_by` varchar(255) DEFAULT NULL,
    `updated_at`      datetime(6) DEFAULT NULL,
    `ten`             varchar(255) DEFAULT NULL,
    `trang_thai`      bit(1) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kich_co`
--

LOCK
TABLES `kich_co` WRITE;
/*!40000 ALTER TABLE `kich_co` DISABLE KEYS */;
INSERT INTO `kich_co`
VALUES (1, '2024-04-10 09:46:25.849663', 'admin0203', NULL, NULL, 'S', _binary ''),
       (2, '2024-04-10 09:46:30.565010', 'admin0203', NULL, NULL, 'M', _binary ''),
       (3, '2024-04-10 09:46:36.502252', 'admin0203', NULL, NULL, 'L', _binary ''),
       (4, '2024-04-10 09:46:42.337082', 'admin0203', NULL, NULL, 'XL', _binary ''),
       (5, '2024-04-10 09:46:49.826018', 'admin0203', NULL, NULL, 'XXL', _binary '');
/*!40000 ALTER TABLE `kich_co` ENABLE KEYS */;
UNLOCK
TABLES;

--
-- Table structure for table `kieu_dang`
--

DROP TABLE IF EXISTS `kieu_dang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kieu_dang`
(
    `id`              int    NOT NULL AUTO_INCREMENT,
    `created_at`      datetime(6) DEFAULT NULL,
    `created_by`      varchar(255) DEFAULT NULL,
    `last_updated_by` varchar(255) DEFAULT NULL,
    `updated_at`      datetime(6) DEFAULT NULL,
    `ten`             varchar(255) DEFAULT NULL,
    `trang_thai`      bit(1) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kieu_dang`
--

LOCK
TABLES `kieu_dang` WRITE;
/*!40000 ALTER TABLE `kieu_dang` DISABLE KEYS */;
INSERT INTO `kieu_dang`
VALUES (1, '2024-04-10 09:47:00.458044', 'admin0203', 'admin0203', '2024-04-15 21:40:35.646119', 'Regular',
        _binary ''),
       (2, '2024-04-10 09:47:11.159741', 'admin0203', NULL, NULL, 'Oversize', _binary ''),
       (3, '2024-04-10 09:48:05.966344', 'admin0203', 'admin0203', '2024-04-15 21:40:27.183688', 'Classic',
        _binary ''),
       (4, '2024-04-14 18:30:53.944771', 'admin0203', 'admin0203', '2024-04-15 21:39:25.138969', 'Slim Fit',
        _binary '');
/*!40000 ALTER TABLE `kieu_dang` ENABLE KEYS */;
UNLOCK
TABLES;

--
-- Table structure for table `kieu_thiet_ke`
--

DROP TABLE IF EXISTS `kieu_thiet_ke`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kieu_thiet_ke`
(
    `id`              int    NOT NULL AUTO_INCREMENT,
    `created_at`      datetime(6) DEFAULT NULL,
    `created_by`      varchar(255) DEFAULT NULL,
    `last_updated_by` varchar(255) DEFAULT NULL,
    `updated_at`      datetime(6) DEFAULT NULL,
    `ten`             varchar(255) DEFAULT NULL,
    `trang_thai`      bit(1) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kieu_thiet_ke`
--

LOCK
TABLES `kieu_thiet_ke` WRITE;
/*!40000 ALTER TABLE `kieu_thiet_ke` DISABLE KEYS */;
INSERT INTO `kieu_thiet_ke`
VALUES (1, '2024-04-10 09:48:20.441635', 'admin0203', 'admin0203', '2024-04-15 21:43:37.017653', 'Vintage',
        _binary ''),
       (2, '2024-04-10 09:48:28.540642', 'admin0203', 'admin0203', '2024-04-15 21:43:16.534777', 'Họa tiết',
        _binary ''),
       (3, '2024-04-10 09:49:01.804156', 'admin0203', 'admin0203', '2024-04-15 21:42:56.404463', 'Kẻ sọc', _binary ''),
       (4, '2024-04-10 09:52:32.791049', 'admin0203', 'admin0203', '2024-04-15 21:42:45.821138', 'Đơn sắc',
        _binary '');
/*!40000 ALTER TABLE `kieu_thiet_ke` ENABLE KEYS */;
UNLOCK
TABLES;

--
-- Table structure for table `lich_su_hoa_don`
--

DROP TABLE IF EXISTS `lich_su_hoa_don`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lich_su_hoa_don`
(
    `id`              int NOT NULL AUTO_INCREMENT,
    `created_at`      datetime(6) DEFAULT NULL,
    `created_by`      varchar(255) DEFAULT NULL,
    `last_updated_by` varchar(255) DEFAULT NULL,
    `updated_at`      datetime(6) DEFAULT NULL,
    `mo_ta`           varchar(255) DEFAULT NULL,
    `tieu_de`         varchar(255) DEFAULT NULL,
    `trang_thai`      enum('TAO_DON','CHO_XAC_NHAN','DA_XAC_NHAN','CHO_GIAO','DANG_GIAO','HOAN_THANH','HUY','TRA_HANG') DEFAULT NULL,
    `id_hoa_don`      int          DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY               `FKcan7u6m18x7j4e4cxoojeu9b5` (`id_hoa_don`),
    CONSTRAINT `FKcan7u6m18x7j4e4cxoojeu9b5` FOREIGN KEY (`id_hoa_don`) REFERENCES `hoa_don` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=119 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lich_su_hoa_don`
--

LOCK
TABLES `lich_su_hoa_don` WRITE;
/*!40000 ALTER TABLE `lich_su_hoa_don` DISABLE KEYS */;
INSERT INTO `lich_su_hoa_don`
VALUES (1, '2024-04-10 22:03:13.639334', 'admin0203', NULL, NULL, '', 'Hoàn thành', 'HOAN_THANH', 1),
       (2, '2024-04-10 22:07:59.856143', 'admin0203', NULL, NULL, '', 'Hoàn thành', 'HOAN_THANH', 2),
       (3, '2024-04-10 22:07:59.893738', 'admin0203', NULL, NULL, 'Sản phẩm không đúng như mô tả', 'Trả hàng',
        'TRA_HANG', 1),
       (4, '2024-04-10 22:19:17.850147', 'admin0203', NULL, NULL, '', 'Chờ xác nhận', 'CHO_XAC_NHAN', 3),
       (5, '2024-04-10 22:19:53.696066', 'admin0203', NULL, NULL, '', 'Chờ xác nhận', 'CHO_XAC_NHAN', 4),
       (6, '2024-04-10 22:21:02.506459', 'admin0203', NULL, NULL, '', 'Chờ xác nhận', 'CHO_XAC_NHAN', 5),
       (7, '2024-04-10 22:21:49.275950', 'admin0203', NULL, NULL,
        'Thêm 1 sản phẩm Áo Sơmi Cuban Glamorous Embroidery Logo màu Xanh dương kichCo Xanh dương', 'Cập nhật sản phẩm',
        NULL, 3),
       (8, '2024-04-10 22:21:51.491389', 'admin0203', NULL, NULL,
        'Cập nhật sản phẩm Áo Sơmi Cuban Glamorous Embroidery Logo màu Xanh dương kichCo Xanh dương số lượng 5-1',
        'Cập nhật sản phẩm', NULL, 3),
       (9, '2024-04-10 22:27:35.183480', 'admin0203', NULL, NULL, 'Chuyển trạng thái', 'Đã xác nhận', 'DA_XAC_NHAN', 3),
       (10, '2024-04-10 22:29:43.937602', 'admin0203', NULL, NULL,
        'Thêm 1 sản phẩm Áo Sơmi Cuban Glamorous Embroidery Logo màu Xanh dương ,kichCo M', 'Thêm sản phẩm', NULL, 4),
       (11, '2024-04-10 22:30:00.348494', 'admin0203', NULL, NULL,
        'Cập nhật sản phẩm Áo Sơmi Cuban Glamorous Embroidery Logo màu Xanh dương kichCo M số lượng 3',
        'Cập nhật sản phẩm', NULL, 4),
       (12, '2024-04-10 22:30:24.037789', 'admin0203', NULL, NULL,
        'Cập nhật sản phẩm Áo Sơmi Oxford Tay Dài Red Script màu Đen kichCo M số lượng 3', 'Cập nhật sản phẩm', NULL, 4),
       (13, '2024-04-10 22:30:59.071269', 'admin0203', NULL, NULL, 'Chuyển trạng thái', 'Đã xác nhận', 'DA_XAC_NHAN',
        4),
       (14, '2024-04-10 22:31:06.221253', 'admin0203', NULL, NULL, 'Chuyển trạng thái', 'Chờ giao hàng', 'CHO_GIAO', 4),
       (15, '2024-04-10 22:31:35.466976', 'admin0203', NULL, NULL, 'Chuyển trạng thái', 'Đang giao hàng', 'DANG_GIAO',
        4),
       (16, '2024-04-10 22:32:44.260690', 'admin0203', NULL, NULL, 'Tạo thanh toán với số tiền : 3.385.300',
        'Tạo thanh toán', NULL, 4),
       (17, '2024-04-10 22:33:02.498675', 'admin0203', NULL, NULL, 'Chuyển trạng thái', 'Chờ giao hàng', 'CHO_GIAO', 4),
       (18, '2024-04-10 22:33:11.078952', 'admin0203', NULL, NULL, 'Chuyển trạng thái', 'Đang giao hàng', 'DANG_GIAO',
        4),
       (19, '2024-04-10 22:33:13.975508', 'admin0203', NULL, NULL, 'Chuyển trạng thái', 'Hoàn thành', 'HOAN_THANH', 4),
       (20, '2024-04-10 22:34:16.819616', 'admin0203', NULL, NULL, 'Chuyển trạng thái', 'Hủy', 'HUY', 5),
       (21, '2024-04-11 13:19:39.938231', 'admin0203', NULL, NULL, '', 'Hoàn thành', 'HOAN_THANH', 6),
       (22, '2024-04-11 13:19:40.005366', 'admin0203', NULL, NULL, 'Sản phẩm không đúng như mô tả', 'Trả hàng',
        'TRA_HANG', 4),
       (23, '2024-04-11 13:30:17.987697', 'admin0203', NULL, NULL, 'Chuyển trạng thái', 'Chờ xác nhận', 'CHO_XAC_NHAN',
        3),
       (24, '2024-04-11 13:30:29.459581', 'admin0203', NULL, NULL, 'Xóa thanh toán với số tiền : 12.096.201',
        'Xóa thanh toán', NULL, 3),
       (25, '2024-04-11 13:30:32.802119', 'admin0203', NULL, NULL, 'Tạo thanh toán với số tiền : 12.096.201',
        'Tạo thanh toán', NULL, 3),
       (26, '2024-04-11 13:31:17.559300', 'admin0203', NULL, NULL,
        'Cập nhật sản phẩm Áo Sơmi Cuban Glamorous Embroidery Logo màu Xanh dương kichCo M số lượng 7',
        'Cập nhật sản phẩm', NULL, 3),
       (27, '2024-04-11 13:31:38.464030', 'admin0203', NULL, NULL, 'Tạo thanh toán với số tiền : 380.000',
        'Tạo thanh toán', NULL, 3),
       (28, '2024-04-11 13:31:47.565206', 'admin0203', NULL, NULL, 'Chuyển trạng thái', 'Đã xác nhận', 'DA_XAC_NHAN',
        3),
       (29, '2024-04-11 13:37:41.176593', 'admin0203', NULL, NULL, 'Chuyển trạng thái', 'Chờ giao hàng', 'CHO_GIAO', 3),
       (30, '2024-04-11 13:37:59.077676', 'admin0203', NULL, NULL, 'Chuyển trạng thái', 'Đang giao hàng', 'DANG_GIAO',
        3),
       (31, '2024-04-11 13:39:18.994605', 'admin0203', NULL, NULL, 'Chuyển trạng thái', 'Hoàn thành', 'HOAN_THANH', 3),
       (32, '2024-04-11 13:39:54.501825', 'admin0203', NULL, NULL, 'Chuyển trạng thái', 'Đang giao hàng', 'DANG_GIAO',
        3),
       (33, '2024-04-11 13:42:19.045000', 'admin0203', NULL, NULL, '', 'Chờ xác nhận', 'CHO_XAC_NHAN', 7),
       (34, '2024-04-11 13:59:54.837139', 'admin0203', NULL, NULL,
        'Cập nhật sản phẩm Áo Sơmi Oxford Tay Dài Red Script màu Đen kichCo M số lượng 3', 'Cập nhật sản phẩm', NULL, 7),
       (35, '2024-04-11 13:59:58.944734', 'admin0203', NULL, NULL,
        'Cập nhật sản phẩm Áo Sơmi Oxford Tay Dài Red Script màu Đen kichCo M số lượng 0', 'Cập nhật sản phẩm', NULL, 7),
       (36, '2024-04-11 14:14:12.095707', 'admin0203', NULL, NULL, 'Chuyển trạng thái', 'Đã xác nhận', 'DA_XAC_NHAN',
        7),
       (37, '2024-04-11 14:14:16.959189', 'admin0203', NULL, NULL, 'Chuyển trạng thái', 'Chờ giao hàng', 'CHO_GIAO', 7),
       (38, '2024-04-11 14:14:19.742633', 'admin0203', NULL, NULL, 'Chuyển trạng thái', 'Đang giao hàng', 'DANG_GIAO',
        7),
       (39, '2024-04-11 14:16:46.322819', 'admin0203', NULL, NULL, 'Chuyển trạng thái', 'Chờ xác nhận', 'CHO_XAC_NHAN',
        5),
       (40, '2024-04-11 14:16:55.052301', 'admin0203', NULL, NULL, 'Chuyển trạng thái', 'Đã xác nhận', 'DA_XAC_NHAN',
        5),
       (41, '2024-04-11 14:17:38.514308', 'admin0203', NULL, NULL, 'Chuyển trạng thái', 'Hủy', 'HUY', 5),
       (42, '2024-04-11 14:30:04.494500', 'admin0203', NULL, NULL, 'Chuyển trạng thái', 'Chờ giao hàng', 'CHO_GIAO', 3),
       (43, '2024-04-11 14:35:41.448107', 'admin0203', NULL, NULL,
        'Cập nhật sản phẩm Áo Sơmi Cuban Glamorous Embroidery Logo màu Xanh dương kichCo XL số lượng 3',
        'Cập nhật sản phẩm', NULL, 3),
       (44, '2024-04-11 14:58:25.063578', 'admin0203', NULL, NULL,
        'Cập nhật sản phẩm Áo Sơmi Cuban Glamorous Embroidery Logo màu Xanh dương kichCo M số lượng 8',
        'Cập nhật sản phẩm', NULL, 3),
       (45, '2024-04-11 14:59:21.108934', 'admin0203', NULL, NULL,
        'Cập nhật sản phẩm Áo Sơmi Cuban Glamorous Embroidery Logo màu Xanh dương kichCo M số lượng 5',
        'Cập nhật sản phẩm', NULL, 3),
       (46, '2024-04-11 14:59:22.326756', 'admin0203', NULL, NULL,
        'Cập nhật sản phẩm Áo Sơmi Cuban Glamorous Embroidery Logo màu Xanh dương kichCo M số lượng 4',
        'Cập nhật sản phẩm', NULL, 3),
       (47, '2024-04-11 14:59:25.917065', 'admin0203', NULL, NULL,
        'Cập nhật sản phẩm Áo Sơmi Cuban Glamorous Embroidery Logo màu Xanh dương kichCo M số lượng -3',
        'Cập nhật sản phẩm', NULL, 3),
       (48, '2024-04-11 14:59:43.577511', 'admin0203', NULL, NULL,
        'Cập nhật sản phẩm Áo Sơmi Cuban Glamorous Embroidery Logo màu Xanh dương kichCo M số lượng 3',
        'Cập nhật sản phẩm', NULL, 3),
       (49, '2024-04-11 14:59:48.130329', 'admin0203', NULL, NULL,
        'Cập nhật sản phẩm Áo Sơmi Cuban Glamorous Embroidery Logo màu Xanh dương kichCo M số lượng 4',
        'Cập nhật sản phẩm', NULL, 3),
       (50, '2024-04-11 14:59:53.364716', 'admin0203', NULL, NULL,
        'Cập nhật sản phẩm Áo Sơmi Cuban Glamorous Embroidery Logo màu Xanh dương kichCo M số lượng 1',
        'Cập nhật sản phẩm', NULL, 3),
       (51, '2024-04-11 14:59:54.906944', 'admin0203', NULL, NULL,
        'Cập nhật sản phẩm Áo Sơmi Cuban Glamorous Embroidery Logo màu Xanh dương kichCo M số lượng 0',
        'Cập nhật sản phẩm', NULL, 3),
       (52, '2024-04-11 15:01:49.798024', 'admin0203', NULL, NULL,
        'Cập nhật sản phẩm Áo Sơmi Oxford Tay Dài Red Script màu Trắng kichCo L số lượng 3', 'Cập nhật sản phẩm', NULL,
        3),
       (53, '2024-04-11 15:01:52.440631', 'admin0203', NULL, NULL,
        'Cập nhật sản phẩm Áo Sơmi Oxford Tay Dài Red Script màu Trắng kichCo L số lượng 0', 'Cập nhật sản phẩm', NULL,
        3),
       (54, '2024-04-11 15:01:56.559060', 'admin0203', NULL, NULL,
        'Cập nhật sản phẩm Áo Sơmi Oxford Tay Dài Red Script màu Đen kichCo S số lượng 3', 'Cập nhật sản phẩm', NULL, 3),
       (55, '2024-04-11 15:01:59.806350', 'admin0203', NULL, NULL,
        'Cập nhật sản phẩm Áo Sơmi Oxford Tay Dài Red Script màu Đen kichCo S số lượng 0', 'Cập nhật sản phẩm', NULL, 3),
       (56, '2024-04-11 15:03:03.904541', 'admin0203', NULL, NULL,
        'Cập nhật sản phẩm Áo Sơmi Cuban Glamorous Embroidery Logo màu Xanh dương kichCo M số lượng 3',
        'Cập nhật sản phẩm', NULL, 3),
       (57, '2024-04-11 15:03:08.391724', 'admin0203', NULL, NULL,
        'Cập nhật sản phẩm Áo Sơmi Cuban Glamorous Embroidery Logo màu Xanh dương kichCo M số lượng 4',
        'Cập nhật sản phẩm', NULL, 3),
       (58, '2024-04-11 15:24:07.462024', 'admin0203', NULL, NULL,
        'Thêm 1 sản phẩm Áo Sơmi Cuban Glamorous Embroidery Logo màu Xanh dương ,kichCo M', 'Thêm sản phẩm', NULL, 3),
       (59, '2024-04-11 15:24:51.616073', 'admin0203', NULL, NULL,
        'Cập nhật sản phẩm Áo Sơmi Cuban Glamorous Embroidery Logo màu Xanh dương kichCo M số lượng 3',
        'Cập nhật sản phẩm', NULL, 3),
       (60, '2024-04-11 15:33:54.920171', 'admin0203', NULL, NULL,
        'Cập nhật sản phẩm Áo Sơmi Oxford Tay Dài Red Script màu Đen kichCo M số lượng 3', 'Cập nhật sản phẩm', NULL, 3),
       (61, '2024-04-11 15:34:04.232210', 'admin0203', NULL, NULL,
        'Cập nhật sản phẩm Áo Sơmi Oxford Tay Dài Red Script màu Đen kichCo M số lượng 4', 'Cập nhật sản phẩm', NULL, 3),
       (62, '2024-04-11 15:36:20.624146', 'admin0203', NULL, NULL,
        'Cập nhật sản phẩm Áo Sơmi Oxford Tay Dài Red Script màu Đen kichCo M số lượng 1', 'Cập nhật sản phẩm', NULL, 3),
       (63, '2024-04-11 15:45:46.290552', 'admin0203', NULL, NULL,
        'Cập nhật sản phẩm Áo Sơmi Oxford Tay Dài Red Script màu Đen kichCo M số lượng 4', 'Cập nhật sản phẩm', NULL, 3),
       (64, '2024-04-11 15:45:49.632720', 'admin0203', NULL, NULL,
        'Cập nhật sản phẩm Áo Sơmi Oxford Tay Dài Red Script màu Đen kichCo M số lượng 5', 'Cập nhật sản phẩm', NULL, 3),
       (65, '2024-04-11 15:45:51.044021', 'admin0203', NULL, NULL,
        'Cập nhật sản phẩm Áo Sơmi Oxford Tay Dài Red Script màu Đen kichCo M số lượng 6', 'Cập nhật sản phẩm', NULL, 3),
       (66, '2024-04-11 15:45:53.753566', 'admin0203', NULL, NULL,
        'Cập nhật sản phẩm Áo Sơmi Oxford Tay Dài Red Script màu Đen kichCo M số lượng 3', 'Cập nhật sản phẩm', NULL, 3),
       (67, '2024-04-11 15:45:55.975885', 'admin0203', NULL, NULL,
        'Cập nhật sản phẩm Áo Sơmi Oxford Tay Dài Red Script màu Đen kichCo M số lượng 6', 'Cập nhật sản phẩm', NULL, 3),
       (68, '2024-04-11 15:46:16.735250', 'admin0203', NULL, NULL,
        'Cập nhật sản phẩm Áo Sơmi Oxford Tay Dài Red Script màu Đen kichCo M số lượng 7', 'Cập nhật sản phẩm', NULL, 3),
       (69, '2024-04-11 15:46:18.968881', 'admin0203', NULL, NULL,
        'Cập nhật sản phẩm Áo Sơmi Oxford Tay Dài Red Script màu Đen kichCo M số lượng 4', 'Cập nhật sản phẩm', NULL, 3),
       (70, '2024-04-11 15:46:19.702970', 'admin0203', NULL, NULL,
        'Cập nhật sản phẩm Áo Sơmi Oxford Tay Dài Red Script màu Đen kichCo M số lượng 3', 'Cập nhật sản phẩm', NULL, 3),
       (71, '2024-04-11 15:46:22.059984', 'admin0203', NULL, NULL,
        'Cập nhật sản phẩm Áo Sơmi Oxford Tay Dài Red Script màu Đen kichCo M số lượng 6', 'Cập nhật sản phẩm', NULL, 3),
       (72, '2024-04-11 15:46:23.145891', 'admin0203', NULL, NULL,
        'Cập nhật sản phẩm Áo Sơmi Oxford Tay Dài Red Script màu Đen kichCo M số lượng 3', 'Cập nhật sản phẩm', NULL, 3),
       (73, '2024-04-11 15:52:34.467559', 'admin0203', NULL, NULL,
        'Cập nhật sản phẩm Áo Sơmi Oxford Tay Dài Red Script màu Đen kichCo M số lượng 6', 'Cập nhật sản phẩm', NULL, 3),
       (74, '2024-04-11 15:52:37.881630', 'admin0203', NULL, NULL,
        'Cập nhật sản phẩm Áo Sơmi Oxford Tay Dài Red Script màu Đen kichCo M số lượng 3', 'Cập nhật sản phẩm', NULL, 3),
       (75, '2024-04-11 15:53:32.047336', 'admin0203', NULL, NULL,
        'Cập nhật sản phẩm Áo Sơmi Oxford Tay Dài Red Script màu Đen kichCo M số lượng 2', 'Cập nhật sản phẩm', NULL, 3),
       (76, '2024-04-11 15:53:38.460769', 'admin0203', NULL, NULL,
        'Cập nhật sản phẩm Áo Sơmi Oxford Tay Dài Red Script màu Đen kichCo M số lượng 5', 'Cập nhật sản phẩm', NULL, 3),
       (77, '2024-04-11 15:53:42.332143', 'admin0203', NULL, NULL,
        'Cập nhật sản phẩm Áo Sơmi Oxford Tay Dài Red Script màu Đen kichCo M số lượng 6', 'Cập nhật sản phẩm', NULL, 3),
       (78, '2024-04-11 15:54:03.052988', 'admin0203', NULL, NULL, 'Chuyển trạng thái', 'Đang giao hàng', 'DANG_GIAO',
        3),
       (79, '2024-04-11 15:55:57.889733', 'admin0203', NULL, NULL, 'Xóa thanh toán với số tiền : 12.096.201',
        'Xóa thanh toán', NULL, 3),
       (80, '2024-04-11 15:56:01.607231', 'admin0203', NULL, NULL, 'Tạo thanh toán với số tiền : 2.336.201',
        'Tạo thanh toán', NULL, 3),
       (81, '2024-04-11 15:56:36.540072', 'admin0203', NULL, NULL, 'Chuyển trạng thái', 'Hoàn thành', 'HOAN_THANH', 3),
       (82, '2024-04-11 16:09:47.957187', 'admin0203', NULL, NULL, '', 'Chờ xác nhận', 'CHO_XAC_NHAN', 8),
       (83, '2024-04-11 16:58:34.346531', 'admin0203', NULL, NULL, '', 'Chờ xác nhận', 'CHO_XAC_NHAN', 9),
       (84, '2024-04-11 17:03:49.399739', 'admin0203', NULL, NULL, '', 'Chờ xác nhận', 'CHO_XAC_NHAN', 10),
       (85, '2024-04-11 21:18:28.742055', 'admin0203', NULL, NULL, '', 'Chờ xác nhận', 'CHO_XAC_NHAN', 11),
       (86, '2024-04-12 21:55:49.685109', 'admin0203', NULL, NULL, '', 'Chờ xác nhận', 'CHO_XAC_NHAN', 16),
       (87, '2024-04-14 18:36:26.739054', 'admin0203', NULL, NULL, '', 'Hoàn thành', 'HOAN_THANH', 17),
       (88, '2024-04-14 18:39:00.172121', 'admin0203', NULL, NULL, '', 'Chờ xác nhận', 'CHO_XAC_NHAN', 18),
       (89, '2024-04-14 18:39:18.805193', 'admin0203', NULL, NULL, 'Chuyển trạng thái', 'Đã xác nhận', 'DA_XAC_NHAN',
        18),
       (90, '2024-04-14 18:40:15.428041', 'admin0203', NULL, NULL, 'Thêm 1 sản phẩm Áo sơ mi Demo màu Đen kichCo Đen',
        'Cập nhật sản phẩm', NULL, 18),
       (92, '2024-04-14 18:40:32.051190', 'admin0203', NULL, NULL, 'Chuyển trạng thái', 'Chờ giao hàng', 'CHO_GIAO',
        18),
       (93, '2024-04-14 18:40:35.437374', 'admin0203', NULL, NULL, 'Chuyển trạng thái', 'Đang giao hàng', 'DANG_GIAO',
        18),
       (94, '2024-04-14 18:40:54.883380', 'admin0203', NULL, NULL, 'Tạo thanh toán với số tiền : 2.424.200',
        'Tạo thanh toán', NULL, 18),
       (95, '2024-04-14 18:41:03.009974', 'admin0203', NULL, NULL, 'Chuyển trạng thái', 'Hoàn thành', 'HOAN_THANH', 18),
       (96, '2024-04-14 18:41:16.760482', 'admin0203', NULL, NULL, 'Chuyển trạng thái', 'Đang giao hàng', 'DANG_GIAO',
        18),
       (97, '2024-04-14 18:41:38.686648', 'admin0203', NULL, NULL, 'Chuyển trạng thái', 'Hoàn thành', 'HOAN_THANH', 18),
       (98, '2024-04-14 18:43:02.933750', 'admin0203', NULL, NULL, 'Sản phẩm không đúng như mô tả', 'Trả hàng',
        'TRA_HANG', 17),
       (99, '2024-04-14 19:07:10.905951', 'admin0203', NULL, NULL, 'Chuyển trạng thái', 'Đang giao hàng', 'DANG_GIAO',
        18),
       (100, '2024-04-14 19:07:12.795054', 'admin0203', NULL, NULL, 'Chuyển trạng thái', 'Chờ giao hàng', 'CHO_GIAO',
        18),
       (106, '2024-04-14 19:17:29.347797', 'admin0203', NULL, NULL,
        'Cập nhật sản phẩm Áo sơ mi Demo màu Đen kichCo S số lượng 10', 'Cập nhật sản phẩm', NULL, 18),
       (107, '2024-04-14 19:17:31.234007', 'admin0203', NULL, NULL,
        'Cập nhật sản phẩm Áo sơ mi Demo màu Đen kichCo S số lượng 8', 'Cập nhật sản phẩm', NULL, 18),
       (108, '2024-04-14 19:17:32.242999', 'admin0203', NULL, NULL,
        'Cập nhật sản phẩm Áo sơ mi Demo màu Đen kichCo S số lượng 9', 'Cập nhật sản phẩm', NULL, 18),
       (109, '2024-04-14 19:17:40.973360', 'admin0203', NULL, NULL,
        'Cập nhật sản phẩm Áo sơ mi Demo màu Đen kichCo S số lượng 50', 'Cập nhật sản phẩm', NULL, 18),
       (110, '2024-04-14 21:13:46.412524', 'admin0203', NULL, NULL,
        'Cập nhật sản phẩm Áo sơ mi Demo màu Đen kichCo S số lượng -19', 'Cập nhật sản phẩm', NULL, 18),
       (111, '2024-04-14 21:15:36.395180', 'admin0203', NULL, NULL,
        'Cập nhật sản phẩm Áo sơ mi Demo màu Đen kichCo S số lượng -3', 'Cập nhật sản phẩm', NULL, 18),
       (112, '2024-04-14 21:17:57.369172', 'admin0203', NULL, NULL,
        'Cập nhật sản phẩm Áo sơ mi Demo màu Đen kichCo S số lượng 9', 'Cập nhật sản phẩm', NULL, 18),
       (113, '2024-04-14 21:18:18.656353', 'admin0203', NULL, NULL,
        'Cập nhật sản phẩm Áo sơ mi Demo màu Đen kichCo S số lượng 1', 'Cập nhật sản phẩm', NULL, 18),
       (114, '2024-04-14 21:18:32.147624', 'admin0203', NULL, NULL,
        'Cập nhật sản phẩm Áo sơ mi Demo màu Đen kichCo S số lượng 2', 'Cập nhật sản phẩm', NULL, 18),
       (115, '2024-04-14 21:18:40.835533', 'admin0203', NULL, NULL,
        'Cập nhật sản phẩm Áo sơ mi Demo màu Đen kichCo S số lượng 1', 'Cập nhật sản phẩm', NULL, 18),
       (116, '2024-04-14 21:20:24.117748', 'admin0203', NULL, NULL,
        'Cập nhật sản phẩm Áo sơ mi Demo màu Đen kichCo S số lượng 28', 'Cập nhật sản phẩm', NULL, 18),
       (117, '2024-04-14 21:20:47.274877', 'admin0203', NULL, NULL,
        'Cập nhật sản phẩm Áo sơ mi Demo màu Đen kichCo S số lượng 29', 'Cập nhật sản phẩm', NULL, 18),
       (118, '2024-04-14 21:21:14.437173', 'admin0203', NULL, NULL, 'Tạo thanh toán với số tiền : 32.400.000',
        'Tạo thanh toán', NULL, 18);
/*!40000 ALTER TABLE `lich_su_hoa_don` ENABLE KEYS */;
UNLOCK
TABLES;

--
-- Table structure for table `mau_sac`
--

DROP TABLE IF EXISTS `mau_sac`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mau_sac`
(
    `id`              int    NOT NULL AUTO_INCREMENT,
    `created_at`      datetime(6) DEFAULT NULL,
    `created_by`      varchar(255) DEFAULT NULL,
    `last_updated_by` varchar(255) DEFAULT NULL,
    `updated_at`      datetime(6) DEFAULT NULL,
    `ma`              varchar(255) DEFAULT NULL,
    `ten`             varchar(255) DEFAULT NULL,
    `trang_thai`      bit(1) NOT NULL,
    `image_id`        int          DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `UK_q7pi6vpa0r7k8d4511krmkmkr` (`image_id`),
    CONSTRAINT `FKs2yox2vbl1l9adiu6mup5luo4` FOREIGN KEY (`image_id`) REFERENCES `mau_sac_image` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mau_sac`
--

LOCK
TABLES `mau_sac` WRITE;
/*!40000 ALTER TABLE `mau_sac` DISABLE KEYS */;
INSERT INTO `mau_sac`
VALUES (1, '2024-04-10 09:43:37.317226', 'admin0203', NULL, NULL, 'MS01', 'Xanh lá', _binary '', 1),
       (2, '2024-04-10 09:43:59.916243', 'admin0203', NULL, NULL, 'MS02', 'Xanh dương', _binary '', 2),
       (3, '2024-04-10 09:44:24.404913', 'admin0203', 'admin0203', '2024-04-15 21:35:34.376992', 'TRANG', 'Trắng',
        _binary '', 3),
       (4, '2024-04-10 09:46:13.566369', 'admin0203', NULL, NULL, 'DEN', 'Đen', _binary '', 4),
       (5, '2024-04-10 21:50:25.462212', 'admin0203', 'admin0203', '2024-04-15 21:35:26.669003', 'HOATIET', 'Họa tiết',
        _binary '\0', 5),
       (6, '2024-04-10 21:52:09.432709', 'admin0203', 'admin0203', '2024-04-15 21:35:17.459296', 'VANG', 'Vàng',
        _binary '', 6),
       (7, '2024-04-15 21:35:01.185281', 'admin0203', NULL, NULL, 'BE', 'Be', _binary '', 7);
/*!40000 ALTER TABLE `mau_sac` ENABLE KEYS */;
UNLOCK
TABLES;

--
-- Table structure for table `mau_sac_image`
--

DROP TABLE IF EXISTS `mau_sac_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mau_sac_image`
(
    `id`         int NOT NULL AUTO_INCREMENT,
    `image_id`   varchar(255) DEFAULT NULL,
    `image_name` varchar(255) DEFAULT NULL,
    `image_url`  varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mau_sac_image`
--

LOCK
TABLES `mau_sac_image` WRITE;
/*!40000 ALTER TABLE `mau_sac_image` DISABLE KEYS */;
INSERT INTO `mau_sac_image`
VALUES (1, 'kh4awu7hsu57mpc8i3ds', 'mau-xanh-la',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1712717015/kh4awu7hsu57mpc8i3ds.jpg'),
       (2, 'qjqfv1zzmziiquol44d8', 'mau-xanh-duong',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1712717037/qjqfv1zzmziiquol44d8.jpg'),
       (3, 'gytqqed8kzhwtmo9unm1', 'trang',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1712717062/gytqqed8kzhwtmo9unm1.jpg'),
       (4, 'v7dngrmguh53dxaqq3ba', 'mau-den-01',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1712717171/v7dngrmguh53dxaqq3ba.jpg'),
       (5, 'uxqjgfl7xnd3hdkuicmi', 'hoa_tiet',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1712760622/uxqjgfl7xnd3hdkuicmi.png'),
       (6, 'luqhwfw6tyikprds3hp0', 'mau_vang',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1712760726/luqhwfw6tyikprds3hp0.jpg'),
       (7, 'wtohnq73af4so3fzcq6e', 'mau-be',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1713191700/wtohnq73af4so3fzcq6e.jpg');
/*!40000 ALTER TABLE `mau_sac_image` ENABLE KEYS */;
UNLOCK
TABLES;

--
-- Table structure for table `nhan_vien`
--

DROP TABLE IF EXISTS `nhan_vien`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nhan_vien`
(
    `id`              int    NOT NULL AUTO_INCREMENT,
    `created_at`      datetime(6) DEFAULT NULL,
    `created_by`      varchar(255) DEFAULT NULL,
    `last_updated_by` varchar(255) DEFAULT NULL,
    `updated_at`      datetime(6) DEFAULT NULL,
    `cccd`            varchar(255) DEFAULT NULL,
    `dia_chi`         varchar(255) DEFAULT NULL,
    `email`           varchar(255) DEFAULT NULL,
    `gioi_tinh`       bit(1) NOT NULL,
    `ho_ten`          varchar(255) DEFAULT NULL,
    `ngay_sinh`       date         DEFAULT NULL,
    `sdt`             varchar(255) DEFAULT NULL,
    `account_id`      int          DEFAULT NULL,
    `image_id`        int          DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `UK_5n9lbijsdl4qn33dqr58cf1cb` (`account_id`),
    UNIQUE KEY `UK_hhryg8kem0rr57xn1g8wpjyf4` (`image_id`),
    CONSTRAINT `FK1maplfo9nidxe7d7oud3707su` FOREIGN KEY (`image_id`) REFERENCES `khach_hang_image` (`id`),
    CONSTRAINT `FK32eawtyqqx6sdv28q9df6qyqd` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nhan_vien`
--

LOCK
TABLES `nhan_vien` WRITE;
/*!40000 ALTER TABLE `nhan_vien` DISABLE KEYS */;
INSERT INTO `nhan_vien`
VALUES (1, '2024-04-10 09:32:37.108145', 'admin0203', NULL, NULL, '001203030303', 'Hà Đông - Hà Nội',
        'nhanvien01@gmail.com', _binary '', 'Trần Trung Quân', '2024-04-09', '0987654321', 2, 1),
       (2, '2024-04-10 21:34:11.777511', 'admin0203', NULL, NULL, '001207070707', 'Chương Mỹ, Hà Nội',
        'hungdvph29421@fpt.edu.vn', _binary '', 'Nguyễn Anh Tú', '2024-04-09', '0963277999', 4, 3),
       (3, NULL, NULL, NULL, NULL, NULL, 'Người Miền Núi', 'langcoc@gmail.com', _binary '', 'Nguyễn Lăng Cọc',
        '2002-02-02', '0123456789', 5, NULL);
/*!40000 ALTER TABLE `nhan_vien` ENABLE KEYS */;
UNLOCK
TABLES;

--
-- Table structure for table `phieu_giam_gia`
--

DROP TABLE IF EXISTS `phieu_giam_gia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `phieu_giam_gia`
(
    `id`                 int NOT NULL AUTO_INCREMENT,
    `created_at`         datetime(6) DEFAULT NULL,
    `created_by`         varchar(255)   DEFAULT NULL,
    `last_updated_by`    varchar(255)   DEFAULT NULL,
    `updated_at`         datetime(6) DEFAULT NULL,
    `dieu_kien_giam`     decimal(38, 2) DEFAULT NULL,
    `gia_tri`            decimal(38, 2) DEFAULT NULL,
    `gia_tri_max`        decimal(38, 2) DEFAULT NULL,
    `kieu`               int            DEFAULT NULL,
    `loai`               int            DEFAULT NULL,
    `ma_phieu_giam_gia`  varchar(255)   DEFAULT NULL,
    `so_luong`           int NOT NULL,
    `ten_phieu_giam_gia` varchar(255)   DEFAULT NULL,
    `thoi_gian_bat_dau`  datetime(6) DEFAULT NULL,
    `thoi_gian_ket_thuc` datetime(6) DEFAULT NULL,
    `trang_thai`         varchar(255)   DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phieu_giam_gia`
--

LOCK
TABLES `phieu_giam_gia` WRITE;
/*!40000 ALTER TABLE `phieu_giam_gia` DISABLE KEYS */;
INSERT INTO `phieu_giam_gia`
VALUES (1, '2024-04-10 22:02:07.015526', 'admin0203', 'admin0203', '2024-04-11 14:17:38.519308', 1000000.00, 5.00,
        50000.00, 0, 1, 'DP15R2', 19, '8683', '2024-04-10 22:01:00.000000', '2024-04-11 22:01:00.000000', NULL),
       (2, '2024-04-11 15:35:43.201780', 'admin0203', NULL, NULL, 1000000.00, 10.00, 100000.00, 0, 1, 'A8590Y', 10,
        'df', '2024-04-11 15:35:00.000000', '2024-04-11 17:35:00.000000', NULL),
       (3, '2024-04-11 15:44:41.186737', 'admin0203', 'admin0203', '2024-04-14 18:34:53.852092', 1000000.00, 10.00,
        200000.00, 0, 1, 'N1E795', 9, 'pgg', '2024-04-11 15:44:00.000000', '2024-04-11 17:44:00.000000', 'Đã kết thúc'),
       (4, '2024-04-11 15:45:34.310085', 'admin0203', 'admin0203', '2024-04-14 18:34:53.852092', 3000000.00, 11.00,
        400000.00, 0, 1, '0PH4YF', 9, 'sdfg', '2024-04-11 15:45:00.000000', '2024-04-11 17:45:00.000000',
        'Đã kết thúc'),
       (5, '2024-04-15 21:08:28.190361', 'admin0203', 'admin0203', '2024-04-15 21:29:05.133457', 5000000.00, 22.00,
        2222222.00, 0, 0, '1UHTT4', 1, 'sdfgh', '2024-04-15 21:08:00.000000', '2024-04-15 21:14:00.000000',
        'Đã kết thúc'),
       (6, '2024-04-15 22:49:57.946581', 'admin0203', NULL, NULL, 50000.00, 10.00, 50000.00, 0, 1, 'SUMMER2024', 30,
        'Summer 2024', '2024-04-15 22:49:00.000000', '2024-05-06 22:49:00.000000', 'Đang diễn ra'),
       (7, '2024-04-15 22:52:11.037110', 'admin0203', NULL, NULL, 1500000.00, 15.00, 1000000.00, 0, 1, 'QUOCTELAODONG',
        50, 'Mừng quốc tế lao động', '2024-04-15 22:51:00.000000', '2024-05-11 22:52:00.000000', 'Đang diễn ra');
/*!40000 ALTER TABLE `phieu_giam_gia` ENABLE KEYS */;
UNLOCK
TABLES;

--
-- Table structure for table `phieu_giam_gia_kh`
--

DROP TABLE IF EXISTS `phieu_giam_gia_kh`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `phieu_giam_gia_kh`
(
    `id`                int    NOT NULL AUTO_INCREMENT,
    `is_used`           bit(1) NOT NULL,
    `khach_hang_id`     int DEFAULT NULL,
    `phieu_giam_gia_id` int DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY                 `FKe2f6kd9jdsa3bb47g9p6dr9jh` (`khach_hang_id`),
    KEY                 `FKm0wxpf9di0mh1qjsgls0sbqvl` (`phieu_giam_gia_id`),
    CONSTRAINT `FKe2f6kd9jdsa3bb47g9p6dr9jh` FOREIGN KEY (`khach_hang_id`) REFERENCES `khach_hang` (`id`),
    CONSTRAINT `FKm0wxpf9di0mh1qjsgls0sbqvl` FOREIGN KEY (`phieu_giam_gia_id`) REFERENCES `phieu_giam_gia` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phieu_giam_gia_kh`
--

LOCK
TABLES `phieu_giam_gia_kh` WRITE;
/*!40000 ALTER TABLE `phieu_giam_gia_kh` DISABLE KEYS */;
INSERT INTO `phieu_giam_gia_kh`
VALUES (1, _binary '\0', 1, 5);
/*!40000 ALTER TABLE `phieu_giam_gia_kh` ENABLE KEYS */;
UNLOCK
TABLES;

--
-- Table structure for table `san_pham`
--

DROP TABLE IF EXISTS `san_pham`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `san_pham`
(
    `id`              int    NOT NULL AUTO_INCREMENT,
    `created_at`      datetime(6) DEFAULT NULL,
    `created_by`      varchar(255) DEFAULT NULL,
    `last_updated_by` varchar(255) DEFAULT NULL,
    `updated_at`      datetime(6) DEFAULT NULL,
    `ma`              varchar(255) DEFAULT NULL,
    `mo_ta`           varchar(255) DEFAULT NULL,
    `ten`             varchar(255) DEFAULT NULL,
    `trang_thai`      bit(1) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `san_pham`
--

LOCK
TABLES `san_pham` WRITE;
/*!40000 ALTER TABLE `san_pham` DISABLE KEYS */;
INSERT INTO `san_pham`
VALUES (1, '2024-04-10 09:41:13.630415', 'admin0203', NULL, NULL, 'SP001', 'm&#7851;u m&#7899;i',
        'Áo Sơmi Cuban Glamorous Embroidery Logo', _binary ''),
       (2, '2024-04-10 09:41:50.796549', 'admin0203', NULL, NULL, 'SP002', 'ad', 'Áo Sơmi Oxford Tay Dài Red Script',
        _binary ''),
       (3, '2024-04-10 21:45:49.576570', 'admin0203', 'admin0203', '2024-04-14 18:29:49.668205', 'SP000', 'hi',
        'Áo Sơmi Cuban Chrysanthenum Pattern', _binary '\0'),
       (4, '2024-04-14 18:30:28.940506', 'admin0203', 'admin0203', '2024-04-15 22:55:04.697510', 'DEMO1',
        'M&#244; t&#7843;', 'Áo sơ mi Yo Yo', _binary '');
/*!40000 ALTER TABLE `san_pham` ENABLE KEYS */;
UNLOCK
TABLES;

--
-- Table structure for table `san_pham_chi_tiet`
--

DROP TABLE IF EXISTS `san_pham_chi_tiet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `san_pham_chi_tiet`
(
    `id`              int    NOT NULL AUTO_INCREMENT,
    `created_at`      datetime(6) DEFAULT NULL,
    `created_by`      varchar(255)   DEFAULT NULL,
    `last_updated_by` varchar(255)   DEFAULT NULL,
    `updated_at`      datetime(6) DEFAULT NULL,
    `gia_ban`         decimal(38, 2) DEFAULT NULL,
    `gia_nhap`        decimal(38, 2) DEFAULT NULL,
    `so_luong_ton`    int    NOT NULL,
    `trang_thai`      bit(1) NOT NULL,
    `chat_lieu_id`    int            DEFAULT NULL,
    `co_ao_id`        int            DEFAULT NULL,
    `kich_co_id`      int            DEFAULT NULL,
    `kieu_dang_id`    int            DEFAULT NULL,
    `mau_sac_id`      int            DEFAULT NULL,
    `san_pham_id`     int            DEFAULT NULL,
    `tay_ao_id`       int            DEFAULT NULL,
    `thiet_ke_id`     int            DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY               `FKdt0k3gay0pwsfl5392tivmn6b` (`chat_lieu_id`),
    KEY               `FK6lc1iawydl6olme4p5eowk1w3` (`co_ao_id`),
    KEY               `FKnksu2p5k20le5lqjm55qbtkdi` (`kich_co_id`),
    KEY               `FK2hhnx38dqgvlaja0f2b69ct1n` (`kieu_dang_id`),
    KEY               `FK69otryack9hyggsfl8oonges0` (`mau_sac_id`),
    KEY               `FK1h21xucteeu2y93ybdvk4i8bw` (`san_pham_id`),
    KEY               `FK5vejc3ffrnoy0k7ox1193kpcv` (`tay_ao_id`),
    KEY               `FKe8bsk8tykrry0233yd2vp9q82` (`thiet_ke_id`),
    CONSTRAINT `FK1h21xucteeu2y93ybdvk4i8bw` FOREIGN KEY (`san_pham_id`) REFERENCES `san_pham` (`id`),
    CONSTRAINT `FK2hhnx38dqgvlaja0f2b69ct1n` FOREIGN KEY (`kieu_dang_id`) REFERENCES `kieu_dang` (`id`),
    CONSTRAINT `FK5vejc3ffrnoy0k7ox1193kpcv` FOREIGN KEY (`tay_ao_id`) REFERENCES `tay_ao` (`id`),
    CONSTRAINT `FK69otryack9hyggsfl8oonges0` FOREIGN KEY (`mau_sac_id`) REFERENCES `mau_sac` (`id`),
    CONSTRAINT `FK6lc1iawydl6olme4p5eowk1w3` FOREIGN KEY (`co_ao_id`) REFERENCES `co_ao` (`id`),
    CONSTRAINT `FKdt0k3gay0pwsfl5392tivmn6b` FOREIGN KEY (`chat_lieu_id`) REFERENCES `chat_lieu` (`id`),
    CONSTRAINT `FKe8bsk8tykrry0233yd2vp9q82` FOREIGN KEY (`thiet_ke_id`) REFERENCES `kieu_thiet_ke` (`id`),
    CONSTRAINT `FKnksu2p5k20le5lqjm55qbtkdi` FOREIGN KEY (`kich_co_id`) REFERENCES `kich_co` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `san_pham_chi_tiet`
--

LOCK
TABLES `san_pham_chi_tiet` WRITE;
/*!40000 ALTER TABLE `san_pham_chi_tiet` DISABLE KEYS */;
INSERT INTO `san_pham_chi_tiet`
VALUES (17, '2024-04-10 21:39:22.484586', 'admin0203', 'admin0203', '2024-04-12 21:55:49.694486', 600000.00, 300000.00,
        14, _binary '', 1, 3, 2, 1, 4, 2, 2, 2),
       (18, '2024-04-10 21:39:22.488588', 'admin0203', 'admin0203', '2024-04-12 09:28:01.374800', 800000.00, 300000.00,
        30, _binary '', 1, 3, 3, 1, 4, 2, 2, 2),
       (19, '2024-04-10 21:39:22.490591', 'admin0203', 'admin0203', '2024-04-11 15:23:43.708112', 600000.00, 300000.00,
        30, _binary '', 1, 3, 1, 1, 4, 2, 2, 2),
       (20, '2024-04-10 21:39:22.494597', 'admin0203', NULL, NULL, 750000.00, 500000.00, 30, _binary '', 1, 3, 2, 1, 3,
        2, 2, 2),
       (21, '2024-04-10 21:39:22.497571', 'admin0203', 'admin0203', '2024-04-11 15:07:53.688459', 750000.00, 500000.00,
        30, _binary '', 1, 3, 3, 1, 3, 2, 2, 2),
       (22, '2024-04-10 21:39:22.499572', 'admin0203', 'admin0203', '2024-04-11 15:06:59.041990', 750000.00, 500000.00,
        34, _binary '', 1, 3, 1, 1, 3, 2, 2, 2),
       (23, '2024-04-10 21:44:59.240437', 'admin0203', 'admin0203', '2024-04-11 15:25:19.203317', 1350000.00,
        1000000.00, 31, _binary '', 1, 4, 2, 1, 2, 1, 1, 1),
       (24, '2024-04-10 21:44:59.242438', 'admin0203', 'admin0203', '2024-04-11 14:44:19.813020', 1350000.00,
        1000000.00, 20, _binary '', 1, 4, 3, 1, 2, 1, 1, 1),
       (25, '2024-04-10 21:44:59.244437', 'admin0203', 'admin0203', '2024-04-11 14:37:36.017922', 1350000.00,
        1000000.00, 32, _binary '', 1, 4, 4, 1, 2, 1, 1, 1),
       (26, '2024-04-10 21:44:59.245442', 'admin0203', 'admin0203', '2024-04-11 17:03:49.406749', 1350000.00,
        1000000.00, 19, _binary '', 1, 4, 1, 1, 2, 1, 1, 1),
       (27, '2024-04-10 21:59:52.004771', 'admin0203', 'admin0203', '2024-04-12 09:23:11.645987', 1111111.00, 450000.00,
        15, _binary '\0', 2, 3, 2, 2, 4, 3, 3, 3),
       (28, '2024-04-10 21:59:52.007285', 'admin0203', NULL, NULL, 700000.00, 450000.00, 15, _binary '\0', 2, 3, 3, 2,
        4, 3, 3, 3),
       (29, '2024-04-10 21:59:52.009295', 'admin0203', NULL, NULL, 700000.00, 450000.00, 15, _binary '\0', 2, 3, 4, 2,
        4, 3, 3, 3),
       (30, '2024-04-10 21:59:52.327419', 'admin0203', NULL, NULL, 600000.00, 400000.00, 5, _binary '\0', 2, 3, 2, 2, 5,
        3, 3, 3),
       (31, '2024-04-10 21:59:52.328416', 'admin0203', NULL, NULL, 600000.00, 400000.00, 5, _binary '\0', 2, 3, 3, 2, 5,
        3, 3, 3),
       (32, '2024-04-10 21:59:52.330426', 'admin0203', NULL, NULL, 600000.00, 400000.00, 5, _binary '\0', 2, 3, 4, 2, 5,
        3, 3, 3),
       (33, '2024-04-10 22:00:00.216507', 'admin0203', NULL, NULL, 600000.00, 400000.00, 15, _binary '\0', 2, 3, 2, 2,
        6, 3, 3, 3),
       (34, '2024-04-10 22:00:00.218927', 'admin0203', NULL, NULL, 600000.00, 400000.00, 15, _binary '\0', 2, 3, 3, 2,
        6, 3, 3, 3),
       (35, '2024-04-10 22:00:00.219875', 'admin0203', NULL, NULL, 600000.00, 400000.00, 15, _binary '\0', 2, 3, 4, 2,
        6, 3, 3, 3),
       (36, '2024-04-14 18:33:03.200579', 'admin0203', 'admin0203', '2024-04-14 21:20:47.296889', 1500000.00,
        1000000.00, 0, _binary '', 1, 4, 1, 2, 4, 4, 2, 1),
       (37, '2024-04-14 18:33:03.208288', 'admin0203', NULL, NULL, 1500000.00, 1000000.00, 30, _binary '', 1, 4, 2, 2,
        4, 4, 2, 1),
       (38, '2024-04-14 18:33:03.619164', 'admin0203', NULL, NULL, 1500000.00, 1000000.00, 30, _binary '', 1, 4, 1, 2,
        5, 4, 2, 1),
       (39, '2024-04-14 18:33:03.622237', 'admin0203', NULL, NULL, 1500000.00, 1000000.00, 30, _binary '', 1, 4, 2, 2,
        5, 4, 2, 1),
       (40, '2024-04-14 18:33:05.347704', 'admin0203', NULL, NULL, 1500000.00, 1000000.00, 30, _binary '', 1, 4, 1, 2,
        6, 4, 2, 1),
       (41, '2024-04-14 18:33:05.350219', 'admin0203', NULL, NULL, 1500000.00, 1000000.00, 30, _binary '', 1, 4, 2, 2,
        6, 4, 2, 1);
/*!40000 ALTER TABLE `san_pham_chi_tiet` ENABLE KEYS */;
UNLOCK
TABLES;

--
-- Table structure for table `spct_hinh_anh`
--

DROP TABLE IF EXISTS `spct_hinh_anh`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `spct_hinh_anh`
(
    `id`          int NOT NULL AUTO_INCREMENT,
    `hinh_anh_id` int DEFAULT NULL,
    `spct_id`     int DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY           `FKjpcy5cb1gwr46vno4hh5fvrdj` (`hinh_anh_id`),
    KEY           `FKmuqqykftceuc9ynj2dm55l1s4` (`spct_id`),
    CONSTRAINT `FKjpcy5cb1gwr46vno4hh5fvrdj` FOREIGN KEY (`hinh_anh_id`) REFERENCES `hinh_anh` (`id`),
    CONSTRAINT `FKmuqqykftceuc9ynj2dm55l1s4` FOREIGN KEY (`spct_id`) REFERENCES `san_pham_chi_tiet` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `spct_hinh_anh`
--

LOCK
TABLES `spct_hinh_anh` WRITE;
/*!40000 ALTER TABLE `spct_hinh_anh` DISABLE KEYS */;
/*!40000 ALTER TABLE `spct_hinh_anh` ENABLE KEYS */;
UNLOCK
TABLES;

--
-- Table structure for table `spct_hinhanh`
--

DROP TABLE IF EXISTS `spct_hinhanh`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `spct_hinhanh`
(
    `spct_id`    int NOT NULL,
    `hinhanh_id` int NOT NULL,
    KEY          `FKq85ngcpbd61j63w8bejful92b` (`hinhanh_id`),
    KEY          `FKfpxrjb1rhj16rewyc8v07ntpj` (`spct_id`),
    CONSTRAINT `FKfpxrjb1rhj16rewyc8v07ntpj` FOREIGN KEY (`spct_id`) REFERENCES `san_pham_chi_tiet` (`id`),
    CONSTRAINT `FKq85ngcpbd61j63w8bejful92b` FOREIGN KEY (`hinhanh_id`) REFERENCES `hinh_anh` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `spct_hinhanh`
--

LOCK
TABLES `spct_hinhanh` WRITE;
/*!40000 ALTER TABLE `spct_hinhanh` DISABLE KEYS */;
INSERT INTO `spct_hinhanh`
VALUES (17, 19),
       (20, 20),
       (18, 19),
       (21, 20),
       (19, 19),
       (22, 20),
       (23, 21),
       (23, 22),
       (23, 23),
       (24, 21),
       (24, 22),
       (24, 23),
       (25, 21),
       (25, 22),
       (25, 23),
       (26, 21),
       (26, 22),
       (26, 23),
       (27, 24),
       (28, 24),
       (29, 24),
       (30, 25),
       (30, 26),
       (31, 25),
       (31, 26),
       (32, 25),
       (32, 26),
       (33, 27),
       (33, 28),
       (34, 27),
       (34, 28),
       (35, 27),
       (35, 28),
       (36, 29),
       (37, 29),
       (38, 30),
       (39, 30),
       (40, 31),
       (41, 31);
/*!40000 ALTER TABLE `spct_hinhanh` ENABLE KEYS */;
UNLOCK
TABLES;

--
-- Table structure for table `tay_ao`
--

DROP TABLE IF EXISTS `tay_ao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tay_ao`
(
    `id`              int    NOT NULL AUTO_INCREMENT,
    `created_at`      datetime(6) DEFAULT NULL,
    `created_by`      varchar(255) DEFAULT NULL,
    `last_updated_by` varchar(255) DEFAULT NULL,
    `updated_at`      datetime(6) DEFAULT NULL,
    `ten`             varchar(255) DEFAULT NULL,
    `trang_thai`      bit(1) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tay_ao`
--

LOCK
TABLES `tay_ao` WRITE;
/*!40000 ALTER TABLE `tay_ao` DISABLE KEYS */;
INSERT INTO `tay_ao`
VALUES (1, '2024-04-10 09:52:46.564551', 'admin0203', 'admin0203', '2024-04-10 09:53:08.663263', 'Tay dài',
        _binary ''),
       (2, '2024-04-10 09:53:15.947849', 'admin0203', NULL, NULL, 'Tay ngắn', _binary ''),
       (3, '2024-04-10 09:53:22.450811', 'admin0203', NULL, NULL, 'Tay lỡ', _binary '');
/*!40000 ALTER TABLE `tay_ao` ENABLE KEYS */;
UNLOCK
TABLES;

--
-- Table structure for table `thanh_toan`
--

DROP TABLE IF EXISTS `thanh_toan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thanh_toan`
(
    `id`              int    NOT NULL AUTO_INCREMENT,
    `created_at`      datetime(6) DEFAULT NULL,
    `created_by`      varchar(255)   DEFAULT NULL,
    `last_updated_by` varchar(255)   DEFAULT NULL,
    `updated_at`      datetime(6) DEFAULT NULL,
    `ma_giao_dich`    varchar(255)   DEFAULT NULL,
    `mo_ta`           varchar(255)   DEFAULT NULL,
    `so_tien`         decimal(38, 2) DEFAULT NULL,
    `trang_thai`      bit(1) NOT NULL,
    `id_httt`         int            DEFAULT NULL,
    `id_hoa_don`      int            DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY               `FKj9aik00pboiihg2ekgf3ceusn` (`id_httt`),
    KEY               `FK543gfw2cged82vmxbl65i7p9u` (`id_hoa_don`),
    CONSTRAINT `FK543gfw2cged82vmxbl65i7p9u` FOREIGN KEY (`id_hoa_don`) REFERENCES `hoa_don` (`id`),
    CONSTRAINT `FKj9aik00pboiihg2ekgf3ceusn` FOREIGN KEY (`id_httt`) REFERENCES `hinh_thuc_thanh_toan` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thanh_toan`
--

LOCK
TABLES `thanh_toan` WRITE;
/*!40000 ALTER TABLE `thanh_toan` DISABLE KEYS */;
INSERT INTO `thanh_toan`
VALUES (1, '2024-04-10 22:03:13.687371', 'admin0203', NULL, NULL, '', NULL, 600000.00, _binary '', 1, 1),
       (2, '2024-04-10 22:03:13.697134', 'admin0203', NULL, NULL, '', NULL, 550000.00, _binary '', 1, 1),
       (3, '2024-04-10 22:07:59.863153', 'admin0203', NULL, NULL, NULL, NULL, NULL, _binary '', 1, 2),
       (5, '2024-04-10 22:21:02.513458', 'admin0203', NULL, NULL, 'DS45DFE89W1', NULL, 1150000.00, _binary '', 2, 5),
       (6, '2024-04-10 22:32:44.264678', 'admin0203', NULL, NULL, '', NULL, 3385300.00, _binary '', 1, 4),
       (7, '2024-04-11 13:19:39.956297', 'admin0203', NULL, NULL, NULL, NULL, NULL, _binary '', 1, 6),
       (9, '2024-04-11 13:31:38.466027', 'admin0203', NULL, NULL, '', NULL, 380000.00, _binary '', 1, 3),
       (10, '2024-04-11 13:42:19.050985', 'admin0203', NULL, NULL, 'KDANF634789', NULL, 600000.00, _binary '', 2, 7),
       (11, '2024-04-11 15:56:01.613228', 'admin0203', NULL, NULL, '', NULL, 2336201.00, _binary '', 1, 3),
       (12, '2024-04-11 16:09:47.966173', 'admin0203', NULL, NULL, '', NULL, 1000000.00, _binary '', 1, 8),
       (13, '2024-04-11 17:03:49.403749', 'admin0203', NULL, NULL, '', NULL, 1240301.00, _binary '', 1, 10),
       (14, '2024-04-11 21:18:28.758061', 'admin0203', NULL, NULL, '6416546', NULL, 625301.00, _binary '', 2, 11),
       (15, '2024-04-14 18:36:26.747580', 'admin0203', NULL, NULL, '', NULL, 1500000.00, _binary '', 1, 17),
       (16, '2024-04-14 18:40:54.886383', 'admin0203', NULL, NULL, '', NULL, 2424200.00, _binary '', 1, 18),
       (17, '2024-04-14 21:21:14.443172', 'admin0203', NULL, NULL, '', NULL, 32400000.00, _binary '', 1, 18);
/*!40000 ALTER TABLE `thanh_toan` ENABLE KEYS */;
UNLOCK
TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-15 22:56:30
