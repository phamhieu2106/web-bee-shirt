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
    `id`                     int    NOT NULL AUTO_INCREMENT,
    `trang_thai`             bit(1) NOT NULL,
    `forget_pwd_verify_code` varchar(255) DEFAULT NULL,
    `mat_khau`               varchar(255) DEFAULT NULL,
    `role`                   varchar(255) DEFAULT NULL,
    `ten_dang_nhap`          varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK
TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account`
VALUES (1, _binary '', NULL, '$2a$10$k1XXblzXkl/9cSHvvSp3I.L89Pb4DiFO23nGoenaXunLs8jxDB7de', 'ROLE_ADMIN',
        'admin0203'),
       (2, _binary '', NULL, '$2a$10$fnooupHVpHgDaungAnSHWOIT.zKLjfFm85Hhlx90jlbEs/EPDmAHW', 'ROLE_CUSTOMER',
        '0345649831'),
       (3, _binary '', NULL, '$2a$10$WZy8CMj/J8qlb1Yz8Kywie0WDSxUyvSX68k3kvvzR6T.TQFS9rggu', 'ROLE_CUSTOMER',
        '0375773850'),
       (4, _binary '', NULL, '$2a$10$boEjt3LgOLrzurBYR54yWeOz7AsQxsdz6KFutZ14Y/pJihuFbbEwW', 'ROLE_CUSTOMER',
        '0333333333');
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
    `trang_thai`      bit(1) NOT NULL,
    `created_at`      datetime(6) DEFAULT NULL,
    `updated_at`      datetime(6) DEFAULT NULL,
    `created_by`      varchar(255) DEFAULT NULL,
    `last_updated_by` varchar(255) DEFAULT NULL,
    `ten`             varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_lieu`
--

LOCK
TABLES `chat_lieu` WRITE;
/*!40000 ALTER TABLE `chat_lieu` DISABLE KEYS */;
INSERT INTO `chat_lieu`
VALUES (1, _binary '', '2024-04-25 22:41:01.931233', NULL, 'admin0203', NULL, 'Denim'),
       (2, _binary '', '2024-04-25 22:41:25.104764', '2024-04-25 22:41:38.521261', 'admin0203', 'admin0203',
        'Cotton 100%'),
       (4, _binary '', '2024-04-25 22:41:59.270845', NULL, 'admin0203', NULL, 'Lanh'),
       (5, _binary '', '2024-04-25 22:42:05.572543', NULL, 'admin0203', NULL, 'Nhung tăm'),
       (6, _binary '', '2024-04-25 22:43:11.555960', NULL, 'admin0203', NULL, 'Kaki'),
       (7, _binary '', '2024-04-25 22:43:31.632801', NULL, 'admin0203', NULL, 'Voan');
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
    `trang_thai`      bit(1) NOT NULL,
    `created_at`      datetime(6) DEFAULT NULL,
    `updated_at`      datetime(6) DEFAULT NULL,
    `created_by`      varchar(255) DEFAULT NULL,
    `last_updated_by` varchar(255) DEFAULT NULL,
    `ten`             varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `co_ao`
--

LOCK
TABLES `co_ao` WRITE;
/*!40000 ALTER TABLE `co_ao` DISABLE KEYS */;
INSERT INTO `co_ao`
VALUES (1, _binary '', '2024-04-25 22:44:26.668190', '2024-04-25 22:46:33.156661', 'admin0203', 'admin0203',
        'Cổ tròn'),
       (2, _binary '', '2024-04-25 22:45:15.559470', NULL, 'admin0203', NULL, 'Cổ cao'),
       (3, _binary '\0', '2024-04-25 22:45:24.458980', '2024-04-27 15:25:09.581335', 'admin0203', 'admin0203',
        'Cổ nhọn'),
       (4, _binary '', '2024-04-25 22:46:26.583173', NULL, 'admin0203', NULL, 'Cổ xòe'),
       (5, _binary '', '2024-04-25 22:47:27.534334', '2024-04-25 22:51:51.474343', 'admin0203', 'admin0203',
        'Cổ chữ V');
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
    `khach_hang_id`   int          DEFAULT NULL,
    `created_at`      datetime(6) DEFAULT NULL,
    `updated_at`      datetime(6) DEFAULT NULL,
    `created_by`      varchar(255) DEFAULT NULL,
    `last_updated_by` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `UK_j4ki5uri6jth6sadv3c329joa` (`khach_hang_id`),
    CONSTRAINT `FK1hreicpwti9f262xnh5ssfilo` FOREIGN KEY (`khach_hang_id`) REFERENCES `khach_hang` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `danh_sach_chi_tiet`
--

LOCK
TABLES `danh_sach_chi_tiet` WRITE;
/*!40000 ALTER TABLE `danh_sach_chi_tiet` DISABLE KEYS */;
INSERT INTO `danh_sach_chi_tiet`
VALUES (1, 3, '2024-04-27 10:05:48.485728', NULL, 'admin0203', NULL);
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
    `khach_hang_id`   int          DEFAULT NULL,
    `mac_dinh`        bit(1) NOT NULL,
    `created_at`      datetime(6) DEFAULT NULL,
    `updated_at`      datetime(6) DEFAULT NULL,
    `created_by`      varchar(255) DEFAULT NULL,
    `duong`           varchar(255) DEFAULT NULL,
    `ho_ten`          varchar(255) DEFAULT NULL,
    `huyen`           varchar(255) DEFAULT NULL,
    `last_updated_by` varchar(255) DEFAULT NULL,
    `sdt`             varchar(255) DEFAULT NULL,
    `tinh`            varchar(255) DEFAULT NULL,
    `xa`              varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY               `FKbbd8bxqdl1w9vhasn86u0q9w3` (`khach_hang_id`),
    CONSTRAINT `FKbbd8bxqdl1w9vhasn86u0q9w3` FOREIGN KEY (`khach_hang_id`) REFERENCES `khach_hang` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dia_chi`
--

LOCK
TABLES `dia_chi` WRITE;
/*!40000 ALTER TABLE `dia_chi` DISABLE KEYS */;
INSERT INTO `dia_chi`
VALUES (1, 1, _binary '', '2024-04-26 21:15:52.810269', NULL, 'admin0203', 'Nhà 99', NULL, 'Huyện Chương Mỹ', NULL,
        NULL, 'Hà Nội', 'Xã Đại Yên'),
       (2, 2, _binary '', '2024-04-26 21:43:32.480373', NULL, 'admin0203', 'Ngõ 30', NULL, 'Huyện Kim Bôi', NULL, NULL,
        'Hòa Bình', 'Xã Nật Sơn'),
       (3, 3, _binary '', '2024-04-27 10:05:48.476190', NULL, 'admin0203', 'gảews', NULL, 'Huyện Sơn Hòa', NULL, NULL,
        'Phú Yên', 'Xã Sơn Nguyên');
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
    `gia_tri_phan_tram` int          DEFAULT NULL,
    `id`                int NOT NULL AUTO_INCREMENT,
    `trang_thai`        int          DEFAULT NULL,
    `created_at`        datetime(6) DEFAULT NULL,
    `updated_at`        datetime(6) DEFAULT NULL,
    `created_by`        varchar(255) DEFAULT NULL,
    `last_updated_by`   varchar(255) DEFAULT NULL,
    `ma_dot_giam_gia`   varchar(255) DEFAULT NULL,
    `ten_dot_giam_gia`  varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dot_giam_gia`
--

LOCK
TABLES `dot_giam_gia` WRITE;
/*!40000 ALTER TABLE `dot_giam_gia` DISABLE KEYS */;
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
    `dot_giam_gia_id`      int          DEFAULT NULL,
    `id`                   int NOT NULL AUTO_INCREMENT,
    `san_pham_chi_tiet_id` int          DEFAULT NULL,
    `created_at`           datetime(6) DEFAULT NULL,
    `thoi_gian_bat_dau`    datetime(6) DEFAULT NULL,
    `thoi_gian_ket_thuc`   datetime(6) DEFAULT NULL,
    `updated_at`           datetime(6) DEFAULT NULL,
    `created_by`           varchar(255) DEFAULT NULL,
    `last_updated_by`      varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY                    `FKjbtk25k8sxmitbpkof4f8auwk` (`dot_giam_gia_id`),
    KEY                    `FKjdh6kribb549mwwgej7br6so4` (`san_pham_chi_tiet_id`),
    CONSTRAINT `FKjbtk25k8sxmitbpkof4f8auwk` FOREIGN KEY (`dot_giam_gia_id`) REFERENCES `dot_giam_gia` (`id`),
    CONSTRAINT `FKjdh6kribb549mwwgej7br6so4` FOREIGN KEY (`san_pham_chi_tiet_id`) REFERENCES `san_pham_chi_tiet` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dot_giam_gia_san_pham`
--

LOCK
TABLES `dot_giam_gia_san_pham` WRITE;
/*!40000 ALTER TABLE `dot_giam_gia_san_pham` DISABLE KEYS */;
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
    `gio_hang_id` int DEFAULT NULL,
    `id`          int NOT NULL AUTO_INCREMENT,
    `so_luong`    int NOT NULL,
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
    `khach_hang_id`   int          DEFAULT NULL,
    `created_at`      datetime(6) DEFAULT NULL,
    `updated_at`      datetime(6) DEFAULT NULL,
    `created_by`      varchar(255) DEFAULT NULL,
    `last_updated_by` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `UK_l2kj7mgai2gvxdsli3yf35w2h` (`khach_hang_id`),
    CONSTRAINT `FKtfg3dplbmn3wiwy26si1daye3` FOREIGN KEY (`khach_hang_id`) REFERENCES `khach_hang` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gio_hang`
--

