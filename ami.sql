-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jun 21, 2024 at 02:22 PM
-- Server version: 5.7.31
-- PHP Version: 7.2.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ami`
--

-- --------------------------------------------------------

--
-- Table structure for table `dao_ami`
--

DROP TABLE IF EXISTS `dao_ami`;
CREATE TABLE IF NOT EXISTS `dao_ami` (
  `id_ami` int(11) NOT NULL AUTO_INCREMENT,
  `ref_ami` varchar(100) NOT NULL,
  `id_admin` int(11) NOT NULL,
  `description` varchar(2000) NOT NULL,
  `date_creation` date NOT NULL,
  `ref_unique` varchar(255) NOT NULL,
  PRIMARY KEY (`id_ami`),
  UNIQUE KEY `ref_ami` (`ref_ami`),
  KEY `FK_1` (`id_admin`)
) ENGINE=MyISAM AUTO_INCREMENT=74 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `dao_ami`
--

INSERT INTO `dao_ami` (`id_ami`, `ref_ami`, `id_admin`, `description`, `date_creation`, `ref_unique`) VALUES
(70, '3', 6, 'dfd', '2024-06-21', '7ec143eb-ded4-4a4b-89d7-791b3f876dcd'),
(71, '6', 6, 'dfdf', '2024-06-21', '43541c57-39e7-4c66-b68d-8dfc28cb61e2'),
(72, 'test/1', 6, 'dfdf', '2024-06-21', '46f27b16-69b3-45d9-bcf4-7e80e9161567'),
(73, 'lorem+°2dfere dfe', 6, 'erer', '2024-06-21', '97d20203-bcef-403a-a157-add2c83a5435');

-- --------------------------------------------------------

--
-- Table structure for table `dao_fichier`
--

DROP TABLE IF EXISTS `dao_fichier`;
CREATE TABLE IF NOT EXISTS `dao_fichier` (
  `id_fichier` int(11) NOT NULL AUTO_INCREMENT,
  `id_admin` int(11) DEFAULT NULL,
  `ref_ami` varchar(100) DEFAULT NULL,
  `nom_fichier` varchar(255) DEFAULT NULL,
  `type_fichier` varchar(100) DEFAULT NULL,
  `taille_fichier` varchar(20) DEFAULT NULL,
  `date_upload` date DEFAULT NULL,
  PRIMARY KEY (`id_fichier`),
  KEY `id_admin` (`id_admin`),
  KEY `ref_ami` (`ref_ami`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=237 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `dao_fichier`
--

INSERT INTO `dao_fichier` (`id_fichier`, `id_admin`, `ref_ami`, `nom_fichier`, `type_fichier`, `taille_fichier`, `date_upload`) VALUES
(234, 6, 'lorem+°2dfere dfe', '1718979490983_Cnd 3.PNG', 'image/png', '25302', '2024-06-21');

-- --------------------------------------------------------

--
-- Table structure for table `dao_superviseur`
--

DROP TABLE IF EXISTS `dao_superviseur`;
CREATE TABLE IF NOT EXISTS `dao_superviseur` (
  `id_superviseur` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(40) NOT NULL,
  `email` varchar(40) NOT NULL,
  `ref_ami` varchar(100) NOT NULL,
  PRIMARY KEY (`id_superviseur`),
  KEY `id_ami` (`ref_ami`)
) ENGINE=MyISAM AUTO_INCREMENT=70 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `dao_superviseur`
--

INSERT INTO `dao_superviseur` (`id_superviseur`, `nom`, `email`, `ref_ami`) VALUES
(68, 'Nasandratra', 'nasandratra.access4@gmail.com', 'lorem+°2dfere dfe'),
(69, 'karoty', 'har21055@byui.edu', 'lorem+°2dfere dfe');

-- --------------------------------------------------------

--
-- Table structure for table `dao_telechargement`
--

DROP TABLE IF EXISTS `dao_telechargement`;
CREATE TABLE IF NOT EXISTS `dao_telechargement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ref_ami` varchar(50) NOT NULL,
  `id_visiteur` int(11) NOT NULL,
  `date_telechargement` date NOT NULL,
  `count` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`,`ref_ami`,`id_visiteur`),
  KEY `FK_1` (`ref_ami`),
  KEY `FK_2` (`id_visiteur`)
) ENGINE=MyISAM AUTO_INCREMENT=104 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `dao_telechargement`
--

INSERT INTO `dao_telechargement` (`id`, `ref_ami`, `id_visiteur`, `date_telechargement`, `count`) VALUES
(103, 'lorem+°2dfere dfe', 30, '2024-06-21', 3),
(102, 'test/1', 30, '2024-06-21', 1);

