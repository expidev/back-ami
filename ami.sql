-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 03, 2024 at 12:34 PM
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
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `mot_de_passe` varchar(70) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `nom`, `prenom`, `email`, `mot_de_passe`) VALUES
(1, 'Nas', 'Harivonjy', 'nasandratra.access4@gmail.com', 'ami');

-- --------------------------------------------------------

--
-- Table structure for table `ami`
--

DROP TABLE IF EXISTS `ami`;
CREATE TABLE IF NOT EXISTS `ami` (
  `id_ami` varchar(20) NOT NULL,
  `id_admin` int(11) NOT NULL,
  `description` varchar(300) NOT NULL,
  `date_validation` date NOT NULL,
  PRIMARY KEY (`id_ami`),
  KEY `FK_1` (`id_admin`)
) ENGINE=MyISAM AUTO_INCREMENT=39 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ami`
--

INSERT INTO `ami` (`id_ami`, `id_admin`, `description`, `date_validation`) VALUES
('3', 1, 'Do re mi fa', '2024-03-20'),
('4', 1, '', '2024-03-13'),
('5', 1, '', '2024-04-03'),
('6', 1, '', '2024-04-03'),
('9', 1, '', '2024-04-03'),
('10', 1, '', '2024-04-03'),
('11', 1, '', '2024-04-03'),
('12', 1, '', '2024-04-03'),
('13', 1, '', '2024-04-03'),
('16', 1, '', '2024-04-03'),
('20', 1, '', '2024-04-03'),
('21', 1, '', '2024-04-03'),
('25', 1, '', '2024-04-03'),
('38', 1, '', '2024-04-03');

-- --------------------------------------------------------

--
-- Table structure for table `fichier`
--

DROP TABLE IF EXISTS `fichier`;
CREATE TABLE IF NOT EXISTS `fichier` (
  `id_fichier` int(11) NOT NULL AUTO_INCREMENT,
  `id_admin` int(11) DEFAULT NULL,
  `id_ami` varchar(70) DEFAULT NULL,
  `nom_fichier` varchar(255) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `type_fichier` varchar(50) DEFAULT NULL,
  `taille_fichier` varchar(20) DEFAULT NULL,
  `date_upload` date DEFAULT NULL,
  PRIMARY KEY (`id_fichier`),
  KEY `id_admin` (`id_admin`),
  KEY `id_ami` (`id_ami`)
) ENGINE=MyISAM AUTO_INCREMENT=111 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `fichier`
--

INSERT INTO `fichier` (`id_fichier`, `id_admin`, `id_ami`, `nom_fichier`, `description`, `type_fichier`, `taille_fichier`, `date_upload`) VALUES
(78, NULL, '3', '1711538902987_web-development-stack.png', NULL, 'image/png', '66858', '2024-03-27'),
(100, 1, '12', '1712144304738_mm.PNG', NULL, 'image/png', '737217', '2024-04-03'),
(101, 1, '13', '1712144445782_Sans titre.png', NULL, 'image/png', '59553', '2024-04-03'),
(102, 1, '16', '1712144479120_Sans titre.png', NULL, 'image/png', '59553', '2024-04-03'),
(99, 1, '12', '1712144304738_html CSS JS.jpg', NULL, 'image/jpeg', '6621', '2024-04-03'),
(95, 1, '6', '1712143438268_html CSS JS.jpg', NULL, 'image/jpeg', '6621', '2024-04-03'),
(96, 1, '9', '1712143980183_restful-product-service.jpg', NULL, 'image/jpeg', '37723', '2024-04-03'),
(97, 1, '10', '1712144127138_images.jpg', NULL, 'image/jpeg', '4949', '2024-04-03'),
(91, 1, '5', '1712135218231_ami.sql', NULL, 'application/octet-stream', '6727', '2024-04-03'),
(98, 1, '11', '1712144264544_html CSS JS.jpg', NULL, 'image/jpeg', '6621', '2024-04-03'),
(103, 1, '16', '1712144479121_Sans titre.png', NULL, 'image/png', '59553', '2024-04-03'),
(104, 1, '20', '1712144835722_Sans titre.png', NULL, 'image/png', '59553', '2024-04-03'),
(105, 1, '21', '1712144888703_Sans titre.png', NULL, 'image/png', '59553', '2024-04-03'),
(106, 1, '25', '1712145650433_Cnd.drim', NULL, 'application/octet-stream', '38191', '2024-04-03');

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
CREATE TABLE IF NOT EXISTS `notification` (
  `id_notification` int(11) NOT NULL,
  `id_ami` int(11) NOT NULL,
  `id_admin` int(11) NOT NULL,
  `id_superfiseur` int(11) NOT NULL,
  `id_visiteur` int(11) NOT NULL,
  `date_notification` date NOT NULL,
  PRIMARY KEY (`id_notification`,`id_ami`,`id_admin`,`id_superfiseur`,`id_visiteur`),
  KEY `FK_1` (`id_ami`,`id_admin`),
  KEY `FK_2` (`id_superfiseur`),
  KEY `FK_3` (`id_visiteur`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `superviseur`
--

DROP TABLE IF EXISTS `superviseur`;
CREATE TABLE IF NOT EXISTS `superviseur` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(40) NOT NULL,
  `email` varchar(40) NOT NULL,
  `id_ami` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_ami` (`id_ami`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `superviseur`
--

INSERT INTO `superviseur` (`id`, `nom`, `email`, `id_ami`) VALUES
(7, 'Edustretch', 'example@example.com', 3);

-- --------------------------------------------------------

--
-- Table structure for table `telechargement`
--

DROP TABLE IF EXISTS `telechargement`;
CREATE TABLE IF NOT EXISTS `telechargement` (
  `id_telechargement` int(11) NOT NULL,
  `id_ami` int(11) NOT NULL,
  `id_admin` int(11) NOT NULL,
  `id_visiteur` int(11) NOT NULL,
  `date_telechargement` date NOT NULL,
  `adresse_ip` linestring NOT NULL,
  PRIMARY KEY (`id_telechargement`,`id_ami`,`id_admin`,`id_visiteur`),
  KEY `FK_1` (`id_ami`,`id_admin`),
  KEY `FK_2` (`id_visiteur`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tokens`
--

DROP TABLE IF EXISTS `tokens`;
CREATE TABLE IF NOT EXISTS `tokens` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `token` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tokens`
--

INSERT INTO `tokens` (`id`, `token`, `email`, `created_at`) VALUES
(13, '903173fa-c172-4a9b-b7d3-ab1d94ab2554', 'nasandratra.access4@gmail.com', '2024-04-02 07:19:53'),
(12, '82b704ee-f4ba-4355-bab5-eb4e1351830c', 'nasandratra.access4@gmail.com', '2024-04-02 05:27:22'),
(11, 'fed0b04c-eee5-411a-b08c-77f376599f39', 'nasandratra.access4@gmail.com', '2024-04-02 05:26:22'),
(10, '3e32a353-9abd-450c-baab-3ffa2030a5fd', 'nasandratra.access4@gmail.com', '2024-04-02 05:25:31'),
(9, 'a06e4810-0c08-4dbe-a912-bf70600397ea', 'nasandratra.access4@gmail.com', '2024-04-02 05:24:23'),
(8, 'cfb0f544-1116-4e59-8e12-20ff8a67aca8', 'nasandratra.access4@gmail.com', '2024-04-02 05:20:34'),
(7, 'ca06fe59-f05c-4e64-8963-a3442d9b8509', 'nasandratra.access4@gmail.com', '2024-03-28 11:26:53');

-- --------------------------------------------------------

--
-- Table structure for table `visiteur`
--

DROP TABLE IF EXISTS `visiteur`;
CREATE TABLE IF NOT EXISTS `visiteur` (
  `id_visiteur` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(70) NOT NULL,
  `prenom` varchar(70) DEFAULT NULL,
  `cin_nif` varchar(70) NOT NULL,
  `email_entreprise` varchar(50) NOT NULL,
  `telephone` varchar(20) NOT NULL,
  PRIMARY KEY (`id_visiteur`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `visiteur`
--

INSERT INTO `visiteur` (`id_visiteur`, `nom`, `prenom`, `cin_nif`, `email_entreprise`, `telephone`) VALUES
(5, 'Lorem', '', '54654054045', 'example@example.com', '0320000000'),
(6, 'EduStretch', '', '54654054045', 'nasandratra@ami.com', '0326212342'),
(7, 'dfsfsdf', '', '1213445454', 'a@gmail.com', '0320000000'),
(8, 'Edustretch', '', '1213445454', 'nasandratra.access4@gmail.com', '0320021211');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