LOCK
TABLES `gio_hang` WRITE;
/*!40000 ALTER TABLE `gio_hang` DISABLE KEYS */;
INSERT INTO `gio_hang`
VALUES (1, 3, '2024-04-27 10:05:48.481725', NULL, 'admin0203', NULL);
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
    `gio_hang_id` int DEFAULT NULL,
    `id`          int NOT NULL AUTO_INCREMENT,
    `so_luong`    int NOT NULL,
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
    `image_id`   varchar(255) DEFAULT NULL,
    `image_name` varchar(255) DEFAULT NULL,
    `image_url`  varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hinh_anh`
--

LOCK
TABLES `hinh_anh` WRITE;
/*!40000 ALTER TABLE `hinh_anh` DISABLE KEYS */;
INSERT INTO `hinh_anh`
VALUES (1, 'nm0hewhk5bhjx9kz12oi', 'ao2',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714140299/nm0hewhk5bhjx9kz12oi.webp'),
       (2, 'rx4q4bfsvqnybrwizjzp', 'ao3',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714140299/rx4q4bfsvqnybrwizjzp.webp'),
       (3, 'wk54iq9wmeh7ga9xfwnb', 'ao1',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714140300/wk54iq9wmeh7ga9xfwnb.webp'),
       (4, 'i1bdbzu5jsn6meam96rs', 'partern1',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714190686/i1bdbzu5jsn6meam96rs.webp'),
       (5, 'szlck0t7qqmw7cjljhjr', 'partern2',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714190689/szlck0t7qqmw7cjljhjr.webp'),
       (6, 'don92gdpvzmooueel7kh', 'partern3',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714190691/don92gdpvzmooueel7kh.jpg'),
       (7, 'zz67386imkzzhsffgtuu', 'spred1',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714191158/zz67386imkzzhsffgtuu.webp'),
       (8, 'qkaz25xausvppkeusnd4', 'spred2',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714191158/qkaz25xausvppkeusnd4.webp'),
       (9, 'cj3zqw3cigr4pxfumgbo', 'spred3',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714191158/cj3zqw3cigr4pxfumgbo.webp'),
       (10, 'eqevd1ra7wiyqxvhcssz', 'ao4',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714191301/eqevd1ra7wiyqxvhcssz.webp'),
       (11, 'lhtzbjgxhpyecxchngs5', 'ao5jpg',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714191303/lhtzbjgxhpyecxchngs5.jpg'),
       (12, 'iqile7rvixyq1sfih5p6', 'ao6',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714191305/iqile7rvixyq1sfih5p6.jpg'),
       (13, 'yonwkus7jmxw22obizfs', 'craft2',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714192121/yonwkus7jmxw22obizfs.webp'),
       (14, 'allorhsehmotkpgrnf3d', 'craft3',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714192121/allorhsehmotkpgrnf3d.webp'),
       (15, 'zxcbwqtj4flloupdsdqx', 'craft1',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714192122/zxcbwqtj4flloupdsdqx.webp'),
       (16, 's6rcz1dstqmmczbltjj2', 'craft4',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714192123/s6rcz1dstqmmczbltjj2.webp'),
       (17, 'kdxwqlmexbn0er2lhshi', 'maze1',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714202981/kdxwqlmexbn0er2lhshi.jpg'),
       (18, 'zdv1e03e7ebkremqwky1', 'maze2',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714202984/zdv1e03e7ebkremqwky1.webp'),
       (19, 'nrw4gr3cfanpaald9cin', 'old1',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714203424/nrw4gr3cfanpaald9cin.jpg'),
       (20, 'cuoybgpwiamaaefevmhf', 'old2',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714203427/cuoybgpwiamaaefevmhf.jpg'),
       (21, 'kb3zqx5dqcnjgy4xuzrl', 'old3',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714203425/kb3zqx5dqcnjgy4xuzrl.webp'),
       (22, 'ohgrlj2cwoiyeiecewlv', 'old4',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714203427/ohgrlj2cwoiyeiecewlv.webp'),
       (23, 'etd9hctynvxbywqgcjgi', 'denim1',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714203717/etd9hctynvxbywqgcjgi.jpg'),
       (24, 'rn2m6vurmijillaczuag', 'denim2',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714203718/rn2m6vurmijillaczuag.webp'),
       (25, 'okhpauettcdafmriw4a0', 'denim3',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714203720/okhpauettcdafmriw4a0.webp'),
       (26, 'kx1b2cb899atmiq2hndk', 'ao-den',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714204533/kx1b2cb899atmiq2hndk.webp'),
       (27, 'mojfqmlidwod4whaxkvu', 'caro2',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714204533/mojfqmlidwod4whaxkvu.webp'),
       (28, 'hs79fibfzj6qwb29domv', 'caro3',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714204533/hs79fibfzj6qwb29domv.webp'),
       (29, 'fjs7tzdrooxvid7402dl', 'fabric1',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714204948/fjs7tzdrooxvid7402dl.webp'),
       (30, 'mlwsfp7qvtkqvw4i0aez', 'fabric3',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714204948/mlwsfp7qvtkqvw4i0aez.webp'),
       (31, 'bkinh9nacoxyvl6eznq6', 'fabric2',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714204952/bkinh9nacoxyvl6eznq6.webp'),
       (32, 'vyccuxth1gei9qtvsuet', 'stripe1',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714205188/vyccuxth1gei9qtvsuet.webp'),
       (33, 'caixhqdtvukpvo2v8kv5', 'stripe2',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714205191/caixhqdtvukpvo2v8kv5.webp'),
       (34, 'ftokoox5fqi5qqdhrd3p', 'stripe3',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714205193/ftokoox5fqi5qqdhrd3p.webp'),
       (35, 'an2ywvoqhgtumxfwdrhg', 'rymthm1',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714205409/an2ywvoqhgtumxfwdrhg.webp'),
       (36, 'ln0y4bq3nqhxdrz3c2nv', 'rymthm2',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714205410/ln0y4bq3nqhxdrz3c2nv.webp'),
       (37, 'eoduzwwjt72td0gvp8fx', 'rymthm3',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714205413/eoduzwwjt72td0gvp8fx.webp'),
       (38, 'cui6vlcnlsew3sgxkmwu', 'newyork3',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714205732/cui6vlcnlsew3sgxkmwu.webp'),
       (39, 'tacxz5twxc96cat6uhro', 'newyork1',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714205732/tacxz5twxc96cat6uhro.webp'),
       (40, 'bjwptboz7si2ttrkauej', 'newyork2',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714205734/bjwptboz7si2ttrkauej.webp'),
       (41, 'kssui6ytijcbsgpbrsl2', 'portransit3jpg',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714205991/kssui6ytijcbsgpbrsl2.jpg'),
       (42, 'gv4jn0lvatvlis1o0qx6', 'portransit2',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714205993/gv4jn0lvatvlis1o0qx6.jpg'),
       (43, 'oxtif5xl7l2tr2ca2tbh', 'portransit',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714205994/oxtif5xl7l2tr2ca2tbh.webp'),
       (44, 'b3oek5yzll1dneho8xli', 'spring1',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714206429/b3oek5yzll1dneho8xli.webp'),
       (45, 'bxkn0otvlyjwlfaq4qjd', 'spring2',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714206431/bxkn0otvlyjwlfaq4qjd.webp'),
       (46, 'uozkbbn5f7hoclfz3gka', 'spring3',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714206433/uozkbbn5f7hoclfz3gka.webp'),
       (47, 'fv5cjqpy6nfvnwotnes8', 'mysterius1',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714206641/fv5cjqpy6nfvnwotnes8.jpg'),
       (48, 'xkueplvhktn1d6t7mcb3', 'mysterius2',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714206644/xkueplvhktn1d6t7mcb3.jpg'),
       (49, 'jvnkf3wbodmlzg9a2u7j', 'mysterius3',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714206647/jvnkf3wbodmlzg9a2u7j.jpg'),
       (50, 'oy8u9hnmhy0vaitohile', 'elegant2',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714206964/oy8u9hnmhy0vaitohile.webp'),
       (51, 'ditvjdhdo2xeh7bh5sil', 'elegant1',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714206965/ditvjdhdo2xeh7bh5sil.webp'),
       (52, 'qdppzjlckkagttvhgn53', 'elegant3',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714206965/qdppzjlckkagttvhgn53.webp'),
       (53, 'lveik7qqrqhwqwexfrdy', 'relaxed1',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714207248/lveik7qqrqhwqwexfrdy.webp'),
       (54, 'rj7neot0ifiqg5aa5dyv', 'relaxed2',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714207251/rj7neot0ifiqg5aa5dyv.jpg'),
       (55, 'eev6xb7fxu8nuf0tgyyx', 'relaxed3',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714207248/eev6xb7fxu8nuf0tgyyx.jpg'),
       (56, 'ufoz3inxfvo0x7vznfnb', 'relaxed4',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714207251/ufoz3inxfvo0x7vznfnb.jpg'),
       (57, 'fnig1djkdsysvuumcbhc', 'henley',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714207545/fnig1djkdsysvuumcbhc.webp'),
       (58, 'sv6za0okathfrbqo4zsq', 'henley2',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714207547/sv6za0okathfrbqo4zsq.webp'),
       (59, 's75t9e2yrvkk80mbydbu', 'henley3',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714207546/s75t9e2yrvkk80mbydbu.webp'),
       (60, 'uhwr9ngmnyyomwq0cpgy', 'henley4',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714207548/uhwr9ngmnyyomwq0cpgy.webp');
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
    `updated_at`      datetime(6) DEFAULT NULL,
    `created_by`      varchar(255) DEFAULT NULL,
    `last_updated_by` varchar(255) DEFAULT NULL,
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
VALUES (1, NULL, NULL, NULL, NULL, 'TIEN_MAT'),
       (2, NULL, NULL, NULL, NULL, 'CHUYEN_KHOAN');
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
    `id_khach_hang`      int            DEFAULT NULL,
    `id_nhan_vien`       int            DEFAULT NULL,
    `id_phieu_giam_gia`  int            DEFAULT NULL,
    `phi_van_chuyen`     decimal(38, 2) DEFAULT NULL,
    `tien_giam`          decimal(38, 2) DEFAULT NULL,
    `tong_tien`          decimal(38, 2) DEFAULT NULL,
    `created_at`         datetime(6) DEFAULT NULL,
    `updated_at`         datetime(6) DEFAULT NULL,
    `created_by`         varchar(255)   DEFAULT NULL,
    `dia_chi_nguoi_nhan` varchar(255)   DEFAULT NULL,
    `email_nguoi_nhan`   varchar(255)   DEFAULT NULL,
    `ghi_chu`            varchar(255)   DEFAULT NULL,
    `last_updated_by`    varchar(255)   DEFAULT NULL,
    `ma`                 varchar(255)   DEFAULT NULL,
    `sdt_nguoi_nhan`     varchar(255)   DEFAULT NULL,
    `ten_nguoi_nhan`     varchar(255)   DEFAULT NULL,
    `loai_hoa_don`       enum('TAI_QUAY','GIAO_HANG') DEFAULT NULL,
    `trang_thai`         enum('TAO_DON','CHO_XAC_NHAN','DA_XAC_NHAN','CHO_GIAO','DANG_GIAO','HOAN_THANH','HUY','TRA_HANG','HOAN_TIEN','CHO_HOAN_TIEN','DA_HOAN_TIEN') DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY                  `FKrygimdf5nr1g2t6u03gvtr1te` (`id_khach_hang`),
    KEY                  `FKkuxkrkgq8yftm4d8d7o0w6nbv` (`id_nhan_vien`),
    KEY                  `FKmueylgcm7h1gb4f9nbnp3j5c6` (`id_phieu_giam_gia`),
    CONSTRAINT `FKkuxkrkgq8yftm4d8d7o0w6nbv` FOREIGN KEY (`id_nhan_vien`) REFERENCES `nhan_vien` (`id`),
    CONSTRAINT `FKmueylgcm7h1gb4f9nbnp3j5c6` FOREIGN KEY (`id_phieu_giam_gia`) REFERENCES `phieu_giam_gia` (`id`),
    CONSTRAINT `FKrygimdf5nr1g2t6u03gvtr1te` FOREIGN KEY (`id_khach_hang`) REFERENCES `khach_hang` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hoa_don`
--