-- --------------------------------------------------------

--
-- Table structure for table `dao_token`
--

DROP TABLE IF EXISTS `dao_token`;
CREATE TABLE IF NOT EXISTS `dao_token` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `token` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=34 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `dao_token`
--

INSERT INTO `dao_token` (`id`, `token`, `email`, `created_at`) VALUES
(33, 'd6f3a9b8-e76f-4157-ab1f-6d33303f3bbe', 'nasandratra.access4@gmail.com', '2024-06-21 14:19:39');

-- --------------------------------------------------------

--
-- Table structure for table `dao_user`
--

DROP TABLE IF EXISTS `dao_user`;
CREATE TABLE IF NOT EXISTS `dao_user` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(70) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `type` enum('admin','visitor') NOT NULL,
  `date_creation` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_user`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `dao_user`
--

INSERT INTO `dao_user` (`id_user`, `email`, `password_hash`, `type`, `date_creation`) VALUES
(6, 'adminweb@fid.mg', '$2a$10$kP7s4Feh9JcF9wNJFrt9M.c37UF7SXVAKn.LZo7tyqJZZkIew5wD6', 'admin', '2024-06-21 13:28:34');

-- --------------------------------------------------------

--
-- Table structure for table `dao_visiteur`
--

DROP TABLE IF EXISTS `dao_visiteur`;
CREATE TABLE IF NOT EXISTS `dao_visiteur` (
  `id_visiteur` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(70) NOT NULL,
  `adresse` varchar(70) DEFAULT NULL,
  `id_region` int(11) NOT NULL,
  `type` enum('entreprise','individu') NOT NULL,
  `cin_nif` varchar(70) NOT NULL,
  `email` varchar(50) NOT NULL,
  `telephone1` varchar(20) NOT NULL,
  `telephone2` varchar(20) DEFAULT NULL,
  `telephone3` varchar(20) DEFAULT NULL,
  `count` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_visiteur`),
  KEY `fk_region` (`id_region`)
) ENGINE=MyISAM AUTO_INCREMENT=31 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `dao_visiteur`
--

INSERT INTO `dao_visiteur` (`id_visiteur`, `nom`, `adresse`, `id_region`, `type`, `cin_nif`, `email`, `telephone1`, `telephone2`, `telephone3`, `count`) VALUES
(30, 'Rajema Michelson', 'LOT ambohitsitonina', 22, 'individu', 'Rajema Michelson', 'nasandratra.access4@gmail.com', '+1325650565656', '+261344323024', '', 4);

-- --------------------------------------------------------

--
-- Table structure for table `region`
--

DROP TABLE IF EXISTS `region`;
CREATE TABLE IF NOT EXISTS `region` (
  `id_region` bigint(4) NOT NULL,
  `id_direction_generale` char(32) NOT NULL,
  `id_direction` bigint(4) NOT NULL,
  `nom_region` varchar(255) NOT NULL,
  PRIMARY KEY (`id_region`),
  KEY `i_fk_region_direction_generale` (`id_direction_generale`),
  KEY `i_fk_region_direction` (`id_direction`),
  KEY `id_direction_generale` (`id_direction_generale`),
  KEY `id_direction` (`id_direction`),
  KEY `nom_region` (`nom_region`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `region`
--

INSERT INTO `region` (`id_region`, `id_direction_generale`, `id_direction`, `nom_region`) VALUES
(11, '1', 1, 'ANALAMANGA'),
(12, '1', 1, 'VAKINANKARATRA'),
(13, '1', 1, 'ITASY'),
(14, '1', 1, 'BONGOLAVA'),
(21, '1', 2, 'HAUTE MATSIATRA'),
(22, '1', 2, 'AMORON I MANIA'),
(23, '1', 9, 'VATOVAVY FITOVINANY'),
(24, '1', 2, 'IHOROMBE'),
(25, '1', 9, 'ATSIMO ATSINANANA'),
(31, '1', 3, 'ATSINANANA'),
(32, '1', 3, 'ANALANJIROFO'),
(33, '1', 3, 'ALAOTRA MANGORO'),
(41, '1', 4, 'BOENY'),
(42, '1', 4, 'SOFIA'),
(43, '1', 4, 'BETSIBOKA'),
(44, '1', 4, 'MELAKY'),
(51, '1', 5, 'ATSIMO ANDREFANA'),
(52, '1', 5, 'ANDROY'),
(53, '1', 5, 'ANOSY'),
(54, '1', 5, 'MENABE'),
(71, '1', 7, 'DIANA'),
(72, '1', 7, 'SAVA');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