LOCK
TABLES `hoa_don` WRITE;
/*!40000 ALTER TABLE `hoa_don` DISABLE KEYS */;
INSERT INTO `hoa_don`
VALUES (1, NULL, 1, NULL, 0.00, 0.00, 1500000.00, '2024-04-26 21:05:24.683069', '2024-04-26 21:05:24.726074',
        'admin0203', NULL, NULL, NULL, 'admin0203', 'HDf75dce8', NULL, NULL, 'TAI_QUAY', 'HOAN_THANH'),
       (2, NULL, 1, NULL, 0.00, 0.00, 1500000.00, '2024-04-26 21:06:26.729095', '2024-04-26 21:06:26.802106',
        'admin0203', NULL, NULL, NULL, 'admin0203', 'HDB48110A', NULL, NULL, 'TAI_QUAY', 'HOAN_THANH'),
       (3, 1, 1, NULL, 25300.00, 0.00, 6000000.00, '2024-04-26 21:16:51.307130', '2024-04-27 09:30:18.413068',
        'admin0203', 'Nhà 99,Xã Đại Yên,Huyện Chương Mỹ,Hà Nội', 'duongviethung2003@gmail.com', NULL, 'admin0203',
        'HDAD07836', '0345649831', 'Nguyễn Văn Hiếu', 'GIAO_HANG', 'DA_HOAN_TIEN'),
       (4, 2, 1, NULL, 25301.00, 0.00, 3000000.00, '2024-04-26 21:45:39.144177', '2024-04-26 21:45:39.165180',
        'admin0203', 'Ngõ 30,Xã Nật Sơn,Huyện Kim Bôi,Hòa Bình', NULL, NULL, 'admin0203', 'HDC532412', '0375773850',
        'Dương Việt Hùng', 'GIAO_HANG', 'CHO_XAC_NHAN'),
       (5, NULL, 1, NULL, 25301.00, 0.00, 1500000.00, '2024-04-26 21:51:12.448792', '2024-04-26 21:51:12.460459',
        'admin0203', 'vfwsd,Xã Vĩnh Tiến,Huyện Kim Bôi,Hòa Bình', NULL, NULL, 'admin0203', 'HD4584966', '0999999999',
        'qgfe', 'GIAO_HANG', 'CHO_XAC_NHAN');
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
    `gia_ban`             decimal(38, 2) DEFAULT NULL,
    `gia_nhap`            decimal(38, 2) DEFAULT NULL,
    `id`                  int NOT NULL AUTO_INCREMENT,
    `id_hoa_don`          int            DEFAULT NULL,
    `id_hoa_don_tra_hang` int            DEFAULT NULL,
    `id_spct`             int            DEFAULT NULL,
    `so_luong`            int NOT NULL,
    PRIMARY KEY (`id`),
    KEY                   `FK5adopt864mjisuy5xmgmy8iun` (`id_hoa_don`),
    KEY                   `FK8ue9uh9qjbp1lhy52ajb46hpk` (`id_hoa_don_tra_hang`),
    KEY                   `FKtg7wf3f4noic4uhrdn3lju7k6` (`id_spct`),
    CONSTRAINT `FK5adopt864mjisuy5xmgmy8iun` FOREIGN KEY (`id_hoa_don`) REFERENCES `hoa_don` (`id`),
    CONSTRAINT `FK8ue9uh9qjbp1lhy52ajb46hpk` FOREIGN KEY (`id_hoa_don_tra_hang`) REFERENCES `hoa_don_tra_hang` (`id`),
    CONSTRAINT `FKtg7wf3f4noic4uhrdn3lju7k6` FOREIGN KEY (`id_spct`) REFERENCES `san_pham_chi_tiet` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hoa_don_chi_tiet`
--

LOCK
TABLES `hoa_don_chi_tiet` WRITE;
/*!40000 ALTER TABLE `hoa_don_chi_tiet` DISABLE KEYS */;
INSERT INTO `hoa_don_chi_tiet`
VALUES (1500000.00, 1000000.00, 1, 1, NULL, 1, 1),
       (1500000.00, 1000000.00, 2, 2, NULL, 3, 1),
       (1500000.00, 1000000.00, 3, 3, NULL, 1, 4),
       (1500000.00, 1000000.00, 4, 4, NULL, 1, 1),
       (1500000.00, 1000000.00, 5, 4, NULL, 5, 1),
       (1500000.00, 1000000.00, 6, 5, NULL, 2, 1);
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
    `hoa_don_id`                   int            DEFAULT NULL,
    `id`                           int NOT NULL AUTO_INCREMENT,
    `tong_tien`                    decimal(38, 2) DEFAULT NULL,
    `tong_tien_phieu_giam_gia_cu`  decimal(38, 2) DEFAULT NULL,
    `tong_tien_phieu_giam_gia_moi` decimal(38, 2) DEFAULT NULL,
    `tong_tien_tra_khach`          decimal(38, 2) DEFAULT NULL,
    `created_at`                   datetime(6) DEFAULT NULL,
    `updated_at`                   datetime(6) DEFAULT NULL,
    `created_by`                   varchar(255)   DEFAULT NULL,
    `dia_chi_nguoi_nhan`           varchar(255)   DEFAULT NULL,
    `email_nguoi_nhan`             varchar(255)   DEFAULT NULL,
    `ghi_chu`                      varchar(255)   DEFAULT NULL,
    `last_updated_by`              varchar(255)   DEFAULT NULL,
    `ma`                           varchar(255)   DEFAULT NULL,
    `sdt_nguoi_nhan`               varchar(255)   DEFAULT NULL,
    `ten_nguoi_nhan`               varchar(255)   DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `UK_a10fuo2ij18b8kd3chd02okrx` (`hoa_don_id`),
    CONSTRAINT `FKtpfop93u138d574n1hc3onapr` FOREIGN KEY (`hoa_don_id`) REFERENCES `hoa_don` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hoa_don_tra_hang`
--

LOCK
TABLES `hoa_don_tra_hang` WRITE;
/*!40000 ALTER TABLE `hoa_don_tra_hang` DISABLE KEYS */;
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
    `account_id`      int          DEFAULT NULL,
    `gioi_tinh`       bit(1) NOT NULL,
    `id`              int    NOT NULL AUTO_INCREMENT,
    `image_id`        int          DEFAULT NULL,
    `ngay_sinh`       date         DEFAULT NULL,
    `trang_thai`      int    NOT NULL,
    `created_at`      datetime(6) DEFAULT NULL,
    `updated_at`      datetime(6) DEFAULT NULL,
    `created_by`      varchar(255) DEFAULT NULL,
    `email`           varchar(255) DEFAULT NULL,
    `ho_ten`          varchar(255) DEFAULT NULL,
    `last_updated_by` varchar(255) DEFAULT NULL,
    `sdt`             varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `UK_altrjwb4si5pi5noki9m4luou` (`account_id`),
    KEY               `FK98t4n6gmjvxcfk7ecl91hov2k` (`image_id`),
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
VALUES (2, _binary '', 1, 1, '2024-04-24', 1, '2024-04-26 21:15:52.725238', '2024-04-26 21:15:56.106178', 'admin0203',
        'duongviethung2003@gmail.com', 'Nguyễn Văn Hiếu', 'admin0203', '0345649831'),
       (3, _binary '', 2, 2, '2003-03-01', 1, '2024-04-26 21:43:32.395095', '2024-04-26 21:43:37.484912', 'admin0203',
        'hungboong30@gmail.com', 'Dương Việt Hùng', 'admin0203', '0375773850'),
       (4, _binary '', 3, 3, '2024-04-01', 1, '2024-04-27 10:05:48.437850', NULL, 'admin0203',
        'hungdvph29421@fpt.edu.vn', 'Trần Văn Bình', NULL, '0333333333');
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `khach_hang_image`
--

LOCK
TABLES `khach_hang_image` WRITE;
/*!40000 ALTER TABLE `khach_hang_image` DISABLE KEYS */;
INSERT INTO `khach_hang_image`
VALUES (1, 'cca9f97c-32ce-4a3b-89e4-d5eb6063bf2c', 'default-user-img',
        'https://res.cloudinary.com/dpsryzyev/image/upload/v1712851456/default-user-img_ri7fap.webp'),
       (2, 'b781a834-a58f-47c7-b227-e4dfc07eb37f', 'default-user-img',
        'https://res.cloudinary.com/dpsryzyev/image/upload/v1712851456/default-user-img_ri7fap.webp'),
       (3, 'gwyyjwgufexaxaupmc3f', 'lovepik-display-of-white-collar-image-of-male-staff-picture_500872022',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714187146/gwyyjwgufexaxaupmc3f.jpg');
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
    `trang_thai`      bit(1) NOT NULL,
    `created_at`      datetime(6) DEFAULT NULL,
    `updated_at`      datetime(6) DEFAULT NULL,
    `created_by`      varchar(255) DEFAULT NULL,
    `last_updated_by` varchar(255) DEFAULT NULL,
    `ten`             varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kich_co`
--

LOCK
TABLES `kich_co` WRITE;
/*!40000 ALTER TABLE `kich_co` DISABLE KEYS */;
INSERT INTO `kich_co`
VALUES (1, _binary '', '2024-04-25 22:30:23.489978', NULL, 'admin0203', NULL, 'S'),
       (2, _binary '', '2024-04-25 22:30:27.975970', NULL, 'admin0203', NULL, 'M'),
       (3, _binary '', '2024-04-25 22:30:34.316623', NULL, 'admin0203', NULL, 'L'),
       (4, _binary '', '2024-04-25 22:30:46.816753', NULL, 'admin0203', NULL, 'XS'),
       (5, _binary '', '2024-04-25 22:30:52.626635', NULL, 'admin0203', NULL, 'XL'),
       (6, _binary '', '2024-04-25 22:31:02.335074', NULL, 'admin0203', NULL, 'XXL');
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
    `trang_thai`      bit(1) NOT NULL,
    `created_at`      datetime(6) DEFAULT NULL,
    `updated_at`      datetime(6) DEFAULT NULL,
    `created_by`      varchar(255) DEFAULT NULL,
    `last_updated_by` varchar(255) DEFAULT NULL,
    `ten`             varchar(255) DEFAULT NULL,
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
VALUES (1, _binary '', '2024-04-25 22:33:00.963072', NULL, 'admin0203', NULL, 'Classic Fit'),
       (2, _binary '', '2024-04-25 22:33:13.429317', NULL, 'admin0203', NULL, 'Slim Fit'),
       (3, _binary '', '2024-04-25 22:33:29.137517', NULL, 'admin0203', NULL, 'Oversize'),
       (4, _binary '', '2024-04-25 22:36:22.046494', NULL, 'admin0203', NULL, 'Regular fit');
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
    `trang_thai`      bit(1) NOT NULL,
    `created_at`      datetime(6) DEFAULT NULL,
    `updated_at`      datetime(6) DEFAULT NULL,
    `created_by`      varchar(255) DEFAULT NULL,
    `last_updated_by` varchar(255) DEFAULT NULL,
    `ten`             varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kieu_thiet_ke`
--

LOCK
TABLES `kieu_thiet_ke` WRITE;
/*!40000 ALTER TABLE `kieu_thiet_ke` DISABLE KEYS */;
INSERT INTO `kieu_thiet_ke`
VALUES (1, _binary '', '2024-04-25 22:48:34.652171', NULL, 'admin0203', NULL, 'Túi ngực'),
       (2, _binary '', '2024-04-25 22:48:40.999247', NULL, 'admin0203', NULL, 'Trơn'),
       (3, _binary '', '2024-04-25 22:49:59.555589', NULL, 'admin0203', NULL, 'Kẻ sọc'),
       (4, _binary '', '2024-04-25 22:50:08.288840', NULL, 'admin0203', NULL, 'Kẻ caro'),
       (5, _binary '', '2024-04-25 22:50:14.761251', NULL, 'admin0203', NULL, 'Họa tiết'),
       (6, _binary '', '2024-04-25 22:51:00.267367', NULL, 'admin0203', NULL, 'Hàn Quốc');
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
    `id_hoa_don`      int          DEFAULT NULL,
    `created_at`      datetime(6) DEFAULT NULL,
    `updated_at`      datetime(6) DEFAULT NULL,
    `created_by`      varchar(255) DEFAULT NULL,
    `last_updated_by` varchar(255) DEFAULT NULL,
    `mo_ta`           varchar(255) DEFAULT NULL,
    `tieu_de`         varchar(255) DEFAULT NULL,
    `trang_thai`      enum('TAO_DON','CHO_XAC_NHAN','DA_XAC_NHAN','CHO_GIAO','DANG_GIAO','HOAN_THANH','HUY','TRA_HANG','HOAN_TIEN','CHO_HOAN_TIEN','DA_HOAN_TIEN') DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY               `FKcan7u6m18x7j4e4cxoojeu9b5` (`id_hoa_don`),
    CONSTRAINT `FKcan7u6m18x7j4e4cxoojeu9b5` FOREIGN KEY (`id_hoa_don`) REFERENCES `hoa_don` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lich_su_hoa_don`
--

LOCK
TABLES `lich_su_hoa_don` WRITE;
/*!40000 ALTER TABLE `lich_su_hoa_don` DISABLE KEYS */;
INSERT INTO `lich_su_hoa_don`
VALUES (1, 1, '2024-04-26 21:05:24.693076', NULL, 'admin0203', NULL, '', 'Hoàn thành', 'HOAN_THANH'),
       (2, 2, '2024-04-26 21:06:26.765105', NULL, 'admin0203', NULL, '', 'Hoàn thành', 'HOAN_THANH'),
       (3, 3, '2024-04-26 21:16:51.335982', NULL, 'admin0203', NULL, '', 'Chờ xác nhận', 'CHO_XAC_NHAN'),
       (4, 3, '2024-04-26 21:17:02.075064', NULL, 'admin0203', NULL,
        'Cập nhật sản phẩm Áo Sơmi Cuban Linen Glamorous Embroidery Logo màu Beige size M số lượng 4',
        'Cập nhật sản phẩm', NULL),
       (5, 3, '2024-04-26 21:17:54.151446', NULL, 'admin0203', NULL, 'Chuyển trạng thái', 'Đã xác nhận', 'DA_XAC_NHAN'),
       (6, 3, '2024-04-26 21:20:26.091949', NULL, 'admin0203', NULL, 'Chuyển trạng thái', 'Chờ giao hàng', 'CHO_GIAO'),
       (7, 3, '2024-04-26 21:21:23.066466', NULL, 'admin0203', NULL, 'Chuyển trạng thái', 'Đang giao hàng',
        'DANG_GIAO'),
       (8, 3, '2024-04-26 21:24:53.894925', NULL, 'admin0203', NULL, 'Tạo thanh toán với số tiền : 6.025.300',
        'Tạo thanh toán', NULL),
       (9, 3, '2024-04-26 21:26:51.443600', NULL, 'admin0203', NULL, 'Chuyển trạng thái', 'Hoàn thành', 'HOAN_THANH'),
       (10, 4, '2024-04-26 21:45:39.161174', NULL, 'admin0203', NULL, '', 'Chờ xác nhận', 'CHO_XAC_NHAN'),
       (11, 5, '2024-04-26 21:51:12.457452', NULL, 'admin0203', NULL, '', 'Chờ xác nhận', 'CHO_XAC_NHAN'),
       (12, 3, '2024-04-27 09:16:15.971787', NULL, 'admin0203', NULL, 'Chuyển trạng thái', 'Đang giao hàng',
        'DANG_GIAO'),
       (13, 3, '2024-04-27 09:24:04.306598', NULL, 'admin0203', NULL, 'Chuyển trạng thái', 'Chờ giao hàng', 'CHO_GIAO'),
       (14, 3, '2024-04-27 09:25:36.765834', NULL, 'admin0203', NULL, 'Chuyển trạng thái', 'Đang giao hàng',
        'DANG_GIAO'),
       (15, 3, '2024-04-27 09:27:04.526083', NULL, 'admin0203', NULL, 'Chuyển trạng thái', 'Hoàn thành', 'HOAN_THANH'),
       (16, 3, '2024-04-27 09:29:50.516994', NULL, 'admin0203', NULL, 'Chuyển trạng thái', 'Hủy', 'HUY'),
       (17, 3, '2024-04-27 09:29:50.544329', NULL, 'admin0203', NULL, 'Yêu cầu hoàn tiền : 6.025.300', 'Chờ hoàn tiền',
        'CHO_HOAN_TIEN'),
       (18, 3, '2024-04-27 09:30:14.873758', NULL, 'admin0203', NULL, 'Đã hoàn số tiền: 6.025.300', 'Đã hoàn tiền',
        'DA_HOAN_TIEN');
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
    `image_id`        int          DEFAULT NULL,
    `trang_thai`      bit(1) NOT NULL,
    `created_at`      datetime(6) DEFAULT NULL,
    `updated_at`      datetime(6) DEFAULT NULL,
    `created_by`      varchar(255) DEFAULT NULL,
    `last_updated_by` varchar(255) DEFAULT NULL,
    `ma`              varchar(255) DEFAULT NULL,
    `ten`             varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `UK_q7pi6vpa0r7k8d4511krmkmkr` (`image_id`),
    CONSTRAINT `FKs2yox2vbl1l9adiu6mup5luo4` FOREIGN KEY (`image_id`) REFERENCES `mau_sac_image` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mau_sac`
--

LOCK
TABLES `mau_sac` WRITE;
/*!40000 ALTER TABLE `mau_sac` DISABLE KEYS */;
INSERT INTO `mau_sac`
VALUES (1, 1, _binary '', '2024-04-25 22:12:38.300205', NULL, 'admin0203', NULL, 'TRANG', 'Trắng'),
       (2, 2, _binary '', '2024-04-25 22:13:15.041268', NULL, 'admin0203', NULL, 'DEN', 'Đen'),
       (3, 3, _binary '', '2024-04-25 22:14:33.732909', NULL, 'admin0203', NULL, 'XANHDUONG', 'Xanh dương'),
       (4, 4, _binary '', '2024-04-25 22:15:41.857384', '2024-04-27 15:02:49.503171', 'admin0203', 'admin0203',
        'BEIGE', 'Be'),
       (5, 5, _binary '', '2024-04-25 22:18:31.299396', NULL, 'admin0203', NULL, 'XANHLA', 'Xanh lá'),
       (6, 6, _binary '', '2024-04-25 22:22:55.198241', NULL, 'admin0203', NULL, 'DORUOU', 'Đỏ rượu'),
       (7, 7, _binary '', '2024-04-25 22:26:22.346425', NULL, 'admin0203', NULL, 'NAU', 'Nâu'),
       (8, 8, _binary '', '2024-04-25 22:28:07.940748', NULL, 'admin0203', NULL, 'HONG', 'Hồng'),
       (9, 9, _binary '', '2024-04-25 22:30:11.545197', NULL, 'admin0203', NULL, 'VANG', 'Vàng'),
       (10, 10, _binary '', '2024-04-27 11:08:59.931226', NULL, 'admin0203', NULL, 'XANHDEN', 'Xanh đen');
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mau_sac_image`
--

LOCK
TABLES `mau_sac_image` WRITE;
/*!40000 ALTER TABLE `mau_sac_image` DISABLE KEYS */;
INSERT INTO `mau_sac_image`
VALUES (1, 'yev8leuwg8cbm9tjrgyt', 'trang',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714057956/yev8leuwg8cbm9tjrgyt.jpg'),
       (2, 'ld9x6bwtgptce2qhshnb', 'mau-den-01',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714057993/ld9x6bwtgptce2qhshnb.jpg'),
       (3, 'mfftvewfyoiqueexiq17', 'xanh-duong-nhat',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714058072/mfftvewfyoiqueexiq17.jpg'),
       (4, 'gicnmdpg9un6sr8ism7u', 'mau-be',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714058900/gicnmdpg9un6sr8ism7u.jpg'),
       (5, 'rzowiulw7id88dp1c2gf', 'xanh-reu-11',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714058833/rzowiulw7id88dp1c2gf.jpg'),
       (6, 'ysbj7l5ooyrktwbzuxh3', 'do-ruou',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714058573/ysbj7l5ooyrktwbzuxh3.png'),
       (7, 'f89kuuswrw85sfnoj2gd', 'mau-nau',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714058780/f89kuuswrw85sfnoj2gd.png'),
       (8, 'ya1e50tp1ufywuxzkkj9', 'hong',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714058886/ya1e50tp1ufywuxzkkj9.jpg'),
       (9, 'sspixlqscvbyud9anghc', 'vang',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714059010/sspixlqscvbyud9anghc.png'),
       (10, 'aito0jabusr5wg0crwnm', 'xanh-den',
        'http://res.cloudinary.com/dpsryzyev/image/upload/v1714190938/aito0jabusr5wg0crwnm.png');
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
    `account_id`      int          DEFAULT NULL,
    `gioi_tinh`       bit(1) NOT NULL,
    `id`              int    NOT NULL AUTO_INCREMENT,
    `image_id`        int          DEFAULT NULL,
    `ngay_sinh`       date         DEFAULT NULL,
    `created_at`      datetime(6) DEFAULT NULL,
    `updated_at`      datetime(6) DEFAULT NULL,
    `cccd`            varchar(255) DEFAULT NULL,
    `created_by`      varchar(255) DEFAULT NULL,
    `dia_chi`         varchar(255) DEFAULT NULL,
    `email`           varchar(255) DEFAULT NULL,
    `ho_ten`          varchar(255) DEFAULT NULL,
    `last_updated_by` varchar(255) DEFAULT NULL,
    `sdt`             varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `UK_5n9lbijsdl4qn33dqr58cf1cb` (`account_id`),
    KEY               `FK2bnmp6n2nkowummqr4n6ie44e` (`image_id`),
    CONSTRAINT `FK2bnmp6n2nkowummqr4n6ie44e` FOREIGN KEY (`image_id`) REFERENCES `staff_image` (`id`),
    CONSTRAINT `FK32eawtyqqx6sdv28q9df6qyqd` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nhan_vien`
--

LOCK
TABLES `nhan_vien` WRITE;
/*!40000 ALTER TABLE `nhan_vien` DISABLE KEYS */;
INSERT INTO `nhan_vien`
VALUES (1, _binary '', 1, NULL, NULL, NULL, NULL, '001234567899', NULL, 'Hà Nội', 'langcoc@gmail.com',
        'Nguyễn Lăng Cọc', NULL, '0123456789');
/*!40000 ALTER TABLE `nhan_vien` ENABLE KEYS */;
UNLOCK
TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification`
(
    `cust_id`     int          DEFAULT NULL,
    `id`          int    NOT NULL AUTO_INCREMENT,
    `is_read`     bit(1) NOT NULL,
    `time`        datetime(6) DEFAULT NULL,
    `content`     varchar(255) DEFAULT NULL,
    `related_url` varchar(255) DEFAULT NULL,
    `type`        enum('ORDER_STATUS_UPDATED','NEW_ORDER_CREATED') DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY           `FKsx31tdcvw1x426q44kgafiay5` (`cust_id`),
    CONSTRAINT `FKsx31tdcvw1x426q44kgafiay5` FOREIGN KEY (`cust_id`) REFERENCES `khach_hang` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK
TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
INSERT INTO `notification`
VALUES (1, 1, _binary '\0', '2024-04-26 21:17:54.271532', 'Hóa đơn HDAD07836 đã được cập nhật trạng thái',
        '/profile/order-tracking/HDAD07836', 'ORDER_STATUS_UPDATED'),
       (1, 2, _binary '\0', '2024-04-26 21:20:26.215521', 'Hóa đơn HDAD07836 đã được cập nhật trạng thái',
        '/profile/order-tracking/HDAD07836', 'ORDER_STATUS_UPDATED'),
       (1, 3, _binary '\0', '2024-04-26 21:21:23.225304', 'Hóa đơn HDAD07836 đã được cập nhật trạng thái',
        '/profile/order-tracking/HDAD07836', 'ORDER_STATUS_UPDATED'),
       (1, 4, _binary '\0', '2024-04-26 21:26:51.609817', 'Hóa đơn HDAD07836 đã được cập nhật trạng thái',
        '/profile/order-tracking/HDAD07836', 'ORDER_STATUS_UPDATED'),
       (1, 5, _binary '\0', '2024-04-27 09:16:16.090219', 'Hóa đơn HDAD07836 đã được cập nhật trạng thái',
        '/profile/order-tracking/HDAD07836', 'ORDER_STATUS_UPDATED'),
       (1, 6, _binary '\0', '2024-04-27 09:24:04.464210', 'Hóa đơn HDAD07836 đã được cập nhật trạng thái',
        '/profile/order-tracking/HDAD07836', 'ORDER_STATUS_UPDATED'),
       (1, 7, _binary '\0', '2024-04-27 09:25:36.890423', 'Hóa đơn HDAD07836 đã được cập nhật trạng thái',
        '/profile/order-tracking/HDAD07836', 'ORDER_STATUS_UPDATED'),
       (1, 8, _binary '\0', '2024-04-27 09:27:04.650709', 'Hóa đơn HDAD07836 đã được cập nhật trạng thái',
        '/profile/order-tracking/HDAD07836', 'ORDER_STATUS_UPDATED');
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
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
    `dieu_kien_giam`     decimal(38, 2) DEFAULT NULL,
    `gia_tri`            decimal(38, 2) DEFAULT NULL,
    `gia_tri_max`        decimal(38, 2) DEFAULT NULL,
    `id`                 int NOT NULL AUTO_INCREMENT,
    `kieu`               int            DEFAULT NULL,
    `loai`               int            DEFAULT NULL,
    `so_luong`           int NOT NULL,
    `created_at`         datetime(6) DEFAULT NULL,
    `thoi_gian_bat_dau`  datetime(6) DEFAULT NULL,
    `thoi_gian_ket_thuc` datetime(6) DEFAULT NULL,
    `updated_at`         datetime(6) DEFAULT NULL,
    `created_by`         varchar(255)   DEFAULT NULL,
    `last_updated_by`    varchar(255)   DEFAULT NULL,
    `ma_phieu_giam_gia`  varchar(255)   DEFAULT NULL,
    `ten_phieu_giam_gia` varchar(255)   DEFAULT NULL,
    `trang_thai`         varchar(255)   DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phieu_giam_gia`
--

LOCK
TABLES `phieu_giam_gia` WRITE;
/*!40000 ALTER TABLE `phieu_giam_gia` DISABLE KEYS */;
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
    `trang_thai`        int DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY                 `FKe2f6kd9jdsa3bb47g9p6dr9jh` (`khach_hang_id`),
    KEY                 `FKm0wxpf9di0mh1qjsgls0sbqvl` (`phieu_giam_gia_id`),
    CONSTRAINT `FKe2f6kd9jdsa3bb47g9p6dr9jh` FOREIGN KEY (`khach_hang_id`) REFERENCES `khach_hang` (`id`),
    CONSTRAINT `FKm0wxpf9di0mh1qjsgls0sbqvl` FOREIGN KEY (`phieu_giam_gia_id`) REFERENCES `phieu_giam_gia` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phieu_giam_gia_kh`
--

LOCK
TABLES `phieu_giam_gia_kh` WRITE;
/*!40000 ALTER TABLE `phieu_giam_gia_kh` DISABLE KEYS */;
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
    `trang_thai`      bit(1) NOT NULL,
    `created_at`      datetime(6) DEFAULT NULL,
    `updated_at`      datetime(6) DEFAULT NULL,
    `created_by`      varchar(255) DEFAULT NULL,
    `last_updated_by` varchar(255) DEFAULT NULL,
    `ma`              varchar(255) DEFAULT NULL,
    `mo_ta`           varchar(255) DEFAULT NULL,
    `ten`             varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `san_pham`
--

LOCK
TABLES `san_pham` WRITE;
/*!40000 ALTER TABLE `san_pham` DISABLE KEYS */;
INSERT INTO `san_pham`
VALUES (1, _binary '', '2024-04-26 21:02:28.618442', NULL, 'admin0203', NULL, 'AO01',
        '- Được cập nhật với hàm lượng cotton cao hơn để có kết cấu mềm mại hơn mà không ảnh hưởng đến cảm giác mát mẻ của vải lanh.',
        'Áo Sơmi Cuban Linen Glamorous Embroidery Logo'),
       (2, _binary '', '2024-04-27 11:00:43.530656', '2024-04-27 11:01:24.639256', 'admin0203', 'admin0203', 'SM001',
        '&#272;&#432;&#7907;c c&#7853;p nh&#7853;t v&#7899;i h&#224;m l&#432;&#7907;ng cotton cao h&#417;n &#273;&#7875; c&#243; k&#7871;t c&#7845;u m&#7873;m m&#7841;i h&#417;n&#160;',
        'Áo sơ mi Chrysanthenum Pattern'),
       (3, _binary '', '2024-04-27 11:05:58.025064', NULL, 'admin0203', NULL, 'SPRE',
        '- Được cập nhật với hàm lượng cotton cao hơn để có kết cấu mềm mại hơn mà không ảnh hưởng đến cảm giác mát mẻ của vải lanh.',
        'Áo Sơ mi Semi Spread'),
       (4, _binary '', '2024-04-27 11:13:37.387353', NULL, 'admin0203', NULL, 'SCRIPT',
        '- Được cập nhật với hàm lượng cotton cao hơn để có kết cấu mềm mại hơn mà không ảnh hưởng đến cảm giác mát mẻ của vải lanh.',
        'Áo Sơmi Script'),
       (5, _binary '', '2024-04-27 11:23:26.375032', NULL, 'admin0203', NULL, 'CRAFT',
        '- Được cập nhật với hàm lượng cotton cao hơn để có kết cấu mềm mại hơn mà không ảnh hưởng đến cảm giác mát mẻ của vải lanh.',
        'Áo Sơmi Cuban CigarCraft'),
       (6, _binary '', '2024-04-27 14:28:31.506207', NULL, 'admin0203', NULL, 'MAZE',
        '- Được cập nhật với hàm lượng cotton cao hơn để có kết cấu mềm mại hơn mà không ảnh hưởng đến cảm giác mát mẻ của vải lanh.',
        'Áo Sơ mi Maze'),
       (7, _binary '', '2024-04-27 14:32:40.503635', NULL, 'admin0203', NULL, 'OLD01',
        '- Được cập nhật với hàm lượng cotton cao hơn để có kết cấu mềm mại hơn mà không ảnh hưởng đến cảm giác mát mẻ của vải lanh.',
        'Áo Sơ mi Old School'),
       (8, _binary '', '2024-04-27 14:39:00.604838', NULL, 'admin0203', NULL, 'INDIGO',
        'Với tinh thần đơn giản nhưng sang trọng, áo sơ mi denim Dark Blue không chỉ là một sản phẩm thời trang, mà còn là sự kết hợp hoàn hảo giữa thoải mái và phong cách',
        'Áo Sơmi Indigo'),
       (9, _binary '', '2024-04-27 14:51:44.939180', NULL, 'admin0203', NULL, 'SPRED2',
        'Áo Sơmi Regular Semi Spread Caro là sự kết hợp giữa 3 chất liệu bamboo, polyester, và spandex. Đây là 3 chất liệu mang đến nhiều ưu điểm cho người mặc giúp áo sơ mi có độ thoáng khí cao, giữ form dáng tốt, co giãn và bền bỉ.',
        'Áo Sơ mi Spread Caro'),
       (10, _binary '', '2024-04-27 14:58:24.261197', NULL, 'admin0203', NULL, 'FABRIC',
        'Chất liệu corduroy không chỉ tạo nên cảm giác mềm mại và ấm áp mà còn đảm bảo áo sơmi giữ được form dáng và màu sắc, chống nhăn sau nhiều lần sử dụng.',
        'Áo Sơ mi Corduroy Fabric Embroidered'),
       (11, _binary '', '2024-04-27 15:04:28.350536', NULL, 'admin0203', NULL, 'STRIPE',
        'Với sọc dọc màu xanh trên nền trắng, áo Sơmi này tạo nên sự tươi mới và gần gũi với thiên nhiên. Màu xanh thanh lịch kết hợp với nền trắng tinh tế, tạo nên sự hài hòa và dễ dàng phối hợp với nhiều kiểu trang phục khác nhau.',
        'Áo Sơ mi Vertical Stripe'),
       (12, _binary '', '2024-04-27 15:07:42.273417', NULL, 'admin0203', NULL, 'RYMTHM',
        'Thiết kế của áo mang đến thông điệp về nhịp sống, năng động và tích cực là biểu tượng của sự đồng điệu và tính hiện đại.',
        'Áo Sơ mi Basic The Rhythm Of Life'),
       (13, _binary '', '2024-04-27 15:13:11.436998', NULL, 'admin0203', NULL, 'NEWYORK',
        'Thiết kế của áo mang đến thông điệp về nhịp sống, năng động và tích cực là biểu tượng của sự đồng điệu và tính hiện đại.',
        'Áo Sơ mi Baseball New York'),
       (14, _binary '', '2024-04-27 15:17:14.318280', NULL, 'admin0203', NULL, 'PORT',
        'Thiết kế của áo mang đến thông điệp về nhịp sống, năng động và tích cực là biểu tượng của sự đồng điệu và tính hiện đại.',
        'Áo Sơ mi Monogram Portraits'),
       (15, _binary '', '2024-04-27 15:24:36.340242', NULL, 'admin0203', NULL, 'SPRING',
        'Thiết kế của áo mang đến thông điệp về nhịp sống, năng động và tích cực là biểu tượng của sự đồng điệu và tính hiện đại.',
        'Áo Sơ mi Vibrant Spring'),
       (16, _binary '', '2024-04-27 15:29:21.692087', NULL, 'admin0203', NULL, 'MYSTERIUS',
        'Thiết kế của áo mang đến thông điệp về nhịp sống, năng động và tích cực là biểu tượng của sự đồng điệu và tính hiện đại.',
        'Áo Sơ mi Linen Mysterious Shapes'),
       (17, _binary '', '2024-04-27 15:32:51.170051', NULL, 'admin0203', NULL, 'ELEGANT',
        'Thiết kế của áo mang đến thông điệp về nhịp sống, năng động và tích cực là biểu tượng của sự đồng điệu và tính hiện đại.',
        'Áo Sơ mi Elegant Vibe'),
       (18, _binary '', '2024-04-27 15:39:17.090227', NULL, 'admin0203', NULL, 'RELAXED',
        'Thiết kế của áo mang đến thông điệp về nhịp sống, năng động và tích cực là biểu tượng của sự đồng điệu và tính hiện đại.',
        'Áo Sơmi Cổ Trụ Relaxed Tay Dài'),
       (19, _binary '', '2024-04-27 15:44:14.632219', NULL, 'admin0203', NULL, 'HENLEY',
        'Thiết kế của áo mang đến thông điệp về nhịp sống, năng động và tích cực là biểu tượng của sự đồng điệu và tính hiện đại.',
        'Áo Sơ mi Linen Henley'),
       (20, _binary '', '2024-04-27 17:20:23.582063', NULL, 'admin0203', NULL, 'TAKEA',
        'Thiết kế của áo mang đến thông điệp về nhịp sống, năng động và tích cực là biểu tượng của sự đồng điệu và tính hiện đại.',
        'Áo sơ mi Take A Move');
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
    `chat_lieu_id`    int            DEFAULT NULL,
    `co_ao_id`        int            DEFAULT NULL,
    `gia_ban`         decimal(38, 2) DEFAULT NULL,
    `gia_nhap`        decimal(38, 2) DEFAULT NULL,
    `id`              int    NOT NULL AUTO_INCREMENT,
    `kich_co_id`      int            DEFAULT NULL,
    `kieu_dang_id`    int            DEFAULT NULL,
    `mau_sac_id`      int            DEFAULT NULL,
    `san_pham_id`     int            DEFAULT NULL,
    `so_luong_ton`    int    NOT NULL,
    `tay_ao_id`       int            DEFAULT NULL,
    `thiet_ke_id`     int            DEFAULT NULL,
    `trang_thai`      bit(1) NOT NULL,
    `created_at`      datetime(6) DEFAULT NULL,
    `updated_at`      datetime(6) DEFAULT NULL,
    `created_by`      varchar(255)   DEFAULT NULL,
    `last_updated_by` varchar(255)   DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=110 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `san_pham_chi_tiet`
--

LOCK
TABLES `san_pham_chi_tiet` WRITE;
/*!40000 ALTER TABLE `san_pham_chi_tiet` DISABLE KEYS */;
INSERT INTO `san_pham_chi_tiet`
VALUES (2, 2, 1500000.00, 1000000.00, 1, 2, 4, 4, 1, 18, 3, 2, _binary '', '2024-04-26 21:05:00.603312',
        '2024-04-27 09:29:54.371326', 'admin0203', 'admin0203'),
       (2, 2, 1500000.00, 1000000.00, 2, 3, 4, 4, 1, 19, 3, 2, _binary '', '2024-04-26 21:05:00.606313',
        '2024-04-26 21:51:12.461454', 'admin0203', 'admin0203'),
       (2, 2, 1500000.00, 1000000.00, 3, 1, 4, 4, 1, 19, 3, 2, _binary '', '2024-04-26 21:05:00.608309',
        '2024-04-26 21:06:26.802106', 'admin0203', 'admin0203'),
       (2, 2, 1500000.00, 1000000.00, 4, 2, 4, 1, 1, 20, 3, 2, _binary '', '2024-04-26 21:05:00.662999', NULL,
        'admin0203', NULL),
       (2, 2, 1500000.00, 1000000.00, 5, 3, 4, 1, 1, 19, 3, 2, _binary '', '2024-04-26 21:05:00.666003',
        '2024-04-26 21:45:39.170170', 'admin0203', 'admin0203'),
       (2, 2, 1500000.00, 1000000.00, 6, 1, 4, 1, 1, 20, 3, 2, _binary '', '2024-04-26 21:05:00.668000', NULL,
        'admin0203', NULL),
       (2, 2, 1500000.00, 1000000.00, 7, 2, 4, 2, 1, 20, 3, 2, _binary '', '2024-04-26 21:05:01.677436', NULL,
        'admin0203', NULL),
       (2, 2, 1500000.00, 1000000.00, 8, 3, 4, 2, 1, 20, 3, 2, _binary '', '2024-04-26 21:05:01.679422', NULL,
        'admin0203', NULL),
       (2, 2, 1500000.00, 1000000.00, 9, 1, 4, 2, 1, 20, 3, 2, _binary '', '2024-04-26 21:05:01.681418', NULL,
        'admin0203', NULL),
       (2, 5, 1000000.00, 700000.00, 10, 2, 1, 2, 2, 50, 2, 5, _binary '', '2024-04-27 11:04:53.625613', NULL,
        'admin0203', NULL),
       (2, 5, 1000000.00, 700000.00, 11, 3, 1, 2, 2, 50, 2, 5, _binary '', '2024-04-27 11:04:53.628626', NULL,
        'admin0203', NULL),
       (2, 5, 1000000.00, 700000.00, 12, 5, 1, 2, 2, 50, 2, 5, _binary '', '2024-04-27 11:04:53.629613', NULL,
        'admin0203', NULL),
       (2, 2, 500000.00, 300000.00, 13, 5, 2, 8, 3, 10, 1, 2, _binary '', '2024-04-27 11:12:39.607072', NULL,
        'admin0203', NULL),
       (2, 2, 500000.00, 300000.00, 14, 3, 2, 8, 3, 10, 1, 2, _binary '', '2024-04-27 11:12:39.612098', NULL,
        'admin0203', NULL),
       (2, 2, 500000.00, 300000.00, 15, 2, 2, 8, 3, 10, 1, 2, _binary '', '2024-04-27 11:12:39.613089', NULL,
        'admin0203', NULL),
       (2, 2, 500000.00, 300000.00, 16, 5, 2, 1, 3, 10, 1, 2, _binary '', '2024-04-27 11:12:39.659144', NULL,
        'admin0203', NULL),
       (2, 2, 500000.00, 300000.00, 17, 3, 2, 1, 3, 10, 1, 2, _binary '', '2024-04-27 11:12:39.661150', NULL,
        'admin0203', NULL),
       (2, 2, 500000.00, 300000.00, 18, 2, 2, 1, 3, 10, 1, 2, _binary '', '2024-04-27 11:12:39.663150', NULL,
        'admin0203', NULL),
       (2, 2, 550000.00, 350000.00, 19, 5, 2, 2, 3, 10, 1, 2, _binary '', '2024-04-27 11:12:39.952890', NULL,
        'admin0203', NULL),
       (2, 2, 550000.00, 350000.00, 20, 3, 2, 2, 3, 10, 1, 2, _binary '', '2024-04-27 11:12:39.954897', NULL,
        'admin0203', NULL),
       (2, 2, 550000.00, 350000.00, 21, 2, 2, 2, 3, 10, 1, 2, _binary '', '2024-04-27 11:12:39.956897', NULL,
        'admin0203', NULL),
       (4, 2, 800000.00, 500000.00, 22, 3, 4, 3, 4, 30, 1, 3, _binary '', '2024-04-27 11:15:08.692495', NULL,
        'admin0203', NULL),
       (4, 2, 800000.00, 500000.00, 23, 2, 4, 3, 4, 30, 1, 3, _binary '', '2024-04-27 11:15:08.694496', NULL,
        'admin0203', NULL),
       (4, 2, 800000.00, 500000.00, 24, 1, 4, 3, 4, 30, 1, 3, _binary '', '2024-04-27 11:15:08.696495', NULL,
        'admin0203', NULL),
       (6, 5, 1300000.00, 1000000.00, 25, 1, 3, 5, 5, 10, 2, 6, _binary '', '2024-04-27 11:28:43.103589', NULL,
        'admin0203', NULL),
       (6, 5, 1300000.00, 1000000.00, 26, 2, 3, 5, 5, 10, 2, 6, _binary '', '2024-04-27 11:28:43.106590', NULL,
        'admin0203', NULL),
       (6, 5, 1300000.00, 1000000.00, 27, 3, 3, 5, 5, 10, 2, 6, _binary '', '2024-04-27 11:28:43.107589', NULL,
        'admin0203', NULL),
       (6, 5, 1300000.00, 1000000.00, 28, 1, 3, 1, 5, 10, 2, 6, _binary '', '2024-04-27 11:28:43.397896', NULL,
        'admin0203', NULL),
       (6, 5, 1300000.00, 1000000.00, 29, 2, 3, 1, 5, 10, 2, 6, _binary '', '2024-04-27 11:28:43.400407', NULL,
        'admin0203', NULL),
       (6, 5, 1300000.00, 1000000.00, 30, 3, 3, 1, 5, 10, 2, 6, _binary '', '2024-04-27 11:28:43.402931', NULL,
        'admin0203', NULL),
       (6, 5, 1300000.00, 1000000.00, 31, 1, 3, 2, 5, 15, 2, 6, _binary '', '2024-04-27 11:28:44.555509', NULL,
        'admin0203', NULL),
       (6, 5, 1300000.00, 1000000.00, 32, 2, 3, 2, 5, 15, 2, 6, _binary '', '2024-04-27 11:28:44.557512', NULL,
        'admin0203', NULL),
       (6, 5, 1300000.00, 1000000.00, 33, 3, 3, 2, 5, 15, 2, 6, _binary '', '2024-04-27 11:28:44.558512', NULL,
        'admin0203', NULL),
       (6, 5, 1300000.00, 1000000.00, 34, 1, 3, 4, 5, 20, 2, 6, _binary '', '2024-04-27 11:28:44.803026', NULL,
        'admin0203', NULL),
       (6, 5, 1300000.00, 1000000.00, 35, 2, 3, 4, 5, 20, 2, 6, _binary '', '2024-04-27 11:28:44.805015', NULL,
        'admin0203', NULL),
       (6, 5, 1300000.00, 1000000.00, 36, 3, 3, 4, 5, 20, 2, 6, _binary '', '2024-04-27 11:28:44.806017', NULL,
        'admin0203', NULL),
       (7, 5, 1600000.00, 1300000.00, 37, 2, 4, 3, 6, 20, 1, 5, _binary '', '2024-04-27 14:29:46.036577', NULL,
        'admin0203', NULL),
       (7, 5, 1600000.00, 1300000.00, 38, 3, 4, 3, 6, 20, 1, 5, _binary '', '2024-04-27 14:29:46.038573', NULL,
        'admin0203', NULL),
       (7, 5, 1600000.00, 1300000.00, 39, 5, 4, 3, 6, 20, 1, 5, _binary '', '2024-04-27 14:29:46.040571', NULL,
        'admin0203', NULL),
       (7, 5, 800000.00, 600000.00, 40, 2, 3, 5, 7, 20, 3, 2, _binary '', '2024-04-27 14:37:09.181480', NULL,
        'admin0203', NULL),
       (7, 5, 800000.00, 600000.00, 41, 3, 3, 5, 7, 20, 3, 2, _binary '', '2024-04-27 14:37:09.183483', NULL,
        'admin0203', NULL),
       (7, 5, 800000.00, 600000.00, 42, 5, 3, 5, 7, 20, 3, 2, _binary '', '2024-04-27 14:37:09.184513', NULL,
        'admin0203', NULL),
       (7, 5, 800000.00, 600000.00, 43, 2, 3, 4, 7, 10, 3, 2, _binary '', '2024-04-27 14:37:09.439950', NULL,
        'admin0203', NULL),
       (7, 5, 800000.00, 600000.00, 44, 3, 3, 4, 7, 10, 3, 2, _binary '', '2024-04-27 14:37:09.441957', NULL,
        'admin0203', NULL),
       (7, 5, 800000.00, 600000.00, 45, 5, 3, 4, 7, 10, 3, 2, _binary '', '2024-04-27 14:37:09.443967', NULL,
        'admin0203', NULL),
       (1, 2, 800000.00, 550000.00, 46, 2, 1, 10, 8, 30, 1, 6, _binary '', '2024-04-27 14:42:02.866424', NULL,
        'admin0203', NULL),
       (1, 2, 800000.00, 550000.00, 47, 3, 1, 10, 8, 30, 1, 6, _binary '', '2024-04-27 14:42:02.868408', NULL,
        'admin0203', NULL),
       (1, 2, 800000.00, 550000.00, 48, 5, 1, 10, 8, 30, 1, 6, _binary '', '2024-04-27 14:42:02.870413', NULL,
        'admin0203', NULL),
       (2, 2, 450000.00, 200000.00, 49, 1, 4, 2, 9, 30, 1, 4, _binary '', '2024-04-27 14:55:35.222606', NULL,
        'admin0203', NULL),
       (2, 2, 450000.00, 200000.00, 50, 2, 4, 2, 9, 30, 1, 4, _binary '', '2024-04-27 14:55:35.224611', NULL,
        'admin0203', NULL),
       (2, 2, 450000.00, 200000.00, 51, 3, 4, 2, 9, 30, 1, 4, _binary '', '2024-04-27 14:55:35.226612', NULL,
        'admin0203', NULL),
       (2, 2, 400000.00, 200000.00, 52, 1, 4, 3, 9, 30, 1, 4, _binary '', '2024-04-27 14:55:35.273323', NULL,
        'admin0203', NULL),
       (2, 2, 400000.00, 200000.00, 53, 2, 4, 3, 9, 30, 1, 4, _binary '', '2024-04-27 14:55:35.275324', NULL,
        'admin0203', NULL),
       (2, 2, 400000.00, 200000.00, 54, 3, 4, 3, 9, 30, 1, 4, _binary '', '2024-04-27 14:55:35.276329', NULL,
        'admin0203', NULL),
       (2, 2, 400000.00, 200000.00, 55, 1, 4, 1, 9, 30, 1, 4, _binary '', '2024-04-27 14:55:35.501632', NULL,
        'admin0203', NULL),
       (2, 2, 400000.00, 200000.00, 56, 2, 4, 1, 9, 30, 1, 4, _binary '', '2024-04-27 14:55:35.503639', NULL,
        'admin0203', NULL),
       (2, 2, 400000.00, 200000.00, 57, 3, 4, 1, 9, 30, 1, 4, _binary '', '2024-04-27 14:55:35.505638', NULL,
        'admin0203', NULL),
       (5, 2, 550000.00, 300000.00, 58, 2, 3, 2, 10, 20, 1, 6, _binary '', '2024-04-27 15:02:30.864669', NULL,
        'admin0203', NULL),
       (5, 2, 550000.00, 300000.00, 59, 3, 3, 2, 10, 20, 1, 6, _binary '', '2024-04-27 15:02:30.866679', NULL,
        'admin0203', NULL),
       (5, 2, 550000.00, 300000.00, 60, 5, 3, 2, 10, 20, 1, 6, _binary '', '2024-04-27 15:02:30.867881', NULL,
        'admin0203', NULL),
       (5, 2, 600000.00, 300000.00, 61, 2, 3, 4, 10, 20, 1, 6, _binary '', '2024-04-27 15:02:31.037117', NULL,
        'admin0203', NULL),
       (5, 2, 600000.00, 300000.00, 62, 3, 3, 4, 10, 20, 1, 6, _binary '', '2024-04-27 15:02:31.039135', NULL,
        'admin0203', NULL),
       (5, 2, 600000.00, 300000.00, 63, 5, 3, 4, 10, 20, 1, 6, _binary '', '2024-04-27 15:02:31.040124', NULL,
        'admin0203', NULL),
       (5, 2, 600000.00, 300000.00, 64, 2, 3, 7, 10, 20, 1, 6, _binary '', '2024-04-27 15:02:34.085226', NULL,
        'admin0203', NULL),
       (5, 2, 600000.00, 300000.00, 65, 3, 3, 7, 10, 20, 1, 6, _binary '', '2024-04-27 15:02:34.087229', NULL,
        'admin0203', NULL),
       (5, 2, 600000.00, 300000.00, 66, 5, 3, 7, 10, 20, 1, 6, _binary '', '2024-04-27 15:02:34.088229', NULL,
        'admin0203', NULL),
       (2, 2, 500000.00, 250000.00, 67, 1, 1, 3, 11, 20, 1, 3, _binary '', '2024-04-27 15:06:35.580296', NULL,
        'admin0203', NULL),
       (2, 2, 500000.00, 250000.00, 68, 2, 1, 3, 11, 20, 1, 3, _binary '', '2024-04-27 15:06:35.582324', NULL,
        'admin0203', NULL),
       (2, 2, 500000.00, 250000.00, 69, 3, 1, 3, 11, 20, 1, 3, _binary '', '2024-04-27 15:06:35.583325', NULL,
        'admin0203', NULL),
       (2, 2, 500000.00, 250000.00, 70, 5, 1, 3, 11, 20, 1, 3, _binary '', '2024-04-27 15:06:35.584324', NULL,
        'admin0203', NULL),
       (2, 2, 450000.00, 300000.00, 71, 2, 3, 5, 12, 20, 1, 1, _binary '', '2024-04-27 15:10:15.474483', NULL,
        'admin0203', NULL),
       (2, 2, 450000.00, 300000.00, 72, 3, 3, 5, 12, 20, 1, 1, _binary '', '2024-04-27 15:10:15.476484', NULL,
        'admin0203', NULL),
       (2, 2, 450000.00, 300000.00, 73, 5, 3, 5, 12, 20, 1, 1, _binary '', '2024-04-27 15:10:15.478487', NULL,
        'admin0203', NULL),
       (2, 2, 450000.00, 300000.00, 74, 1, 3, 5, 12, 20, 1, 1, _binary '', '2024-04-27 15:10:15.479490', NULL,
        'admin0203', NULL),
       (2, 1, 600000.00, 400000.00, 75, 2, 3, 2, 13, 20, 2, 5, _binary '', '2024-04-27 15:15:34.883658', NULL,
        'admin0203', NULL),
       (2, 1, 600000.00, 400000.00, 76, 3, 3, 2, 13, 20, 2, 5, _binary '', '2024-04-27 15:15:34.885641', NULL,
        'admin0203', NULL),
       (2, 1, 600000.00, 400000.00, 77, 5, 3, 2, 13, 20, 2, 5, _binary '', '2024-04-27 15:15:34.887653', NULL,
        'admin0203', NULL),
       (2, 1, 630000.00, 400000.00, 78, 2, 3, 4, 13, 20, 2, 5, _binary '', '2024-04-27 15:15:36.183891', NULL,
        'admin0203', NULL),
       (2, 1, 630000.00, 400000.00, 79, 3, 3, 4, 13, 20, 2, 5, _binary '', '2024-04-27 15:15:36.185881', NULL,
        'admin0203', NULL),
       (2, 1, 630000.00, 400000.00, 80, 5, 3, 4, 13, 20, 2, 5, _binary '', '2024-04-27 15:15:36.187893', NULL,
        'admin0203', NULL),
       (2, 4, 450000.00, 300000.00, 81, 2, 3, 10, 14, 15, 2, 5, _binary '', '2024-04-27 15:19:56.839426', NULL,
        'admin0203', NULL),
       (2, 4, 450000.00, 300000.00, 82, 3, 3, 10, 14, 15, 2, 5, _binary '', '2024-04-27 15:19:56.841440', NULL,
        'admin0203', NULL),
       (2, 4, 450000.00, 300000.00, 83, 5, 3, 10, 14, 15, 2, 5, _binary '', '2024-04-27 15:19:56.843421', NULL,
        'admin0203', NULL),
       (2, 5, 450000.00, 300000.00, 84, 3, 3, 6, 15, 20, 1, 5, _binary '', '2024-04-27 15:27:16.084791', NULL,
        'admin0203', NULL),
       (2, 5, 450000.00, 300000.00, 85, 2, 3, 6, 15, 20, 1, 5, _binary '', '2024-04-27 15:27:16.086802', NULL,
        'admin0203', NULL),
       (2, 5, 450000.00, 300000.00, 86, 5, 3, 6, 15, 20, 1, 5, _binary '', '2024-04-27 15:27:16.089791', NULL,
        'admin0203', NULL),
       (2, 4, 350000.00, 250000.00, 87, 2, 3, 10, 16, 30, 2, 5, _binary '', '2024-04-27 15:30:49.563147', NULL,
        'admin0203', NULL),
       (2, 4, 350000.00, 250000.00, 88, 3, 3, 10, 16, 30, 2, 5, _binary '', '2024-04-27 15:30:49.565132', NULL,
        'admin0203', NULL),
       (2, 4, 350000.00, 250000.00, 89, 5, 3, 10, 16, 30, 2, 5, _binary '', '2024-04-27 15:30:49.566133', NULL,
        'admin0203', NULL),
       (2, 2, 890000.00, 700000.00, 90, 2, 1, 1, 17, 20, 1, 6, _binary '', '2024-04-27 15:36:06.335195', NULL,
        'admin0203', NULL),
       (2, 2, 890000.00, 700000.00, 91, 3, 1, 1, 17, 20, 1, 6, _binary '', '2024-04-27 15:36:06.338204', NULL,
        'admin0203', NULL),
       (2, 2, 890000.00, 700000.00, 92, 2, 1, 2, 17, 20, 1, 6, _binary '', '2024-04-27 15:36:07.582949', NULL,
        'admin0203', NULL),
       (2, 2, 890000.00, 700000.00, 93, 3, 1, 2, 17, 20, 1, 6, _binary '', '2024-04-27 15:36:07.584955', NULL,
        'admin0203', NULL),
       (2, 2, 890000.00, 700000.00, 94, 2, 1, 3, 17, 20, 1, 6, _binary '', '2024-04-27 15:36:07.923693', NULL,
        'admin0203', NULL),
       (2, 2, 890000.00, 700000.00, 95, 3, 1, 3, 17, 20, 1, 6, _binary '', '2024-04-27 15:36:07.927710', NULL,
        'admin0203', NULL),
       (7, 1, 490000.00, 350000.00, 96, 2, 4, 8, 18, 30, 1, 3, _binary '', '2024-04-27 15:40:53.212692', NULL,
        'admin0203', NULL),
       (7, 1, 490000.00, 350000.00, 97, 3, 4, 8, 18, 30, 1, 3, _binary '', '2024-04-27 15:40:53.215702', NULL,
        'admin0203', NULL),
       (7, 1, 490000.00, 350000.00, 98, 5, 4, 8, 18, 30, 1, 3, _binary '', '2024-04-27 15:40:53.218696', NULL,
        'admin0203', NULL),
       (7, 1, 490000.00, 350000.00, 99, 2, 4, 3, 18, 30, 1, 3, _binary '', '2024-04-27 15:40:54.000465', NULL,
        'admin0203', NULL),
       (7, 1, 490000.00, 350000.00, 100, 3, 4, 3, 18, 30, 1, 3, _binary '', '2024-04-27 15:40:54.003462', NULL,
        'admin0203', NULL),
       (7, 1, 490000.00, 350000.00, 101, 5, 4, 3, 18, 30, 1, 3, _binary '', '2024-04-27 15:40:54.006454', NULL,
        'admin0203', NULL),
       (2, 2, 400000.00, 200000.00, 102, 1, 2, 1, 19, 50, 1, 6, _binary '', '2024-04-27 15:45:49.348949', NULL,
        'admin0203', NULL),
       (2, 2, 400000.00, 200000.00, 103, 2, 2, 1, 19, 50, 1, 6, _binary '', '2024-04-27 15:45:49.350944', NULL,
        'admin0203', NULL),
       (2, 2, 400000.00, 200000.00, 104, 3, 2, 1, 19, 50, 1, 6, _binary '', '2024-04-27 15:45:49.352950', NULL,
        'admin0203', NULL),
       (2, 2, 400000.00, 200000.00, 105, 5, 2, 1, 19, 50, 1, 6, _binary '', '2024-04-27 15:45:49.354951', NULL,
        'admin0203', NULL),
       (2, 2, 400000.00, 200000.00, 106, 1, 2, 2, 19, 50, 1, 6, _binary '', '2024-04-27 15:45:51.123094', NULL,
        'admin0203', NULL),
       (2, 2, 400000.00, 200000.00, 107, 2, 2, 2, 19, 50, 1, 6, _binary '', '2024-04-27 15:45:51.126102', NULL,
        'admin0203', NULL),
       (2, 2, 400000.00, 200000.00, 108, 3, 2, 2, 19, 50, 1, 6, _binary '', '2024-04-27 15:45:51.129089', NULL,
        'admin0203', NULL),
       (2, 2, 400000.00, 200000.00, 109, 5, 2, 2, 19, 50, 1, 6, _binary '', '2024-04-27 15:45:51.131090', NULL,
        'admin0203', NULL);
/*!40000 ALTER TABLE `san_pham_chi_tiet` ENABLE KEYS */;
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
    `hinhanh_id` int NOT NULL,
    `spct_id`    int NOT NULL,
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
VALUES (1, 1),
       (1, 2),
       (1, 3),
       (2, 4),
       (2, 5),
       (2, 6),
       (3, 7),
       (3, 8),
       (3, 9),
       (4, 10),
       (5, 10),
       (6, 10),
       (4, 11),
       (5, 11),
       (6, 11),
       (4, 12),
       (5, 12),
       (6, 12),
       (7, 13),
       (7, 14),
       (7, 15),
       (8, 16),
       (8, 17),
       (8, 18),
       (9, 19),
       (9, 20),
       (9, 21),
       (10, 22),
       (11, 22),
       (12, 22),
       (10, 23),
       (11, 23),
       (12, 23),
       (10, 24),
       (11, 24),
       (12, 24),
       (13, 25),
       (13, 26),
       (13, 27),
       (14, 28),
       (14, 29),
       (14, 30),
       (15, 31),
       (15, 32),
       (15, 33),
       (16, 34),
       (16, 35),
       (16, 36),
       (17, 37),
       (18, 37),
       (17, 38),
       (18, 38),
       (17, 39),
       (18, 39),
       (19, 40),
       (20, 40),
       (19, 41),
       (20, 41),
       (19, 42),
       (20, 42),
       (21, 43),
       (22, 43),
       (21, 44),
       (22, 44),
       (21, 45),
       (22, 45),
       (23, 46),
       (24, 46),
       (25, 46),
       (23, 47),
       (24, 47),
       (25, 47),
       (23, 48),
       (24, 48),
       (25, 48),
       (26, 49),
       (26, 50),
       (26, 51),
       (27, 52),
       (27, 53),
       (27, 54),
       (28, 55),
       (28, 56),
       (28, 57),
       (29, 58),
       (29, 59),
       (29, 60),
       (30, 61),
       (30, 62),
       (30, 63),
       (31, 64),
       (31, 65),
       (31, 66),
       (32, 67),
       (33, 67),
       (34, 67),
       (32, 68),
       (33, 68),
       (34, 68),
       (32, 69),
       (33, 69),
       (34, 69),
       (32, 70),
       (33, 70),
       (34, 70),
       (35, 71),
       (36, 71),
       (37, 71),
       (35, 72),
       (36, 72),
       (37, 72),
       (35, 73),
       (36, 73),
       (37, 73),
       (35, 74),
       (36, 74),
       (37, 74),
       (38, 75),
       (38, 76),
       (38, 77),
       (39, 78),
       (40, 78),
       (39, 79),
       (40, 79),
       (39, 80),
       (40, 80),
       (41, 81),
       (42, 81),
       (43, 81),
       (41, 82),
       (42, 82),
       (43, 82),
       (41, 83),
       (42, 83),
       (43, 83),
       (44, 84),
       (45, 84),
       (46, 84),
       (44, 85),
       (45, 85),
       (46, 85),
       (44, 86),
       (45, 86),
       (46, 86),
       (47, 87),
       (48, 87),
       (49, 87),
       (47, 88),
       (48, 88),
       (49, 88),
       (47, 89),
       (48, 89),
       (49, 89),
       (50, 90),
       (50, 91),
       (51, 92),
       (51, 93),
       (52, 94),
       (52, 95),
       (53, 96),
       (54, 96),
       (53, 97),
       (54, 97),
       (53, 98),
       (54, 98),
       (55, 99),
       (56, 99),
       (55, 100),
       (56, 100),
       (55, 101),
       (56, 101),
       (57, 102),
       (58, 102),
       (57, 103),
       (58, 103),
       (57, 104),
       (58, 104),
       (57, 105),
       (58, 105),
       (59, 106),
       (60, 106),
       (59, 107),
       (60, 107),
       (59, 108),
       (60, 108),
       (59, 109),
       (60, 109);
/*!40000 ALTER TABLE `spct_hinhanh` ENABLE KEYS */;
UNLOCK
TABLES;

--
-- Table structure for table `staff_image`
--

DROP TABLE IF EXISTS `staff_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staff_image`
(
    `id`         int NOT NULL AUTO_INCREMENT,
    `image_id`   varchar(255) DEFAULT NULL,
    `image_name` varchar(255) DEFAULT NULL,
    `image_url`  varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff_image`
--

LOCK
TABLES `staff_image` WRITE;
/*!40000 ALTER TABLE `staff_image` DISABLE KEYS */;
/*!40000 ALTER TABLE `staff_image` ENABLE KEYS */;
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
    `trang_thai`      bit(1) NOT NULL,
    `created_at`      datetime(6) DEFAULT NULL,
    `updated_at`      datetime(6) DEFAULT NULL,
    `created_by`      varchar(255) DEFAULT NULL,
    `last_updated_by` varchar(255) DEFAULT NULL,
    `ten`             varchar(255) DEFAULT NULL,
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
VALUES (1, _binary '', '2024-04-25 22:40:11.877885', NULL, 'admin0203', NULL, 'Tay dài'),
       (2, _binary '', '2024-04-25 22:40:20.633845', NULL, 'admin0203', NULL, 'Tay ngắn'),
       (3, _binary '', '2024-04-25 22:40:28.820062', NULL, 'admin0203', NULL, 'Tay lỡ');
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
    `id_hoa_don`      int            DEFAULT NULL,
    `id_httt`         int            DEFAULT NULL,
    `so_tien`         decimal(38, 2) DEFAULT NULL,
    `trang_thai`      bit(1) NOT NULL,
    `created_at`      datetime(6) DEFAULT NULL,
    `updated_at`      datetime(6) DEFAULT NULL,
    `created_by`      varchar(255)   DEFAULT NULL,
    `last_updated_by` varchar(255)   DEFAULT NULL,
    `ma_giao_dich`    varchar(255)   DEFAULT NULL,
    `mo_ta`           varchar(255)   DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY               `FKj9aik00pboiihg2ekgf3ceusn` (`id_httt`),
    KEY               `FK543gfw2cged82vmxbl65i7p9u` (`id_hoa_don`),
    CONSTRAINT `FK543gfw2cged82vmxbl65i7p9u` FOREIGN KEY (`id_hoa_don`) REFERENCES `hoa_don` (`id`),
    CONSTRAINT `FKj9aik00pboiihg2ekgf3ceusn` FOREIGN KEY (`id_httt`) REFERENCES `hinh_thuc_thanh_toan` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thanh_toan`
--

LOCK
TABLES `thanh_toan` WRITE;
/*!40000 ALTER TABLE `thanh_toan` DISABLE KEYS */;
INSERT INTO `thanh_toan`
VALUES (1, 1, 1, 1500000.00, _binary '', '2024-04-26 21:05:24.724073', NULL, 'admin0203', NULL, '', NULL),
       (2, 2, 1, 1500000.00, _binary '', '2024-04-26 21:06:26.799093', NULL, 'admin0203', NULL, '', NULL),
       (3, 3, 2, 6025300.00, _binary '', '2024-04-26 21:24:53.927459', NULL, 'admin0203', NULL, 'ctgyvbhyjv', ''),
       (4, 3, 2, -6025300.00, _binary '', '2024-04-27 09:30:14.925875', NULL, 'admin0203', NULL, 'jcabwsgyfr',
        'Hoàn tiền: ');
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

-- Dump completed on 2024-04-27 17:40:25
